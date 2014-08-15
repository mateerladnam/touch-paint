!function(){function e(e,n){function t(){var e=l+", "+u+"%, "+d+"%",n="hsl("+e+")",t="hsla("+e+", 0)",a="url(images/color-background.svg)",i="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";o.style.backgroundImage="linear-gradient("+i+"), linear-gradient(90deg, "+t+", "+n+"), "+a,r.style.backgroundImage="linear-gradient(90deg, "+i+"), linear-gradient("+n+", "+t+"), "+a}var a="AlphaSlider",o=i(a+"-portraitBar"),r=i(a+"-landscapeBar"),l=0,u=0,d=0,c=L(function(n){e(n),t()},n);return c.setRatio(1),c.addClass(a),c.barElement.appendChild(o),c.barElement.appendChild(r),t(),{abortTouch:c.abortTouch,element:c.element,setAlpha:c.setRatio,setHue:function(e){l=e,t()},setLuminance:function(e){d=e,t()},setSaturation:function(e){u=e,t()}}}function n(e,n){function t(){n(),d.add("active"),clearTimeout(l),l=setTimeout(function(){d.remove("active")},100)}var a=!1,o=i("Button-content");o.style.backgroundImage="url(images/"+e+".svg)";var r=i("Button");r.appendChild(o),r.addEventListener("mousedown",function(e){e.preventDefault(),a?a=!1:t()}),r.addEventListener("touchstart",function(e){a=!0,e.preventDefault(),t()});var l,u=!1,d=r.classList;return{contentElement:o,element:r,addClass:function(e){d.add(e)},check:function(){d.add("checked"),u=!0},isChecked:function(){return u},uncheck:function(){d.remove("checked"),u=!1}}}function t(){var e="Canvas",n=Math.max(screen.width,screen.height),t=document.createElement("canvas");t.className=e+"-canvas",t.width=t.height=n,t.style.left=t.style.top=-n/2+"px";var a=t.getContext("2d");a.lineCap="round",a.fillStyle="#fff",a.fillRect(0,0,n,n);var o=i(e+"-center");o.appendChild(t);var r=i(e);r.appendChild(o);var l,u,d=[],c=128,s=[];return{canvas:t,element:r,onUndoAvailable:function(e){l=e},onUndoUnavailable:function(e){u=e},operate:function(e){d.push(e),1==d.length&&l(),e(a);var t=d.length-c;if(!(0>t)){var o=Math.floor(t/c);if(!s[o]){var i=document.createElement("canvas");i.width=i.height=n;var r=i.getContext("2d");r.lineCap="round",o?r.drawImage(s[o-1],0,0):(r.fillStyle="#fff",r.fillRect(0,0,n,n)),s.push(i);for(var u=t;t+c>u;u++)d[u](r)}}},undo:function(){if(a.globalAlpha=1,s.length?a.drawImage(s[s.length-1],0,0):(a.fillStyle="#fff",a.fillRect(0,0,n,n)),d.length){d.pop();for(var e=s.length*c,t=e;t<d.length;t++)d[t](a);s.length*c>d.length&&s.pop(),d.length||u()}}}}function a(e){function n(){e(),s.add("active"),clearTimeout(d),d=setTimeout(function(){s.remove("active")},100)}var t=!1,a="ColorButton",o=i(a+"-opaque"),r=i(a+"-color");r.appendChild(o);var l=i(a+"-transparency Button-content");l.appendChild(r),l.style.backgroundImage="url(images/color-background.svg)";var u=i("Button");u.appendChild(l),u.addEventListener("mousedown",function(e){e.preventDefault(),t?t=!1:n()}),u.addEventListener("touchstart",function(e){t=!0,e.preventDefault(),n()});var d,c=!1,s=u.classList,h={};return{color:h,element:u,addClass:function(e){s.add(e)},check:function(){s.add("checked"),c=!0},isChecked:function(){return c},mark:function(){s.add("marked")},setColor:function(e,n,t,a){h.hue=e,h.saturation=n,h.luminance=t,h.alpha=a;var i=e+", "+n+"%, "+t+"%",l="hsla("+i+", "+a+")";r.style.backgroundColor=l;var u="hsl("+i+")";o.style.backgroundColor=u},uncheck:function(){s.remove("checked"),c=!1},unmark:function(){s.remove("marked")}}}function o(e){function n(n,i,l,u){var d=a(function(){t(d),e(d)});return d.setColor(n,i,l,1),d.addClass(r+"-colorButton"),d.addClass(r+"-"+u+"Button"),o.push(d),d}function t(e){E.uncheck(),e.check(),E=e,y.setColor=e.setColor}var o=[],r="ColorButtonsPanel",l=n(0,0,0,"black");l.check(),l.mark();var u=n(0,0,40,"darkGrey"),d=n(0,0,70,"lightGrey"),c=n(0,0,100,"white");c.mark();var s=n(232,100,50,"blue"),h=n(210,100,80,"skyBlue"),f=n(114,100,33,"darkGreen"),v=n(115,87,50,"green"),p=n(4,100,47,"red"),m=n(60,100,50,"yellow"),g=n(30,100,33,"brown"),C=n(32,100,50,"orange"),b=n(306,100,33,"violet"),k=n(312,100,83,"pink"),B=n(30,55,65,"darkSkin"),L=n(31,55,75,"lightSkin"),E=l,w=i(r);w.appendChild(l.element),w.appendChild(u.element),w.appendChild(d.element),w.appendChild(c.element),w.appendChild(s.element),w.appendChild(h.element),w.appendChild(f.element),w.appendChild(v.element),w.appendChild(p.element),w.appendChild(m.element),w.appendChild(g.element),w.appendChild(C.element),w.appendChild(b.element),w.appendChild(k.element),w.appendChild(B.element),w.appendChild(L.element);var y={blackButton:l,element:w,select:t,whiteButton:c,setColor:E.setColor};return y}function i(e){var n=document.createElement("div");return n.className=e,n}function r(n){function t(){h.abortTouch(),f.abortTouch(),v.abortTouch()}function a(){n(o,r,l,u)}var o=0,r=0,l=0,u=1,s="EditColorPanel",h=d(function(e){o=e,a(),f.setHue(o),v.setHue(o),p.setHue(o)},a),f=B(function(e){r=e,a(),v.setSaturation(r),p.setSaturation(r)},a),v=c(function(e){l=e,a(),f.setLuminance(l),p.setLuminance(l)},a),p=e(function(e){u=e,a()},a),m=i(s);return m.appendChild(h.element),m.appendChild(f.element),m.appendChild(v.element),m.appendChild(p.element),{element:m,hide:function(){t(),p.abortTouch(),m.classList.remove("visible")},setColor:function(e,n,a,i){t(),o=e,r=n,l=a,u=i,h.setHue(o),f.setHue(o),f.setSaturation(r),f.setLuminance(l),v.setHue(o),v.setSaturation(r),v.setLuminance(l),p.setHue(o),p.setSaturation(r),p.setLuminance(l),p.setAlpha(u)},show:function(){m.classList.add("visible")}}}function l(e,n){function t(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.className="FileButton-input",e.addEventListener("change",function(){var a=new FileReader;a.readAsDataURL(e.files[0]),a.onload=function(){var e=new Image;e.src=a.result,e.onload=function(){n(e)},e.onabort=function(){},e.onerror=function(){}},a.onabort=function(){},a.onerror=function(){},o.removeChild(e),t()}),o.appendChild(e)}var a=i("Button-content");a.style.backgroundImage="url(images/"+e+".svg)";var o=i("Button");return o.appendChild(a),t(),{element:o,addClass:function(e){o.classList.add(e)}}}function u(e,t,a){var o="FilePanel",r=n("file",e);r.addClass(o+"-newButton");var u=l("open",t);u.addClass(o+"-openButton");var d=n("save",a);d.addClass(o+"-saveButton");var c=i(o+"-content");c.appendChild(r.element),c.appendChild(u.element),c.appendChild(d.element);var s=i(o);s.appendChild(c);var h=c.classList;return{element:s,hide:function(){h.remove("visible")},show:function(){h.add("visible")}}}function d(e,n){var t=L(function(n){e(360*n)},n);return t.addClass("HueSlider"),{abortTouch:t.abortTouch,element:t.element,setHue:function(e){t.setRatio(e/360)}}}function c(e,n){function t(){var e="hsl("+a+", "+o+"%, 0%)",n="hsl("+a+", "+o+"%, 50%)",t="hsl("+a+", "+o+"%, 100%)",i="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";l.style.backgroundImage="linear-gradient("+i+"), linear-gradient(90deg, "+e+", "+n+", "+t+")",u.style.backgroundImage="linear-gradient(90deg, "+i+"), linear-gradient("+t+", "+n+", "+e+")"}var a=0,o=0,r="LuminanceSlider",l=i(r+"-portraitBar"),u=i(r+"-landscapeBar"),d=L(function(n){e(100*n)},n);return d.addClass(r),d.barElement.appendChild(l),d.barElement.appendChild(u),t(),{abortTouch:d.abortTouch,element:d.element,setHue:function(e){a=e,t()},setLuminance:function(e){d.setRatio(e/100)},setSaturation:function(e){o=e,t()}}}function s(e){var n="MainBar",t=i(n+"-alternativeBar");t.appendChild(e.element);var a=i(n+"-bar"),o=i(n+"-scroll");o.appendChild(a),o.appendChild(t);var r=i(n);r.appendChild(o);var l=o.classList;return{element:r,addButton:function(e){a.appendChild(e.element)},slide:function(){l.add("slide")},unslide:function(){l.remove("slide")}}}function h(){function e(){o(),r(),a(),O()}function a(){W.hide(),q.uncheck()}function o(){M.hide(),N.uncheck()}function r(){z.hide(),F.uncheck()}function l(){Y.uncheck(),A.disable()}function d(){X.uncheck(),x.disable()}function c(){Y.check(),A.enable()}function h(){X.check(),x.enable()}function g(){e(),d(),c(),z.setSize(I),Y.mark(),X.unmark(),T(A),P=g}function B(){e(),l(),h(),z.setSize(D),X.mark(),Y.unmark(),T(x),P=B}function L(e,n,t,a,o){o==x.colorButton&&S(e,n,t,a),o==A.colorButton&&y(e,n,t,a),z.setColor(e,n,t)}function y(e,n,t,a){A.setColor(e,n,t,a),Y.setColor(e,n,t,a)}function S(e,n,t,a){x.setColor(e,n,t,a),X.setColor(e,n,t,a)}function T(e){var n=e.colorButton;M.select(n);var t=n.color,a=t.hue,o=t.saturation,i=t.luminance;e.setColor(a,o,i,t.alpha),z.setColor(a,o,i)}var D=4,I=8,R="MainPanel",H=t(),P=B,M=v(L,function(){o(),a(),P()},function(e){if(P==B){var n=x.colorButton;n!=A.colorButton&&n.unmark(),x.colorButton=e,e.mark()}else{var n=A.colorButton;n!=x.colorButton&&n.unmark(),A.colorButton=e,e.mark()}},function(e){var n=e.color;J.setColor(n.hue,n.saturation,n.luminance,1),U.enable(),M.hide(),K.slide()}),x=m(D,H);x.colorButton=M.blackButton,x.enable();var A=m(I,H);A.colorButton=M.whiteButton;var U=b(H,function(e,n,t){J.setColor(e,n,t,1)}),z=p(function(e){P==B?(D=e,x.setSize(e)):(I=e,A.setSize(e))},function(){P()});z.setSize(D);var W=u(function(){H.operate(function(e){var n=e.canvas.width;e.fillStyle="#fff",e.globalAlpha=1,e.fillRect(0,0,n,n)}),P()},function(e){H.operate(function(n){var t=H.element;f(n,e,t.offsetWidth,t.offsetHeight)}),P()},function(){var e=H.element.offsetWidth,n=H.element.offsetHeight;k(H.canvas,e,n),P()}),X=E("pencil",B);X.addClass(R+"-pencilButton"),X.check();var Y=E("eraser",g);Y.addClass(R+"-eraserButton"),y(0,0,100,1),S(0,0,0,1);var N=n("palette",function(){N.isChecked()?P():(d(),l(),r(),a(),O(),M.show(),N.check())});N.addClass(R+"-paletteButton");var F=n("params",function(){F.isChecked()?P():(d(),l(),o(),a(),O(),z.show(),F.check())});F.addClass(R+"-paramsButton");var G=w(H.undo);H.onUndoAvailable(G.enable),H.onUndoUnavailable(G.disable);var q=n("burger",function(){q.isChecked()?P():(d(),l(),o(),r(),O(),W.show(),q.check())});q.addClass(R+"-fileButton");var j=i(R+"-content");j.appendChild(H.element),j.appendChild(M.element),j.appendChild(z.element),j.appendChild(W.element);var J=C(function(e,n,t){M.pickColor(e,n,t),L(e,n,t,1,M.getActiveButton())},function(){U.disable(),O(),M.show()}),K=s(J);K.addButton(X),K.addButton(X),K.addButton(Y),K.addButton(N),K.addButton(F),K.addButton(G),K.addButton(q);var O=K.unslide,Q=i(R);return Q.appendChild(j),Q.appendChild(K.element),{element:Q}}function f(e,n,t,a){var o,i,r=e.canvas,l=t/a,u=n.width/n.height;l>u?(o=t,i=o/u):(i=a,o=i*u);var d=(r.width-o)/2,c=(r.height-i)/2;e.globalAlpha=1,e.drawImage(n,d,c,o,i)}function v(e,n,t,l){function u(e){var n=e.hue,t=e.saturation,a=e.luminance,o=e.alpha;s.setColor(n,t,a,o),h.setColor(n,t,a,o)}var d="PalettePanel",c=o(function(a){k=a,t(a);var o=a.color;u(o),e(o.hue,o.saturation,o.luminance,o.alpha,a),s.isChecked()||n()}),s=a(function(){C&&(s.isChecked()?(h.hide(),s.uncheck(),b=!1):(h.show(),s.check(),b=!0))});s.setColor(0,0,0,1),s.addClass(d+"-previewButton");var h=r(function(n,t,a,o){s.setColor(n,t,a,o),c.setColor(n,t,a,o),e(n,t,a,o,k)}),f=g(function(){l(k)}),v=i(d+"-secondLayer");v.appendChild(c.element),v.appendChild(s.element),v.appendChild(f.element);var p=i(d+"-content");p.appendChild(h.element),p.appendChild(v);var m=i(d);m.appendChild(p);var C=!1,b=!1,k=c.blackButton;return{blackButton:c.blackButton,element:m,whiteButton:c.whiteButton,getActiveButton:function(){return k},hide:function(){C&&(h.hide(),p.classList.remove("visible"),C=!1)},select:function(e){k=e,c.select(e),u(e.color)},pickColor:function(e,n,t){var a=s.color.alpha;s.setColor(e,n,t,a),c.setColor(e,n,t,a)},show:function(){C||(b&&h.show(),p.classList.add("visible"),C=!0)}}}function p(e,n){function t(){u.clearRect(0,0,l.width,l.height),u.beginPath(),u.arc(l.width/2,l.height/2,(f+1)/2,0,2*Math.PI),u.fill()}var a="ParamsPanel",o=1,r=48,l=document.createElement("canvas");l.width=l.height=r+4,l.className=a+"-previewCanvas";var u=l.getContext("2d"),d=L(function(n){f=o+n*r,e(f),t()},n);d.addClass(a+"-slider");var c=i(a+"-content");c.appendChild(d.element),c.appendChild(l);var s=i(a);s.appendChild(c);var h=!1,f=o;return{element:s,hide:function(){d.abortTouch(),c.classList.remove("visible")},setColor:function(e,n,t){u.fillStyle="hsl("+e+", "+n+"%, "+t+"%)",h=!0},setSize:function(e){f=e,h=!0},show:function(){h&&(t(),h=!1,d.setRatio((f-o)/(r-o))),c.classList.add("visible")}}}function m(e,n){function t(t,a){!function(e,o,i){n.operate(function(n){n.lineWidth=e,n.fillStyle=i,n.beginPath(),n.arc(t,a,o,0,2*Math.PI),n.fill()})}(e,p,L)}function a(e){if(e.preventDefault(),f)f=!1;else{h=!0;var n=g.getBoundingClientRect();c=e.clientX-n.left,s=e.clientY-n.top,t(c,s)}}function o(){f?f=!1:h=!1}function i(e){if(f)f=!1;else if(h){var n=g.getBoundingClientRect(),t=e.clientX-n.left,a=e.clientY-n.top;r(c,s,t,a),c=t,s=a}}function r(t,a,o,i){!function(e,r){n.operate(function(n){n.lineWidth=e,n.strokeStyle=r,n.beginPath(),n.moveTo(t,a),n.lineTo(o,i),n.stroke()})}(e,L)}function l(e){f=!0,e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete v[n[t].identifier]}function u(e){f=!0,e.preventDefault();for(var n=g.getBoundingClientRect(),t=e.changedTouches,a=0;a<t.length;a++){var o=t[a],i=v[o.identifier];if(i){var l=o.clientX-n.left,u=o.clientY-n.top;r(i.x,i.y,l,u),i.x=l,i.y=u}}}function d(e){f=!0,e.preventDefault();for(var n=g.getBoundingClientRect(),a=e.changedTouches,o=0;o<a.length;o++){var i=a[o],r=i.clientX-n.left,l=i.clientY-n.top;t(r,l),v[i.identifier]={x:r,y:l}}}var c,s,h=!1,f=!1,v={},p=e/2,m=!1,g=n.canvas,C=0,b=0,k=0,B=1,L="hsla(0, 0%, 0%, 1)";return{disable:function(){m&&(g.removeEventListener("mousedown",a),g.removeEventListener("mousemove",i),g.removeEventListener("mouseup",o),g.removeEventListener("touchstart",d),g.removeEventListener("touchmove",u),g.removeEventListener("touchend",l),m=!1)},enable:function(){m||(g.addEventListener("mousedown",a),g.addEventListener("mousemove",i),g.addEventListener("mouseup",o),g.addEventListener("touchstart",d),g.addEventListener("touchmove",u),g.addEventListener("touchend",l),m=!0)},setColor:function(e,n,t,a){C=e,b=n,k=t,B=a,L="hsla("+C+", "+b+"%, "+k+"%, "+B+")"},setSize:function(n){e=n,p=e/2}}}function g(e){var t=n("pick",e);return t.addClass("PickButton"),t}function C(e,t){var o="PickPanel",r=a(function(){var n=r.color;e(n.hue,n.saturation,n.luminance),t()});r.addClass(o+"-colorButton");var l=n("cancel",t);l.addClass(o+"-cancelButton");var u=i(o);return u.appendChild(r.element),u.appendChild(l.element),{element:u,setColor:r.setColor}}function b(e,n){function t(e){e.preventDefault(),c?c=!1:(f=!0,i(e))}function a(e){e.preventDefault(),c?c=!1:f&&i(e)}function o(e){e.preventDefault(),f=!1}function i(e){var t=v.getBoundingClientRect(),a=Math.floor(e.clientX-t.left),o=Math.floor(e.clientY-t.top),i=d.data,r=4*(a+o*p),l=rgb2hsl(i[r],i[r+1],i[r+2]);n(l.hue,l.saturation,l.luminance)}function r(e){e.preventDefault(),c=!0;for(var n=e.changedTouches,t=0;t<n.length;t++)if(n[t].identifier===s){s=null;break}}function l(e){e.preventDefault(),c=!0;for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t];if(a.identifier===s){i(a);break}}}function u(e){if(e.preventDefault(),c=!0,null===s){var n=e.changedTouches[0];s=n.identifier,i(n)}}var d,c=!1,s=null,h=!1,f=!1,v=e.canvas,p=v.width,m=v.getContext("2d");return{disable:function(){h&&(v.removeEventListener("mousedown",t),v.removeEventListener("mousemove",a),v.removeEventListener("mouseup",o),v.removeEventListener("touchend",r),v.removeEventListener("touchmove",l),v.removeEventListener("touchstart",u),h=!1)},enable:function(){h||(v.addEventListener("mousedown",t),v.addEventListener("mousemove",a),v.addEventListener("mouseup",o),v.addEventListener("touchend",r),v.addEventListener("touchmove",l),v.addEventListener("touchstart",u),h=!0,d=m.getImageData(0,0,p,v.height))}}}function k(e,n,t){var a=document.createElement("canvas");a.width=n,a.height=t;var o=(n-e.width)/2,i=(t-e.height)/2,r=a.getContext("2d");r.drawImage(e,o,i);var l=document.createElement("a");l.href=a.toDataURL("image/png"),l.download="picture.png",l.style.position="absolute",l.style.top=l.style.left=0,document.body.appendChild(l),l.click(),document.body.removeChild(l)}function B(e,n){function t(){var e="hsl("+a+", 100%, "+o+"%)",n="hsl("+a+", 0%, "+o+"%)",t="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";l.style.backgroundImage="linear-gradient("+t+"), linear-gradient(90deg, "+n+", "+e+")",u.style.backgroundImage="linear-gradient(90deg, "+t+"), linear-gradient("+e+", "+n+")"}var a=0,o=0,r="SaturationSlider",l=i(r+"-portraitBar"),u=i(r+"-landscapeBar"),d=L(function(n){e(100*n)},n);return d.addClass(r),d.barElement.appendChild(l),d.barElement.appendChild(u),t(),{abortTouch:d.abortTouch,element:d.element,setHue:function(e){a=e,t()},setLuminance:function(e){o=e,t()},setSaturation:function(e){d.setRatio(e/100)}}}function L(e,n){function t(t){function i(n){var t=h.getBoundingClientRect(),o=c.offsetHeight;if(innerWidth>innerHeight){var i=h.offsetHeight;d=1-(n.clientY-t.top-o/2)/i}else{var r=h.offsetWidth;d=(n.clientX-t.left-o/2)/r}d=Math.max(0,Math.min(1,d)),a(),e(d)}function r(){endSlide(),n()}function f(e){l?l=!1:i(e)}function v(){l?l=!1:r()}function p(e){l=!0;for(var n=e.changedTouches,t=0;t<n.length;t++)if(n[t].identifier===u){e.preventDefault(),r();break}}function m(e){l=!0;for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t];if(a.identifier===u){e.preventDefault(),i(a);break}}}endSlide=function(){o=!1,u=null,s.remove("active"),removeEventListener("mousemove",f),removeEventListener("mouseup",v),removeEventListener("touchmove",m),removeEventListener("touchend",p)},o=!0,i(t),s.add("active"),addEventListener("mousemove",f),addEventListener("mouseup",v),addEventListener("touchmove",m),addEventListener("touchend",p)}function a(){c.style.top=100*(1-d)+"%",c.style.left=100*d+"%"}var o=!1,r="Slider",l=!1,u=null,d=0,c=i(r+"-handle"),s=c.classList,h=i(r+"-handleWrapper");h.appendChild(c);var f=i(r+"-bar"),v=i(r);return v.appendChild(f),v.appendChild(h),v.addEventListener("mousedown",function(e){e.preventDefault(),l?l=!1:t(e)}),v.addEventListener("touchstart",function(e){if(l=!0,null===u){e.preventDefault();var n=e.changedTouches[0];u=n.identifier,t(n)}}),a(),{barElement:f,element:v,abortTouch:function(){o&&endSlide()},addClass:function(e){v.classList.add(e)},setRatio:function(e){d=e,a()}}}function E(e,t){var a=n(e,t),o="ToolButton",r=i(o+"-opaque"),l=i(o+"-color");l.appendChild(r);var u=i(o+"-transparency");u.style.backgroundImage="url(images/color-background.svg)",u.appendChild(l);var d=a.element,c=d.classList;return a.contentElement.appendChild(u),{addClass:a.addClass,check:a.check,element:d,isChecked:a.isChecked,uncheck:a.uncheck,mark:function(){c.add("marked")},setColor:function(e,n,t,a){var o=e+", "+n+"%, "+t+"%",i="hsla("+o+", "+a+")";l.style.background=i;var u="hsl("+o+")";r.style.background=u},unmark:function(){c.remove("marked")}}}function w(e){function n(){function n(){removeEventListener("mouseup",t),removeEventListener("touchend",a),u.remove("active"),clearInterval(o)}function t(){i?i=!1:n()}function a(e){i=!0;for(var t=e.changedTouches,a=0;a<t.length;a++)t[a].identifier===l&&(l=null,n())}var i=!1;addEventListener("touchend",a),addEventListener("mouseup",t),u.add("active"),o=setInterval(e,50),e()}var t=i("Button-content");t.style.backgroundImage="url(images/undo.svg)";var a=i("Button UndoButton disabled");a.appendChild(t),a.addEventListener("mousedown",function(e){e.preventDefault(),r?r=!1:n()}),a.addEventListener("touchstart",function(e){r=!0,null===l&&(e.preventDefault(),l=e.changedTouches[0].identifier,n())});var o,r=!1,l=null,u=a.classList;return{element:a,disable:function(){u.add("disabled")},enable:function(){u.remove("disabled")}}}!function(){var e=i("Main-progress"),n=i("Main-loadBar");n.appendChild(e),document.body.appendChild(n);var t=0,a=["pencil","eraser","palette","params","undo","burger"];a.forEach(function(o){var i=new Image;i.src="images/"+o+".svg",i.onload=i.onerror=i.onabort=function(){if(t++,e.style.width=t/a.length*100+"%",t==a.length){var o=h();document.body.removeChild(n),document.body.appendChild(o.element)}}})}()}();