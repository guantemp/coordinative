(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/register"],{"20fd":function(e,t,n){"use strict";(function(e){n("8da0");o(n("66fd"));var t=o(n("fdc0"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"63e5":function(e,t,n){"use strict";var o=n("af43"),u=n.n(o);u.a},9271:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("1e0e"));function u(e){return e&&e.__esModule?e:{default:e}}var a=new o.default,c={data:function(){return{agreement:!0,username:"",password:"",code:"",sendCodeDisable:!1,codeSeconds:0,countDown:10}},methods:{sendCode:function(){var e=this;this.$u.test.mobile(this.username)?(a.post("http://demo.rageframe.com/api/tiny-shop/v1/site/sms-code",{mobile:this.username,usage:"register"}).then((function(t){200==t.data.code?e.$util.toast("验证码发送成功, 验证码是".concat(t.data.data)):e.$util.toast(t.data.message)})).catch((function(e){console.log(e)})),this.handleSmsCodeTime(this.countDown)):this.$u.toast("请输入正确的手机号码")},handleSmsCodeTime:function(e){var t=this,n=setInterval((function(){0===e?(clearInterval(n),t.sendCodeDisable=!1):(t.codeSeconds=e,t.sendCodeDisable=!0,e--)}),1e3)},navBack:function(){e.navigateBack()},checkAgreement:function(){this.agreement=!this.agreement},register:function(){},navToAgreementDetail:function(t){console.log(t),e.navigateTo({})}}};t.default=c}).call(this,n("543d")["default"])},ad7d:function(e,t,n){"use strict";n.r(t);var o=n("9271"),u=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=u.a},af43:function(e,t,n){},e6c9:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uCheckbox:function(){return n.e("uview-ui/components/u-checkbox/u-checkbox").then(n.bind(null,"9078"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"140b"))}},u=function(){var e=this,t=e.$createElement;e._self._c},a=[]},fdc0:function(e,t,n){"use strict";n.r(t);var o=n("e6c9"),u=n("ad7d");for(var a in u)"default"!==a&&function(e){n.d(t,e,(function(){return u[e]}))}(a);n("63e5");var c,i=n("f0c5"),s=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"c1d46b90",null,!1,o["a"],c);t["default"]=s.exports}},[["20fd","common/runtime","common/vendor"]]]);