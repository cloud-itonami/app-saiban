goog.provide('saiban.ui');
saiban.ui.chrome_section = (function saiban$ui$chrome_section(label,body){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"panel"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),label], null),body], null);
});
saiban.ui.chips_list = (function saiban$ui$chips_list(keys){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"chips"], null),(function (){var iter__5480__auto__ = (function saiban$ui$chips_list_$_iter__22878(s__22879){
return (new cljs.core.LazySeq(null,(function (){
var s__22879__$1 = s__22879;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__22879__$1);
if(temp__5823__auto__){
var s__22879__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22879__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22879__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22881 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22880 = (0);
while(true){
if((i__22880 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__22880);
cljs.core.chunk_append(b__22881,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),k], null));

var G__22896 = (i__22880 + (1));
i__22880 = G__22896;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22881),saiban$ui$chips_list_$_iter__22878(cljs.core.chunk_rest(s__22879__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22881),null);
}
} else {
var k = cljs.core.first(s__22879__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),k], null),saiban$ui$chips_list_$_iter__22878(cljs.core.rest(s__22879__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(keys);
})()], null);
});
saiban.ui.facts_grid = (function saiban$ui$facts_grid(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"facts"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Project"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),new cljs.core.Keyword(null,"project","project",1124394579).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Routes"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),new cljs.core.Keyword(null,"route-count","route-count",-1535759193).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"XRPC"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),(cljs.core.truth_(new cljs.core.Keyword(null,"xrpc","xrpc",-1294004094).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta)))?"enabled":"not configured")], null)], null)], null);
});
saiban.ui.routes_panel = (function saiban$ui$routes_panel(){
return saiban.ui.chrome_section("Public Routes",((cljs.core.seq(new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5480__auto__ = (function saiban$ui$routes_panel_$_iter__22884(s__22885){
return (new cljs.core.LazySeq(null,(function (){
var s__22885__$1 = s__22885;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__22885__$1);
if(temp__5823__auto__){
var s__22885__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22885__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22885__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22887 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22886 = (0);
while(true){
if((i__22886 < size__5479__auto__)){
var r = cljs.core._nth(c__5478__auto__,i__22886);
cljs.core.chunk_append(b__22887,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),r], null));

var G__22901 = (i__22886 + (1));
i__22886 = G__22901;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22887),saiban$ui$routes_panel_$_iter__22884(cljs.core.chunk_rest(s__22885__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22887),null);
}
} else {
var r = cljs.core.first(s__22885__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),r], null),saiban$ui$routes_panel_$_iter__22884(cljs.core.rest(s__22885__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta)));
})()], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"muted"], null),"No public route is declared next to this app surface."], null)));
});
saiban.ui.vars_panel = (function saiban$ui$vars_panel(){
return saiban.ui.chrome_section("Runtime Bindings",((cljs.core.seq(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))))?saiban.ui.chips_list(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"muted"], null),"No public vars are declared in the nearest wrangler config."], null)));
});
saiban.ui.source_panel = (function saiban$ui$source_panel(){
return saiban.ui.chrome_section("Source",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"relative-path","relative-path",1848635172).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))], null));
});
saiban.ui.top_section = (function saiban$ui$top_section(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"top"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Cloudflare appview"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(saiban.state.app_meta))], null)], null);
});
saiban.ui.root_view = (function saiban$ui$root_view(){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main","main",-2117802661),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [saiban.ui.top_section], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [saiban.ui.facts_grid], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [saiban.ui.routes_panel], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [saiban.ui.vars_panel], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [saiban.ui.source_panel], null)], null);
});

//# sourceMappingURL=saiban.ui.js.map
