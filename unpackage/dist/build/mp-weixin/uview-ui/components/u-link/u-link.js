(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-link/u-link"],{"58d3":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"u-link",props:{color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},underLine:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""}},methods:{openLink:function(){var n=this;t.setClipboardData({data:this.href,success:function(){t.hideToast(),n.$nextTick((function(){n.$u.toast(n.mpTips)}))}})}}};n.default=e}).call(this,e("543d")["default"])},5971:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"74af":function(t,n,e){"use strict";e.r(n);var u=e("58d3"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a},"81c0":function(t,n,e){},9944:function(t,n,e){"use strict";var u=e("81c0"),i=e.n(u);i.a},d7c9:function(t,n,e){"use strict";e.r(n);var u=e("5971"),i=e("74af");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("9944");var r,f=e("f0c5"),o=Object(f["a"])(i["default"],u["b"],u["c"],!1,null,"e94f7372",null,!1,u["a"],r);n["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-link/u-link-create-component',
    {
        'uview-ui/components/u-link/u-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d7c9"))
        })
    },
    [['uview-ui/components/u-link/u-link-create-component']]
]);
