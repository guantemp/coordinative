(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"0a0e":function(e,t,n){},"501e":function(e,t,n){"use strict";n.r(t);var o=n("b51f"),r=n("7b19");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("b6bc");var c,a=n("f0c5"),s=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,"0e4c39d6",null,!1,o["a"],c);t["default"]=s.exports},7741:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){n.e("components/list-cell/index").then(function(){return resolve(n("a5a5"))}.bind(null,n)).catch(n.oe)},r={components:{listCell:o},data:function(){return{hasLogin:!1,userInfo:{nickname:"一去二三里",username:"guantemp"},bonus:9999,attendanceList:[{icon:"/static/user/clock_in.png",url:"/pages/user/clock_in",title:"打卡",color:"#ff6b81"},{icon:"/static/user/work_overtime.png",url:"/pages/user/work_overtime",title:"加班",color:"#ff6b81"},{icon:"/static/user/leave.png",url:"/pages/user/leave",title:"请假",color:"#ff6b81"},{icon:"/static/user/apply_for_car.png",url:"/pages/warehouse/warehouse",title:"用车",color:"#ff6b81"},{icon:"/static/user/travel.png",url:"/pages/warehouse/warehouse",title:"出差",color:"#ff6b81"},{icon:"/static/user/repair.png",url:"/pages/warehouse/warehouse",title:"报修",color:"#ff6b81"},{icon:"/static/user/apply.png",url:"/pages/warehouse/warehouse",title:"申领",color:"#ff6b81"},{icon:"/static/user/purchase.png",url:"/pages/warehouse/warehouse",title:"申购",color:"#ff6b81"},{icon:"/static/user/reimbursement.png",url:"/pages/user/go_out",title:"报销",color:"#ff6b81"}]}},methods:{getUseinfo:function(){e.getProvider({service:"oauth",success:function(t){console.log(t.provider),e.login({provider:"weixin",success:function(e){console.log(e.code)}})}})},navTo:function(t){e.navigateTo({url:t})}}};t.default=r}).call(this,n("543d")["default"])},"7b19":function(e,t,n){"use strict";n.r(t);var o=n("7741"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},"963d":function(e,t,n){"use strict";(function(e){n("8da0");o(n("66fd"));var t=o(n("501e"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b51f:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},u=[]},b6bc:function(e,t,n){"use strict";var o=n("0a0e"),r=n.n(o);r.a}},[["963d","common/runtime","common/vendor"]]]);