(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"3ETq":function(t,e,n){"use strict";n.r(e),function(t){function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&i(t,e)}function i(t,e){return i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},i(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return s(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},f(t)}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y=n("hosL"),h=n("sl4G"),d=function(e){function n(){for(var t,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return p(s(t=r.call.apply(r,[this].concat(n))),"handleMouseEnter",(function(){t.props.addBall(t.props.row,t.props.col)})),t}l(n,e);var r=u(n);return a(n,[{key:"render",value:function(){var e=this,n=255*this.props.cell,r="background-color: rgb(".concat(n,", ").concat(n,", ").concat(n,")");return t("div",{class:h.a.cell,style:r,cell:this.props.cell,onMouseEnter:function(t){e.handleMouseEnter(t)}})}}]),n}(y.Component),b=function(e){function n(){return r.apply(this,arguments)}l(n,e);var r=u(n);return a(n,[{key:"buildCols",value:function(){var e=this,n=[];return this.props.cells.forEach((function(r,o){n.push(t(d,{addBall:e.props.addBall,cell:r,row:e.props.row,col:o,key:o}))})),n}},{key:"render",value:function(){return t("div",{class:h.a.row},this.buildCols())}}]),n}(y.Component),v=function(e){function n(){for(var t,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return p(s(t=r.call.apply(r,[this].concat(n))),"state",{interval:!1,balls:[],grid:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]}),p(s(t),"addBall",(function(e,n){var r=n-5,o=e-5,a=Math.sqrt(r*r+o*o),l=(360+180*Math.atan2(o,r)/Math.PI)%360,i=t.state.balls.concat([{angle:l,radius:a,energy:1}]);t.setState({balls:i})})),t}l(n,e);var r=u(n);return a(n,[{key:"buildRows",value:function(){var e=this,n=[];return this.state.grid.forEach((function(r,o){n.push(t(b,{addBall:e.addBall,row:o,cells:r,key:o}))})),n}},{key:"render",value:function(){return t("div",{class:h.a.grid},this.buildRows())}},{key:"componentWillMount",value:function(){var t=this,e=setInterval((function(){t.updateSimulation(t)}),25);this.setState({interval:e})}},{key:"componentWillUnmount",value:function(){this.state.interval&&clearInterval(this.state.interval)}},{key:"updateSimulation",value:function(){for(var t=[],e=0;e<this.state.balls.length;e++){var n=this.state.balls[e],r=n.radius-=.05;if(r>0)t.push({angle:(n.angle+5)%360,radius:r,energy:n.energy-.01})}for(var o=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],a=0;a<this.state.balls.length;a++){var l=this.state.balls[a],i=l.angle*Math.PI/180,u=5+Math.cos(i)*l.radius,c=Math.trunc(u),s=u%1,f=c+1,p=1-s,y=5+Math.sin(i)*l.radius,h=Math.trunc(y),d=y%1,b=h+1,v=1-d;h>=0&&h<10&&(c>=0&&c<10&&(o[h][c]=l.energy*d*s),f>=0&&f<10&&(o[h][f]=l.energy*d*p)),b>=0&&b<10&&(c>=0&&c<10&&(o[b][c]=l.energy*v*s),f>=0&&f<10&&(o[b][f]=l.energy*v*p))}this.setState({balls:t,grid:o})}}]),n}(y.Component);e.default=v}.call(this,n("hosL").h)},sl4G:function(t,e){"use strict";e.a={grid:"grid__VaoAf",row:"row__AQ9e1",cell:"cell__VyMma"}}}]);
//# sourceMappingURL=route-vortex.chunk.96575.js.map