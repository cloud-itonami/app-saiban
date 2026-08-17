# app-saiban

**裁判所・裁判官・管轄の registry と、事件（jiken）・期日（trialEvent）の追跡を扱う
actor** —— 名前の `saiban` は 裁判 のローマ字表記で、それ以外の手掛かりを名前は
持たない。この節が名乗りである。

**この repo は `etzhayyim/root` からの抽出物で、保管されている 19 ファイルは出所と
バイト単位で同一である**（§6、検査できる）。

読む前に知っておくべきことが 1 つある。**この repo には裁判所レジストリの実装が
2 つ入っていて、互いにデータを渡せない。そして配備されるのはどちらでもない**
（§2・§3）。

---

## 1. 在庫

`git ls-files` は 25 ファイル（2026-08-18 実測、この文書と `docs/` の 3 本を含む）。
3 層に分かれる。

| 層 | 数 | バイト | 何か |
|---|---|---|---|
| **保管対象**（出所からそのまま） | **19** | **60,120** | `CLAUDE.md` `NOTICE` と `appview/` `kotoba/` 配下すべて |
| 抽出時の生成レコード | 2 | 548 | `README.edn` / `migration.edn` |
| 後から足した文書（保管対象ではない） | 4 | 可変 | この `README.md` と `docs/` の 3 本 |

**意味のある数は第 1 層の 19 / 60,120 だけ**である。第 2 層と第 3 層はこの文書を
書き換えるたびに動く —— repo 全体のバイト総数をここに書かないのはそのためで、
書いた瞬間にこの文書自身がその数に含まれ、自己言及で必ず陳腐化する。

保管対象の 19 / 60,120 は `migration.edn` の `:source` に記録された値と一致する。
**この一致は検査できる**（§6）。

コード側の実体は **3 つ**あり、どれも他の 2 つを参照していない:

| | 場所 | 大きさ | 動くか |
|---|---|---|---|
| **A** | `kotoba/src/` | 17,744 B / 3 ファイル | **動く。** 型検査 exit 0、テスト 4 件 pass（§4） |
| **B** | `appview/etzhayyim-wasm-saiban-sb4n0j1c/src/app.ts` | 23,747 B | **この repo だけではビルドも型検査もできない**（§2） |
| **C** | `appview/etzhayyim-wasm-saiban-sb4n0j1c/svelte/` | SvelteKit 一式 | **これが配備される**（§2） |

## 2. 配備されるのは A でも B でもない

`wrangler.jsonc` の `main` は次を指している:

```
svelte/.svelte-kit/cloudflare/_worker.js
```

これは **SvelteKit のビルド出力**であって、`src/app.ts` でも `kotoba/` でもない。
実測（2026-08-18、`grep`）:

| 探したもの | 件数 |
|---|---|
| repo 内で `src/app.ts` を参照している箇所 | **0**（`CLAUDE.md` の散文を除く） |
| `appview/` から `kotoba/` を参照している箇所 | **0** |

配備された worker が XRPC 要求を受けたとき実際に走るのは
`svelte/src/routes/xrpc/[...path]/+server.ts` で、これは受けた呼び出しを
**そのまま外部の MCP router（`https://mcp.etzhayyim.com/xrpc/com.etzhayyim.mcp.message`）
へ転送するだけの proxy** である。裁判所の登録も事件の作成も、この repo の中では
起こらない。

**B は配備経路に載っていないだけでなく、この repo だけではビルドできない。**
`src/app.ts` は `@etzhayyim/kotodama-host-sdk` を import するが:

- `appview/etzhayyim-wasm-saiban-sb4n0j1c/` に `package.json` が**無い**
  （この依存はこの repo のどこにも宣言されていない）
- `etzhayyim/com-etzhayyim-kotodama-host-sdk` も `kotoba-lang/kotodama-host-sdk` も
  GitHub API で **404**（2026-08-18 実測）

したがって B の 14 個の XRPC コマンドは、**この repo からは実行も型検査もできない**。
以下 §3 と §5 で B について述べることは、すべて**ソースを読んだ結果**であって
実行結果ではない。

## 3. 裁判所レジストリが 2 つあり、データを渡せない

A（`kotoba/`）と B（`src/app.ts`）は**同じ collection 名**を使う:

```
com.etzhayyim.apps.saiban.court / .judge / .jurisdictionMap
```

しかし**語彙が違う**。A の検証器に B の 33 件の裁判所定義を実際に流して測った
（2026-08-18、`@etzhayyim/sdk-mock` 上で `registerCourt` を 33 回呼んだ実測値）:

| 段 | 入力 | 結果 |
|---|---|---|
| 1 | B の court 表をそのまま | **33 件すべて `rejected` / `invalidJurisdiction`** |
| 2 | 管轄コードだけ alpha-3 → alpha-2 に直して再投入 | `registered` 27 / **`rejected` 6 — `invalidLevel`** |

