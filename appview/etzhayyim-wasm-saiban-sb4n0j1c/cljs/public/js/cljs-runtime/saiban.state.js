goog.provide('saiban.state');
if((typeof saiban !== 'undefined') && (typeof saiban.state !== 'undefined') && (typeof saiban.state.app_meta !== 'undefined')){
} else {
saiban.state.app_meta = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"routes","routes",457900162),new cljs.core.Keyword(null,"xrpc","xrpc",-1294004094),new cljs.core.Keyword(null,"relative-path","relative-path",1848635172),new cljs.core.Keyword(null,"route-count","route-count",-1535759193),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"project","project",1124394579),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"vars","vars",-2046957217)],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["sb4n0j1c.etzhayyim.com/*"], null),true,"appview/etzhayyim-wasm-saiban-sb4n0j1c/cljs/src/saiban/desktop.cljs",(1),"etzhayyim-wasm-saiban-sb4n0j1c","Saiban Sb4n0j1c","etzhayyim-project-saiban","appview",new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, ["AGENTGATEWAY_MCP_ROUTER_URL","APP_ACTOR_HANDLE","APP_CAPABILITIES","APP_DESCRIPTION","APP_DISPLAY_NAME","APP_EMBED_URL","APP_FRAMEWORK","APP_NANOID","APP_PERFORMER_TYPE","APP_UI_TYPE"], null)]));
}
saiban.state.app_meta_value = (function saiban$state$app_meta_value(k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(saiban.state.app_meta),k);
});

//# sourceMappingURL=saiban.state.js.map
