(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Reading-Reading"],{"3db5":function(t,e,i){"use strict";i.r(e);var a=i("9b7c"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"3f05":function(t,e,i){"use strict";var a=i("6254"),n=i.n(a);n.a},6254:function(t,e,i){var a=i("a60d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("bf76f024",a,!0,{sourceMap:!1,shadowMode:!1})},"9b7c":function(t,e,i){"use strict";(function(t){i("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{article:[],temparr:{}}},onLoad:function(){var e=this;uni.request({url:"http://139.196.45.104:9001/getArticle",data:{type:2},header:{"custom-header":"hello"},success:function(i){t.log(),e.article=i.data.data;for(var a=0;a<e.article.length;a++){var n=e.article[a].time;e.article[a].time=e.timestampTotime("date",n)+"/"+e.timestampTotime("time",n)}t.log(e.article)},fail:function(e){t.log(e)}})},methods:{showarticle:function(t){this.$refs.popup.open("center"),this.temparr=this.article[t]},close:function(){this.$refs.popup.close()},timestampTotime:function(t,e){var i=new Date(parseInt(e)),a=i.getMonth()+1,n=i.getDate(),s=i.getHours(),c=i.getMinutes(),r=i.getSeconds();return"date"==t?(a>=1&&a<=9&&(a="0"+a),n>=1&&n<=9&&(n="0"+n),a+"-"+n):(s>=0&&s<=9&&(s="0"+s),c>=0&&c<=9&&(c="0"+c),r>=0&&r<=9&&(r="0"+r),s+":"+c+":"+r)}}};e.default=a}).call(this,i("5a52")["default"])},a60d:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".titlearea[data-v-53f47f4e]{width:100%;font-size:18px;text-align:center}.contrent[data-v-53f47f4e]{font-size:14px;text-indent:32px}.otherMessage[data-v-53f47f4e]{margin-top:4px;width:100%;text-align:right;font-size:12px}",""]),t.exports=e},df51:function(t,e,i){"use strict";i.r(e);var a=i("e501"),n=i("3db5");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("3f05");var c,r=i("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"53f47f4e",null,!1,a["a"],c);e["default"]=u.exports},e501:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var a={uniPopup:i("7ba6").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t._l(t.article,(function(e,a){return i("v-uni-view",{staticClass:"cu-card article",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showarticle(a)}}},[i("v-uni-view",{staticClass:"cu-item shadow"},[i("v-uni-view",{staticClass:"title"},[i("v-uni-view",{staticClass:"text-cut"},[t._v(t._s(e.title))])],1),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"desc"},[i("v-uni-view",{staticClass:"text-content"},[t._v(t._s(e.content))]),i("v-uni-view",{staticStyle:{"text-align":"right"}},[i("v-uni-view",{staticClass:"cu-tag bg-red light sm round"},[t._v("作者："+t._s(e.publisher))]),i("v-uni-view",{staticClass:"cu-tag bg-green light sm round"},[t._v(t._s(e.time))])],1)],1)],1)],1)],1)})),i("uni-popup",{ref:"popup",attrs:{"mask-click":!1}},[i("v-uni-view",{staticClass:"cuIcon-close",staticStyle:{width:"100%",height:"24x","background-color":"aliceblue","font-size":"18px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}),i("v-uni-scroll-view",{staticStyle:{width:"600rpx",height:"800rpx","background-color":"aliceblue"}},[i("v-uni-view",{staticClass:"titlearea"},[t._v(t._s(t.temparr.title))]),i("v-uni-view",{staticClass:"contrent"},[t._v(t._s(t.temparr.content))]),i("v-uni-view",{staticClass:"otherMessage"},[t._v("作者:"+t._s(t.temparr.publisher)+" 创作时间:"+t._s(t.temparr.time))])],1)],1)],2)},s=[]}}]);