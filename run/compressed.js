!function(){function e(e,n){function t(){var e=r+", "+d+"%, "+c+"%",n="hsl("+e+")",t="hsla("+e+", 0)",a="url(images/color-background.svg)",l="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";i.style.backgroundImage="linear-gradient("+l+"), linear-gradient(90deg, "+t+", "+n+"), "+a,o.style.backgroundImage="linear-gradient(90deg, "+l+"), linear-gradient("+n+", "+t+"), "+a}var a="AlphaSlider",i=l(a+"-portraitBar"),o=l(a+"-landscapeBar"),r=0,d=0,c=0,s=g(function(n){e(n),t()},n);return s.setRatio(1),s.addClass(a),s.barElement.appendChild(i),s.barElement.appendChild(o),t(),{abortTouch:s.abortTouch,element:s.element,setAlpha:s.setRatio,setHue:function(e){r=e,t()},setLuminance:function(e){c=e,t()},setSaturation:function(e){d=e,t()}}}function n(e,n){var t=l("Button-content");t.style.backgroundImage="url(images/"+e+".svg)";var a=l("Button");a.appendChild(t),a.addEventListener("touchstart",function(e){e.preventDefault(),n(),r.add("active"),clearTimeout(i),i=setTimeout(function(){r.remove("active")},100)});var i,o=!1,r=a.classList;return{element:a,addClass:function(e){r.add(e)},check:function(){r.add("checked"),o=!0},isChecked:function(){return o},uncheck:function(){r.remove("checked"),o=!1}}}function t(e,n){function t(e){e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete o[n[t].identifier]}function a(t){t.preventDefault();for(var a=d.getBoundingClientRect(),i=t.changedTouches,r=0;r<i.length;r++){var c=i[r],s=o[c.identifier];if(s){var u=c.clientX-a.left,h=c.clientY-a.top;!function(e,t,a,i,o,r){n.operate(function(n){var d=o-a,c=r-i,s=Math.max(Math.abs(Math.ceil(d)),Math.abs(Math.ceil(c))),u=d/s,h=c/s;n.fillStyle=t,n.save(),n.translate(a,i),n.globalAlpha=1/Math.sqrt(e);for(var f=0;s>f;f++)n.translate(u,h),n.beginPath(),n.arc(0,0,l,0,2*Math.PI),n.fill();n.restore()})}(e,f,s.x,s.y,u,h),s.x=u,s.y=h}}}function i(t){t.preventDefault();for(var a=d.getBoundingClientRect(),i=t.changedTouches,r=0;r<i.length;r++){var c=i[r],s=c.clientX-a.left,u=c.clientY-a.top;!function(e,t,a){n.operate(function(n){n.lineWidth=e,n.globalAlpha=1/Math.sqrt(e),n.fillStyle=t,n.beginPath(),n.arc(s,u,a,0,2*Math.PI),n.fill()})}(e,f,l),o[c.identifier]={x:s,y:u}}}var o={},l=e/2,r=!1,d=n.canvas,c=0,s=0,u=0,h=1,f="hsla(0, 0%, 0%, 1)";return{disable:function(){r&&(d.removeEventListener("touchstart",i),d.removeEventListener("touchmove",a),d.removeEventListener("touchend",t),r=!1)},enable:function(){r||(d.addEventListener("touchstart",i),d.addEventListener("touchmove",a),d.addEventListener("touchend",t),r=!0)},setColor:function(e,n,t,a){c=e,s=n,u=t,h=a,f="hsla("+c+", "+s+"%, "+u+"%, "+h+")"},setSize:function(n){e=n,l=e/2}}}function a(){var e="Canvas",n=Math.max(screen.width,screen.height),t=document.createElement("canvas");t.className=e+"-canvas",t.width=t.height=n,t.style.left=t.style.top=-n/2+"px";var a=t.getContext("2d");a.lineCap="round",a.fillStyle="#fff",a.fillRect(0,0,n,n);var i=l(e+"-center");i.appendChild(t);var o=l(e);o.appendChild(i);var r,d,c=[],s=128;return undoCanvases=[],{canvas:t,element:o,onUndoAvailable:function(e){r=e},onUndoUnavailable:function(e){d=e},operate:function(e){c.push(e),1==c.length&&r(),e(a);var t=c.length-s;if(!(0>t)){var i=Math.floor(t/s);if(!undoCanvases[i]){var o=document.createElement("canvas");o.width=o.height=n;var l=o.getContext("2d");l.lineCap="round",i?l.drawImage(undoCanvases[i-1],0,0):(l.fillStyle="#fff",l.fillRect(0,0,n,n)),undoCanvases.push(o);for(var d=t;t+s>d;d++)c[d](l)}}},undo:function(){if(undoCanvases.length?a.drawImage(undoCanvases[undoCanvases.length-1],0,0):(a.fillStyle="#fff",a.fillRect(0,0,n,n)),c.length){c.pop();for(var e=undoCanvases.length*s,t=e;t<c.length;t++)c[t](a);undoCanvases.length*s>c.length&&undoCanvases.pop(),c.length||d()}}}}function i(e,n,t,a,i){function o(e,n,t,a){var i="hsla("+e+", "+n+"%, "+t+"%, "+a+")";d.style.backgroundColor=i}var r="ColorButton",d=l(r+"-color"),c=l(r+"-transparency Button-content");c.appendChild(d),c.style.backgroundImage="url(images/color-background.svg)";var s=l("Button");s.appendChild(c),s.addEventListener("touchstart",function(e){e.preventDefault(),i(),f.add("active"),clearTimeout(u),u=setTimeout(function(){f.remove("active")},100)});var u,h=!1,f=s.classList;return o(e,n,t,a),{element:s,setColor:o,addClass:function(e){f.add(e)},check:function(){f.add("checked"),h=!0},isChecked:function(){return h},uncheck:function(){f.remove("checked"),h=!1}}}function o(e){function n(n,o,l,r){var d=i(n,o,l,r,function(){t.forEach(function(e){e.uncheck()}),d.check(),g=c,e(n,o,l,r)});d.addClass(a+"-colorButton"),t.push(d);var c={addClass:d.addClass,check:d.check,element:d.element,setColor:function(e,t,a,i){n=e,o=t,l=a,r=i,d.setColor(n,o,l,r)}};return c}var t=[],a="ColorButtonsPanel",o=n(0,0,0,1);o.addClass(a+"-blackButton"),o.check();var r=n(4,100,47,1);r.addClass(a+"-redButton");var d=n(115,87,50,1);d.addClass(a+"-greenButton");var c=n(232,100,50,1);c.addClass(a+"-blueButton");var s=n(0,0,53,1);s.addClass(a+"-greyButton");var u=n(30,100,33,1);u.addClass(a+"-brownButton");var h=n(114,100,33,1);h.addClass(a+"-darkGreenButton");var f=n(210,100,80,1);f.addClass(a+"-skyBlueButton");var v=n(60,100,50,1);v.addClass(a+"-yellowButton");var p=n(32,100,50,1);p.addClass(a+"-orangeButton");var m=n(306,100,33,1);m.addClass(a+"-violetButton");var C=n(312,100,83,1);C.addClass(a+"-pinkButton");var g=o,b=l(a);return b.appendChild(o.element),b.appendChild(s.element),b.appendChild(c.element),b.appendChild(f.element),b.appendChild(h.element),b.appendChild(d.element),b.appendChild(r.element),b.appendChild(v.element),b.appendChild(u.element),b.appendChild(p.element),b.appendChild(m.element),b.appendChild(C.element),{element:b,setColor:function(e,n,t,a){g.setColor(e,n,t,a)}}}function l(e){var n=document.createElement("div");return n.className=e,n}function r(n){function t(){n(a,i,o,r)}var a=0,i=0,o=0,r=1,d="EditColorPanel",c=u(function(e){a=e,t(),s.setHue(a),f.setHue(a),v.setHue(a)},t),s=C(function(e){i=e,t(),f.setSaturation(i),v.setSaturation(i)},t),f=h(function(e){o=e,t(),s.setLuminance(o),v.setLuminance(o)},t),v=e(function(e){r=e,t()},t),p=l(d);return p.appendChild(c.element),p.appendChild(s.element),p.appendChild(f.element),p.appendChild(v.element),{element:p,hide:function(){c.abortTouch(),s.abortTouch(),f.abortTouch(),v.abortTouch(),p.classList.remove("visible")},setColor:function(e,n,t,l){a=e,i=n,o=t,r=l,c.setHue(a),s.setHue(a),s.setSaturation(i),s.setLuminance(o),f.setHue(a),f.setSaturation(i),f.setLuminance(o),v.setHue(a),v.setSaturation(i),v.setLuminance(o),v.setAlpha(r)},show:function(){p.classList.add("visible")}}}function d(e,n){function t(e){e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete l[n[t].identifier]}function a(t){t.preventDefault();for(var a=c.getBoundingClientRect(),i=t.changedTouches,d=0;d<i.length;d++){var s=i[d],u=l[s.identifier];if(u){var h=s.clientX-a.left,f=s.clientY-a.top;!function(e,t,a,i,l){n.operate(function(n){var d=i-t,c=l-a,s=Math.max(Math.abs(Math.ceil(d)),Math.abs(Math.ceil(c))),u=d/s,h=c/s;n.fillStyle=o,n.save(),n.translate(t,a),n.globalAlpha=1/Math.sqrt(e);for(var f=0;s>f;f++)n.translate(u,h),n.beginPath(),n.arc(0,0,r,0,2*Math.PI),n.fill();n.restore()})}(e,u.x,u.y,h,f),u.x=h,u.y=f}}}function i(t){t.preventDefault();for(var a=c.getBoundingClientRect(),i=t.changedTouches,d=0;d<i.length;d++){var s=i[d],u=s.clientX-a.left,h=s.clientY-a.top;!function(e,t){n.operate(function(n){n.lineWidth=e,n.globalAlpha=1/Math.sqrt(e),n.fillStyle=o,n.beginPath(),n.arc(u,h,t,0,2*Math.PI),n.fill()})}(e,r),l[s.identifier]={x:u,y:h}}}var o="#fff",l={},r=e/2,d=!1,c=n.canvas;return{disable:function(){d&&(c.removeEventListener("touchstart",i),c.removeEventListener("touchmove",a),c.removeEventListener("touchend",t),d=!1)},enable:function(){d||(d=!0,c.addEventListener("touchstart",i),c.addEventListener("touchmove",a),c.addEventListener("touchend",t))},setSize:function(n){e=n,r=e/2,d&&enable()}}}function c(e,n){function t(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.className="FileButton-input",e.addEventListener("change",function(){var a=new FileReader;a.readAsDataURL(e.files[0]),a.onload=function(){var e=new Image;e.src=a.result,e.onload=function(){n(e)},e.onabort=function(){},e.onerror=function(){}},a.onabort=function(){},a.onerror=function(){},i.removeChild(e),t()}),i.appendChild(e)}var a=l("Button-content");a.style.backgroundImage="url(images/"+e+".svg)";var i=l("Button");return i.appendChild(a),t(),{element:i,addClass:function(e){i.classList.add(e)}}}function s(e,t,a){var i="FilePanel",o=n("file",e);o.addClass(i+"-newButton");var r=c("open",t);r.addClass(i+"-openButton");var d=n("save",a);d.addClass(i+"-saveButton");var s=l(i+"-content");s.appendChild(o.element),s.appendChild(r.element),s.appendChild(d.element);var u=l(i);u.appendChild(s);var h=s.classList;return{element:u,hide:function(){h.remove("visible")},show:function(){h.add("visible")}}}function u(e,n){var t=g(function(n){e(360*n)},n);return t.addClass("HueSlider"),{abortTouch:t.abortTouch,element:t.element,setHue:function(e){t.setRatio(e/360)}}}function h(e,n){function t(){var e="hsl("+a+", "+i+"%, 0%)",n="hsl("+a+", "+i+"%, 50%)",t="hsl("+a+", "+i+"%, 100%)",o="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";r.style.backgroundImage="linear-gradient("+o+"), linear-gradient(90deg, "+e+", "+n+", "+t+")",d.style.backgroundImage="linear-gradient(90deg, "+o+"), linear-gradient("+t+", "+n+", "+e+")"}var a=0,i=0,o="LuminanceSlider",r=l(o+"-portraitBar"),d=l(o+"-landscapeBar"),c=g(function(n){e(100*n)},n);return c.addClass(o),c.barElement.appendChild(r),c.barElement.appendChild(d),t(),{abortTouch:c.abortTouch,element:c.element,setHue:function(e){a=e,t()},setLuminance:function(e){c.setRatio(e/100)},setSaturation:function(e){i=e,t()}}}function f(){function e(){i(),o(),r(),u(),h(),B=e}function i(){w.hide(),R.uncheck()}function o(){T.hide(),P.uncheck()}function r(){S.hide(),x.uncheck()}function c(){M.uncheck(),y.disable()}function u(){I.uncheck(),E.disable()}function h(){M.check(),y.enable()}function f(){I.check(),E.enable()}function C(){i(),o(),r(),c(),f(),B=C}var g=4,k="MainPanel",L=a(),B=e,y=t(g,L);y.enable();var E=d(g,L),w=v(function(e,n,t,a){y.setColor(e,n,t,a),T.setColor(e,n,t)},function(){i(),r(),h()}),T=p(g,function(e){y.setSize(e),E.setSize(e)},function(){B()}),S=s(function(){L.operate(function(e){var n=e.canvas.width;e.fillStyle="#fff",e.fillRect(0,0,n,n)}),B()},function(e){L.operate(function(n){var t=n.canvas.width,a=(t-e.width)/2,i=(t-e.height)/2;n.drawImage(e,a,i)}),B()},function(){var e=L.element.offsetWidth,n=L.element.offsetHeight;m(L.canvas,e,n),B()}),M=n("pencil",e);M.addClass(k+"-brushButton"),M.check();var I=n("eraser",C);I.addClass(k+"-eraserButton");var R=n("palette",function(){R.isChecked()?B():(o(),r(),c(),u(),w.show(),R.check())});R.addClass(k+"-paletteButton");var P=n("params",function(){P.isChecked()?B():(i(),r(),c(),u(),T.show(),P.check())});P.addClass(k+"-paramsButton");var H=b(L.undo);L.onUndoAvailable(H.enable),L.onUndoUnavailable(H.disable);var x=n("burger",function(){x.isChecked()?B():(i(),o(),c(),u(),S.show(),x.check())});x.addClass(k+"-fileButton");var D=l(k+"-content");D.appendChild(L.element),D.appendChild(w.element),D.appendChild(T.element),D.appendChild(S.element);var A=l(k+"-bar");A.appendChild(M.element),A.appendChild(I.element),A.appendChild(R.element),A.appendChild(P.element),A.appendChild(H.element),A.appendChild(x.element);var U=l(k);return U.appendChild(D),U.appendChild(A),{element:U}}function v(e,n){var t="PalettePanel",a=o(function(t,a,i,o){d.setColor(t,a,i,o),c.setColor(t,a,i,o),e(t,a,i,o),d.isChecked()||n()}),d=i(0,0,0,1,function(){d.isChecked()?(c.hide(),d.uncheck(),f=!1):(c.show(),d.check(),f=!0)});d.addClass(t+"-previewButton");var c=r(function(n,t,i,o){d.setColor(n,t,i,o),a.setColor(n,t,i,o),e(n,t,i,o)}),s=l(t+"-secondLayer");s.appendChild(a.element),s.appendChild(d.element);var u=l(t+"-content");u.appendChild(c.element),u.appendChild(s);var h=l(t);h.appendChild(u);var f=!1;return{element:h,hide:function(){c.hide(),u.classList.remove("visible")},show:function(){f&&c.show(),u.classList.add("visible")}}}function p(e,n,t){function a(){c.clearRect(0,0,d.width,d.height),c.beginPath(),c.arc(d.width/2,d.height/2,(e+1)/2,0,2*Math.PI),c.fill()}var i="ParamsPanel",o=1,r=48,d=document.createElement("canvas");d.width=d.height=r+4,d.className=i+"-previewCanvas";var c=d.getContext("2d"),s=g(function(t){e=o+t*r,n(e),a()},t);s.setRatio((e-o)/(r-o)),s.addClass(i+"-slider");var u=l(i+"-content");u.appendChild(s.element),u.appendChild(d);var h=l(i);h.appendChild(u),a();var f=!1;return{element:h,hide:function(){s.abortTouch(),u.classList.remove("visible")},setColor:function(e,n,t){c.fillStyle="hsl("+e+", "+n+"%, "+t+"%)",f=!0},show:function(){f&&(a(),f=!1),u.classList.add("visible")}}}function m(e,n,t){var a=document.createElement("canvas");a.width=n,a.height=t;var i=(n-e.width)/2,o=(t-e.height)/2,l=a.getContext("2d");l.drawImage(e,i,o);var r=document.createElement("a");r.href=a.toDataURL("image/png"),r.download="picture.png",r.style.position="absolute",r.style.top=r.style.left=0,document.body.appendChild(r),r.click(),document.body.removeChild(r)}function C(e,n){function t(){var e="hsl("+a+", 100%, "+i+"%)",n="hsl("+a+", 0%, "+i+"%)",t="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";r.style.backgroundImage="linear-gradient("+t+"), linear-gradient(90deg, "+n+", "+e+")",d.style.backgroundImage="linear-gradient(90deg, "+t+"), linear-gradient("+e+", "+n+")"}var a=0,i=0,o="SaturationSlider",r=l(o+"-portraitBar"),d=l(o+"-landscapeBar"),c=g(function(n){e(100*n)},n);return c.addClass(o),c.barElement.appendChild(r),c.barElement.appendChild(d),t(),{abortTouch:c.abortTouch,element:c.element,setHue:function(e){a=e,t()},setLuminance:function(e){i=e,t()},setSaturation:function(e){c.setRatio(e/100)}}}function g(e,n){function t(n){var t=h.getBoundingClientRect(),a=u.offsetHeight;if(innerWidth>innerHeight){var i=h.offsetHeight;s=1-(n.clientY-t.top-a/2)/i}else{var o=h.offsetWidth;s=(n.clientX-t.left-a/2)/o}s=Math.max(0,Math.min(1,s)),r(),e(s)}function a(){c=null,u.classList.remove("active"),removeEventListener("touchmove",o),removeEventListener("touchend",i)}function i(e){for(var t=e.changedTouches,i=0;i<t.length;i++)if(t[i].identifier===c){e.preventDefault(),a(),n();break}}function o(e){for(var n=e.changedTouches,a=0;a<n.length;a++){var i=n[a];if(i.identifier===c){e.preventDefault(),t(i);break}}}function r(){u.style.top=100*(1-s)+"%",u.style.left=100*s+"%"}var d="Slider",c=null,s=0,u=l(d+"-handle"),h=l(d+"-handleWrapper");h.appendChild(u);var f=l(d+"-bar"),v=l(d);return v.appendChild(f),v.appendChild(h),v.addEventListener("touchstart",function(e){if(null===c){e.preventDefault();var n=e.changedTouches[0];c=n.identifier,u.classList.add("active"),t(n),addEventListener("touchmove",o),addEventListener("touchend",i)}}),r(),{barElement:f,element:v,abortTouch:function(){null!==c&&a()},addClass:function(e){v.classList.add(e)},setRatio:function(e){s=e,r()}}}function b(e){var n=l("Button-content");n.style.backgroundImage="url(images/undo.svg)";var t=l("Button UndoButton disabled");t.appendChild(n),t.addEventListener("touchstart",function(n){function t(e){for(var n=e.changedTouches,l=0;l<n.length;l++)n[l].identifier===i&&(i=null,o.remove("active"),removeEventListener("touchend",t),clearInterval(a))}null===i&&(n.preventDefault(),i=n.changedTouches[0].identifier,o.add("active"),addEventListener("touchend",t),a=setInterval(e,50),e())});var a,i=null,o=t.classList;return{element:t,disable:function(){o.add("disabled")},enable:function(){o.remove("disabled")}}}!function(){var e=l("Main-progress"),n=l("Main-loadBar");n.appendChild(e),document.body.appendChild(n);var t=0,a=["pencil","eraser","palette","params","undo","burger"];a.forEach(function(i){var o=new Image;o.src="images/"+i+".svg",o.onload=o.onerror=o.onabort=function(){if(t++,e.style.width=t/a.length*100+"%",t==a.length){var i=f();document.body.removeChild(n),document.body.appendChild(i.element)}}})}()}();