(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-questionnaire-questionnaire"],{"17b7":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"returnArea",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.returnback.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"returnBt cuIcon-back"})],1),i("v-uni-view",{staticClass:"titlearea"},[t._v(t._s(t.atitle))]),i("v-uni-view",{staticClass:"introduction"},[t._v(t._s(t.introduction))]),i("v-uni-view",{staticStyle:{"margin-top":"8px"}}),t._l(t.article,(function(e,n){return i("v-uni-view",{staticClass:"timuwhole"},[i("v-uni-radio-group",[i("v-uni-view",{staticClass:"subjectClass",staticStyle:{"margin-bottom":"4px"}},[t._v("第"+t._s(n+1)+"题、"+t._s(e.subject))]),i("v-uni-view",{staticClass:"optionwholeclass"},[i("v-uni-view",{staticClass:"optionclass",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getAnswer(1,n)}}},[i("v-uni-radio",{staticStyle:{transform:"scale(0.6)"},attrs:{value:"A"}}),t._v("A."+t._s(e.option1))],1),i("v-uni-view",{staticClass:"optionclass",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getAnswer(2,n)}}},[i("v-uni-radio",{staticStyle:{transform:"scale(0.6)"},attrs:{value:"B"}}),t._v("B."+t._s(e.option2))],1),i("v-uni-view",{staticClass:"optionclass",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getAnswer(3,n)}}},[i("v-uni-radio",{staticStyle:{transform:"scale(0.6)"},attrs:{value:"C"}}),t._v("C."+t._s(e.option3))],1),i("v-uni-view",{staticClass:"optionclass",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getAnswer(4,n)}}},[i("v-uni-radio",{staticStyle:{transform:"scale(0.6)"},attrs:{value:"D"}}),t._v("D."+t._s(e.option4))],1)],1)],1)],1)})),i("v-uni-button",{staticStyle:{width:"60%","margin-top":"16px"},attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("提交")])],2)},s=[]},"1abd":function(t,e,i){"use strict";i.r(e);var n=i("d693"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},3589:function(t,e,i){"use strict";i.r(e);var n=i("17b7"),a=i("1abd");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("fc42");var r,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"051544b2",null,!1,n["a"],r);e["default"]=c.exports},7395:function(t,e,i){var n=i("e6b2");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("34c3e152",n,!0,{sourceMap:!1,shadowMode:!1})},d693:function(t,e,i){"use strict";(function(t){i("ac1f"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{answerarr:[],articleID:"",atitle:"个人评价问卷",introduction:"",article:[],result:["未知错误无结果","20分"]}},onLoad:function(e){var i=this;this.articleID=e.id,this.atitle=e.title;var n=this.articleID;t.log("aid"+n),uni.request({url:"http://139.196.45.104:9001/getQuestion",data:{id:n},header:{"custom-header":"hello"},success:function(e){t.log(e.data),i.introduction=e.data.data[0].toast}}),uni.request({url:"http://139.196.45.104:9001/getOption",data:{id:n},header:{"custom-header":"hello"},success:function(e){t.log(e.data.data),i.article=e.data.data}})},methods:{test:function(){},returnback:function(){uni.navigateBack({})},submit:function(){var e=this,i=this.articleID;t.log(this.answerarr),uni.request({url:"http://139.196.45.104:9001/getResult",data:{id:i,sid:"s001",answer:this.answerarr},method:"POST",header:{"custom-header":"hello"},success:function(i){t.log(i.data),e.result=i.data.split(";"),e.result[0]="结果"+e.result[0]+"  ",e.result[1]="得分"+e.result[1]+"分",uni.showModal({title:"试卷分析",content:e.result[0]+e.result[1],cancelText:"复制",success:function(i){i.confirm?t.log("用户点击确定"):i.cancel&&(t.log("用户点击复制"),uni.setClipboardData({data:e.result[0]+e.result[1],success:function(){t.log("success"),uni.showToast({title:"已复制到剪切板",duration:2e3})}}))}})}})},getAnswer:function(e,i){t.log(e),t.log(i),t.log(typeof i),1==e?this.answerarr[i]="A":2==e?this.answerarr[i]="B":3==e?this.answerarr[i]="C":4==e&&(this.answerarr[i]="D")}}};e.default=n}).call(this,i("5a52")["default"])},e6b2:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".returnArea[data-v-051544b2]{width:100%;height:28px;display:flex;flex-direction:row;justify-content:left}.returnBt[data-v-051544b2]{text-align:center;background-color:#fff;border-radius:16px;width:40px;margin-left:16px;font-size:12px;display:flex;justify-content:center;align-items:center}.titlearea[data-v-051544b2]{width:100%;font-size:18px;text-align:center}.introduction[data-v-051544b2]{font-size:14px;text-indent:32px}.optionwholeclass[data-v-051544b2]{\n\t/* 题目选项 */display:flex;flex-direction:row}.subjectClass[data-v-051544b2]{\n\t/* 题目的问题 */text-indent:16px;width:100%;font-size:12px}.timuwhole[data-v-051544b2]{\n\t/* 整体题目 */width:100%;\n/* \theight: 60px; */display:flex;flex-direction:column}.optionclass[data-v-051544b2]{\n\t/* 具体选项 */width:25%;font-size:12px}",""]),t.exports=e},fc42:function(t,e,i){"use strict";var n=i("7395"),a=i.n(n);a.a}}]);