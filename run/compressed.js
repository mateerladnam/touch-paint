!function(){function e(e,n){function t(){var e=r+", "+d+"%, "+c+"%",n="hsl("+e+")",t="hsla("+e+", 0)",a="url(images/color-background.svg)",l="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";i.style.backgroundImage="linear-gradient("+l+"), linear-gradient(90deg, "+t+", "+n+"), "+a,o.style.backgroundImage="linear-gradient(90deg, "+l+"), linear-gradient("+n+", "+t+"), "+a}var a="AlphaSlider",i=l(a+"-portraitBar"),o=l(a+"-landscapeBar"),r=0,d=0,c=0,u=g(function(n){e(n),t()},n);return u.setRatio(1),u.addClass(a),u.barElement.appendChild(i),u.barElement.appendChild(o),t(),{abortTouch:u.abortTouch,element:u.element,setAlpha:u.setRatio,setHue:function(e){r=e,t()},setLuminance:function(e){c=e,t()},setSaturation:function(e){d=e,t()}}}function n(e,n){var t=l("Button-content");t.style.backgroundImage="url(images/"+e+".svg)";var a=l("Button");a.appendChild(t),a.addEventListener("touchstart",function(e){e.preventDefault(),n(),r.add("active"),clearTimeout(i),i=setTimeout(function(){r.remove("active")},100)});var i,o=!1,r=a.classList;return{element:a,addClass:function(e){r.add(e)},check:function(){r.add("checked"),o=!0},isChecked:function(){return o},uncheck:function(){r.remove("checked"),o=!1}}}function t(e,n){function t(e){e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete o[n[t].identifier]}function a(t){t.preventDefault();for(var a=d.getBoundingClientRect(),i=t.changedTouches,l=0;l<i.length;l++){var r=i[l],c=o[r.identifier];if(c){var u=r.clientX-a.left,s=r.clientY-a.top;!function(e,t,a,i){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=t,n.beginPath(),n.moveTo(a,i),n.lineTo(u,s),n.stroke()})}(e,f,c.x,c.y),c.x=u,c.y=s}}}function i(t){t.preventDefault();for(var a=d.getBoundingClientRect(),i=t.changedTouches,r=0;r<i.length;r++){var c=i[r],u=c.clientX-a.left,s=c.clientY-a.top;!function(e,t,a){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=t,n.beginPath(),n.arc(u,s,a,0,2*Math.PI),n.fill()})}(e,f,l),o[c.identifier]={x:u,y:s}}}var o={},l=e/2,r=!1,d=n.canvas,c=0,u=0,s=0,h=1,f="hsla(0, 0%, 0%, 1)";return{disable:function(){r&&(d.removeEventListener("touchstart",i),d.removeEventListener("touchmove",a),d.removeEventListener("touchend",t),r=!1)},enable:function(){r||(d.addEventListener("touchstart",i),d.addEventListener("touchmove",a),d.addEventListener("touchend",t),r=!0)},setColor:function(e,n,t,a){c=e,u=n,s=t,h=a,f="hsla("+c+", "+u+"%, "+s+"%, "+h+")"},setSize:function(n){e=n,l=e/2}}}function a(){var e="Canvas",n=Math.max(screen.width,screen.height),t=document.createElement("canvas");t.className=e+"-canvas",t.width=t.height=n,t.style.left=t.style.top=-n/2+"px";var a=t.getContext("2d");a.lineCap="round",a.fillStyle="#fff",a.fillRect(0,0,n,n);var i=l(e+"-center");i.appendChild(t);var o=document.createElement("canvas");o.width=o.height=n;var r=o.getContext("2d");r.lineCap="round",r.fillStyle="#fff",r.fillRect(0,0,n,n);var d=l(e);d.appendChild(i);var c,u,s=[];return{canvas:t,element:d,onUndoAvailable:function(e){c=e},onUndoUnavailable:function(e){u=e},operate:function(e){s.push(e),1==s.length&&c(),e(a),s.length>1024&&s.shift()(r)},undo:function(){a.drawImage(o,0,0),s.length&&(s.pop(),s.forEach(function(e){e(a)}),s.length||u())}}}function i(e,n,t,a,i){function o(e,n,t,a){var i="hsla("+e+", "+n+"%, "+t+"%, "+a+")";d.style.backgroundColor=i}var r="ColorButton",d=l(r+"-color"),c=l(r+"-transparency Button-content");c.appendChild(d),c.style.backgroundImage="url(images/color-background.svg)";var u=l("Button");u.appendChild(c),u.addEventListener("touchstart",function(e){e.preventDefault(),i(),f.add("active"),clearTimeout(s),s=setTimeout(function(){f.remove("active")},100)});var s,h=!1,f=u.classList;return o(e,n,t,a),{element:u,setColor:o,addClass:function(e){f.add(e)},check:function(){f.add("checked"),h=!0},isChecked:function(){return h},uncheck:function(){f.remove("checked"),h=!1}}}function o(e){function n(n,o,l,r){var d=i(n,o,l,r,function(){t.forEach(function(e){e.uncheck()}),d.check(),g=c,e(n,o,l,r)});d.addClass(a+"-colorButton"),t.push(d);var c={addClass:d.addClass,check:d.check,element:d.element,setColor:function(e,t,a,i){n=e,o=t,l=a,r=i,d.setColor(n,o,l,r)}};return c}var t=[],a="ColorButtonsPanel",o=n(0,0,0,1);o.addClass(a+"-blackButton"),o.check();var r=n(4,100,47,1);r.addClass(a+"-redButton");var d=n(115,87,50,1);d.addClass(a+"-greenButton");var c=n(232,100,50,1);c.addClass(a+"-blueButton");var u=n(0,0,53,1);u.addClass(a+"-greyButton");var s=n(30,100,33,1);s.addClass(a+"-brownButton");var h=n(114,100,33,1);h.addClass(a+"-darkGreenButton");var f=n(210,100,80,1);f.addClass(a+"-skyBlueButton");var v=n(60,100,50,1);v.addClass(a+"-yellowButton");var p=n(32,100,50,1);p.addClass(a+"-orangeButton");var m=n(306,100,33,1);m.addClass(a+"-violetButton");var C=n(312,100,83,1);C.addClass(a+"-pinkButton");var g=o,b=l(a);return b.appendChild(o.element),b.appendChild(u.element),b.appendChild(c.element),b.appendChild(f.element),b.appendChild(h.element),b.appendChild(d.element),b.appendChild(r.element),b.appendChild(v.element),b.appendChild(s.element),b.appendChild(p.element),b.appendChild(m.element),b.appendChild(C.element),{element:b,setColor:function(e,n,t,a){g.setColor(e,n,t,a)}}}function l(e){var n=document.createElement("div");return n.className=e,n}function r(n){function t(){n(a,i,o,r)}var a=0,i=0,o=0,r=1,d="EditColorPanel",c=s(function(e){a=e,t(),u.setHue(a),f.setHue(a),v.setHue(a)},t),u=C(function(e){i=e,t(),f.setSaturation(i),v.setSaturation(i)},t),f=h(function(e){o=e,t(),u.setLuminance(o),v.setLuminance(o)},t),v=e(function(e){r=e,t()},t),p=l(d);return p.appendChild(c.element),p.appendChild(u.element),p.appendChild(f.element),p.appendChild(v.element),{element:p,hide:function(){c.abortTouch(),u.abortTouch(),f.abortTouch(),v.abortTouch(),p.classList.remove("visible")},setColor:function(e,n,t,l){a=e,i=n,o=t,r=l,c.setHue(a),u.setHue(a),u.setSaturation(i),u.setLuminance(o),f.setHue(a),f.setSaturation(i),f.setLuminance(o),v.setHue(a),v.setSaturation(i),v.setLuminance(o),v.setAlpha(r)},show:function(){p.classList.add("visible")}}}function d(e,n){function t(e){e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete l[n[t].identifier]}function a(t){t.preventDefault();for(var a=c.getBoundingClientRect(),i=t.changedTouches,r=0;r<i.length;r++){var d=i[r],u=l[d.identifier];if(u){var s=d.clientX-a.left,h=d.clientY-a.top;!function(e,t,a){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=o,n.beginPath(),n.moveTo(t,a),n.lineTo(s,h),n.stroke()})}(e,u.x,u.y),u.x=s,u.y=h}}}function i(t){t.preventDefault();for(var a=c.getBoundingClientRect(),i=t.changedTouches,d=0;d<i.length;d++){var u=i[d],s=u.clientX-a.left,h=u.clientY-a.top;!function(e,t){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=o,n.beginPath(),n.arc(s,h,t,0,2*Math.PI),n.fill()})}(e,r),l[u.identifier]={x:s,y:h}}}var o="#fff",l={},r=e/2,d=!1,c=n.canvas;return{disable:function(){d&&(c.removeEventListener("touchstart",i),c.removeEventListener("touchmove",a),c.removeEventListener("touchend",t),d=!1)},enable:function(){d||(d=!0,c.addEventListener("touchstart",i),c.addEventListener("touchmove",a),c.addEventListener("touchend",t))},setSize:function(n){e=n,r=e/2,d&&enable()}}}function c(e,n){function t(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.className="FileButton-input",e.addEventListener("change",function(){var a=new FileReader;a.readAsDataURL(e.files[0]),a.onload=function(){var e=new Image;e.src=a.result,e.onload=function(){n(e)},e.onabort=function(){},e.onerror=function(){}},a.onabort=function(){},a.onerror=function(){},i.removeChild(e),t()}),i.appendChild(e)}var a=l("Button-content");a.style.backgroundImage="url(images/"+e+".svg)";var i=l("Button");return i.appendChild(a),t(),{element:i,addClass:function(e){i.classList.add(e)}}}function u(e,t,a){var i="FilePanel",o=n("file",e);o.addClass(i+"-newButton");var r=c("open",t);r.addClass(i+"-openButton");var d=n("save",a);d.addClass(i+"-saveButton");var u=l(i+"-content");u.appendChild(o.element),u.appendChild(r.element),u.appendChild(d.element);var s=l(i);s.appendChild(u);var h=u.classList;return{element:s,hide:function(){h.remove("visible")},show:function(){h.add("visible")}}}function s(e,n){var t=g(function(n){e(360*n)},n);return t.addClass("HueSlider"),{abortTouch:t.abortTouch,element:t.element,setHue:function(e){t.setRatio(e/360)}}}function h(e,n){function t(){var e="hsl("+a+", "+i+"%, 0%)",n="hsl("+a+", "+i+"%, 50%)",t="hsl("+a+", "+i+"%, 100%)",o="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";r.style.backgroundImage="linear-gradient("+o+"), linear-gradient(90deg, "+e+", "+n+", "+t+")",d.style.backgroundImage="linear-gradient(90deg, "+o+"), linear-gradient("+t+", "+n+", "+e+")"}var a=0,i=0,o="LuminanceSlider",r=l(o+"-portraitBar"),d=l(o+"-landscapeBar"),c=g(function(n){e(100*n)},n);return c.addClass(o),c.barElement.appendChild(r),c.barElement.appendChild(d),t(),{abortTouch:c.abortTouch,element:c.element,setHue:function(e){a=e,t()},setLuminance:function(e){c.setRatio(e/100)},setSaturation:function(e){i=e,t()}}}function f(){function e(){i(),o(),r(),s(),h(),B=e}function i(){T.hide(),H.uncheck()}function o(){w.hide(),P.uncheck()}function r(){S.hide(),x.uncheck()}function c(){I.uncheck(),y.disable()}function s(){R.uncheck(),E.disable()}function h(){I.check(),y.enable()}function f(){R.check(),E.enable()}function C(){i(),o(),r(),c(),f(),B=C}var g=4,k="MainPanel",L=a(),B=e,y=t(g,L);y.enable();var E=d(g,L),T=v(function(e,n,t,a){y.setColor(e,n,t,a),w.setColor(e,n,t)},function(){i(),r(),h()}),w=p(g,function(e){y.setSize(e),E.setSize(e)},function(){B()}),S=u(function(){L.operate(function(e){var n=e.canvas.width;e.fillStyle="#fff",e.fillRect(0,0,n,n)}),B()},function(e){L.operate(function(n){var t=n.canvas.width,a=(t-e.width)/2,i=(t-e.height)/2;n.drawImage(e,a,i)}),B()},function(){var e=L.element.offsetWidth,n=L.element.offsetHeight;m(L.canvas,e,n),B()}),I=n("pencil",e);I.addClass(k+"-brushButton"),I.check();var R=n("eraser",C);R.addClass(k+"-eraserButton");var H=n("palette",function(){H.isChecked()?B():(o(),r(),c(),s(),T.show(),H.check())});H.addClass(k+"-paletteButton");var P=n("params",function(){P.isChecked()?B():(i(),r(),c(),s(),w.show(),P.check())});P.addClass(k+"-paramsButton");var D=b(L.undo);L.onUndoAvailable(D.enable),L.onUndoUnavailable(D.disable);var x=n("burger",function(){x.isChecked()?B():(i(),o(),c(),s(),S.show(),x.check())});x.addClass(k+"-fileButton");var U=l(k+"-content");U.appendChild(L.element),U.appendChild(T.element),U.appendChild(w.element),U.appendChild(S.element);var W=l(k+"-bar");W.appendChild(I.element),W.appendChild(R.element),W.appendChild(H.element),W.appendChild(P.element),W.appendChild(D.element),W.appendChild(x.element);var M=l(k);return M.appendChild(U),M.appendChild(W),{element:M}}function v(e,n){var t="PalettePanel",a=o(function(t,a,i,o){d.setColor(t,a,i,o),c.setColor(t,a,i,o),e(t,a,i,o),d.isChecked()||n()}),d=i(0,0,0,1,function(){d.isChecked()?(c.hide(),d.uncheck(),f=!1):(c.show(),d.check(),f=!0)});d.addClass(t+"-previewButton");var c=r(function(n,t,i,o){d.setColor(n,t,i,o),a.setColor(n,t,i,o),e(n,t,i,o)}),u=l(t+"-secondLayer");u.appendChild(a.element),u.appendChild(d.element);var s=l(t+"-content");s.appendChild(c.element),s.appendChild(u);var h=l(t);h.appendChild(s);var f=!1;return{element:h,hide:function(){c.hide(),s.classList.remove("visible")},show:function(){f&&c.show(),s.classList.add("visible")}}}function p(e,n,t){function a(){c.clearRect(0,0,d.width,d.height),c.beginPath(),c.arc(d.width/2,d.height/2,(e+1)/2,0,2*Math.PI),c.fill()}var i="ParamsPanel",o=1,r=48,d=document.createElement("canvas");d.width=d.height=r+4,d.className=i+"-previewCanvas";var c=d.getContext("2d"),u=g(function(t){e=o+t*r,n(e),a()},t);u.setRatio((e-o)/(r-o)),u.addClass(i+"-slider");var s=l(i+"-content");s.appendChild(u.element),s.appendChild(d);var h=l(i);h.appendChild(s),a();var f=!1;return{element:h,hide:function(){u.abortTouch(),s.classList.remove("visible")},setColor:function(e,n,t){c.fillStyle="hsl("+e+", "+n+"%, "+t+"%)",f=!0},show:function(){f&&(a(),f=!1),s.classList.add("visible")}}}function m(e,n,t){var a=document.createElement("canvas");a.width=n,a.height=t;var i=(n-e.width)/2,o=(t-e.height)/2,l=a.getContext("2d");l.drawImage(e,i,o);var r=document.createElement("a");r.href=a.toDataURL("image/png"),r.download="picture.png",r.style.position="absolute",r.style.top=r.style.left=0,document.body.appendChild(r),r.click(),document.body.removeChild(r)}function C(e,n){function t(){var e="hsl("+a+", 100%, "+i+"%)",n="hsl("+a+", 0%, "+i+"%)",t="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";r.style.backgroundImage="linear-gradient("+t+"), linear-gradient(90deg, "+n+", "+e+")",d.style.backgroundImage="linear-gradient(90deg, "+t+"), linear-gradient("+e+", "+n+")"}var a=0,i=0,o="SaturationSlider",r=l(o+"-portraitBar"),d=l(o+"-landscapeBar"),c=g(function(n){e(100*n)},n);return c.addClass(o),c.barElement.appendChild(r),c.barElement.appendChild(d),t(),{abortTouch:c.abortTouch,element:c.element,setHue:function(e){a=e,t()},setLuminance:function(e){i=e,t()},setSaturation:function(e){c.setRatio(e/100)}}}function g(e,n){function t(n){var t=h.getBoundingClientRect(),a=s.offsetHeight;if(innerWidth>innerHeight){var i=h.offsetHeight;u=1-(n.clientY-t.top-a/2)/i}else{var o=h.offsetWidth;u=(n.clientX-t.left-a/2)/o}u=Math.max(0,Math.min(1,u)),r(),e(u)}function a(){c=null,s.classList.remove("active"),removeEventListener("touchmove",o),removeEventListener("touchend",i)}function i(e){for(var t=e.changedTouches,i=0;i<t.length;i++)if(t[i].identifier===c){e.preventDefault(),a(),n();break}}function o(e){for(var n=e.changedTouches,a=0;a<n.length;a++){var i=n[a];if(i.identifier===c){e.preventDefault(),t(i);break}}}function r(){s.style.top=100*(1-u)+"%",s.style.left=100*u+"%"}var d="Slider",c=null,u=0,s=l(d+"-handle"),h=l(d+"-handleWrapper");h.appendChild(s);var f=l(d+"-bar"),v=l(d);return v.appendChild(f),v.appendChild(h),v.addEventListener("touchstart",function(e){if(null===c){e.preventDefault();var n=e.changedTouches[0];c=n.identifier,s.classList.add("active"),t(n),addEventListener("touchmove",o),addEventListener("touchend",i)}}),r(),{barElement:f,element:v,abortTouch:function(){null!==c&&a()},addClass:function(e){v.classList.add(e)},setRatio:function(e){u=e,r()}}}function b(e){var n=l("Button-content");n.style.backgroundImage="url(images/undo.svg)";var t=l("Button UndoButton disabled");t.appendChild(n),t.addEventListener("touchstart",function(n){function t(e){for(var n=e.changedTouches,l=0;l<n.length;l++)n[l].identifier===i&&(i=null,o.remove("active"),removeEventListener("touchend",t),clearInterval(a))}null===i&&(n.preventDefault(),i=n.changedTouches[0].identifier,o.add("active"),addEventListener("touchend",t),a=setInterval(e,60),e())});var a,i=null,o=t.classList;return{element:t,disable:function(){o.add("disabled")},enable:function(){o.remove("disabled")}}}!function(){var e=f();document.body.appendChild(e.element)}()}();