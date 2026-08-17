# operator quickstart — app-saiban

**この文書の手順は、clean clone に対して端から端まで実際に走らせて書いた**
（2026-08-18）。掲載している出力はすべてその実行で印字されたものである。
踏めなかった手順は書いていない —— 踏めないと分かったものは §2 のように
「踏めない」と書いてある。

repo が何なのか・何が食い違っているのかは `README.md`。ここは**動かし方**だけ。

所要時間の目安: §1〜§2 は 1 分未満（network 不要）。§3 は初回のみ 2〜4 分
（依存の取得）。

---

## 0. 前提

| | 実測した版 | 要るか |
|---|---|---|
| `git` | 2.x | **必須**（§1 §2 §5） |
| `nbb` | 1.3.x | **必須**（§1 §2 §5） |
| `gh`（認証済み） | 2.x | `--origin` を付けるときだけ |
| `node` | v26.3.0 | §3 だけ |
| `npm` | **10.9.2** | §3 だけ。**11.16.0 では動かない（§3.1）** |

```bash
git clone git@github.com:cloud-itonami/app-saiban.git
cd app-saiban
```

以下の手順は**すべて repo のルートで**実行する（検査器は `migration.edn` を
カレントディレクトリから読む）。

## 1. 保管が壊れていないことを確かめる（network 不要）

この repo は `etzhayyim/root` からの抽出物である。抽出時に足された記録を除いた
残りが、出所と**バイト単位で同一**であることを確かめる。

```bash
nbb docs/verify-custody.cljs
```

```
SCANNED	19 保管ファイル / 3 検査
  ok   出所 tree（再構成 vs 記録）
         got  cbdd0846141721d46612027b2d4cb2235ca4476a
  ok   保管ファイル数
         got  19
  ok   保管バイト数
         got  60120
PASS — 保管対象 19 ファイルは出所と同一（--origin を付けると出所 GitHub とも突き合わせる）
```

`gh` が認証済みなら、出所 GitHub の実 tree とも突き合わせる:

```bash
nbb docs/verify-custody.cljs --origin
```

```
SCANNED	19 保管ファイル / 4 検査
  ...
  ok   出所 GitHub の実 tree（etzhayyim/root@168497bd:60-apps/etzhayyim-project-saiban）
         got  cbdd0846141721d46612027b2d4cb2235ca4476a
PASS — 保管対象 19 ファイルは出所と同一
```

**exit code は 3 通りある。** `0` = 一致、`1` = 一致しない、**`3` = 判定できなかった**
（git が無い / repo でない / `migration.edn` が読めない / 対象が 0 件）。
**3 を 0 と同じに扱わないこと** —— 「測れなかった」は「問題なし」ではない。

### 1.1 この検査が実際に捕まえるもの（実測）

壊し方を 12 通り試し、無改変で `0` に戻ることまで確認した（2026-08-18）:

| 壊し方 | exit | 落ちた検査 |
|---|---|---|
| 無改変 | **0** | — |
| 保管ファイルを 1 バイト増やす | 1 | 保管バイト数 |
| 保管ファイルを 1 バイト減らす | 1 | 保管バイト数 |
| 保管ファイルを `rm` する | **3** | tracked なのに実体が無い |
| 保管ファイルを untrack して commit | 1 | 出所 tree |
| `:tree` を改竄する | 1 | 出所 tree |
| `:bytes` を改竄する | 1 | 保管バイト数 |
| `:tracked-files` を改竄する | 1 | 保管ファイル数 |
| 保管パス（`kotoba`）を `:allowed-additions` に隠す | 1 | 出所 tree |
| `migration.edn` に末尾フォームを足す | 1 | トップレベルのフォームが 2 個 |
| `migration.edn` を壊れた EDN にする | **3** | EDN として読めない |
| `:allowed-additions` を消す | **3** | 記録が無い |
| 復元後の無改変（陰性対照） | **0** | — |

`rm` が `1` ではなく `3` なのは意図した設計である —— tracked なのに実体が無い状態は
「出所と違う」ではなく「比較が成立していない」からで、`git checkout -- .` で直る。

**この検査が捕まえないもの**は §5。

## 2. 主張が実物と合っていることを確かめる（network 不要）

`README.md` が記録している数と語彙が、まだ本当かを確かめる。

```bash
nbb docs/verify-claims.cljs
```

