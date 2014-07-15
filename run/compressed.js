!function(){function e(e,n){var t=o("Button-content");t.style.backgroundImage="url(images/"+e+".svg)";var a=o("Button");a.appendChild(t),a.addEventListener("touchstart",function(e){e.preventDefault(),n(),a.classList.add("active"),clearTimeout(i),i=setTimeout(function(){a.classList.remove("active")},100)});var i,l=!1;return{element:a,addClass:function(e){a.classList.add(e)},check:function(){a.classList.add("checked"),l=!0},isChecked:function(){return l},uncheck:function(){a.classList.remove("checked"),l=!1}}}function n(e,n){var t={},a=e/2,i=!1,o=n.canvas;o.addEventListener("touchstart",function(l){if(i){l.preventDefault();for(var d=o.getBoundingClientRect(),r=l.changedTouches,s=0;s<r.length;s++){var u=r[s],h=u.clientX-d.left,f=u.clientY-d.top;!function(e,t,a){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=t,n.beginPath(),n.arc(h,f,a,0,2*Math.PI),n.fill()})}(e,c,a),t[u.identifier]={x:h,y:f}}}}),o.addEventListener("touchmove",function(a){if(i){a.preventDefault();for(var l=o.getBoundingClientRect(),d=a.changedTouches,r=0;r<d.length;r++){var s=d[r],u=t[s.identifier];if(u){var h=s.clientX-l.left,f=s.clientY-l.top;!function(e,t,a,i){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=t,n.beginPath(),n.moveTo(a,i),n.lineTo(h,f),n.stroke()})}(e,c,u.x,u.y),u.x=h,u.y=f}}}}),o.addEventListener("touchend",function(e){e.preventDefault();for(var n=e.changedTouches,a=0;a<n.length;a++)delete t[n[a].identifier]});var l=0,d=0,r=0,c="hsl(0, 0%, 0%)";return{disable:function(){i=!1},enable:function(){i=!0},setColor:function(e,n,t){l=e,d=n,r=t,c="hsl("+l+", "+d+"%, "+r+"%)"},setSize:function(n){e=n,a=e/2}}}function t(){function e(){i.save(),i.fillStyle="#fff",i.fillRect(0,0,t,t),i.restore()}var n="Canvas",t=Math.max(screen.width,screen.height),a=document.createElement("canvas");a.className=n+"-canvas",a.width=a.height=t,a.style.left=a.style.top=-t/2+"px";var i=a.getContext("2d");i.lineCap="round";var l=o(n+"-center");l.appendChild(a);var d=document.createElement("canvas");d.width=d.height=t;var r=d.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,t,t);var c=o(n);c.appendChild(l),e();var s=[];return{canvas:a,clear:e,element:c,operate:function(e){s.push(e),e(i),s.length>1024&&s.shift()(r)},undo:function(){i.drawImage(d,0,0),s.length&&(s.pop(),s.forEach(function(e){e(i)}))}}}function a(e,n,t,a){function i(e,n,t){var a="hsl("+e+", "+n+"%, "+t+"%)";l.style.backgroundColor=a}var l=o("Button-content"),d=o("Button");d.appendChild(l),d.addEventListener("touchstart",function(e){e.preventDefault(),a(),d.classList.add("active"),clearTimeout(r),r=setTimeout(function(){d.classList.remove("active")},100)});var r,c=!1;return i(e,n,t),{element:d,setColor:i,addClass:function(e){d.classList.add(e)},check:function(){d.classList.add("checked"),c=!0},isChecked:function(){return c},uncheck:function(){d.classList.remove("checked"),c=!1}}}function i(e){function n(n,o,l){var d=a(n,o,l,function(){t.forEach(function(e){e.uncheck()}),d.check(),g=r,e(n,o,l)});d.addClass(i+"-colorButton"),t.push(d);var r={addClass:d.addClass,check:d.check,element:d.element,setColor:function(e,t,a){n=e,o=t,l=a,d.setColor(n,o,l)}};return r}var t=[],i="ColorButtonsPanel",l=n(0,0,0);l.addClass(i+"-blackButton"),l.check();var d=n(4,100,47);d.addClass(i+"-redButton");var r=n(115,87,50);r.addClass(i+"-greenButton");var c=n(232,100,50);c.addClass(i+"-blueButton");var s=n(0,0,53);s.addClass(i+"-greyButton");var u=n(30,100,33);u.addClass(i+"-brownButton");var h=n(114,100,33);h.addClass(i+"-darkGreenButton");var f=n(210,100,80);f.addClass(i+"-skyBlueButton");var v=n(60,100,50);v.addClass(i+"-yellowButton");var p=n(32,100,50);p.addClass(i+"-orangeButton");var m=n(306,100,33);m.addClass(i+"-violetButton");var C=n(312,100,83);C.addClass(i+"-pinkButton");var g=l,b=o(i);return b.appendChild(l.element),b.appendChild(s.element),b.appendChild(c.element),b.appendChild(f.element),b.appendChild(h.element),b.appendChild(r.element),b.appendChild(d.element),b.appendChild(v.element),b.appendChild(u.element),b.appendChild(p.element),b.appendChild(m.element),b.appendChild(C.element),{element:b,setColor:function(e,n,t){g.setColor(e,n,t)}}}function o(e){var n=document.createElement("div");return n.className=e,n}function l(e){function n(){e(t,a,i)}var t=0,a=0,i=0,l="EditColorPanel",d=m(0,function(e){t=360*e,n(),r.setHue(t),c.setHue(t)},n);d.addClass(l+"-hueSlider");var r=p(function(e){a=e,n(),c.setSaturation(a)},n),c=s(function(e){i=e,n(),r.setLuminance(i)},n),u=o(l);return u.appendChild(d.element),u.appendChild(r.element),u.appendChild(c.element),{element:u,hide:function(){d.abortTouch(),r.abortTouch(),c.abortTouch(),u.classList.remove("visible")},setColor:function(e,n,o){t=e,a=n,i=o,d.setRatio(t/360),r.setSaturation(a),r.setHue(t),r.setLuminance(i),c.setHue(t),c.setLuminance(i),c.setSaturation(a)},show:function(){u.classList.add("visible")}}}function d(e,n){var t="#fff",a={},i=e/2,o=!1,l=n.canvas;return l.addEventListener("touchstart",function(d){if(o){d.preventDefault();for(var r=l.getBoundingClientRect(),c=d.changedTouches,s=0;s<c.length;s++){var u=c[s],h=u.clientX-r.left,f=u.clientY-r.top;!function(e,a){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=t,n.beginPath(),n.arc(h,f,a,0,2*Math.PI),n.fill()})}(e,i),a[u.identifier]={x:h,y:f}}}}),l.addEventListener("touchmove",function(i){if(o){i.preventDefault();for(var d=l.getBoundingClientRect(),r=i.changedTouches,c=0;c<r.length;c++){var s=r[c],u=a[s.identifier];if(u){var h=s.clientX-d.left,f=s.clientY-d.top;!function(e,a,i){n.operate(function(n){n.lineWidth=e,n.strokeStyle=n.fillStyle=t,n.beginPath(),n.moveTo(a,i),n.lineTo(h,f),n.stroke()})}(e,u.x,u.y),u.x=h,u.y=f}}}}),l.addEventListener("touchend",function(e){e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete a[n[t].identifier]}),{disable:function(){o=!1},enable:function(){o=!0},setSize:function(n){e=n,i=e/2,o&&enable()}}}function r(e,n){function t(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.className="FileButton-input",e.addEventListener("change",function(){var a=new FileReader;a.readAsDataURL(e.files[0]),a.onload=function(){var e=new Image;e.src=a.result,e.onload=function(){n(e)},e.onabort=function(){},e.onerror=function(){}},a.onabort=function(){},a.onerror=function(){},i.removeChild(e),t()}),i.appendChild(e)}var a=o("Button-content");a.style.backgroundImage="url(images/"+e+".svg)";var i=o("Button");return i.appendChild(a),t(),{element:i,addClass:function(e){i.classList.add(e)}}}function c(n,t,a){var i="FilePanel",l=e("file",n);l.addClass(i+"-newButton");var d=r("open",t);d.addClass(i+"-openButton");var c=e("save",a);c.addClass(i+"-saveButton");var s=o(i+"-content");s.appendChild(l.element),s.appendChild(d.element),s.appendChild(c.element);var u=o(i);return u.appendChild(s),{element:u,hide:function(){s.classList.remove("visible")},show:function(){s.classList.add("visible")}}}function s(e,n){function t(){var e="hsl("+a+", "+i+"%, 0%)",n="hsl("+a+", "+i+"%, 50%)",t="hsl("+a+", "+i+"%, 100%)",o="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";d.style.backgroundImage="linear-gradient("+o+"), linear-gradient(90deg, "+e+", "+n+", "+t+")",r.style.backgroundImage="linear-gradient(90deg, "+o+"), linear-gradient("+t+", "+n+", "+e+")"}var a=0,i=0,l="LuminanceSlider",d=o(l+"-portraitBar"),r=o(l+"-landscapeBar"),c=m(0,function(n){e(100*n)},n);return c.addClass(l),c.barElement.appendChild(d),c.barElement.appendChild(r),t(),{abortTouch:c.abortTouch,element:c.element,setHue:function(e){a=e,t()},setLuminance:function(e){c.setRatio(e/100)},setSaturation:function(e){i=e,t()}}}function u(){function a(){i(),l(),r(),u(),p(),B=a}function i(){T.hide(),P.uncheck()}function l(){w.hide(),R.uncheck()}function r(){S.hide(),H.uncheck()}function s(){I.uncheck(),y.disable()}function u(){D.uncheck(),E.disable()}function p(){I.check(),y.enable()}function m(){D.check(),E.enable()}function g(){i(),l(),r(),s(),m(),B=g}var b=4,k="MainPanel",L=t(),B=a,y=n(b,L);y.enable();var E=d(b,L),T=h(y.setColor,function(){i(),r(),p()}),w=f(b,function(e){y.setSize(e),E.setSize(e)},function(){B()}),S=c(function(){L.clear(),B()},function(e){L.operate(function(n){var t=n.canvas.width,a=(t-e.width)/2,i=(t-e.height)/2;n.drawImage(e,a,i)}),B()},function(){var e=L.element.offsetWidth,n=L.element.offsetHeight;v(L.canvas,e,n),B()}),I=e("pencil",a);I.addClass(k+"-brushButton"),I.check();var D=e("eraser",g);D.addClass(k+"-eraserButton");var P=e("palette",function(){P.isChecked()?B():(l(),r(),s(),u(),T.show(),P.check())});P.addClass(k+"-paletteButton");var R=e("params",function(){R.isChecked()?B():(i(),r(),s(),u(),w.show(),R.check())});R.addClass(k+"-paramsButton");var x=C(L.undo),H=e("burger",function(){H.isChecked()?B():(i(),l(),s(),u(),S.show(),H.check())});H.addClass(k+"-fileButton");var W=o(k+"-content");W.appendChild(L.element),W.appendChild(T.element),W.appendChild(w.element),W.appendChild(S.element);var M=o(k+"-bar");M.appendChild(I.element),M.appendChild(D.element),M.appendChild(P.element),M.appendChild(R.element),M.appendChild(x.element),M.appendChild(H.element);var X=o(k);return X.appendChild(W),X.appendChild(M),{element:X}}function h(e,n){function t(){s.hide(),c.uncheck()}var d="PalettePanel",r=i(function(t,a,i){c.setColor(t,a,i),s.setColor(t,a,i),e(t,a,i),c.isChecked()||n()}),c=a(0,0,0,function(){c.isChecked()?t():(s.show(),c.check())});c.addClass(d+"-previewButton");var s=l(function(n,t,a){c.setColor(n,t,a),r.setColor(n,t,a),e(n,t,a)}),u=o(d+"-secondLayer");u.appendChild(r.element),u.appendChild(c.element);var h=o(d+"-content");h.appendChild(s.element),h.appendChild(u);var f=o(d);return f.appendChild(h),{element:f,hide:function(){t(),h.classList.remove("visible")},show:function(){h.classList.add("visible")}}}function f(e,n,t){var a="ParamsPanel",i=1,l=24,d=(e-i)/(l-i),r=m(d,function(e){n(i+e*l)},t);r.addClass(a+"-slider");var c=o(a+"-content");c.appendChild(r.element);var s=o(a);return s.appendChild(c),{element:s,hide:function(){r.abortTouch(),c.classList.remove("visible")},show:function(){c.classList.add("visible")}}}function v(e,n,t){var a=document.createElement("canvas");a.width=n,a.height=t;var i=(n-e.width)/2,o=(t-e.height)/2,l=a.getContext("2d");l.drawImage(e,i,o);var d=document.createElement("a");d.href=a.toDataURL("image/png"),d.download="picture.png",d.style.position="absolute",d.style.top=d.style.left=0,document.body.appendChild(d),d.click(),document.body.removeChild(d)}function p(e,n){function t(){var e="hsl("+a+", 100%, "+i+"%)",n="hsl("+a+", 0%, "+i+"%)",t="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";d.style.backgroundImage="linear-gradient("+t+"), linear-gradient(90deg, "+n+", "+e+")",r.style.backgroundImage="linear-gradient(90deg, "+t+"), linear-gradient("+e+", "+n+")"}var a=0,i=0,l="SaturationSlider",d=o(l+"-portraitBar"),r=o(l+"-landscapeBar"),c=m(0,function(n){e(100*n)},n);return c.addClass(l),c.barElement.appendChild(d),c.barElement.appendChild(r),t(),{abortTouch:c.abortTouch,element:c.element,setHue:function(e){a=e,t()},setLuminance:function(e){i=e,t()},setSaturation:function(e){c.setRatio(e/100)}}}function m(e,n,t){function a(t){var a=h.getBoundingClientRect(),i=u.offsetHeight;if(innerWidth>innerHeight){var o=h.offsetHeight;e=1-(t.clientY-a.top-i/2)/o}else{var l=h.offsetWidth;e=(t.clientX-a.left-i/2)/l}e=Math.max(0,Math.min(1,e)),r(),n(e)}function i(){s=null,u.classList.remove("active"),removeEventListener("touchmove",d),removeEventListener("touchend",l)}function l(e){for(var n=e.changedTouches,a=0;a<n.length;a++)if(n[a].identifier===s){e.preventDefault(),i(),t();break}}function d(e){for(var n=e.changedTouches,t=0;t<n.length;t++){var i=n[t];if(i.identifier===s){e.preventDefault(),a(i);break}}}function r(){u.style.top=100*(1-e)+"%",u.style.left=100*e+"%"}var c="Slider",s=null,u=o(c+"-handle"),h=o(c+"-handleWrapper");h.appendChild(u);var f=o(c+"-bar"),v=o(c);return v.appendChild(f),v.appendChild(h),v.addEventListener("touchstart",function(e){if(null===s){e.preventDefault();var n=e.changedTouches[0];s=n.identifier,u.classList.add("active"),a(n),addEventListener("touchmove",d),addEventListener("touchend",l)}}),r(),{barElement:f,element:v,abortTouch:function(){null!==s&&i()},addClass:function(e){v.classList.add(e)},setRatio:function(n){e=n,r()}}}function C(e){var n=o("Button-content");n.style.backgroundImage="url(images/undo.svg)";var t=o("Button UndoButton");t.appendChild(n),t.addEventListener("touchstart",function(n){function o(e){for(var n=e.changedTouches,l=0;l<n.length;l++)n[l].identifier===i&&(i=null,t.classList.remove("active"),removeEventListener("touchend",o),clearInterval(a))}null===i&&(n.preventDefault(),i=n.changedTouches[0].identifier,t.classList.add("active"),addEventListener("touchend",o),a=setInterval(e,60),e())});var a,i=null;return{element:t}}!function(){var e=u();document.body.appendChild(e.element)}()}();