原因は 2 つある。

**① 管轄コードの桁が違う。** B は ISO alpha-3（`jpn` `usa` `gbr` `deu` `fra`）、
A の `isJurisdiction` は `/^[A-Z]{2}$/` で alpha-2 しか通さない。これが先に発火するので
段 1 では level の食い違いが表に出ない。

**② level の語彙が重なっていない。**

| | 値 |
|---|---|
| B（`src/app.ts`） | `administrative-court` `arbitration` `district` `family-court` `high` `mediation` `summary` `supreme` |
| A（`kotoba/src/types.ts` の `LEVELS`） | `appellate` `district` `family` `high` `other` `summary` `supreme` |
| **B にしか無い** | `administrative-court` `arbitration` `family-court` `mediation` |
| A にしか無い | `appellate` `family` `other` |

段 2 で落ちた 6 件はこの 4 語彙を使っている裁判所である。`family-court` と `family`、
`administrative-court` と（対応語なし）—— **同じ概念を別の綴りで持っている。**

レコードの形も違う（A は `did/courtId/name/jurisdiction/level/parentCourtId/createdAt`、
B は `vertex_id/court_id/name_ja/name_en/court_level/jurisdiction/court_did/...`）。
DID の作り方も違う（A は `did:web:saiban.etzhayyim.com:court:{id}` を自分で組み立て、
B は host に `comAtprotoIdentityCreate("court:usa:scotus", …)` を頼む）。

**どちらが正しいかは、この repo の中には書かれていない。**

## 4. 動く部分は動く —— A は測れる

§2・§3 は食い違いの話だが、**A は実際に動き、この repo の中で完結して検証できる**。
2026-08-18 実測:

```
npm run typecheck   →  exit 0
npm test            →  Test Files 1 passed (1) / Tests 4 passed (4) / 209ms
```

4 件のテストが押さえているのは、裁判所の親子 FK・管轄と level の検証・裁判官の
FK→court・管轄マップの matter type・そして 3 コレクションの roll-up である。
手順は `docs/operator-quickstart.md` §3。

**ただし npm 11.16.0 ではインストールできない。** git 依存の準備で npm が自分自身を
`--allow-scripts` 付きで再実行し、その内側の npm が `EALLOWSCRIPTS` で拒否する
（npm 側の不具合であって、この repo の設定の問題ではない）。**npm 10.9.2 では通る**
（135 packages、約 2〜3 分）。逃げ道は quickstart §2 に書いた。

## 5. 「公開しない」と書かれているものに、公開 DID を作りに行っている

A の 2 つのファイルが、同じことを明示的に述べている:

- `kotoba/src/types.ts` — *the `jiken` (case) and `trialEvent` collections carry party PII /
  confidential litigation … and STAY etzhayyim / E2E, **never public AT records***
- `kotoba/src/index.ts` — *jiken (case) + trialEvent (party PII / confidential litigation)
  stay etzhayyim / E2E*

一方、同じ repo の中で:

| 場所 | していること |
|---|---|
| `src/app.ts` の `cmdCreateJiken` | 事件を作るたびに `comAtprotoIdentityCreate("jiken:<id>", {displayName: <事件名>, …})` を host に依頼する |
| `src/app.ts` の `cmdCreateJiken` | 事件名を `did:web:hanrei.etzhayyim.com` へ `kotodama.invoke` で送る |
| `kotodama.jsonld` の `triggers.subscribeRepos.collections` | `…saiban.jiken` と `…saiban.trialEvent` を購読対象に**挙げている** |

**この host 依頼が実際に何を公開するかは、この repo からは観測できない** —— §2 のとおり
host SDK がここに無いからである。観測できるのは「依頼が無条件に出ている」ことと、
「公開しないと書いた側と、購読対象に挙げた側が同じ repo に同居している」ことだけ。
`cmdCreateJiken` は `plaintiff` / `defendant` も保存する。

**これは食い違いの報告であって、漏洩の主張ではない。** 判定には host 側が要る。

## 6. 合っているものは合っている

全部が壊れているわけではない。**この repo の見出しの主張は実物と一致している。**
2026-08-18 実測:

| 主張 | 実物 |
|---|---|
| 「33 court-level DIDs (JP 8 + USA 5 + UK 6 + DE 8 + FR 6)」 | `src/app.ts` の court 表は **33 行**、内訳も **JP 8 / USA 5 / UK 6 / DE 8 / FR 6** で一致 |
| `wrangler.jsonc` と `kotodama.jsonld` の description | **byte 一致**（246 文字） |

**この一致は検査できる**（`nbb docs/verify-claims.cljs`、8 件すべて ok）。
どちらかの語彙や数が動けばこの検査は赤くなり、この README を直させる。
§3 の語彙表もこの検査が錨にしている —— **この文書が古くなったことを、機械が言う。**