```
SCANNED	33 court 行 / 7 kotoba level / 8 jsonld キー / 8 検査
  ok   宣言 total と court 表の行数
  ok   宣言 total と README の記録
  ok   管轄ごとの内訳（宣言 vs 実表）
         got  {"DE" 8, "FR" 6, "JP" 8, "UK" 6, "USA" 5}
  ok   description が wrangler.jsonc と kotodama.jsonld で一致
  ok   appview の level 語彙が README の記録どおり
  ok   kotoba の level 語彙が README の記録どおり
  ok   kotodama.jsonld の重複トップレベルキーが記録どおり
  ok   重複キーの値が互いに一致（最後が勝っても意味が変わらない）
  --   UNCHECKABLE  description の「11 types」「7 types」
PASS — 8 件すべて記録どおり
```

**`UNCHECKABLE` の行は合格ではない。** description が言う「jiken … (11 types)」
「trial event tracking (7 types)」は、2 つの実装のどちらにも対応する検証集合が
無いので数えようがない。**飛ばしたことを、合格したことと同じ顔で出力しない**
ためにこの行がある。

### 2.1 この検査が赤くなる条件（実測）

11 通り試して、無改変で `0` に戻ることまで確認した:

| 壊し方 | exit | 落ちた検査 |
|---|---|---|
| 無改変 | **0** | — |
| court 1 件の管轄を `usa`→`jpn` | 1 | 管轄ごとの内訳 |
| court 行を 1 件削除 | 1 | 宣言 total と court 表の行数 |
| `appview` の level 語彙を変える | 1 | appview の level 語彙 |
| `kotoba` の `LEVELS` から 1 個削る | 1 | kotoba の level 語彙 |
| `kotodama.jsonld` の description を 1 文字変える | 1 | description の一致 |
| **重複キー `name` を解消する（＝バグを直す）** | 1 | 重複キーが記録どおり |
| 重複キーの値を食い違わせる | 1 | 重複キーの値が互いに一致 |
| court 表の書式を壊して読めなくする | **3** | court 表を 1 行も読めなかった |
| `src/app.ts` を消す | **3** | ファイルが無い |
| `wrangler.jsonc` を壊れた JSON にする | **3** | JSON として読めない |
| 宣言 total だけを 33→34 に変える | 1 | 宣言 total と court 表の行数 |
| 復元後の無改変（陰性対照） | **0** | — |

**「バグを直すと赤くなる」のは仕様である。** この検査は「食い違いが無いこと」では
なく「`README.md` の記録が実物と合っていること」を見ている。直したなら README も
直す —— そのための赤である。

**書式を壊すと `0` ではなく `3` になる**ことに注意。正規表現が源に追随できなく
なったとき黙って合格するのが、この種の検査の最も危険な壊れ方なので、court 表が
0 行に読めた時点で「答えられなかった」で終わる。

## 3. 動く実装（`kotoba/`）を実際に走らせる

`kotoba/` は AT PDS 上の裁判所・裁判官・管轄レジストリの実装で、**この repo の中で
完結して検証できる唯一の部分**である（`appview/` 側は §4）。

### 3.1 まず npm の版を確かめる

```bash
npm --version
```

**11.16.0 では install できない。** git 依存の準備で npm が自分自身を再実行し、
その内側が拒否する:

```
npm error code 1
npm error git dep preparation failed
npm error   npm error code EALLOWSCRIPTS
npm error   npm error --allow-scripts is not allowed in project-scoped installs.
```

これは npm 側の不具合で、この repo の設定の問題ではない。`.npmrc` に
`allow-scripts=true` を置いても変わらない（拒否しているのは**内側**の npm なので）。
`pnpm 10.26.2` も同じ壁に当たる —— pnpm は git 依存の準備を `npm install` に
委譲するため、同じ `EALLOWSCRIPTS` で止まる。

**逃げ道は npm 10 を使うこと。** グローバルの npm を差し替えずに済ませる:

```bash
mkdir -p /tmp/npm10 && cd /tmp/npm10
printf '{"name":"npm10","private":true,"version":"0.0.0"}\n' > package.json
npm install npm@10.9.2            # 数秒
cd -                              # repo のルートに戻る
```

以下 `$NPM10` を `/tmp/npm10/node_modules/.bin/npm` として使う。

### 3.2 install → typecheck → test

```bash
cd kotoba
/tmp/npm10/node_modules/.bin/npm install --no-audit --no-fund
```

