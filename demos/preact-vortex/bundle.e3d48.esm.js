!function(e){function t(r){if(n[r])return n[r].exports;var l=n[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var l in e)t.d(r,l,function(t){return e[t]}.bind(null,l));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/demos/preact-vortex",t(t.s="mdyV")}({NL3F:function(e,t){"use strict";t.a={grid:"grid__WIPhk",row:"row__kVa55",cell:"cell__c5DcT"}},QfWi:function(e,t,n){"use strict";n.r(t);var r=n("ugae");t.default=r.a},hP38:function(e,t,n){"use strict";(function(e){function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=n("hosL"),o=n("NL3F");class _ extends l.Component{constructor(...e){super(...e),r(this,"handleMouseEnter",(()=>{this.props.addBall(this.props.row,this.props.col)}))}render(){const t=255*this.props.cell;return e("div",{class:o.a.cell,style:`background-color: rgb(${t}, ${t}, ${t})`,cell:this.props.cell,onMouseEnter:e=>{this.handleMouseEnter(e)}})}}class i extends l.Component{buildCols(){let t=[];return this.props.cells.forEach(((n,r)=>{t.push(e(_,{addBall:this.props.addBall,cell:n,row:this.props.row,col:r,key:r}))})),t}render(){return e("div",{class:o.a.row},this.buildCols())}}t.a=class extends l.Component{constructor(...e){super(...e),r(this,"state",{interval:!1,balls:[],grid:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]}),r(this,"addBall",((e,t)=>{let n=t-5,r=e-5,l=Math.sqrt(n*n+r*r),o=(360+180*Math.atan2(r,n)/Math.PI)%360,_=this.state.balls.concat([{angle:o,radius:l,energy:1}]);this.setState({balls:_})}))}buildRows(){let t=[];return this.state.grid.forEach(((n,r)=>{t.push(e(i,{addBall:this.addBall,row:r,cells:n,key:r}))})),t}render(){return e("div",{class:o.a.grid},this.buildRows())}componentWillMount(){let e=setInterval((()=>{this.updateSimulation(this)}),25);this.setState({interval:e})}componentWillUnmount(){this.state.interval&&clearInterval(this.state.interval)}updateSimulation(){const e=[];for(let t=0;t<this.state.balls.length;t++){let n=this.state.balls[t],r=n.radius-=.05;if(r>0){e.push({angle:(n.angle+5)%360,radius:r,energy:n.energy-.01})}}const t=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];for(let e=0;e<this.state.balls.length;e++){let n=this.state.balls[e];const r=n.angle*Math.PI/180,l=5+Math.cos(r)*n.radius,o=Math.trunc(l),_=l%1,i=o+1,u=1-_,s=5+Math.sin(r)*n.radius,c=Math.trunc(s),a=s%1,f=c+1,d=1-a;c>=0&&c<10&&(o>=0&&o<10&&(t[c][o]=n.energy*a*_),i>=0&&i<10&&(t[c][i]=n.energy*a*u)),f>=0&&f<10&&(o>=0&&o<10&&(t[f][o]=n.energy*d*_),i>=0&&i<10&&(t[f][i]=n.energy*d*u))}this.setState({balls:e,grid:t})}}}).call(this,n("hosL").h)},hosL:function(e,t,n){"use strict";function r(e,t){for(var n in t)e[n]=t[n];return e}function l(e){var t=e.parentNode;t&&t.removeChild(e)}function o(e,t,n){var r,l,o,i={};for(o in t)"key"==o?r=t[o]:"ref"==o?l=t[o]:i[o]=t[o];if(arguments.length>2&&(i.children=arguments.length>3?A.call(arguments,2):n),"function"==typeof e&&null!=e.defaultProps)for(o in e.defaultProps)void 0===i[o]&&(i[o]=e.defaultProps[o]);return _(e,i,r,l,null)}function _(e,t,n,r,l){var o={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++U:l};return null==l&&null!=D.vnode&&D.vnode(o),o}function i(){return{current:null}}function u(e){return e.children}function s(e,t){this.props=e,this.context=t}function c(e,t){if(null==t)return e.__?c(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?c(e):null}function a(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return a(e)}}function f(e){(!e.__d&&(e.__d=!0)&&N.push(e)&&!d.__r++||R!==D.debounceRendering)&&((R=D.debounceRendering)||O)(d)}function d(){for(var e;d.__r=N.length;)e=N.sort((function(e,t){return e.__v.__b-t.__v.__b})),N=[],e.some((function(e){var t,n,l,o,_,i;e.__d&&(_=(o=(t=e).__v).__e,(i=t.__P)&&(n=[],(l=r({},o)).__v=o.__v+1,C(i,o,l,t.__n,void 0!==i.ownerSVGElement,null!=o.__h?[_]:null,n,null==_?c(o):_,o.__h),x(n,o),o.__e!=_&&a(o)))}))}function p(e,t,n,r,l,o,i,s,a,f){var d,p,v,m,g,b,k,x=r&&r.__k||F,P=x.length;for(n.__k=[],d=0;d<t.length;d++)if(null!=(m=n.__k[d]=null==(m=t[d])||"boolean"==typeof m?null:"string"==typeof m||"number"==typeof m||"bigint"==typeof m?_(null,m,null,null,m):Array.isArray(m)?_(u,{children:m},null,null,null):m.__b>0?_(m.type,m.props,m.key,null,m.__v):m)){if(m.__=n,m.__b=n.__b+1,null===(v=x[d])||v&&m.key==v.key&&m.type===v.type)x[d]=void 0;else for(p=0;p<P;p++){if((v=x[p])&&m.key==v.key&&m.type===v.type){x[p]=void 0;break}v=null}C(e,m,v=v||B,l,o,i,s,a,f),g=m.__e,(p=m.ref)&&v.ref!=p&&(k||(k=[]),v.ref&&k.push(v.ref,null,m),k.push(p,m.__c||g,m)),null!=g?(null==b&&(b=g),"function"==typeof m.type&&m.__k===v.__k?m.__d=a=h(m,a,e):a=y(e,m,v,x,g,a),"function"==typeof n.type&&(n.__d=a)):a&&v.__e==a&&a.parentNode!=e&&(a=c(v))}for(n.__e=b,d=P;d--;)null!=x[d]&&("function"==typeof n.type&&null!=x[d].__e&&x[d].__e==n.__d&&(n.__d=c(r,d+1)),w(x[d],x[d]));if(k)for(d=0;d<k.length;d++)S(k[d],k[++d],k[++d])}function h(e,t,n){for(var r,l=e.__k,o=0;l&&o<l.length;o++)(r=l[o])&&(r.__=e,t="function"==typeof r.type?h(r,t,n):y(n,r,r,l,r.__e,t));return t}function v(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){v(e,t)})):t.push(e)),t}function y(e,t,n,r,l,o){var _,i,u;if(void 0!==t.__d)_=t.__d,t.__d=void 0;else if(null==n||l!=o||null==l.parentNode)e:if(null==o||o.parentNode!==e)e.appendChild(l),_=null;else{for(i=o,u=0;(i=i.nextSibling)&&u<r.length;u+=2)if(i==l)break e;e.insertBefore(l,o),_=o}return void 0!==_?_:l.nextSibling}function m(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||H.test(t)?n:n+"px"}function g(e,t,n,r,l){var o;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||m(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||m(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])o=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+o]=n,n?r||e.addEventListener(t,o?k:b,o):e.removeEventListener(t,o?k:b,o);else if("dangerouslySetInnerHTML"!==t){if(l)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function b(e){this.l[e.type+!1](D.event?D.event(e):e)}function k(e){this.l[e.type+!0](D.event?D.event(e):e)}function C(e,t,n,l,o,_,i,c,a){var f,d,h,v,y,m,g,b,k,C,x,S=t.type;if(void 0!==t.constructor)return null;null!=n.__h&&(a=n.__h,c=t.__e=n.__e,t.__h=null,_=[c]),(f=D.__b)&&f(t);try{e:if("function"==typeof S){if(b=t.props,k=(f=S.contextType)&&l[f.__c],C=f?k?k.props.value:f.__:l,n.__c?g=(d=t.__c=n.__c).__=d.__E:("prototype"in S&&S.prototype.render?t.__c=d=new S(b,C):(t.__c=d=new s(b,C),d.constructor=S,d.render=M),k&&k.sub(d),d.props=b,d.state||(d.state={}),d.context=C,d.__n=l,h=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=S.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=r({},d.__s)),r(d.__s,S.getDerivedStateFromProps(b,d.__s))),v=d.props,y=d.state,h)null==S.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==S.getDerivedStateFromProps&&b!==v&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(b,C),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(b,d.__s,C)||t.__v===n.__v){d.props=b,d.state=d.__s,t.__v!==n.__v&&(d.__d=!1),d.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach((function(e){e&&(e.__=t)})),d.__h.length&&i.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(b,d.__s,C),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(v,y,m)}))}d.context=C,d.props=b,d.state=d.__s,(f=D.__r)&&f(t),d.__d=!1,d.__v=t,d.__P=e,f=d.render(d.props,d.state,d.context),d.state=d.__s,null!=d.getChildContext&&(l=r(r({},l),d.getChildContext())),h||null==d.getSnapshotBeforeUpdate||(m=d.getSnapshotBeforeUpdate(v,y)),x=null!=f&&f.type===u&&null==f.key?f.props.children:f,p(e,Array.isArray(x)?x:[x],t,n,l,o,_,i,c,a),d.base=t.__e,t.__h=null,d.__h.length&&i.push(d),g&&(d.__E=d.__=null),d.__e=!1}else null==_&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=P(n.__e,t,n,l,o,_,i,a);(f=D.diffed)&&f(t)}catch(e){t.__v=null,(a||null!=_)&&(t.__e=c,t.__h=!!a,_[_.indexOf(c)]=null),D.__e(e,t,n)}}function x(e,t){D.__c&&D.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){D.__e(e,t.__v)}}))}function P(e,t,n,r,o,_,i,u){var s,a,f,d=n.props,h=t.props,v=t.type,y=0;if("svg"===v&&(o=!0),null!=_)for(;y<_.length;y++)if((s=_[y])&&"setAttribute"in s==!!v&&(v?s.localName===v:3===s.nodeType)){e=s,_[y]=null;break}if(null==e){if(null===v)return document.createTextNode(h);e=o?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),_=null,u=!1}if(null===v)d===h||u&&e.data===h||(e.data=h);else{if(_=_&&A.call(e.childNodes),a=(d=n.props||B).dangerouslySetInnerHTML,f=h.dangerouslySetInnerHTML,!u){if(null!=_)for(d={},y=0;y<e.attributes.length;y++)d[e.attributes[y].name]=e.attributes[y].value;(f||a)&&(f&&(a&&f.__html==a.__html||f.__html===e.innerHTML)||(e.innerHTML=f&&f.__html||""))}if(function(e,t,n,r,l){var o;for(o in n)"children"===o||"key"===o||o in t||g(e,o,null,n[o],r);for(o in t)l&&"function"!=typeof t[o]||"children"===o||"key"===o||"value"===o||"checked"===o||n[o]===t[o]||g(e,o,t[o],n[o],r)}(e,h,d,o,u),f)t.__k=[];else if(y=t.props.children,p(e,Array.isArray(y)?y:[y],t,n,r,o&&"foreignObject"!==v,_,i,_?_[0]:n.__k&&c(n,0),u),null!=_)for(y=_.length;y--;)null!=_[y]&&l(_[y]);u||("value"in h&&void 0!==(y=h.value)&&(y!==e.value||"progress"===v&&!y||"option"===v&&y!==d.value)&&g(e,"value",y,d.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==e.checked&&g(e,"checked",y,d.checked,!1))}return e}function S(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){D.__e(e,n)}}function w(e,t,n){var r,o;if(D.unmount&&D.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||S(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){D.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&w(r[o],t,"function"!=typeof e.type);n||null==e.__e||l(e.__e),e.__e=e.__d=void 0}function M(e,t,n){return this.constructor(e,n)}function E(e,t,n){var r,l,_;D.__&&D.__(e,t),l=(r="function"==typeof n)?null:n&&n.__k||t.__k,_=[],C(t,e=(!r&&n||t).__k=o(u,null,[e]),l||B,B,void 0!==t.ownerSVGElement,!r&&n?[n]:l?null:t.firstChild?A.call(t.childNodes):null,_,!r&&n?n:l?l.__e:t.firstChild,r),x(_,e)}function L(e,t){E(e,t,L)}function T(e,t,n){var l,o,i,u=r({},e.props);for(i in t)"key"==i?l=t[i]:"ref"==i?o=t[i]:u[i]=t[i];return arguments.length>2&&(u.children=arguments.length>3?A.call(arguments,2):n),_(e.type,u,l||e.key,o||e.ref,null)}function W(e,t){var n={__c:t="__cC"+j++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var n,r;return this.getChildContext||(n=[],(r={})[t]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&n.some(f)},this.sub=function(e){n.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n.splice(n.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Provider.__=n.Consumer.contextType=n}n.r(t),n.d(t,"render",(function(){return E})),n.d(t,"hydrate",(function(){return L})),n.d(t,"createElement",(function(){return o})),n.d(t,"h",(function(){return o})),n.d(t,"Fragment",(function(){return u})),n.d(t,"createRef",(function(){return i})),n.d(t,"isValidElement",(function(){return I})),n.d(t,"Component",(function(){return s})),n.d(t,"cloneElement",(function(){return T})),n.d(t,"createContext",(function(){return W})),n.d(t,"toChildArray",(function(){return v})),n.d(t,"options",(function(){return D}));var A,D,U,I,N,O,R,j,B={},F=[],H=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;A=F.slice,D={__e:function(e,t,n,r){for(var l,o,_;t=t.__;)if((l=t.__c)&&!l.__)try{if((o=l.constructor)&&null!=o.getDerivedStateFromError&&(l.setState(o.getDerivedStateFromError(e)),_=l.__d),null!=l.componentDidCatch&&(l.componentDidCatch(e,r||{}),_=l.__d),_)return l.__E=l}catch(t){e=t}throw e}},U=0,I=function(e){return null!=e&&void 0===e.constructor},s.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=r({},this.state),"function"==typeof e&&(e=e(r({},n),this.props)),e&&r(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),f(this))},s.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),f(this))},s.prototype.render=u,N=[],O="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,d.__r=0,j=0},mdyV:function(e,t,n){"use strict";n.r(t);var r=n("hosL");const{h:l,render:o,hydrate:_}=r,i=e=>e&&e.default?e.default:e,u=e=>"/"===e[e.length-1]?e:e+"/";if("serviceWorker"in navigator&&navigator.serviceWorker.register(u(n.p)+"sw-esm.js"),"function"==typeof i(n("QfWi"))){let e=document.getElementById("preact_root")||document.body.firstElementChild,t=()=>{let t=i(n("QfWi")),r={};const s=document.querySelector('[type="__PREACT_CLI_DATA__"]');s&&(r=JSON.parse(decodeURI(s.innerHTML)).preRenderData||r);const c={preRenderData:r},a=r.url?u(r.url):"";(_&&a===u(location.pathname)?_:o)(l(t,{CLI_DATA:c}),document.body,e)};0,t()}},ugae:function(e,t,n){"use strict";(function(e){var r=n("hP38");t.a=()=>e("div",{id:"app"},e(r.a,null))}).call(this,n("hosL").h)}});
//# sourceMappingURL=bundle.e3d48.esm.js.map