検査**しない**ものも出力に明示してある: description の「jiken … (11 types)」
「trial event tracking (7 types)」は、A にも B にも対応する検証集合が無いので
数えようがない（B は既定値 `civil` / `hearing` を入れるだけで、任意の文字列を受ける）。
**飛ばしたことと合格したことを、出力で区別する。**

## 7. 合っていないものは他にもある（小さいもの）

| 場所 | ページ / 記録の表示 | 実際 |
|---|---|---|
| `svelte/src/routes/+page.svelte` | `routeCount: 0` / `routes: []` | `wrangler.jsonc` は **1 本**（`sb4n0j1c.etzhayyim.com/*`） |
| 同上 | `vars: []` | **10 個**（`APP_*` 9 + `AGENTGATEWAY_MCP_ROUTER_URL`） |
| 同上 | `relativePath: "60-apps/etzhayyim-project-saiban/appview/…"` | 抽出前のパス。この repo にそのディレクトリは無い |
| `kotodama.jsonld` | トップレベルに `"name"` が **2 回**ある | JSON としては「最後が勝つ」。両方 `"saiban"` なので今は無害 |

ページは「No public route is declared next to this app surface.」と表示するが、
その隣の `wrangler.jsonc` は 1 本を宣言している。

## 8. 宣言されているホストは存在しない

2026-08-18 実測（`host` / `curl`）:

| 名前 | 結果 |
|---|---|
| `saiban.etzhayyim.com` | **NXDOMAIN** |
| `sb4n0j1c.etzhayyim.com`（`wrangler.jsonc` の唯一の route） | **NXDOMAIN** |
| `mcp.etzhayyim.com`（§2 の proxy の宛先） | **NXDOMAIN** |
| `etzhayyim.com` | 解決する（`172.67.179.128`） |
| `https://etzhayyim.com/ns/kotodama/v1`（JSON-LD の `@context`） | **404** |

つまり **`https://saiban.etzhayyim.com` は動いていない。** この repo は「かつて配備を
意図された設定と、その一部の実装」を保管しているものであって、稼働中サービスの
ソースではない。§2 の proxy 経路も、宛先が無い。

一方、**A が依存している上流は生きている**: `@etzhayyim/sdk` /
`@etzhayyim/sdk-mock` は `kotoba-lang/sdk` / `kotoba-lang/sdk-mock` へ 301 で転送され、
どちらも public、pin されている commit も実在する（2026-08-18 実測）。
だから §4 のテストは実際に走る。

## 9. 保管されていること自体は検査できる

上記は全部「中身の話」だが、**この repo が出所を正しく保管しているか**は暗号学的に
確かめられる。`migration.edn` は出所の git tree SHA を記録している:

```
etzhayyim/root@168497bd :  60-apps/etzhayyim-project-saiban
tree                    :  cbdd0846141721d46612027b2d4cb2235ca4476a
```

`:identity :allowed-additions` に挙がっている追加物を除いてルート tree を再構成すると
この SHA になるはずである。バイト総数の一致ではなく**ハッシュ**で見るので、足し引きが
相殺する改変も捕まる。

```bash
nbb docs/verify-custody.cljs            # ローカルのみ
nbb docs/verify-custody.cljs --origin   # 出所 GitHub の実 tree とも突き合わせる
```

実測（exit 0）:

```
SCANNED	19 保管ファイル / 4 検査
  ok   出所 tree（再構成 vs 記録）
  ok   保管ファイル数            19
  ok   保管バイト数              60120
  ok   出所 GitHub の実 tree（etzhayyim/root@168497bd:60-apps/etzhayyim-project-saiban）
PASS
```

**`--origin` が要る理由は実演してある。** 保管ファイルを書き換えたうえで
`:tree` と `:bytes` を新しい値に合わせた「整合した偽造」は、**ローカル検査を exit 0 で
通り抜ける**。`--origin` だけがこれを exit 1 で落とす（quickstart §5 に実測）。
このとき `:bytes` は 60,120 のまま変わらなかった —— **バイト数の一致は改変が無いことの
証拠にならない。**

## 10. 出所と、この文書が足したもの

出所は `etzhayyim/root`（`168497bd`、`60-apps/etzhayyim-project-saiban`）。
ライセンスと charter rider は `NOTICE` を参照。

**`migration.edn` の `:identity :allowed-additions` は、この文書を足したときに
4 エントリ増やした**（`README.md` / `docs/operator-quickstart.md` /
`docs/verify-custody.cljs` / `docs/verify-claims.cljs`）。これは記録を現実に合わせる
ための更新で、custody の錨である `:source` ブロック（`:revision` / `:tree` /
`:tracked-files` / `:bytes`）は 1 バイトも触っていない —— そちらを触れば §9 の検査が
落ちる。

保管対象の 19 ファイルは、この文書を書く過程で 1 つも編集していない。だから §3 と §7 の
食い違いは**直していない** —— 直せば custody 検査が落ちる。ここで可視化するに留めた。
