webpackJsonp([0],[function(e,t,n){e.exports=n(1)},function(e,t,n){(function(e,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(10),l=o(r);n(19),e.render(t.createElement(l.default,null),document.getElementById("root"))}).call(t,n(2),n(2))},,,,,,,,,function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),l=o(r),a=n(11),i=function(){return l.default.createElement("div",null,l.default.createElement(a.Autocomplete,null))};t.default=i},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Autocomplete=void 0;var r=n(12),l=o(r);t.Autocomplete=l.default},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(13),l=o(r);t.default=l.default},function(e,t,n){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=o(c);n(15);var p=function(t){function n(e){l(this,n);var t=a(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.toggleVisible=function(){t.state.listVisible||t.setState({listVisible:!t.state.listVisible})},t.handleChange=function(e){t.setState(s({},t.state,e),t.searchResult)},t.searchResult=function(){var e=t.props,n=e.data,o=e.filterKey,r=null,l=t.state.keyword.trim().length?Object.keys(n).reduce(function(e,l){return n[l][o].toUpperCase().indexOf(t.state.keyword.trim().toUpperCase())>-1&&(e[l]=n[l],r=0),e},{}):t.props.data;t.setState({result:l,keyboardSelect:r})},t.setIndex=function(e){return function(n){t.setState({keyboardSelect:e})}},t.indexSelected=function(e){if(40!==e.keyCode&&38!==e.keyCode&&13!==e.keyCode)return!1;e.preventDefault();var n=(t.props.keys,t.state),o=n.result,r=n.keyboardSelect;if(13===e.keyCode&&null!==r&&r>-1&&Object.keys(o).length){var l=Object.keys(o)[r];t.setValue(l)}else{var a=Object.keys(o).length-1,i=null!==r?Number(r):-1,s=40===e.keyCode?i<a?i+=1:a:i>0?i-=1:0,u=t.resultList.clientHeight;if(u){var c=t.resultList.currentStyle||window.getComputedStyle(t.resultList),f=parseFloat(c.paddingTop)+parseFloat(c.paddingBottom),p=u-f,d=t.resultContent.clientHeight,m=!!(d>p);if(m){var b=t.resultItem.clientHeight;t.resultList.scrollTop=b*i}}t.setState({keyboardSelect:s})}},t.setValue=t.setValue.bind(t),t.state={listVisible:!1,keyword:"",result:{},keyboardSelect:null},t}return i(n,t),u(n,[{key:"componentWillMount",value:function(){this.searchResult()}},{key:"componentDidMount",value:function(){var e=this;this.props.autoFocus&&setTimeout(function(){e.input.focus()},300)}},{key:"componentWillReceiveProps",value:function(e){JSON.stringify(this.props.data)!==JSON.stringify(e.data)&&this.setState({result:e.data})}},{key:"setValue",value:function e(t){var n=this,o=this.props,r=o.data,e=o.setValue,l=o.filterKey,a=o.keys,i=this.state.result,s=a?i[t][a]:t;this.setState({keyword:e?r[t][l]:"",listVisible:!1},function(){n.searchResult(),n.props.onChange(s)})}},{key:"render",value:function(){var t=this,n=this.props,o=n.className,l=n.filterKey,a=n.placeholder,i=n.emptyText,s=this.state.result;return f.default.createElement("div",{className:e("rj_autocompleteContent",r({},o,"undefined"!=typeof o))},f.default.createElement("div",{className:"fl_center fw-900"},f.default.createElement("span",null,"⚲")),f.default.createElement("input",{onClick:this.toggleVisible,ref:function(e){t.input=e},autofocus:"autofocus",type:"text",value:this.state.keyword,onChange:function(e){return t.handleChange({keyword:e.target.value,listVisible:!!e.target.value.length})},onKeyDown:this.indexSelected,className:"rj_autocomplete",placeholder:a}),f.default.createElement("hr",null),f.default.createElement("hr",{className:"focus-border"}),f.default.createElement("div",{className:e("overlayCancel",{hidden:!this.state.listVisible}),onClick:function(){t.setState({listVisible:!1})}}),f.default.createElement("div",{ref:function(e){t.resultList=e},className:e("rj_list",{rj_list_hidden:!this.state.listVisible})},f.default.createElement("ul",{ref:function(e){t.resultContent=e}},Object.keys(s).length?Object.keys(s).map(function(n,o){return f.default.createElement("li",{key:"auto_"+n,ref:function(e){t.resultItem=e},className:e("result",{active:t.state.keyboardSelect===o}),onClick:function(){return t.setValue(n)},onMouseOver:t.setIndex(o)},s[n][l])}):f.default.createElement("li",null,i))))}}]),n}(c.Component);p.defaultProps={emptyText:"查無結果",placeholder:"請搜尋想找的項目",filterKey:"name",autoFocus:!1,setValue:!0,keys:null,data:r({test1:{name:"apple",fruit:"蘋果"},test2:{name:"banana",fruit:"香蕉"},test3:{name:"orange",fruit:"橘子"},test4:{name:"tomato",fruit:"番茄"},test5:{name:"strawberry",fruit:"草莓"},test6:{name:"wax apple",fruit:"蓮霧"},test7:{name:"blueberry",fruit:"藍莓"}},"test7",{name:"mango",fruit:"芒果"}),onChange:function(e){}},t.default=p}).call(t,n(14))},,function(e,t,n){var o=n(16);"string"==typeof o&&(o=[[e.id,o,""]]);n(18)(o,{insertAt:"top",singleton:!1});o.locals&&(e.exports=o.locals)},function(e,t,n){t=e.exports=n(17)(),t.push([e.id,".rj_autocompleteContent{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.rj_autocompleteContent input:focus{z-index:1001;outline:none}.rj_autocompleteContent input:focus+hr+hr.focus-border{-webkit-transform:scale(1);transform:scale(1)}.rj_autocompleteContent hr{position:absolute;width:100%;top:30px;left:0;border-top:1px solid #eee;transition:all .65s cubic-bezier(.23,1,.32,1)}.rj_autocompleteContent hr.focus-border{border-top:2px solid #1ea3aa;-webkit-transform:scale(0);transform:scale(0)}.rj_autocompleteContent .fl_center{-ms-flex-item-align:center;align-self:center;font-size:18px;width:30px}.rj_autocompleteContent .fl_center span{-webkit-transform:rotate(45deg);transform:rotate(45deg);display:block;text-align:center}.rj_autocompleteContent .rj_autocomplete{position:relative;z-index:1;font-size:18px;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;border:none;padding:5px 0;font-weight:200;letter-spacing:1px;color:#666;cursor:pointer}.rj_autocompleteContent .rj_list{position:absolute;top:100%;z-index:1002;left:0;width:100%;background-color:#fff;box-shadow:2px 2px 10px #ccc;max-height:300px;overflow:scroll;opacity:1;visibility:visible;-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0);will-change:transform;transition:all .2s ease-out}.rj_autocompleteContent .rj_list.rj_list_hidden{-webkit-transform:translate3d(0,30px,0);transform:translate3d(0,30px,0);opacity:0;visibility:hidden}.rj_autocompleteContent .rj_list ul{margin:0;padding:0}.rj_autocompleteContent .rj_list li{list-style:none;padding-left:10px;font-size:14px;color:#666;line-height:50px}.rj_autocompleteContent .rj_list li.result{cursor:pointer}.rj_autocompleteContent .rj_list li.result.active{background-color:#1ea3aa;color:#fff}.rj_autocompleteContent .overlayCancel{position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%}.hidden{display:none}",""])},,,function(e,t,n){var o=n(20);"string"==typeof o&&(o=[[e.id,o,""]]);n(18)(o,{insertAt:"top",singleton:!1});o.locals&&(e.exports=o.locals)},function(e,t,n){t=e.exports=n(17)(),t.push([e.id,"#root,body,html{height:100%}#root{padding:40px}",""])}]);