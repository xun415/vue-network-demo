(function(){"use strict";var e={8067:function(e,n,t){t(6992),t(8674),t(9601),t(7727);var o=t(8935),r=t(8209),i=t.n(r);t(243);o["default"].use(i());var u={},a=new(i())(u),d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("v-app",[t("v-navigation-drawer",{attrs:{app:""}},[e._v(" Libraries "),t("ul",[t("li",[t("router-link",{attrs:{to:"/D3Js"}},[e._v("D3.js")])],1),t("li",[t("router-link",{attrs:{to:"/D3Vue"}},[e._v("Vue-d3.js")])],1),t("li",[t("router-link",{attrs:{to:"/VisJs"}},[e._v("Vis.js")])],1),t("li",[t("router-link",{attrs:{to:"/VueVis"}},[e._v("VueVis.js")])],1)])]),t("v-app-bar",{attrs:{app:""}},[t("h1",[e._v("Network graph demo")])]),t("v-main",[t("v-container",{attrs:{fluid:""}},[t("router-view")],1)],1),t("v-footer",{attrs:{app:""}})],1)],1)},s=[],l={name:"App",components:{}},c=l,f=t(1001),v=(0,f.Z)(c,d,s,!1,null,null,null),h=v.exports,p=t(2809),m=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h1",[e._v("D3.js")]),t("DataInfo")],1)},w=[],g=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},k=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",[t("h3",[e._v(" ---- data1----- (링크) ")]),t("p",[e._v(" 101 0.054665 (디자인, 제품) 2 110 0.049953 (스타일, 냉장고) 2 102 0.049325 (하나, 생각) 2 100 0.048068 (공간, 디자인) 2 103 0.046497 (하나, 디자인) 2 106 0.046183 (사용, 디자인) 2 105 0.045869 (공간, 인테리어) 2 104 0.043984 (인테리어, 디자인) 2 99 0.043041 (다양, 디자인) 2 98 0.041784 (제작, 디자인) 2 107 0.041470 (사용, 제품) 2 108 0.041156 (공간, 사용) 2 109 0.040528 (시간, 생각) 2 ")])]),t("div",[t("h3",[e._v(" ---- data2----- ??? ")]),t("p",[e._v(" array([1148, 778, 501, 697, 622, 709, 883, 641, 732, 398, 1002, 577]) ")])]),t("div",[t("h3",[e._v(" ---- data3---- 노드 ")]),t("p",[e._v(" { '디자인': 0.22137995638153773, '제품': 0.06604884464492325, '냉장고': 0.08333333333333333, '스타일': 0.08333333333333333, '하나': 0.07636080536975727, '생각': 0.08701303662200743, '공간': 0.09411975018853684, '사용': 0.09411975018853684, '인테리어': 0.06604884464492324, '다양': 0.039381539923353186, '제작': 0.039381539923353186, '시간': 0.0494792654464041 } ")])])])}],b={name:"dataInfo"},E=b,_=(0,f.Z)(E,g,k,!1,null,"f4ce1b00",null),V=_.exports,D={name:"D3Js",components:{DataInfo:V}},N=D,y=(0,f.Z)(N,m,w,!1,null,"1228ce90",null),j=y.exports,x=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h1",[e._v("D3.vue")]),t("DataInfo")],1)},O=[],z={name:"D3Vue",components:{DataInfo:V}},I=z,Z=(0,f.Z)(I,x,O,!1,null,"0acadfc2",null),J=Z.exports,$=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h1",[e._v("Vis.js")]),t("DataInfo"),t("div",{attrs:{id:"mynetwork"}})],1)},M=[],P={name:"VisJs",components:{DataInfo:V}},S=P,C=(0,f.Z)(S,$,M,!1,null,"cf615cc0",null),T=C.exports,A=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h1",[e._v("VueVis.js")]),t("p",[e._v(" A Vuejs 2 adapter for Visjs ")]),t("DataInfo"),t("network",{ref:"network",staticClass:"network",attrs:{nodes:e.network.nodes,edges:e.network.edges,options:e.network.options},on:{click:function(n){return e.networkEvent("click")},"double-click":function(n){return e.networkEvent("doubleClick")},oncontext:function(n){return e.networkEvent("oncontext")},hold:function(n){return e.networkEvent("hold")},release:function(n){return e.networkEvent("release")},select:function(n){return e.networkEvent("select")},"select-node":function(n){return e.networkEvent("selectNode")},"select-edge":function(n){return e.networkEvent("selectEdge")},"deselect-node":function(n){return e.networkEvent("deselectNode")},"deselect-edge":function(n){return e.networkEvent("deselectEdge")},"drag-start":function(n){return e.networkEvent("dragStart")},dragging:function(n){return e.networkEvent("dragging")},"drag-end":function(n){return e.networkEvent("dragEnd")},"hover-node":function(n){return e.networkEvent("hoverNode")},"blur-node":function(n){return e.networkEvent("blurNode")},"hover-edge":function(n){return e.networkEvent("hoverEdge")},"blur-edge":function(n){return e.networkEvent("blurEdge")},zoom:function(n){return e.networkEvent("zoom")},"show-popup":function(n){return e.networkEvent("showPopup")},"hide-popup":function(n){return e.networkEvent("hidePopup")},"start-stabilizing":function(n){return e.networkEvent("startStabilizing")},"stabilization-progress":function(n){return e.networkEvent("stabilizationProgress")},"stabilization-iterations-done":function(n){return e.networkEvent("stabilizationIterationsDone")},stabilized:function(n){return e.networkEvent("stabilized")},resize:function(n){return e.networkEvent("resize")},"init-redraw":function(n){return e.networkEvent("initRedraw")},"before-drawing":function(n){return e.networkEvent("beforeDrawing")},"after-drawing":function(n){return e.networkEvent("afterDrawing")},"animation-finished":function(n){return e.networkEvent("animationFinished")},"config-change":function(n){return e.networkEvent("configChange")},"nodes-mounted":function(n){return e.networkEvent("nodes-mounted")},"nodes-add":function(n){return e.networkEvent("nodes-add")},"nodes-update":function(n){return e.networkEvent("nodes-update")},"nodes-remove":function(n){return e.networkEvent("nodes-remove")},"edges-mounted":function(n){return e.networkEvent("edges-mounted")},"edges-add":function(n){return e.networkEvent("edges-add")},"edges-update":function(n){return e.networkEvent("edges-update")},"edges-remove":function(n){return e.networkEvent("edges-remove")}}}),t("button",{on:{click:e.addNode}},[e._v("Add node")]),t("button",{on:{click:e.addEdge}},[e._v("Add edge")]),t("button",{on:{click:e.resetNetwork}},[e._v("Reset Network")]),t("button",{on:{click:e.removeNode}},[e._v("Remove Node")]),t("button",{on:{click:e.removeEdge}},[e._v("Remove Edge")]),t("div",{staticClass:"events"},[t("p",[e._v(" Network events: "),t("br"),e._v(" "+e._s(e.networkEvents)+" ")])])],1)},R=[],F=(t(2222),t(561),t(7301)),L=[{id:"디자인",label:"디자인",value:.22137995638153773},{id:"제품",label:"제품",value:.06604884464492325},{id:"냉장고",label:"냉장고",value:.08333333333333333},{id:"스타일",label:"스타일",value:.08333333333333333},{id:"하나",label:"하나",value:.07636080536975727},{id:"생각",label:"생각",value:.08701303662200743},{id:"공간",label:"공간",value:.09411975018853684},{id:"사용",label:"사용",value:.09411975018853684},{id:"인테리어",label:"인테리어",value:.06604884464492324},{id:"다양",label:"다양",value:.039381539923353186},{id:"제작",label:"제작",value:.039381539923353186},{id:"시간",label:"시간",value:.0494792654464041}],q={name:"VueVis",components:{DataInfo:V,Network:F.Z},data:function(){return{networkEvents:"",network:{nodes:L,edges:[{from:"디자인",to:"제품",length:5466.5},{from:"스타일",to:"냉장고",length:4995.3},{from:"하나",to:"생각",length:4932.5},{from:"공간",to:"디자인",length:4806.8},{from:"하나",to:"디자인",length:4649.7},{from:"사용",to:"디자인",length:4618.3},{from:"공간",to:"인테리어",length:4586.9},{from:"인테리어",to:"디자인",length:.043984*1e5},{from:"다양",to:"디자인",length:4304.1},{from:"제작",to:"디자인",length:.041784*1e5},{from:"사용",to:"제품",length:4147},{from:"공간",to:"사용",length:.041156*1e5},{from:"시간",to:"생각",length:4052.8}],options:{nodes:{shape:"circle",scaling:{label:{enabled:!0,min:50,max:500}}}}}}},methods:{networkEvent:function(e){this.networkEvents.length>500&&(this.networkEvents=""),this.networkEvents+="".concat(e,", ")},addNode:function(){var e=(new Date).getTime();this.nodes.push({id:e,label:"New node"})},addEdge:function(){var e=Math.floor(Math.random()*this.nodes.length),n=Math.floor(Math.random()*this.nodes.length);this.edges.push({id:"".concat(this.nodes[e].id,"-").concat(this.nodes[n].id),from:this.nodes[e].id,to:this.nodes[n].id})},resetNetwork:function(){this.nodes=[{id:1,label:"Node 1"},{id:2,label:"Node 2"},{id:3,label:"Node 3"},{id:4,label:"Node 4"},{id:5,label:"Node 5"}],this.edges=[{id:1,from:1,to:3},{id:2,from:1,to:2},{id:3,from:2,to:4},{id:4,from:2,to:5},{id:5,from:3,to:3}],this.options={}},removeNode:function(){this.nodes.splice(0,1)},removeEdge:function(){this.edges.splice(0,1)}}},B=q,G=(0,f.Z)(B,A,R,!1,null,"5d3b2112",null),H=G.exports;o["default"].use(p.Z);var K=new p.Z({mode:"history",base:"/vue-network-demo",routes:[{path:"/D3Js",name:"D3Js",component:j},{path:"/D3Vue",name:"D3Vue",component:J},{path:"/VisJs",name:"VisJs",component:T},{path:"/VueVis",name:"VueVis",component:H}]});o["default"].config.productionTip=!1,new o["default"]({render:function(e){return e(h)},vuetify:a,router:K}).$mount("#app")}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}t.m=e,function(){var e=[];t.O=function(n,o,r,i){if(!o){var u=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var a=!0,d=0;d<o.length;d++)(!1&i||u>=i)&&Object.keys(t.O).every((function(e){return t.O[e](o[d])}))?o.splice(d--,1):(a=!1,i<u&&(u=i));if(a){e.splice(l--,1);var s=r();void 0!==s&&(n=s)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,i,u=o[0],a=o[1],d=o[2],s=0;if(u.some((function(n){return 0!==e[n]}))){for(r in a)t.o(a,r)&&(t.m[r]=a[r]);if(d)var l=d(t)}for(n&&n(o);s<u.length;s++)i=u[s],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(l)},o=self["webpackChunknetwork_demo"]=self["webpackChunknetwork_demo"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(8067)}));o=t.O(o)})();
//# sourceMappingURL=app-legacy.04fdee29.js.map