初回は 2〜4 分かかる（`@etzhayyim/sdk` が 6 個の git 依存を持ち、それぞれ
`prepare: tsc` で自分をビルドする）。最後にこう出れば成功:

```
npm warn skipping integrity check for git dependency ssh://git@github.com/etzhayyim/com-etzhayyim-sdk.git
added 135 packages
```

`ssh://git@github.com/...` を引くので **GitHub への SSH 鍵が要る**。
`@etzhayyim/sdk` と `@etzhayyim/sdk-mock` は `kotoba-lang/sdk` /
`kotoba-lang/sdk-mock` へ 301 で転送される（どちらも public）。

```bash
npm run typecheck     # tsc --noEmit
npm test              # vitest run
```

```
> tsc --noEmit
（出力なし、exit 0）

> vitest run
 Test Files  1 passed (1)
      Tests  4 passed (4)
```

（`Duration` は載せていない —— 2 回の実行で 209ms と 323ms に振れた。
この workstation は並行 agent で load が高く、wall-clock は再現しない。）

### 3.3 走らせたあとに残るもの

**この repo に `.gitignore` が無い。** そのため install の後は 2 つの未追跡物が
`git status` に出る:

```
?? kotoba/node_modules/
?? kotoba/package-lock.json
```

どちらも tracked ではないので §1 の保管検査には影響しない（`git ls-files` で
数えているため）。消したければ `rm -rf kotoba/node_modules kotoba/package-lock.json`。
**`.gitignore` はこの文書では足していない** —— ルート直下に新しい追跡ファイルを
足すと `migration.edn` の `:allowed-additions` も一緒に更新する必要があり、
それは保管記録を触る変更になるので、文書を書くついでにやることではない。

## 4. `appview/` は動かせない（試す前に読むこと）

`appview/etzhayyim-wasm-saiban-sb4n0j1c/src/app.ts` は
`@etzhayyim/kotodama-host-sdk` を import するが、

- そのディレクトリに `package.json` が無く、依存はこの repo のどこにも宣言されていない
- `etzhayyim/com-etzhayyim-kotodama-host-sdk` も `kotoba-lang/kotodama-host-sdk` も
  GitHub API で 404（2026-08-18 実測）

したがって **install も build も typecheck もできない。**
`svelte/` 側（実際に配備される部分）は `npm install` こそ通るはずだが、
配備先（`sb4n0j1c.etzhayyim.com`）も転送先（`mcp.etzhayyim.com`）も NXDOMAIN なので、
ビルドしても当てる先が無い。**この節の手順は用意していない** —— 踏める手順だけを
書くという方針の帰結である。

## 5. §1 の検査が捕まえないもの（実演済み）

**「整合した偽造」はローカル検査を通り抜ける。** 保管ファイルを書き換えたうえで
`migration.edn` の `:tree` と `:bytes` をその新しい値に合わせると、ローカル検査は
矛盾を見つけられない。実演（2026-08-18）:

```bash
# src/app.ts の1行を書き換え（name_ja: c.nameJa → c.nameEn）、commit し、
# :tree と :bytes を再計算した値に差し替える
nbb docs/verify-custody.cljs            # → exit 0   ★通ってしまう
nbb docs/verify-custody.cljs --origin   # → exit 1   FAIL 出所 GitHub の実 tree
```

このとき `:bytes` は **60120 のまま変わらなかった**（`nameJa` と `nameEn` は同じ
長さなので）。**バイト数の一致は、改変が無いことの証拠にならない。**

**したがって、custody を本気で確かめるときは `--origin` を付ける。**
ローカル検査は錨をこの repo の中にしか持たないので、記録ごと書き換える相手には
勝てない。`--origin` は `etzhayyim/root` の実 tree を GitHub から引いて突き合わせる。

`migration.edn` の `:destination` はどの検査も見ていない（どこへ移したかは
出所 tree に影響しないため）。ここを書き換えても両方の検査が PASS のままになる。

## 6. まとめ — 30 秒で健全性を見る

```bash
nbb docs/verify-custody.cljs --origin && nbb docs/verify-claims.cljs
```

両方 exit 0 なら、**保管は出所と同一で、`README.md` の記述は実物と合っている**。
`README.md` が述べている食い違い（実装が 2 つある・配備されるのはどちらでもない・
公開しないと書いたものに公開 DID を作りに行っている）は、**直っていないことが
正常な状態**である —— 直せば保管検査が落ちる。
