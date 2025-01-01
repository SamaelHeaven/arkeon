var t,e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},s={};e.d(s,{Vd:()=>y,FV:()=>o,Q1:()=>h,dw:()=>b,lZ:()=>x,Zt:()=>S,A1:()=>l,Uz:()=>u,s3:()=>m,Ji:()=>t,KK:()=>B,w3:()=>g,BU:()=>a,A4:()=>d,Z5:()=>v,gP:()=>_,gX:()=>M,ZY:()=>i,dG:()=>p}),function(t){t.clamp=function(t,e,s){return globalThis.Math.min(globalThis.Math.max(t,e),s)}}(t||(t={}));var n=t.clamp;class i{constructor(t=0,e=t){this.x=t,this.y=e}plus(t){return"number"==typeof t?new i(this.x+t,this.y+t):new i(this.x+t.x,this.y+t.y)}minus(t){return"number"==typeof t?new i(this.x-t,this.y-t):new i(this.x-t.x,this.y-t.y)}times(t){return"number"==typeof t?new i(this.x*t,this.y*t):new i(this.x*t.x,this.y*t.y)}div(t){return"number"==typeof t?0===t?i.ZERO:new i(this.x/t,this.y/t):new i(0===t.x?0:this.x/t.x,0===t.y?0:this.y/t.y)}equals(t){return"number"==typeof t?this.x===t&&this.y===t:this.x===t.x&&this.y===t.y}clamp(t,e){let s,a,r,h;return"number"==typeof t?(s=t,r=t):(s=t.x,r=t.y),"number"==typeof e?(a=e,h=e):(a=e.x,h=e.y),new i(n(this.x,s,a),n(this.y,r,h))}clampX(t,e){return new i(n(this.x,t,e),this.y)}clampY(t,e){return new i(this.x,n(this.y,t,e))}distanceTo(t){const e=t.x-this.x,s=t.y-this.y;return Math.sqrt(e*e+s*s)}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}rotate(t,e){const s=t*Math.PI/180,n=Math.cos(s),a=Math.sin(s),r=this.x-e.x,h=this.y-e.y,o=r*a+h*n;return new i(r*n-h*a+e.x,o+e.y)}angleBetween(t){const e=this.length()*t.length();return 0===e?0:Math.acos(this.dot(t)/e)}reflect(t){const e=this.dot(t);return new i(this.x-2*e*t.x,this.y-2*e*t.y)}lerp(t,e){const s=Math.max(0,Math.min(1,e));return new i(this.x+(t.x-this.x)*s,this.y+(t.y-this.y)*s)}slerp(t,e){const s=this.angleBetween(t),n=Math.cos(s*e),a=Math.sin(s*e);return new i(this.x*n+t.x*a,this.y*n+t.y*a)}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}round(){return new i(Math.round(this.x),Math.round(this.y))}abs(){return new i(Math.abs(this.x),Math.abs(this.y))}normalize(){const t=this.length();return 0===t?i.ZERO:new i(this.x/t,this.y/t)}}i.ZERO=new i,i.UP=new i(0,-1),i.DOWN=new i(0,1),i.LEFT=new i(-1,0),i.RIGHT=new i(1,0);var a,r=t.clamp;class h{constructor(t,e,s,n=1){this.red=r(Math.round(t),0,255),this.green=r(Math.round(e),0,255),this.blue=r(Math.round(s),0,255),this.alpha=r(n,0,1)}static rgb(t,e,s){return`rgb(${r(t,0,255)}, ${r(e,0,255)}, ${r(s,0,255)})`}static rgba(t,e,s,n){return`rgba(${r(t,0,255)}, ${r(e,0,255)}, ${r(s,0,255)}, ${r(n,0,1)})`}static hsl(t,e,s){return`hsl(${r(t,0,360)}, ${r(e,0,100)}%, ${r(s,0,100)}%)`}static hsla(t,e,s,n){return`hsla(${r(t,0,360)}, ${r(e,0,100)}%, ${r(s,0,100)}%, ${r(n,0,1)})`}static extract(t){if(t.startsWith("#")){let e=t.replace("#","");if(3===e.length&&(e=e.split("").map((t=>t+t)).join("")),6===e.length||8===e.length){const t=parseInt(e.substring(0,2),16),s=parseInt(e.substring(2,4),16),n=parseInt(e.substring(4,6),16),i=8===e.length?parseInt(e.substring(6,8),16)/255:1;return new h(t,s,n,i)}}const e=/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(t);if(e){const t=r(parseInt(e[1]),0,255),s=r(parseInt(e[2]),0,255),n=r(parseInt(e[3]),0,255);return new h(t,s,n)}const s=/^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([0-1]?\.\d+|[0-9]{1,3})\)$/.exec(t);if(s){const t=r(parseInt(s[1]),0,255),e=r(parseInt(s[2]),0,255),n=r(parseInt(s[3]),0,255),i=r(parseFloat(s[4]),0,1);return new h(t,e,n,i)}const n=/^hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)$/.exec(t);if(n){const t=r(parseInt(n[1]),0,360),e=r(parseInt(n[2]),0,100),s=r(parseInt(n[3]),0,100);return this.fromHsl(t,e,s)}const i=/^hsla\((\d{1,3}), (\d{1,3})%, (\d{1,3})%, ([0-1]?\.\d+|[0-9]{1,3})\)$/.exec(t);if(i){const t=r(parseInt(i[1]),0,360),e=r(parseInt(i[2]),0,100),s=r(parseInt(i[3]),0,100),n=r(parseFloat(i[4]),0,1);return this.fromHsla(t,e,s,n)}return new h(0,0,0)}static fromRgb(t,e,s){return new h(t,e,s)}static fromRgba(t,e,s,n){return new h(t,e,s,n)}static fromHsl(t,e,s){return this.fromHsla(t,e,s,1)}static fromHsla(t,e,s,n){const i=(1-Math.abs(2*s/100-1))*(e/100),a=i*(1-Math.abs(t/60%2-1)),r=s/100-i/2;let o=0,u=0,c=0;return t>=0&&t<60?(o=i,u=a,c=0):t>=60&&t<120?(o=a,u=i,c=0):t>=120&&t<180?(o=0,u=i,c=a):t>=180&&t<240?(o=0,u=a,c=i):t>=240&&t<300?(o=a,u=0,c=i):t>=300&&t<360&&(o=i,u=0,c=a),new h(255*(o+r),255*(u+r),255*(c+r),n)}toString(){return`rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`}equals(t){const e="string"==typeof t?h.extract(t):t;return this.red===e.red&&this.green===e.green&&this.blue===e.blue&&this.alpha===e.alpha}}h.BLACK="rgb(0, 0, 0)",h.WHITE="rgb(255, 255, 255)",h.GRAY="rgb(127, 127, 127)",h.RED="rgb(255, 0, 0)",h.GREEN="rgb(0, 255, 0)",h.BLUE="rgb(0, 0, 255)",h.YELLOW="rgb(255, 255, 0)",h.ORANGE="rgb(255, 165, 0)",h.PURPLE="rgb(127, 0, 127)",h.TRANSPARENT="rgba(0, 0, 0, 0)",function(t){t.nativePaint=function(t){return"string"==typeof t?t:t.toString()}}(a||(a={}));var o,u,c=a.nativePaint;class l{constructor(t){this._context=t}get width(){return this._context.canvas.width}get height(){return this._context.canvas.height}clear(t){this._context.fillStyle=c(t),this._context.fillRect(0,0,this.width,this.height)}}class d{constructor(){S._ensureLaunched(),this._buffer=new OffscreenCanvas(S.width,S.height),this._context=S.canvas.getContext("2d",{alpha:!1}),this._graphics=new l(this._buffer.getContext("2d",{alpha:!1}))}static get graphics(){return this._self._graphics}static get _self(){return this._instance??(this._instance=new this)}_update(){const t=S.screenSize,e=S.scaleFactor,s=S.size.times(e),n=t.minus(s).div(2);this._context.fillStyle="#000",this._context.fillRect(0,0,t.x,t.y),this._context.drawImage(this._buffer,n.x,n.y,s.x,s.y)}}d._instance=null;class _{constructor(t){this._nativeTexture=t}get width(){return this._nativeTexture.width}get height(){return this._nativeTexture.height}get size(){return new i(this.width,this.height)}}class p extends _{constructor(t,e){const s=new OffscreenCanvas(t,e);super(s),this.graphics=new l(s.getContext("2d"))}}class y{static loadTexture(t,e){if(this._textures.has(t))return;const s=new Image;s.src=e;const n=new _(s);return this._textures.set(t,n),new Promise((t=>s.onload=()=>t()))}static unloadTexture(t){this._textures.delete(t)}static getTexture(t){return this._textures.get(t)}}y._textures=new Map,function(t){let e,s;!function(t){t.addAll=function(t,e){for(const s of e)t.push(s);return t},t.removeAll=function(t,e){const s=new globalThis.Set(e);if(!s.size)return t;for(let e=t.length-1;e>=0;e--)s.has(t[e])&&t.splice(e,1);return t}}(e=t.Array||(t.Array={})),function(t){t.addAll=function(t,e){for(const s of e)t.add(s);return t},t.removeAll=function(t,e){for(const s of e)t.delete(s);return t}}(s=t.Set||(t.Set={}))}(o||(o={})),function(t){t.Unidentified="Unidentified",t.Pause="Pause",t.Backspace="Backspace",t.Tab="Tab",t.NumLock="NumLock",t.Enter="Enter",t.ShiftLeft="ShiftLeft",t.ShiftRight="ShiftRight",t.ControlLeft="ControlLeft",t.ControlRight="ControlRight",t.AltLeft="AltLeft",t.AltRight="AltRight",t.CapsLock="CapsLock",t.Lang1="Lang1",t.Lang2="Lang2",t.Escape="Escape",t.Space="Space",t.Numpad9="Numpad9",t.Numpad3="Numpad3",t.Numpad1="Numpad1",t.Numpad7="Numpad7",t.Left="ArrowLeft",t.Up="ArrowUp",t.Right="ArrowRight",t.Down="ArrowDown",t.F13="F13",t.Numpad0="Numpad0",t.NumpadDecimal="NumpadDecimal",t.Digit0="Digit0",t.Digit1="Digit1",t.Digit2="Digit2",t.Digit3="Digit3",t.Digit4="Digit4",t.Digit5="Digit5",t.Digit6="Digit6",t.Digit7="Digit7",t.Digit8="Digit8",t.Digit9="Digit9",t.Period="Period",t.Semicolon="Semicolon",t.Backquote="Backquote",t.Equal="Equal",t.Minus="Minus",t.A="KeyA",t.B="KeyB",t.C="KeyC",t.D="KeyD",t.E="KeyE",t.F="KeyF",t.G="KeyG",t.H="KeyH",t.I="KeyI",t.J="KeyJ",t.K="KeyK",t.L="KeyL",t.M="KeyM",t.N="KeyN",t.O="KeyO",t.P="KeyP",t.Q="KeyQ",t.R="KeyR",t.S="KeyS",t.T="KeyT",t.U="KeyU",t.V="KeyV",t.W="KeyW",t.X="KeyX",t.Y="KeyY",t.Z="KeyZ",t.MetaLeft="MetaLeft",t.MetaRight="MetaRight",t.ContextMenu="ContextMenu",t.NumpadMultiply="NumpadMultiply",t.NumpadAdd="NumpadAdd",t.NumpadSubtract="NumpadSubtract",t.NumpadDivide="NumpadDivide",t.F1="F1",t.F2="F2",t.F3="F3",t.F4="F4",t.F5="F5",t.F6="F6",t.F7="F7",t.F8="F8",t.F9="F9",t.F10="F10",t.F11="F11",t.F12="F12",t.F14="F14",t.F15="F15",t.F16="F16",t.F17="F17",t.F18="F18",t.F19="F19",t.F20="F20",t.F21="F21",t.F22="F22",t.F23="F23",t.F24="F24",t.F25="F25",t.F26="F26",t.F27="F27",t.F28="F28",t.F29="F29",t.F30="F30",t.F31="F31",t.F32="F32",t.ScrollLock="ScrollLock",t.BracketLeft="BracketLeft",t.BracketRight="BracketRight",t.Backslash="Backslash",t.Quote="Quote",t.MediaTrackNext="MediaTrackNext",t.MediaTrackPrevious="MediaTrackPrevious",t.VolumeMute="VolumeMute",t.VolumeDown="VolumeDown",t.VolumeUp="VolumeUp",t.Comma="Comma",t.Slash="Slash",t.IntlBackslash="IntlBackslash",t.IntlRo="IntlRo",t.NumpadComma="NumpadComma",t.OSLeft="OSLeft",t.WakeUp="WakeUp"}(u||(u={}));var g,w=o.Set.addAll,f=o.Set.removeAll;class m{constructor(){this._newPressedKeys=new Set,this._newReleasedKeys=new Set,this._keys=Object.values(u),this._downKeys=new Set,this._upKeys=new Set,this._pressedKeys=new Set,this._releasedKeys=new Set,this._newTypedString="",this._typedString="",S._ensureLaunched();const t=S.canvas;t.addEventListener("keydown",(t=>this._onKeyDown(t))),t.addEventListener("keyup",(t=>this._onKeyUp(t)))}static get typedString(){return this._self._typedString}static get downKeys(){return this._self._downKeys}static get upKeys(){return this._self._upKeys}static get pressedKeys(){return this._self._pressedKeys}static get releasedKeys(){return this._self._releasedKeys}static isKeyDown(t){return this._self._downKeys.has(u[t])}static isKeyUp(t){return this._self._upKeys.has(u[t])}static isKeyPressed(t){return this._self._pressedKeys.has(u[t])}static isKeyReleased(t){return this._self._releasedKeys.has(u[t])}static get _self(){return this._instance??(this._instance=new this)}_update(){S.focused?(this._updateTypedString(),this._updatePressedKeys(),this._updateDownKeys(),this._updateReleasedKeys(),this._updateUpKeys()):this._reset()}_onKeyDown(t){const e=t.code;this._keys.includes(e)&&this._newPressedKeys.add(e),1===t.key.length&&(this._newTypedString+=t.key)}_onKeyUp(t){const e=t.code;this._keys.includes(e)&&this._newReleasedKeys.add(e)}_updateTypedString(){this._typedString=this._newTypedString,this._newTypedString=""}_updateDownKeys(){w(this._downKeys,this._newPressedKeys),this._newPressedKeys.clear()}_updateUpKeys(){this._upKeys.clear(),w(this._upKeys,this._keys),f(this._upKeys,this._downKeys)}_updatePressedKeys(){this._pressedKeys.clear(),w(this._pressedKeys,this._newPressedKeys),f(this._pressedKeys,this._downKeys)}_updateReleasedKeys(){this._releasedKeys.clear(),w(this._releasedKeys,this._newReleasedKeys),this._newReleasedKeys.clear(),f(this._downKeys,this._releasedKeys)}_reset(){this._newTypedString="",this._typedString="",this._newPressedKeys.clear(),this._downKeys.clear(),this._newReleasedKeys.clear(),this._releasedKeys.clear(),this._updateUpKeys()}}m._instance=null,function(t){t[t.Left=0]="Left",t[t.Middle=1]="Middle",t[t.Right=2]="Right"}(g||(g={}));var x,K=o.Set.addAll,F=o.Set.removeAll;class B{constructor(){this._newPressedButtons=new Set,this._newReleasedButtons=new Set,this._buttons=Object.values(g),this._downButtons=new Set,this._upButtons=new Set,this._pressedButtons=new Set,this._releasedButtons=new Set,S._ensureLaunched();const t=S.canvas;t.addEventListener("mousedown",(t=>this._onMouseDown(t))),t.addEventListener("mouseup",(t=>this._onMouseUp(t)))}static get downButtons(){return this._self._downButtons}static get upButtons(){return this._self._upButtons}static get pressedButtons(){return this._self._pressedButtons}static get releasedButtons(){return this._self._releasedButtons}static isButtonDown(t){return this._self._downButtons.has(g[t])}static isButtonUp(t){return this._self._upButtons.has(g[t])}static isButtonPressed(t){return this._self._pressedButtons.has(g[t])}static isButtonReleased(t){return this._self._releasedButtons.has(g[t])}static get _self(){return this._instance??(this._instance=new this)}_update(){S.focused?(this._updatePressedButtons(),this._updateDownButtons(),this._updateReleasedButtons(),this._updateUpButtons()):this._reset()}_onMouseDown(t){const e=t.button;this._buttons.includes(e)&&this._newPressedButtons.add(e)}_onMouseUp(t){const e=t.button;this._buttons.includes(e)&&this._newReleasedButtons.add(e)}_updateDownButtons(){K(this._downButtons,this._newPressedButtons),this._newPressedButtons.clear()}_updateUpButtons(){this._upButtons.clear(),K(this._upButtons,this._buttons),F(this._upButtons,this._downButtons)}_updatePressedButtons(){this._pressedButtons.clear(),K(this._pressedButtons,this._newPressedButtons),F(this._pressedButtons,this._downButtons)}_updateReleasedButtons(){this._releasedButtons.clear(),K(this._releasedButtons,this._newReleasedButtons),this._newReleasedButtons.clear(),F(this._downButtons,this._releasedButtons)}_reset(){this._newPressedButtons.clear(),this._downButtons.clear(),this._newReleasedButtons.clear(),this._releasedButtons.clear(),this._updateUpButtons()}}B._instance=null,function(t){t[t.Nanoseconds=1]="Nanoseconds",t[t.Microseconds=1e3]="Microseconds",t[t.Milliseconds=1e6]="Milliseconds",t[t.Seconds=1e9]="Seconds",t[t.Minutes=6e10]="Minutes",t[t.Hours=36e11]="Hours",t[t.Days=864e11]="Days"}(x||(x={}));class b{constructor(t,e="Nanoseconds"){this._nanoseconds=t*x[e]}static fromNanoseconds(t){return new b(t,"Nanoseconds")}static fromMicroseconds(t){return new b(t,"Microseconds")}static fromMilliseconds(t){return new b(t,"Milliseconds")}static fromSeconds(t){return new b(t,"Seconds")}static fromMinutes(t){return new b(t,"Minutes")}static fromHours(t){return new b(t,"Hours")}static fromDays(t){return new b(t,"Days")}to(t){return this._nanoseconds/x[t]}get nanoseconds(){return this.to("Nanoseconds")}get microseconds(){return this.to("Microseconds")}get milliseconds(){return this.to("Milliseconds")}get seconds(){return this.to("Seconds")}get minutes(){return this.to("Minutes")}get hours(){return this.to("Hours")}get days(){return this.to("Days")}add(t){return new b(this._nanoseconds+t._nanoseconds)}subtract(t){return new b(this._nanoseconds-t._nanoseconds)}toString(){const t=Math.floor(this.days),e=Math.floor(this.hours%24),s=Math.floor(this.minutes%60),n=Math.floor(this.seconds%60),i=Math.floor(this.milliseconds%1e3),a=[];return t&&a.push(`${t}d`),e&&a.push(`${e}h`),s&&a.push(`${s}m`),n&&a.push(`${n}s`),i&&a.push(`${i}ms`),a.length>0?a.join(" "):"0ms"}}class M{constructor(){this._launchTime=performance.now(),this._fixedDelta=1/60,this._startTime=this._launchTime,this._lastFrameTime=0,this._frameCount=0,this._delta=0,this._averageFPS=0,S._ensureLaunched()}static get elapsed(){return b.fromMilliseconds(performance.now()-this._self._launchTime)}static get delta(){return this._self._delta}static get fixedDelta(){return this._self._fixedDelta}static get averageFPS(){return this._self._averageFPS}static get currentFPS(){const t=this._self;return t._delta<=0?0:1/t._delta}static get _self(){return this._instance??(this._instance=new this)}_update(){const t=performance.now()-this._startTime;this._frameCount++,this._delta=(t-this._lastFrameTime)/1e3;const e=t/1e3;this._averageFPS=0===e?0:this._frameCount/e,this._lastFrameTime=t}_restart(){this._startTime=performance.now(),this._lastFrameTime=0,this._frameCount=0,this._delta=0,this._averageFPS=0}}M._instance=null;class S{constructor(){this._time=null,this._keyboard=null,this._mouse=null,this._renderer=null,this._canvas=null,this._scene=null,this._size=null,this._shouldResize=!1,S._ensureLaunched()}static get focused(){return document.activeElement===this._self._canvas}static get canvas(){return this._self._canvas}static get scene(){return this._self._scene}static set scene(t){this._self._scene=t}static get width(){return this._self._size.x}static get height(){return this._self._size.y}static get size(){return this._self._size}static get screenWidth(){return this._self._canvas.width}static get screenHeight(){return this._self._canvas.height}static get screenSize(){const t=this._self;return new i(t._canvas.width,t._canvas.height)}static get scaleFactor(){const t=this._self;return Math.min(t._canvas.width/t._size.x,t._canvas.height/t._size.y)}static launch(t){this._ensureNotLaunched(),this._launched=!0,this._self._launch(t)}static get _self(){return this._instance??(this._instance=new this)}static _ensureNotLaunched(){if(this._launched)throw new Error("Game has already been launched")}static _ensureLaunched(){if(!this._launched)throw new Error("Game has not been launched")}_launch(t){this._scene=t.scene,this._canvas=t.canvas,this._size=new i(t.width??800,t.height??600),this._initialize(),this._start()}_initialize(){this._initializeCanvas(),this._time=M._self,this._keyboard=m._self,this._mouse=B._self,this._renderer=d._self}_initializeCanvas(){this._resizeCanvas(),new ResizeObserver((()=>this._shouldResize=!0)).observe(this._canvas.parentElement),this._canvas.tabIndex=0,this._canvas.oncontextmenu=()=>!1,this._canvas.focus()}_start(){this._scene._initialize().then((()=>this._frame()))}_update(){const t=this._scene;return this._time._update(),this._keyboard._update(),this._mouse._update(),t.update(),this._handleResizing(),this._renderer._update(),this._nextFrame(t)}_nextFrame(t){return this._scene===t?this._frame():this._scene._initialize().then((()=>(this._time._restart(),this._frame())))}_frame(){return new Promise((t=>requestAnimationFrame((()=>this._update().then(t)))))}_handleResizing(){this._shouldResize&&(this._shouldResize=!1,this._resizeCanvas())}_resizeCanvas(){const{width:t,height:e}=this._canvas.parentElement.getBoundingClientRect();this._canvas.width=t,this._canvas.height=e}}S._instance=null,S._launched=!1;class v{constructor(){this._initialized=!1}async _initialize(){if(!this._initialized)return this._initialized=!0,this.initialize()}}var R=s.Vd,D=s.FV,L=s.Q1,P=s.dw,T=s.lZ,N=s.Zt,z=s.A1,k=s.Uz,A=s.s3,U=s.Ji,C=s.KK,E=s.w3,I=s.BU,$=s.A4,O=s.Z5,H=s.gP,V=s.gX,Z=s.ZY,G=s.dG;export{R as Asset,D as CollectionUtilities,L as Color,P as Duration,T as DurationUnit,N as Game,z as Graphics,k as Key,A as Keyboard,U as MathUtilities,C as Mouse,E as MouseButton,I as PaintUtilities,$ as Renderer,O as Scene,H as Texture,V as Time,Z as Vec2,G as WritableTexture};