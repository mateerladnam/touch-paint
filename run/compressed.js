!function(){function e(e,n){function t(){var e=l+", "+c+"%, "+u+"%",n="hsl("+e+")",t="hsla("+e+", 0)",a="url(images/color-background.svg)",r="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";o.style.backgroundImage="linear-gradient("+r+"), linear-gradient(90deg, "+t+", "+n+"), "+a,i.style.backgroundImage="linear-gradient(90deg, "+r+"), linear-gradient("+n+", "+t+"), "+a}var a="AlphaSlider",o=r(a+"-portraitBar"),i=r(a+"-landscapeBar"),l=0,c=0,u=0,d=M(function(n){e(n),t()},n);return d.setRatio(1),d.addClass(a),d.barElement.appendChild(o),d.barElement.appendChild(i),t(),{abortTouch:d.abortTouch,element:d.element,setAlpha:d.setRatio,setHue:function(e){l=e,t()},setLuminance:function(e){u=e,t()},setSaturation:function(e){c=e,t()}}}function n(e,n){function t(){d.addEventListener("mousedown",o),d.addEventListener("touchstart",l)}function a(){n(),f.add("active"),clearTimeout(s),s=setTimeout(function(){f.remove("active")},100)}function o(e){0===e.button&&(e.preventDefault(),c?c=!1:a())}function i(e){u.style.backgroundImage="url(images/"+e+".svg)"}function l(e){c=!0,e.preventDefault(),a()}var c=!1,u=r("Button-content"),d=r("Button");d.appendChild(u);var s,h=!1,f=d.classList;return i(e),t(),{contentElement:u,element:d,setIcon:i,addClass:function(e){f.add(e)},check:function(){f.add("checked"),h=!0},disable:function(){f.add("disabled"),d.removeEventListener("mousedown",o),d.removeEventListener("touchstart",l)},enable:function(){f.remove("disabled"),t()},isChecked:function(){return h},uncheck:function(){f.remove("checked"),h=!1}}}function t(e){function n(n){var d=s.getBoundingClientRect(),h=Math.floor(n.clientX-d.left),f=Math.floor(n.clientY-d.top),v=s.getContext("2d"),m=v.getImageData(h,f,1,1),p=m.data,g=p[0],C=p[1],b=p[2];!function(n,r,l,c){var u=1-c,d=n*c,v=r*c,m=l*c;e.operate(function(e){function c(e,n){if(!(i>e||e==a||t>n||n==o)){if(w[n]){if(w[n][e])return}else w[n]=Object.create(null);w[n][e]=!0,B.push([e,n])}}var p=s.width,k=s.height,L=e.getImageData(0,0,p,k),E=L.data,B=[],w=Object.create(null);c(h,f);for(var y=Object.create(null),T=20;B.length;){var M=B.shift(),S=M[0],D=M[1],I=4*(D*p+S),x=I+1,P=x+1,R=E[I],z=E[x],H=E[P],A=Math.abs(g-R),W=Math.abs(C-z),N=Math.abs(b-H),U=Math.max(A,W,N);U>T?(y[D]||(y[D]=Object.create(null)),y[D][S]=!0):(E[I]=d+R*u,E[x]=v+z*u,E[P]=m+H*u,c(S+1,D),c(S-1,D),c(S,D+1),c(S,D-1))}for(var X in y){var Y=y[X];for(var F in Y){var I=4*(X*p+Number(F)),x=I+1,P=x+1,R=E[I],z=E[x],H=E[P];E[I]=((R+n)/2+d+R*u)/2,E[x]=((z+r)/2+v+z*u)/2,E[P]=((H+l)/2+m+R*u)/2}}e.putImageData(L,0,0)})}(r,l,c,u)}var t,a,o,i,r=0,l=0,c=0,u=1,s=e.canvas,h=!1;return{disable:function(){h&&(s.removeEventListener("mousedown",n),h=!1)},enable:function(){h||(s.addEventListener("mousedown",n),h=!0)},setColor:function(e,n,t,a){var o=d(e,n,t);r=o.r,l=o.g,c=o.b,u=a},resize:function(e,n){var r=s.width/2,l=s.height/2,c=e/2,u=n/2;t=Math.floor(l-u),a=Math.floor(r+c),o=Math.ceil(l+u),i=Math.ceil(r-c)}}}function a(){var e="Canvas",n=Math.max(screen.width,screen.height),t=document.createElement("canvas");t.className=e+"-canvas",t.width=t.height=n,t.style.left=t.style.top=-n/2+"px";var a=t.getContext("2d");a.lineCap="round",a.fillStyle="#fff",a.fillRect(0,0,n,n);var o=r(e+"-center");o.appendChild(t);var i=r(e);i.appendChild(o);var l,c,u=[],d=128,s=[];return{canvas:t,element:i,onUndoAvailable:function(e){l=e},onUndoUnavailable:function(e){c=e},operate:function(e){u.push(e),1==u.length&&l(),e(a);var t=u.length-d;if(!(0>t)){var o=Math.floor(t/d);if(!s[o]){var i=document.createElement("canvas");i.width=i.height=n;var r=i.getContext("2d");r.lineCap="round",o?r.drawImage(s[o-1],0,0):(r.fillStyle="#fff",r.fillRect(0,0,n,n)),s.push(i);for(var c=t;t+d>c;c++)u[c](r)}}},undo:function(){if(a.globalAlpha=1,s.length?a.drawImage(s[s.length-1],0,0):(a.fillStyle="#fff",a.fillRect(0,0,n,n)),u.length){u.pop();for(var e=s.length*d,t=e;t<u.length;t++)u[t](a);s.length*d>u.length&&s.pop(),u.length||c()}}}}function o(e){function n(){e(),s.add("active"),clearTimeout(u),u=setTimeout(function(){s.remove("active")},100)}var t=!1,a="ColorButton",o=r(a+"-opaque"),i=r(a+"-color");i.appendChild(o);var l=r(a+"-transparency Button-content");l.appendChild(i),l.style.backgroundImage="url(images/color-background.svg)";var c=r("Button");c.appendChild(l),c.addEventListener("mousedown",function(e){0===e.button&&(e.preventDefault(),t?t=!1:n())}),c.addEventListener("touchstart",function(e){t=!0,e.preventDefault(),n()});var u,d=!1,s=c.classList,h={};return{color:h,element:c,addClass:function(e){s.add(e)},check:function(){s.add("checked"),d=!0},isChecked:function(){return d},mark:function(){s.add("marked")},setColor:function(e,n,t,a){h.hue=e,h.saturation=n,h.luminance=t,h.alpha=a;var r=e+", "+n+"%, "+t+"%",l="hsla("+r+", "+a+")";i.style.backgroundColor=l;var c="hsl("+r+")";o.style.backgroundColor=c},uncheck:function(){s.remove("checked"),d=!1},unmark:function(){s.remove("marked")}}}function i(e){function n(n,r,l,c){var u=o(function(){t(u),e(u)});return u.setColor(n,r,l,1),u.addClass(i+"-colorButton"),u.addClass(i+"-"+c+"Button"),a.push(u),u}function t(e){B.uncheck(),e.check(),B=e,y.setColor=e.setColor}var a=[],i="ColorButtonsPanel",l=n(0,0,0,"black");l.check(),l.mark();var c=n(0,0,40,"darkGrey"),u=n(0,0,70,"lightGrey"),d=n(0,0,100,"white");d.mark();var s=n(232,100,50,"blue"),h=n(210,100,80,"skyBlue"),f=n(114,100,33,"darkGreen"),v=n(115,87,50,"green"),m=n(4,100,47,"red"),p=n(60,100,50,"yellow"),g=n(30,100,33,"brown"),C=n(32,100,50,"orange"),b=n(306,100,33,"violet"),k=n(312,100,83,"pink"),L=n(30,55,65,"darkSkin"),E=n(31,55,75,"lightSkin"),B=l,w=r(i);w.appendChild(l.element),w.appendChild(c.element),w.appendChild(u.element),w.appendChild(d.element),w.appendChild(s.element),w.appendChild(h.element),w.appendChild(f.element),w.appendChild(v.element),w.appendChild(m.element),w.appendChild(p.element),w.appendChild(g.element),w.appendChild(C.element),w.appendChild(b.element),w.appendChild(k.element),w.appendChild(L.element),w.appendChild(E.element);var y={blackButton:l,element:w,select:t,whiteButton:d,setColor:B.setColor};return y}function r(e){var n=document.createElement("div");return n.className=e,n}function l(n){function t(){d.abortTouch(),h.abortTouch(),v.abortTouch()}function a(){n(o,i,l,c)}var o=0,i=0,l=0,c=1,u="EditColorPanel",d=s(function(e){o=e,a(),h.setHue(o),v.setHue(o),m.setHue(o)},a),h=T(function(e){i=e,a(),v.setSaturation(i),m.setSaturation(i)},a),v=f(function(e){l=e,a(),h.setLuminance(l),m.setLuminance(l)},a),m=e(function(e){c=e,a()},a),p=r(u);return p.appendChild(d.element),p.appendChild(h.element),p.appendChild(v.element),p.appendChild(m.element),{element:p,hide:function(){t(),m.abortTouch(),p.classList.remove("visible")},setColor:function(e,n,a,r){t(),o=e,i=n,l=a,c=r,d.setHue(o),h.setHue(o),h.setSaturation(i),h.setLuminance(l),v.setHue(o),v.setSaturation(i),v.setLuminance(l),m.setHue(o),m.setSaturation(i),m.setLuminance(l),m.setAlpha(c)},show:function(){p.classList.add("visible")}}}function c(e,n){function t(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.className="FileButton-input",e.addEventListener("change",function(){var a=new FileReader;a.readAsDataURL(e.files[0]),a.onload=function(){var e=new Image;e.src=a.result,e.onload=function(){n(e)},e.onabort=function(){},e.onerror=function(){}},a.onabort=function(){},a.onerror=function(){},o.removeChild(e),t()}),o.appendChild(e)}var a=r("Button-content");a.style.backgroundImage="url(images/"+e+".svg)";var o=r("Button");return o.appendChild(a),t(),{element:o,addClass:function(e){o.classList.add(e)}}}function u(e,t,a){var o="FilePanel",i=n("file",e);i.addClass(o+"-newButton");var l=c("open",t);l.addClass(o+"-openButton");var u=n("save",a);u.addClass(o+"-saveButton");var d=r(o+"-content");d.appendChild(i.element),d.appendChild(l.element),d.appendChild(u.element);var s=r(o);s.appendChild(d);var h=d.classList;return{element:s,hide:function(){h.remove("visible")},show:function(){h.add("visible")}}}function d(e,n,t){var a,o,i,r,l,c;return isFinite(e)||(e=0),isFinite(n)||(n=0),isFinite(t)||(t=0),e/=60,0>e&&(e=6- -e%6),e%=6,n=Math.max(0,Math.min(1,n/100)),t=Math.max(0,Math.min(1,t/100)),l=(1-Math.abs(2*t-1))*n,c=l*(1-Math.abs(e%2-1)),1>e?(a=l,o=c,i=0):2>e?(a=c,o=l,i=0):3>e?(a=0,o=l,i=c):4>e?(a=0,o=c,i=l):5>e?(a=c,o=0,i=l):(a=l,o=0,i=c),r=t-l/2,a=Math.round(255*(a+r)),o=Math.round(255*(o+r)),i=Math.round(255*(i+r)),{r:a,g:o,b:i}}function s(e,n){var t=M(function(n){e(360*n)},n);return t.addClass("HueSlider"),{abortTouch:t.abortTouch,element:t.element,setHue:function(e){t.setRatio(e/360)}}}function h(e,n){function t(t){var o={};i(o,t);var r={x:o.x,y:o.y},l={color:b,endPoint:r,size:e,startPoint:o,end:function(){d.splice(d.indexOf(l),1),u(),n.operate(function(e){a(e,l)})},move:function(e){i(r,e),u()}};return d.push(l),u(),l}function a(e,n){var t=n.startPoint,a=n.endPoint;e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(a.x,a.y),e.strokeStyle=n.color,e.lineCap="round",e.lineWidth=n.size,e.stroke()}function o(e){function n(e){o.move(e),u()}function a(){o.end(),removeEventListener("mousemove",n),removeEventListener("mouseup",a)}if(0===e.button)if(e.preventDefault(),s)s=!1;else{var o=t(e);addEventListener("mousemove",n),addEventListener("mouseup",a)}}function i(e,n){var t=v.getBoundingClientRect();e.x=n.clientX-t.left,e.y=n.clientY-t.top}function r(e){s=!0,e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t],o=a.identifier,i=h[o];i&&(i.end(),delete h[o])}}function l(e){s=!0,e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t],o=h[a.identifier];o&&o.move(a)}}function c(e){s=!0,e.preventDefault();for(var n=e.changedTouches,a=0;a<n.length;a++){var o=n[a];h[o.identifier]=t(o)}}function u(){L.clearRect(0,0,k.width,k.height),d.forEach(function(e){a(L,e)})}var d=[],s=!1,h={},f=!1,v=n.canvas,m=0,p=0,g=0,C=1,b="hsla(0, 0%, 0%, 1)",k=document.createElement("canvas");k.className="LineTool-overlayCanvas",k.width=v.width,k.height=v.height,k.style.top=v.style.top,k.style.left=v.style.left;var L=k.getContext("2d");return v.parentNode.appendChild(k),{disable:function(){f&&(v.removeEventListener("mousedown",o),v.removeEventListener("touchstart",c),v.removeEventListener("touchmove",l),v.removeEventListener("touchend",r),f=!1)},enable:function(){f||(v.addEventListener("mousedown",o),v.addEventListener("touchstart",c),v.addEventListener("touchmove",l),v.addEventListener("touchend",r),f=!0)},setColor:function(e,n,t,a){m=e,p=n,g=t,C=a,b="hsla("+m+", "+p+"%, "+g+"%, "+C+")"},setSize:function(n){e=n}}}function f(e,n){function t(){var e="hsl("+a+", "+o+"%, 0%)",n="hsl("+a+", "+o+"%, 50%)",t="hsl("+a+", "+o+"%, 100%)",i="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";l.style.backgroundImage="linear-gradient("+i+"), linear-gradient(90deg, "+e+", "+n+", "+t+")",c.style.backgroundImage="linear-gradient(90deg, "+i+"), linear-gradient("+t+", "+n+", "+e+")"}var a=0,o=0,i="LuminanceSlider",l=r(i+"-portraitBar"),c=r(i+"-landscapeBar"),u=M(function(n){e(100*n)},n);return u.addClass(i),u.barElement.appendChild(l),u.barElement.appendChild(c),t(),{abortTouch:u.abortTouch,element:u.element,setHue:function(e){a=e,t()},setLuminance:function(e){u.setRatio(e/100)},setSaturation:function(e){o=e,t()}}}function v(e){var n="MainBar",t=r(n+"-alternativeBar");t.appendChild(e.element);var a=r(n+"-bar"),o=r(n+"-scroll");o.appendChild(a),o.appendChild(t);var i=r(n);i.appendChild(o);var l=o.classList;return{element:i,addButton:function(e){a.appendChild(e.element)},show:function(){i.classList.add("visible")},slide:function(){l.add("slide")},unslide:function(){l.remove("slide")}}}function m(){function e(){i(),l(),o(),an()}function o(){q.hide(),_.uncheck()}function i(){N.hide(),Q.uncheck()}function l(){G.hide(),Z.uncheck()}function c(){K.uncheck(),O.disable()}function d(){J.uncheck(),j.disable()}function s(){K.check(),O.enable()}function f(){J.check(),j.enable()}function m(){W.hide(),e(),d(),s(),G.setSize(R),K.mark(),J.unmark(),x(K,[O]),A=m}function k(){e(),c(),f(),G.setSize(P),J.mark(),K.unmark(),x(J,[U,X,Y,F]),A=k}function w(e,n,t,a,o){o==J.colorButton&&M(e,n,t,a),o==K.colorButton&&T(e,n,t,a),G.setColor(e,n,t)}function T(e,n,t,a){O.setColor(e,n,t,a),K.setColor(e,n,t,a)}function M(e,n,t,a){j.setColor(e,n,t,a),J.setColor(e,n,t,a)}function x(e,n){var t=e.colorButton;N.select(t);var a=t.color,o=a.hue,i=a.saturation,r=a.luminance;n.forEach(function(e){e.setColor(o,i,r,a.alpha)}),G.setColor(o,i,r)}var P=4,R=8,z="MainPanel",H=a(),A=k,W=D(function(){J.setIcon("pencil"),j.disable(),j=U,j.enable(),Z.enable()},function(){J.setIcon("line"),j.disable(),j=X,j.enable(),Z.enable()},function(){J.setIcon("rectangle"),j.disable(),j=Y,j.enable(),Z.enable()},function(){J.setIcon("bucket"),j.disable(),j=F,j.enable(),Z.disable()}),N=g(w,function(){i(),o(),A()},function(e){if(A==k){var n=J.colorButton;n!=K.colorButton&&n.unmark(),J.colorButton=e,e.mark()}else{var n=K.colorButton;n!=J.colorButton&&n.unmark(),K.colorButton=e,e.mark()}},function(e){var n=e.color;nn.setColor(n.hue,n.saturation,n.luminance,1),V.enable(),N.hide(),tn.slide()}),U=b(P,H),X=h(P,H),Y=B(P,H),F=t(H),O=b(R,H),j=U,V=E(H,function(e,n,t){nn.setColor(e,n,t,1)}),G=C(function(e){A==k?(P=e,U.setSize(e),X.setSize(e),Y.setSize(e)):(R=e,O.setSize(e))},function(){A()});G.setSize(P);var q=u(function(){H.operate(function(e){var n=e.canvas.width;e.fillStyle="#fff",e.globalAlpha=1,e.fillRect(0,0,n,n)}),A()},function(e){H.operate(function(n){var t=H.element;p(n,e,t.offsetWidth,t.offsetHeight)}),A()},function(){var e=H.element,n=e.offsetWidth,t=e.offsetHeight;y(H.canvas,n,t),A()}),J=S("pencil",function(){J.isChecked()&&(W.isVisible()?W.hide():W.show()),k()});J.addClass(z+"-primaryToolButton"),J.colorButton=N.blackButton;var K=S("eraser",m);K.addClass(z+"-eraserButton"),K.colorButton=N.whiteButton,T(0,0,100,1),M(0,0,0,1);var Q=n("palette",function(){Q.isChecked()?A():(d(),c(),W.hide(),l(),o(),an(),N.show(),Q.check())});Q.addClass(z+"-paletteButton");var Z=n("params",function(){Z.isChecked()?A():(d(),c(),W.hide(),i(),o(),an(),G.show(),Z.check())});Z.addClass(z+"-paramsButton");var $=I(H.undo);H.onUndoAvailable($.enable),H.onUndoUnavailable($.disable);var _=n("burger",function(){_.isChecked()?A():(d(),c(),W.hide(),i(),l(),an(),q.show(),_.check())});_.addClass(z+"-fileButton");var en=r(z+"-content");en.appendChild(H.element),en.appendChild(W.element),en.appendChild(N.element),en.appendChild(G.element),en.appendChild(q.element);var nn=L(function(e,n,t){N.pickColor(e,n,t),w(e,n,t,1,N.getActiveButton())},function(){V.disable(),an(),N.isEditVisible()?N.show():A()}),tn=v(nn);tn.addButton(J),tn.addButton(K),tn.addButton(Q),tn.addButton(Z),tn.addButton($),tn.addButton(_);var an=tn.unslide,on=r(z);return on.appendChild(en),on.appendChild(tn.element),{element:on,resize:function(){var e=H.element;F.resize(e.offsetWidth,e.offsetHeight)},show:function(){k(),tn.show()}}}function p(e,n,t,a){var o,i,r=e.canvas,l=t/a,c=n.width/n.height;l>c?(o=t,i=o/c):(i=a,o=i*c);var u=(r.width-o)/2,d=(r.height-i)/2;e.globalAlpha=1,e.drawImage(n,u,d,o,i)}function g(e,n,t,a){function c(e){var n=e.hue,t=e.saturation,a=e.luminance,o=e.alpha;s.setColor(n,t,a,o),h.setColor(n,t,a,o)}var u="PalettePanel",d=i(function(a){b=a,t(a);var o=a.color;c(o),e(o.hue,o.saturation,o.luminance,o.alpha,a),s.isChecked()||n()}),s=o(function(){g&&(s.isChecked()?(h.hide(),s.uncheck(),C=!1):(h.show(),s.check(),C=!0))});s.setColor(0,0,0,1),s.addClass(u+"-previewButton");var h=l(function(n,t,a,o){s.setColor(n,t,a,o),d.setColor(n,t,a,o),e(n,t,a,o,b)}),f=k(function(){a(b)}),v=r(u+"-secondLayer");v.appendChild(d.element),v.appendChild(s.element),v.appendChild(f.element);var m=r(u+"-content");m.appendChild(h.element),m.appendChild(v);var p=r(u);p.appendChild(m);var g=!1,C=!1,b=d.blackButton;return{blackButton:d.blackButton,element:p,whiteButton:d.whiteButton,getActiveButton:function(){return b},hide:function(){g&&(h.hide(),m.classList.remove("visible"),g=!1)},isEditVisible:function(){return C},select:function(e){b=e,d.select(e),c(e.color)},pickColor:function(e,n,t){var a=s.color.alpha;h.setColor(e,n,t,a),s.setColor(e,n,t,a),d.setColor(e,n,t,a)},show:function(){g||(C&&h.show(),m.classList.add("visible"),g=!0)}}}function C(e,n){function t(){c.clearRect(0,0,l.width,l.height),c.beginPath(),c.arc(l.width/2,l.height/2,(f+1)/2,0,2*Math.PI),c.fill()}var a="ParamsPanel",o=1,i=48,l=document.createElement("canvas");l.width=l.height=i+4,l.className=a+"-previewCanvas";var c=l.getContext("2d"),u=M(function(n){f=o+n*i,e(f),t()},n);u.addClass(a+"-slider");var d=r(a+"-content");d.appendChild(u.element),d.appendChild(l);var s=r(a);s.appendChild(d);var h=!1,f=o;return{element:s,hide:function(){u.abortTouch(),d.classList.remove("visible")},setColor:function(e,n,t){c.fillStyle="hsl("+e+", "+n+"%, "+t+"%)",h=!0},setSize:function(e){f=e,h=!0},show:function(){h&&(t(),h=!1,u.setRatio((f-o)/(i-o))),d.classList.add("visible")}}}function b(e,n){function t(t,a){!function(e,o,i){n.operate(function(n){n.lineWidth=e,n.fillStyle=i,n.beginPath(),n.arc(t,a,o,0,2*Math.PI),n.fill()})}(e,d,g)}function a(e){function n(){c?c=!1:(removeEventListener("mousemove",a),removeEventListener("mouseup",n))}function a(e){if(c)c=!1;else{var n=h.getBoundingClientRect(),t=e.clientX-n.left,a=e.clientY-n.top;o(r,l,t,a),r=t,l=a}}if(0===e.button)if(e.preventDefault(),c)c=!1;else{var i=h.getBoundingClientRect(),r=e.clientX-i.left,l=e.clientY-i.top;t(r,l),addEventListener("mousemove",a),addEventListener("mouseup",n)}}function o(t,a,o,i){!function(e,r){n.operate(function(n){n.lineWidth=e,n.strokeStyle=r,n.beginPath(),n.moveTo(t,a),n.lineTo(o,i),n.stroke()})}(e,g)}function i(e){c=!0,e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++)delete u[n[t].identifier]}function r(e){c=!0,e.preventDefault();for(var n=h.getBoundingClientRect(),t=e.changedTouches,a=0;a<t.length;a++){var i=t[a],r=u[i.identifier];if(r){var l=i.clientX-n.left,d=i.clientY-n.top;o(r.x,r.y,l,d),r.x=l,r.y=d}}}function l(e){c=!0,e.preventDefault();for(var n=h.getBoundingClientRect(),a=e.changedTouches,o=0;o<a.length;o++){var i=a[o],r=i.clientX-n.left,l=i.clientY-n.top;t(r,l),u[i.identifier]={x:r,y:l}}}var c=!1,u={},d=e/2,s=!1,h=n.canvas,f=0,v=0,m=0,p=1,g="hsla(0, 0%, 0%, 1)";return{disable:function(){s&&(h.removeEventListener("mousedown",a),h.removeEventListener("touchstart",l),h.removeEventListener("touchmove",r),h.removeEventListener("touchend",i),s=!1)},enable:function(){s||(h.addEventListener("mousedown",a),h.addEventListener("touchstart",l),h.addEventListener("touchmove",r),h.addEventListener("touchend",i),s=!0)},setColor:function(e,n,t,a){f=e,v=n,m=t,p=a,g="hsla("+f+", "+v+"%, "+m+"%, "+p+")"},setSize:function(n){e=n,d=e/2}}}function k(e){var t=n("pick",e);return t.addClass("PickButton"),t}function L(e,t){var a="PickPanel",i=o(function(){var n=i.color;e(n.hue,n.saturation,n.luminance),t()});i.addClass(a+"-colorButton");var l=n("cancel",t);l.addClass(a+"-cancelButton");var c=r(a);return c.appendChild(i.element),c.appendChild(l.element),{element:c,setColor:i.setColor}}function E(e,n){function t(e){var n=a(e);r(n[0],n[1])}function a(e){var n=v.getBoundingClientRect(),t=Math.floor(e.clientX-n.left),a=Math.floor(e.clientY-n.top);return[t,a]}function o(e){function n(e){e.preventDefault(),s?s=!1:i(e)}function a(e){e.preventDefault(),removeEventListener("mousemove",n),removeEventListener("mouseup",a)}0===e.button&&(e.preventDefault(),s?s=!1:(t(e),addEventListener("mousemove",n),addEventListener("mouseup",a)))}function i(e){var n=a(e),t=n[0],o=n[1];t>=0&&m>t&&o>=0&&p>o&&r(t,o)}function r(e,t){var a=4*(e+t*m),o=w(d[a],d[a+1],d[a+2]);n(o.hue,o.saturation,o.luminance)}function l(e){e.preventDefault(),s=!0;for(var n=e.changedTouches,t=0;t<n.length;t++)if(n[t].identifier===h){h=null;break}}function c(e){e.preventDefault(),s=!0;for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t];if(a.identifier===h){i(a);break}}}function u(e){if(e.preventDefault(),s=!0,null===h){var n=e.changedTouches[0];h=n.identifier,t(n)}}var d,s=!1,h=null,f=!1,v=e.canvas,m=v.width,p=v.height,g=v.getContext("2d");return{disable:function(){f&&(v.removeEventListener("mousedown",o),v.removeEventListener("touchstart",u),removeEventListener("touchmove",c),removeEventListener("touchend",l),f=!1)},enable:function(){f||(v.addEventListener("mousedown",o),v.addEventListener("touchstart",u),addEventListener("touchmove",c),addEventListener("touchend",l),f=!0,d=g.getImageData(0,0,m,p).data)}}}function B(e,n){function t(t){var o={};i(o,t);var r={x:o.x,y:o.y},l={color:b,endPoint:r,size:e,startPoint:o,end:function(){d.splice(d.indexOf(l),1),u(),n.operate(function(e){a(e,l)})},move:function(e){i(r,e),u()}};return d.push(l),u(),l}function a(e,n){var t=n.startPoint,a=t.x,o=t.y,i=n.endPoint;e.beginPath(),e.rect(a,o,i.x-a,i.y-o),e.strokeStyle=n.color,e.lineJoin="round",e.lineWidth=n.size,e.stroke()}function o(e){function n(e){o.move(e),u()}function a(){o.end(),removeEventListener("mousemove",n),removeEventListener("mouseup",a)}if(0===e.button)if(e.preventDefault(),s)s=!1;else{var o=t(e);addEventListener("mousemove",n),addEventListener("mouseup",a)}}function i(e,n){var t=v.getBoundingClientRect();e.x=n.clientX-t.left,e.y=n.clientY-t.top}function r(e){s=!0,e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t],o=a.identifier,i=h[o];i&&(i.end(),delete h[o])}}function l(e){s=!0,e.preventDefault();for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t],o=h[a.identifier];o&&o.move(a)}}function c(e){s=!0,e.preventDefault();for(var n=e.changedTouches,a=0;a<n.length;a++){var o=n[a];h[o.identifier]=t(o)}}function u(){L.clearRect(0,0,k.width,k.height),d.forEach(function(e){a(L,e)})}var d=[],s=!1,h={},f=!1,v=n.canvas,m=0,p=0,g=0,C=1,b="hsla(0, 0%, 0%, 1)",k=document.createElement("canvas");k.className="RectangleTool-overlayCanvas",k.width=v.width,k.height=v.height,k.style.top=v.style.top,k.style.left=v.style.left;var L=k.getContext("2d");return v.parentNode.appendChild(k),{disable:function(){f&&(v.removeEventListener("mousedown",o),v.removeEventListener("touchstart",c),v.removeEventListener("touchmove",l),v.removeEventListener("touchend",r),f=!1)},enable:function(){f||(v.addEventListener("mousedown",o),v.addEventListener("touchstart",c),v.addEventListener("touchmove",l),v.addEventListener("touchend",r),f=!0)},setColor:function(e,n,t,a){m=e,p=n,g=t,C=a,b="hsla("+m+", "+p+"%, "+g+"%, "+C+")"},setSize:function(n){e=n}}}function w(e,n,t){var a,o,i,r,l,c;if(e/=255,n/=255,t/=255,a=Math.max(e,n,t),o=Math.min(e,n,t),l=(a+o)/2,a==o)i=r=0;else{switch(c=a-o,r=l>.5?c/(2-a-o):c/(a+o),a){case e:i=(n-t)/c+(t>n?6:0);break;case n:i=(t-e)/c+2;break;case t:i=(e-n)/c+4}i/=6}return i=Math.floor(360*i),r=Math.floor(100*r),l=Math.floor(100*l),{hue:i,saturation:r,luminance:l}}function y(e,n,t){var a=document.createElement("canvas");a.width=n,a.height=t;var o=(n-e.width)/2,i=(t-e.height)/2,r=a.getContext("2d");r.drawImage(e,o,i);var l=document.createElement("a");l.href=a.toDataURL("image/png"),l.download="picture.png",l.style.position="absolute",l.style.top=l.style.left=0,document.body.appendChild(l),l.click(),document.body.removeChild(l)}function T(e,n){function t(){var e="hsl("+a+", 100%, "+o+"%)",n="hsl("+a+", 0%, "+o+"%)",t="rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)";l.style.backgroundImage="linear-gradient("+t+"), linear-gradient(90deg, "+n+", "+e+")",c.style.backgroundImage="linear-gradient(90deg, "+t+"), linear-gradient("+e+", "+n+")"}var a=0,o=0,i="SaturationSlider",l=r(i+"-portraitBar"),c=r(i+"-landscapeBar"),u=M(function(n){e(100*n)},n);return u.addClass(i),u.barElement.appendChild(l),u.barElement.appendChild(c),t(),{abortTouch:u.abortTouch,element:u.element,setHue:function(e){a=e,t()},setLuminance:function(e){o=e,t()},setSaturation:function(e){u.setRatio(e/100)}}}function M(e,n){function t(t){function i(n){var t=h.getBoundingClientRect(),o=d.offsetHeight;if(innerWidth>innerHeight){var i=h.offsetHeight;u=1-(n.clientY-t.top-o/2)/i}else{var r=h.offsetWidth;u=(n.clientX-t.left-o/2)/r}u=Math.max(0,Math.min(1,u)),a(),e(u)}function r(){f(),n()}function f(){o=!1,c=null,s.remove("active"),removeEventListener("mousemove",v),removeEventListener("mouseup",m),removeEventListener("touchmove",g),removeEventListener("touchend",p)}function v(e){l?l=!1:i(e)}function m(){l?l=!1:r()}function p(e){l=!0;for(var n=e.changedTouches,t=0;t<n.length;t++)if(n[t].identifier===c){e.preventDefault(),r();break}}function g(e){l=!0;for(var n=e.changedTouches,t=0;t<n.length;t++){var a=n[t];if(a.identifier===c){e.preventDefault(),i(a);break}}}o=!0,i(t),s.add("active"),addEventListener("mousemove",v),addEventListener("mouseup",m),addEventListener("touchmove",g),addEventListener("touchend",p)}function a(){d.style.top=100*(1-u)+"%",d.style.left=100*u+"%"}var o=!1,i="Slider",l=!1,c=null,u=0,d=r(i+"-handle"),s=d.classList,h=r(i+"-handleWrapper");h.appendChild(d);var f=r(i+"-bar"),v=r(i);return v.appendChild(f),v.appendChild(h),v.addEventListener("mousedown",function(e){0===e.button&&(e.preventDefault(),l?l=!1:t(e))}),v.addEventListener("touchstart",function(e){if(l=!0,null===c){e.preventDefault();var n=e.changedTouches[0];c=n.identifier,t(n)}}),a(),{barElement:f,element:v,abortTouch:function(){o&&endSlide()},addClass:function(e){v.classList.add(e)},setRatio:function(e){u=e,a()}}}function S(e,t){var a=n(e,t),o="ToolButton",i=r(o+"-opaque"),l=r(o+"-color");l.appendChild(i);var c=r(o+"-transparency");c.style.backgroundImage="url(images/color-background.svg)",c.appendChild(l);var u=a.element,d=u.classList;return a.contentElement.appendChild(c),{addClass:a.addClass,check:a.check,element:u,isChecked:a.isChecked,setIcon:a.setIcon,uncheck:a.uncheck,mark:function(){d.add("marked")},setColor:function(e,n,t,a){var o=e+", "+n+"%, "+t+"%",r="hsla("+o+", "+a+")";l.style.background=r;var c="hsl("+o+")";i.style.background=c},unmark:function(){d.remove("marked")}}}function D(e,t,a,o){function i(){v.remove("visible"),m=!1}var l="ToolPanel",c=n("pencil",function(){u.uncheck(),d.uncheck(),s.uncheck(),c.check(),e(),i()});c.addClass(l+"-pencilButton"),c.check();var u=n("line",function(){c.uncheck(),d.uncheck(),s.uncheck(),u.check(),t(),i()});u.addClass(l+"-lineButton");var d=n("rectangle",function(){c.uncheck(),u.uncheck(),s.uncheck(),d.check(),a(),i()});d.addClass(l+"-rectangleButton");var s=n("bucket",function(){c.uncheck(),u.uncheck(),d.uncheck(),s.check(),o(),i()});s.addClass(l+"-bucketButton");var h=r(l+"-content");h.appendChild(c.element),h.appendChild(u.element),h.appendChild(d.element),h.appendChild(s.element);var f=r(l);f.appendChild(h);var v=h.classList,m=!1;return{element:f,hide:i,isVisible:function(){return m},show:function(){v.add("visible"),m=!0}}}function I(e){function n(){function n(){removeEventListener("mouseup",t),removeEventListener("touchend",a),c.remove("active"),clearInterval(o)}function t(){i?i=!1:n()}function a(e){i=!0;for(var t=e.changedTouches,a=0;a<t.length;a++)t[a].identifier===l&&(l=null,n())}var i=!1;addEventListener("touchend",a),addEventListener("mouseup",t),c.add("active"),o=setInterval(e,50),e()}var t=r("Button-content");t.style.backgroundImage="url(images/undo.svg)";var a=r("Button UndoButton disabled");a.appendChild(t),a.addEventListener("mousedown",function(e){0===e.button&&(e.preventDefault(),i?i=!1:n())}),a.addEventListener("touchstart",function(e){i=!0,null===l&&(e.preventDefault(),l=e.changedTouches[0].identifier,n())});var o,i=!1,l=null,c=a.classList;return{element:a,disable:function(){c.add("disabled")},enable:function(){c.remove("disabled")}}}!function(){var e=r("Main-horizontalProgress"),n=r("Main-verticalProgress"),t=r("Main-loadBar");t.appendChild(e),t.appendChild(n);var a=m(),o=document.body;o.appendChild(a.element),o.appendChild(t);var i=0,l=["bucket","burger","eraser","line","palette","params","pencil","rectangle","undo"];l.forEach(function(r){var c=new Image;c.src="images/"+r+".svg",c.onload=c.onerror=c.onabort=function(){i++;var r=i/l.length*100+"%";e.style.width=r,n.style.height=r,i==l.length&&(a.show(),setTimeout(function(){t.classList.add("hidden"),setTimeout(function(){o.removeChild(t)},250)},250))}});var c=a.resize;addEventListener("resize",c),c()}()}();