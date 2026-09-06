var ox=Object.defineProperty;var ax=(n,e,t)=>e in n?ox(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var si=(n,e,t)=>(ax(n,typeof e!="symbol"?e+"":e,t),t);/**
* @vue/shared v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Of(n,e){const t=new Set(n.split(","));return e?i=>t.has(i.toLowerCase()):i=>t.has(i)}const dt={},Os=[],zn=()=>{},lx=()=>!1,la=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Ff=n=>n.startsWith("onUpdate:"),Rt=Object.assign,Bf=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},cx=Object.prototype.hasOwnProperty,Ye=(n,e)=>cx.call(n,e),Le=Array.isArray,Fs=n=>ca(n)==="[object Map]",a_=n=>ca(n)==="[object Set]",ux=n=>ca(n)==="[object RegExp]",Fe=n=>typeof n=="function",vt=n=>typeof n=="string",ao=n=>typeof n=="symbol",ct=n=>n!==null&&typeof n=="object",l_=n=>(ct(n)||Fe(n))&&Fe(n.then)&&Fe(n.catch),c_=Object.prototype.toString,ca=n=>c_.call(n),fx=n=>ca(n).slice(8,-1),u_=n=>ca(n)==="[object Object]",kf=n=>vt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ro=Of(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ql=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},hx=/-(\w)/g,_i=ql(n=>n.replace(hx,(e,t)=>t?t.toUpperCase():"")),dx=/\B([A-Z])/g,lo=ql(n=>n.replace(dx,"-$1").toLowerCase()),$l=ql(n=>n.charAt(0).toUpperCase()+n.slice(1)),bc=ql(n=>n?`on${$l(n)}`:""),_r=(n,e)=>!Object.is(n,e),Co=(n,e)=>{for(let t=0;t<n.length;t++)n[t](e)},gl=(n,e,t)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value:t})},px=n=>{const e=parseFloat(n);return isNaN(e)?n:e},f_=n=>{const e=vt(n)?Number(n):NaN;return isNaN(e)?n:e};let Yh;const h_=()=>Yh||(Yh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function zf(n){if(Le(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=vt(i)?vx(i):zf(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(vt(n)||ct(n))return n}const mx=/;(?![^(]*\))/g,_x=/:([^]+)/,gx=/\/\*[^]*?\*\//g;function vx(n){const e={};return n.replace(gx,"").split(mx).forEach(t=>{if(t){const i=t.split(_x);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function is(n){let e="";if(vt(n))e=n;else if(Le(n))for(let t=0;t<n.length;t++){const i=is(n[t]);i&&(e+=i+" ")}else if(ct(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const xx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",yx=Of(xx);function d_(n){return!!n||n===""}const tn=n=>vt(n)?n:n==null?"":Le(n)||ct(n)&&(n.toString===c_||!Fe(n.toString))?JSON.stringify(n,p_,2):String(n),p_=(n,e)=>e&&e.__v_isRef?p_(n,e.value):Fs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[Tc(i,s)+" =>"]=r,t),{})}:a_(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Tc(t))}:ao(e)?Tc(e):ct(e)&&!Le(e)&&!u_(e)?String(e):e,Tc=(n,e="")=>{var t;return ao(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Kn;class m_{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Kn,!e&&Kn&&(this.index=(Kn.scopes||(Kn.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=Kn;try{return Kn=this,e()}finally{Kn=t}}}on(){Kn=this}off(){Kn=this.parent}stop(e){if(this._active){let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function Sx(n){return new m_(n)}function Mx(n,e=Kn){e&&e.active&&e.effects.push(n)}function Ex(){return Kn}let Wr;class Hf{constructor(e,t,i,r){this.fn=e,this.trigger=t,this.scheduler=i,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Mx(this,r)}get dirty(){if(this._dirtyLevel===1){ls();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(bx(t.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),cs()}return this._dirtyLevel>=2}set dirty(e){this._dirtyLevel=e?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=cr,t=Wr;try{return cr=!0,Wr=this,this._runnings++,Kh(this),this.fn()}finally{Zh(this),this._runnings--,Wr=t,cr=e}}stop(){var e;this.active&&(Kh(this),Zh(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function bx(n){return n.value}function Kh(n){n._trackId++,n._depsLength=0}function Zh(n){if(n.deps&&n.deps.length>n._depsLength){for(let e=n._depsLength;e<n.deps.length;e++)__(n.deps[e],n);n.deps.length=n._depsLength}}function __(n,e){const t=n.get(e);t!==void 0&&e._trackId!==t&&(n.delete(e),n.size===0&&n.cleanup())}let cr=!0,Cu=0;const g_=[];function ls(){g_.push(cr),cr=!1}function cs(){const n=g_.pop();cr=n===void 0?!0:n}function Vf(){Cu++}function Gf(){for(Cu--;!Cu&&Pu.length;)Pu.shift()()}function v_(n,e,t){if(e.get(n)!==n._trackId){e.set(n,n._trackId);const i=n.deps[n._depsLength];i!==e?(i&&__(i,n),n.deps[n._depsLength++]=e):n._depsLength++}}const Pu=[];function x_(n,e,t){Vf();for(const i of n.keys())if(n.get(i)===i._trackId){if(i._dirtyLevel<e&&!(i._runnings&&!i.allowRecurse)){const r=i._dirtyLevel;i._dirtyLevel=e,r===0&&(i._shouldSchedule=!0,i.trigger())}i.scheduler&&i._shouldSchedule&&(!i._runnings||i.allowRecurse)&&(i._shouldSchedule=!1,Pu.push(i.scheduler))}Gf()}const y_=(n,e)=>{const t=new Map;return t.cleanup=n,t.computed=e,t},vl=new WeakMap,Xr=Symbol(""),Lu=Symbol("");function vn(n,e,t){if(cr&&Wr){let i=vl.get(n);i||vl.set(n,i=new Map);let r=i.get(t);r||i.set(t,r=y_(()=>i.delete(t))),v_(Wr,r)}}function Pi(n,e,t,i,r,s){const o=vl.get(n);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(t==="length"&&Le(n)){const l=Number(i);o.forEach((c,u)=>{(u==="length"||!ao(u)&&u>=l)&&a.push(c)})}else switch(t!==void 0&&a.push(o.get(t)),e){case"add":Le(n)?kf(t)&&a.push(o.get("length")):(a.push(o.get(Xr)),Fs(n)&&a.push(o.get(Lu)));break;case"delete":Le(n)||(a.push(o.get(Xr)),Fs(n)&&a.push(o.get(Lu)));break;case"set":Fs(n)&&a.push(o.get(Xr));break}Vf();for(const l of a)l&&x_(l,2);Gf()}function Tx(n,e){var t;return(t=vl.get(n))==null?void 0:t.get(e)}const wx=Of("__proto__,__v_isRef,__isVue"),S_=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ao)),Jh=Ax();function Ax(){const n={};return["includes","indexOf","lastIndexOf"].forEach(e=>{n[e]=function(...t){const i=Ze(this);for(let s=0,o=this.length;s<o;s++)vn(i,"get",s+"");const r=i[e](...t);return r===-1||r===!1?i[e](...t.map(Ze)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{n[e]=function(...t){ls(),Vf();const i=Ze(this)[e].apply(this,t);return Gf(),cs(),i}}),n}function Rx(n){const e=Ze(this);return vn(e,"has",n),e.hasOwnProperty(n)}class M_{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t}get(e,t,i){const r=this._isReadonly,s=this._shallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?Hx:w_:s?T_:b_).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Le(e);if(!r){if(o&&Ye(Jh,t))return Reflect.get(Jh,t,i);if(t==="hasOwnProperty")return Rx}const a=Reflect.get(e,t,i);return(ao(t)?S_.has(t):wx(t))||(r||vn(e,"get",t),s)?a:Vt(a)?o&&kf(t)?a:a.value:ct(a)?r?A_(a):Li(a):a}}class E_ extends M_{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._shallow){const l=rs(s);if(!xl(i)&&!rs(i)&&(s=Ze(s),i=Ze(i)),!Le(e)&&Vt(s)&&!Vt(i))return l?!1:(s.value=i,!0)}const o=Le(e)&&kf(t)?Number(t)<e.length:Ye(e,t),a=Reflect.set(e,t,i,r);return e===Ze(r)&&(o?_r(i,s)&&Pi(e,"set",t,i):Pi(e,"add",t,i)),a}deleteProperty(e,t){const i=Ye(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&Pi(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!ao(t)||!S_.has(t))&&vn(e,"has",t),i}ownKeys(e){return vn(e,"iterate",Le(e)?"length":Xr),Reflect.ownKeys(e)}}class Cx extends M_{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Px=new E_,Lx=new Cx,Dx=new E_(!0),Wf=n=>n,Yl=n=>Reflect.getPrototypeOf(n);function Ea(n,e,t=!1,i=!1){n=n.__v_raw;const r=Ze(n),s=Ze(e);t||(_r(e,s)&&vn(r,"get",e),vn(r,"get",s));const{has:o}=Yl(r),a=i?Wf:t?qf:Go;if(o.call(r,e))return a(n.get(e));if(o.call(r,s))return a(n.get(s));n!==r&&n.get(e)}function ba(n,e=!1){const t=this.__v_raw,i=Ze(t),r=Ze(n);return e||(_r(n,r)&&vn(i,"has",n),vn(i,"has",r)),n===r?t.has(n):t.has(n)||t.has(r)}function Ta(n,e=!1){return n=n.__v_raw,!e&&vn(Ze(n),"iterate",Xr),Reflect.get(n,"size",n)}function Qh(n){n=Ze(n);const e=Ze(this);return Yl(e).has.call(e,n)||(e.add(n),Pi(e,"add",n,n)),this}function ed(n,e){e=Ze(e);const t=Ze(this),{has:i,get:r}=Yl(t);let s=i.call(t,n);s||(n=Ze(n),s=i.call(t,n));const o=r.call(t,n);return t.set(n,e),s?_r(e,o)&&Pi(t,"set",n,e):Pi(t,"add",n,e),this}function td(n){const e=Ze(this),{has:t,get:i}=Yl(e);let r=t.call(e,n);r||(n=Ze(n),r=t.call(e,n)),i&&i.call(e,n);const s=e.delete(n);return r&&Pi(e,"delete",n,void 0),s}function nd(){const n=Ze(this),e=n.size!==0,t=n.clear();return e&&Pi(n,"clear",void 0,void 0),t}function wa(n,e){return function(i,r){const s=this,o=s.__v_raw,a=Ze(o),l=e?Wf:n?qf:Go;return!n&&vn(a,"iterate",Xr),o.forEach((c,u)=>i.call(r,l(c),l(u),s))}}function Aa(n,e,t){return function(...i){const r=this.__v_raw,s=Ze(r),o=Fs(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=r[n](...i),u=t?Wf:e?qf:Go;return!e&&vn(s,"iterate",l?Lu:Xr),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function zi(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Ix(){const n={get(s){return Ea(this,s)},get size(){return Ta(this)},has:ba,add:Qh,set:ed,delete:td,clear:nd,forEach:wa(!1,!1)},e={get(s){return Ea(this,s,!1,!0)},get size(){return Ta(this)},has:ba,add:Qh,set:ed,delete:td,clear:nd,forEach:wa(!1,!0)},t={get(s){return Ea(this,s,!0)},get size(){return Ta(this,!0)},has(s){return ba.call(this,s,!0)},add:zi("add"),set:zi("set"),delete:zi("delete"),clear:zi("clear"),forEach:wa(!0,!1)},i={get(s){return Ea(this,s,!0,!0)},get size(){return Ta(this,!0)},has(s){return ba.call(this,s,!0)},add:zi("add"),set:zi("set"),delete:zi("delete"),clear:zi("clear"),forEach:wa(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Aa(s,!1,!1),t[s]=Aa(s,!0,!1),e[s]=Aa(s,!1,!0),i[s]=Aa(s,!0,!0)}),[n,t,e,i]}const[Ux,Nx,Ox,Fx]=Ix();function Xf(n,e){const t=e?n?Fx:Ox:n?Nx:Ux;return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(Ye(t,r)&&r in i?t:i,r,s)}const Bx={get:Xf(!1,!1)},kx={get:Xf(!1,!0)},zx={get:Xf(!0,!1)},b_=new WeakMap,T_=new WeakMap,w_=new WeakMap,Hx=new WeakMap;function Vx(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Gx(n){return n.__v_skip||!Object.isExtensible(n)?0:Vx(fx(n))}function Li(n){return rs(n)?n:jf(n,!1,Px,Bx,b_)}function ua(n){return jf(n,!1,Dx,kx,T_)}function A_(n){return jf(n,!0,Lx,zx,w_)}function jf(n,e,t,i,r){if(!ct(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=r.get(n);if(s)return s;const o=Gx(n);if(o===0)return n;const a=new Proxy(n,o===2?i:t);return r.set(n,a),a}function Bs(n){return rs(n)?Bs(n.__v_raw):!!(n&&n.__v_isReactive)}function rs(n){return!!(n&&n.__v_isReadonly)}function xl(n){return!!(n&&n.__v_isShallow)}function R_(n){return Bs(n)||rs(n)}function Ze(n){const e=n&&n.__v_raw;return e?Ze(e):n}function C_(n){return gl(n,"__v_skip",!0),n}const Go=n=>ct(n)?Li(n):n,qf=n=>ct(n)?A_(n):n;class P_{constructor(e,t,i,r){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Hf(()=>e(this._value),()=>Du(this,1)),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=i}get value(){const e=Ze(this);return(!e._cacheable||e.effect.dirty)&&_r(e._value,e._value=e.effect.run())&&Du(e,2),L_(e),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Wx(n,e,t=!1){let i,r;const s=Fe(n);return s?(i=n,r=zn):(i=n.get,r=n.set),new P_(i,r,s||!r,t)}function L_(n){cr&&Wr&&(n=Ze(n),v_(Wr,n.dep||(n.dep=y_(()=>n.dep=void 0,n instanceof P_?n:void 0))))}function Du(n,e=2,t){n=Ze(n);const i=n.dep;i&&x_(i,e)}function Vt(n){return!!(n&&n.__v_isRef===!0)}function At(n){return D_(n,!1)}function Wo(n){return D_(n,!0)}function D_(n,e){return Vt(n)?n:new Xx(n,e)}class Xx{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:Ze(e),this._value=t?e:Go(e)}get value(){return L_(this),this._value}set value(e){const t=this.__v_isShallow||xl(e)||rs(e);e=t?e:Ze(e),_r(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Go(e),Du(this,2))}}function ht(n){return Vt(n)?n.value:n}const jx={get:(n,e,t)=>ht(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return Vt(r)&&!Vt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function I_(n){return Bs(n)?n:new Proxy(n,jx)}class qx{constructor(e,t,i){this._object=e,this._key=t,this._defaultValue=i,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Tx(Ze(this._object),this._key)}}class $x{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function U_(n,e,t){return Vt(n)?n:Fe(n)?new $x(n):ct(n)&&arguments.length>1?Yx(n,e,t):At(n)}function Yx(n,e,t){const i=n[e];return Vt(i)?i:new qx(n,e,t)}/**
* @vue/runtime-core v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ur(n,e,t,i){let r;try{r=i?n(...i):n()}catch(s){fa(s,e,t)}return r}function Wn(n,e,t,i){if(Fe(n)){const s=ur(n,e,t,i);return s&&l_(s)&&s.catch(o=>{fa(o,e,t)}),s}const r=[];for(let s=0;s<n.length;s++)r.push(Wn(n[s],e,t,i));return r}function fa(n,e,t,i=!0){const r=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=`https://vuejs.org/errors/#runtime-${t}`;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,o,a)===!1)return}s=s.parent}const l=e.appContext.config.errorHandler;if(l){ur(l,null,10,[n,o,a]);return}}Kx(n,t,r,i)}function Kx(n,e,t,i=!0){console.error(n)}let Xo=!1,Iu=!1;const qt=[];let ci=0;const ks=[];let Zi=null,zr=0;const N_=Promise.resolve();let $f=null;function Sr(n){const e=$f||N_;return n?e.then(this?n.bind(this):n):e}function Zx(n){let e=ci+1,t=qt.length;for(;e<t;){const i=e+t>>>1,r=qt[i],s=jo(r);s<n||s===n&&r.pre?e=i+1:t=i}return e}function Yf(n){(!qt.length||!qt.includes(n,Xo&&n.allowRecurse?ci+1:ci))&&(n.id==null?qt.push(n):qt.splice(Zx(n.id),0,n),O_())}function O_(){!Xo&&!Iu&&(Iu=!0,$f=N_.then(F_))}function Jx(n){const e=qt.indexOf(n);e>ci&&qt.splice(e,1)}function Uu(n){Le(n)?ks.push(...n):(!Zi||!Zi.includes(n,n.allowRecurse?zr+1:zr))&&ks.push(n),O_()}function id(n,e,t=Xo?ci+1:0){for(;t<qt.length;t++){const i=qt[t];if(i&&i.pre){if(n&&i.id!==n.uid)continue;qt.splice(t,1),t--,i()}}}function yl(n){if(ks.length){const e=[...new Set(ks)].sort((t,i)=>jo(t)-jo(i));if(ks.length=0,Zi){Zi.push(...e);return}for(Zi=e,zr=0;zr<Zi.length;zr++)Zi[zr]();Zi=null,zr=0}}const jo=n=>n.id==null?1/0:n.id,Qx=(n,e)=>{const t=jo(n)-jo(e);if(t===0){if(n.pre&&!e.pre)return-1;if(e.pre&&!n.pre)return 1}return t};function F_(n){Iu=!1,Xo=!0,qt.sort(Qx);try{for(ci=0;ci<qt.length;ci++){const e=qt[ci];e&&e.active!==!1&&ur(e,null,14)}}finally{ci=0,qt.length=0,yl(),Xo=!1,$f=null,(qt.length||ks.length)&&F_()}}function ey(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||dt;let r=t;const s=e.startsWith("update:"),o=s&&e.slice(7);if(o&&o in i){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:h}=i[u]||dt;h&&(r=t.map(d=>vt(d)?d.trim():d)),f&&(r=t.map(px))}let a,l=i[a=bc(e)]||i[a=bc(_i(e))];!l&&s&&(l=i[a=bc(lo(e))]),l&&Wn(l,n,6,r);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Wn(c,n,6,r)}}function B_(n,e,t=!1){const i=e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!Fe(n)){const l=c=>{const u=B_(c,e,!0);u&&(a=!0,Rt(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(ct(n)&&i.set(n,null),null):(Le(s)?s.forEach(l=>o[l]=null):Rt(o,s),ct(n)&&i.set(n,o),o)}function Kl(n,e){return!n||!la(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ye(n,e[0].toLowerCase()+e.slice(1))||Ye(n,lo(e))||Ye(n,e))}let kt=null,Zl=null;function Sl(n){const e=kt;return kt=n,Zl=n&&n.type.__scopeId||null,e}function k_(n){Zl=n}function z_(){Zl=null}function ha(n,e=kt,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&vd(-1);const s=Sl(e);let o;try{o=n(...r)}finally{Sl(s),i._d&&vd(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function wc(n){const{type:e,vnode:t,proxy:i,withProxy:r,props:s,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=n;let m,p;const x=Sl(n);try{if(t.shapeFlag&4){const S=r||i,b=S;m=On(u.call(b,S,f,s,d,h,g)),p=l}else{const S=e;m=On(S.length>1?S(s,{attrs:l,slots:a,emit:c}):S(s,null)),p=e.props?l:ny(l)}}catch(S){Io.length=0,fa(S,n,1),m=qe(on)}let v=m;if(p&&_!==!1){const S=Object.keys(p),{shapeFlag:b}=v;S.length&&b&7&&(o&&S.some(Ff)&&(p=iy(p,o)),v=Di(v,p))}return t.dirs&&(v=Di(v),v.dirs=v.dirs?v.dirs.concat(t.dirs):t.dirs),t.transition&&(v.transition=t.transition),m=v,Sl(x),m}function ty(n,e=!0){let t;for(let i=0;i<n.length;i++){const r=n[i];if(Ys(r)){if(r.type!==on||r.children==="v-if"){if(t)return;t=r}}else return}return t}const ny=n=>{let e;for(const t in n)(t==="class"||t==="style"||la(t))&&((e||(e={}))[t]=n[t]);return e},iy=(n,e)=>{const t={};for(const i in n)(!Ff(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function ry(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?rd(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==i[h]&&!Kl(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?rd(i,o,c):!0:!!o;return!1}function rd(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!Kl(t,s))return!0}return!1}function Kf({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Zf="components";function sy(n,e){return V_(Zf,n,!0,e)||n}const H_=Symbol.for("v-ndc");function oy(n){return vt(n)?V_(Zf,n,!1)||n:n||H_}function V_(n,e,t=!0,i=!1){const r=kt||Nt;if(r){const s=r.type;if(n===Zf){const a=Wu(s,!1);if(a&&(a===e||a===_i(e)||a===$l(_i(e))))return s}const o=sd(r[n]||s[n],e)||sd(r.appContext[n],e);return!o&&i?s:o}}function sd(n,e){return n&&(n[e]||n[_i(e)]||n[$l(_i(e))])}const G_=n=>n.__isSuspense;let Nu=0;const ay={name:"Suspense",__isSuspense:!0,process(n,e,t,i,r,s,o,a,l,c){if(n==null)ly(e,t,i,r,s,o,a,l,c);else{if(s&&s.deps>0){e.suspense=n.suspense;return}cy(n,e,t,i,r,o,a,l,c)}},hydrate:uy,create:Jf,normalize:fy},W_=ay;function qo(n,e){const t=n.props&&n.props[e];Fe(t)&&t()}function ly(n,e,t,i,r,s,o,a,l){const{p:c,o:{createElement:u}}=l,f=u("div"),h=n.suspense=Jf(n,r,i,e,f,t,s,o,a,l);c(null,h.pendingBranch=n.ssContent,f,null,i,h,s,o),h.deps>0?(qo(n,"onPending"),qo(n,"onFallback"),c(null,n.ssFallback,e,t,i,null,s,o),zs(h,n.ssFallback)):h.resolve(!1,!0)}function cy(n,e,t,i,r,s,o,a,{p:l,um:c,o:{createElement:u}}){const f=e.suspense=n.suspense;f.vnode=e,e.el=n.el;const h=e.ssContent,d=e.ssFallback,{activeBranch:g,pendingBranch:_,isInFallback:m,isHydrating:p}=f;if(_)f.pendingBranch=h,ei(h,_)?(l(_,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0?f.resolve():m&&(p||(l(g,d,t,i,r,null,s,o,a),zs(f,d)))):(f.pendingId=Nu++,p?(f.isHydrating=!1,f.activeBranch=_):c(_,r,f),f.deps=0,f.effects.length=0,f.hiddenContainer=u("div"),m?(l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0?f.resolve():(l(g,d,t,i,r,null,s,o,a),zs(f,d))):g&&ei(h,g)?(l(g,h,t,i,r,f,s,o,a),f.resolve(!0)):(l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0&&f.resolve()));else if(g&&ei(h,g))l(g,h,t,i,r,f,s,o,a),zs(f,h);else if(qo(e,"onPending"),f.pendingBranch=h,h.shapeFlag&512?f.pendingId=h.component.suspenseId:f.pendingId=Nu++,l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0)f.resolve();else{const{timeout:x,pendingId:v}=f;x>0?setTimeout(()=>{f.pendingId===v&&f.fallback(d)},x):x===0&&f.fallback(d)}}function Jf(n,e,t,i,r,s,o,a,l,c,u=!1){const{p:f,m:h,um:d,n:g,o:{parentNode:_,remove:m}}=c;let p;const x=hy(n);x&&e!=null&&e.pendingBranch&&(p=e.pendingId,e.deps++);const v=n.props?f_(n.props.timeout):void 0,S=s,b={vnode:n,parent:e,parentComponent:t,namespace:o,container:i,hiddenContainer:r,deps:0,pendingId:Nu++,timeout:typeof v=="number"?v:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(E=!1,T=!1){const{vnode:L,activeBranch:y,pendingBranch:w,pendingId:N,effects:U,parentComponent:$,container:D}=b;let B=!1;b.isHydrating?b.isHydrating=!1:E||(B=y&&w.transition&&w.transition.mode==="out-in",B&&(y.transition.afterLeave=()=>{N===b.pendingId&&(h(w,D,s===S?g(y):s,0),Uu(U))}),y&&(_(y.el)!==b.hiddenContainer&&(s=g(y)),d(y,$,b,!0)),B||h(w,D,s,0)),zs(b,w),b.pendingBranch=null,b.isInFallback=!1;let O=b.parent,G=!1;for(;O;){if(O.pendingBranch){O.effects.push(...U),G=!0;break}O=O.parent}!G&&!B&&Uu(U),b.effects=[],x&&e&&e.pendingBranch&&p===e.pendingId&&(e.deps--,e.deps===0&&!T&&e.resolve()),qo(L,"onResolve")},fallback(E){if(!b.pendingBranch)return;const{vnode:T,activeBranch:L,parentComponent:y,container:w,namespace:N}=b;qo(T,"onFallback");const U=g(L),$=()=>{b.isInFallback&&(f(null,E,w,U,y,null,N,a,l),zs(b,E))},D=E.transition&&E.transition.mode==="out-in";D&&(L.transition.afterLeave=$),b.isInFallback=!0,d(L,y,null,!0),D||$()},move(E,T,L){b.activeBranch&&h(b.activeBranch,E,T,L),b.container=E},next(){return b.activeBranch&&g(b.activeBranch)},registerDep(E,T){const L=!!b.pendingBranch;L&&b.deps++;const y=E.vnode.el;E.asyncDep.catch(w=>{fa(w,E,0)}).then(w=>{if(E.isUnmounted||b.isUnmounted||b.pendingId!==E.suspenseId)return;E.asyncResolved=!0;const{vnode:N}=E;Gu(E,w,!1),y&&(N.el=y);const U=!y&&E.subTree.el;T(E,N,_(y||E.subTree.el),y?null:g(E.subTree),b,o,l),U&&m(U),Kf(E,N.el),L&&--b.deps===0&&b.resolve()})},unmount(E,T){b.isUnmounted=!0,b.activeBranch&&d(b.activeBranch,t,E,T),b.pendingBranch&&d(b.pendingBranch,t,E,T)}};return b}function uy(n,e,t,i,r,s,o,a,l){const c=e.suspense=Jf(e,i,t,n.parentNode,document.createElement("div"),null,r,s,o,a,!0),u=l(n,c.pendingBranch=e.ssContent,t,c,s,o);return c.deps===0&&c.resolve(!1,!0),u}function fy(n){const{shapeFlag:e,children:t}=n,i=e&32;n.ssContent=od(i?t.default:t),n.ssFallback=i?od(t.fallback):qe(on)}function od(n){let e;if(Fe(n)){const t=$s&&n._c;t&&(n._d=!1,Je()),n=n(),t&&(n._d=!0,e=Hn,hg())}return Le(n)&&(n=ty(n)),n=On(n),e&&!n.dynamicChildren&&(n.dynamicChildren=e.filter(t=>t!==n)),n}function X_(n,e){e&&e.pendingBranch?Le(n)?e.effects.push(...n):e.effects.push(n):Uu(n)}function zs(n,e){n.activeBranch=e;const{vnode:t,parentComponent:i}=n;let r=e.el;for(;!r&&e.component;)e=e.component.subTree,r=e.el;t.el=r,i&&i.subTree===t&&(i.vnode.el=r,Kf(i,r))}function hy(n){var e;return((e=n.props)==null?void 0:e.suspensible)!=null&&n.props.suspensible!==!1}const dy=Symbol.for("v-scx"),py=()=>sn(dy);function my(n,e){return Qf(n,null,e)}const Ra={};function jr(n,e,t){return Qf(n,e,t)}function Qf(n,e,{immediate:t,deep:i,flush:r,once:s,onTrack:o,onTrigger:a}=dt){if(e&&s){const E=e;e=(...T)=>{E(...T),b()}}const l=Nt,c=E=>i===!0?E:Ps(E,i===!1?1:void 0);let u,f=!1,h=!1;if(Vt(n)?(u=()=>n.value,f=xl(n)):Bs(n)?(u=()=>c(n),f=!0):Le(n)?(h=!0,f=n.some(E=>Bs(E)||xl(E)),u=()=>n.map(E=>{if(Vt(E))return E.value;if(Bs(E))return c(E);if(Fe(E))return ur(E,l,2)})):Fe(n)?e?u=()=>ur(n,l,2):u=()=>(d&&d(),Wn(n,l,3,[g])):u=zn,e&&i){const E=u;u=()=>Ps(E())}let d,g=E=>{d=v.onStop=()=>{ur(E,l,4),d=v.onStop=void 0}},_;if(nc)if(g=zn,e?t&&Wn(e,l,3,[u(),h?[]:void 0,g]):u(),r==="sync"){const E=py();_=E.__watcherHandles||(E.__watcherHandles=[])}else return zn;let m=h?new Array(n.length).fill(Ra):Ra;const p=()=>{if(!(!v.active||!v.dirty))if(e){const E=v.run();(i||f||(h?E.some((T,L)=>_r(T,m[L])):_r(E,m)))&&(d&&d(),Wn(e,l,3,[E,m===Ra?void 0:h&&m[0]===Ra?[]:m,g]),m=E)}else v.run()};p.allowRecurse=!!e;let x;r==="sync"?x=p:r==="post"?x=()=>Ft(p,l&&l.suspense):(p.pre=!0,l&&(p.id=l.uid),x=()=>Yf(p));const v=new Hf(u,zn,x),S=Ex(),b=()=>{v.stop(),S&&Bf(S.effects,v)};return e?t?p():m=v.run():r==="post"?Ft(v.run.bind(v),l&&l.suspense):v.run(),_&&_.push(b),b}function _y(n,e,t){const i=this.proxy,r=vt(n)?n.includes(".")?j_(i,n):()=>i[n]:n.bind(i,i);let s;Fe(e)?s=e:(s=e.handler,t=e);const o=pa(this),a=Qf(r,s.bind(i),t);return o(),a}function j_(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}function Ps(n,e,t=0,i){if(!ct(n)||n.__v_skip)return n;if(e&&e>0){if(t>=e)return n;t++}if(i=i||new Set,i.has(n))return n;if(i.add(n),Vt(n))Ps(n.value,e,t,i);else if(Le(n))for(let r=0;r<n.length;r++)Ps(n[r],e,t,i);else if(a_(n)||Fs(n))n.forEach(r=>{Ps(r,e,t,i)});else if(u_(n))for(const r in n)Ps(n[r],e,t,i);return n}function ai(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(ls(),Wn(l,t,8,[n.el,a,n,e]),cs())}}const Ji=Symbol("_leaveCb"),Ca=Symbol("_enterCb");function gy(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ki(()=>{n.isMounted=!0}),da(()=>{n.isUnmounting=!0}),n}const Dn=[Function,Array],q_={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Dn,onEnter:Dn,onAfterEnter:Dn,onEnterCancelled:Dn,onBeforeLeave:Dn,onLeave:Dn,onAfterLeave:Dn,onLeaveCancelled:Dn,onBeforeAppear:Dn,onAppear:Dn,onAfterAppear:Dn,onAppearCancelled:Dn},vy={name:"BaseTransition",props:q_,setup(n,{slots:e}){const t=tc(),i=gy();let r;return()=>{const s=e.default&&Y_(e.default(),!0);if(!s||!s.length)return;let o=s[0];if(s.length>1){for(const _ of s)if(_.type!==on){o=_;break}}const a=Ze(n),{mode:l}=a;if(i.isLeaving)return Ac(o);const c=ad(o);if(!c)return Ac(o);const u=Ou(c,a,i,t);Ml(c,u);const f=t.subTree,h=f&&ad(f);let d=!1;const{getTransitionKey:g}=c.type;if(g){const _=g();r===void 0?r=_:_!==r&&(r=_,d=!0)}if(h&&h.type!==on&&(!ei(c,h)||d)){const _=Ou(h,a,i,t);if(Ml(h,_),l==="out-in")return i.isLeaving=!0,_.afterLeave=()=>{i.isLeaving=!1,t.update.active!==!1&&(t.effect.dirty=!0,t.update())},Ac(o);l==="in-out"&&c.type!==on&&(_.delayLeave=(m,p,x)=>{const v=$_(i,h);v[String(h.key)]=h,m[Ji]=()=>{p(),m[Ji]=void 0,delete u.delayedLeave},u.delayedLeave=x})}return o}}},xy=vy;function $_(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Ou(n,e,t,i){const{appear:r,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:f,onLeave:h,onAfterLeave:d,onLeaveCancelled:g,onBeforeAppear:_,onAppear:m,onAfterAppear:p,onAppearCancelled:x}=e,v=String(n.key),S=$_(t,n),b=(L,y)=>{L&&Wn(L,i,9,y)},E=(L,y)=>{const w=y[1];b(L,y),Le(L)?L.every(N=>N.length<=1)&&w():L.length<=1&&w()},T={mode:s,persisted:o,beforeEnter(L){let y=a;if(!t.isMounted)if(r)y=_||a;else return;L[Ji]&&L[Ji](!0);const w=S[v];w&&ei(n,w)&&w.el[Ji]&&w.el[Ji](),b(y,[L])},enter(L){let y=l,w=c,N=u;if(!t.isMounted)if(r)y=m||l,w=p||c,N=x||u;else return;let U=!1;const $=L[Ca]=D=>{U||(U=!0,D?b(N,[L]):b(w,[L]),T.delayedLeave&&T.delayedLeave(),L[Ca]=void 0)};y?E(y,[L,$]):$()},leave(L,y){const w=String(n.key);if(L[Ca]&&L[Ca](!0),t.isUnmounting)return y();b(f,[L]);let N=!1;const U=L[Ji]=$=>{N||(N=!0,y(),$?b(g,[L]):b(d,[L]),L[Ji]=void 0,S[w]===n&&delete S[w])};S[w]=n,h?E(h,[L,U]):U()},clone(L){return Ou(L,e,t,i)}};return T}function Ac(n){if(Jl(n))return n=Di(n),n.children=null,n}function ad(n){return Jl(n)?n.children?n.children[0]:void 0:n}function Ml(n,e){n.shapeFlag&6&&n.component?Ml(n.component.subTree,e):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Y_(n,e=!1,t){let i=[],r=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===jt?(o.patchFlag&128&&r++,i=i.concat(Y_(o.children,e,a))):(e||o.type!==on)&&i.push(a!=null?Di(o,{key:a}):o)}if(r>1)for(let s=0;s<i.length;s++)i[s].patchFlag=-2;return i}/*! #__NO_SIDE_EFFECTS__ */function co(n,e){return Fe(n)?Rt({name:n.name},e,{setup:n}):n}const qr=n=>!!n.type.__asyncLoader,Jl=n=>n.type.__isKeepAlive,yy={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(n,{slots:e}){const t=tc(),i=t.ctx;if(!i.renderer)return()=>{const x=e.default&&e.default();return x&&x.length===1?x[0]:x};const r=new Map,s=new Set;let o=null;const a=t.suspense,{renderer:{p:l,m:c,um:u,o:{createElement:f}}}=i,h=f("div");i.activate=(x,v,S,b,E)=>{const T=x.component;c(x,v,S,0,a),l(T.vnode,x,v,S,T,a,b,x.slotScopeIds,E),Ft(()=>{T.isDeactivated=!1,T.a&&Co(T.a);const L=x.props&&x.props.onVnodeMounted;L&&cn(L,T.parent,x)},a)},i.deactivate=x=>{const v=x.component;c(x,h,null,1,a),Ft(()=>{v.da&&Co(v.da);const S=x.props&&x.props.onVnodeUnmounted;S&&cn(S,v.parent,x),v.isDeactivated=!0},a)};function d(x){Rc(x),u(x,t,a,!0)}function g(x){r.forEach((v,S)=>{const b=Wu(v.type);b&&(!x||!x(b))&&_(S)})}function _(x){const v=r.get(x);!o||!ei(v,o)?d(v):o&&Rc(o),r.delete(x),s.delete(x)}jr(()=>[n.include,n.exclude],([x,v])=>{x&&g(S=>bo(x,S)),v&&g(S=>!bo(v,S))},{flush:"post",deep:!0});let m=null;const p=()=>{m!=null&&r.set(m,Cc(t.subTree))};return ki(p),Z_(p),da(()=>{r.forEach(x=>{const{subTree:v,suspense:S}=t,b=Cc(v);if(x.type===b.type&&x.key===b.key){Rc(b);const E=b.component.da;E&&Ft(E,S);return}d(x)})}),()=>{if(m=null,!e.default)return null;const x=e.default(),v=x[0];if(x.length>1)return o=null,x;if(!Ys(v)||!(v.shapeFlag&4)&&!(v.shapeFlag&128))return o=null,v;let S=Cc(v);const b=S.type,E=Wu(qr(S)?S.type.__asyncResolved||{}:b),{include:T,exclude:L,max:y}=n;if(T&&(!E||!bo(T,E))||L&&E&&bo(L,E))return o=S,v;const w=S.key==null?b:S.key,N=r.get(w);return S.el&&(S=Di(S),v.shapeFlag&128&&(v.ssContent=S)),m=w,N?(S.el=N.el,S.component=N.component,S.transition&&Ml(S,S.transition),S.shapeFlag|=512,s.delete(w),s.add(w)):(s.add(w),y&&s.size>parseInt(y,10)&&_(s.values().next().value)),S.shapeFlag|=256,o=S,G_(v.type)?v:S}}},Sy=yy;function bo(n,e){return Le(n)?n.some(t=>bo(t,e)):vt(n)?n.split(",").includes(e):ux(n)?n.test(e):!1}function eh(n,e){K_(n,"a",e)}function th(n,e){K_(n,"da",e)}function K_(n,e,t=Nt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Ql(e,i,t),t){let r=t.parent;for(;r&&r.parent;)Jl(r.parent.vnode)&&My(i,e,t,r),r=r.parent}}function My(n,e,t,i){const r=Ql(e,n,i,!0);nh(()=>{Bf(i[e],r)},t)}function Rc(n){n.shapeFlag&=-257,n.shapeFlag&=-513}function Cc(n){return n.shapeFlag&128?n.ssContent:n}function Ql(n,e,t=Nt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{if(t.isUnmounted)return;ls();const a=pa(t),l=Wn(e,t,n,o);return a(),cs(),l});return i?r.unshift(s):r.push(s),s}}const Bi=n=>(e,t=Nt)=>(!nc||n==="sp")&&Ql(n,(...i)=>e(...i),t),Ey=Bi("bm"),ki=Bi("m"),by=Bi("bu"),Z_=Bi("u"),da=Bi("bum"),nh=Bi("um"),Ty=Bi("sp"),wy=Bi("rtg"),Ay=Bi("rtc");function J_(n,e=Nt){Ql("ec",n,e)}function Ry(n,e,t,i){let r;const s=t&&t[i];if(Le(n)||vt(n)){r=new Array(n.length);for(let o=0,a=n.length;o<a;o++)r[o]=e(n[o],o,void 0,s&&s[o])}else if(typeof n=="number"){r=new Array(n);for(let o=0;o<n;o++)r[o]=e(o+1,o,void 0,s&&s[o])}else if(ct(n))if(n[Symbol.iterator])r=Array.from(n,(o,a)=>e(o,a,void 0,s&&s[a]));else{const o=Object.keys(n);r=new Array(o.length);for(let a=0,l=o.length;a<l;a++){const c=o[a];r[a]=e(n[c],c,a,s&&s[a])}}else r=[];return t&&(t[i]=r),r}function II(n,e,t={},i,r){if(kt.isCE||kt.parent&&qr(kt.parent)&&kt.parent.isCE)return e!=="default"&&(t.name=e),qe("slot",t,i&&i());let s=n[e];s&&s._c&&(s._d=!1),Je();const o=s&&Q_(s(t)),a=nr(jt,{key:t.key||o&&o.key||`_${e}`},o||(i?i():[]),o&&n._===1?64:-2);return!r&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),s&&s._c&&(s._d=!0),a}function Q_(n){return n.some(e=>Ys(e)?!(e.type===on||e.type===jt&&!Q_(e.children)):!0)?n:null}const Fu=n=>n?_g(n)?ah(n)||n.proxy:Fu(n.parent):null,Po=Rt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Fu(n.parent),$root:n=>Fu(n.root),$emit:n=>n.emit,$options:n=>ih(n),$forceUpdate:n=>n.f||(n.f=()=>{n.effect.dirty=!0,Yf(n.update)}),$nextTick:n=>n.n||(n.n=Sr.bind(n.proxy)),$watch:n=>_y.bind(n)}),Pc=(n,e)=>n!==dt&&!n.__isScriptSetup&&Ye(n,e),Cy={get({_:n},e){const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Pc(i,e))return o[e]=1,i[e];if(r!==dt&&Ye(r,e))return o[e]=2,r[e];if((c=n.propsOptions[0])&&Ye(c,e))return o[e]=3,s[e];if(t!==dt&&Ye(t,e))return o[e]=4,t[e];Bu&&(o[e]=0)}}const u=Po[e];let f,h;if(u)return e==="$attrs"&&vn(n,"get",e),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==dt&&Ye(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,Ye(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return Pc(r,e)?(r[e]=t,!0):i!==dt&&Ye(i,e)?(i[e]=t,!0):Ye(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s}},o){let a;return!!t[o]||n!==dt&&Ye(n,o)||Pc(e,o)||(a=s[0])&&Ye(a,o)||Ye(i,o)||Ye(Po,o)||Ye(r.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ye(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function ld(n){return Le(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Bu=!0;function Py(n){const e=ih(n),t=n.proxy,i=n.ctx;Bu=!1,e.beforeCreate&&cd(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:x,destroyed:v,unmounted:S,render:b,renderTracked:E,renderTriggered:T,errorCaptured:L,serverPrefetch:y,expose:w,inheritAttrs:N,components:U,directives:$,filters:D}=e;if(c&&Ly(c,i,null),o)for(const G in o){const H=o[G];Fe(H)&&(i[G]=H.bind(t))}if(r){const G=r.call(t,t);ct(G)&&(n.data=Li(G))}if(Bu=!0,s)for(const G in s){const H=s[G],ne=Fe(H)?H.bind(t,t):Fe(H.get)?H.get.bind(t,t):zn,ue=!Fe(H)&&Fe(H.set)?H.set.bind(t):zn,le=St({get:ne,set:ue});Object.defineProperty(i,G,{enumerable:!0,configurable:!0,get:()=>le.value,set:pe=>le.value=pe})}if(a)for(const G in a)eg(a[G],i,t,G);if(l){const G=Fe(l)?l.call(t):l;Reflect.ownKeys(G).forEach(H=>{Hs(H,G[H])})}u&&cd(u,n,"c");function O(G,H){Le(H)?H.forEach(ne=>G(ne.bind(t))):H&&G(H.bind(t))}if(O(Ey,f),O(ki,h),O(by,d),O(Z_,g),O(eh,_),O(th,m),O(J_,L),O(Ay,E),O(wy,T),O(da,x),O(nh,S),O(Ty,y),Le(w))if(w.length){const G=n.exposed||(n.exposed={});w.forEach(H=>{Object.defineProperty(G,H,{get:()=>t[H],set:ne=>t[H]=ne})})}else n.exposed||(n.exposed={});b&&n.render===zn&&(n.render=b),N!=null&&(n.inheritAttrs=N),U&&(n.components=U),$&&(n.directives=$)}function Ly(n,e,t=zn){Le(n)&&(n=ku(n));for(const i in n){const r=n[i];let s;ct(r)?"default"in r?s=sn(r.from||i,r.default,!0):s=sn(r.from||i):s=sn(r),Vt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function cd(n,e,t){Wn(Le(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function eg(n,e,t,i){const r=i.includes(".")?j_(t,i):()=>t[i];if(vt(n)){const s=e[n];Fe(s)&&jr(r,s)}else if(Fe(n))jr(r,n.bind(t));else if(ct(n))if(Le(n))n.forEach(s=>eg(s,e,t,i));else{const s=Fe(n.handler)?n.handler.bind(t):e[n.handler];Fe(s)&&jr(r,s,n)}}function ih(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>El(l,c,o,!0)),El(l,e,o)),ct(e)&&s.set(e,l),l}function El(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&El(n,s,t,!0),r&&r.forEach(o=>El(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=Dy[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const Dy={data:ud,props:fd,emits:fd,methods:To,computed:To,beforeCreate:Qt,created:Qt,beforeMount:Qt,mounted:Qt,beforeUpdate:Qt,updated:Qt,beforeDestroy:Qt,beforeUnmount:Qt,destroyed:Qt,unmounted:Qt,activated:Qt,deactivated:Qt,errorCaptured:Qt,serverPrefetch:Qt,components:To,directives:To,watch:Uy,provide:ud,inject:Iy};function ud(n,e){return e?n?function(){return Rt(Fe(n)?n.call(this,this):n,Fe(e)?e.call(this,this):e)}:e:n}function Iy(n,e){return To(ku(n),ku(e))}function ku(n){if(Le(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Qt(n,e){return n?[...new Set([].concat(n,e))]:e}function To(n,e){return n?Rt(Object.create(null),n,e):e}function fd(n,e){return n?Le(n)&&Le(e)?[...new Set([...n,...e])]:Rt(Object.create(null),ld(n),ld(e??{})):e}function Uy(n,e){if(!n)return e;if(!e)return n;const t=Rt(Object.create(null),n);for(const i in e)t[i]=Qt(n[i],e[i]);return t}function tg(){return{app:null,config:{isNativeTag:lx,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ny=0;function Oy(n,e){return function(i,r=null){Fe(i)||(i=Rt({},i)),r!=null&&!ct(r)&&(r=null);const s=tg(),o=new WeakSet;let a=!1;const l=s.app={_uid:Ny++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:vg,get config(){return s.config},set config(c){},use(c,...u){return o.has(c)||(c&&Fe(c.install)?(o.add(c),c.install(l,...u)):Fe(c)&&(o.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,f){if(!a){const h=qe(i,r);return h.appContext=s,f===!0?f="svg":f===!1&&(f=void 0),u&&e?e(h,c):n(h,c,f),a=!0,l._container=c,c.__vue_app__=l,ah(h.component)||h.component.proxy}},unmount(){a&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l},runWithContext(c){$o=l;try{return c()}finally{$o=null}}};return l}}let $o=null;function Hs(n,e){if(Nt){let t=Nt.provides;const i=Nt.parent&&Nt.parent.provides;i===t&&(t=Nt.provides=Object.create(i)),t[n]=e}}function sn(n,e,t=!1){const i=Nt||kt;if(i||$o){const r=i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:$o._context.provides;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Fe(e)?e.call(i&&i.proxy):e}}function ng(){return!!(Nt||kt||$o)}function Fy(n,e,t,i=!1){const r={},s={};gl(s,ec,1),n.propsDefaults=Object.create(null),ig(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:ua(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function By(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=Ze(r),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Kl(n.emitsOptions,h))continue;const d=e[h];if(l)if(Ye(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=_i(h);r[g]=zu(l,a,g,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{ig(n,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!Ye(e,f)&&((u=lo(f))===f||!Ye(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=zu(l,a,f,void 0,n,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!Ye(e,f))&&(delete s[f],c=!0)}c&&Pi(n,"set","$attrs")}function ig(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Ro(l))continue;const c=e[l];let u;r&&Ye(r,u=_i(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Kl(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=Ze(t),c=a||dt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=zu(r,l,f,c[f],n,!Ye(c,f))}}return o}function zu(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=Ye(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Fe(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=pa(r);i=c[t]=l.call(null,e),u()}}else i=l}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===lo(t))&&(i=!0))}return i}function rg(n,e,t=!1){const i=e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!Fe(n)){const u=f=>{l=!0;const[h,d]=rg(f,e,!0);Rt(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return ct(n)&&i.set(n,Os),Os;if(Le(s))for(let u=0;u<s.length;u++){const f=_i(s[u]);hd(f)&&(o[f]=dt)}else if(s)for(const u in s){const f=_i(u);if(hd(f)){const h=s[u],d=o[f]=Le(h)||Fe(h)?{type:h}:Rt({},h);if(d){const g=md(Boolean,d.type),_=md(String,d.type);d[0]=g>-1,d[1]=_<0||g<_,(g>-1||Ye(d,"default"))&&a.push(f)}}}const c=[o,a];return ct(n)&&i.set(n,c),c}function hd(n){return n[0]!=="$"}function dd(n){const e=n&&n.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:n===null?"null":""}function pd(n,e){return dd(n)===dd(e)}function md(n,e){return Le(e)?e.findIndex(t=>pd(t,n)):Fe(e)&&pd(e,n)?0:-1}const sg=n=>n[0]==="_"||n==="$stable",rh=n=>Le(n)?n.map(On):[On(n)],ky=(n,e,t)=>{if(e._n)return e;const i=ha((...r)=>rh(e(...r)),t);return i._c=!1,i},og=(n,e,t)=>{const i=n._ctx;for(const r in n){if(sg(r))continue;const s=n[r];if(Fe(s))e[r]=ky(r,s,i);else if(s!=null){const o=rh(s);e[r]=()=>o}}},ag=(n,e)=>{const t=rh(e);n.slots.default=()=>t},zy=(n,e)=>{if(n.vnode.shapeFlag&32){const t=e._;t?(n.slots=Ze(e),gl(e,"_",t)):og(e,n.slots={})}else n.slots={},e&&ag(n,e);gl(n.slots,ec,1)},Hy=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=dt;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:(Rt(r,e),!t&&a===1&&delete r._):(s=!e.$stable,og(e,r)),o=e}else e&&(ag(n,e),o={default:1});if(s)for(const a in r)!sg(a)&&o[a]==null&&delete r[a]};function bl(n,e,t,i,r=!1){if(Le(n)){n.forEach((h,d)=>bl(h,e&&(Le(e)?e[d]:e),t,i,r));return}if(qr(i)&&!r)return;const s=i.shapeFlag&4?ah(i.component)||i.component.proxy:i.el,o=r?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===dt?a.refs={}:a.refs,f=a.setupState;if(c!=null&&c!==l&&(vt(c)?(u[c]=null,Ye(f,c)&&(f[c]=null)):Vt(c)&&(c.value=null)),Fe(l))ur(l,a,12,[o,u]);else{const h=vt(l),d=Vt(l);if(h||d){const g=()=>{if(n.f){const _=h?Ye(f,l)?f[l]:u[l]:l.value;r?Le(_)&&Bf(_,s):Le(_)?_.includes(s)||_.push(s):h?(u[l]=[s],Ye(f,l)&&(f[l]=u[l])):(l.value=[s],n.k&&(u[n.k]=l.value))}else h?(u[l]=o,Ye(f,l)&&(f[l]=o)):d&&(l.value=o,n.k&&(u[n.k]=o))};o?(g.id=-1,Ft(g,t)):g()}}}let Hi=!1;const Vy=n=>n.namespaceURI.includes("svg")&&n.tagName!=="foreignObject",Gy=n=>n.namespaceURI.includes("MathML"),Pa=n=>{if(Vy(n))return"svg";if(Gy(n))return"mathml"},La=n=>n.nodeType===8;function Wy(n){const{mt:e,p:t,o:{patchProp:i,createText:r,nextSibling:s,parentNode:o,remove:a,insert:l,createComment:c}}=n,u=(v,S)=>{if(!S.hasChildNodes()){t(null,v,S),yl(),S._vnode=v;return}Hi=!1,f(S.firstChild,v,null,null,null),yl(),S._vnode=v,Hi&&console.error("Hydration completed but contains mismatches.")},f=(v,S,b,E,T,L=!1)=>{const y=La(v)&&v.data==="[",w=()=>_(v,S,b,E,T,y),{type:N,ref:U,shapeFlag:$,patchFlag:D}=S;let B=v.nodeType;S.el=v,D===-2&&(L=!1,S.dynamicChildren=null);let O=null;switch(N){case qs:B!==3?S.children===""?(l(S.el=r(""),o(v),v),O=v):O=w():(v.data!==S.children&&(Hi=!0,v.data=S.children),O=s(v));break;case on:x(v)?(O=s(v),p(S.el=v.content.firstChild,v,b)):B!==8||y?O=w():O=s(v);break;case Do:if(y&&(v=s(v),B=v.nodeType),B===1||B===3){O=v;const G=!S.children.length;for(let H=0;H<S.staticCount;H++)G&&(S.children+=O.nodeType===1?O.outerHTML:O.data),H===S.staticCount-1&&(S.anchor=O),O=s(O);return y?s(O):O}else w();break;case jt:y?O=g(v,S,b,E,T,L):O=w();break;default:if($&1)(B!==1||S.type.toLowerCase()!==v.tagName.toLowerCase())&&!x(v)?O=w():O=h(v,S,b,E,T,L);else if($&6){S.slotScopeIds=T;const G=o(v);if(y?O=m(v):La(v)&&v.data==="teleport start"?O=m(v,v.data,"teleport end"):O=s(v),e(S,G,null,b,E,Pa(G),L),qr(S)){let H;y?(H=qe(jt),H.anchor=O?O.previousSibling:G.lastChild):H=v.nodeType===3?mg(""):qe("div"),H.el=v,S.component.subTree=H}}else $&64?B!==8?O=w():O=S.type.hydrate(v,S,b,E,T,L,n,d):$&128&&(O=S.type.hydrate(v,S,b,E,Pa(o(v)),T,L,n,f))}return U!=null&&bl(U,null,E,S),O},h=(v,S,b,E,T,L)=>{L=L||!!S.dynamicChildren;const{type:y,props:w,patchFlag:N,shapeFlag:U,dirs:$,transition:D}=S,B=y==="input"||y==="option";if(B||N!==-1){$&&ai(S,null,b,"created");let O=!1;if(x(v)){O=cg(E,D)&&b&&b.vnode.props&&b.vnode.props.appear;const H=v.content.firstChild;O&&D.beforeEnter(H),p(H,v,b),S.el=v=H}if(U&16&&!(w&&(w.innerHTML||w.textContent))){let H=d(v.firstChild,S,v,b,E,T,L);for(;H;){Hi=!0;const ne=H;H=H.nextSibling,a(ne)}}else U&8&&v.textContent!==S.children&&(Hi=!0,v.textContent=S.children);if(w)if(B||!L||N&48)for(const H in w)(B&&(H.endsWith("value")||H==="indeterminate")||la(H)&&!Ro(H)||H[0]===".")&&i(v,H,null,w[H],void 0,void 0,b);else w.onClick&&i(v,"onClick",null,w.onClick,void 0,void 0,b);let G;(G=w&&w.onVnodeBeforeMount)&&cn(G,b,S),$&&ai(S,null,b,"beforeMount"),((G=w&&w.onVnodeMounted)||$||O)&&X_(()=>{G&&cn(G,b,S),O&&D.enter(v),$&&ai(S,null,b,"mounted")},E)}return v.nextSibling},d=(v,S,b,E,T,L,y)=>{y=y||!!S.dynamicChildren;const w=S.children,N=w.length;for(let U=0;U<N;U++){const $=y?w[U]:w[U]=On(w[U]);if(v)v=f(v,$,E,T,L,y);else{if($.type===qs&&!$.children)continue;Hi=!0,t(null,$,b,null,E,T,Pa(b),L)}}return v},g=(v,S,b,E,T,L)=>{const{slotScopeIds:y}=S;y&&(T=T?T.concat(y):y);const w=o(v),N=d(s(v),S,w,b,E,T,L);return N&&La(N)&&N.data==="]"?s(S.anchor=N):(Hi=!0,l(S.anchor=c("]"),w,N),N)},_=(v,S,b,E,T,L)=>{if(Hi=!0,S.el=null,L){const N=m(v);for(;;){const U=s(v);if(U&&U!==N)a(U);else break}}const y=s(v),w=o(v);return a(v),t(null,S,w,y,b,E,Pa(w),T),y},m=(v,S="[",b="]")=>{let E=0;for(;v;)if(v=s(v),v&&La(v)&&(v.data===S&&E++,v.data===b)){if(E===0)return s(v);E--}return v},p=(v,S,b)=>{const E=S.parentNode;E&&E.replaceChild(v,S);let T=b;for(;T;)T.vnode.el===S&&(T.vnode.el=T.subTree.el=v),T=T.parent},x=v=>v.nodeType===1&&v.tagName.toLowerCase()==="template";return[u,f]}const Ft=X_;function Xy(n){return lg(n)}function jy(n){return lg(n,Wy)}function lg(n,e){const t=h_();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=zn,insertStaticContent:g}=n,_=(C,P,k,X=null,J=null,ie=null,A=void 0,M=null,I=!!P.dynamicChildren)=>{if(C===P)return;C&&!ei(C,P)&&(X=V(C),pe(C,J,ie,!0),C=null),P.patchFlag===-2&&(I=!1,P.dynamicChildren=null);const{type:z,ref:q,shapeFlag:K}=P;switch(z){case qs:m(C,P,k,X);break;case on:p(C,P,k,X);break;case Do:C==null&&x(P,k,X,A);break;case jt:U(C,P,k,X,J,ie,A,M,I);break;default:K&1?b(C,P,k,X,J,ie,A,M,I):K&6?$(C,P,k,X,J,ie,A,M,I):(K&64||K&128)&&z.process(C,P,k,X,J,ie,A,M,I,re)}q!=null&&J&&bl(q,C&&C.ref,ie,P||C,!P)},m=(C,P,k,X)=>{if(C==null)i(P.el=a(P.children),k,X);else{const J=P.el=C.el;P.children!==C.children&&c(J,P.children)}},p=(C,P,k,X)=>{C==null?i(P.el=l(P.children||""),k,X):P.el=C.el},x=(C,P,k,X)=>{[C.el,C.anchor]=g(C.children,P,k,X,C.el,C.anchor)},v=({el:C,anchor:P},k,X)=>{let J;for(;C&&C!==P;)J=h(C),i(C,k,X),C=J;i(P,k,X)},S=({el:C,anchor:P})=>{let k;for(;C&&C!==P;)k=h(C),r(C),C=k;r(P)},b=(C,P,k,X,J,ie,A,M,I)=>{P.type==="svg"?A="svg":P.type==="math"&&(A="mathml"),C==null?E(P,k,X,J,ie,A,M,I):y(C,P,J,ie,A,M,I)},E=(C,P,k,X,J,ie,A,M)=>{let I,z;const{props:q,shapeFlag:K,transition:he,dirs:oe}=C;if(I=C.el=o(C.type,ie,q&&q.is,q),K&8?u(I,C.children):K&16&&L(C.children,I,null,X,J,Lc(C,ie),A,M),oe&&ai(C,null,X,"created"),T(I,C,C.scopeId,A,X),q){for(const ve in q)ve!=="value"&&!Ro(ve)&&s(I,ve,null,q[ve],ie,C.children,X,J,Se);"value"in q&&s(I,"value",null,q.value,ie),(z=q.onVnodeBeforeMount)&&cn(z,X,C)}oe&&ai(C,null,X,"beforeMount");const de=cg(J,he);de&&he.beforeEnter(I),i(I,P,k),((z=q&&q.onVnodeMounted)||de||oe)&&Ft(()=>{z&&cn(z,X,C),de&&he.enter(I),oe&&ai(C,null,X,"mounted")},J)},T=(C,P,k,X,J)=>{if(k&&d(C,k),X)for(let ie=0;ie<X.length;ie++)d(C,X[ie]);if(J){let ie=J.subTree;if(P===ie){const A=J.vnode;T(C,A,A.scopeId,A.slotScopeIds,J.parent)}}},L=(C,P,k,X,J,ie,A,M,I=0)=>{for(let z=I;z<C.length;z++){const q=C[z]=M?Qi(C[z]):On(C[z]);_(null,q,P,k,X,J,ie,A,M)}},y=(C,P,k,X,J,ie,A)=>{const M=P.el=C.el;let{patchFlag:I,dynamicChildren:z,dirs:q}=P;I|=C.patchFlag&16;const K=C.props||dt,he=P.props||dt;let oe;if(k&&Ar(k,!1),(oe=he.onVnodeBeforeUpdate)&&cn(oe,k,P,C),q&&ai(P,C,k,"beforeUpdate"),k&&Ar(k,!0),z?w(C.dynamicChildren,z,M,k,X,Lc(P,J),ie):A||H(C,P,M,null,k,X,Lc(P,J),ie,!1),I>0){if(I&16)N(M,P,K,he,k,X,J);else if(I&2&&K.class!==he.class&&s(M,"class",null,he.class,J),I&4&&s(M,"style",K.style,he.style,J),I&8){const de=P.dynamicProps;for(let ve=0;ve<de.length;ve++){const be=de[ve],ce=K[be],ze=he[be];(ze!==ce||be==="value")&&s(M,be,ce,ze,J,C.children,k,X,Se)}}I&1&&C.children!==P.children&&u(M,P.children)}else!A&&z==null&&N(M,P,K,he,k,X,J);((oe=he.onVnodeUpdated)||q)&&Ft(()=>{oe&&cn(oe,k,P,C),q&&ai(P,C,k,"updated")},X)},w=(C,P,k,X,J,ie,A)=>{for(let M=0;M<P.length;M++){const I=C[M],z=P[M],q=I.el&&(I.type===jt||!ei(I,z)||I.shapeFlag&70)?f(I.el):k;_(I,z,q,null,X,J,ie,A,!0)}},N=(C,P,k,X,J,ie,A)=>{if(k!==X){if(k!==dt)for(const M in k)!Ro(M)&&!(M in X)&&s(C,M,k[M],null,A,P.children,J,ie,Se);for(const M in X){if(Ro(M))continue;const I=X[M],z=k[M];I!==z&&M!=="value"&&s(C,M,z,I,A,P.children,J,ie,Se)}"value"in X&&s(C,"value",k.value,X.value,A)}},U=(C,P,k,X,J,ie,A,M,I)=>{const z=P.el=C?C.el:a(""),q=P.anchor=C?C.anchor:a("");let{patchFlag:K,dynamicChildren:he,slotScopeIds:oe}=P;oe&&(M=M?M.concat(oe):oe),C==null?(i(z,k,X),i(q,k,X),L(P.children||[],k,q,J,ie,A,M,I)):K>0&&K&64&&he&&C.dynamicChildren?(w(C.dynamicChildren,he,k,J,ie,A,M),(P.key!=null||J&&P===J.subTree)&&sh(C,P,!0)):H(C,P,k,q,J,ie,A,M,I)},$=(C,P,k,X,J,ie,A,M,I)=>{P.slotScopeIds=M,C==null?P.shapeFlag&512?J.ctx.activate(P,k,X,A,I):D(P,k,X,J,ie,A,I):B(C,P,I)},D=(C,P,k,X,J,ie,A)=>{const M=C.component=nS(C,X,J);if(Jl(C)&&(M.ctx.renderer=re),iS(M),M.asyncDep){if(J&&J.registerDep(M,O),!C.el){const I=M.subTree=qe(on);p(null,I,P,k)}}else O(M,C,P,k,J,ie,A)},B=(C,P,k)=>{const X=P.component=C.component;if(ry(C,P,k))if(X.asyncDep&&!X.asyncResolved){G(X,P,k);return}else X.next=P,Jx(X.update),X.effect.dirty=!0,X.update();else P.el=C.el,X.vnode=P},O=(C,P,k,X,J,ie,A)=>{const M=()=>{if(C.isMounted){let{next:q,bu:K,u:he,parent:oe,vnode:de}=C;{const Oe=ug(C);if(Oe){q&&(q.el=de.el,G(C,q,A)),Oe.asyncDep.then(()=>{C.isUnmounted||M()});return}}let ve=q,be;Ar(C,!1),q?(q.el=de.el,G(C,q,A)):q=de,K&&Co(K),(be=q.props&&q.props.onVnodeBeforeUpdate)&&cn(be,oe,q,de),Ar(C,!0);const ce=wc(C),ze=C.subTree;C.subTree=ce,_(ze,ce,f(ze.el),V(ze),C,J,ie),q.el=ce.el,ve===null&&Kf(C,ce.el),he&&Ft(he,J),(be=q.props&&q.props.onVnodeUpdated)&&Ft(()=>cn(be,oe,q,de),J)}else{let q;const{el:K,props:he}=P,{bm:oe,m:de,parent:ve}=C,be=qr(P);if(Ar(C,!1),oe&&Co(oe),!be&&(q=he&&he.onVnodeBeforeMount)&&cn(q,ve,P),Ar(C,!0),K&&W){const ce=()=>{C.subTree=wc(C),W(K,C.subTree,C,J,null)};be?P.type.__asyncLoader().then(()=>!C.isUnmounted&&ce()):ce()}else{const ce=C.subTree=wc(C);_(null,ce,k,X,C,J,ie),P.el=ce.el}if(de&&Ft(de,J),!be&&(q=he&&he.onVnodeMounted)){const ce=P;Ft(()=>cn(q,ve,ce),J)}(P.shapeFlag&256||ve&&qr(ve.vnode)&&ve.vnode.shapeFlag&256)&&C.a&&Ft(C.a,J),C.isMounted=!0,P=k=X=null}},I=C.effect=new Hf(M,zn,()=>Yf(z),C.scope),z=C.update=()=>{I.dirty&&I.run()};z.id=C.uid,Ar(C,!0),z()},G=(C,P,k)=>{P.component=C;const X=C.vnode.props;C.vnode=P,C.next=null,By(C,P.props,X,k),Hy(C,P.children,k),ls(),id(C),cs()},H=(C,P,k,X,J,ie,A,M,I=!1)=>{const z=C&&C.children,q=C?C.shapeFlag:0,K=P.children,{patchFlag:he,shapeFlag:oe}=P;if(he>0){if(he&128){ue(z,K,k,X,J,ie,A,M,I);return}else if(he&256){ne(z,K,k,X,J,ie,A,M,I);return}}oe&8?(q&16&&Se(z,J,ie),K!==z&&u(k,K)):q&16?oe&16?ue(z,K,k,X,J,ie,A,M,I):Se(z,J,ie,!0):(q&8&&u(k,""),oe&16&&L(K,k,X,J,ie,A,M,I))},ne=(C,P,k,X,J,ie,A,M,I)=>{C=C||Os,P=P||Os;const z=C.length,q=P.length,K=Math.min(z,q);let he;for(he=0;he<K;he++){const oe=P[he]=I?Qi(P[he]):On(P[he]);_(C[he],oe,k,null,J,ie,A,M,I)}z>q?Se(C,J,ie,!0,!1,K):L(P,k,X,J,ie,A,M,I,K)},ue=(C,P,k,X,J,ie,A,M,I)=>{let z=0;const q=P.length;let K=C.length-1,he=q-1;for(;z<=K&&z<=he;){const oe=C[z],de=P[z]=I?Qi(P[z]):On(P[z]);if(ei(oe,de))_(oe,de,k,null,J,ie,A,M,I);else break;z++}for(;z<=K&&z<=he;){const oe=C[K],de=P[he]=I?Qi(P[he]):On(P[he]);if(ei(oe,de))_(oe,de,k,null,J,ie,A,M,I);else break;K--,he--}if(z>K){if(z<=he){const oe=he+1,de=oe<q?P[oe].el:X;for(;z<=he;)_(null,P[z]=I?Qi(P[z]):On(P[z]),k,de,J,ie,A,M,I),z++}}else if(z>he)for(;z<=K;)pe(C[z],J,ie,!0),z++;else{const oe=z,de=z,ve=new Map;for(z=de;z<=he;z++){const Re=P[z]=I?Qi(P[z]):On(P[z]);Re.key!=null&&ve.set(Re.key,z)}let be,ce=0;const ze=he-de+1;let Oe=!1,Ie=0;const we=new Array(ze);for(z=0;z<ze;z++)we[z]=0;for(z=oe;z<=K;z++){const Re=C[z];if(ce>=ze){pe(Re,J,ie,!0);continue}let He;if(Re.key!=null)He=ve.get(Re.key);else for(be=de;be<=he;be++)if(we[be-de]===0&&ei(Re,P[be])){He=be;break}He===void 0?pe(Re,J,ie,!0):(we[He-de]=z+1,He>=Ie?Ie=He:Oe=!0,_(Re,P[He],k,null,J,ie,A,M,I),ce++)}const Te=Oe?qy(we):Os;for(be=Te.length-1,z=ze-1;z>=0;z--){const Re=de+z,He=P[Re],ut=Re+1<q?P[Re+1].el:X;we[z]===0?_(null,He,k,ut,J,ie,A,M,I):Oe&&(be<0||z!==Te[be]?le(He,k,ut,2):be--)}}},le=(C,P,k,X,J=null)=>{const{el:ie,type:A,transition:M,children:I,shapeFlag:z}=C;if(z&6){le(C.component.subTree,P,k,X);return}if(z&128){C.suspense.move(P,k,X);return}if(z&64){A.move(C,P,k,re);return}if(A===jt){i(ie,P,k);for(let K=0;K<I.length;K++)le(I[K],P,k,X);i(C.anchor,P,k);return}if(A===Do){v(C,P,k);return}if(X!==2&&z&1&&M)if(X===0)M.beforeEnter(ie),i(ie,P,k),Ft(()=>M.enter(ie),J);else{const{leave:K,delayLeave:he,afterLeave:oe}=M,de=()=>i(ie,P,k),ve=()=>{K(ie,()=>{de(),oe&&oe()})};he?he(ie,de,ve):ve()}else i(ie,P,k)},pe=(C,P,k,X=!1,J=!1)=>{const{type:ie,props:A,ref:M,children:I,dynamicChildren:z,shapeFlag:q,patchFlag:K,dirs:he}=C;if(M!=null&&bl(M,null,k,C,!0),q&256){P.ctx.deactivate(C);return}const oe=q&1&&he,de=!qr(C);let ve;if(de&&(ve=A&&A.onVnodeBeforeUnmount)&&cn(ve,P,C),q&6)me(C.component,k,X);else{if(q&128){C.suspense.unmount(k,X);return}oe&&ai(C,null,P,"beforeUnmount"),q&64?C.type.remove(C,P,k,J,re,X):z&&(ie!==jt||K>0&&K&64)?Se(z,P,k,!1,!0):(ie===jt&&K&384||!J&&q&16)&&Se(I,P,k),X&&Y(C)}(de&&(ve=A&&A.onVnodeUnmounted)||oe)&&Ft(()=>{ve&&cn(ve,P,C),oe&&ai(C,null,P,"unmounted")},k)},Y=C=>{const{type:P,el:k,anchor:X,transition:J}=C;if(P===jt){se(k,X);return}if(P===Do){S(C);return}const ie=()=>{r(k),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(C.shapeFlag&1&&J&&!J.persisted){const{leave:A,delayLeave:M}=J,I=()=>A(k,ie);M?M(C.el,ie,I):I()}else ie()},se=(C,P)=>{let k;for(;C!==P;)k=h(C),r(C),C=k;r(P)},me=(C,P,k)=>{const{bum:X,scope:J,update:ie,subTree:A,um:M}=C;X&&Co(X),J.stop(),ie&&(ie.active=!1,pe(A,C,P,k)),M&&Ft(M,P),Ft(()=>{C.isUnmounted=!0},P),P&&P.pendingBranch&&!P.isUnmounted&&C.asyncDep&&!C.asyncResolved&&C.suspenseId===P.pendingId&&(P.deps--,P.deps===0&&P.resolve())},Se=(C,P,k,X=!1,J=!1,ie=0)=>{for(let A=ie;A<C.length;A++)pe(C[A],P,k,X,J)},V=C=>C.shapeFlag&6?V(C.component.subTree):C.shapeFlag&128?C.suspense.next():h(C.anchor||C.el);let fe=!1;const ae=(C,P,k)=>{C==null?P._vnode&&pe(P._vnode,null,null,!0):_(P._vnode||null,C,P,null,null,null,k),fe||(fe=!0,id(),yl(),fe=!1),P._vnode=C},re={p:_,um:pe,m:le,r:Y,mt:D,mc:L,pc:H,pbc:w,n:V,o:n};let Ee,W;return e&&([Ee,W]=e(re)),{render:ae,hydrate:Ee,createApp:Oy(ae,Ee)}}function Lc({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ar({effect:n,update:e},t){n.allowRecurse=e.allowRecurse=t}function cg(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function sh(n,e,t=!1){const i=n.children,r=e.children;if(Le(i)&&Le(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Qi(r[s]),a.el=o.el),t||sh(o,a)),a.type===qs&&(a.el=o.el)}}function qy(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function ug(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ug(e)}const $y=n=>n.__isTeleport,Lo=n=>n&&(n.disabled||n.disabled===""),_d=n=>typeof SVGElement<"u"&&n instanceof SVGElement,gd=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Hu=(n,e)=>{const t=n&&n.to;return vt(t)?e?e(t):null:t},Yy={name:"Teleport",__isTeleport:!0,process(n,e,t,i,r,s,o,a,l,c){const{mc:u,pc:f,pbc:h,o:{insert:d,querySelector:g,createText:_,createComment:m}}=c,p=Lo(e.props);let{shapeFlag:x,children:v,dynamicChildren:S}=e;if(n==null){const b=e.el=_(""),E=e.anchor=_("");d(b,t,i),d(E,t,i);const T=e.target=Hu(e.props,g),L=e.targetAnchor=_("");T&&(d(L,T),o==="svg"||_d(T)?o="svg":(o==="mathml"||gd(T))&&(o="mathml"));const y=(w,N)=>{x&16&&u(v,w,N,r,s,o,a,l)};p?y(t,E):T&&y(T,L)}else{e.el=n.el;const b=e.anchor=n.anchor,E=e.target=n.target,T=e.targetAnchor=n.targetAnchor,L=Lo(n.props),y=L?t:E,w=L?b:T;if(o==="svg"||_d(E)?o="svg":(o==="mathml"||gd(E))&&(o="mathml"),S?(h(n.dynamicChildren,S,y,r,s,o,a),sh(n,e,!0)):l||f(n,e,y,w,r,s,o,a,!1),p)L?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):Da(e,t,b,c,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const N=e.target=Hu(e.props,g);N&&Da(e,N,null,c,0)}else L&&Da(e,E,T,c,1)}fg(e)},remove(n,e,t,i,{um:r,o:{remove:s}},o){const{shapeFlag:a,children:l,anchor:c,targetAnchor:u,target:f,props:h}=n;if(f&&s(u),o&&s(c),a&16){const d=o||!Lo(h);for(let g=0;g<l.length;g++){const _=l[g];r(_,e,t,d,!!_.dynamicChildren)}}},move:Da,hydrate:Ky};function Da(n,e,t,{o:{insert:i},m:r},s=2){s===0&&i(n.targetAnchor,e,t);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=s===2;if(f&&i(o,e,t),(!f||Lo(u))&&l&16)for(let h=0;h<c.length;h++)r(c[h],e,t,2);f&&i(a,e,t)}function Ky(n,e,t,i,r,s,{o:{nextSibling:o,parentNode:a,querySelector:l}},c){const u=e.target=Hu(e.props,l);if(u){const f=u._lpa||u.firstChild;if(e.shapeFlag&16)if(Lo(e.props))e.anchor=c(o(n),e,a(n),t,i,r,s),e.targetAnchor=f;else{e.anchor=o(n);let h=f;for(;h;)if(h=o(h),h&&h.nodeType===8&&h.data==="teleport anchor"){e.targetAnchor=h,u._lpa=e.targetAnchor&&o(e.targetAnchor);break}c(f,e,u,t,i,r,s)}fg(e)}return e.anchor&&o(e.anchor)}const UI=Yy;function fg(n){const e=n.ctx;if(e&&e.ut){let t=n.children[0].el;for(;t&&t!==n.targetAnchor;)t.nodeType===1&&t.setAttribute("data-v-owner",e.uid),t=t.nextSibling;e.ut()}}const jt=Symbol.for("v-fgt"),qs=Symbol.for("v-txt"),on=Symbol.for("v-cmt"),Do=Symbol.for("v-stc"),Io=[];let Hn=null;function Je(n=!1){Io.push(Hn=n?null:[])}function hg(){Io.pop(),Hn=Io[Io.length-1]||null}let $s=1;function vd(n){$s+=n}function dg(n){return n.dynamicChildren=$s>0?Hn||Os:null,hg(),$s>0&&Hn&&Hn.push(n),n}function mt(n,e,t,i,r,s){return dg(Ce(n,e,t,i,r,s,!0))}function nr(n,e,t,i,r){return dg(qe(n,e,t,i,r,!0))}function Ys(n){return n?n.__v_isVNode===!0:!1}function ei(n,e){return n.type===e.type&&n.key===e.key}const ec="__vInternal",pg=({key:n})=>n??null,cl=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?vt(n)||Vt(n)||Fe(n)?{i:kt,r:n,k:e,f:!!t}:n:null);function Ce(n,e=null,t=null,i=0,r=null,s=n===jt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&pg(e),ref:e&&cl(e),scopeId:Zl,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:kt};return a?(oh(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=vt(t)?8:16),$s>0&&!o&&Hn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Hn.push(l),l}const qe=Zy;function Zy(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===H_)&&(n=on),Ys(n)){const a=Di(n,e,!0);return t&&oh(a,t),$s>0&&!s&&Hn&&(a.shapeFlag&6?Hn[Hn.indexOf(n)]=a:Hn.push(a)),a.patchFlag|=-2,a}if(aS(n)&&(n=n.__vccOpts),e){e=Jy(e);let{class:a,style:l}=e;a&&!vt(a)&&(e.class=is(a)),ct(l)&&(R_(l)&&!Le(l)&&(l=Rt({},l)),e.style=zf(l))}const o=vt(n)?1:G_(n)?128:$y(n)?64:ct(n)?4:Fe(n)?2:0;return Ce(n,e,t,i,r,o,s,!0)}function Jy(n){return n?R_(n)||ec in n?Rt({},n):n:null}function Di(n,e,t=!1){const{props:i,ref:r,patchFlag:s,children:o}=n,a=e?Qy(i||{},e):i;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:a,key:a&&pg(a),ref:e&&e.ref?t&&r?Le(r)?r.concat(cl(e)):[r,cl(e)]:cl(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==jt?s===-1?16:s|16:s,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Di(n.ssContent),ssFallback:n.ssFallback&&Di(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce}}function mg(n=" ",e=0){return qe(qs,null,n,e)}function NI(n,e){const t=qe(Do,null,n);return t.staticCount=e,t}function Zn(n="",e=!1){return e?(Je(),nr(on,null,n)):qe(on,null,n)}function On(n){return n==null||typeof n=="boolean"?qe(on):Le(n)?qe(jt,null,n.slice()):typeof n=="object"?Qi(n):qe(qs,null,String(n))}function Qi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Di(n)}function oh(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Le(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),oh(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!(ec in e)?e._ctx=kt:r===3&&kt&&(kt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Fe(e)?(e={default:e,_ctx:kt},t=32):(e=String(e),i&64?(t=16,e=[mg(e)]):t=8);n.children=e,n.shapeFlag|=t}function Qy(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=is([e.class,i.class]));else if(r==="style")e.style=zf([e.style,i.style]);else if(la(r)){const s=e[r],o=i[r];o&&s!==o&&!(Le(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function cn(n,e,t,i=null){Wn(n,e,7,[t,i])}const eS=tg();let tS=0;function nS(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||eS,s={uid:tS++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new m_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rg(i,r),emitsOptions:B_(i,r),emit:null,emitted:null,propsDefaults:dt,inheritAttrs:i.inheritAttrs,ctx:dt,data:dt,props:dt,attrs:dt,slots:dt,refs:dt,setupState:dt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=ey.bind(null,s),n.ce&&n.ce(s),s}let Nt=null;const tc=()=>Nt||kt;let Tl,Vu;{const n=h_(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Tl=e("__VUE_INSTANCE_SETTERS__",t=>Nt=t),Vu=e("__VUE_SSR_SETTERS__",t=>nc=t)}const pa=n=>{const e=Nt;return Tl(n),n.scope.on(),()=>{n.scope.off(),Tl(e)}},xd=()=>{Nt&&Nt.scope.off(),Tl(null)};function _g(n){return n.vnode.shapeFlag&4}let nc=!1;function iS(n,e=!1){e&&Vu(e);const{props:t,children:i}=n.vnode,r=_g(n);Fy(n,t,r,e),zy(n,i);const s=r?rS(n,e):void 0;return e&&Vu(!1),s}function rS(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=C_(new Proxy(n.ctx,Cy));const{setup:i}=t;if(i){const r=n.setupContext=i.length>1?oS(n):null,s=pa(n);ls();const o=ur(i,n,0,[n.props,r]);if(cs(),s(),l_(o)){if(o.then(xd,xd),e)return o.then(a=>{Gu(n,a,e)}).catch(a=>{fa(a,n,0)});n.asyncDep=o}else Gu(n,o,e)}else gg(n,e)}function Gu(n,e,t){Fe(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ct(e)&&(n.setupState=I_(e)),gg(n,t)}let yd;function gg(n,e,t){const i=n.type;if(!n.render){if(!e&&yd&&!i.render){const r=i.template||ih(n).template;if(r){const{isCustomElement:s,compilerOptions:o}=n.appContext.config,{delimiters:a,compilerOptions:l}=i,c=Rt(Rt({isCustomElement:s,delimiters:a},o),l);i.render=yd(r,c)}}n.render=i.render||zn}{const r=pa(n);ls();try{Py(n)}finally{cs(),r()}}}function sS(n){return n.attrsProxy||(n.attrsProxy=new Proxy(n.attrs,{get(e,t){return vn(n,"get","$attrs"),e[t]}}))}function oS(n){const e=t=>{n.exposed=t||{}};return{get attrs(){return sS(n)},slots:n.slots,emit:n.emit,expose:e}}function ah(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(I_(C_(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Po)return Po[t](n)},has(e,t){return t in e||t in Po}}))}function Wu(n,e=!0){return Fe(n)?n.displayName||n.name:n.name||e&&n.__name}function aS(n){return Fe(n)&&"__vccOpts"in n}const St=(n,e)=>Wx(n,e,nc);function Xn(n,e,t){const i=arguments.length;return i===2?ct(e)&&!Le(e)?Ys(e)?qe(n,null,[e]):qe(n,e):qe(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Ys(t)&&(t=[t]),qe(n,e,t))}const vg="3.4.14";/**
* @vue/runtime-dom v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const lS="http://www.w3.org/2000/svg",cS="http://www.w3.org/1998/Math/MathML",er=typeof document<"u"?document:null,Sd=er&&er.createElement("template"),uS={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?er.createElementNS(lS,n):e==="mathml"?er.createElementNS(cS,n):er.createElement(n,t?{is:t}:void 0);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>er.createTextNode(n),createComment:n=>er.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>er.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Sd.innerHTML=i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n;const a=Sd.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Vi="transition",mo="animation",Yo=Symbol("_vtc"),lh=(n,{slots:e})=>Xn(xy,fS(n),e);lh.displayName="Transition";const xg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};lh.props=Rt({},q_,xg);const Rr=(n,e=[])=>{Le(n)?n.forEach(t=>t(...e)):n&&n(...e)},Md=n=>n?Le(n)?n.some(e=>e.length>1):n.length>1:!1;function fS(n){const e={};for(const U in n)U in xg||(e[U]=n[U]);if(n.css===!1)return e;const{name:t="v",type:i,duration:r,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:d=`${t}-leave-to`}=n,g=hS(r),_=g&&g[0],m=g&&g[1],{onBeforeEnter:p,onEnter:x,onEnterCancelled:v,onLeave:S,onLeaveCancelled:b,onBeforeAppear:E=p,onAppear:T=x,onAppearCancelled:L=v}=e,y=(U,$,D)=>{Cr(U,$?u:a),Cr(U,$?c:o),D&&D()},w=(U,$)=>{U._isLeaving=!1,Cr(U,f),Cr(U,d),Cr(U,h),$&&$()},N=U=>($,D)=>{const B=U?T:x,O=()=>y($,U,D);Rr(B,[$,O]),Ed(()=>{Cr($,U?l:s),Gi($,U?u:a),Md(B)||bd($,i,_,O)})};return Rt(e,{onBeforeEnter(U){Rr(p,[U]),Gi(U,s),Gi(U,o)},onBeforeAppear(U){Rr(E,[U]),Gi(U,l),Gi(U,c)},onEnter:N(!1),onAppear:N(!0),onLeave(U,$){U._isLeaving=!0;const D=()=>w(U,$);Gi(U,f),mS(),Gi(U,h),Ed(()=>{U._isLeaving&&(Cr(U,f),Gi(U,d),Md(S)||bd(U,i,m,D))}),Rr(S,[U,D])},onEnterCancelled(U){y(U,!1),Rr(v,[U])},onAppearCancelled(U){y(U,!0),Rr(L,[U])},onLeaveCancelled(U){w(U),Rr(b,[U])}})}function hS(n){if(n==null)return null;if(ct(n))return[Dc(n.enter),Dc(n.leave)];{const e=Dc(n);return[e,e]}}function Dc(n){return f_(n)}function Gi(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Yo]||(n[Yo]=new Set)).add(e)}function Cr(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[Yo];t&&(t.delete(e),t.size||(n[Yo]=void 0))}function Ed(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let dS=0;function bd(n,e,t,i){const r=n._endId=++dS,s=()=>{r===n._endId&&i()};if(t)return setTimeout(s,t);const{type:o,timeout:a,propCount:l}=pS(n,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{n.removeEventListener(c,h),s()},h=d=>{d.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),n.addEventListener(c,h)}function pS(n,e){const t=window.getComputedStyle(n),i=g=>(t[g]||"").split(", "),r=i(`${Vi}Delay`),s=i(`${Vi}Duration`),o=Td(r,s),a=i(`${mo}Delay`),l=i(`${mo}Duration`),c=Td(a,l);let u=null,f=0,h=0;e===Vi?o>0&&(u=Vi,f=o,h=s.length):e===mo?c>0&&(u=mo,f=c,h=l.length):(f=Math.max(o,c),u=f>0?o>c?Vi:mo:null,h=u?u===Vi?s.length:l.length:0);const d=u===Vi&&/\b(transform|all)(,|$)/.test(i(`${Vi}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:d}}function Td(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>wd(t)+wd(n[i])))}function wd(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function mS(){return document.body.offsetHeight}function _S(n,e,t){const i=n[Yo];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const gS=Symbol("_vod"),vS=Symbol("");function xS(n,e,t){const i=n.style,r=i.display,s=vt(t);if(t&&!s){if(e&&!vt(e))for(const o in e)t[o]==null&&Xu(i,o,"");for(const o in t)Xu(i,o,t[o])}else if(s){if(e!==t){const o=i[vS];o&&(t+=";"+o),i.cssText=t}}else e&&n.removeAttribute("style");gS in n&&(i.display=r)}const Ad=/\s*!important$/;function Xu(n,e,t){if(Le(t))t.forEach(i=>Xu(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=yS(n,e);Ad.test(t)?n.setProperty(lo(i),t.replace(Ad,""),"important"):n[i]=t}}const Rd=["Webkit","Moz","ms"],Ic={};function yS(n,e){const t=Ic[e];if(t)return t;let i=_i(e);if(i!=="filter"&&i in n)return Ic[e]=i;i=$l(i);for(let r=0;r<Rd.length;r++){const s=Rd[r]+i;if(s in n)return Ic[e]=s}return e}const Cd="http://www.w3.org/1999/xlink";function SS(n,e,t,i,r){if(i&&e.startsWith("xlink:"))t==null?n.removeAttributeNS(Cd,e.slice(6,e.length)):n.setAttributeNS(Cd,e,t);else{const s=yx(e);t==null||s&&!d_(t)?n.removeAttribute(e):n.setAttribute(e,s?"":t)}}function MS(n,e,t,i,r,s,o){if(e==="innerHTML"||e==="textContent"){i&&o(i,r,s),n[e]=t??"";return}const a=n.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){n._value=t;const c=a==="OPTION"?n.getAttribute("value"):n.value,u=t??"";c!==u&&(n.value=u),t==null&&n.removeAttribute(e);return}let l=!1;if(t===""||t==null){const c=typeof n[e];c==="boolean"?t=d_(t):t==null&&c==="string"?(t="",l=!0):c==="number"&&(t=0,l=!0)}try{n[e]=t}catch{}l&&n.removeAttribute(e)}function ES(n,e,t,i){n.addEventListener(e,t,i)}function bS(n,e,t,i){n.removeEventListener(e,t,i)}const Pd=Symbol("_vei");function TS(n,e,t,i,r=null){const s=n[Pd]||(n[Pd]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=wS(e);if(i){const c=s[e]=CS(i,r);ES(n,a,c,l)}else o&&(bS(n,a,o,l),s[e]=void 0)}}const Ld=/(?:Once|Passive|Capture)$/;function wS(n){let e;if(Ld.test(n)){e={};let i;for(;i=n.match(Ld);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):lo(n.slice(2)),e]}let Uc=0;const AS=Promise.resolve(),RS=()=>Uc||(AS.then(()=>Uc=0),Uc=Date.now());function CS(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Wn(PS(i,t.value),e,5,[i])};return t.value=n,t.attached=RS(),t}function PS(n,e){if(Le(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const Dd=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,LS=(n,e,t,i,r,s,o,a,l)=>{const c=r==="svg";e==="class"?_S(n,i,c):e==="style"?xS(n,t,i):la(e)?Ff(e)||TS(n,e,t,i,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):DS(n,e,i,c))?MS(n,e,i,s,o,a,l):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),SS(n,e,i,c))};function DS(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Dd(e)&&Fe(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Dd(e)&&vt(t)?!1:e in n}const yg=Rt({patchProp:LS},uS);let Uo,Id=!1;function IS(){return Uo||(Uo=Xy(yg))}function US(){return Uo=Id?Uo:jy(yg),Id=!0,Uo}const NS=(...n)=>{const e=IS().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Mg(i);if(!r)return;const s=e._component;!Fe(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const o=t(r,!1,Sg(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e},OS=(...n)=>{const e=US().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Mg(i);if(r)return t(r,!0,Sg(r))},e};function Sg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Mg(n){return vt(n)?document.querySelector(n):n}const Eg=/#/g,bg=/&/g,FS=/\//g,BS=/=/g,kS=/\?/g,ic=/\+/g,zS=/%5e/gi,HS=/%60/gi,VS=/%7c/gi,GS=/%20/gi,WS=/%252f/gi;function Tg(n){return encodeURI(""+n).replace(VS,"|")}function ju(n){return Tg(typeof n=="string"?n:JSON.stringify(n)).replace(ic,"%2B").replace(GS,"+").replace(Eg,"%23").replace(bg,"%26").replace(HS,"`").replace(zS,"^")}function Nc(n){return ju(n).replace(BS,"%3D")}function wg(n){return Tg(n).replace(Eg,"%23").replace(kS,"%3F").replace(WS,"%2F").replace(bg,"%26").replace(ic,"%2B")}function Ud(n){return wg(n).replace(FS,"%2F")}function wl(n=""){try{return decodeURIComponent(""+n)}catch{return""+n}}function XS(n){return wl(n.replace(ic," "))}function jS(n){return wl(n.replace(ic," "))}function Ag(n=""){const e={};n[0]==="?"&&(n=n.slice(1));for(const t of n.split("&")){const i=t.match(/([^=]+)=?(.*)/)||[];if(i.length<2)continue;const r=XS(i[1]);if(r==="__proto__"||r==="constructor")continue;const s=jS(i[2]||"");e[r]===void 0?e[r]=s:Array.isArray(e[r])?e[r].push(s):e[r]=[e[r],s]}return e}function qS(n,e){return(typeof e=="number"||typeof e=="boolean")&&(e=String(e)),e?Array.isArray(e)?e.map(t=>`${Nc(n)}=${ju(t)}`).join("&"):`${Nc(n)}=${ju(e)}`:Nc(n)}function $S(n){return Object.keys(n).filter(e=>n[e]!==void 0).map(e=>qS(e,n[e])).filter(Boolean).join("&")}const YS=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,KS=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,ZS=/^([/\\]\s*){2,}[^/\\]/;function Ii(n,e={}){return typeof e=="boolean"&&(e={acceptRelative:e}),e.strict?YS.test(n):KS.test(n)||(e.acceptRelative?ZS.test(n):!1)}const JS=/^[\s\0]*(blob|data|javascript|vbscript):$/i;function QS(n){return!!n&&JS.test(n)}const eM=/\/$|\/\?|\/#/;function qu(n="",e){return e?eM.test(n):n.endsWith("/")}function rc(n="",e){if(!e)return(qu(n)?n.slice(0,-1):n)||"/";if(!qu(n,!0))return n||"/";let t=n,i="";const r=n.indexOf("#");r>=0&&(t=n.slice(0,r),i=n.slice(r));const[s,...o]=t.split("?");return(s.slice(0,-1)||"/")+(o.length>0?`?${o.join("?")}`:"")+i}function Al(n="",e){if(!e)return n.endsWith("/")?n:n+"/";if(qu(n,!0))return n||"/";let t=n,i="";const r=n.indexOf("#");if(r>=0&&(t=n.slice(0,r),i=n.slice(r),!t))return i;const[s,...o]=t.split("?");return s+"/"+(o.length>0?`?${o.join("?")}`:"")+i}function tM(n=""){return n.startsWith("/")}function $u(n=""){return tM(n)?n:"/"+n}function nM(n,e){if(Cg(e)||Ii(n))return n;const t=rc(e);return n.startsWith(t)?n:Ui(t,n)}function Nd(n,e){if(Cg(e))return n;const t=rc(e);if(!n.startsWith(t))return n;const i=n.slice(t.length);return i[0]==="/"?i:"/"+i}function Rg(n,e){const t=uo(n),i={...Ag(t.search),...e};return t.search=$S(i),oM(t)}function Cg(n){return!n||n==="/"}function iM(n){return n&&n!=="/"}const rM=/^\.?\//;function Ui(n,...e){let t=n||"";for(const i of e.filter(r=>iM(r)))if(t){const r=i.replace(rM,"");t=Al(t)+r}else t=i;return t}function sM(n,e,t={}){return t.trailingSlash||(n=Al(n),e=Al(e)),t.leadingSlash||(n=$u(n),e=$u(e)),t.encoding||(n=wl(n),e=wl(e)),n===e}function uo(n="",e){const t=n.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);if(t){const[,f,h=""]=t;return{protocol:f.toLowerCase(),pathname:h,href:f+h,auth:"",host:"",search:"",hash:""}}if(!Ii(n,{acceptRelative:!0}))return e?uo(e+n):Od(n);const[,i="",r,s=""]=n.replace(/\\/g,"/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[],[,o="",a=""]=s.match(/([^#/?]*)(.*)?/)||[],{pathname:l,search:c,hash:u}=Od(a.replace(/\/(?=[A-Za-z]:)/,""));return{protocol:i.toLowerCase(),auth:r?r.slice(0,Math.max(0,r.length-1)):"",host:o,pathname:l,search:c,hash:u}}function Od(n=""){const[e="",t="",i=""]=(n.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:e,search:t,hash:i}}function oM(n){const e=n.pathname||"",t=n.search?(n.search.startsWith("?")?"":"?")+n.search:"",i=n.hash||"",r=n.auth?n.auth+"@":"",s=n.host||"";return(n.protocol?n.protocol+"//":"")+r+s+e+t+i}const aM=()=>{var n;return((n=window==null?void 0:window.__NUXT__)==null?void 0:n.config)||{}},Rl=aM().app,lM=()=>Rl.baseURL,cM=()=>Rl.buildAssetsDir,ch=(...n)=>Ui(Pg(),cM(),...n),Pg=(...n)=>{const e=Rl.cdnURL||Rl.baseURL;return n.length?Ui(e,...n):e};globalThis.__buildAssetsURL=ch,globalThis.__publicAssetsURL=Pg;const uM=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,fM=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,hM=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function dM(n,e){if(n==="__proto__"||n==="constructor"&&e&&typeof e=="object"&&"prototype"in e){pM(n);return}return e}function pM(n){console.warn(`[destr] Dropping "${n}" key to prevent prototype pollution.`)}function Cl(n,e={}){if(typeof n!="string")return n;const t=n.trim();if(n[0]==='"'&&n.at(-1)==='"'&&!n.includes("\\"))return t.slice(1,-1);if(t.length<=9){const i=t.toLowerCase();if(i==="true")return!0;if(i==="false")return!1;if(i==="undefined")return;if(i==="null")return null;if(i==="nan")return Number.NaN;if(i==="infinity")return Number.POSITIVE_INFINITY;if(i==="-infinity")return Number.NEGATIVE_INFINITY}if(!hM.test(n)){if(e.strict)throw new SyntaxError("[destr] Invalid JSON");return n}try{if(uM.test(n)||fM.test(n)){if(e.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(n,dM)}return JSON.parse(n)}catch(i){if(e.strict)throw i;return n}}class mM extends Error{constructor(e,t){super(e,t),this.name="FetchError",t!=null&&t.cause&&!this.cause&&(this.cause=t.cause)}}function _M(n){var l,c,u,f,h;const e=((l=n.error)==null?void 0:l.message)||((c=n.error)==null?void 0:c.toString())||"",t=((u=n.request)==null?void 0:u.method)||((f=n.options)==null?void 0:f.method)||"GET",i=((h=n.request)==null?void 0:h.url)||String(n.request)||"/",r=`[${t}] ${JSON.stringify(i)}`,s=n.response?`${n.response.status} ${n.response.statusText}`:"<no response>",o=`${r}: ${s}${e?` ${e}`:""}`,a=new mM(o,n.error?{cause:n.error}:void 0);for(const d of["request","options","response"])Object.defineProperty(a,d,{get(){return n[d]}});for(const[d,g]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,d,{get(){return n.response&&n.response[g]}});return a}const gM=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function Fd(n="GET"){return gM.has(n.toUpperCase())}function vM(n){if(n===void 0)return!1;const e=typeof n;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(n)?!0:n.buffer?!1:n.constructor&&n.constructor.name==="Object"||typeof n.toJSON=="function"}const xM=new Set(["image/svg","application/xml","application/xhtml","application/html"]),yM=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function SM(n=""){if(!n)return"json";const e=n.split(";").shift()||"";return yM.test(e)?"json":xM.has(e)||e.startsWith("text/")?"text":"blob"}function MM(n,e,t=globalThis.Headers){const i={...e,...n};if(e!=null&&e.params&&(n!=null&&n.params)&&(i.params={...e==null?void 0:e.params,...n==null?void 0:n.params}),e!=null&&e.query&&(n!=null&&n.query)&&(i.query={...e==null?void 0:e.query,...n==null?void 0:n.query}),e!=null&&e.headers&&(n!=null&&n.headers)){i.headers=new t((e==null?void 0:e.headers)||{});for(const[r,s]of new t((n==null?void 0:n.headers)||{}))i.headers.set(r,s)}return i}const EM=new Set([408,409,425,429,500,502,503,504]),bM=new Set([101,204,205,304]);function Lg(n={}){const{fetch:e=globalThis.fetch,Headers:t=globalThis.Headers,AbortController:i=globalThis.AbortController}=n;async function r(a){const l=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!l){let u;typeof a.options.retry=="number"?u=a.options.retry:u=Fd(a.options.method)?0:1;const f=a.response&&a.response.status||500;if(u>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(f):EM.has(f))){const h=a.options.retryDelay||0;return h>0&&await new Promise(d=>setTimeout(d,h)),s(a.request,{...a.options,retry:u-1,timeout:a.options.timeout})}}const c=_M(a);throw Error.captureStackTrace&&Error.captureStackTrace(c,s),c}const s=async function(l,c={}){var h;const u={request:l,options:MM(c,n.defaults,t),response:void 0,error:void 0};if(u.options.method=(h=u.options.method)==null?void 0:h.toUpperCase(),u.options.onRequest&&await u.options.onRequest(u),typeof u.request=="string"&&(u.options.baseURL&&(u.request=nM(u.request,u.options.baseURL)),(u.options.query||u.options.params)&&(u.request=Rg(u.request,{...u.options.params,...u.options.query}))),u.options.body&&Fd(u.options.method)&&(vM(u.options.body)?(u.options.body=typeof u.options.body=="string"?u.options.body:JSON.stringify(u.options.body),u.options.headers=new t(u.options.headers||{}),u.options.headers.has("content-type")||u.options.headers.set("content-type","application/json"),u.options.headers.has("accept")||u.options.headers.set("accept","application/json")):("pipeTo"in u.options.body&&typeof u.options.body.pipeTo=="function"||typeof u.options.body.pipe=="function")&&("duplex"in u.options||(u.options.duplex="half"))),!u.options.signal&&u.options.timeout){const d=new i;setTimeout(()=>d.abort(),u.options.timeout),u.options.signal=d.signal}try{u.response=await e(u.request,u.options)}catch(d){return u.error=d,u.options.onRequestError&&await u.options.onRequestError(u),await r(u)}if(u.response.body&&!bM.has(u.response.status)&&u.options.method!=="HEAD"){const d=(u.options.parseResponse?"json":u.options.responseType)||SM(u.response.headers.get("content-type")||"");switch(d){case"json":{const g=await u.response.text(),_=u.options.parseResponse||Cl;u.response._data=_(g);break}case"stream":{u.response._data=u.response.body;break}default:u.response._data=await u.response[d]()}}return u.options.onResponse&&await u.options.onResponse(u),!u.options.ignoreResponseError&&u.response.status>=400&&u.response.status<600?(u.options.onResponseError&&await u.options.onResponseError(u),await r(u)):u.response},o=async function(l,c){return(await s(l,c))._data};return o.raw=s,o.native=(...a)=>e(...a),o.create=(a={})=>Lg({...n,defaults:{...n.defaults,...a}}),o}const uh=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),TM=uh.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),wM=uh.Headers,AM=uh.AbortController,RM=Lg({fetch:TM,Headers:wM,AbortController:AM}),CM=RM;globalThis.$fetch||(globalThis.$fetch=CM.create({baseURL:lM()}));function Yu(n,e={},t){for(const i in n){const r=n[i],s=t?`${t}:${i}`:i;typeof r=="object"&&r!==null?Yu(r,e,s):typeof r=="function"&&(e[s]=r)}return e}const PM={run:n=>n()},LM=()=>PM,Dg=typeof console.createTask<"u"?console.createTask:LM;function DM(n,e){const t=e.shift(),i=Dg(t);return n.reduce((r,s)=>r.then(()=>i.run(()=>s(...e))),Promise.resolve())}function IM(n,e){const t=e.shift(),i=Dg(t);return Promise.all(n.map(r=>i.run(()=>r(...e))))}function Oc(n,e){for(const t of[...n])t(e)}class UM{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,t,i={}){if(!e||typeof t!="function")return()=>{};const r=e;let s;for(;this._deprecatedHooks[e];)s=this._deprecatedHooks[e],e=s.to;if(s&&!i.allowDeprecated){let o=s.message;o||(o=`${r} hook has been deprecated`+(s.to?`, please use ${s.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(o)||(console.warn(o),this._deprecatedMessages.add(o))}if(!t.name)try{Object.defineProperty(t,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&(this.removeHook(e,t),t=void 0)}}hookOnce(e,t){let i,r=(...s)=>(typeof i=="function"&&i(),i=void 0,r=void 0,t(...s));return i=this.hook(e,r),i}removeHook(e,t){if(this._hooks[e]){const i=this._hooks[e].indexOf(t);i!==-1&&this._hooks[e].splice(i,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,t){this._deprecatedHooks[e]=typeof t=="string"?{to:t}:t;const i=this._hooks[e]||[];delete this._hooks[e];for(const r of i)this.hook(e,r)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const t in e)this.deprecateHook(t,e[t])}addHooks(e){const t=Yu(e),i=Object.keys(t).map(r=>this.hook(r,t[r]));return()=>{for(const r of i.splice(0,i.length))r()}}removeHooks(e){const t=Yu(e);for(const i in t)this.removeHook(i,t[i])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...t){return t.unshift(e),this.callHookWith(DM,e,...t)}callHookParallel(e,...t){return t.unshift(e),this.callHookWith(IM,e,...t)}callHookWith(e,t,...i){const r=this._before||this._after?{name:t,args:i,context:{}}:void 0;this._before&&Oc(this._before,r);const s=e(t in this._hooks?[...this._hooks[t]]:[],i);return s instanceof Promise?s.finally(()=>{this._after&&r&&Oc(this._after,r)}):(this._after&&r&&Oc(this._after,r),s)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const t=this._before.indexOf(e);t!==-1&&this._before.splice(t,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const t=this._after.indexOf(e);t!==-1&&this._after.splice(t,1)}}}}function Ig(){return new UM}function NM(n={}){let e,t=!1;const i=o=>{if(e&&e!==o)throw new Error("Context conflict")};let r;if(n.asyncContext){const o=n.AsyncLocalStorage||globalThis.AsyncLocalStorage;o?r=new o:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}const s=()=>{if(r&&e===void 0){const o=r.getStore();if(o!==void 0)return o}return e};return{use:()=>{const o=s();if(o===void 0)throw new Error("Context is not available");return o},tryUse:()=>s(),set:(o,a)=>{a||i(o),e=o,t=!0},unset:()=>{e=void 0,t=!1},call:(o,a)=>{i(o),e=o;try{return r?r.run(o,a):a()}finally{t||(e=void 0)}},async callAsync(o,a){e=o;const l=()=>{e=o},c=()=>e===o?l:void 0;Ku.add(c);try{const u=r?r.run(o,a):a();return t||(e=void 0),await u}finally{Ku.delete(c)}}}}function OM(n={}){const e={};return{get(t,i={}){return e[t]||(e[t]=NM({...n,...i})),e[t],e[t]}}}const Pl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},Bd="__unctx__",FM=Pl[Bd]||(Pl[Bd]=OM()),BM=(n,e={})=>FM.get(n,e),kd="__unctx_async_handlers__",Ku=Pl[kd]||(Pl[kd]=new Set);function Ko(n){const e=[];for(const r of Ku){const s=r();s&&e.push(s)}const t=()=>{for(const r of e)r()};let i=n();return i&&typeof i=="object"&&"catch"in i&&(i=i.catch(r=>{throw t(),r})),[i,t]}const Ug=BM("nuxt-app",{asyncContext:!1}),kM="__nuxt_plugin";function zM(n){let e=0;const t={_scope:Sx(),provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.9.1"},get vue(){return t.vueApp.version}},payload:Li({data:{},state:{},once:new Set,_errors:{},...window.__NUXT__??{}}),static:{data:{}},runWithContext:r=>t._scope.run(()=>GM(t,r)),isHydrating:!0,deferHydration(){if(!t.isHydrating)return()=>{};e++;let r=!1;return()=>{if(!r&&(r=!0,e--,e===0))return t.isHydrating=!1,t.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:{},_payloadRevivers:{},...n};t.hooks=Ig(),t.hook=t.hooks.hook,t.callHook=t.hooks.callHook,t.provide=(r,s)=>{const o="$"+r;Ia(t,o,s),Ia(t.vueApp.config.globalProperties,o,s)},Ia(t.vueApp,"$nuxt",t),Ia(t.vueApp.config.globalProperties,"$nuxt",t);{window.addEventListener("nuxt.preloadError",s=>{t.callHook("app:chunkError",{error:s.payload})}),window.useNuxtApp=window.useNuxtApp||st;const r=t.hook("app:error",(...s)=>{console.error("[nuxt] error caught during app initialization",...s)});t.hook("app:mounted",r)}const i=Li(t.payload.config);return t.provide("config",i),t}async function HM(n,e){if(e.hooks&&n.hooks.addHooks(e.hooks),typeof e=="function"){const{provide:t}=await n.runWithContext(()=>e(n))||{};if(t&&typeof t=="object")for(const i in t)n.provide(i,t[i])}}async function VM(n,e){const t=[],i=[],r=[],s=[];let o=0;async function a(l){if(l.dependsOn&&!l.dependsOn.every(c=>t.includes(c)))i.push([new Set(l.dependsOn),l]);else{const c=HM(n,l).then(async()=>{l._name&&(t.push(l._name),await Promise.all(i.map(async([u,f])=>{u.has(l._name)&&(u.delete(l._name),u.size===0&&(o++,await a(f)))})))});l.parallel?r.push(c.catch(u=>s.push(u))):await c}}for(const l of e)await a(l);if(await Promise.all(r),o)for(let l=0;l<o;l++)await Promise.all(r);if(s.length)throw s[0]}function Mr(n){if(typeof n=="function")return n;const e=n._name||n.name;return delete n.name,Object.assign(n.setup||(()=>{}),n,{[kM]:!0,_name:e})}function GM(n,e,t){const i=()=>t?e(...t):e();return Ug.set(n),n.vueApp.runWithContext(i)}function st(){var e;let n;if(ng()&&(n=(e=tc())==null?void 0:e.appContext.app.$nuxt),n=n||Ug.tryUse(),!n)throw new Error("[nuxt] instance unavailable");return n}function ma(){return st().$config}function Ia(n,e,t){Object.defineProperty(n,e,{get:()=>t})}const WM="modulepreload",XM=function(n,e){return n[0]==="."?new URL(n,e).href:n},zd={},jM=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){const s=document.getElementsByTagName("link");r=Promise.all(t.map(o=>{if(o=XM(o,i),o in zd)return;zd[o]=!0;const a=o.endsWith(".css"),l=a?'[rel="stylesheet"]':"";if(!!i)for(let f=s.length-1;f>=0;f--){const h=s[f];if(h.href===o&&(!a||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":WM,a||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),a)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${o}`)))})}))}return r.then(()=>e()).catch(s=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s})},oi=(...n)=>jM(...n).catch(e=>{const t=new Event("nuxt.preloadError");throw t.payload=e,window.dispatchEvent(t),e}),qM=-1,$M=-2,YM=-3,KM=-4,ZM=-5,JM=-6;function QM(n,e){return eE(JSON.parse(n),e)}function eE(n,e){if(typeof n=="number")return r(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const t=n,i=Array(t.length);function r(s,o=!1){if(s===qM)return;if(s===YM)return NaN;if(s===KM)return 1/0;if(s===ZM)return-1/0;if(s===JM)return-0;if(o)throw new Error("Invalid input");if(s in i)return i[s];const a=t[s];if(!a||typeof a!="object")i[s]=a;else if(Array.isArray(a))if(typeof a[0]=="string"){const l=a[0],c=e==null?void 0:e[l];if(c)return i[s]=c(r(a[1]));switch(l){case"Date":i[s]=new Date(a[1]);break;case"Set":const u=new Set;i[s]=u;for(let d=1;d<a.length;d+=1)u.add(r(a[d]));break;case"Map":const f=new Map;i[s]=f;for(let d=1;d<a.length;d+=2)f.set(r(a[d]),r(a[d+1]));break;case"RegExp":i[s]=new RegExp(a[1],a[2]);break;case"Object":i[s]=Object(a[1]);break;case"BigInt":i[s]=BigInt(a[1]);break;case"null":const h=Object.create(null);i[s]=h;for(let d=1;d<a.length;d+=2)h[a[d]]=r(a[d+1]);break;default:throw new Error(`Unknown type ${l}`)}}else{const l=new Array(a.length);i[s]=l;for(let c=0;c<a.length;c+=1){const u=a[c];u!==$M&&(l[c]=r(u))}}else{const l={};i[s]=l;for(const c in a){const u=a[c];l[c]=r(u)}}return i[s]}return r(0)}function tE(n){return Array.isArray(n)?n:[n]}const nE=["title","titleTemplate","script","style","noscript"],ul=["base","meta","link","style","script","noscript"],iE=["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"],rE=["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"],Ng=["tagPosition","tagPriority","tagDuplicateStrategy","children","innerHTML","textContent","processTemplateParams"],sE=typeof window<"u";function fh(n){let e=9;for(let t=0;t<n.length;)e=Math.imul(e^n.charCodeAt(t++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function Hd(n){return n._h||fh(n._d?n._d:`${n.tag}:${n.textContent||n.innerHTML||""}:${Object.entries(n.props).map(([e,t])=>`${e}:${String(t)}`).join(",")}`)}function Og(n,e){const{props:t,tag:i}=n;if(rE.includes(i))return i;if(i==="link"&&t.rel==="canonical")return"canonical";if(t.charset)return"charset";const r=["id"];i==="meta"&&r.push("name","property","http-equiv");for(const s of r)if(typeof t[s]<"u"){const o=String(t[s]);return e&&!e(o)?!1:`${i}:${s}:${o}`}return!1}function Vd(n,e){return n==null?e||null:typeof n=="function"?n(e):n}async function oE(n,e,t){const i={tag:n,props:await Fg(typeof e=="object"&&typeof e!="function"&&!(e instanceof Promise)?{...e}:{[["script","noscript","style"].includes(n)?"innerHTML":"textContent"]:e},["templateParams","titleTemplate"].includes(n))};return Ng.forEach(r=>{const s=typeof i.props[r]<"u"?i.props[r]:t[r];typeof s<"u"&&((!["innerHTML","textContent","children"].includes(r)||nE.includes(i.tag))&&(i[r==="children"?"innerHTML":r]=s),delete i.props[r])}),i.props.body&&(i.tagPosition="bodyClose",delete i.props.body),i.tag==="script"&&typeof i.innerHTML=="object"&&(i.innerHTML=JSON.stringify(i.innerHTML),i.props.type=i.props.type||"application/json"),Array.isArray(i.props.content)?i.props.content.map(r=>({...i,props:{...i.props,content:r}})):i}function aE(n){return typeof n=="object"&&!Array.isArray(n)&&(n=Object.keys(n).filter(e=>n[e])),(Array.isArray(n)?n.join(" "):n).split(" ").filter(e=>e.trim()).filter(Boolean).join(" ")}async function Fg(n,e){for(const t of Object.keys(n)){if(t==="class"){n[t]=aE(n[t]);continue}if(n[t]instanceof Promise&&(n[t]=await n[t]),!e&&!Ng.includes(t)){const i=String(n[t]),r=t.startsWith("data-");i==="true"||i===""?n[t]=r?"true":!0:n[t]||(r&&i==="false"?n[t]="false":delete n[t])}}return n}const lE=10;async function cE(n){const e=[];return Object.entries(n.resolvedInput).filter(([t,i])=>typeof i<"u"&&iE.includes(t)).forEach(([t,i])=>{const r=tE(i);e.push(...r.map(s=>oE(t,s,n)).flat())}),(await Promise.all(e)).flat().filter(Boolean).map((t,i)=>(t._e=n._i,n.mode&&(t._m=n.mode),t._p=(n._i<<lE)+i,t))}const Gd={base:-10,title:10},Wd={critical:-80,high:-10,low:20};function Ll(n){let e=100;const t=n.tagPriority;return typeof t=="number"?t:(n.tag==="meta"?(n.props["http-equiv"]==="content-security-policy"&&(e=-30),n.props.charset&&(e=-20),n.props.name==="viewport"&&(e=-15)):n.tag==="link"&&n.props.rel==="preconnect"?e=20:n.tag in Gd&&(e=Gd[n.tag]),typeof t=="string"&&t in Wd?e+Wd[t]:e)}const uE=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}],Bg=["onload","onerror","onabort","onprogress","onloadstart"],Wi="%separator";function fl(n,e,t){if(typeof n!="string"||!n.includes("%"))return n;function i(o){let a;return["s","pageTitle"].includes(o)?a=e.pageTitle:o.includes(".")?a=o.split(".").reduce((l,c)=>l&&l[c]||void 0,e):a=e[o],typeof a<"u"?(a||"").replace(/"/g,'\\"'):!1}let r=n;try{r=decodeURI(n)}catch{}return(r.match(/%(\w+\.+\w+)|%(\w+)/g)||[]).sort().reverse().forEach(o=>{const a=i(o.slice(1));typeof a=="string"&&(n=n.replace(new RegExp(`\\${o}(\\W|$)`,"g"),(l,c)=>`${a}${c}`).trim())}),n.includes(Wi)&&(n.endsWith(Wi)&&(n=n.slice(0,-Wi.length).trim()),n.startsWith(Wi)&&(n=n.slice(Wi.length).trim()),n=n.replace(new RegExp(`\\${Wi}\\s*\\${Wi}`,"g"),Wi),n=fl(n,{separator:t},t)),n}async function fE(n){const e={tag:n.tagName.toLowerCase(),props:await Fg(n.getAttributeNames().reduce((t,i)=>({...t,[i]:n.getAttribute(i)}),{})),innerHTML:n.innerHTML};return e._d=Og(e),e}async function kg(n,e={}){var u;const t=e.document||n.resolvedOptions.document;if(!t)return;const i={shouldRender:n.dirty,tags:[]};if(await n.hooks.callHook("dom:beforeRender",i),!i.shouldRender)return;const r=(await n.resolveTags()).map(f=>({tag:f,id:ul.includes(f.tag)?Hd(f):f.tag,shouldRender:!0}));let s=n._dom;if(!s){s={elMap:{htmlAttrs:t.documentElement,bodyAttrs:t.body}};for(const f of["body","head"]){const h=(u=t==null?void 0:t[f])==null?void 0:u.children;for(const d of[...h].filter(g=>ul.includes(g.tagName.toLowerCase())))s.elMap[d.getAttribute("data-hid")||Hd(await fE(d))]=d}}s.pendingSideEffects={...s.sideEffects||{}},s.sideEffects={};function o(f,h,d){const g=`${f}:${h}`;s.sideEffects[g]=d,delete s.pendingSideEffects[g]}function a({id:f,$el:h,tag:d}){const g=d.tag.endsWith("Attrs");s.elMap[f]=h,g||(["textContent","innerHTML"].forEach(_=>{d[_]&&d[_]!==h[_]&&(h[_]=d[_])}),o(f,"el",()=>{s.elMap[f].remove(),delete s.elMap[f]})),Object.entries(d.props).forEach(([_,m])=>{const p=`attr:${_}`;if(_==="class")for(const x of(m||"").split(" ").filter(Boolean))g&&o(f,`${p}:${x}`,()=>h.classList.remove(x)),!h.classList.contains(x)&&h.classList.add(x);else h.getAttribute(_)!==m&&h.setAttribute(_,m===!0?"":String(m)),g&&o(f,p,()=>h.removeAttribute(_))})}const l=[],c={bodyClose:void 0,bodyOpen:void 0,head:void 0};for(const f of r){const{tag:h,shouldRender:d,id:g}=f;if(d){if(h.tag==="title"){t.title=h.textContent;continue}f.$el=f.$el||s.elMap[g],f.$el?a(f):ul.includes(h.tag)&&l.push(f)}}for(const f of l){const h=f.tag.tagPosition||"head";f.$el=t.createElement(f.tag.tag),a(f),c[h]=c[h]||t.createDocumentFragment(),c[h].appendChild(f.$el)}for(const f of r)await n.hooks.callHook("dom:renderTag",f,t,o);c.head&&t.head.appendChild(c.head),c.bodyOpen&&t.body.insertBefore(c.bodyOpen,t.body.firstChild),c.bodyClose&&t.body.appendChild(c.bodyClose),Object.values(s.pendingSideEffects).forEach(f=>f()),n._dom=s,n.dirty=!1,await n.hooks.callHook("dom:rendered",{renders:r})}async function hE(n,e={}){const t=e.delayFn||(i=>setTimeout(i,10));return n._domUpdatePromise=n._domUpdatePromise||new Promise(i=>t(async()=>{await kg(n,e),delete n._domUpdatePromise,i()}))}function dE(n){return e=>{var i,r;const t=((r=(i=e.resolvedOptions.document)==null?void 0:i.head.querySelector('script[id="unhead:payload"]'))==null?void 0:r.innerHTML)||!1;return t&&e.push(JSON.parse(t)),{mode:"client",hooks:{"entries:updated":function(s){hE(s,n)}}}}}const pE=["templateParams","htmlAttrs","bodyAttrs"],mE={hooks:{"tag:normalise":function({tag:n}){["hid","vmid","key"].forEach(i=>{n.props[i]&&(n.key=n.props[i],delete n.props[i])});const t=Og(n)||(n.key?`${n.tag}:${n.key}`:!1);t&&(n._d=t)},"tags:resolve":function(n){const e={};n.tags.forEach(i=>{const r=(i.key?`${i.tag}:${i.key}`:i._d)||i._p,s=e[r];if(s){let a=i==null?void 0:i.tagDuplicateStrategy;if(!a&&pE.includes(i.tag)&&(a="merge"),a==="merge"){const l=s.props;["class","style"].forEach(c=>{l[c]&&(i.props[c]?(c==="style"&&!l[c].endsWith(";")&&(l[c]+=";"),i.props[c]=`${l[c]} ${i.props[c]}`):i.props[c]=l[c])}),e[r].props={...l,...i.props};return}else if(i._e===s._e){s._duped=s._duped||[],i._d=`${s._d}:${s._duped.length+1}`,s._duped.push(i);return}else if(Ll(i)>Ll(s))return}const o=Object.keys(i.props).length+(i.innerHTML?1:0)+(i.textContent?1:0);if(ul.includes(i.tag)&&o===0){delete e[r];return}e[r]=i});const t=[];Object.values(e).forEach(i=>{const r=i._duped;delete i._duped,t.push(i),r&&t.push(...r)}),n.tags=t,n.tags=n.tags.filter(i=>!(i.tag==="meta"&&(i.props.name||i.props.property)&&!i.props.content))}}},_E={mode:"server",hooks:{"tags:resolve":function(n){const e={};n.tags.filter(t=>["titleTemplate","templateParams","title"].includes(t.tag)&&t._m==="server").forEach(t=>{e[t.tag]=t.tag.startsWith("title")?t.textContent:t.props}),Object.keys(e).length&&n.tags.push({tag:"script",innerHTML:JSON.stringify(e),props:{id:"unhead:payload",type:"application/json"}})}}},gE=["script","link","bodyAttrs"];function vE(n){const e={},t={};return Object.entries(n.props).forEach(([i,r])=>{i.startsWith("on")&&typeof r=="function"?(Bg.includes(i)&&(e[i]=`this.dataset.${i} = true`),t[i]=r):e[i]=r}),{props:e,eventHandlers:t}}const xE=n=>({hooks:{"tags:resolve":function(e){for(const t of e.tags)if(gE.includes(t.tag)){const{props:i,eventHandlers:r}=vE(t);t.props=i,Object.keys(r).length&&((t.props.src||t.props.href)&&(t.key=t.key||fh(t.props.src||t.props.href)),t._eventHandlers=r)}},"dom:renderTag":function(e,t,i){if(!e.tag._eventHandlers)return;const r=e.tag.tag==="bodyAttrs"?t.defaultView:e.$el;Object.entries(e.tag._eventHandlers).forEach(([s,o])=>{const a=`${e.tag._d||e.tag._p}:${s}`,l=s.slice(2).toLowerCase(),c=`data-h-${l}`;if(i(e.id,a,()=>{}),e.$el.hasAttribute(c))return;e.$el.setAttribute(c,"");let u;const f=h=>{o(h),u==null||u.disconnect()};s in e.$el.dataset?f(new Event(s.replace("on",""))):Bg.includes(s)&&typeof MutationObserver<"u"?(u=new MutationObserver(h=>{h.some(g=>g.attributeName===`data-${s}`)&&(f(new Event(s.replace("on",""))),u==null||u.disconnect())}),u.observe(e.$el,{attributes:!0})):r.addEventListener(l,f),i(e.id,a,()=>{u==null||u.disconnect(),r.removeEventListener(l,f),e.$el.removeAttribute(c)})})}}}),yE=["link","style","script","noscript"],SE={hooks:{"tag:normalise":({tag:n})=>{n.key&&yE.includes(n.tag)&&(n.props["data-hid"]=n._h=fh(n.key))}}},ME={hooks:{"tags:resolve":n=>{const e=t=>{var i;return(i=n.tags.find(r=>r._d===t))==null?void 0:i._p};for(const{prefix:t,offset:i}of uE)for(const r of n.tags.filter(s=>typeof s.tagPriority=="string"&&s.tagPriority.startsWith(t))){const s=e(r.tagPriority.replace(t,""));typeof s<"u"&&(r._p=s+i)}n.tags.sort((t,i)=>t._p-i._p).sort((t,i)=>Ll(t)-Ll(i))}}},EE={meta:"content",link:"href",htmlAttrs:"lang"},bE=n=>({hooks:{"tags:resolve":e=>{var a;const{tags:t}=e,i=(a=t.find(l=>l.tag==="title"))==null?void 0:a.textContent,r=t.findIndex(l=>l.tag==="templateParams"),s=r!==-1?t[r].props:{},o=s.separator||"|";delete s.separator,s.pageTitle=fl(s.pageTitle||i||"",s,o);for(const l of t.filter(c=>c.processTemplateParams!==!1)){const c=EE[l.tag];c&&typeof l.props[c]=="string"?l.props[c]=fl(l.props[c],s,o):(l.processTemplateParams===!0||["titleTemplate","title"].includes(l.tag))&&["innerHTML","textContent"].forEach(u=>{typeof l[u]=="string"&&(l[u]=fl(l[u],s,o))})}n._templateParams=s,n._separator=o,e.tags=t.filter(l=>l.tag!=="templateParams")}}}),TE={hooks:{"tags:resolve":n=>{const{tags:e}=n;let t=e.findIndex(r=>r.tag==="titleTemplate");const i=e.findIndex(r=>r.tag==="title");if(i!==-1&&t!==-1){const r=Vd(e[t].textContent,e[i].textContent);r!==null?e[i].textContent=r||e[i].textContent:delete e[i]}else if(t!==-1){const r=Vd(e[t].textContent);r!==null&&(e[t].textContent=r,e[t].tag="title",t=-1)}t!==-1&&delete e[t],n.tags=e.filter(Boolean)}}},wE={hooks:{"tags:afterResolve":function(n){for(const e of n.tags)typeof e.innerHTML=="string"&&(e.innerHTML&&["application/ld+json","application/json"].includes(e.props.type)?e.innerHTML=e.innerHTML.replace(/</g,"\\u003C"):e.innerHTML=e.innerHTML.replace(new RegExp(`</${e.tag}`,"g"),`<\\/${e.tag}`))}}};let zg;function AE(n={}){const e=RE(n);return e.use(dE()),zg=e}function Xd(n,e){return!n||n==="server"&&e||n==="client"&&!e}function RE(n={}){const e=Ig();e.addHooks(n.hooks||{}),n.document=n.document||(sE?document:void 0);const t=!n.document,i=()=>{a.dirty=!0,e.callHook("entries:updated",a)};let r=0,s=[];const o=[],a={plugins:o,dirty:!1,resolvedOptions:n,hooks:e,headEntries(){return s},use(l){const c=typeof l=="function"?l(a):l;(!c.key||!o.some(u=>u.key===c.key))&&(o.push(c),Xd(c.mode,t)&&e.addHooks(c.hooks||{}))},push(l,c){c==null||delete c.head;const u={_i:r++,input:l,...c};return Xd(u.mode,t)&&(s.push(u),i()),{dispose(){s=s.filter(f=>f._i!==u._i),e.callHook("entries:updated",a),i()},patch(f){s=s.map(h=>(h._i===u._i&&(h.input=u.input=f),h)),i()}}},async resolveTags(){const l={tags:[],entries:[...s]};await e.callHook("entries:resolve",l);for(const c of l.entries){const u=c.resolvedInput||c.input;if(c.resolvedInput=await(c.transform?c.transform(u):u),c.resolvedInput)for(const f of await cE(c)){const h={tag:f,entry:c,resolvedOptions:a.resolvedOptions};await e.callHook("tag:normalise",h),l.tags.push(h.tag)}}return await e.callHook("tags:beforeResolve",l),await e.callHook("tags:resolve",l),await e.callHook("tags:afterResolve",l),l.tags},ssr:t};return[mE,_E,xE,SE,ME,bE,TE,wE,...(n==null?void 0:n.plugins)||[]].forEach(l=>a.use(l)),a.hooks.callHook("init",a),a}function CE(){return zg}const PE=vg.startsWith("3");function LE(n){return typeof n=="function"?n():ht(n)}function Dl(n,e=""){if(n instanceof Promise)return n;const t=LE(n);return!n||!t?t:Array.isArray(t)?t.map(i=>Dl(i,e)):typeof t=="object"?Object.fromEntries(Object.entries(t).map(([i,r])=>i==="titleTemplate"||i.startsWith("on")?[i,ht(r)]:[i,Dl(r,i)])):t}const DE={hooks:{"entries:resolve":function(n){for(const e of n.entries)e.resolvedInput=Dl(e.input)}}},Hg="usehead";function IE(n){return{install(t){PE&&(t.config.globalProperties.$unhead=n,t.config.globalProperties.$head=n,t.provide(Hg,n))}}.install}function UE(n={}){n.domDelayFn=n.domDelayFn||(t=>Sr(()=>setTimeout(()=>t(),0)));const e=AE(n);return e.use(DE),e.install=IE(e),e}const Zu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ju="__unhead_injection_handler__";function NE(n){Zu[Ju]=n}function OE(){if(Ju in Zu)return Zu[Ju]();const n=sn(Hg);return n||CE()}function FE(n,e={}){const t=e.head||OE();if(t)return t.ssr?t.push(n,e):BE(t,n,e)}function BE(n,e,t={}){const i=At(!1),r=At({});my(()=>{r.value=i.value?{}:Dl(e)});const s=n.push(r.value,t);return jr(r,a=>{s.patch(a)}),tc()&&(da(()=>{s.dispose()}),th(()=>{i.value=!0}),eh(()=>{i.value=!1})),s}function kE(n){return{ctx:{table:n},matchAll:e=>Gg(e,n)}}function Vg(n){const e={};for(const t in n)e[t]=t==="dynamic"?new Map(Object.entries(n[t]).map(([i,r])=>[i,Vg(r)])):new Map(Object.entries(n[t]));return e}function zE(n){return kE(Vg(n))}function Gg(n,e){const t=[];for(const[r,s]of jd(e.wildcard))n.startsWith(r)&&t.push(s);for(const[r,s]of jd(e.dynamic))if(n.startsWith(r+"/")){const o="/"+n.slice(r.length).split("/").splice(2).join("/");t.push(...Gg(o,s))}const i=e.static.get(n);return i&&t.push(i),t.filter(Boolean)}function jd(n){return[...n.entries()].sort((e,t)=>e[0].length-t[0].length)}function Fc(n){if(n===null||typeof n!="object")return!1;const e=Object.getPrototypeOf(n);return e!==null&&e!==Object.prototype&&Object.getPrototypeOf(e)!==null||Symbol.iterator in n?!1:Symbol.toStringTag in n?Object.prototype.toString.call(n)==="[object Module]":!0}function Qu(n,e,t=".",i){if(!Fc(e))return Qu(n,{},t,i);const r=Object.assign({},e);for(const s in n){if(s==="__proto__"||s==="constructor")continue;const o=n[s];o!=null&&(i&&i(r,s,o,t)||(Array.isArray(o)&&Array.isArray(r[s])?r[s]=[...o,...r[s]]:Fc(o)&&Fc(r[s])?r[s]=Qu(o,r[s],(t?`${t}.`:"")+s.toString(),i):r[s]=o))}return r}function Wg(n){return(...e)=>e.reduce((t,i)=>Qu(t,i,"",n),{})}const sc=Wg(),HE=Wg((n,e,t)=>{if(n[e]!==void 0&&typeof t=="function")return n[e]=t(n[e]),!0});function VE(n,e){try{return e in n}catch{return!1}}var GE=Object.defineProperty,WE=(n,e,t)=>e in n?GE(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Or=(n,e,t)=>(WE(n,typeof e!="symbol"?e+"":e,t),t);class ef extends Error{constructor(e,t={}){super(e,t),Or(this,"statusCode",500),Or(this,"fatal",!1),Or(this,"unhandled",!1),Or(this,"statusMessage"),Or(this,"data"),Or(this,"cause"),t.cause&&!this.cause&&(this.cause=t.cause)}toJSON(){const e={message:this.message,statusCode:nf(this.statusCode,500)};return this.statusMessage&&(e.statusMessage=Xg(this.statusMessage)),this.data!==void 0&&(e.data=this.data),e}}Or(ef,"__h3_error__",!0);function tf(n){if(typeof n=="string")return new ef(n);if(XE(n))return n;const e=new ef(n.message??n.statusMessage??"",{cause:n.cause||n});if(VE(n,"stack"))try{Object.defineProperty(e,"stack",{get(){return n.stack}})}catch{try{e.stack=n.stack}catch{}}if(n.data&&(e.data=n.data),n.statusCode?e.statusCode=nf(n.statusCode,e.statusCode):n.status&&(e.statusCode=nf(n.status,e.statusCode)),n.statusMessage?e.statusMessage=n.statusMessage:n.statusText&&(e.statusMessage=n.statusText),e.statusMessage){const t=e.statusMessage;Xg(e.statusMessage)!==t&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return n.fatal!==void 0&&(e.fatal=n.fatal),n.unhandled!==void 0&&(e.unhandled=n.unhandled),e}function XE(n){var e;return((e=n==null?void 0:n.constructor)==null?void 0:e.__h3_error__)===!0}const jE=/[^\u0009\u0020-\u007E]/g;function Xg(n=""){return n.replace(jE,"")}function nf(n,e=200){return!n||(typeof n=="string"&&(n=Number.parseInt(n,10)),n<100||n>999)?e:n}const qE=Symbol("layout-meta"),oc=Symbol("route"),jg="__nuxt_error",ac=()=>U_(st().payload,"error"),Ls=n=>{const e=hh(n);try{const t=st(),i=ac();t.hooks.callHook("app:error",e),i.value=i.value||e}catch{throw e}return e},$E=async(n={})=>{const e=st(),t=ac();e.callHook("app:error:cleared",n),n.redirect&&await Pn().replace(n.redirect),t.value=null},YE=n=>!!n&&typeof n=="object"&&jg in n,hh=n=>{const e=tf(n);return Object.defineProperty(e,jg,{value:!0,configurable:!1,writable:!1}),e},Pn=()=>{var n;return(n=st())==null?void 0:n.$router},Er=()=>ng()?sn(oc,st()._route):st()._route;const KE=()=>{try{if(st()._processingMiddleware)return!0}catch{return!0}return!1},ZE=(n,e)=>{n||(n="/");const t=typeof n=="string"?n:Rg(n.path||"/",n.query||{})+(n.hash||"");if(e!=null&&e.open){{const{target:a="_blank",windowFeatures:l={}}=e.open,c=Object.entries(l).filter(([u,f])=>f!==void 0).map(([u,f])=>`${u.toLowerCase()}=${f}`).join(", ");open(t,a,c)}return Promise.resolve()}const i=(e==null?void 0:e.external)||Ii(t,{acceptRelative:!0});if(i){if(!(e!=null&&e.external))throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");const a=uo(t).protocol;if(a&&QS(a))throw new Error(`Cannot navigate to a URL with '${a}' protocol.`)}const r=KE();if(!i&&r)return n;const s=Pn(),o=st();return i?(o._scope.stop(),e!=null&&e.replace?location.replace(t):location.href=t,r?o.isHydrating?new Promise(()=>{}):!1:Promise.resolve()):e!=null&&e.replace?s.replace(n):s.push(n)},JE={nuxt:{buildId:"d517b7af-d1c1-405a-8c10-8e4e9009d0fa"}},QE=HE(JE);function eb(){const n=st();return n._appConfig||(n._appConfig=Li(QE)),n._appConfig}const rf=!1,tb=!1,nb={componentName:"NuxtLink"},ib="#__nuxt";let hl,qg;function rb(){var e;const n=(e=eb().nuxt)==null?void 0:e.buildId;return hl=$fetch(ch(`builds/meta/${n}.json`)),hl.then(t=>{qg=zE(t.matcher)}),hl}function lc(){return hl||rb()}async function $g(n){return await lc(),sc({},...qg.matchAll(n).reverse())}function qd(n,e={}){const t=sb(n,e),i=st(),r=i._payloadCache=i._payloadCache||{};return t in r||(r[t]=ob(n).then(s=>s?Yg(t).then(o=>o||(delete r[t],null)):(r[t]=null,null))),r[t]}const $d="json";function sb(n,e={}){const t=new URL(n,"http://localhost");if(t.search)throw new Error("Payload URL cannot contain search params: "+n);if(t.host!=="localhost"||Ii(t.pathname,{acceptRelative:!0}))throw new Error("Payload URL must not include hostname: "+n);const i=e.hash||(e.fresh?Date.now():"");return Ui(ma().app.baseURL,t.pathname,i?`_payload.${i}.${$d}`:`_payload.${$d}`)}async function Yg(n){const e=fetch(n).then(t=>t.text().then(Kg));try{return await e}catch(t){console.warn("[nuxt] Cannot load payload ",n,t)}return null}async function ob(n=Er().path){if(n=rc(n),(await lc()).prerendered.includes(n))return!0;const t=await $g(n);return!!t.prerender&&!t.redirect}let Ua=null;async function ab(){if(Ua)return Ua;const n=document.getElementById("__NUXT_DATA__");if(!n)return{};const e=Kg(n.textContent||""),t=n.dataset.src?await Yg(n.dataset.src):void 0;return Ua={...e,...t,...window.__NUXT__},Ua}function Kg(n){return QM(n,st()._payloadRevivers)}function lb(n,e){st()._payloadRevivers[n]=e}const Yd={NuxtError:n=>hh(n),EmptyShallowRef:n=>Wo(n==="_"?void 0:n==="0n"?BigInt(0):Cl(n)),EmptyRef:n=>At(n==="_"?void 0:n==="0n"?BigInt(0):Cl(n)),ShallowRef:n=>Wo(n),ShallowReactive:n=>ua(n),Ref:n=>At(n),Reactive:n=>Li(n)},cb=Mr({name:"nuxt:revive-payload:client",order:-30,async setup(n){let e,t;for(const i in Yd)lb(i,Yd[i]);Object.assign(n.payload,([e,t]=Ko(()=>n.runWithContext(ab)),e=await e,t(),e)),window.__NUXT__=n.payload}}),ub=[],fb=Mr({name:"nuxt:head",enforce:"pre",setup(n){const e=UE({plugins:ub});NE(()=>st().vueApp._context.provides.usehead),n.vueApp.use(e);{let t=!0;const i=async()=>{t=!1,await kg(e)};e.hooks.hook("dom:beforeRender",r=>{r.shouldRender=!t}),n.hooks.hook("page:start",()=>{t=!0}),n.hooks.hook("page:finish",()=>{n.isHydrating||i()}),n.hooks.hook("app:error",i),n.hooks.hook("app:suspense:resolve",i)}}});/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Cs=typeof window<"u";function hb(n){return n.__esModule||n[Symbol.toStringTag]==="Module"}const et=Object.assign;function Bc(n,e){const t={};for(const i in e){const r=e[i];t[i]=ii(r)?r.map(n):n(r)}return t}const No=()=>{},ii=Array.isArray,db=/\/$/,pb=n=>n.replace(db,"");function kc(n,e,t="/"){let i,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(i=e.slice(0,l),s=e.slice(l+1,a>-1?a:e.length),r=n(s)),a>-1&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=vb(i??e,t),{fullPath:i+(s&&"?")+s+o,path:i,query:r,hash:o}}function mb(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Kd(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function _b(n,e,t){const i=e.matched.length-1,r=t.matched.length-1;return i>-1&&i===r&&Ks(e.matched[i],t.matched[r])&&Zg(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Ks(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Zg(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!gb(n[t],e[t]))return!1;return!0}function gb(n,e){return ii(n)?Zd(n,e):ii(e)?Zd(e,n):n===e}function Zd(n,e){return ii(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function vb(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=t.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+i.slice(o-(o===i.length?1:0)).join("/")}var Zo;(function(n){n.pop="pop",n.push="push"})(Zo||(Zo={}));var Oo;(function(n){n.back="back",n.forward="forward",n.unknown=""})(Oo||(Oo={}));function xb(n){if(!n)if(Cs){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),pb(n)}const yb=/^[^#]+#/;function Sb(n,e){return n.replace(yb,"#")+e}function Mb(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const cc=()=>({left:window.pageXOffset,top:window.pageYOffset});function Eb(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=Mb(r,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function Jd(n,e){return(history.state?history.state.position-e:-1)+n}const sf=new Map;function bb(n,e){sf.set(n,e)}function Tb(n){const e=sf.get(n);return sf.delete(n),e}let wb=()=>location.protocol+"//"+location.host;function Jg(n,e){const{pathname:t,search:i,hash:r}=e,s=n.indexOf("#");if(s>-1){let a=r.includes(n.slice(s))?n.slice(s).length:1,l=r.slice(a);return l[0]!=="/"&&(l="/"+l),Kd(l,"")}return Kd(t,n)+i+r}function Ab(n,e,t,i){let r=[],s=[],o=null;const a=({state:h})=>{const d=Jg(n,location),g=t.value,_=e.value;let m=0;if(h){if(t.value=d,e.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(d);r.forEach(p=>{p(t.value,g,{delta:m,type:Zo.pop,direction:m?m>0?Oo.forward:Oo.back:Oo.unknown})})};function l(){o=t.value}function c(h){r.push(h);const d=()=>{const g=r.indexOf(h);g>-1&&r.splice(g,1)};return s.push(d),d}function u(){const{history:h}=window;h.state&&h.replaceState(et({},h.state,{scroll:cc()}),"")}function f(){for(const h of s)h();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function Qd(n,e,t,i=!1,r=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:r?cc():null}}function Rb(n){const{history:e,location:t}=window,i={value:Jg(n,t)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=n.indexOf("#"),h=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+l:wb()+n+l;try{e[u?"replaceState":"pushState"](c,"",h),r.value=c}catch(d){console.error(d),t[u?"replace":"assign"](h)}}function o(l,c){const u=et({},e.state,Qd(r.value.back,l,r.value.forward,!0),c,{position:r.value.position});s(l,u,!0),i.value=l}function a(l,c){const u=et({},r.value,e.state,{forward:l,scroll:cc()});s(u.current,u,!0);const f=et({},Qd(i.value,l,null),{position:u.position+1},c);s(l,f,!1),i.value=l}return{location:i,state:r,push:a,replace:o}}function Qg(n){n=xb(n);const e=Rb(n),t=Ab(n,e.state,e.location,e.replace);function i(s,o=!0){o||t.pauseListeners(),history.go(s)}const r=et({location:"",base:n,go:i,createHref:Sb.bind(null,n)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function Cb(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),Qg(n)}function Pb(n){return typeof n=="string"||n&&typeof n=="object"}function ev(n){return typeof n=="string"||typeof n=="symbol"}const Jn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},tv=Symbol("");var ep;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(ep||(ep={}));function Zs(n,e){return et(new Error,{type:n,[tv]:!0},e)}function xi(n,e){return n instanceof Error&&tv in n&&(e==null||!!(n.type&e))}const tp="[^/]+?",Lb={sensitive:!1,strict:!1,start:!0,end:!0},Db=/[.+*?^${}()[\]/\\]/g;function Ib(n,e){const t=et({},Lb,e),i=[];let r=t.start?"^":"";const s=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(r+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=40+(t.sensitive?.25:0);if(h.type===0)f||(r+="/"),r+=h.value.replace(Db,"\\$&"),d+=40;else if(h.type===1){const{value:g,repeatable:_,optional:m,regexp:p}=h;s.push({name:g,repeatable:_,optional:m});const x=p||tp;if(x!==tp){d+=10;try{new RegExp(`(${x})`)}catch(S){throw new Error(`Invalid custom RegExp for param "${g}" (${x}): `+S.message)}}let v=_?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;f||(v=m&&c.length<2?`(?:/${v})`:"/"+v),m&&(v+="?"),r+=v,d+=20,m&&(d+=-8),_&&(d+=-20),x===".*"&&(d+=-50)}u.push(d)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}t.strict||(r+="/?"),t.end?r+="$":t.strict&&(r+="(?:/|$)");const o=new RegExp(r,t.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=s[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===0)u+=d.value;else if(d.type===1){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(ii(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const x=ii(p)?p.join("/"):p;if(!x)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=x}}return u||"/"}return{re:o,score:i,keys:s,parse:a,stringify:l}}function Ub(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Nb(n,e){let t=0;const i=n.score,r=e.score;for(;t<i.length&&t<r.length;){const s=Ub(i[t],r[t]);if(s)return s;t++}if(Math.abs(r.length-i.length)===1){if(np(i))return 1;if(np(r))return-1}return r.length-i.length}function np(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Ob={type:0,value:""},Fb=/[a-zA-Z0-9_]/;function Bb(n){if(!n)return[[]];if(n==="/")return[[Ob]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(d){throw new Error(`ERR (${t})/"${c}": ${d}`)}let t=0,i=t;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(t===0?s.push({type:0,value:c}):t===1||t===2||t===3?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&t!==2){i=t,t=4;continue}switch(t){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),t=1):h();break;case 4:h(),t=i;break;case 1:l==="("?t=2:Fb.test(l)?h():(f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),r}function kb(n,e,t){const i=Ib(Bb(n.path),t),r=et(i,{record:n,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function zb(n,e){const t=[],i=new Map;e=sp({strict:!1,end:!0,sensitive:!1},e);function r(u){return i.get(u)}function s(u,f,h){const d=!h,g=Hb(u);g.aliasOf=h&&h.record;const _=sp(e,u),m=[g];if("alias"in u){const v=typeof u.alias=="string"?[u.alias]:u.alias;for(const S of v)m.push(et({},g,{components:h?h.record.components:g.components,path:S,aliasOf:h?h.record:g}))}let p,x;for(const v of m){const{path:S}=v;if(f&&S[0]!=="/"){const b=f.record.path,E=b[b.length-1]==="/"?"":"/";v.path=f.record.path+(S&&E+S)}if(p=kb(v,f,_),h?h.alias.push(p):(x=x||p,x!==p&&x.alias.push(p),d&&u.name&&!rp(p)&&o(u.name)),g.children){const b=g.children;for(let E=0;E<b.length;E++)s(b[E],p,h&&h.children[E])}h=h||p,(p.record.components&&Object.keys(p.record.components).length||p.record.name||p.record.redirect)&&l(p)}return x?()=>{o(x)}:No}function o(u){if(ev(u)){const f=i.get(u);f&&(i.delete(u),t.splice(t.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=t.indexOf(u);f>-1&&(t.splice(f,1),u.record.name&&i.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return t}function l(u){let f=0;for(;f<t.length&&Nb(u,t[f])>=0&&(u.record.path!==t[f].record.path||!nv(u,t[f]));)f++;t.splice(f,0,u),u.record.name&&!rp(u)&&i.set(u.record.name,u)}function c(u,f){let h,d={},g,_;if("name"in u&&u.name){if(h=i.get(u.name),!h)throw Zs(1,{location:u});_=h.record.name,d=et(ip(f.params,h.keys.filter(x=>!x.optional).map(x=>x.name)),u.params&&ip(u.params,h.keys.map(x=>x.name))),g=h.stringify(d)}else if("path"in u)g=u.path,h=t.find(x=>x.re.test(g)),h&&(d=h.parse(g),_=h.record.name);else{if(h=f.name?i.get(f.name):t.find(x=>x.re.test(f.path)),!h)throw Zs(1,{location:u,currentLocation:f});_=h.record.name,d=et({},f.params,u.params),g=h.stringify(d)}const m=[];let p=h;for(;p;)m.unshift(p.record),p=p.parent;return{name:_,path:g,params:d,matched:m,meta:Gb(m)}}return n.forEach(u=>s(u)),{addRoute:s,resolve:c,removeRoute:o,getRoutes:a,getRecordMatcher:r}}function ip(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function Hb(n){return{path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:void 0,beforeEnter:n.beforeEnter,props:Vb(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}}}function Vb(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function rp(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function Gb(n){return n.reduce((e,t)=>et(e,t.meta),{})}function sp(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}function nv(n,e){return e.children.some(t=>t===n||nv(n,t))}const iv=/#/g,Wb=/&/g,Xb=/\//g,jb=/=/g,qb=/\?/g,rv=/\+/g,$b=/%5B/g,Yb=/%5D/g,sv=/%5E/g,Kb=/%60/g,ov=/%7B/g,Zb=/%7C/g,av=/%7D/g,Jb=/%20/g;function dh(n){return encodeURI(""+n).replace(Zb,"|").replace($b,"[").replace(Yb,"]")}function Qb(n){return dh(n).replace(ov,"{").replace(av,"}").replace(sv,"^")}function of(n){return dh(n).replace(rv,"%2B").replace(Jb,"+").replace(iv,"%23").replace(Wb,"%26").replace(Kb,"`").replace(ov,"{").replace(av,"}").replace(sv,"^")}function eT(n){return of(n).replace(jb,"%3D")}function tT(n){return dh(n).replace(iv,"%23").replace(qb,"%3F")}function nT(n){return n==null?"":tT(n).replace(Xb,"%2F")}function Il(n){try{return decodeURIComponent(""+n)}catch{}return""+n}function iT(n){const e={};if(n===""||n==="?")return e;const i=(n[0]==="?"?n.slice(1):n).split("&");for(let r=0;r<i.length;++r){const s=i[r].replace(rv," "),o=s.indexOf("="),a=Il(o<0?s:s.slice(0,o)),l=o<0?null:Il(s.slice(o+1));if(a in e){let c=e[a];ii(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function op(n){let e="";for(let t in n){const i=n[t];if(t=eT(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(ii(i)?i.map(s=>s&&of(s)):[i&&of(i)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+t,s!=null&&(e+="="+s))})}return e}function rT(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=ii(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const ph=Symbol(""),ap=Symbol(""),mh=Symbol(""),lv=Symbol(""),af=Symbol("");function _o(){let n=[];function e(i){return n.push(i),()=>{const r=n.indexOf(i);r>-1&&n.splice(r,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function cv(n,e,t){const i=()=>{n[e].delete(t)};nh(i),th(i),eh(()=>{n[e].add(t)}),n[e].add(t)}function OI(n){const e=sn(ph,{}).value;e&&cv(e,"leaveGuards",n)}function FI(n){const e=sn(ph,{}).value;e&&cv(e,"updateGuards",n)}function tr(n,e,t,i,r){const s=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((o,a)=>{const l=f=>{f===!1?a(Zs(4,{from:t,to:e})):f instanceof Error?a(f):Pb(f)?a(Zs(2,{from:e,to:f})):(s&&i.enterCallbacks[r]===s&&typeof f=="function"&&s.push(f),o())},c=n.call(i&&i.instances[r],e,t,l);let u=Promise.resolve(c);n.length<3&&(u=u.then(l)),u.catch(f=>a(f))})}function zc(n,e,t,i){const r=[];for(const s of n)for(const o in s.components){let a=s.components[o];if(!(e!=="beforeRouteEnter"&&!s.instances[o]))if(sT(a)){const c=(a.__vccOpts||a)[e];c&&r.push(tr(c,t,i,s,o))}else{let l=a();r.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${s.path}"`));const u=hb(c)?c.default:c;s.components[o]=u;const h=(u.__vccOpts||u)[e];return h&&tr(h,t,i,s,o)()}))}}return r}function sT(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function lp(n){const e=sn(mh),t=sn(lv),i=St(()=>e.resolve(ht(n.to))),r=St(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=t.matched;if(!u||!f.length)return-1;const h=f.findIndex(Ks.bind(null,u));if(h>-1)return h;const d=cp(l[c-2]);return c>1&&cp(u)===d&&f[f.length-1].path!==d?f.findIndex(Ks.bind(null,l[c-2])):h}),s=St(()=>r.value>-1&&cT(t.params,i.value.params)),o=St(()=>r.value>-1&&r.value===t.matched.length-1&&Zg(t.params,i.value.params));function a(l={}){return lT(l)?e[ht(n.replace)?"replace":"push"](ht(n.to)).catch(No):Promise.resolve()}return{route:i,href:St(()=>i.value.href),isActive:s,isExactActive:o,navigate:a}}const oT=co({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:lp,setup(n,{slots:e}){const t=Li(lp(n)),{options:i}=sn(mh),r=St(()=>({[up(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[up(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&e.default(t);return n.custom?s:Xn("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},s)}}}),aT=oT;function lT(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function cT(n,e){for(const t in e){const i=e[t],r=n[t];if(typeof i=="string"){if(i!==r)return!1}else if(!ii(r)||r.length!==i.length||i.some((s,o)=>s!==r[o]))return!1}return!0}function cp(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const up=(n,e,t)=>n??e??t,uT=co({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=sn(af),r=St(()=>n.route||i.value),s=sn(ap,0),o=St(()=>{let c=ht(s);const{matched:u}=r.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=St(()=>r.value.matched[o.value]);Hs(ap,St(()=>o.value+1)),Hs(ph,a),Hs(af,r);const l=At();return jr(()=>[l.value,a.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!Ks(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=r.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return fp(t.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=Xn(h,et({},g,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return fp(t.default,{Component:m,route:c})||m}}});function fp(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const uv=uT;function fT(n){const e=zb(n.routes,n),t=n.parseQuery||iT,i=n.stringifyQuery||op,r=n.history,s=_o(),o=_o(),a=_o(),l=Wo(Jn);let c=Jn;Cs&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Bc.bind(null,V=>""+V),f=Bc.bind(null,nT),h=Bc.bind(null,Il);function d(V,fe){let ae,re;return ev(V)?(ae=e.getRecordMatcher(V),re=fe):re=V,e.addRoute(re,ae)}function g(V){const fe=e.getRecordMatcher(V);fe&&e.removeRoute(fe)}function _(){return e.getRoutes().map(V=>V.record)}function m(V){return!!e.getRecordMatcher(V)}function p(V,fe){if(fe=et({},fe||l.value),typeof V=="string"){const P=kc(t,V,fe.path),k=e.resolve({path:P.path},fe),X=r.createHref(P.fullPath);return et(P,k,{params:h(k.params),hash:Il(P.hash),redirectedFrom:void 0,href:X})}let ae;if("path"in V)ae=et({},V,{path:kc(t,V.path,fe.path).path});else{const P=et({},V.params);for(const k in P)P[k]==null&&delete P[k];ae=et({},V,{params:f(P)}),fe.params=f(fe.params)}const re=e.resolve(ae,fe),Ee=V.hash||"";re.params=u(h(re.params));const W=mb(i,et({},V,{hash:Qb(Ee),path:re.path})),C=r.createHref(W);return et({fullPath:W,hash:Ee,query:i===op?rT(V.query):V.query||{}},re,{redirectedFrom:void 0,href:C})}function x(V){return typeof V=="string"?kc(t,V,l.value.path):et({},V)}function v(V,fe){if(c!==V)return Zs(8,{from:fe,to:V})}function S(V){return T(V)}function b(V){return S(et(x(V),{replace:!0}))}function E(V){const fe=V.matched[V.matched.length-1];if(fe&&fe.redirect){const{redirect:ae}=fe;let re=typeof ae=="function"?ae(V):ae;return typeof re=="string"&&(re=re.includes("?")||re.includes("#")?re=x(re):{path:re},re.params={}),et({query:V.query,hash:V.hash,params:"path"in re?{}:V.params},re)}}function T(V,fe){const ae=c=p(V),re=l.value,Ee=V.state,W=V.force,C=V.replace===!0,P=E(ae);if(P)return T(et(x(P),{state:typeof P=="object"?et({},Ee,P.state):Ee,force:W,replace:C}),fe||ae);const k=ae;k.redirectedFrom=fe;let X;return!W&&_b(i,re,ae)&&(X=Zs(16,{to:k,from:re}),le(re,re,!0,!1)),(X?Promise.resolve(X):w(k,re)).catch(J=>xi(J)?xi(J,2)?J:ue(J):H(J,k,re)).then(J=>{if(J){if(xi(J,2))return T(et({replace:C},x(J.to),{state:typeof J.to=="object"?et({},Ee,J.to.state):Ee,force:W}),fe||k)}else J=U(k,re,!0,C,Ee);return N(k,re,J),J})}function L(V,fe){const ae=v(V,fe);return ae?Promise.reject(ae):Promise.resolve()}function y(V){const fe=se.values().next().value;return fe&&typeof fe.runWithContext=="function"?fe.runWithContext(V):V()}function w(V,fe){let ae;const[re,Ee,W]=hT(V,fe);ae=zc(re.reverse(),"beforeRouteLeave",V,fe);for(const P of re)P.leaveGuards.forEach(k=>{ae.push(tr(k,V,fe))});const C=L.bind(null,V,fe);return ae.push(C),Se(ae).then(()=>{ae=[];for(const P of s.list())ae.push(tr(P,V,fe));return ae.push(C),Se(ae)}).then(()=>{ae=zc(Ee,"beforeRouteUpdate",V,fe);for(const P of Ee)P.updateGuards.forEach(k=>{ae.push(tr(k,V,fe))});return ae.push(C),Se(ae)}).then(()=>{ae=[];for(const P of W)if(P.beforeEnter)if(ii(P.beforeEnter))for(const k of P.beforeEnter)ae.push(tr(k,V,fe));else ae.push(tr(P.beforeEnter,V,fe));return ae.push(C),Se(ae)}).then(()=>(V.matched.forEach(P=>P.enterCallbacks={}),ae=zc(W,"beforeRouteEnter",V,fe),ae.push(C),Se(ae))).then(()=>{ae=[];for(const P of o.list())ae.push(tr(P,V,fe));return ae.push(C),Se(ae)}).catch(P=>xi(P,8)?P:Promise.reject(P))}function N(V,fe,ae){a.list().forEach(re=>y(()=>re(V,fe,ae)))}function U(V,fe,ae,re,Ee){const W=v(V,fe);if(W)return W;const C=fe===Jn,P=Cs?history.state:{};ae&&(re||C?r.replace(V.fullPath,et({scroll:C&&P&&P.scroll},Ee)):r.push(V.fullPath,Ee)),l.value=V,le(V,fe,ae,C),ue()}let $;function D(){$||($=r.listen((V,fe,ae)=>{if(!me.listening)return;const re=p(V),Ee=E(re);if(Ee){T(et(Ee,{replace:!0}),re).catch(No);return}c=re;const W=l.value;Cs&&bb(Jd(W.fullPath,ae.delta),cc()),w(re,W).catch(C=>xi(C,12)?C:xi(C,2)?(T(C.to,re).then(P=>{xi(P,20)&&!ae.delta&&ae.type===Zo.pop&&r.go(-1,!1)}).catch(No),Promise.reject()):(ae.delta&&r.go(-ae.delta,!1),H(C,re,W))).then(C=>{C=C||U(re,W,!1),C&&(ae.delta&&!xi(C,8)?r.go(-ae.delta,!1):ae.type===Zo.pop&&xi(C,20)&&r.go(-1,!1)),N(re,W,C)}).catch(No)}))}let B=_o(),O=_o(),G;function H(V,fe,ae){ue(V);const re=O.list();return re.length?re.forEach(Ee=>Ee(V,fe,ae)):console.error(V),Promise.reject(V)}function ne(){return G&&l.value!==Jn?Promise.resolve():new Promise((V,fe)=>{B.add([V,fe])})}function ue(V){return G||(G=!V,D(),B.list().forEach(([fe,ae])=>V?ae(V):fe()),B.reset()),V}function le(V,fe,ae,re){const{scrollBehavior:Ee}=n;if(!Cs||!Ee)return Promise.resolve();const W=!ae&&Tb(Jd(V.fullPath,0))||(re||!ae)&&history.state&&history.state.scroll||null;return Sr().then(()=>Ee(V,fe,W)).then(C=>C&&Eb(C)).catch(C=>H(C,V,fe))}const pe=V=>r.go(V);let Y;const se=new Set,me={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,hasRoute:m,getRoutes:_,resolve:p,options:n,push:S,replace:b,go:pe,back:()=>pe(-1),forward:()=>pe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:O.add,isReady:ne,install(V){const fe=this;V.component("RouterLink",aT),V.component("RouterView",uv),V.config.globalProperties.$router=fe,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>ht(l)}),Cs&&!Y&&l.value===Jn&&(Y=!0,S(r.location).catch(Ee=>{}));const ae={};for(const Ee in Jn)Object.defineProperty(ae,Ee,{get:()=>l.value[Ee],enumerable:!0});V.provide(mh,fe),V.provide(lv,ua(ae)),V.provide(af,l);const re=V.unmount;se.add(V),V.unmount=function(){se.delete(V),se.size<1&&(c=Jn,$&&$(),$=null,l.value=Jn,Y=!1,G=!1),re()}}};function Se(V){return V.reduce((fe,ae)=>fe.then(()=>y(ae)),Promise.resolve())}return me}function hT(n,e){const t=[],i=[],r=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(c=>Ks(c,a))?i.push(a):t.push(a));const l=n.matched[o];l&&(e.matched.find(c=>Ks(c,l))||r.push(l))}return[t,i,r]}const dT=(n,e)=>e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var i;return((i=n.params[t.slice(1)])==null?void 0:i.toString())||""}),lf=(n,e)=>{const t=n.route.matched.find(r=>{var s;return((s=r.components)==null?void 0:s.default)===n.Component.type}),i=e??(t==null?void 0:t.meta.key)??(t&&dT(n.route,t));return typeof i=="function"?i(n.route):i},pT=(n,e)=>({default:()=>n?Xn(Sy,n===!0?{}:n,e):e});function _h(n){return Array.isArray(n)?n:[n]}const hp=[{name:"about",path:"/about",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./about.aWGomN5c.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url).then(n=>n.default||n)},{name:"contact",path:"/contact",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./contact.0-yDy7uC.js"),__vite__mapDeps([7,1,2,3,4,8]),import.meta.url).then(n=>n.default||n)},{name:"credits",path:"/credits",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./credits.aTVKNjaj.js"),__vite__mapDeps([9,1,2,3,4,5,10]),import.meta.url).then(n=>n.default||n)},{name:"index",path:"/",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./index.jHEPdohv.js"),__vite__mapDeps([11,1,2,3,4,12]),import.meta.url).then(n=>n.default||n)},{name:"mentions",path:"/mentions",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./mentions._sesKJVU.js"),__vite__mapDeps([13,1,2,3,4,5,14]),import.meta.url).then(n=>n.default||n)},{name:"photos",path:"/photos",children:[{name:"photos-uid",path:":uid()",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./_uid_.i5uC3eAm.js"),__vite__mapDeps([15,1,2,16,17,4,5,18]),import.meta.url).then(n=>n.default||n)}],meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./photos.Okbx4eH5.js"),__vite__mapDeps([19,1,2,20,21,17,5]),import.meta.url).then(n=>n.default||n)},{name:"projets-perso-uid",path:"/projets-perso/:uid()",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./_uid_.nbgWzFBM.js"),__vite__mapDeps([22,1,2,5,16,17,4,23]),import.meta.url).then(n=>n.default||n)},{name:"videos",path:"/videos",children:[{name:"videos-uid",path:":uid()",meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./_uid_.MfiVbciB.js"),__vite__mapDeps([24,1,2,16,17,4,25]),import.meta.url).then(n=>n.default||n)}],meta:{},alias:[],redirect:void 0,component:()=>oi(()=>import("./videos.79wdvm60.js"),__vite__mapDeps([26,1,2,20,21,17,5]),import.meta.url).then(n=>n.default||n)}],mT=(n,e,t)=>(e=e===!0?{}:e,{default:()=>{var i;return e?Xn(n,e,t):(i=t.default)==null?void 0:i.call(t)}});function dp(n){const e=(n==null?void 0:n.meta.key)??n.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var i;return((i=n.params[t.slice(1)])==null?void 0:i.toString())||""});return typeof e=="function"?e(n):e}function _T(n,e){return n===e||e===Jn?!1:dp(n)!==dp(e)?!0:!n.matched.every((i,r)=>{var s,o;return i.components&&i.components.default===((o=(s=e.matched[r])==null?void 0:s.components)==null?void 0:o.default)})}const gT={scrollBehavior(n,e,t){var c;const i=st(),r=((c=Pn().options)==null?void 0:c.scrollBehaviorType)??"auto";let s=t||void 0;const o=typeof n.meta.scrollToTop=="function"?n.meta.scrollToTop(n,e):n.meta.scrollToTop;if(!s&&e&&n&&o!==!1&&_T(n,e)&&(s={left:0,top:0}),n.path===e.path){if(e.hash&&!n.hash)return{left:0,top:0};if(n.hash)return{el:n.hash,top:pp(n.hash),behavior:r}}const a=u=>!!(u.meta.pageTransition??rf),l=a(e)&&a(n)?"page:transition:finish":"page:finish";return new Promise(u=>{i.hooks.hookOnce(l,async()=>{await Sr(),n.hash&&(s={el:n.hash,top:pp(n.hash),behavior:r}),u(s)})})}};function pp(n){try{const e=document.querySelector(n);if(e)return parseFloat(getComputedStyle(e).scrollMarginTop)}catch{}return 0}const vT={hashMode:!1,scrollBehaviorType:"auto"},an={...vT,...gT},xT=async n=>{var l;let e,t;if(!((l=n.meta)!=null&&l.validate))return;const i=st(),r=Pn();if(([e,t]=Ko(()=>Promise.resolve(n.meta.validate(n))),e=await e,t(),e)===!0)return;const o=hh({statusCode:404,statusMessage:`Page Not Found: ${n.fullPath}`,data:{path:n.fullPath}}),a=r.beforeResolve(c=>{if(a(),c===n){const u=r.afterEach(async()=>{u(),await i.runWithContext(()=>Ls(o)),window.history.pushState({},"",n.fullPath)});return!1}})},yT=async n=>{let e,t;const i=([e,t]=Ko(()=>$g(n.path)),e=await e,t(),e);if(i.redirect)return i.redirect},ST=[xT,yT],Fo={};function MT(n,e,t){const{pathname:i,search:r,hash:s}=e,o=n.indexOf("#");if(o>-1){const c=s.includes(n.slice(o))?n.slice(o).length:1;let u=s.slice(c);return u[0]!=="/"&&(u="/"+u),Nd(u,"")}const a=Nd(i,n),l=!t||sM(a,t,{trailingSlash:!0})?a:t;return l+(l.includes("?")?"":r)+s}const ET=Mr({name:"nuxt:router",enforce:"pre",async setup(n){var _,m;let e,t,i=ma().app.baseURL;an.hashMode&&!i.includes("#")&&(i+="#");const r=((_=an.history)==null?void 0:_.call(an,i))??(an.hashMode?Cb(i):Qg(i)),s=((m=an.routes)==null?void 0:m.call(an,hp))??hp;let o;const a=MT(i,window.location,n.payload.path),l=fT({...an,scrollBehavior:(p,x,v)=>{var S;if(x===Jn){o=v;return}return l.options.scrollBehavior=an.scrollBehavior,(S=an.scrollBehavior)==null?void 0:S.call(an,p,Jn,o||v)},history:r,routes:s});n.vueApp.use(l);const c=Wo(l.currentRoute.value);l.afterEach((p,x)=>{c.value=x}),Object.defineProperty(n.vueApp.config.globalProperties,"previousRoute",{get:()=>c.value});const u=Wo(l.resolve(a)),f=()=>{u.value=l.currentRoute.value};n.hook("page:finish",f),l.afterEach((p,x)=>{var v,S,b,E;((S=(v=p.matched[0])==null?void 0:v.components)==null?void 0:S.default)===((E=(b=x.matched[0])==null?void 0:b.components)==null?void 0:E.default)&&f()});const h={};for(const p in u.value)Object.defineProperty(h,p,{get:()=>u.value[p]});n._route=ua(h),n._middleware=n._middleware||{global:[],named:{}};const d=ac();try{[e,t]=Ko(()=>l.isReady()),await e,t()}catch(p){[e,t]=Ko(()=>n.runWithContext(()=>Ls(p))),await e,t()}const g=n.payload.state._layout;return l.beforeEach(async(p,x)=>{var v;await n.callHook("page:loading:start"),p.meta=Li(p.meta),n.isHydrating&&g&&!rs(p.meta.layout)&&(p.meta.layout=g),n._processingMiddleware=!0;{const S=new Set([...ST,...n._middleware.global]);for(const b of p.matched){const E=b.meta.middleware;if(E)for(const T of _h(E))S.add(T)}for(const b of S){const E=typeof b=="string"?n._middleware.named[b]||await((v=Fo[b])==null?void 0:v.call(Fo).then(L=>L.default||L)):b;if(!E)throw new Error(`Unknown route middleware: '${b}'.`);const T=await n.runWithContext(()=>E(p,x));if(!n.payload.serverRendered&&n.isHydrating&&(T===!1||T instanceof Error)){const L=T||tf({statusCode:404,statusMessage:`Page Not Found: ${a}`});return await n.runWithContext(()=>Ls(L)),!1}if(T!==!0&&(T||T===!1))return T}}}),l.onError(async()=>{delete n._processingMiddleware,await n.callHook("page:loading:end")}),l.afterEach(async(p,x,v)=>{delete n._processingMiddleware,!n.isHydrating&&d.value&&await n.runWithContext($E),v&&await n.callHook("page:loading:end"),p.matched.length===0&&await n.runWithContext(()=>Ls(tf({statusCode:404,fatal:!1,statusMessage:`Page not found: ${p.fullPath}`,data:{path:p.fullPath}})))}),n.hooks.hookOnce("app:created",async()=>{try{await l.replace({...l.resolve(a),name:void 0,force:!0}),l.options.scrollBehavior=an.scrollBehavior}catch(p){await n.runWithContext(()=>Ls(p))}}),{provide:{router:l}}}}),cf=globalThis.requestIdleCallback||(n=>{const e=Date.now(),t={didTimeout:!1,timeRemaining:()=>Math.max(0,50-(Date.now()-e))};return setTimeout(()=>{n(t)},1)}),bT=globalThis.cancelIdleCallback||(n=>{clearTimeout(n)}),gh=n=>{const e=st();e.isHydrating?e.hooks.hookOnce("app:suspense:resolve",()=>{cf(n)}):cf(n)},TT=Mr({name:"nuxt:payload",setup(n){Pn().beforeResolve(async(e,t)=>{if(e.path===t.path)return;const i=await qd(e.path);i&&Object.assign(n.static.data,i.data)}),gh(()=>{var e;n.hooks.hook("link:prefetch",async t=>{uo(t).protocol||await qd(t)}),((e=navigator.connection)==null?void 0:e.effectiveType)!=="slow-2g"&&setTimeout(lc,1e3)})}}),wT=Mr(n=>{let e;async function t(){const i=await lc();e&&clearTimeout(e),e=setTimeout(t,1e3*60*60);const r=await $fetch(ch("builds/latest.json"));r.id!==i.id&&n.hooks.callHook("app:manifest:update",r)}gh(()=>{e=setTimeout(t,1e3*60*60)})}),AT=Mr({name:"nuxt:global-components"}),Na={},RT=Mr({name:"nuxt:prefetch",setup(n){const e=Pn();n.hooks.hook("app:mounted",()=>{e.beforeEach(async t=>{var r;const i=(r=t==null?void 0:t.meta)==null?void 0:r.layout;i&&typeof Na[i]=="function"&&await Na[i]()})}),n.hooks.hook("link:prefetch",t=>{if(Ii(t))return;const i=e.resolve(t);if(!i)return;const r=i.meta.layout;let s=_h(i.meta.middleware);s=s.filter(o=>typeof o=="string");for(const o of s)typeof Fo[o]=="function"&&Fo[o]();r&&typeof Na[r]=="function"&&Na[r]()})}});function CT(n={}){const e=n.path||window.location.pathname;let t={};try{t=Cl(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(n.force||(t==null?void 0:t.path)!==e||(t==null?void 0:t.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:e,expires:Date.now()+(n.ttl??1e4)}))}catch{}if(n.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:st().payload.state}))}catch{}window.location.pathname!==e?window.location.href=e:window.location.reload()}}const PT=Mr({name:"nuxt:chunk-reload",setup(n){const e=Pn(),t=ma(),i=new Set;e.beforeEach(()=>{i.clear()}),n.hook("app:chunkError",({error:s})=>{i.add(s)});function r(s){const a="href"in s&&s.href[0]==="#"?t.app.baseURL+s.href:Ui(t.app.baseURL,s.fullPath);CT({path:a,persistState:!0})}n.hook("app:manifest:update",()=>{e.beforeResolve(r)}),e.onError((s,o)=>{i.has(s)&&r(o)})}}),LT=[cb,fb,ET,TT,wT,AT,RT,PT],DT="$s";function En(...n){const e=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(e);const[t,i]=n;if(!t||typeof t!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+t);if(i!==void 0&&typeof i!="function")throw new Error("[nuxt] [useState] init must be a function: "+i);const r=DT+t,s=st(),o=U_(s.payload.state,r);if(o.value===void 0&&i){const a=i();if(Vt(a))return s.payload.state[r]=a,a;o.value=a}return o}function BI(){const n=document.getElementById("container");n.style.pointerEvents="none"}function kI(){const n=document.getElementById("container");n.style.pointerEvents="auto"}function IT(n){const e=document.getElementById(n);e.style.pointerEvents="auto"}function UT(n){const e=document.getElementById(n);e.style.pointerEvents="none"}function mp(n,e){let t=e?"none":"auto";document.querySelectorAll(n).forEach(r=>{r.style.pointerEvents=t})}function NT(){let n=document.getElementById("navHeader");if(!n)return;n.querySelectorAll(".button-link").forEach(t=>{t.parentElement&&t.parentElement.classList.contains("router-link-active")?setTimeout(()=>{t.classList.add("is-active")},1e3):t.classList.remove("is-active")})}function OT(n){const e=document.querySelector(".router-link-active");if(!e)return;const t=e.querySelector(".button-link");if(t)setTimeout(()=>{t.classList.add("is-active")},1e3);else{const i=document.querySelectorAll(".nav-link");if(i[1]){const r=i[1].querySelector(".button-link");setTimeout(()=>{r&&r.classList.add("is-active")},1e3)}}}function wi(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function fv(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var An={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Js={duration:.5,overwrite:!1,delay:0},vh,Yt,yt,Vn=1e8,rt=1/Vn,uf=Math.PI*2,FT=uf/4,BT=0,hv=Math.sqrt,kT=Math.cos,zT=Math.sin,Ot=function(e){return typeof e=="string"},Mt=function(e){return typeof e=="function"},Ni=function(e){return typeof e=="number"},xh=function(e){return typeof e>"u"},gi=function(e){return typeof e=="object"},hn=function(e){return e!==!1},yh=function(){return typeof window<"u"},Oa=function(e){return Mt(e)||Ot(e)},dv=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Kt=Array.isArray,ff=/(?:-?\.?\d|\.)+/gi,pv=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ds=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Hc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,mv=/[+-]=-?[.\d]+/,_v=/[^,'"\[\]\s]+/gi,HT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,_t,Nn,hf,Sh,Cn={},Ul={},gv,vv=function(e){return(Ul=ss(e,Cn))&&xn},Mh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Jo=function(e,t){return!t&&console.warn(e)},xv=function(e,t){return e&&(Cn[e]=t)&&Ul&&(Ul[e]=t)||Cn},Qo=function(){return 0},VT={suppressEvents:!0,isStart:!0,kill:!1},dl={suppressEvents:!0,kill:!1},GT={suppressEvents:!0},Eh={},fr=[],df={},yv,bn={},Vc={},_p=30,pl=[],bh="",Th=function(e){var t=e[0],i,r;if(gi(t)||Mt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=pl.length;r--&&!pl[r].targetTest(t););i=pl[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Wv(e[r],i)))||e.splice(r,1);return e},$r=function(e){return e._gsap||Th(Gn(e))[0]._gsap},Sv=function(e,t,i){return(i=e[t])&&Mt(i)?e[t]():xh(i)&&e.getAttribute&&e.getAttribute(t)||i},dn=function(e,t){return(e=e.split(",")).forEach(t)||e},bt=function(e){return Math.round(e*1e5)/1e5||0},Ut=function(e){return Math.round(e*1e7)/1e7||0},Vs=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},WT=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Nl=function(){var e=fr.length,t=fr.slice(0),i,r;for(df={},fr.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Mv=function(e,t,i,r){fr.length&&!Yt&&Nl(),e.render(t,i,r||Yt&&t<0&&(e._initted||e._startAt)),fr.length&&!Yt&&Nl()},Ev=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(_v).length<2?t:Ot(e)?e.trim():e},bv=function(e){return e},jn=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},XT=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},ss=function(e,t){for(var i in t)e[i]=t[i];return e},gp=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=gi(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},Ol=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Bo=function(e){var t=e.parent||_t,i=e.keyframes?XT(Kt(e.keyframes)):jn;if(hn(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},jT=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},Tv=function(e,t,i,r,s){i===void 0&&(i="_first"),r===void 0&&(r="_last");var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},uc=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},gr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Yr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},qT=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},pf=function(e,t,i,r){return e._startAt&&(Yt?e._startAt.revert(dl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},$T=function n(e){return!e||e._ts&&n(e.parent)},vp=function(e){return e._repeat?Qs(e._tTime,e=e.duration()+e._rDelay)*e:0},Qs=function(e,t){var i=Math.floor(e/=t);return e&&i===e?i-1:i},Fl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},fc=function(e){return e._end=Ut(e._start+(e._tDur/Math.abs(e._ts||e._rts||rt)||0))},hc=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Ut(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),fc(e),i._dirty||Yr(i,e)),e},wv=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Fl(e.rawTime(),t),(!t._dur||_a(0,t.totalDuration(),i)-t._tTime>rt)&&t.render(i,!0)),Yr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-rt}},ui=function(e,t,i,r){return t.parent&&gr(t),t._start=Ut((Ni(i)?i:i||e!==_t?Un(e,i,t):e._time)+t._delay),t._end=Ut(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Tv(e,t,"_first","_last",e._sort?"_start":0),mf(t)||(e._recent=t),r||wv(e,t),e._ts<0&&hc(e,e._tTime),e},Av=function(e,t){return(Cn.ScrollTrigger||Mh("scrollTrigger",t))&&Cn.ScrollTrigger.create(t,e)},Rv=function(e,t,i,r,s){if(Ah(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!Yt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&yv!==Tn.frame)return fr.push(e),e._lazy=[s,r],1},YT=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},mf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},KT=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&YT(e)&&!(!e._initted&&mf(e))||(e._ts<0||e._dp._ts<0)&&!mf(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=_a(0,e._tDur,t),u=Qs(l,a),e._yoyo&&u&1&&(o=1-o),u!==Qs(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Yt||r||e._zTime===rt||!t&&e._zTime){if(!e._initted&&Rv(e,t,r,i,l))return;for(f=e._zTime,e._zTime=t||(i?rt:0),i||(i=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&pf(e,t,i,!0),e._onUpdate&&!i&&wn(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&wn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&gr(e,1),!i&&!Yt&&(wn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},ZT=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},eo=function(e,t,i,r){var s=e._repeat,o=Ut(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ut(o*(s+1)+e._rDelay*s):o,a>0&&!r&&hc(e,e._tTime=e._tDur*a),e.parent&&fc(e),i||Yr(e.parent,e),e},xp=function(e){return e instanceof rn?Yr(e):eo(e,e._dur)},JT={_start:0,endTime:Qo,totalDuration:Qo},Un=function n(e,t,i){var r=e.labels,s=e._recent||JT,o=e.duration()>=Vn?s.endTime(!1):e._dur,a,l,c;return Ot(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(Kt(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},ko=function(e,t,i){var r=Ni(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=hn(l.vars.inherit)&&l.parent;o.immediateRender=hn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new wt(t[0],o,t[s+1])},br=function(e,t){return e||e===0?t(e):t},_a=function(e,t,i){return i<e?e:i>t?t:i},$t=function(e,t){return!Ot(e)||!(t=HT.exec(e))?"":t[1]},QT=function(e,t,i){return br(i,function(r){return _a(e,t,r)})},_f=[].slice,Cv=function(e,t){return e&&gi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&gi(e[0]))&&!e.nodeType&&e!==Nn},ew=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Ot(r)&&!t||Cv(r,1)?(s=i).push.apply(s,Gn(r)):i.push(r)})||i},Gn=function(e,t,i){return yt&&!t&&yt.selector?yt.selector(e):Ot(e)&&!i&&(hf||!to())?_f.call((t||Sh).querySelectorAll(e),0):Kt(e)?ew(e,i):Cv(e)?_f.call(e,0):e?[e]:[]},gf=function(e){return e=Gn(e)[0]||Jo("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Gn(t,i.querySelectorAll?i:i===e?Jo("Invalid scope")||Sh.createElement("div"):e)}},Pv=function(e){return e.sort(function(){return .5-Math.random()})},Lv=function(e){if(Mt(e))return e;var t=gi(e)?e:{each:e},i=Kr(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,f=r;return Ot(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var _=(g||t).length,m=o[_],p,x,v,S,b,E,T,L,y;if(!m){if(y=t.grid==="auto"?0:(t.grid||[1,Vn])[1],!y){for(T=-Vn;T<(T=g[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(m=o[_]=[],p=l?Math.min(y,_)*u-.5:r%y,x=y===Vn?0:l?_*f/y-.5:r/y|0,T=0,L=Vn,E=0;E<_;E++)v=E%y-p,S=x-(E/y|0),m[E]=b=c?Math.abs(c==="y"?S:v):hv(v*v+S*S),b>T&&(T=b),b<L&&(L=b);r==="random"&&Pv(m),m.max=T-L,m.min=L,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(y>_?_-1:c?c==="y"?_/y:y:Math.max(y,_/y))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=$t(t.amount||t.each)||0,i=i&&_<0?Hv(i):i}return _=(m[h]-m.min)/m.max||0,Ut(m.b+(i?i(_):_)*m.v)+m.u}},vf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Ut(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(Ni(i)?0:$t(i))}},Dv=function(e,t){var i=Kt(e),r,s;return!i&&gi(e)&&(r=i=e.radius||Vn,e.values?(e=Gn(e.values),(s=!Ni(e[0]))&&(r*=r)):e=vf(e.increment)),br(t,i?Mt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Vn,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||Ni(o)?u:u+$t(o)}:vf(e))},Iv=function(e,t,i,r){return br(Kt(e)?!t:i===!0?!!(i=0):!r,function(){return Kt(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},tw=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},nw=function(e,t){return function(i){return e(parseFloat(i))+(t||$t(i))}},iw=function(e,t,i){return Nv(e,t,0,1,i)},Uv=function(e,t,i){return br(i,function(r){return e[~~t(r)]})},rw=function n(e,t,i){var r=t-e;return Kt(e)?Uv(e,n(0,e.length),t):br(i,function(s){return(r+(s-e)%r)%r+e})},sw=function n(e,t,i){var r=t-e,s=r*2;return Kt(e)?Uv(e,n(0,e.length-1),t):br(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},ea=function(e){for(var t=0,i="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?_v:ff),i+=e.substr(t,r-t)+Iv(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return i+e.substr(t,e.length-t)},Nv=function(e,t,i,r,s){var o=t-e,a=r-i;return br(s,function(l){return i+((l-e)/o*a||0)})},ow=function n(e,t,i,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=Ot(e),a={},l,c,u,f,h;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(Kt(e)&&!Kt(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(n(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},i=t}else r||(e=ss(Kt(e)?[]:{},e));if(!u){for(l in t)wh.call(a,e,l,"get",t[l]);s=function(g){return Ph(g,a)||(o?e.p:e)}}}return br(i,s)},yp=function(e,t,i){var r=e.labels,s=Vn,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},wn=function(e,t,i){var r=e.vars,s=r[t],o=yt,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,i&&fr.length&&Nl(),a&&(yt=a),u=l?s.apply(c,l):s.call(c),yt=o,u},wo=function(e){return gr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Yt),e.progress()<1&&wn(e,"onInterrupt"),e},Is,Ov=[],Fv=function(e){if(yh()&&e){e=!e.name&&e.default||e;var t=e.name,i=Mt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:Qo,render:Ph,add:wh,kill:Mw,modifier:Sw,rawVars:0},o={targetTest:0,get:0,getSetter:Ch,aliases:{},register:0};if(to(),e!==r){if(bn[t])return;jn(r,jn(Ol(e,s),o)),ss(r.prototype,ss(s,Ol(e,o))),bn[r.prop=t]=r,e.targetTest&&(pl.push(r),Eh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}xv(t,r),e.register&&e.register(xn,r,pn)}else e&&Ov.push(e)},it=255,Ao={aqua:[0,it,it],lime:[0,it,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,it],navy:[0,0,128],white:[it,it,it],olive:[128,128,0],yellow:[it,it,0],orange:[it,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[it,0,0],pink:[it,192,203],cyan:[0,it,it],transparent:[it,it,it,0]},Gc=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*it+.5|0},Bv=function(e,t,i){var r=e?Ni(e)?[e>>16,e>>8&it,e&it]:0:Ao.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ao[e])r=Ao[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&it,r&it,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&it,e&it]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(ff),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Gc(l+1/3,s,o),r[1]=Gc(l,s,o),r[2]=Gc(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(pv),i&&r.length<4&&(r[3]=1),r}else r=e.match(ff)||Ao.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/it,o=r[1]/it,a=r[2]/it,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),i&&r.length<4&&(r[3]=1),r},kv=function(e){var t=[],i=[],r=-1;return e.split(hr).forEach(function(s){var o=s.match(Ds)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},Sp=function(e,t,i){var r="",s=(e+r).match(hr),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=Bv(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(u=kv(e),l=i.c,l.join(r)!==u.c.join(r)))for(c=e.replace(hr,"1").split(Ds),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:i).shift());if(!c)for(c=e.split(hr),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},hr=function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ao)n+="|"+e+"\\b";return new RegExp(n+")","gi")}(),aw=/hsl[a]?\(/,zv=function(e){var t=e.join(" "),i;if(hr.lastIndex=0,hr.test(t))return i=aw.test(t),e[1]=Sp(e[1],i),e[0]=Sp(e[0],i,kv(e[1])),!0},ta,Tn=function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function _(m){var p=n()-r,x=m===!0,v,S,b,E;if(p>e&&(i+=p-t),r+=p,b=r-i,v=b-o,(v>0||x)&&(E=++f.frame,h=b-f.time*1e3,f.time=b=b/1e3,o+=v+(v>=s?4:s-v),S=1),x||(l=c(_)),S)for(d=0;d<a.length;d++)a[d](b,h,E,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){gv&&(!hf&&yh()&&(Nn=hf=window,Sh=Nn.document||{},Cn.gsap=xn,(Nn.gsapVersions||(Nn.gsapVersions=[])).push(xn.version),vv(Ul||Nn.GreenSockGlobals||!Nn.gsap&&Nn||{}),u=Nn.requestAnimationFrame,Ov.forEach(Fv)),l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},ta=1,g(2))},sleep:function(){(u?Nn.cancelAnimationFrame:clearTimeout)(l),ta=0,c=Qo},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,x){var v=p?function(S,b,E,T){m(S,b,E,T),f.remove(v)}:m;return f.remove(m),a[x?"unshift":"push"](v),to(),v},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f}(),to=function(){return!ta&&Tn.wake()},$e={},lw=/^[\d.\-M][\d.\-,\s]/,cw=/["']/g,uw=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,c;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(cw,"").trim():+c,r=l.substr(a+1).trim();return t},fw=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},hw=function(e){var t=(e+"").split("("),i=$e[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[uw(t[1])]:fw(e).split(",").map(Ev)):$e._CE&&lw.test(e)?$e._CE("",e):i},Hv=function(e){return function(t){return 1-e(1-t)}},Vv=function n(e,t){for(var i=e._first,r;i;)i instanceof rn?n(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?n(i.timeline,t):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=t)),i=i._next},Kr=function(e,t){return e&&(Mt(e)?e:$e[e]||hw(e))||t},us=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return dn(e,function(a){$e[a]=Cn[a]=s,$e[o=a.toLowerCase()]=i;for(var l in s)$e[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=$e[a+"."+l]=s[l]}),s},Gv=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Wc=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/uf*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*zT((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Gv(a);return s=uf/s,l.config=function(c,u){return n(e,c,u)},l},Xc=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:Gv(i);return r.config=function(s){return n(e,s)},r};dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;us(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});$e.Linear.easeNone=$e.none=$e.Linear.easeIn;us("Elastic",Wc("in"),Wc("out"),Wc());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};us("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);us("Expo",function(n){return n?Math.pow(2,10*(n-1)):0});us("Circ",function(n){return-(hv(1-n*n)-1)});us("Sine",function(n){return n===1?1:-kT(n*FT)+1});us("Back",Xc("in"),Xc("out"),Xc());$e.SteppedEase=$e.steps=Cn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-rt;return function(a){return((r*_a(0,o,a)|0)+s)*i}}};Js.ease=$e["quad.out"];dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return bh+=n+","+n+"Params,"});var Wv=function(e,t){this.id=BT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Sv,this.set=t?t.getSetter:Ch},na=function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,eo(this,+t.duration,1,1),this.data=t.data,yt&&(this._ctx=yt,yt.data.push(this)),ta||Tn.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,eo(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(to(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(hc(this,i),!s._dp||s.parent||wv(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ui(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===rt||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Mv(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+vp(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+vp(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?Qs(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-rt?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?Fl(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-rt?0:this._rts,this.totalTime(_a(-Math.abs(this._delay),this._tDur,s),r!==!1),fc(this),qT(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(to(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==rt&&(this._tTime-=rt)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ui(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(hn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Fl(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=GT);var r=Yt;return Yt=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Yt=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,xp(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,xp(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Un(this,i),hn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,hn(r))},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-rt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-rt,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-rt)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this;return new Promise(function(s){var o=Mt(i)?i:bv,a=function(){var c=r.then;r.then=null,Mt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){wo(this)},n}();jn(na.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-rt,_prom:0,_ps:!1,_rts:1});var rn=function(n){fv(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=hn(i.sortChildren),_t&&ui(i.parent||_t,wi(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&Av(wi(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return ko(0,arguments,this),this},t.from=function(r,s,o){return ko(1,arguments,this),this},t.fromTo=function(r,s,o,a){return ko(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Bo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new wt(r,s,Un(this,o),1),this},t.call=function(r,s,o){return ui(this,wt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new wt(r,o,Un(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Bo(o).immediateRender=hn(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,Bo(a).immediateRender=hn(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Ut(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,_,m,p,x,v,S,b,E,T;if(this!==_t&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,S=this._start,v=this._ts,p=!v,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=Ut(u%m),u===l?(_=this._repeat,h=c):(_=~~(u/m),_&&_===u/m&&(h=c,_--),h>c&&(h=c)),b=Qs(this._tTime,m),!a&&this._tTime&&b!==_&&this._tTime-b*m-this._dur<=0&&(b=_),E&&_&1&&(h=c-h,T=1),_!==b&&!this._lock){var L=E&&b&1,y=L===(E&&_&1);if(_<b&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Ut(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&wn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Vv(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=ZT(this,Ut(a),Ut(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&h&&!s&&!_&&(wn(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){x=0,g&&(u+=this._zTime=-rt);break}}d=g}else{d=this._last;for(var w=r<0?r:h;d;){if(g=d._prev,(d._act||w<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(w-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(w-d._start)*d._ts,s,o||Yt&&(d._initted||d._startAt)),h!==this._time||!this._ts&&!p){x=0,g&&(u+=this._zTime=w?-rt:rt);break}}d=g}}if(x&&!s&&(this.pause(),x.render(h>=a?0:-rt)._zTime=h>=a?1:-1,this._ts))return this._start=S,fc(this),this.render(r,s,o);this._onUpdate&&!s&&wn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(S===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&gr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(wn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Ni(s)||(s=Un(this,s,r)),!(r instanceof na)){if(Kt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Ot(r))return this.addLabel(r,s);if(Mt(r))r=wt.delayedCall(0,r);else return this}return this!==r?ui(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Vn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof wt?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return Ot(r)?this.removeLabel(r):Mt(r)?this.killTweensOf(r):(uc(this,r),r===this._recent&&(this._recent=this._last),Yr(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ut(Tn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Un(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=wt.delayedCall(0,s||Qo,o);return a.data="isPause",this._hasPause=1,ui(this,a,Un(this,r))},t.removePause=function(r){var s=this._first;for(r=Un(this,r);s;)s._start===r&&s.data==="isPause"&&gr(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)ir!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Gn(r),l=this._first,c=Ni(s),u;l;)l instanceof wt?WT(l._targets,a)&&(c?(!ir||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Un(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=wt.to(o,jn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||rt,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&eo(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,jn({startAt:{time:Un(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),yp(this,Un(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),yp(this,Un(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+rt)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Yr(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Yr(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Vn,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,ui(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;eo(o,o===_t&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(_t._ts&&(Mv(_t,Fl(r,_t)),yv=Tn.frame),Tn.frame>=_p){_p+=An.autoSleep||120;var s=_t._first;if((!s||!s._ts)&&An.autoSleep&&Tn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Tn.sleep()}}},e}(na);jn(rn.prototype,{_lock:0,_hasPause:0,_forcing:0});var dw=function(e,t,i,r,s,o,a){var l=new pn(this._pt,e,t,0,1,Kv,null,s),c=0,u=0,f,h,d,g,_,m,p,x;for(l.b=i,l.e=r,i+="",r+="",(p=~r.indexOf("random("))&&(r=ea(r)),o&&(x=[i,r],o(x,e,t),i=x[0],r=x[1]),h=i.match(Hc)||[];f=Hc.exec(r);)g=f[0],_=r.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Vs(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Hc.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(mv.test(r)||p)&&(l.e=0),this._pt=l,l},wh=function(e,t,i,r,s,o,a,l,c,u){Mt(r)&&(r=r(s||0,e,o));var f=e[t],h=i!=="get"?i:Mt(f)?c?e[t.indexOf("set")||!Mt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Mt(f)?c?vw:$v:Rh,g;if(Ot(r)&&(~r.indexOf("random(")&&(r=ea(r)),r.charAt(1)==="="&&(g=Vs(h,r)+($t(h)||0),(g||g===0)&&(r=g))),!u||h!==r||xf)return!isNaN(h*r)&&r!==""?(g=new pn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?yw:Yv,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&Mh(t,r),dw.call(this,e,t,h,r,d,l||An.stringFilter,c))},pw=function(e,t,i,r,s){if(Mt(e)&&(e=zo(e,s,t,i,r)),!gi(e)||e.style&&e.nodeType||Kt(e)||dv(e))return Ot(e)?zo(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=zo(e[a],s,t,i,r);return o},Xv=function(e,t,i,r,s,o){var a,l,c,u;if(bn[e]&&(a=new bn[e]).init(s,a.rawVars?t[e]:pw(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new pn(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==Is))for(c=i._ptLookup[i._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ir,xf,Ah=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,v=e._overwrite==="auto"&&!vh,S=e.timeline,b,E,T,L,y,w,N,U,$,D,B,O,G;if(S&&(!h||!s)&&(s="none"),e._ease=Kr(s,Js.ease),e._yEase=f?Hv(Kr(f===!0?s:f,Js.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!S&&!!r.runBackwards,!S||h&&!r.stagger){if(U=m[0]?$r(m[0]).harness:0,O=U&&r[U.prop],b=Ol(r,Eh),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?dl:VT),_._lazy=0),o){if(gr(e._startAt=wt.set(m,jn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&hn(l),startAt:null,delay:0,onUpdate:c&&function(){return wn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Yt||!a&&!d)&&e._startAt.revert(dl),a&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),T=jn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&hn(l),immediateRender:a,stagger:0,parent:p},b),O&&(T[U.prop]=O),gr(e._startAt=wt.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Yt?e._startAt.revert(dl):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,rt,rt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&hn(l)||l&&!g,E=0;E<m.length;E++){if(y=m[E],N=y._gsap||Th(m)[E]._gsap,e._ptLookup[E]=D={},df[N.id]&&fr.length&&Nl(),B=x===m?E:x.indexOf(y),U&&($=new U).init(y,O||b,e,B,x)!==!1&&(e._pt=L=new pn(e._pt,y,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(H){D[H]=L}),$.priority&&(w=1)),!U||O)for(T in b)bn[T]&&($=Xv(T,b,e,B,y,x))?$.priority&&(w=1):D[T]=L=wh.call(e,y,T,"get",b[T],B,x,0,r.stringFilter);e._op&&e._op[E]&&e.kill(y,e._op[E]),v&&e._pt&&(ir=e,_t.killTweensOf(y,D,e.globalTime(t)),G=!e.parent,ir=0),e._pt&&l&&(df[N.id]=1)}w&&Zv(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!G,h&&t<=0&&S.render(Vn,!0,!0)},mw=function(e,t,i,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return xf=1,e.vars[t]="+=0",Ah(e,a),xf=0,l?Jo(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=i-u.s,f.e&&(f.e=bt(i)+$t(f.e)),f.b&&(f.b=u.s+$t(f.b))},_w=function(e,t){var i=e[0]?$r(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=ss({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},gw=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(Kt(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},zo=function(e,t,i,r,s){return Mt(e)?e.call(t,i,r,s):Ot(e)&&~e.indexOf("random(")?ea(e):e},jv=bh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",qv={};dn(jv+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return qv[n]=1});var wt=function(n){fv(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Bo(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=r.parent||_t,v=(Kt(i)||dv(i)?Ni(i[0]):"length"in r)?[i]:Gn(i),S,b,E,T,L,y,w,N;if(a._targets=v.length?Th(v):Jo("GSAP target "+i+" not found. https://gsap.com",!An.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||Oa(c)||Oa(u)){if(r=a.vars,S=a.timeline=new rn({data:"nested",defaults:_||{},targets:x&&x.data==="nested"?x.vars.targets:v}),S.kill(),S.parent=S._dp=wi(a),S._start=0,h||Oa(c)||Oa(u)){if(T=v.length,w=h&&Lv(h),gi(h))for(L in h)~jv.indexOf(L)&&(N||(N={}),N[L]=h[L]);for(b=0;b<T;b++)E=Ol(r,qv),E.stagger=0,p&&(E.yoyoEase=p),N&&ss(E,N),y=v[b],E.duration=+zo(c,wi(a),b,y,v),E.delay=(+zo(u,wi(a),b,y,v)||0)-a._delay,!h&&T===1&&E.delay&&(a._delay=u=E.delay,a._start+=u,E.delay=0),S.to(y,E,w?w(b,y,v):0),S._ease=$e.none;S.duration()?c=u=0:a.timeline=0}else if(g){Bo(jn(S.vars.defaults,{ease:"none"})),S._ease=Kr(g.ease||r.ease||"none");var U=0,$,D,B;if(Kt(g))g.forEach(function(O){return S.to(v,O,">")}),S.duration();else{E={};for(L in g)L==="ease"||L==="easeEach"||gw(L,g[L],E,g.easeEach);for(L in E)for($=E[L].sort(function(O,G){return O.t-G.t}),U=0,b=0;b<$.length;b++)D=$[b],B={ease:D.e,duration:(D.t-(b?$[b-1].t:0))/100*c},B[L]=D.v,S.to(v,B,U),U+=B.duration;S.duration()<c&&S.to({},{duration:c-S.duration()})}}c||a.duration(c=S.duration())}else a.timeline=0;return d===!0&&!vh&&(ir=wi(a),_t.killTweensOf(v),ir=0),ui(x,wi(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===Ut(x._time)&&hn(f)&&$T(wi(a))&&x.data!=="nested")&&(a._tTime=-rt,a.render(Math.max(0,-u)||0)),m&&Av(wi(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-rt&&!u?l:r<rt?0:r,h,d,g,_,m,p,x,v,S;if(!c)KT(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(h=f,v=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=Ut(f%_),f===l?(g=this._repeat,h=c):(g=~~(f/_),g&&g===Ut(f/_)&&(h=c,g--),h>c&&(h=c)),p=this._yoyo&&g&1,p&&(S=this._yEase,h=c-h),m=Qs(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(v&&this._yEase&&Vv(v,p),this.vars.repeatRefresh&&!p&&!this._lock&&this._time!==c&&this._initted&&(this._lock=o=1,this.render(Ut(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Rv(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(S||this._ease)(h/c),this._from&&(this.ratio=x=1-x),h&&!a&&!s&&!g&&(wn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;v&&v.render(r<0?r:!h&&p?-rt:v._dur*v._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&pf(this,r,s,o),wn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&wn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&pf(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&gr(this,1),!s&&!(u&&!a)&&(f||a||p)&&(wn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){ta||Tn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Ah(this,c),u=this._ease(c/this._dur),mw(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(hc(this,0),this.parent||Tv(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?wo(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,ir&&ir.vars.overwrite!==!0)._first||wo(this),this.parent&&o!==this.timeline.totalDuration()&&eo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Gn(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&jT(a,l))return s==="all"&&(this._pt=0),wo(this);for(f=this._op=this._op||[],s!=="all"&&(Ot(s)&&(_={},dn(s,function(x){return _[x]=1}),s=_),s=_w(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&uc(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&wo(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return ko(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return ko(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return _t.killTweensOf(r,s,o)},e}(na);jn(wt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});dn("staggerTo,staggerFrom,staggerFromTo",function(n){wt[n]=function(){var e=new rn,t=_f.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var Rh=function(e,t,i){return e[t]=i},$v=function(e,t,i){return e[t](i)},vw=function(e,t,i,r){return e[t](r.fp,i)},xw=function(e,t,i){return e.setAttribute(t,i)},Ch=function(e,t){return Mt(e[t])?$v:xh(e[t])&&e.setAttribute?xw:Rh},Yv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},yw=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Kv=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Ph=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Sw=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},Mw=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?uc(this,t,"_pt"):t.dep||(i=1),t=r;return!i},Ew=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Zv=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},pn=function(){function n(t,i,r,s,o,a,l,c,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||Yv,this.d=l||this,this.set=c||Rh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=Ew,this.m=i,this.mt=s,this.tween=r},n}();dn(bh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Eh[n]=1});Cn.TweenMax=Cn.TweenLite=wt;Cn.TimelineLite=Cn.TimelineMax=rn;_t=new rn({sortChildren:!1,defaults:Js,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});An.stringFilter=zv;var Zr=[],ml={},bw=[],Mp=0,Tw=0,jc=function(e){return(ml[e]||bw).map(function(t){return t()})},yf=function(){var e=Date.now(),t=[];e-Mp>2&&(jc("matchMediaInit"),Zr.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,c;for(a in r)o=Nn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(i.revert(),l&&t.push(i))}),jc("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Mp=e,jc("matchMedia"))},Jv=function(){function n(t,i){this.selector=i&&gf(i),this.data=[],this._r=[],this.isReverted=!1,this.id=Tw++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){Mt(i)&&(s=r,r=i,i=Mt);var o=this,a=function(){var c=yt,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=gf(s)),yt=o,f=r.apply(o,arguments),Mt(f)&&o._r.push(f),yt=c,o.selector=u,o.isReverted=!1,f};return o.last=a,i===Mt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=yt;yt=null,i(this),yt=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof wt&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=s.data.length;l--;)c=s.data[l],c instanceof rn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof wt)&&c.revert&&c.revert(i);s._r.forEach(function(u){return u(i,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Zr.length;o--;)Zr[o].id===this.id&&Zr.splice(o,1)},e.revert=function(i){this.kill(i||{})},n}(),ww=function(){function n(t){this.contexts=[],this.scope=t}var e=n.prototype;return e.add=function(i,r,s){gi(i)||(i={matches:i});var o=new Jv(0,s||this.scope),a=o.conditions={},l,c,u;yt&&!o.selector&&(o.selector=yt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(c in i)c==="all"?u=1:(l=Nn.matchMedia(i[c]),l&&(Zr.indexOf(o)<0&&Zr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(yf):l.addEventListener("change",yf)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n}(),Bl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return Fv(r)})},timeline:function(e){return new rn(e)},getTweensOf:function(e,t){return _t.getTweensOf(e,t)},getProperty:function(e,t,i,r){Ot(e)&&(e=Gn(e)[0]);var s=$r(e||{}).get,o=i?bv:Ev;return i==="native"&&(i=""),e&&(t?o((bn[t]&&bn[t].get||s)(e,t,i,r)):function(a,l,c){return o((bn[a]&&bn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=Gn(e),e.length>1){var r=e.map(function(u){return xn.quickSetter(u,t,i)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=bn[t],a=$r(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;Is._pt=0,f.init(e,i?u+i:u,Is,0,[e]),f.render(1,f),Is._pt&&Ph(1,Is)}:a.set(e,l);return o?c:function(u){return c(e,l,i?u+i:u,a,1)}},quickTo:function(e,t,i){var r,s=xn.to(e,ss((r={},r[t]="+=0.1",r.paused=!0,r),i||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return _t.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Kr(e.ease,Js.ease)),gp(Js,e||{})},config:function(e){return gp(An,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!bn[a]&&!Cn[a]&&Jo(t+" effect requires "+a+" plugin.")}),Vc[t]=function(a,l,c){return i(Gn(a),jn(l||{},s),c)},o&&(rn.prototype[t]=function(a,l,c){return this.add(Vc[t](a,gi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){$e[e]=Kr(t)},parseEase:function(e,t){return arguments.length?Kr(e,t):$e},getById:function(e){return _t.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new rn(e),r,s;for(i.smoothChildTiming=hn(e.smoothChildTiming),_t.remove(i),i._dp=0,i._time=i._tTime=_t._time,r=_t._first;r;)s=r._next,(t||!(!r._dur&&r instanceof wt&&r.vars.onComplete===r._targets[0]))&&ui(i,r,r._start-r._delay),r=s;return ui(_t,i,0),i},context:function(e,t){return e?new Jv(e,t):yt},matchMedia:function(e){return new ww(e)},matchMediaRefresh:function(){return Zr.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||yf()},addEventListener:function(e,t){var i=ml[e]||(ml[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=ml[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:rw,wrapYoyo:sw,distribute:Lv,random:Iv,snap:Dv,normalize:iw,getUnit:$t,clamp:QT,splitColor:Bv,toArray:Gn,selector:gf,mapRange:Nv,pipe:tw,unitize:nw,interpolate:ow,shuffle:Pv},install:vv,effects:Vc,ticker:Tn,updateRoot:rn.updateRoot,plugins:bn,globalTimeline:_t,core:{PropTween:pn,globals:xv,Tween:wt,Timeline:rn,Animation:na,getCache:$r,_removeLinkedListItem:uc,reverting:function(){return Yt},context:function(e){return e&&yt&&(yt.data.push(e),e._ctx=yt),yt},suppressOverwrites:function(e){return vh=e}}};dn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Bl[n]=wt[n]});Tn.add(rn.updateRoot);Is=Bl.to({},{duration:0});var Aw=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Rw=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=Aw(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},qc=function(e,t){return{name:e,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(Ot(s)&&(l={},dn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Rw(a,s)}}}},xn=Bl.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)Yt?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},qc("roundProps",vf),qc("modifiers"),qc("snap",Dv))||Bl;wt.version=rn.version=xn.version="3.12.4";gv=1;yh()&&to();$e.Power0;$e.Power1;$e.Power2;$e.Power3;$e.Power4;$e.Linear;$e.Quad;$e.Cubic;$e.Quart;$e.Quint;$e.Strong;$e.Elastic;$e.Back;$e.SteppedEase;$e.Bounce;$e.Sine;$e.Expo;$e.Circ;/*!
 * CSSPlugin 3.12.4
 * https://gsap.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ep,rr,Gs,Lh,Gr,bp,Dh,Cw=function(){return typeof window<"u"},Oi={},Fr=180/Math.PI,Ws=Math.PI/180,hs=Math.atan2,Tp=1e8,Ih=/([A-Z])/g,Pw=/(left|right|width|margin|padding|x)/i,Lw=/[\s,\(]\S/,fi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Sf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Dw=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Iw=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Uw=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Qv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},e0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Nw=function(e,t,i){return e.style[t]=i},Ow=function(e,t,i){return e.style.setProperty(t,i)},Fw=function(e,t,i){return e._gsap[t]=i},Bw=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},kw=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},zw=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},gt="transform",mn=gt+"Origin",Hw=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Oi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=fi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Ai(r,a)}):this.tfm[e]=o.x?o[e]:Ai(r,e),e===mn&&(this.tfm.zOrigin=o.zOrigin);else return fi.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(gt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(mn,t,"")),e=gt}(s||t)&&this.props.push(e,t,s[e])},t0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Vw=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Ih,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Dh(),(!s||!s.isStart)&&!i[gt]&&(t0(i),r.zOrigin&&i[mn]&&(i[mn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},n0=function(e,t){var i={target:e,props:[],revert:Vw,save:Hw};return e._gsap||xn.core.getCache(e),t&&t.split(",").forEach(function(r){return i.save(r)}),i},i0,Mf=function(e,t){var i=rr.createElementNS?rr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):rr.createElement(e);return i&&i.style?i:rr.createElement(e)},pi=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Ih,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,no(t)||t,1)||""},wp="O,Moz,ms,Ms,Webkit".split(","),no=function(e,t,i){var r=t||Gr,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(wp[o]+e in s););return o<0?null:(o===3?"ms":o>=0?wp[o]:"")+e},Ef=function(){Cw()&&window.document&&(Ep=window,rr=Ep.document,Gs=rr.documentElement,Gr=Mf("div")||{style:{}},Mf("div"),gt=no(gt),mn=gt+"Origin",Gr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",i0=!!no("perspective"),Dh=xn.core.reverting,Lh=1)},$c=function n(e){var t=Mf("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,r=this.nextSibling,s=this.style.cssText,o;if(Gs.appendChild(t),t.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=n}catch{}else this._gsapBBox&&(o=this._gsapBBox());return i&&(r?i.insertBefore(this,r):i.appendChild(this)),Gs.removeChild(t),this.style.cssText=s,o},Ap=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},r0=function(e){var t;try{t=e.getBBox()}catch{t=$c.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===$c||(t=$c.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+Ap(e,["x","cx","x1"])||0,y:+Ap(e,["y","cy","y1"])||0,width:0,height:0}:t},s0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&r0(e))},os=function(e,t){if(t){var i=e.style,r;t in Oi&&t!==mn&&(t=gt),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Ih,"-$1").toLowerCase())):i.removeAttribute(t)}},sr=function(e,t,i,r,s,o){var a=new pn(e._pt,t,i,0,1,o?e0:Qv);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},Rp={deg:1,rad:1,turn:1},Gw={grid:1,flex:1},vr=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=Gr.style,l=Pw.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,_,m,p;if(r===o||!s||Rp[r]||Rp[o])return s;if(o!=="px"&&!h&&(s=n(e,t,i,"px")),p=e.getCTM&&s0(e),(d||o==="%")&&(Oi[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],bt(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),_=~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===rr||!_.appendChild)&&(_=rr.body),m=_._gsap,m&&d&&m.width&&l&&m.time===Tn.time&&!m.uncache)return bt(s/m.width*f);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=f+r,g=e[u],x?e.style[t]=x:os(e,t)}else(d||o==="%")&&!Gw[pi(_,"display")]&&(a.position=pi(e,"position")),_===e&&(a.position="static"),_.appendChild(Gr),g=Gr[u],_.removeChild(Gr),a.position="absolute";return l&&d&&(m=$r(_),m.time=Tn.time,m.width=_[u]),bt(h?g*s/f:g&&s?f/g*s:0)},Ai=function(e,t,i,r){var s;return Lh||Ef(),t in fi&&t!=="transform"&&(t=fi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Oi[t]&&t!=="transform"?(s=ra(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:zl(pi(e,mn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=kl[t]&&kl[t](e,t,i)||pi(e,t)||Sv(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?vr(e,t,s,i)+i:s},Ww=function(e,t,i,r){if(!i||i==="none"){var s=no(t,e,1),o=s&&pi(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=pi(e,"borderTopColor"))}var a=new pn(this._pt,e.style,t,0,1,Kv),l=0,c=0,u,f,h,d,g,_,m,p,x,v,S,b;if(a.b=i,a.e=r,i+="",r+="",r==="auto"&&(_=e.style[t],e.style[t]=r,r=pi(e,t)||r,_?e.style[t]=_:os(e,t)),u=[i,r],zv(u),i=u[0],r=u[1],h=i.match(Ds)||[],b=r.match(Ds)||[],b.length){for(;f=Ds.exec(r);)m=f[0],x=r.substring(l,f.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,S=_.substr((d+"").length),m.charAt(1)==="="&&(m=Vs(d,m)+S),p=parseFloat(m),v=m.substr((p+"").length),l=Ds.lastIndex-v.length,v||(v=v||An.units[t]||S,l===r.length&&(r+=v,a.e+=v)),S!==v&&(d=vr(e,t,_,v)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?e0:Qv;return mv.test(r)&&(a.e=0),this._pt=a,a},Cp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Xw=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Cp[i]||i,t[1]=Cp[r]||r,t.join(" ")},jw=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Oi[a]&&(l=1,a=a==="transformOrigin"?mn:gt),os(i,a);l&&(os(i,gt),o&&(o.svg&&i.removeAttribute("transform"),ra(i,1),o.uncache=1,t0(r)))}},kl={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new pn(e._pt,t,i,0,0,jw);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},ia=[1,0,0,1,0,0],o0={},a0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Pp=function(e){var t=pi(e,gt);return a0(t)?ia:t.substr(7).match(pv).map(bt)},Uh=function(e,t){var i=e._gsap||$r(e),r=e.style,s=Pp(e),o,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ia:s):(s===ia&&!e.offsetParent&&e!==Gs&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(c=1,a=e.nextElementSibling,Gs.appendChild(e)),s=Pp(e),l?r.display=l:os(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Gs.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},bf=function(e,t,i,r,s,o){var a=e._gsap,l=s||Uh(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],x=l[5],v=t.split(" "),S=parseFloat(v[0])||0,b=parseFloat(v[1])||0,E,T,L,y;i?l!==ia&&(T=d*m-g*_)&&(L=S*(m/T)+b*(-_/T)+(_*x-m*p)/T,y=S*(-g/T)+b*(d/T)-(d*x-g*p)/T,S=L,b=y):(E=r0(e),S=E.x+(~v[0].indexOf("%")?S/100*E.width:S),b=E.y+(~(v[1]||v[0]).indexOf("%")?b/100*E.height:b)),r||r!==!1&&a.smooth?(p=S-c,x=b-u,a.xOffset=f+(p*d+x*_)-p,a.yOffset=h+(p*g+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=S,a.yOrigin=b,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[mn]="0px 0px",o&&(sr(o,a,"xOrigin",c,S),sr(o,a,"yOrigin",u,b),sr(o,a,"xOffset",f,a.xOffset),sr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",S+" "+b)},ra=function(e,t){var i=e._gsap||new Wv(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=pi(e,mn)||"0",u,f,h,d,g,_,m,p,x,v,S,b,E,T,L,y,w,N,U,$,D,B,O,G,H,ne,ue,le,pe,Y,se,me;return u=f=h=_=m=p=x=v=S=0,d=g=1,i.svg=!!(e.getCTM&&s0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[gt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[gt]!=="none"?l[gt]:"")),r.scale=r.rotate=r.translate="none"),T=Uh(e,i.svg),i.svg&&(i.uncache?(H=e.getBBox(),c=i.xOrigin-H.x+"px "+(i.yOrigin-H.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),bf(e,G||c,!!G||i.originIsAbsolute,i.smooth!==!1,T)),b=i.xOrigin||0,E=i.yOrigin||0,T!==ia&&(N=T[0],U=T[1],$=T[2],D=T[3],u=B=T[4],f=O=T[5],T.length===6?(d=Math.sqrt(N*N+U*U),g=Math.sqrt(D*D+$*$),_=N||U?hs(U,N)*Fr:0,x=$||D?hs($,D)*Fr+_:0,x&&(g*=Math.abs(Math.cos(x*Ws))),i.svg&&(u-=b-(b*N+E*$),f-=E-(b*U+E*D))):(me=T[6],Y=T[7],ue=T[8],le=T[9],pe=T[10],se=T[11],u=T[12],f=T[13],h=T[14],L=hs(me,pe),m=L*Fr,L&&(y=Math.cos(-L),w=Math.sin(-L),G=B*y+ue*w,H=O*y+le*w,ne=me*y+pe*w,ue=B*-w+ue*y,le=O*-w+le*y,pe=me*-w+pe*y,se=Y*-w+se*y,B=G,O=H,me=ne),L=hs(-$,pe),p=L*Fr,L&&(y=Math.cos(-L),w=Math.sin(-L),G=N*y-ue*w,H=U*y-le*w,ne=$*y-pe*w,se=D*w+se*y,N=G,U=H,$=ne),L=hs(U,N),_=L*Fr,L&&(y=Math.cos(L),w=Math.sin(L),G=N*y+U*w,H=B*y+O*w,U=U*y-N*w,O=O*y-B*w,N=G,B=H),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=bt(Math.sqrt(N*N+U*U+$*$)),g=bt(Math.sqrt(O*O+me*me)),L=hs(B,O),x=Math.abs(L)>2e-4?L*Fr:0,S=se?1/(se<0?-se:se):0),i.svg&&(G=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!a0(pi(e,gt)),G&&e.setAttribute("transform",G))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(d*=-1,x+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=h+o,i.scaleX=bt(d),i.scaleY=bt(g),i.rotation=bt(_)+a,i.rotationX=bt(m)+a,i.rotationY=bt(p)+a,i.skewX=x+a,i.skewY=v+a,i.transformPerspective=S+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(r[mn]=zl(c)),i.xOffset=i.yOffset=0,i.force3D=An.force3D,i.renderTransform=i.svg?$w:i0?l0:qw,i.uncache=0,i},zl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Yc=function(e,t,i){var r=$t(t);return bt(parseFloat(t)+parseFloat(vr(e,"x",i+"px",r)))+r},qw=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,l0(e,t)},Pr="0deg",go="0px",Lr=") ",l0=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,u=i.rotationY,f=i.rotationX,h=i.skewX,d=i.skewY,g=i.scaleX,_=i.scaleY,m=i.transformPerspective,p=i.force3D,x=i.target,v=i.zOrigin,S="",b=p==="auto"&&e&&e!==1||p===!0;if(v&&(f!==Pr||u!==Pr)){var E=parseFloat(u)*Ws,T=Math.sin(E),L=Math.cos(E),y;E=parseFloat(f)*Ws,y=Math.cos(E),o=Yc(x,o,T*y*-v),a=Yc(x,a,-Math.sin(E)*-v),l=Yc(x,l,L*y*-v+v)}m!==go&&(S+="perspective("+m+Lr),(r||s)&&(S+="translate("+r+"%, "+s+"%) "),(b||o!==go||a!==go||l!==go)&&(S+=l!==go||b?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Lr),c!==Pr&&(S+="rotate("+c+Lr),u!==Pr&&(S+="rotateY("+u+Lr),f!==Pr&&(S+="rotateX("+f+Lr),(h!==Pr||d!==Pr)&&(S+="skew("+h+", "+d+Lr),(g!==1||_!==1)&&(S+="scale("+g+", "+_+Lr),x.style[gt]=S||"translate(0, 0)"},$w=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,u=i.skewY,f=i.scaleX,h=i.scaleY,d=i.target,g=i.xOrigin,_=i.yOrigin,m=i.xOffset,p=i.yOffset,x=i.forceCSS,v=parseFloat(o),S=parseFloat(a),b,E,T,L,y;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ws,c*=Ws,b=Math.cos(l)*f,E=Math.sin(l)*f,T=Math.sin(l-c)*-h,L=Math.cos(l-c)*h,c&&(u*=Ws,y=Math.tan(c-u),y=Math.sqrt(1+y*y),T*=y,L*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),b*=y,E*=y)),b=bt(b),E=bt(E),T=bt(T),L=bt(L)):(b=f,L=h,E=T=0),(v&&!~(o+"").indexOf("px")||S&&!~(a+"").indexOf("px"))&&(v=vr(d,"x",o,"px"),S=vr(d,"y",a,"px")),(g||_||m||p)&&(v=bt(v+g-(g*b+_*T)+m),S=bt(S+_-(g*E+_*L)+p)),(r||s)&&(y=d.getBBox(),v=bt(v+r/100*y.width),S=bt(S+s/100*y.height)),y="matrix("+b+","+E+","+T+","+L+","+v+","+S+")",d.setAttribute("transform",y),x&&(d.style[gt]=y)},Yw=function(e,t,i,r,s){var o=360,a=Ot(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Fr:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Tp)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Tp)%o-~~(c/o)*o)),e._pt=h=new pn(e._pt,t,i,r,c,Dw),h.e=u,h.u="deg",e._props.push(i),h},Lp=function(e,t){for(var i in t)e[i]=t[i];return e},Kw=function(e,t,i){var r=Lp({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,u,f,h,d,g;r.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[gt]=t,a=ra(i,1),os(i,gt),i.setAttribute("transform",c)):(c=getComputedStyle(i)[gt],o[gt]=t,a=ra(i,1),o[gt]=c);for(l in Oi)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=$t(c),g=$t(u),f=d!==g?vr(i,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new pn(e._pt,a,l,f,h-f,Sf),e._pt.u=g||0,e._props.push(l));Lp(a,r)};dn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});kl[e>1?"border"+n:n]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Ai(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var c0={name:"css",register:Ef,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,c,u,f,h,d,g,_,m,p,x,v,S,b,E,T,L;Lh||Ef(),this.styles=this.styles||n0(e),L=this.styles.props,this.tween=i;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(bn[_]&&Xv(_,t,i,r,e,s)))){if(d=typeof u,g=kl[_],d==="function"&&(u=u.call(i,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=ea(u)),g)g(this,e,_,u,i)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",hr.lastIndex=0,hr.test(c)||(m=$t(c),p=$t(u)),p?m!==p&&(c=vr(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),L.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(i,r,e,s):l[_],Ot(c)&&~c.indexOf("random(")&&(c=ea(c)),$t(c+"")||c==="auto"||(c+=An.units[_]||$t(Ai(e,_))||""),(c+"").charAt(1)==="="&&(c=Ai(e,_))):c=Ai(e,_),h=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),f=parseFloat(u),_ in fi&&(_==="autoAlpha"&&(h===1&&Ai(e,"visibility")==="hidden"&&f&&(h=0),L.push("visibility",0,a.visibility),sr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=fi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in Oi,v){if(this.styles.save(_),S||(b=e._gsap,b.renderTransform&&!t.parseTransform||ra(e,t.parseTransform),E=t.smoothOrigin!==!1&&b.smooth,S=this._pt=new pn(this._pt,a,gt,0,1,b.renderTransform,b,0,-1),S.dep=1),_==="scale")this._pt=new pn(this._pt,b,"scaleY",b.scaleY,(x?Vs(b.scaleY,x+f):f)-b.scaleY||0,Sf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){L.push(mn,0,a[mn]),u=Xw(u),b.svg?bf(e,u,0,E,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==b.zOrigin&&sr(this,b,"zOrigin",b.zOrigin,p),sr(this,a,_,zl(c),zl(u)));continue}else if(_==="svgOrigin"){bf(e,u,1,E,0,this);continue}else if(_ in o0){Yw(this,b,_,h,x?Vs(h,x+u):u);continue}else if(_==="smoothOrigin"){sr(this,b,"smooth",b.smooth,u);continue}else if(_==="force3D"){b[_]=u;continue}else if(_==="transform"){Kw(this,u,e);continue}}else _ in a||(_=no(_)||_);if(v||(f||f===0)&&(h||h===0)&&!Lw.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),p=$t(u)||(_ in An.units?An.units[_]:m),m!==p&&(h=vr(e,_,c,p)),this._pt=new pn(this._pt,v?b:a,_,h,(x?Vs(h,x+f):f)-h,!v&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?Uw:Sf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=Iw);else if(_ in a)Ww.call(this,e,_,c,x?x+u:u);else if(_ in e)this.add(e,_,c||e[_],x?x+u:u,r,s);else if(_!=="parseTransform"){Mh(_,u);continue}v||(_ in a?L.push(_,0,a[_]):L.push(_,1,c||e[_])),o.push(_)}}T&&Zv(this)},render:function(e,t){if(t.tween._time||!Dh())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Ai,aliases:fi,getSetter:function(e,t,i){var r=fi[t];return r&&r.indexOf(",")<0&&(t=r),t in Oi&&t!==mn&&(e._gsap.x||Ai(e,"x"))?i&&bp===i?t==="scale"?Bw:Fw:(bp=i||{})&&(t==="scale"?kw:zw):e.style&&!xh(e.style[t])?Nw:~t.indexOf("-")?Ow:Ch(e,t)},core:{_removeProperty:os,_getMatrix:Uh}};xn.utils.checkPrefix=no;xn.core.getStyleSaver=n0;(function(n,e,t,i){var r=dn(n+","+e+","+t,function(s){Oi[s]=1});dn(e,function(s){An.units[s]="deg",o0[s]=1}),fi[r[13]]=n+","+e,dn(i,function(s){var o=s.split(":");fi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){An.units[n]="px"});xn.registerPlugin(c0);var Ke=xn.registerPlugin(c0)||xn;Ke.core.Tween;function zI(n){for(let e=0;e<n.value.ASlider.store.length;e++){const t=n.value.ASlider.store[e];Ke.timeline().to(t.mesh.position,{y:-t.top+n.value.sizes.height/2-t.height/2,duration:1.2,ease:"expo.inOut",delay:.07*e})}}function Zw(n){n.value.ASlider.store.forEach(e=>{Ke.set(e.mesh.position,{y:-e.top+n.value.sizes.height/2-e.height/2})})}function HI(n,e){let t=e?"expo.inOut":"expo.out";n.value.ASlider.store.forEach((i,r)=>{Ke.to(i.mesh.position,{y:n.value.sizes.height/2+i.height/2,duration:1,delay:.02*r,ease:t})})}function Jw(n){n.value.ASlider.store.forEach(e=>{Ke.set(e.mesh.position,{y:n.value.sizes.height/2+e.height/2})})}/*!
 * paths 3.12.4
 * https://gsap.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Qw=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,eA=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,tA=Math.PI/180,Fa=Math.sin,Ba=Math.cos,Ho=Math.abs,vo=Math.sqrt,nA=function(e){return typeof e=="number"},Dp=1e5,Xi=function(e){return Math.round(e*Dp)/Dp||0};function iA(n,e,t,i,r,s,o){for(var a=n.length,l,c,u,f,h;--a>-1;)for(l=n[a],c=l.length,u=0;u<c;u+=2)f=l[u],h=l[u+1],l[u]=f*e+h*i+s,l[u+1]=f*t+h*r+o;return n._dirty=1,n}function rA(n,e,t,i,r,s,o,a,l){if(!(n===a&&e===l)){t=Ho(t),i=Ho(i);var c=r%360*tA,u=Ba(c),f=Fa(c),h=Math.PI,d=h*2,g=(n-a)/2,_=(e-l)/2,m=u*g+f*_,p=-f*g+u*_,x=m*m,v=p*p,S=x/(t*t)+v/(i*i);S>1&&(t=vo(S)*t,i=vo(S)*i);var b=t*t,E=i*i,T=(b*E-b*v-E*x)/(b*v+E*x);T<0&&(T=0);var L=(s===o?-1:1)*vo(T),y=L*(t*p/i),w=L*-(i*m/t),N=(n+a)/2,U=(e+l)/2,$=N+(u*y-f*w),D=U+(f*y+u*w),B=(m-y)/t,O=(p-w)/i,G=(-m-y)/t,H=(-p-w)/i,ne=B*B+O*O,ue=(O<0?-1:1)*Math.acos(B/vo(ne)),le=(B*H-O*G<0?-1:1)*Math.acos((B*G+O*H)/vo(ne*(G*G+H*H)));isNaN(le)&&(le=h),!o&&le>0?le-=d:o&&le<0&&(le+=d),ue%=d,le%=d;var pe=Math.ceil(Ho(le)/(d/4)),Y=[],se=le/pe,me=4/3*Fa(se/2)/(1+Ba(se/2)),Se=u*t,V=f*t,fe=f*-i,ae=u*i,re;for(re=0;re<pe;re++)r=ue+re*se,m=Ba(r),p=Fa(r),B=Ba(r+=se),O=Fa(r),Y.push(m-me*p,p+me*m,B+me*O,O-me*B,B,O);for(re=0;re<Y.length;re+=2)m=Y[re],p=Y[re+1],Y[re]=m*Se+p*fe+$,Y[re+1]=m*V+p*ae+D;return Y[re-2]=a,Y[re-1]=l,Y}}function sA(n){var e=(n+"").replace(eA,function(y){var w=+y;return w<1e-4&&w>-1e-4?0:w}).match(Qw)||[],t=[],i=0,r=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+n,c,u,f,h,d,g,_,m,p,x,v,S,b,E,T,L=function(w,N,U,$){x=(U-w)/3,v=($-N)/3,_.push(w+x,N+v,U-x,$-v,U,$)};if(!n||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(b=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,f=+e[c+1],h=+e[c+2],g&&(f+=i,h+=r),c||(m=f,p=h),d==="M")_&&(_.length<8?t.length-=1:a+=_.length),i=m=f,r=p=h,_=[f,h],t.push(_),c+=2,d="L";else if(d==="C")_||(_=[0,0]),g||(i=r=0),_.push(f,h,i+e[c+3]*1,r+e[c+4]*1,i+=e[c+5]*1,r+=e[c+6]*1),c+=6;else if(d==="S")x=i,v=r,(b==="C"||b==="S")&&(x+=i-_[_.length-4],v+=r-_[_.length-3]),g||(i=r=0),_.push(x,v,f,h,i+=e[c+3]*1,r+=e[c+4]*1),c+=4;else if(d==="Q")x=i+(f-i)*s,v=r+(h-r)*s,g||(i=r=0),i+=e[c+3]*1,r+=e[c+4]*1,_.push(x,v,i+(f-i)*s,r+(h-r)*s,i,r),c+=4;else if(d==="T")x=i-_[_.length-4],v=r-_[_.length-3],_.push(i+x,r+v,f+(i+x*1.5-f)*s,h+(r+v*1.5-h)*s,i=f,r=h),c+=2;else if(d==="H")L(i,r,i=f,r),c+=1;else if(d==="V")L(i,r,i,r=f+(g?r-i:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(f=m,h=p,_.closed=!0),(d==="L"||Ho(i-f)>.5||Ho(r-h)>.5)&&(L(i,r,f,h),d==="L"&&(c+=2)),i=f,r=h;else if(d==="A"){if(E=e[c+4],T=e[c+5],x=e[c+6],v=e[c+7],u=7,E.length>1&&(E.length<3?(v=x,x=T,u--):(v=T,x=E.substr(2),u-=2),T=E.charAt(1),E=E.charAt(0)),S=rA(i,r,+e[c+1],+e[c+2],+e[c+3],+E,+T,(g?i:0)+x*1,(g?r:0)+v*1),c+=u,S)for(u=0;u<S.length;u++)_.push(S[u]);i=_[_.length-2],r=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function oA(n){nA(n[0])&&(n=[n]);var e="",t=n.length,i,r,s,o;for(r=0;r<t;r++){for(o=n[r],e+="M"+Xi(o[0])+","+Xi(o[1])+" C",i=o.length,s=2;s<i;s++)e+=Xi(o[s++])+","+Xi(o[s++])+" "+Xi(o[s++])+","+Xi(o[s++])+" "+Xi(o[s++])+","+Xi(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * CustomEase 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var un,u0,f0=function(){return un||typeof window<"u"&&(un=window.gsap)&&un.registerPlugin&&un},Ip=function(){un=f0(),un?(un.registerEase("_CE",hi.create),u0=1):console.warn("Please gsap.registerPlugin(CustomEase)")},aA=1e20,ka=function(e){return~~(e*1e3+(e<0?-.5:.5))/1e3},lA=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,cA=/[cLlsSaAhHvVtTqQ]/g,uA=function(e){var t=e.length,i=aA,r;for(r=1;r<t;r+=6)+e[r]<i&&(i=+e[r]);return i},fA=function(e,t,i){!i&&i!==0&&(i=Math.max(+e[e.length-1],+e[1]));var r=+e[0]*-1,s=-i,o=e.length,a=1/(+e[o-2]+r),l=-t||(Math.abs(+e[o-1]-+e[1])<.01*(+e[o-2]-+e[0])?uA(e)+s:+e[o-1]+s),c;for(l?l=1/l:l=-a,c=0;c<o;c+=2)e[c]=(+e[c]+r)*a,e[c+1]=(+e[c+1]+s)*l},hA=function n(e,t,i,r,s,o,a,l,c,u,f){var h=(e+i)/2,d=(t+r)/2,g=(i+s)/2,_=(r+o)/2,m=(s+a)/2,p=(o+l)/2,x=(h+g)/2,v=(d+_)/2,S=(g+m)/2,b=(_+p)/2,E=(x+S)/2,T=(v+b)/2,L=a-e,y=l-t,w=Math.abs((i-a)*y-(r-l)*L),N=Math.abs((s-a)*y-(o-l)*L),U;return u||(u=[{x:e,y:t},{x:a,y:l}],f=1),u.splice(f||u.length-1,0,{x:E,y:T}),(w+N)*(w+N)>c*(L*L+y*y)&&(U=u.length,n(e,t,h,d,x,v,E,T,c,u,f),n(E,T,S,b,m,p,a,l,c,u,f+1+(u.length-U))),u},hi=function(){function n(t,i,r){u0||Ip(),this.id=t,this.setData(i,r)}var e=n.prototype;return e.setData=function(i,r){r=r||{},i=i||"0,0,1,1";var s=i.match(lA),o=1,a=[],l=[],c=r.precision||1,u=c<=1,f,h,d,g,_,m,p,x,v;if(this.data=i,(cA.test(i)||~i.indexOf("M")&&i.indexOf("C")<0)&&(s=sA(i)[0]),f=s.length,f===4)s.unshift(0,0),s.push(1,1),f=8;else if((f-2)%6)throw"Invalid CustomEase";for((+s[0]!=0||+s[f-2]!=1)&&fA(s,r.height,r.originY),this.segment=s,g=2;g<f;g+=6)h={x:+s[g-2],y:+s[g-1]},d={x:+s[g+4],y:+s[g+5]},a.push(h,d),hA(h.x,h.y,+s[g],+s[g+1],+s[g+2],+s[g+3],d.x,d.y,1/(c*2e5),a,a.length-1);for(f=a.length,g=0;g<f;g++)p=a[g],x=a[g-1]||p,(p.x>x.x||x.y!==p.y&&x.x===p.x||p===x)&&p.x<=1?(x.cx=p.x-x.x,x.cy=p.y-x.y,x.n=p,x.nx=p.x,u&&g>1&&Math.abs(x.cy/x.cx-a[g-2].cy/a[g-2].cx)>2&&(u=0),x.cx<o&&(x.cx?o=x.cx:(x.cx=.001,g===f-1&&(x.x-=.001,o=Math.min(o,.001),u=0)))):(a.splice(g--,1),f--);if(f=1/o+1|0,_=1/f,m=0,p=a[0],u){for(g=0;g<f;g++)v=g*_,p.nx<v&&(p=a[++m]),h=p.y+(v-p.x)/p.cx*p.cy,l[g]={x:v,cx:_,y:h,cy:0,nx:9},g&&(l[g-1].cy=h-l[g-1].y);l[f-1].cy=a[a.length-1].y-h}else{for(g=0;g<f;g++)p.nx<g*_&&(p=a[++m]),l[g]=p;m<a.length-1&&(l[g-1]=a[a.length-2])}return this.ease=function(S){var b=l[S*f|0]||l[f-1];return b.nx<S&&(b=b.n),b.y+(S-b.x)/b.cx*b.cy},this.ease.custom=this,this.id&&un&&un.registerEase(this.id,this.ease),this},e.getSVGData=function(i){return n.getSVGData(this,i)},n.create=function(i,r,s){return new n(i,r,s).ease},n.register=function(i){un=i,Ip()},n.get=function(i){return un.parseEase(i)},n.getSVGData=function(i,r){r=r||{};var s=r.width||100,o=r.height||100,a=r.x||0,l=(r.y||0)+o,c=un.utils.toArray(r.path)[0],u,f,h,d,g,_,m,p,x,v;if(r.invert&&(o=-o,l=0),typeof i=="string"&&(i=un.parseEase(i)),i.custom&&(i=i.custom),i instanceof n)u=oA(iA([i.segment],s,0,0,-o,a,l));else{for(u=[a,l],m=Math.max(5,(r.precision||1)*200),d=1/m,m+=2,p=5/m,x=ka(a+d*s),v=ka(l+i(d)*-o),f=(v-l)/(x-a),h=2;h<m;h++)g=ka(a+h*d*s),_=ka(l+i(h*d)*-o),(Math.abs((_-v)/(g-x)-f)>p||h===m-1)&&(u.push(x,v),f=(_-v)/(g-x)),x=g,v=_;u="M"+u.join(",")}return c&&c.setAttribute("d",u),u},n}();f0()&&un.registerPlugin(hi);hi.version="3.12.4";function Tf(n,e){if(Ke.registerPlugin(hi),n==".reveal-text-menu"&&e){const o=document.querySelectorAll(".text-words");Ke.timeline().to(o,{yPercent:120,duration:.6,ease:hi.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}if(n==".reveal-text-project"&&e){const o=document.querySelectorAll(".text-words");Ke.timeline().to(o,{yPercent:200,stagger:.025,duration:.7,ease:hi.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}if(e){const o=document.querySelectorAll(".text-words");if(o.length==0)return;Ke.timeline().to(o,{yPercent:-200,stagger:.025,duration:1.6,ease:hi.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}let t=function(o){var a=document.querySelectorAll(o);a.forEach(function(l){l.dataset.splitText=l.textContent,l.innerHTML=l.textContent.split(/\s/).map(function(c){return c.split("-").map(function(u){return'<span class="text-word">'+u+"</span>"}).join('<span class="hyphen">-</span>')}).join('<span class="whitespace"> </span>')})},i=function(o){var a=document.querySelectorAll(o);t(o),a.forEach(function(l){var c=r(l),u="";c.forEach(function(f){u+='<span class="line"><span class="text-words">',f.forEach(function(h){u+=h.outerHTML}),u+="</span></span>"}),l.innerHTML=u})},r=function(o){for(var a=[],l,c=o.querySelectorAll("span"),u,f=0;f<c.length;f++){var h=c[f];h.offsetTop!=u&&(h.classList.contains("whitespace")||(u=h.offsetTop,l=[],a.push(l))),l.push(h)}return a};i(n),document.querySelectorAll(n).forEach(o=>{const a=o.querySelectorAll(".text-words");let l=Ke.timeline();l.set(o,{autoAlpha:1}),l.from(a,{yPercent:120,duration:1,ease:"power3.out",stagger:.25},.5)})}function Jr(n,e){Ke.registerPlugin(hi);let t=null,i=null,r=-1;const s=document.querySelectorAll(n);s.forEach(o=>{if(n==".reveal-loading"&&(s[0].parentElement.style.visibility="visible"),(n==".reveal-menu"||n==".reveal-preview")&&e?(t=.7,r=1):t=1.6,n==".reveal-loading"?i=.7:i=1.6,e){const u=o.querySelectorAll(".letter");Ke.timeline().fromTo(u,{rotationX:.1,y:0},{transformOrigin:"center",rotationX:90,y:100*r,stagger:.015,duration:t,ease:hi.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}o.innerHTML=o.textContent.replace(/([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]+)/g,'<div class="word">$1</div>'),o.querySelectorAll(".word").forEach(u=>{u.innerHTML=u.textContent.replace(/[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]/g,"<div class='perspective'><div class='letter'><div>$&</div></div></div>")});const l=o.querySelectorAll(".letter");let c=Ke.timeline();c.set(o,{autoAlpha:1}),c.fromTo(l,{transformOrigin:"center",rotationX:90,y:100},{rotationX:.1,y:0,stagger:.015,duration:i,ease:hi.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")})})}function h0(n,e,t,i,r){Ke.to(n.value.menuOverlay,{opacity:e,delay:r*2,duration:.5+r*2,ease:"expo.out"}),Ke.to("#pageTitle",{y:t,ease:"expo.out",duration:i,delay:r}),Ke.to("#pageHeader",{y:t,ease:"expo.out",duration:i,delay:r}),Ke.to("#gl",{y:-t,ease:"expo.out",duration:i,delay:r}),n.value.ASlider&&n.value.ASlider.store.forEach((s,o)=>{Ke.to(s.mesh.position,{y:-t*4,ease:"expo.out",duration:i,delay:(o+1)*(r/4)})})}function dA(n,e){Ke.set(n.value.menuOverlay,{opacity:0}),e.name.includes("uid")||Ke.set("#pageTitle",{y:0}),Ke.set("#pageHeader",{y:0}),Ke.set("#gl",{y:0}),n.value.ASlider&&!e.name.includes("uid")&&Zw(n)}function pA(n){if(n.value.indexMenuOpen)return;n.value.indexMenuOpen=!0,n.value.lenisMenu.scrollTo(0,{immediate:!0}),h0(n,1,100,1.3,0),Tf(".reveal-text-menu"),Jr(".reveal-menu");const e=Ke.timeline();let t=window.innerWidth>900?"240%":"100%";e.set("#indexMenu",{autoAlpha:1},0),e.fromTo("#indexMenu",{height:"0vh"},{height:"100vh",duration:.5,ease:"expo.out"},0),e.fromTo(".index__content__separator",{width:"0%"},{width:t,duration:1,ease:"expo.out"},.5),e.fromTo(".index__card__img",{y:"110%"},{y:"0%",duration:1.2,stagger:.055,delay:.3,ease:"expo.out"},0)}function Kc(n,e,t){UT("closeMenu"),Tf(".reveal-text-menu",!0),Tf(".reveal-text",!1),Jr(".reveal-menu",!0);const i=Ke.timeline();i.fromTo(".index__card__img",{y:"0%"},{y:"110%",duration:.7,stagger:.015,ease:"expo.out"},0),i.to("#indexMenu",{height:"0vh",duration:1,ease:"expo.out"},.4),i.to(".index__content__separator",{width:"0%",duration:.5,ease:"expo.out"},0),i.set("#indexMenu",{autoAlpha:0,onComplete:()=>{n.value.indexMenuOpen=!1,IT("closeMenu")}},1.2),t||h0(n,0,0,1.3,.3)}const dc=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},mA=n=>(k_("data-v-814d2ec9"),n=n(),z_(),n),_A=mA(()=>Ce("div",{class:"cross__wrapper__header"},[Ce("span",{class:"cross__content__v"}),Ce("span",{class:"cross__content__h"})],-1)),gA=[_A],vA={__name:"CrossHeader",setup(n){const e=En("gl");function t(i){mp(".index__card",!0),pA(e),setTimeout(()=>{mp(".index__card",!1)},1200)}return(i,r)=>(Je(),mt("span",{onClick:t,id:"crossHeader"},gA))}},xA=dc(vA,[["__scopeId","data-v-814d2ec9"]]);async function d0(n,e=Pn()){const{path:t,matched:i}=e.resolve(n);if(!i.length||(e._routePreloaded||(e._routePreloaded=new Set),e._routePreloaded.has(t)))return;const r=e._preloadPromises=e._preloadPromises||[];if(r.length>4)return Promise.all(r).then(()=>d0(n,e));e._routePreloaded.add(t);const s=i.map(o=>{var a;return(a=o.components)==null?void 0:a.default}).filter(o=>typeof o=="function");for(const o of s){const a=Promise.resolve(o()).catch(()=>{}).finally(()=>r.splice(r.indexOf(a)));r.push(a)}await Promise.all(r)}const yA=(...n)=>n.find(e=>e!==void 0),SA="noopener noreferrer";function MA(n){const e=n.componentName||"NuxtLink",t=(i,r)=>{if(!i||n.trailingSlash!=="append"&&n.trailingSlash!=="remove")return i;if(typeof i=="string")return Up(i,n.trailingSlash);const s="path"in i?i.path:r(i).path;return{...i,name:void 0,path:Up(s,n.trailingSlash)}};return co({name:e,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(i,{slots:r}){const s=Pn(),o=ma(),a=St(()=>{const d=i.to||i.href||"";return t(d,s.resolve)}),l=St(()=>typeof a.value=="string"&&Ii(a.value,{acceptRelative:!0})),c=St(()=>i.external||i.target&&i.target!=="_self"?!0:typeof a.value=="object"?!1:a.value===""||l.value),u=At(!1),f=At(null),h=d=>{var g;f.value=i.custom?(g=d==null?void 0:d.$el)==null?void 0:g.nextElementSibling:d==null?void 0:d.$el};if(i.prefetch!==!1&&i.noPrefetch!==!0&&i.target!=="_blank"&&!bA()){const g=st();let _,m=null;ki(()=>{const p=EA();gh(()=>{_=cf(()=>{var x;(x=f==null?void 0:f.value)!=null&&x.tagName&&(m=p.observe(f.value,async()=>{m==null||m(),m=null;const v=typeof a.value=="string"?a.value:s.resolve(a.value).fullPath;await Promise.all([g.hooks.callHook("link:prefetch",v).catch(()=>{}),!c.value&&d0(a.value,s).catch(()=>{})]),u.value=!0}))})})}),da(()=>{_&&bT(_),m==null||m(),m=null})}return()=>{var p,x;if(!c.value){const v={ref:h,to:a.value,activeClass:i.activeClass||n.activeClass,exactActiveClass:i.exactActiveClass||n.exactActiveClass,replace:i.replace,ariaCurrentValue:i.ariaCurrentValue,custom:i.custom};return i.custom||(u.value&&(v.class=i.prefetchedClass||n.prefetchedClass),v.rel=i.rel),Xn(sy("RouterLink"),v,r.default)}const d=typeof a.value=="object"?((p=s.resolve(a.value))==null?void 0:p.href)??null:a.value&&!i.external&&!l.value?t(Ui(o.app.baseURL,a.value),s.resolve):a.value||null,g=i.target||null,_=i.noRel?null:yA(i.rel,n.externalRelAttribute,d?SA:"")||null,m=()=>ZE(d,{replace:i.replace});return i.custom?r.default?r.default({href:d,navigate:m,get route(){if(!d)return;const v=uo(d);return{path:v.pathname,fullPath:v.pathname,get query(){return Ag(v.search)},hash:v.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:d}},rel:_,target:g,isExternal:c.value,isActive:!1,isExactActive:!1}):null:Xn("a",{ref:f,href:d,rel:_,target:g},(x=r.default)==null?void 0:x.call(r))}}})}const Nh=MA(nb);function Up(n,e){const t=e==="append"?Al:rc;return Ii(n)&&!n.startsWith("http")?n:t(n,!0)}function EA(){const n=st();if(n._observer)return n._observer;let e=null;const t=new Map,i=(s,o)=>(e||(e=new IntersectionObserver(a=>{for(const l of a){const c=t.get(l.target);(l.isIntersecting||l.intersectionRatio>0)&&c&&c()}})),t.set(s,o),e.observe(s),()=>{t.delete(s),e.unobserve(s),t.size===0&&(e.disconnect(),e=null)});return n._observer={observe:i}}function bA(){const n=navigator.connection;return!!(n&&(n.saveData||/2g/.test(n.effectiveType)))}const TA=Ce("span",{class:"link-line"},null,-1),p0={__name:"ButtonLink",props:{link:String,text:String,spanClass:String},setup(n){Er();function e(t){document.querySelectorAll(".button-link").forEach(r=>{r.classList.remove("is-active")}),t.target.closest(".button-link").classList.add("is-active")}return ki(()=>{}),(t,i)=>{const r=Nh;return Je(),mt("div",null,[qe(r,{to:n.link,style:{position:"relative"},class:"nav-link"},{default:ha(()=>[Ce("span",{onClick:e,class:is(n.spanClass),style:{visibility:"hidden"}},tn(n.text),3),TA]),_:1},8,["to"])])}}},wA={id:"pageHeader"},AA={id:"wrapperHeader"},RA={id:"socialHeader"},CA=["href"],PA=["href"],LA=["href"],DA={id:"navHeader"},IA={__name:"Header",props:{social_1:String,social_2:String,social_3:String},setup(n){const e=Pn();Er();const t=En("gl");function i(){e.push("/"+t.value.currentCategory)}return(r,s)=>{const o=xA,a=p0;return Je(),mt("header",wA,[qe(o),Ce("div",AA,[Ce("div",RA,[Ce("ul",null,[Ce("li",null,[Ce("a",{href:n.social_1,target:"blank",class:"reveal-header",style:{visibility:"hidden"}},"Instagram",8,CA)]),Ce("li",null,[Ce("a",{href:n.social_2,target:"blank",class:"reveal-header",style:{visibility:"hidden"}},"LinkedIn",8,PA)]),Ce("li",null,[Ce("a",{href:n.social_3,target:"blank",class:"reveal-header",style:{visibility:"hidden"}},"Youtube",8,LA)])])]),Ce("nav",DA,[Ce("ul",null,[Ce("li",null,[qe(a,{link:"/",text:"Accueil",spanClass:"reveal-header button-link"})]),Ce("li",null,[qe(a,{text:"Projets",onClick:i,spanClass:"reveal-header button-link"})]),Ce("li",null,[qe(a,{link:"/about",text:"À Propos",spanClass:"reveal-header button-link"})])])])])])}}},m0=n=>(k_("data-v-8e66803b"),n=n(),z_(),n),UA=m0(()=>Ce("span",{id:"pageCrossSelect"},null,-1)),NA=m0(()=>Ce("div",{class:"cross__wrapper"},[Ce("span",{class:"cross__content__v"}),Ce("span",{class:"cross__content__h"})],-1)),OA=[UA,NA],FA={__name:"CrossPage",setup(n){const e=Er(),t=Pn(),i=En("gl");function r(){if(e.name!=="index")return;const s=document.querySelectorAll(".cross__handler__item");let o=s.length-1-i.value.homeSlider.actualSlide;i.value.currentCategory=s[o].textContent.toLowerCase(),Ke.to(".cross__handler__title",{y:"100",duration:1.3,ease:"ease.out"});const a=document.querySelectorAll(".nav-link");a.forEach(l=>{l.querySelector(".button-link").classList.remove("is-active")}),a[1].querySelector(".button-link").classList.add("is-active"),t.push(i.value.currentCategory)}return(s,o)=>(Je(),mt("span",{onClick:r,id:"pageCross"},OA))}},BA=dc(FA,[["__scopeId","data-v-8e66803b"]]),kA=co({props:{vnode:{type:Object,required:!0},route:{type:Object,required:!0},vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(n){const e=n.renderKey,t=n.route,i={};for(const r in n.route)Object.defineProperty(i,r,{get:()=>e===n.renderKey?n.route[r]:t[r]});return Hs(oc,ua(i)),()=>Xn(n.vnode,{ref:n.vnodeRef})}}),zA=co({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(n,{attrs:e,expose:t}){const i=st(),r=At(),s=sn(oc,null);let o;t({pageRef:r});const a=sn(qE,null);let l;const c=i.deferHydration();return n.pageKey&&jr(()=>n.pageKey,(u,f)=>{u!==f&&i.callHook("page:loading:start")}),()=>Xn(uv,{name:n.name,route:n.route,...e},{default:u=>{const f=VA(s,u.route,u.Component),h=s&&s.matched.length===u.route.matched.length;if(!u.Component){if(l&&!h)return l;c();return}if(l&&a&&!a.isCurrent(u.route))return l;if(f&&s&&(!a||a!=null&&a.isCurrent(s)))return h?l:null;const d=lf(u,n.pageKey);!i.isHydrating&&!GA(s,u.route,u.Component)&&o===d&&i.callHook("page:loading:end"),o=d;const g=!!(n.transition??u.route.meta.pageTransition??rf),_=g&&HA([n.transition,u.route.meta.pageTransition,rf,{onAfterLeave:()=>{i.callHook("page:transition:finish",u.Component)}}].filter(Boolean)),m=n.keepalive??u.route.meta.keepalive??tb;return l=mT(lh,g&&_,pT(m,Xn(W_,{suspensible:!0,onPending:()=>i.callHook("page:start",u.Component),onResolve:()=>{Sr(()=>i.callHook("page:finish",u.Component).then(()=>i.callHook("page:loading:end")).finally(c))}},{default:()=>{const p=Xn(kA,{key:d||void 0,vnode:u.Component,route:u.route,renderKey:d||void 0,trackRootNodes:g,vnodeRef:r});return m&&(p.type.name=u.Component.type.name||u.Component.type.__name||"RouteProvider"),p}}))).default(),l}})}});function HA(n){const e=n.map(t=>({...t,onAfterLeave:t.onAfterLeave?_h(t.onAfterLeave):void 0}));return sc(...e)}function VA(n,e,t){if(!n)return!1;const i=e.matched.findIndex(r=>{var s;return((s=r.components)==null?void 0:s.default)===(t==null?void 0:t.type)});return!i||i===-1?!1:e.matched.slice(0,i).some((r,s)=>{var o,a,l;return((o=r.components)==null?void 0:o.default)!==((l=(a=n.matched[s])==null?void 0:a.components)==null?void 0:l.default)})||t&&lf({route:e,Component:t})!==lf({route:n,Component:t})}function GA(n,e,t){return n?e.matched.findIndex(r=>{var s;return((s=r.components)==null?void 0:s.default)===(t==null?void 0:t.type)})<e.matched.length-1:!1}const WA=Ce("span",{class:"project-link-line"},null,-1),XA={__name:"CategoryLink",props:{link:String,text:String,spanClass:String},setup(n){Er();function e(){document.querySelectorAll(".category-link").forEach(r=>{r.classList.remove("is-active"),r.style.backgroundColor="rgba(255, 255, 255, 0)",r.style.color="white"})}function t(i){let s=i.target.closest("a").querySelector(".category-link");e(),s.classList.add("is-active");let o=document.querySelector(".category-link.is-active");o.style.backgroundColor="rgba(255, 255, 255, 1)",o.style.color="black"}return(i,r)=>{const s=Nh;return Je(),mt("div",null,[qe(s,{to:n.link,style:{position:"relative"},onClick:t,class:"project-link"},{default:ha(()=>[Ce("span",{class:is(n.spanClass)},tn(n.text),3),WA]),_:1},8,["to"])])}}},jA={class:"page__title__wrapper"},qA={key:0,class:"page__title__primary reveal"},$A={key:1,class:"page__title__primary__alt reveal"},YA={key:2,class:"page__title__primary reveal-menu",style:{"margin-left":"-0.3%"}},KA={key:3,class:"page__title__secondary"},ZA={key:0,class:"reveal"},JA={key:1,class:"reveal"},QA={key:2,class:"reveal"},e1={key:3,class:"reveal-menu"},t1={key:4,class:"page__title__secondary"},n1={key:0,class:"reveal-menu"},i1={key:1,class:"reveal-menu"},_0={__name:"PageTitle",props:{homeTitle:"",pageTitle:"",menuTitle:"",subtitleOne:"",subtitleTwo:"",subtitleThree:"",subtitleMenu:"",subtitleMenuTwo:""},setup(n){return(e,t)=>(Je(),mt("div",jA,[n.homeTitle?(Je(),mt("h1",qA,tn(n.homeTitle),1)):n.pageTitle?(Je(),mt("h1",$A,tn(n.pageTitle),1)):n.menuTitle?(Je(),mt("div",YA,tn(n.menuTitle),1)):Zn("",!0),n.subtitleOne?(Je(),mt("h2",KA,[n.subtitleOne?(Je(),mt("span",ZA,tn(n.subtitleOne),1)):Zn("",!0),n.subtitleTwo?(Je(),mt("span",JA,tn(n.subtitleTwo),1)):Zn("",!0),n.subtitleThree?(Je(),mt("span",QA,tn(n.subtitleThree),1)):Zn("",!0),n.subtitleMenu?(Je(),mt("span",e1,tn(n.subtitleMenu),1)):Zn("",!0)])):Zn("",!0),n.subtitleMenu?(Je(),mt("span",t1,[n.subtitleMenu?(Je(),mt("span",n1,tn(n.subtitleMenu),1)):Zn("",!0),n.subtitleMenuTwo?(Je(),mt("span",i1,tn(n.subtitleMenuTwo),1)):Zn("",!0)])):Zn("",!0)]))}};async function r1(n,e){return await s1(e).catch(i=>(console.error("Failed to get image meta for "+e,i+""),{width:0,height:0,ratio:0}))}async function s1(n){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((e,t)=>{const i=new Image;i.onload=()=>{const r={width:i.width,height:i.height,ratio:i.width/i.height};e(r)},i.onerror=r=>t(r),i.src=n})}function Np(n){return e=>e?n[e]||e:n.missingValue}function o1({formatter:n,keyMap:e,joinWith:t="/",valueMap:i}={}){n||(n=(s,o)=>`${s}=${o}`),e&&typeof e!="function"&&(e=Np(e));const r=i||{};return Object.keys(r).forEach(s=>{typeof r[s]!="function"&&(r[s]=Np(r[s]))}),(s={})=>Object.entries(s).filter(([a,l])=>typeof l<"u").map(([a,l])=>{const c=r[a];return typeof c=="function"&&(l=c(s[a])),a=typeof e=="function"?e(a):a,n(a,l)}).join(t)}function di(n=""){if(typeof n=="number")return n;if(typeof n=="string"&&n.replace("px","").match(/^\d+$/g))return parseInt(n,10)}function a1(n=""){if(n===void 0||!n.length)return[];const e=new Set;for(const t of n.split(" ")){const i=parseInt(t.replace("x",""));i&&e.add(i)}return Array.from(e)}function l1(n){if(n.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function c1(n){const e={};if(typeof n=="string")for(const t of n.split(/[\s,]+/).filter(i=>i)){const i=t.split(":");i.length!==2?e["1px"]=i[0].trim():e[i[0].trim()]=i[1].trim()}else Object.assign(e,n);return e}function u1(n){const e={options:n},t=(r,s={})=>g0(e,r,s),i=(r,s={},o={})=>t(r,{...o,modifiers:sc(s,o.modifiers||{})}).url;for(const r in n.presets)i[r]=(s,o,a)=>i(s,o,{...n.presets[r],...a});return i.options=n,i.getImage=t,i.getMeta=(r,s)=>f1(e,r,s),i.getSizes=(r,s)=>p1(e,r,s),e.$img=i,i}async function f1(n,e,t){const i=g0(n,e,{...t});return typeof i.getMeta=="function"?await i.getMeta():await r1(n,i.url)}function g0(n,e,t){var c,u;if(typeof e!="string"||e==="")throw new TypeError(`input must be a string (received ${typeof e}: ${JSON.stringify(e)})`);if(e.startsWith("data:"))return{url:e};const{provider:i,defaults:r}=h1(n,t.provider||n.options.provider),s=d1(n,t.preset);if(e=Ii(e)?e:$u(e),!i.supportsAlias)for(const f in n.options.alias)e.startsWith(f)&&(e=Ui(n.options.alias[f],e.substr(f.length)));if(i.validateDomains&&Ii(e)){const f=uo(e).host;if(!n.options.domains.find(h=>h===f))return{url:e}}const o=sc(t,s,r);o.modifiers={...o.modifiers};const a=o.modifiers.format;(c=o.modifiers)!=null&&c.width&&(o.modifiers.width=di(o.modifiers.width)),(u=o.modifiers)!=null&&u.height&&(o.modifiers.height=di(o.modifiers.height));const l=i.getImage(e,o,n);return l.format=l.format||a||"",l}function h1(n,e){const t=n.options.providers[e];if(!t)throw new Error("Unknown provider: "+e);return t}function d1(n,e){if(!e)return{};if(!n.options.presets[e])throw new Error("Unknown preset: "+e);return n.options.presets[e]}function p1(n,e,t){var g,_,m,p,x;const i=di((g=t.modifiers)==null?void 0:g.width),r=di((_=t.modifiers)==null?void 0:_.height),s=c1(t.sizes),o=(m=t.densities)!=null&&m.trim()?a1(t.densities.trim()):n.options.densities;l1(o);const a=i&&r?r/i:0,l=[],c=[];if(Object.keys(s).length>=1){for(const v in s){const S=Op(v,String(s[v]),r,a,n);if(S!==void 0){l.push({size:S.size,screenMaxWidth:S.screenMaxWidth,media:`(max-width: ${S.screenMaxWidth}px)`});for(const b of o)c.push({width:S._cWidth*b,src:Fp(n,e,t,S,b)})}}m1(l)}else for(const v of o){const S=Object.keys(s)[0];let b=Op(S,String(s[S]),r,a,n);b===void 0&&(b={size:"",screenMaxWidth:0,_cWidth:(p=t.modifiers)==null?void 0:p.width,_cHeight:(x=t.modifiers)==null?void 0:x.height}),c.push({width:v,src:Fp(n,e,t,b,v)})}_1(c);const u=c[c.length-1],f=l.length?l.map(v=>`${v.media?v.media+" ":""}${v.size}`).join(", "):void 0,h=f?"w":"x",d=c.map(v=>`${v.src} ${v.width}${h}`).join(", ");return{sizes:f,srcset:d,src:u==null?void 0:u.src}}function Op(n,e,t,i,r){const s=r.options.screens&&r.options.screens[n]||parseInt(n),o=e.endsWith("vw");if(!o&&/^\d+$/.test(e)&&(e=e+"px"),!o&&!e.endsWith("px"))return;let a=parseInt(e);if(!s||!a)return;o&&(a=Math.round(a/100*s));const l=i?Math.round(a*i):t;return{size:e,screenMaxWidth:s,_cWidth:a,_cHeight:l}}function Fp(n,e,t,i,r){return n.$img(e,{...t.modifiers,width:i._cWidth?i._cWidth*r:void 0,height:i._cHeight?i._cHeight*r:void 0},t)}function m1(n){var t;n.sort((i,r)=>i.screenMaxWidth-r.screenMaxWidth);let e=null;for(let i=n.length-1;i>=0;i--){const r=n[i];r.media===e&&n.splice(i,1),e=r.media}for(let i=0;i<n.length;i++)n[i].media=((t=n[i+1])==null?void 0:t.media)||""}function _1(n){n.sort((t,i)=>t.width-i.width);let e=null;for(let t=n.length-1;t>=0;t--){const i=n[t];i.width===e&&n.splice(t,1),e=i.width}}const g1=o1({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(n,e)=>Ud(n)+"_"+Ud(e)}),v1=(n,{modifiers:e={},baseURL:t}={},i)=>{e.width&&e.height&&(e.resize=`${e.width}x${e.height}`,delete e.width,delete e.height);const r=g1(e)||"_";return t||(t=Ui(i.options.nuxt.baseURL,"/_ipx")),{url:Ui(t,r,wg(n))}},x1=!0,y1=!0,S1=Object.freeze(Object.defineProperty({__proto__:null,getImage:v1,supportsAlias:y1,validateDomains:x1},Symbol.toStringTag,{value:"Module"})),v0={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:["res.cloudinary.com"],alias:{},densities:[1,2],format:["webp"]};v0.providers={ipxStatic:{provider:S1,defaults:{}}};const x0=()=>{const n=ma(),e=st();return e.$img||e._img||(e._img=u1({...v0,nuxt:{baseURL:n.app.baseURL}}))},M1={src:{type:String,required:!0},format:{type:String,default:void 0},quality:{type:[Number,String],default:void 0},background:{type:String,default:void 0},fit:{type:String,default:void 0},modifiers:{type:Object,default:void 0},preset:{type:String,default:void 0},provider:{type:String,default:void 0},sizes:{type:[Object,String],default:void 0},densities:{type:String,default:void 0},preload:{type:Boolean,default:void 0},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0},alt:{type:String,default:void 0},referrerpolicy:{type:String,default:void 0},usemap:{type:String,default:void 0},longdesc:{type:String,default:void 0},ismap:{type:Boolean,default:void 0},loading:{type:String,default:void 0,validator:n=>["lazy","eager"].includes(n)},crossorigin:{type:[Boolean,String],default:void 0,validator:n=>["anonymous","use-credentials","",!0,!1].includes(n)},decoding:{type:String,default:void 0,validator:n=>["async","auto","sync"].includes(n)},nonce:{type:[String],default:void 0}},E1=n=>{const e=St(()=>({provider:n.provider,preset:n.preset})),t=St(()=>({width:di(n.width),height:di(n.height),alt:n.alt,referrerpolicy:n.referrerpolicy,usemap:n.usemap,longdesc:n.longdesc,ismap:n.ismap,crossorigin:n.crossorigin===!0?"anonymous":n.crossorigin||void 0,loading:n.loading,decoding:n.decoding,nonce:n.nonce})),i=x0(),r=St(()=>({...n.modifiers,width:di(n.width),height:di(n.height),format:n.format,quality:n.quality||i.options.quality,background:n.background,fit:n.fit}));return{options:e,attrs:t,modifiers:r}},b1={...M1,placeholder:{type:[Boolean,String,Number,Array],default:void 0}},T1=co({name:"NuxtImg",props:b1,emits:["load","error"],setup:(n,e)=>{const t=x0(),i=E1(n),r=At(!1),s=St(()=>t.getSizes(n.src,{...i.options.value,sizes:n.sizes,densities:n.densities,modifiers:{...i.modifiers.value,width:di(n.width),height:di(n.height)}})),o=St(()=>{const d={...i.attrs.value,"data-nuxt-img":""};return(!n.placeholder||r.value)&&(d.sizes=s.value.sizes,d.srcset=s.value.srcset),d}),a=St(()=>{let d=n.placeholder;if(d===""&&(d=!0),!d||r.value)return!1;if(typeof d=="string")return d;const g=Array.isArray(d)?d:typeof d=="number"?[d,d]:[10,10];return t(n.src,{...i.modifiers.value,width:g[0],height:g[1],quality:g[2]||50,blur:g[3]||3},i.options.value)}),l=St(()=>n.sizes?s.value.src:t(n.src,i.modifiers.value,i.options.value)),c=St(()=>a.value?a.value:l.value);if(n.preload){const d=Object.values(s.value).every(g=>g);FE({link:[{rel:"preload",as:"image",nonce:n.nonce,...d?{href:s.value.src,imagesizes:s.value.sizes,imagesrcset:s.value.srcset}:{href:c.value}}]})}const u=At(),h=st().isHydrating;return ki(()=>{if(a.value){const d=new Image;d.src=l.value,n.sizes&&(d.sizes=s.value.sizes||"",d.srcset=s.value.srcset),d.onload=g=>{r.value=!0,e.emit("load",g)};return}u.value&&(u.value.complete&&h&&(u.value.getAttribute("data-error")?e.emit("error",new Event("error")):e.emit("load",new Event("load"))),u.value.onload=d=>{e.emit("load",d)},u.value.onerror=d=>{e.emit("error",d)})}),()=>Xn("img",{ref:u,src:c.value,...o.value,...e.attrs})}});function Hl(n,e,t){return Math.max(n,Math.min(e,t))}class w1{advance(e){var a;if(!this.isRunning)return;let t=!1;if(this.lerp)this.value=(i=this.value,r=this.to,s=60*this.lerp,o=e,function(l,c,u){return(1-u)*l+u*c}(i,r,1-Math.exp(-s*o))),Math.round(this.value)===this.to&&(this.value=this.to,t=!0);else{this.currentTime+=e;const l=Hl(0,this.currentTime/this.duration,1);t=l>=1;const c=t?1:this.easing(l);this.value=this.from+(this.to-this.from)*c}var i,r,s,o;(a=this.onUpdate)==null||a.call(this,this.value,t),t&&this.stop()}stop(){this.isRunning=!1}fromTo(e,t,{lerp:i=.1,duration:r=1,easing:s=l=>l,onStart:o,onUpdate:a}){this.from=this.value=e,this.to=t,this.lerp=i,this.duration=r,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=a}}class A1{constructor({wrapper:e,content:t,autoResize:i=!0}={}){si(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});si(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});si(this,"onContentResize",()=>{this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth});if(this.wrapper=e,this.content=t,i){const r=function(s,o){let a;return function(){let l=arguments,c=this;clearTimeout(a),a=setTimeout(function(){s.apply(c,l)},o)}}(this.resize,250);this.wrapper!==window&&(this.wrapperResizeObserver=new ResizeObserver(r),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(r),this.contentResizeObserver.observe(this.content)}this.resize()}destroy(){var e,t;(e=this.wrapperResizeObserver)==null||e.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class y0{constructor(){this.events={}}emit(e,...t){let i=this.events[e]||[];for(let r=0,s=i.length;r<s;r++)i[r](...t)}on(e,t){var i;return(i=this.events[e])!=null&&i.push(t)||(this.events[e]=[t]),()=>{var r;this.events[e]=(r=this.events[e])==null?void 0:r.filter(s=>t!==s)}}off(e,t){var i;this.events[e]=(i=this.events[e])==null?void 0:i.filter(r=>t!==r)}destroy(){this.events={}}}class R1{constructor(e,{wheelMultiplier:t=1,touchMultiplier:i=2,normalizeWheel:r=!1}){si(this,"onTouchStart",e=>{const{clientX:t,clientY:i}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})});si(this,"onTouchMove",e=>{const{clientX:t,clientY:i}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.touchMultiplier,s=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=t,this.touchStart.y=i,this.lastDelta={x:r,y:s},this.emitter.emit("scroll",{deltaX:r,deltaY:s,event:e})});si(this,"onTouchEnd",e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})});si(this,"onWheel",e=>{let{deltaX:t,deltaY:i}=e;this.normalizeWheel&&(t=Hl(-100,t,100),i=Hl(-100,i,100)),t*=this.wheelMultiplier,i*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:i,event:e})});this.element=e,this.wheelMultiplier=t,this.touchMultiplier=i,this.normalizeWheel=r,this.touchStart={x:null,y:null},this.emitter=new y0,this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class C1{constructor({wrapper:e=window,content:t=document.documentElement,wheelEventsTarget:i=e,eventsTarget:r=i,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:a=.075,touchInertiaMultiplier:l=35,duration:c,easing:u=v=>Math.min(1,1.001-Math.pow(2,-10*v)),lerp:f=!c&&.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:g="vertical",touchMultiplier:_=1,wheelMultiplier:m=1,normalizeWheel:p=!1,autoResize:x=!0}={}){si(this,"onVirtualScroll",({deltaX:e,deltaY:t,event:i})=>{if(i.ctrlKey)return;const r=i.type.includes("touch"),s=i.type.includes("wheel");if(this.options.syncTouch&&r&&i.type==="touchstart")return void this.reset();const o=e===0&&t===0,a=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||a)return;let l=i.composedPath();if(l=l.slice(0,l.indexOf(this.rootElement)),l.find(h=>{var d,g,_,m;return((d=h.hasAttribute)==null?void 0:d.call(h,"data-lenis-prevent"))||r&&((g=h.hasAttribute)==null?void 0:g.call(h,"data-lenis-prevent-touch"))||s&&((_=h.hasAttribute)==null?void 0:_.call(h,"data-lenis-prevent-wheel"))||((m=h.classList)==null?void 0:m.contains("lenis"))}))return;if(this.isStopped||this.isLocked)return void i.preventDefault();if(this.isSmooth=this.options.syncTouch&&r||this.options.smoothWheel&&s,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();i.preventDefault();let c=t;this.options.gestureOrientation==="both"?c=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(c=e);const u=r&&this.options.syncTouch,f=r&&i.type==="touchend"&&Math.abs(c)>5;f&&(c=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+c,{programmatic:!1,...u?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});si(this,"onNativeScroll",()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-e),this.emit()}});window.lenisVersion="1.0.34",e!==document.documentElement&&e!==document.body||(e=window),this.options={wrapper:e,content:t,wheelEventsTarget:i,eventsTarget:r,smoothWheel:s,syncTouch:o,syncTouchLerp:a,touchInertiaMultiplier:l,duration:c,easing:u,lerp:f,infinite:h,gestureOrientation:g,orientation:d,touchMultiplier:_,wheelMultiplier:m,normalizeWheel:p,autoResize:x},this.animate=new w1,this.emitter=new y0,this.dimensions=new A1({wrapper:e,content:t,autoResize:x}),this.toggleClass("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=o||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll=new R1(r,{touchMultiplier:_,wheelMultiplier:m,normalizeWheel:p}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClass("lenis",!1),this.toggleClass("lenis-smooth",!1),this.toggleClass("lenis-scrolling",!1),this.toggleClass("lenis-stopped",!1),this.toggleClass("lenis-locked",!1)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}setScroll(e){this.isHorizontal?this.rootElement.scrollLeft=e:this.rootElement.scrollTop=e}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(e){const t=e-(this.time||e);this.time=e,this.animate.advance(.001*t)}scrollTo(e,{offset:t=0,immediate:i=!1,lock:r=!1,duration:s=this.options.duration,easing:o=this.options.easing,lerp:a=!s&&this.options.lerp,onComplete:l=null,force:c=!1,programmatic:u=!0}={}){if(!this.isStopped&&!this.isLocked||c){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let f;if(typeof e=="string"?f=document.querySelector(e):e!=null&&e.nodeType&&(f=e),f){if(this.options.wrapper!==window){const d=this.options.wrapper.getBoundingClientRect();t-=this.isHorizontal?d.left:d.top}const h=f.getBoundingClientRect();e=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof e=="number"){if(e+=t,e=Math.round(e),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):e=Hl(0,e,this.limit),i)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(l==null?void 0:l(this));if(!u){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:s,easing:o,lerp:a,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(f,h)=>{this.isScrolling=!0,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(e=this.animatedScroll,t=this.limit,(e%t+t)%t):this.animatedScroll;var e,t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(e){this.__isSmooth!==e&&(this.__isSmooth=e,this.toggleClass("lenis-smooth",e))}get isScrolling(){return this.__isScrolling}set isScrolling(e){this.__isScrolling!==e&&(this.__isScrolling=e,this.toggleClass("lenis-scrolling",e))}get isStopped(){return this.__isStopped}set isStopped(e){this.__isStopped!==e&&(this.__isStopped=e,this.toggleClass("lenis-stopped",e))}get isLocked(){return this.__isLocked}set isLocked(e){this.__isLocked!==e&&(this.__isLocked=e,this.toggleClass("lenis-locked",e))}get className(){let e="lenis";return this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isSmooth&&(e+=" lenis-smooth"),e}toggleClass(e,t){this.rootElement.classList.toggle(e,t),this.emitter.emit("className change",this)}}const P1={class:"title__menu__wrapper"},L1={id:"indexContentWrapper"},D1={class:"index__content__col"},I1={class:"index__card__img__wrapper"},U1={class:"index__card__info__wrapper"},N1={class:"index__card__number reveal-text-menu"},O1={class:"index__card__title reveal-text-menu"},F1={key:0,class:"index__card__type reveal-text-menu"},B1={class:"index__card__subtitle reveal-text-menu"},k1={__name:"IndexMenu",setup(n){const e=At(null),t=En("gl"),i=En("projects"),r=At(!1),s=Er();let o=!1;function a(){return new Promise(h=>{t.value.lenisMenu=new C1({wrapper:e.value,content:e.value,autoResize:!0}),t.value.lenisMenu.scrollTo(0,{immediate:!0});const d=g=>{t.value.lenisMenu.raf(g),requestAnimationFrame(d)};d(t.value.time.elapsed),h()})}function l(h){Kc(t,s,!1)}function c(h){o||(o=!0,dA(t,s),Ke.set("#pageContent",{autoAlpha:0}),Ke.set(".cross__wrapper",{autoAlpha:1,y:"-130%"}),t.value.ASlider&&Jw(t),Kc(t,s,!0),setTimeout(()=>{o=!1},300))}const u=Pn();function f(h){Kc(t,s,!1),u.push("/mentions")}return ki(async()=>{await Sr(),r.value="ontouchstart"in window||navigator.maxTouchPoints>0,a().then(()=>{Ke.set("#indexMenu",{autoAlpha:0})})}),(h,d)=>{const g=_0,_=T1,m=Nh;return Je(),mt("section",{id:"indexMenu",ref_key:"indexMenuRef",ref:e},[Ce("span",{class:is(["close__menu reveal-text-menu",{"button-link":!ht(r)}]),id:"closeMenu",onClick:l},"Fermer",2),Ce("span",{class:is(["mentions__menu reveal-text-menu",{"button-link":!ht(r)}]),id:"mentionsMenu",onClick:f},"Mentions",2),Ce("div",P1,[qe(g,{menuTitle:"Index",subtitleMenu:"Projets"})]),Ce("div",L1,[Ce("nav",D1,[(Je(!0),mt(jt,null,Ry(ht(i).slice().reverse(),(p,x)=>(Je(),nr(m,{key:x,to:"/photos/"+p.slug,class:"index__card",id:"item",onClick:c},{default:ha(()=>[Ce("div",I1,[qe(_,{class:"index__card__img",src:p.acf.primary.url,alt:p.acf.primary.alt,width:"200"},null,8,["src","alt"])]),Ce("div",U1,[Ce("div",null,[Ce("p",N1,tn(p.acf.project_number),1)]),Ce("div",null,[Ce("p",O1,tn(p.acf.title),1),p.acf.type?(Je(),mt("p",F1,tn(p.acf.type),1)):Zn("",!0),Ce("p",B1,tn(p.acf.localisation),1)])])]),_:2},1032,["to"]))),128))])])],512)}}},z1=dc(k1,[["__scopeId","data-v-ab0821b4"]]);async function H1(...n){const e=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(e);const[t,i]=n;if(!t||typeof t!="string")throw new TypeError("[nuxt] [callOnce] key must be a string: "+t);if(i!==void 0&&typeof i!="function")throw new Error("[nuxt] [callOnce] fn must be a function: "+i);const r=st();r.payload.once.has(t)||(r._once=r._once||{},r._once[t]=r._once[t]||i(),await r._once[t],r.payload.once.add(t),delete r._once[t])}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oh="160",V1=0,Bp=1,G1=2,S0=1,W1=2,Ti=3,xr=0,_n=1,Ri=2,dr=0,Xs=1,kp=2,zp=3,Hp=4,X1=5,Hr=100,j1=101,q1=102,Vp=103,Gp=104,$1=200,Y1=201,K1=202,Z1=203,wf=204,Af=205,J1=206,Q1=207,eR=208,tR=209,nR=210,iR=211,rR=212,sR=213,oR=214,aR=0,lR=1,cR=2,Vl=3,uR=4,fR=5,hR=6,dR=7,M0=0,pR=1,mR=2,pr=0,_R=1,gR=2,vR=3,xR=4,yR=5,SR=6,E0=300,io=301,ro=302,Rf=303,Cf=304,pc=306,Pf=1e3,ti=1001,Lf=1002,nn=1003,Wp=1004,Zc=1005,Fn=1006,MR=1007,sa=1008,mr=1009,ER=1010,bR=1011,Fh=1012,b0=1013,or=1014,ar=1015,oa=1016,T0=1017,w0=1018,Qr=1020,TR=1021,ni=1023,wR=1024,AR=1025,es=1026,so=1027,RR=1028,A0=1029,CR=1030,R0=1031,C0=1033,Jc=33776,Qc=33777,eu=33778,tu=33779,Xp=35840,jp=35841,qp=35842,$p=35843,P0=36196,Yp=37492,Kp=37496,Zp=37808,Jp=37809,Qp=37810,em=37811,tm=37812,nm=37813,im=37814,rm=37815,sm=37816,om=37817,am=37818,lm=37819,cm=37820,um=37821,nu=36492,fm=36494,hm=36495,PR=36283,dm=36284,pm=36285,mm=36286,L0=3e3,ts=3001,LR=3200,DR=3201,IR=0,UR=1,kn="",Bt="srgb",Fi="srgb-linear",Bh="display-p3",mc="display-p3-linear",Gl="linear",ft="srgb",Wl="rec709",Xl="p3",ds=7680,_m=519,NR=512,OR=513,FR=514,D0=515,BR=516,kR=517,zR=518,HR=519,gm=35044,vm="300 es",Df=1035,Ci=2e3,jl=2001;class fo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],iu=Math.PI/180,If=180/Math.PI;function ga(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function fn(n,e,t){return Math.max(e,Math.min(t,n))}function VR(n,e){return(n%e+e)%e}function ru(n,e,t){return(1-t)*n+t*e}function xm(n){return(n&n-1)===0&&n!==0}function Uf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function xo(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(fn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,i,r,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],x=r[1],v=r[4],S=r[7],b=r[2],E=r[5],T=r[8];return s[0]=o*_+a*x+l*b,s[3]=o*m+a*v+l*E,s[6]=o*p+a*S+l*T,s[1]=c*_+u*x+f*b,s[4]=c*m+u*v+f*E,s[7]=c*p+u*S+f*T,s[2]=h*_+d*x+g*b,s[5]=h*m+d*v+g*E,s[8]=h*p+d*S+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+i*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(su.makeScale(e,t)),this}rotate(e){return this.premultiply(su.makeRotation(-e)),this}translate(e,t){return this.premultiply(su.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const su=new je;function I0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function GR(){const n=aa("canvas");return n.style.display="block",n}const ym={};function Vo(n){n in ym||(ym[n]=!0,console.warn(n))}const Sm=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Mm=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),za={[Fi]:{transfer:Gl,primaries:Wl,toReference:n=>n,fromReference:n=>n},[Bt]:{transfer:ft,primaries:Wl,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[mc]:{transfer:Gl,primaries:Xl,toReference:n=>n.applyMatrix3(Mm),fromReference:n=>n.applyMatrix3(Sm)},[Bh]:{transfer:ft,primaries:Xl,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Mm),fromReference:n=>n.applyMatrix3(Sm).convertLinearToSRGB()}},WR=new Set([Fi,mc]),tt={enabled:!0,_workingColorSpace:Fi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!WR.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=za[e].toReference,r=za[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return za[n].primaries},getTransfer:function(n){return n===kn?Gl:za[n].transfer}};function js(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ou(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ps;class U0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ps===void 0&&(ps=aa("canvas")),ps.width=e.width,ps.height=e.height;const i=ps.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ps}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=aa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=js(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(js(t[i]/255)*255):t[i]=js(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let XR=0;class N0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:XR++}),this.uuid=ga(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(au(r[o].image)):s.push(au(r[o]))}else s=au(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function au(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?U0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jR=0;class gn extends fo{constructor(e=gn.DEFAULT_IMAGE,t=gn.DEFAULT_MAPPING,i=ti,r=ti,s=Fn,o=sa,a=ni,l=mr,c=gn.DEFAULT_ANISOTROPY,u=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jR++}),this.uuid=ga(),this.name="",this.source=new N0(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ts?Bt:kn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==E0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pf:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case Lf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pf:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case Lf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Bt?ts:L0}set encoding(e){Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ts?Bt:kn}}gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=E0;gn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,i=0,r=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,b=(p+1)/2,E=(u+h)/4,T=(f+_)/4,L=(g+m)/4;return v>S&&v>b?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=E/i,s=T/i):S>b?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=L/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=T/s,r=L/s),this.set(i,r,s,t),this}let x=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(f-_)/x,this.z=(h-u)/x,this.w=Math.acos((c+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qR extends fo{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Vo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ts?Bt:kn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new gn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new N0(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class as extends qR{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class O0 extends gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $R extends gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class va{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const b=Math.sqrt(v),E=Math.atan2(b,p*x);m=Math.sin(m*E)/b,a=Math.sin(a*E)/b}const S=a*x;if(l=l*m+h*S,c=c*m+d*S,u=u*m+g*S,f=f*m+_*S,m===1-a){const b=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=b,c*=b,u*=b,f*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(fn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ee{constructor(e=0,t=0,i=0){ee.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Em.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Em.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return lu.copy(this).projectOnVector(e),this.sub(lu)}reflect(e){return this.sub(lu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(fn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lu=new ee,Em=new va;class xa{constructor(e=new ee(1/0,1/0,1/0),t=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,qn):qn.fromBufferAttribute(s,o),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ha.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ha.copy(i.boundingBox)),Ha.applyMatrix4(e.matrixWorld),this.union(Ha)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yo),Va.subVectors(this.max,yo),ms.subVectors(e.a,yo),_s.subVectors(e.b,yo),gs.subVectors(e.c,yo),ji.subVectors(_s,ms),qi.subVectors(gs,_s),Dr.subVectors(ms,gs);let t=[0,-ji.z,ji.y,0,-qi.z,qi.y,0,-Dr.z,Dr.y,ji.z,0,-ji.x,qi.z,0,-qi.x,Dr.z,0,-Dr.x,-ji.y,ji.x,0,-qi.y,qi.x,0,-Dr.y,Dr.x,0];return!cu(t,ms,_s,gs,Va)||(t=[1,0,0,0,1,0,0,0,1],!cu(t,ms,_s,gs,Va))?!1:(Ga.crossVectors(ji,qi),t=[Ga.x,Ga.y,Ga.z],cu(t,ms,_s,gs,Va))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const yi=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],qn=new ee,Ha=new xa,ms=new ee,_s=new ee,gs=new ee,ji=new ee,qi=new ee,Dr=new ee,yo=new ee,Va=new ee,Ga=new ee,Ir=new ee;function cu(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ir.fromArray(n,s);const a=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),l=e.dot(Ir),c=t.dot(Ir),u=i.dot(Ir);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const YR=new xa,So=new ee,uu=new ee;class kh{constructor(e=new ee,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):YR.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;So.subVectors(e,this.center);const t=So.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(So,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(So.copy(e.center).add(uu)),this.expandByPoint(So.copy(e.center).sub(uu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Si=new ee,fu=new ee,Wa=new ee,$i=new ee,hu=new ee,Xa=new ee,du=new ee;class KR{constructor(e=new ee,t=new ee(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,t),Si.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){fu.copy(e).add(t).multiplyScalar(.5),Wa.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(fu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Wa),a=$i.dot(this.direction),l=-$i.dot(Wa),c=$i.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(fu).addScaledVector(Wa,h),d}intersectSphere(e,t){Si.subVectors(e.center,this.origin);const i=Si.dot(this.direction),r=Si.dot(Si)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,t,i,r,s){hu.subVectors(t,e),Xa.subVectors(i,e),du.crossVectors(hu,Xa);let o=this.direction.dot(du),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$i.subVectors(this.origin,e);const l=a*this.direction.dot(Xa.crossVectors($i,Xa));if(l<0)return null;const c=a*this.direction.dot(hu.cross($i));if(c<0||l+c>o)return null;const u=-a*$i.dot(du);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/vs.setFromMatrixColumn(e,0).length(),s=1/vs.setFromMatrixColumn(e,1).length(),o=1/vs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ZR,e,JR)}lookAt(e,t,i){const r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Yi.crossVectors(i,Sn),Yi.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Yi.crossVectors(i,Sn)),Yi.normalize(),ja.crossVectors(Sn,Yi),r[0]=Yi.x,r[4]=ja.x,r[8]=Sn.x,r[1]=Yi.y,r[5]=ja.y,r[9]=Sn.y,r[2]=Yi.z,r[6]=ja.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],x=i[3],v=i[7],S=i[11],b=i[15],E=r[0],T=r[4],L=r[8],y=r[12],w=r[1],N=r[5],U=r[9],$=r[13],D=r[2],B=r[6],O=r[10],G=r[14],H=r[3],ne=r[7],ue=r[11],le=r[15];return s[0]=o*E+a*w+l*D+c*H,s[4]=o*T+a*N+l*B+c*ne,s[8]=o*L+a*U+l*O+c*ue,s[12]=o*y+a*$+l*G+c*le,s[1]=u*E+f*w+h*D+d*H,s[5]=u*T+f*N+h*B+d*ne,s[9]=u*L+f*U+h*O+d*ue,s[13]=u*y+f*$+h*G+d*le,s[2]=g*E+_*w+m*D+p*H,s[6]=g*T+_*N+m*B+p*ne,s[10]=g*L+_*U+m*O+p*ue,s[14]=g*y+_*$+m*G+p*le,s[3]=x*E+v*w+S*D+b*H,s[7]=x*T+v*N+S*B+b*ne,s[11]=x*L+v*U+S*O+b*ue,s[15]=x*y+v*$+S*G+b*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*d-i*l*d)+_*(+t*l*d-t*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-t*l*f+t*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,v=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,S=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,b=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,E=t*x+i*v+r*S+s*b;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=x*T,e[1]=(_*h*s-f*m*s-_*r*d+i*m*d+f*r*p-i*h*p)*T,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*T,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*d-i*l*d)*T,e[4]=v*T,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*T,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*T,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*d+t*l*d)*T,e[8]=S*T,e[9]=(g*f*s-u*_*s-g*i*d+t*_*d+u*i*p-t*f*p)*T,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*p+t*a*p)*T,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*d-t*a*d)*T,e[12]=b*T,e[13]=(u*_*r-g*f*r+g*i*h-t*_*h-u*i*m+t*f*m)*T,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*T,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*h+t*a*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,x=l*c,v=l*u,S=l*f,b=i.x,E=i.y,T=i.z;return r[0]=(1-(_+p))*b,r[1]=(d+S)*b,r[2]=(g-v)*b,r[3]=0,r[4]=(d-S)*E,r[5]=(1-(h+p))*E,r[6]=(m+x)*E,r[7]=0,r[8]=(g+v)*T,r[9]=(m-x)*T,r[10]=(1-(h+_))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=vs.set(r[0],r[1],r[2]).length();const o=vs.set(r[4],r[5],r[6]).length(),a=vs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],$n.copy(this);const c=1/s,u=1/o,f=1/a;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,t.setFromRotationMatrix($n),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Ci){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let d,g;if(a===Ci)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===jl)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ci){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(o-s),h=(t+e)*c,d=(i+r)*u;let g,_;if(a===Ci)g=(o+s)*f,_=-2*f;else if(a===jl)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const vs=new ee,$n=new Ht,ZR=new ee(0,0,0),JR=new ee(1,1,1),Yi=new ee,ja=new ee,Sn=new ee,bm=new Ht,Tm=new va;class _c{constructor(e=0,t=0,i=0,r=_c.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(fn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-fn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(fn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-fn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(fn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-fn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return bm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tm.setFromEuler(this),this.setFromQuaternion(Tm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_c.DEFAULT_ORDER="XYZ";class F0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let QR=0;const wm=new ee,xs=new va,Mi=new Ht,qa=new ee,Mo=new ee,eC=new ee,tC=new va,Am=new ee(1,0,0),Rm=new ee(0,1,0),Cm=new ee(0,0,1),nC={type:"added"},iC={type:"removed"};class Rn extends fo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:QR++}),this.uuid=ga(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const e=new ee,t=new _c,i=new va,r=new ee(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ht},normalMatrix:{value:new je}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new F0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Am,e)}rotateY(e){return this.rotateOnAxis(Rm,e)}rotateZ(e){return this.rotateOnAxis(Cm,e)}translateOnAxis(e,t){return wm.copy(e).applyQuaternion(this.quaternion),this.position.add(wm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Am,e)}translateY(e){return this.translateOnAxis(Rm,e)}translateZ(e){return this.translateOnAxis(Cm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qa.copy(e):qa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(Mo,qa,this.up):Mi.lookAt(qa,Mo,this.up),this.quaternion.setFromRotationMatrix(Mi),r&&(Mi.extractRotation(r.matrixWorld),xs.setFromRotationMatrix(Mi),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(nC)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(iC)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mo,e,eC),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mo,tC,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rn.DEFAULT_UP=new ee(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yn=new ee,Ei=new ee,pu=new ee,bi=new ee,ys=new ee,Ss=new ee,Pm=new ee,mu=new ee,_u=new ee,gu=new ee;let $a=!1;class Qn{constructor(e=new ee,t=new ee,i=new ee){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Yn.subVectors(e,t),r.cross(Yn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Yn.subVectors(r,t),Ei.subVectors(i,t),pu.subVectors(e,t);const o=Yn.dot(Yn),a=Yn.dot(Ei),l=Yn.dot(pu),c=Ei.dot(Ei),u=Ei.dot(pu),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getUV(e,t,i,r,s,o,a,l){return $a===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),$a=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bi.x),l.addScaledVector(o,bi.y),l.addScaledVector(a,bi.z),l)}static isFrontFacing(e,t,i,r){return Yn.subVectors(i,t),Ei.subVectors(e,t),Yn.cross(Ei).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Yn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return $a===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),$a=!0),Qn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Qn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;ys.subVectors(r,i),Ss.subVectors(s,i),mu.subVectors(e,i);const l=ys.dot(mu),c=Ss.dot(mu);if(l<=0&&c<=0)return t.copy(i);_u.subVectors(e,r);const u=ys.dot(_u),f=Ss.dot(_u);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(ys,o);gu.subVectors(e,s);const d=ys.dot(gu),g=Ss.dot(gu);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Ss,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Pm.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(Pm,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(i).addScaledVector(ys,o).addScaledVector(Ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const B0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Ya={h:0,s:0,l:0};function vu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class nt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=tt.workingColorSpace){if(e=VR(e,1),t=fn(t,0,1),i=fn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=vu(o,s,e+1/3),this.g=vu(o,s,e),this.b=vu(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,t=Bt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const i=B0[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}copyLinearToSRGB(e){return this.r=ou(e.r),this.g=ou(e.g),this.b=ou(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return tt.fromWorkingColorSpace(Xt.copy(this),e),Math.round(fn(Xt.r*255,0,255))*65536+Math.round(fn(Xt.g*255,0,255))*256+Math.round(fn(Xt.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(Xt.copy(this),t);const i=Xt.r,r=Xt.g,s=Xt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=Bt){tt.fromWorkingColorSpace(Xt.copy(this),e);const t=Xt.r,i=Xt.g,r=Xt.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+t,Ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ki),e.getHSL(Ya);const i=ru(Ki.h,Ya.h,t),r=ru(Ki.s,Ya.s,t),s=ru(Ki.l,Ya.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new nt;nt.NAMES=B0;let rC=0;class gc extends fo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rC++}),this.uuid=ga(),this.name="",this.type="Material",this.blending=Xs,this.side=xr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wf,this.blendDst=Af,this.blendEquation=Hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Vl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_m,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ds,this.stencilZFail=ds,this.stencilZPass=ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(i.blending=this.blending),this.side!==xr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wf&&(i.blendSrc=this.blendSrc),this.blendDst!==Af&&(i.blendDst=this.blendDst),this.blendEquation!==Hr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_m&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ds&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ds&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ds&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class k0 extends gc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=M0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new ee,Ka=new Qe;class mi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=gm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ar,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ka.fromBufferAttribute(this,t),Ka.applyMatrix3(e),this.setXY(t,Ka.x,Ka.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=xo(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ln(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xo(t,this.array)),t}setX(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xo(t,this.array)),t}setY(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xo(t,this.array)),t}setW(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array),r=ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array),r=ln(r,this.array),s=ln(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gm&&(e.usage=this.usage),e}}class z0 extends mi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class H0 extends mi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ns extends mi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let sC=0;const In=new Ht,xu=new Rn,Ms=new ee,Mn=new xa,Eo=new xa,It=new ee;class fs extends fo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sC++}),this.uuid=ga(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(I0(e)?H0:z0)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,i){return In.makeTranslation(e,t,i),this.applyMatrix4(In),this}scale(e,t,i){return In.makeScale(e,t,i),this.applyMatrix4(In),this}lookAt(e){return xu.lookAt(e),xu.updateMatrix(),this.applyMatrix4(xu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ns(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ee,1/0);return}if(e){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Eo.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(Mn.min,Eo.min),Mn.expandByPoint(It),It.addVectors(Mn.max,Eo.max),Mn.expandByPoint(It)):(Mn.expandByPoint(Eo.min),Mn.expandByPoint(Eo.max))}Mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)It.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(It));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)It.fromBufferAttribute(a,c),l&&(Ms.fromBufferAttribute(e,c),It.add(Ms)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mi(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<a;w++)c[w]=new ee,u[w]=new ee;const f=new ee,h=new ee,d=new ee,g=new Qe,_=new Qe,m=new Qe,p=new ee,x=new ee;function v(w,N,U){f.fromArray(r,w*3),h.fromArray(r,N*3),d.fromArray(r,U*3),g.fromArray(o,w*2),_.fromArray(o,N*2),m.fromArray(o,U*2),h.sub(f),d.sub(f),_.sub(g),m.sub(g);const $=1/(_.x*m.y-m.x*_.y);isFinite($)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar($),x.copy(d).multiplyScalar(_.x).addScaledVector(h,-m.x).multiplyScalar($),c[w].add(p),c[N].add(p),c[U].add(p),u[w].add(x),u[N].add(x),u[U].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let w=0,N=S.length;w<N;++w){const U=S[w],$=U.start,D=U.count;for(let B=$,O=$+D;B<O;B+=3)v(i[B+0],i[B+1],i[B+2])}const b=new ee,E=new ee,T=new ee,L=new ee;function y(w){T.fromArray(s,w*3),L.copy(T);const N=c[w];b.copy(N),b.sub(T.multiplyScalar(T.dot(N))).normalize(),E.crossVectors(L,N);const $=E.dot(u[w])<0?-1:1;l[w*4]=b.x,l[w*4+1]=b.y,l[w*4+2]=b.z,l[w*4+3]=$}for(let w=0,N=S.length;w<N;++w){const U=S[w],$=U.start,D=U.count;for(let B=$,O=$+D;B<O;B+=3)y(i[B+0]),y(i[B+1]),y(i[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new mi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new ee,s=new ee,o=new ee,a=new ee,l=new ee,c=new ee,u=new ee,f=new ee;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new mi(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new fs,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lm=new Ht,Ur=new KR,Za=new kh,Dm=new ee,Es=new ee,bs=new ee,Ts=new ee,yu=new ee,Ja=new ee,Qa=new Qe,el=new Qe,tl=new Qe,Im=new ee,Um=new ee,Nm=new ee,nl=new ee,il=new ee;class lr extends Rn{constructor(e=new fs,t=new k0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ja.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(yu.fromBufferAttribute(f,e),o?Ja.addScaledVector(yu,u):Ja.addScaledVector(yu.sub(t),u))}t.add(Ja)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Za.copy(i.boundingSphere),Za.applyMatrix4(s),Ur.copy(e.ray).recast(e.near),!(Za.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(Za,Dm)===null||Ur.origin.distanceToSquared(Dm)>(e.far-e.near)**2))&&(Lm.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Lm),!(i.boundingBox!==null&&Ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ur)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,b=v;S<b;S+=3){const E=a.getX(S),T=a.getX(S+1),L=a.getX(S+2);r=rl(this,p,e,i,c,u,f,E,T,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);r=rl(this,o,e,i,c,u,f,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,b=v;S<b;S+=3){const E=S,T=S+1,L=S+2;r=rl(this,p,e,i,c,u,f,E,T,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,S=m+2;r=rl(this,o,e,i,c,u,f,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function oC(n,e,t,i,r,s,o,a){let l;if(e.side===_n?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===xr,a),l===null)return null;il.copy(a),il.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(il);return c<t.near||c>t.far?null:{distance:c,point:il.clone(),object:n}}function rl(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Es),n.getVertexPosition(l,bs),n.getVertexPosition(c,Ts);const u=oC(n,e,t,i,Es,bs,Ts,nl);if(u){r&&(Qa.fromBufferAttribute(r,a),el.fromBufferAttribute(r,l),tl.fromBufferAttribute(r,c),u.uv=Qn.getInterpolation(nl,Es,bs,Ts,Qa,el,tl,new Qe)),s&&(Qa.fromBufferAttribute(s,a),el.fromBufferAttribute(s,l),tl.fromBufferAttribute(s,c),u.uv1=Qn.getInterpolation(nl,Es,bs,Ts,Qa,el,tl,new Qe),u.uv2=u.uv1),o&&(Im.fromBufferAttribute(o,a),Um.fromBufferAttribute(o,l),Nm.fromBufferAttribute(o,c),u.normal=Qn.getInterpolation(nl,Es,bs,Ts,Im,Um,Nm,new ee),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new ee,materialIndex:0};Qn.getNormal(Es,bs,Ts,f.normal),u.face=f}return u}class ya extends fs{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ns(c,3)),this.setAttribute("normal",new ns(u,3)),this.setAttribute("uv",new ns(f,2));function g(_,m,p,x,v,S,b,E,T,L,y){const w=S/T,N=b/L,U=S/2,$=b/2,D=E/2,B=T+1,O=L+1;let G=0,H=0;const ne=new ee;for(let ue=0;ue<O;ue++){const le=ue*N-$;for(let pe=0;pe<B;pe++){const Y=pe*w-U;ne[_]=Y*x,ne[m]=le*v,ne[p]=D,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[m]=0,ne[p]=E>0?1:-1,u.push(ne.x,ne.y,ne.z),f.push(pe/T),f.push(1-ue/L),G+=1}}for(let ue=0;ue<L;ue++)for(let le=0;le<T;le++){const pe=h+le+B*ue,Y=h+le+B*(ue+1),se=h+(le+1)+B*(ue+1),me=h+(le+1)+B*ue;l.push(pe,Y,me),l.push(Y,se,me),H+=6}a.addGroup(d,H,y),d+=H,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ya(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function oo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function en(n){const e={};for(let t=0;t<n.length;t++){const i=oo(n[t]);for(const r in i)e[r]=i[r]}return e}function aC(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function V0(n){return n.getRenderTarget()===null?n.outputColorSpace:tt.workingColorSpace}const lC={clone:oo,merge:en};var cC=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uC=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yr extends gc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cC,this.fragmentShader=uC,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oo(e.uniforms),this.uniformsGroups=aC(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}let G0=class extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};class Bn extends G0{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=If*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(iu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return If*2*Math.atan(Math.tan(iu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(iu*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ws=-90,As=1;class fC extends Rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bn(ws,As,e,t);r.layers=this.layers,this.add(r);const s=new Bn(ws,As,e,t);s.layers=this.layers,this.add(s);const o=new Bn(ws,As,e,t);o.layers=this.layers,this.add(o);const a=new Bn(ws,As,e,t);a.layers=this.layers,this.add(a);const l=new Bn(ws,As,e,t);l.layers=this.layers,this.add(l);const c=new Bn(ws,As,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===jl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class W0 extends gn{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:io,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hC extends as{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Vo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ts?Bt:kn),this.texture=new W0(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Fn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ya(5,5,5),s=new yr({name:"CubemapFromEquirect",uniforms:oo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:dr});s.uniforms.tEquirect.value=t;const o=new lr(r,s),a=t.minFilter;return t.minFilter===sa&&(t.minFilter=Fn),new fC(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Su=new ee,dC=new ee,pC=new je;class Br{constructor(e=new ee(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Su.subVectors(i,t).cross(dC.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Su),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||pC.getNormalMatrix(e),r=this.coplanarPoint(Su).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nr=new kh,sl=new ee;class X0{constructor(e=new Br,t=new Br,i=new Br,r=new Br,s=new Br,o=new Br){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ci){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],x=r[13],v=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-d,S-p).normalize(),i[1].setComponents(l+s,h+c,m+d,S+p).normalize(),i[2].setComponents(l+o,h+u,m+g,S+x).normalize(),i[3].setComponents(l-o,h-u,m-g,S-x).normalize(),i[4].setComponents(l-a,h-f,m-_,S-v).normalize(),t===Ci)i[5].setComponents(l+a,h+f,m+_,S+v).normalize();else if(t===jl)i[5].setComponents(a,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){return Nr.center.set(0,0,0),Nr.radius=.7071067811865476,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(sl.x=r.normal.x>0?e.max.x:e.min.x,sl.y=r.normal.y>0?e.max.y:e.min.y,sl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(sl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function j0(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function mC(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,h=c.usage,d=f.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=n.SHORT;else if(f instanceof Uint32Array)_=n.UNSIGNED_INT;else if(f instanceof Int32Array)_=n.INT;else if(f instanceof Int8Array)_=n.BYTE;else if(f instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,u,f){const h=u.array,d=u._updateRange,g=u.updateRanges;if(n.bindBuffer(f,c),d.count===-1&&g.length===0&&n.bufferSubData(f,0,h),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?n.bufferSubData(f,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count):n.bufferSubData(f,p.start*h.BYTES_PER_ELEMENT,h.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?n.bufferSubData(f,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count):n.bufferSubData(f,d.offset*h.BYTES_PER_ELEMENT,h.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:o,remove:a,update:l}}class vc extends fs{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const x=p*h-o;for(let v=0;v<c;v++){const S=v*f-s;g.push(S,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const v=x+c*p,S=x+c*(p+1),b=x+1+c*(p+1),E=x+1+c*p;d.push(v,S,E),d.push(S,b,E)}this.setIndex(d),this.setAttribute("position",new ns(g,3)),this.setAttribute("normal",new ns(_,3)),this.setAttribute("uv",new ns(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vc(e.width,e.height,e.widthSegments,e.heightSegments)}}var _C=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gC=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vC=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xC=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yC=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,SC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,MC=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,EC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bC=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,TC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,wC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RC=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,CC=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,PC=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,LC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,DC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,IC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,UC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,OC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,FC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,BC=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,kC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,HC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,VC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jC="gl_FragColor = linearToOutputTexel( gl_FragColor );",qC=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,$C=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,YC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,KC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ZC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,JC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,QC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,eP=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tP=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nP=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iP=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rP=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,sP=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,oP=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,aP=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lP=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cP=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,uP=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fP=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hP=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dP=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pP=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mP=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_P=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gP=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vP=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xP=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yP=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,SP=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,MP=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,EP=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bP=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,TP=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,wP=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AP=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,RP=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CP=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,PP=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,LP=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,DP=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,IP=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,UP=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,NP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,FP=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,BP=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kP=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zP=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,HP=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,VP=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,GP=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,WP=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,XP=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jP=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qP=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$P=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,YP=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,KP=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ZP=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,JP=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,QP=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eL=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tL=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nL=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,iL=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rL=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sL=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oL=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,aL=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lL=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cL=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uL=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pL=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mL=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_L=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vL=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yL=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ML=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,EL=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bL=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,TL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wL=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AL=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RL=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,PL=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LL=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DL=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IL=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,UL=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NL=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,OL=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,FL=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BL=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kL=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zL=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HL=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VL=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GL=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XL=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qL=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$L=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:_C,alphahash_pars_fragment:gC,alphamap_fragment:vC,alphamap_pars_fragment:xC,alphatest_fragment:yC,alphatest_pars_fragment:SC,aomap_fragment:MC,aomap_pars_fragment:EC,batching_pars_vertex:bC,batching_vertex:TC,begin_vertex:wC,beginnormal_vertex:AC,bsdfs:RC,iridescence_fragment:CC,bumpmap_pars_fragment:PC,clipping_planes_fragment:LC,clipping_planes_pars_fragment:DC,clipping_planes_pars_vertex:IC,clipping_planes_vertex:UC,color_fragment:NC,color_pars_fragment:OC,color_pars_vertex:FC,color_vertex:BC,common:kC,cube_uv_reflection_fragment:zC,defaultnormal_vertex:HC,displacementmap_pars_vertex:VC,displacementmap_vertex:GC,emissivemap_fragment:WC,emissivemap_pars_fragment:XC,colorspace_fragment:jC,colorspace_pars_fragment:qC,envmap_fragment:$C,envmap_common_pars_fragment:YC,envmap_pars_fragment:KC,envmap_pars_vertex:ZC,envmap_physical_pars_fragment:cP,envmap_vertex:JC,fog_vertex:QC,fog_pars_vertex:eP,fog_fragment:tP,fog_pars_fragment:nP,gradientmap_pars_fragment:iP,lightmap_fragment:rP,lightmap_pars_fragment:sP,lights_lambert_fragment:oP,lights_lambert_pars_fragment:aP,lights_pars_begin:lP,lights_toon_fragment:uP,lights_toon_pars_fragment:fP,lights_phong_fragment:hP,lights_phong_pars_fragment:dP,lights_physical_fragment:pP,lights_physical_pars_fragment:mP,lights_fragment_begin:_P,lights_fragment_maps:gP,lights_fragment_end:vP,logdepthbuf_fragment:xP,logdepthbuf_pars_fragment:yP,logdepthbuf_pars_vertex:SP,logdepthbuf_vertex:MP,map_fragment:EP,map_pars_fragment:bP,map_particle_fragment:TP,map_particle_pars_fragment:wP,metalnessmap_fragment:AP,metalnessmap_pars_fragment:RP,morphcolor_vertex:CP,morphnormal_vertex:PP,morphtarget_pars_vertex:LP,morphtarget_vertex:DP,normal_fragment_begin:IP,normal_fragment_maps:UP,normal_pars_fragment:NP,normal_pars_vertex:OP,normal_vertex:FP,normalmap_pars_fragment:BP,clearcoat_normal_fragment_begin:kP,clearcoat_normal_fragment_maps:zP,clearcoat_pars_fragment:HP,iridescence_pars_fragment:VP,opaque_fragment:GP,packing:WP,premultiplied_alpha_fragment:XP,project_vertex:jP,dithering_fragment:qP,dithering_pars_fragment:$P,roughnessmap_fragment:YP,roughnessmap_pars_fragment:KP,shadowmap_pars_fragment:ZP,shadowmap_pars_vertex:JP,shadowmap_vertex:QP,shadowmask_pars_fragment:eL,skinbase_vertex:tL,skinning_pars_vertex:nL,skinning_vertex:iL,skinnormal_vertex:rL,specularmap_fragment:sL,specularmap_pars_fragment:oL,tonemapping_fragment:aL,tonemapping_pars_fragment:lL,transmission_fragment:cL,transmission_pars_fragment:uL,uv_pars_fragment:fL,uv_pars_vertex:hL,uv_vertex:dL,worldpos_vertex:pL,background_vert:mL,background_frag:_L,backgroundCube_vert:gL,backgroundCube_frag:vL,cube_vert:xL,cube_frag:yL,depth_vert:SL,depth_frag:ML,distanceRGBA_vert:EL,distanceRGBA_frag:bL,equirect_vert:TL,equirect_frag:wL,linedashed_vert:AL,linedashed_frag:RL,meshbasic_vert:CL,meshbasic_frag:PL,meshlambert_vert:LL,meshlambert_frag:DL,meshmatcap_vert:IL,meshmatcap_frag:UL,meshnormal_vert:NL,meshnormal_frag:OL,meshphong_vert:FL,meshphong_frag:BL,meshphysical_vert:kL,meshphysical_frag:zL,meshtoon_vert:HL,meshtoon_frag:VL,points_vert:GL,points_frag:WL,shadow_vert:XL,shadow_frag:jL,sprite_vert:qL,sprite_frag:$L},ge={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},li={basic:{uniforms:en([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:en([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:en([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:en([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:en([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:en([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:en([ge.points,ge.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:en([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:en([ge.common,ge.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:en([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:en([ge.sprite,ge.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:en([ge.common,ge.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:en([ge.lights,ge.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};li.physical={uniforms:en([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const ol={r:0,b:0,g:0};function YL(n,e,t,i,r,s,o){const a=new nt(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(m,p){let x=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),x=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===pc)?(u===void 0&&(u=new lr(new ya(1,1,1),new yr({name:"BackgroundCubeMaterial",uniforms:oo(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=tt.getTransfer(v.colorSpace)!==ft,(f!==v||h!==v.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new lr(new vc(2,2),new yr({name:"BackgroundMaterial",uniforms:oo(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:xr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=tt.getTransfer(v.colorSpace)!==ft,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(ol,V0(n)),i.buffers.color.setClear(ol.r,ol.g,ol.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function KL(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function f(D,B,O,G,H){let ne=!1;if(o){const ue=_(G,O,B);c!==ue&&(c=ue,d(c.object)),ne=p(D,G,O,H),ne&&x(D,G,O,H)}else{const ue=B.wireframe===!0;(c.geometry!==G.id||c.program!==O.id||c.wireframe!==ue)&&(c.geometry=G.id,c.program=O.id,c.wireframe=ue,ne=!0)}H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(ne||u)&&(u=!1,L(D,B,O,G),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function h(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function d(D){return i.isWebGL2?n.bindVertexArray(D):s.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?n.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function _(D,B,O){const G=O.wireframe===!0;let H=a[D.id];H===void 0&&(H={},a[D.id]=H);let ne=H[B.id];ne===void 0&&(ne={},H[B.id]=ne);let ue=ne[G];return ue===void 0&&(ue=m(h()),ne[G]=ue),ue}function m(D){const B=[],O=[],G=[];for(let H=0;H<r;H++)B[H]=0,O[H]=0,G[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:O,attributeDivisors:G,object:D,attributes:{},index:null}}function p(D,B,O,G){const H=c.attributes,ne=B.attributes;let ue=0;const le=O.getAttributes();for(const pe in le)if(le[pe].location>=0){const se=H[pe];let me=ne[pe];if(me===void 0&&(pe==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),pe==="instanceColor"&&D.instanceColor&&(me=D.instanceColor)),se===void 0||se.attribute!==me||me&&se.data!==me.data)return!0;ue++}return c.attributesNum!==ue||c.index!==G}function x(D,B,O,G){const H={},ne=B.attributes;let ue=0;const le=O.getAttributes();for(const pe in le)if(le[pe].location>=0){let se=ne[pe];se===void 0&&(pe==="instanceMatrix"&&D.instanceMatrix&&(se=D.instanceMatrix),pe==="instanceColor"&&D.instanceColor&&(se=D.instanceColor));const me={};me.attribute=se,se&&se.data&&(me.data=se.data),H[pe]=me,ue++}c.attributes=H,c.attributesNum=ue,c.index=G}function v(){const D=c.newAttributes;for(let B=0,O=D.length;B<O;B++)D[B]=0}function S(D){b(D,0)}function b(D,B){const O=c.newAttributes,G=c.enabledAttributes,H=c.attributeDivisors;O[D]=1,G[D]===0&&(n.enableVertexAttribArray(D),G[D]=1),H[D]!==B&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),H[D]=B)}function E(){const D=c.newAttributes,B=c.enabledAttributes;for(let O=0,G=B.length;O<G;O++)B[O]!==D[O]&&(n.disableVertexAttribArray(O),B[O]=0)}function T(D,B,O,G,H,ne,ue){ue===!0?n.vertexAttribIPointer(D,B,O,H,ne):n.vertexAttribPointer(D,B,O,G,H,ne)}function L(D,B,O,G){if(i.isWebGL2===!1&&(D.isInstancedMesh||G.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const H=G.attributes,ne=O.getAttributes(),ue=B.defaultAttributeValues;for(const le in ne){const pe=ne[le];if(pe.location>=0){let Y=H[le];if(Y===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(Y=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(Y=D.instanceColor)),Y!==void 0){const se=Y.normalized,me=Y.itemSize,Se=t.get(Y);if(Se===void 0)continue;const V=Se.buffer,fe=Se.type,ae=Se.bytesPerElement,re=i.isWebGL2===!0&&(fe===n.INT||fe===n.UNSIGNED_INT||Y.gpuType===b0);if(Y.isInterleavedBufferAttribute){const Ee=Y.data,W=Ee.stride,C=Y.offset;if(Ee.isInstancedInterleavedBuffer){for(let P=0;P<pe.locationSize;P++)b(pe.location+P,Ee.meshPerAttribute);D.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let P=0;P<pe.locationSize;P++)S(pe.location+P);n.bindBuffer(n.ARRAY_BUFFER,V);for(let P=0;P<pe.locationSize;P++)T(pe.location+P,me/pe.locationSize,fe,se,W*ae,(C+me/pe.locationSize*P)*ae,re)}else{if(Y.isInstancedBufferAttribute){for(let Ee=0;Ee<pe.locationSize;Ee++)b(pe.location+Ee,Y.meshPerAttribute);D.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ee=0;Ee<pe.locationSize;Ee++)S(pe.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,V);for(let Ee=0;Ee<pe.locationSize;Ee++)T(pe.location+Ee,me/pe.locationSize,fe,se,me*ae,me/pe.locationSize*Ee*ae,re)}}else if(ue!==void 0){const se=ue[le];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(pe.location,se);break;case 3:n.vertexAttrib3fv(pe.location,se);break;case 4:n.vertexAttrib4fv(pe.location,se);break;default:n.vertexAttrib1fv(pe.location,se)}}}}E()}function y(){U();for(const D in a){const B=a[D];for(const O in B){const G=B[O];for(const H in G)g(G[H].object),delete G[H];delete B[O]}delete a[D]}}function w(D){if(a[D.id]===void 0)return;const B=a[D.id];for(const O in B){const G=B[O];for(const H in G)g(G[H].object),delete G[H];delete B[O]}delete a[D.id]}function N(D){for(const B in a){const O=a[B];if(O[D.id]===void 0)continue;const G=O[D.id];for(const H in G)g(G[H].object),delete G[H];delete O[D.id]}}function U(){$(),u=!0,c!==l&&(c=l,d(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:U,resetDefaultState:$,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfProgram:N,initAttributes:v,enableAttribute:S,disableUnusedAttributes:E}}function ZL(n,e,t,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,h){if(h===0)return;let d,g;if(r)d=n,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](s,u,f,h),t.update(f,s,h)}function c(u,f,h){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<h;g++)this.render(u[g],f[g]);else{d.multiDrawArraysWEBGL(s,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=f[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function JL(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,S=o||e.has("OES_texture_float"),b=v&&S,E=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:b,maxSamples:E}}function QL(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Br,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const x=s?0:i,v=x*4;let S=p.clippingState||null;l.value=S,S=u(g,h,v,d);for(let b=0;b!==v;++b)S[b]=t[b];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=d;v!==_;++v,S+=4)o.copy(f[v]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function e2(n){let e=new WeakMap;function t(o,a){return a===Rf?o.mapping=io:a===Cf&&(o.mapping=ro),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Rf||a===Cf)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new hC(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class t2 extends G0{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Us=4,Om=[.125,.215,.35,.446,.526,.582],Vr=20,Mu=new t2,Fm=new nt;let Eu=null,bu=0,Tu=0;const kr=(1+Math.sqrt(5))/2,Rs=1/kr,Bm=[new ee(1,1,1),new ee(-1,1,1),new ee(1,1,-1),new ee(-1,1,-1),new ee(0,kr,Rs),new ee(0,kr,-Rs),new ee(Rs,0,kr),new ee(-Rs,0,kr),new ee(kr,Rs,0),new ee(-kr,Rs,0)];class km{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Eu=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Tu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Eu,bu,Tu),e.scissorTest=!1,al(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===io||e.mapping===ro?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Eu=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Tu=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:oa,format:ni,colorSpace:Fi,depthBuffer:!1},r=zm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zm(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=n2(s)),this._blurMaterial=i2(s,e,t)}return r}_compileMaterial(e){const t=new lr(this._lodPlanes[0],e);this._renderer.compile(t,Mu)}_sceneToCubeUV(e,t,i,r){const a=new Bn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Fm),u.toneMapping=pr,u.autoClear=!1;const d=new k0({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),g=new lr(new ya,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(Fm),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const v=this._cubeSize;al(r,x*v,p>2?v:0,v,v),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===io||e.mapping===ro;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new lr(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;al(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Mu)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Bm[(r-1)%Bm.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new lr(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Vr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Vr;m>Vr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vr}`);const p=[];let x=0;for(let T=0;T<Vr;++T){const L=T/_,y=Math.exp(-L*L/2);p.push(y),T===0?x+=y:T<m&&(x+=2*y)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-i;const S=this._sizeLods[r],b=3*S*(r>v-Us?r-v+Us:0),E=4*(this._cubeSize-S);al(t,b,E,3*S,2*S),l.setRenderTarget(t),l.render(f,Mu)}}function n2(n){const e=[],t=[],i=[];let r=n;const s=n-Us+1+Om.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Us?l=Om[o-n+Us-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*d),v=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let E=0;E<d;E++){const T=E%3*2/3-1,L=E>2?0:-1,y=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];x.set(y,_*g*E),v.set(h,m*g*E);const w=[E,E,E,E,E,E];S.set(w,p*g*E)}const b=new fs;b.setAttribute("position",new mi(x,_)),b.setAttribute("uv",new mi(v,m)),b.setAttribute("faceIndex",new mi(S,p)),e.push(b),r>Us&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function zm(n,e,t){const i=new as(n,e,t);return i.texture.mapping=pc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function al(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function i2(n,e,t){const i=new Float32Array(Vr),r=new ee(0,1,0);return new yr({name:"SphericalGaussianBlur",defines:{n:Vr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Hm(){return new yr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Vm(){return new yr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function zh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function r2(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Rf||l===Cf,u=l===io||l===ro;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new km(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new km(n));const h=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function s2(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function o2(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let v=0,S=x.length;v<S;v+=3){const b=x[v+0],E=x[v+1],T=x[v+2];h.push(b,E,E,T,T,b)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const b=v+0,E=v+1,T=v+2;h.push(b,E,E,T,T,b)}}else return;const m=new(I0(h)?H0:z0)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function a2(n,e,t,i){const r=i.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,g){n.drawElements(s,g,a,d*l),t.update(g,s,1)}function f(d,g,_){if(_===0)return;let m,p;if(r)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,d*l,_),t.update(g,s,_)}function h(d,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,d,0,_);let p=0;for(let x=0;x<_;x++)p+=g[x];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function l2(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function c2(n,e){return n[0]-e[0]}function u2(n,e){return Math.abs(e[1])-Math.abs(n[1])}function f2(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new zt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0;let _=s.get(u);if(_===void 0||_.count!==g){let D=function(){U.dispose(),s.delete(u),u.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();const x=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,b=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let L=0;x===!0&&(L=1),v===!0&&(L=2),S===!0&&(L=3);let y=u.attributes.position.count*L,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const N=new Float32Array(y*w*4*g),U=new O0(N,y,w,g);U.type=ar,U.needsUpdate=!0;const $=L*4;for(let B=0;B<g;B++){const O=b[B],G=E[B],H=T[B],ne=y*w*4*B;for(let ue=0;ue<O.count;ue++){const le=ue*$;x===!0&&(o.fromBufferAttribute(O,ue),N[ne+le+0]=o.x,N[ne+le+1]=o.y,N[ne+le+2]=o.z,N[ne+le+3]=0),v===!0&&(o.fromBufferAttribute(G,ue),N[ne+le+4]=o.x,N[ne+le+5]=o.y,N[ne+le+6]=o.z,N[ne+le+7]=0),S===!0&&(o.fromBufferAttribute(H,ue),N[ne+le+8]=o.x,N[ne+le+9]=o.y,N[ne+le+10]=o.z,N[ne+le+11]=H.itemSize===4?o.w:1)}}_={count:g,texture:U,size:new Qe(y,w)},s.set(u,_),u.addEventListener("dispose",D)}let m=0;for(let x=0;x<h.length;x++)m+=h[x];const p=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",p),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",_.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",_.size)}else{const d=h===void 0?0:h.length;let g=i[u.id];if(g===void 0||g.length!==d){g=[];for(let v=0;v<d;v++)g[v]=[v,0];i[u.id]=g}for(let v=0;v<d;v++){const S=g[v];S[0]=v,S[1]=h[v]}g.sort(u2);for(let v=0;v<8;v++)v<d&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(c2);const _=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const S=a[v],b=S[0],E=S[1];b!==Number.MAX_SAFE_INTEGER&&E?(_&&u.getAttribute("morphTarget"+v)!==_[b]&&u.setAttribute("morphTarget"+v,_[b]),m&&u.getAttribute("morphNormal"+v)!==m[b]&&u.setAttribute("morphNormal"+v,m[b]),r[v]=E,p+=E):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),r[v]=0)}const x=u.morphTargetsRelative?1:1-p;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function h2(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class q0 extends gn{constructor(e,t,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:es,u!==es&&u!==so)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===es&&(i=or),i===void 0&&u===so&&(i=Qr),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:nn,this.minFilter=l!==void 0?l:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $0=new gn,Y0=new q0(1,1);Y0.compareFunction=D0;const K0=new O0,Z0=new $R,J0=new W0,Gm=[],Wm=[],Xm=new Float32Array(16),jm=new Float32Array(9),qm=new Float32Array(4);function ho(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Gm[r];if(s===void 0&&(s=new Float32Array(r),Gm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function xc(n,e){let t=Wm[e];t===void 0&&(t=new Int32Array(e),Wm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function d2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function p2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function m2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function _2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function g2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;qm.set(i),n.uniformMatrix2fv(this.addr,!1,qm),Pt(t,i)}}function v2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;jm.set(i),n.uniformMatrix3fv(this.addr,!1,jm),Pt(t,i)}}function x2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;Xm.set(i),n.uniformMatrix4fv(this.addr,!1,Xm),Pt(t,i)}}function y2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function S2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function M2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function E2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function b2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function T2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function w2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function A2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function R2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Y0:$0;t.setTexture2D(e||s,r)}function C2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Z0,r)}function P2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||J0,r)}function L2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||K0,r)}function D2(n){switch(n){case 5126:return d2;case 35664:return p2;case 35665:return m2;case 35666:return _2;case 35674:return g2;case 35675:return v2;case 35676:return x2;case 5124:case 35670:return y2;case 35667:case 35671:return S2;case 35668:case 35672:return M2;case 35669:case 35673:return E2;case 5125:return b2;case 36294:return T2;case 36295:return w2;case 36296:return A2;case 35678:case 36198:case 36298:case 36306:case 35682:return R2;case 35679:case 36299:case 36307:return C2;case 35680:case 36300:case 36308:case 36293:return P2;case 36289:case 36303:case 36311:case 36292:return L2}}function I2(n,e){n.uniform1fv(this.addr,e)}function U2(n,e){const t=ho(e,this.size,2);n.uniform2fv(this.addr,t)}function N2(n,e){const t=ho(e,this.size,3);n.uniform3fv(this.addr,t)}function O2(n,e){const t=ho(e,this.size,4);n.uniform4fv(this.addr,t)}function F2(n,e){const t=ho(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function B2(n,e){const t=ho(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function k2(n,e){const t=ho(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function z2(n,e){n.uniform1iv(this.addr,e)}function H2(n,e){n.uniform2iv(this.addr,e)}function V2(n,e){n.uniform3iv(this.addr,e)}function G2(n,e){n.uniform4iv(this.addr,e)}function W2(n,e){n.uniform1uiv(this.addr,e)}function X2(n,e){n.uniform2uiv(this.addr,e)}function j2(n,e){n.uniform3uiv(this.addr,e)}function q2(n,e){n.uniform4uiv(this.addr,e)}function $2(n,e,t){const i=this.cache,r=e.length,s=xc(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||$0,s[o])}function Y2(n,e,t){const i=this.cache,r=e.length,s=xc(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Z0,s[o])}function K2(n,e,t){const i=this.cache,r=e.length,s=xc(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||J0,s[o])}function Z2(n,e,t){const i=this.cache,r=e.length,s=xc(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||K0,s[o])}function J2(n){switch(n){case 5126:return I2;case 35664:return U2;case 35665:return N2;case 35666:return O2;case 35674:return F2;case 35675:return B2;case 35676:return k2;case 5124:case 35670:return z2;case 35667:case 35671:return H2;case 35668:case 35672:return V2;case 35669:case 35673:return G2;case 5125:return W2;case 36294:return X2;case 36295:return j2;case 36296:return q2;case 35678:case 36198:case 36298:case 36306:case 35682:return $2;case 35679:case 36299:case 36307:return Y2;case 35680:case 36300:case 36308:case 36293:return K2;case 36289:case 36303:case 36311:case 36292:return Z2}}class Q2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=D2(t.type)}}class eD{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=J2(t.type)}}class tD{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const wu=/(\w+)(\])?(\[|\.)?/g;function $m(n,e){n.seq.push(e),n.map[e.id]=e}function nD(n,e,t){const i=n.name,r=i.length;for(wu.lastIndex=0;;){const s=wu.exec(i),o=wu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){$m(t,c===void 0?new Q2(a,n,e):new eD(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new tD(a),$m(t,f)),t=f}}}class _l{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);nD(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ym(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const iD=37297;let rD=0;function sD(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function oD(n){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(n);let i;switch(e===t?i="":e===Xl&&t===Wl?i="LinearDisplayP3ToLinearSRGB":e===Wl&&t===Xl&&(i="LinearSRGBToLinearDisplayP3"),n){case Fi:case mc:return[i,"LinearTransferOETF"];case Bt:case Bh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Km(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+sD(n.getShaderSource(e),o)}else return r}function aD(n,e){const t=oD(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function lD(n,e){let t;switch(e){case _R:t="Linear";break;case gR:t="Reinhard";break;case vR:t="OptimizedCineon";break;case xR:t="ACESFilmic";break;case SR:t="AgX";break;case yR:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function cD(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ns).join(`
`)}function uD(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ns).join(`
`)}function fD(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function hD(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ns(n){return n!==""}function Zm(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dD=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nf(n){return n.replace(dD,mD)}const pD=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function mD(n,e){let t=Ve[e];if(t===void 0){const i=pD.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Nf(t)}const _D=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qm(n){return n.replace(_D,gD)}function gD(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function e_(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vD(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===S0?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===W1?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ti&&(e="SHADOWMAP_TYPE_VSM"),e}function xD(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case io:case ro:e="ENVMAP_TYPE_CUBE";break;case pc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yD(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ro:e="ENVMAP_MODE_REFRACTION";break}return e}function SD(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case M0:e="ENVMAP_BLENDING_MULTIPLY";break;case pR:e="ENVMAP_BLENDING_MIX";break;case mR:e="ENVMAP_BLENDING_ADD";break}return e}function MD(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function ED(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=vD(t),c=xD(t),u=yD(t),f=SD(t),h=MD(t),d=t.isWebGL2?"":cD(t),g=uD(t),_=fD(s),m=r.createProgram();let p,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ns).join(`
`),p.length>0&&(p+=`
`),x=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ns).join(`
`),x.length>0&&(x+=`
`)):(p=[e_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),x=[d,e_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pr?"#define TONE_MAPPING":"",t.toneMapping!==pr?Ve.tonemapping_pars_fragment:"",t.toneMapping!==pr?lD("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,aD("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ns).join(`
`)),o=Nf(o),o=Zm(o,t),o=Jm(o,t),a=Nf(a),a=Zm(a,t),a=Jm(a,t),o=Qm(o),a=Qm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===vm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+p+o,b=v+x+a,E=Ym(r,r.VERTEX_SHADER,S),T=Ym(r,r.FRAGMENT_SHADER,b);r.attachShader(m,E),r.attachShader(m,T),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function L(U){if(n.debug.checkShaderErrors){const $=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(E).trim(),B=r.getShaderInfoLog(T).trim();let O=!0,G=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,E,T);else{const H=Km(r,E,"vertex"),ne=Km(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+H+`
`+ne)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(D===""||B==="")&&(G=!1);G&&(U.diagnostics={runnable:O,programLog:$,vertexShader:{log:D,prefix:p},fragmentShader:{log:B,prefix:x}})}r.deleteShader(E),r.deleteShader(T),y=new _l(r,m),w=hD(r,m)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(m,iD)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rD++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=T,this}let bD=0;class TD{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new wD(e),t.set(e,i)),i}}class wD{constructor(e){this.id=bD++,this.code=e,this.usedTimes=0}}function AD(n,e,t,i,r,s,o){const a=new F0,l=new TD,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,w,N,U,$){const D=U.fog,B=$.geometry,O=y.isMeshStandardMaterial?U.environment:null,G=(y.isMeshStandardMaterial?t:e).get(y.envMap||O),H=G&&G.mapping===pc?G.image.height:null,ne=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const ue=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=ue!==void 0?ue.length:0;let pe=0;B.morphAttributes.position!==void 0&&(pe=1),B.morphAttributes.normal!==void 0&&(pe=2),B.morphAttributes.color!==void 0&&(pe=3);let Y,se,me,Se;if(ne){const Zt=li[ne];Y=Zt.vertexShader,se=Zt.fragmentShader}else Y=y.vertexShader,se=y.fragmentShader,l.update(y),me=l.getVertexShaderID(y),Se=l.getFragmentShaderID(y);const V=n.getRenderTarget(),fe=$.isInstancedMesh===!0,ae=$.isBatchedMesh===!0,re=!!y.map,Ee=!!y.matcap,W=!!G,C=!!y.aoMap,P=!!y.lightMap,k=!!y.bumpMap,X=!!y.normalMap,J=!!y.displacementMap,ie=!!y.emissiveMap,A=!!y.metalnessMap,M=!!y.roughnessMap,I=y.anisotropy>0,z=y.clearcoat>0,q=y.iridescence>0,K=y.sheen>0,he=y.transmission>0,oe=I&&!!y.anisotropyMap,de=z&&!!y.clearcoatMap,ve=z&&!!y.clearcoatNormalMap,be=z&&!!y.clearcoatRoughnessMap,ce=q&&!!y.iridescenceMap,ze=q&&!!y.iridescenceThicknessMap,Oe=K&&!!y.sheenColorMap,Ie=K&&!!y.sheenRoughnessMap,we=!!y.specularMap,Te=!!y.specularColorMap,Re=!!y.specularIntensityMap,He=he&&!!y.transmissionMap,ut=he&&!!y.thicknessMap,We=!!y.gradientMap,_e=!!y.alphaMap,F=y.alphaTest>0,xe=!!y.alphaHash,ye=!!y.extensions,Ue=!!B.attributes.uv1,Pe=!!B.attributes.uv2,ot=!!B.attributes.uv3;let at=pr;return y.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(at=n.toneMapping),{isWebGL2:u,shaderID:ne,shaderType:y.type,shaderName:y.name,vertexShader:Y,fragmentShader:se,defines:y.defines,customVertexShaderID:me,customFragmentShaderID:Se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ae,instancing:fe,instancingColor:fe&&$.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:V===null?n.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Fi,map:re,matcap:Ee,envMap:W,envMapMode:W&&G.mapping,envMapCubeUVHeight:H,aoMap:C,lightMap:P,bumpMap:k,normalMap:X,displacementMap:h&&J,emissiveMap:ie,normalMapObjectSpace:X&&y.normalMapType===UR,normalMapTangentSpace:X&&y.normalMapType===IR,metalnessMap:A,roughnessMap:M,anisotropy:I,anisotropyMap:oe,clearcoat:z,clearcoatMap:de,clearcoatNormalMap:ve,clearcoatRoughnessMap:be,iridescence:q,iridescenceMap:ce,iridescenceThicknessMap:ze,sheen:K,sheenColorMap:Oe,sheenRoughnessMap:Ie,specularMap:we,specularColorMap:Te,specularIntensityMap:Re,transmission:he,transmissionMap:He,thicknessMap:ut,gradientMap:We,opaque:y.transparent===!1&&y.blending===Xs,alphaMap:_e,alphaTest:F,alphaHash:xe,combine:y.combine,mapUv:re&&_(y.map.channel),aoMapUv:C&&_(y.aoMap.channel),lightMapUv:P&&_(y.lightMap.channel),bumpMapUv:k&&_(y.bumpMap.channel),normalMapUv:X&&_(y.normalMap.channel),displacementMapUv:J&&_(y.displacementMap.channel),emissiveMapUv:ie&&_(y.emissiveMap.channel),metalnessMapUv:A&&_(y.metalnessMap.channel),roughnessMapUv:M&&_(y.roughnessMap.channel),anisotropyMapUv:oe&&_(y.anisotropyMap.channel),clearcoatMapUv:de&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ve&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(y.sheenRoughnessMap.channel),specularMapUv:we&&_(y.specularMap.channel),specularColorMapUv:Te&&_(y.specularColorMap.channel),specularIntensityMapUv:Re&&_(y.specularIntensityMap.channel),transmissionMapUv:He&&_(y.transmissionMap.channel),thicknessMapUv:ut&&_(y.thicknessMap.channel),alphaMapUv:_e&&_(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(X||I),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Pe,vertexUv3s:ot,pointsUvs:$.isPoints===!0&&!!B.attributes.uv&&(re||_e),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:$.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:pe,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:at,useLegacyLights:n._useLegacyLights,decodeVideoTexture:re&&y.map.isVideoTexture===!0&&tt.getTransfer(y.map.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ri,flipSided:y.side===_n,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ye&&y.extensions.derivatives===!0,extensionFragDepth:ye&&y.extensions.fragDepth===!0,extensionDrawBuffers:ye&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)w.push(N),w.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(x(w,y),v(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function x(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function v(y,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function S(y){const w=g[y.type];let N;if(w){const U=li[w];N=lC.clone(U.uniforms)}else N=y.uniforms;return N}function b(y,w){let N;for(let U=0,$=c.length;U<$;U++){const D=c[U];if(D.cacheKey===w){N=D,++N.usedTimes;break}}return N===void 0&&(N=new ED(n,w,y,s),c.push(N)),N}function E(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function T(y){l.remove(y)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:b,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:L}}function RD(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function CD(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function t_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function n_(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,d,g,_,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||CD),i.length>1&&i.sort(h||t_),r.length>1&&r.sort(h||t_)}function u(){for(let f=e,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function PD(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new n_,n.set(i,[o])):r>=s.length?(o=new n_,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function LD(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ee,color:new nt};break;case"SpotLight":t={position:new ee,direction:new ee,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ee,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ee,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return n[e.id]=t,t}}}function DD(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ID=0;function UD(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ND(n,e){const t=new LD,i=DD(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new ee);const s=new ee,o=new Ht,a=new Ht;function l(u,f){let h=0,d=0,g=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let _=0,m=0,p=0,x=0,v=0,S=0,b=0,E=0,T=0,L=0,y=0;u.sort(UD);const w=f===!0?Math.PI:1;for(let U=0,$=u.length;U<$;U++){const D=u[U],B=D.color,O=D.intensity,G=D.distance,H=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=B.r*O*w,d+=B.g*O*w,g+=B.b*O*w;else if(D.isLightProbe){for(let ne=0;ne<9;ne++)r.probe[ne].addScaledVector(D.sh.coefficients[ne],O);y++}else if(D.isDirectionalLight){const ne=t.get(D);if(ne.color.copy(D.color).multiplyScalar(D.intensity*w),D.castShadow){const ue=D.shadow,le=i.get(D);le.shadowBias=ue.bias,le.shadowNormalBias=ue.normalBias,le.shadowRadius=ue.radius,le.shadowMapSize=ue.mapSize,r.directionalShadow[_]=le,r.directionalShadowMap[_]=H,r.directionalShadowMatrix[_]=D.shadow.matrix,S++}r.directional[_]=ne,_++}else if(D.isSpotLight){const ne=t.get(D);ne.position.setFromMatrixPosition(D.matrixWorld),ne.color.copy(B).multiplyScalar(O*w),ne.distance=G,ne.coneCos=Math.cos(D.angle),ne.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),ne.decay=D.decay,r.spot[p]=ne;const ue=D.shadow;if(D.map&&(r.spotLightMap[T]=D.map,T++,ue.updateMatrices(D),D.castShadow&&L++),r.spotLightMatrix[p]=ue.matrix,D.castShadow){const le=i.get(D);le.shadowBias=ue.bias,le.shadowNormalBias=ue.normalBias,le.shadowRadius=ue.radius,le.shadowMapSize=ue.mapSize,r.spotShadow[p]=le,r.spotShadowMap[p]=H,E++}p++}else if(D.isRectAreaLight){const ne=t.get(D);ne.color.copy(B).multiplyScalar(O),ne.halfWidth.set(D.width*.5,0,0),ne.halfHeight.set(0,D.height*.5,0),r.rectArea[x]=ne,x++}else if(D.isPointLight){const ne=t.get(D);if(ne.color.copy(D.color).multiplyScalar(D.intensity*w),ne.distance=D.distance,ne.decay=D.decay,D.castShadow){const ue=D.shadow,le=i.get(D);le.shadowBias=ue.bias,le.shadowNormalBias=ue.normalBias,le.shadowRadius=ue.radius,le.shadowMapSize=ue.mapSize,le.shadowCameraNear=ue.camera.near,le.shadowCameraFar=ue.camera.far,r.pointShadow[m]=le,r.pointShadowMap[m]=H,r.pointShadowMatrix[m]=D.shadow.matrix,b++}r.point[m]=ne,m++}else if(D.isHemisphereLight){const ne=t.get(D);ne.skyColor.copy(D.color).multiplyScalar(O*w),ne.groundColor.copy(D.groundColor).multiplyScalar(O*w),r.hemi[v]=ne,v++}}x>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_FLOAT_1,r.rectAreaLTC2=ge.LTC_FLOAT_2):(r.rectAreaLTC1=ge.LTC_HALF_1,r.rectAreaLTC2=ge.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_FLOAT_1,r.rectAreaLTC2=ge.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_HALF_1,r.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=d,r.ambient[2]=g;const N=r.hash;(N.directionalLength!==_||N.pointLength!==m||N.spotLength!==p||N.rectAreaLength!==x||N.hemiLength!==v||N.numDirectionalShadows!==S||N.numPointShadows!==b||N.numSpotShadows!==E||N.numSpotMaps!==T||N.numLightProbes!==y)&&(r.directional.length=_,r.spot.length=p,r.rectArea.length=x,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=b,r.pointShadowMap.length=b,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=b,r.spotLightMatrix.length=E+T-L,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=y,N.directionalLength=_,N.pointLength=m,N.spotLength=p,N.rectAreaLength=x,N.hemiLength=v,N.numDirectionalShadows=S,N.numPointShadows=b,N.numSpotShadows=E,N.numSpotMaps=T,N.numLightProbes=y,r.version=ID++)}function c(u,f){let h=0,d=0,g=0,_=0,m=0;const p=f.matrixWorldInverse;for(let x=0,v=u.length;x<v;x++){const S=u[x];if(S.isDirectionalLight){const b=r.directional[h];b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),h++}else if(S.isSpotLight){const b=r.spot[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const b=r.rectArea[_];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const b=r.point[d];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const b=r.hemi[m];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:r}}function i_(n,e){const t=new ND(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function OD(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new i_(n,e),t.set(s,[l])):o>=a.length?(l=new i_(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class FD extends gc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=LR,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class BD extends gc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zD=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function HD(n,e,t){let i=new X0;const r=new Qe,s=new Qe,o=new zt,a=new FD({depthPacking:DR}),l=new BD,c={},u=t.maxTextureSize,f={[xr]:_n,[_n]:xr,[Ri]:Ri},h=new yr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:kD,fragmentShader:zD}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new fs;g.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new lr(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=S0;let p=this.type;this.render=function(E,T,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const y=n.getRenderTarget(),w=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),U=n.state;U.setBlending(dr),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const $=p!==Ti&&this.type===Ti,D=p===Ti&&this.type!==Ti;for(let B=0,O=E.length;B<O;B++){const G=E[B],H=G.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ne=H.getFrameExtents();if(r.multiply(ne),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,H.mapSize.y=s.y)),H.map===null||$===!0||D===!0){const le=this.type!==Ti?{minFilter:nn,magFilter:nn}:{};H.map!==null&&H.map.dispose(),H.map=new as(r.x,r.y,le),H.map.texture.name=G.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ue=H.getViewportCount();for(let le=0;le<ue;le++){const pe=H.getViewport(le);o.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),U.viewport(o),H.updateMatrices(G,le),i=H.getFrustum(),S(T,L,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===Ti&&x(H,L),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,w,N)};function x(E,T){const L=e.update(_);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new as(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(T,null,L,h,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(T,null,L,d,_,null)}function v(E,T,L,y){let w=null;const N=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)w=N;else if(w=L.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const U=w.uuid,$=T.uuid;let D=c[U];D===void 0&&(D={},c[U]=D);let B=D[$];B===void 0&&(B=w.clone(),D[$]=B,T.addEventListener("dispose",b)),w=B}if(w.visible=T.visible,w.wireframe=T.wireframe,y===Ti?w.side=T.shadowSide!==null?T.shadowSide:T.side:w.side=T.shadowSide!==null?T.shadowSide:f[T.side],w.alphaMap=T.alphaMap,w.alphaTest=T.alphaTest,w.map=T.map,w.clipShadows=T.clipShadows,w.clippingPlanes=T.clippingPlanes,w.clipIntersection=T.clipIntersection,w.displacementMap=T.displacementMap,w.displacementScale=T.displacementScale,w.displacementBias=T.displacementBias,w.wireframeLinewidth=T.wireframeLinewidth,w.linewidth=T.linewidth,L.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=n.properties.get(w);U.light=L}return w}function S(E,T,L,y,w){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&w===Ti)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);const $=e.update(E),D=E.material;if(Array.isArray(D)){const B=$.groups;for(let O=0,G=B.length;O<G;O++){const H=B[O],ne=D[H.materialIndex];if(ne&&ne.visible){const ue=v(E,ne,y,w);E.onBeforeShadow(n,E,T,L,$,ue,H),n.renderBufferDirect(L,null,$,ue,E,H),E.onAfterShadow(n,E,T,L,$,ue,H)}}}else if(D.visible){const B=v(E,D,y,w);E.onBeforeShadow(n,E,T,L,$,B,null),n.renderBufferDirect(L,null,$,B,E,null),E.onAfterShadow(n,E,T,L,$,B,null)}}const U=E.children;for(let $=0,D=U.length;$<D;$++)S(U[$],T,L,y,w)}function b(E){E.target.removeEventListener("dispose",b);for(const L in c){const y=c[L],w=E.target.uuid;w in y&&(y[w].dispose(),delete y[w])}}}function VD(n,e,t){const i=t.isWebGL2;function r(){let F=!1;const xe=new zt;let ye=null;const Ue=new zt(0,0,0,0);return{setMask:function(Pe){ye!==Pe&&!F&&(n.colorMask(Pe,Pe,Pe,Pe),ye=Pe)},setLocked:function(Pe){F=Pe},setClear:function(Pe,ot,at,Lt,Zt){Zt===!0&&(Pe*=Lt,ot*=Lt,at*=Lt),xe.set(Pe,ot,at,Lt),Ue.equals(xe)===!1&&(n.clearColor(Pe,ot,at,Lt),Ue.copy(xe))},reset:function(){F=!1,ye=null,Ue.set(-1,0,0,0)}}}function s(){let F=!1,xe=null,ye=null,Ue=null;return{setTest:function(Pe){Pe?ae(n.DEPTH_TEST):re(n.DEPTH_TEST)},setMask:function(Pe){xe!==Pe&&!F&&(n.depthMask(Pe),xe=Pe)},setFunc:function(Pe){if(ye!==Pe){switch(Pe){case aR:n.depthFunc(n.NEVER);break;case lR:n.depthFunc(n.ALWAYS);break;case cR:n.depthFunc(n.LESS);break;case Vl:n.depthFunc(n.LEQUAL);break;case uR:n.depthFunc(n.EQUAL);break;case fR:n.depthFunc(n.GEQUAL);break;case hR:n.depthFunc(n.GREATER);break;case dR:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=Pe}},setLocked:function(Pe){F=Pe},setClear:function(Pe){Ue!==Pe&&(n.clearDepth(Pe),Ue=Pe)},reset:function(){F=!1,xe=null,ye=null,Ue=null}}}function o(){let F=!1,xe=null,ye=null,Ue=null,Pe=null,ot=null,at=null,Lt=null,Zt=null;return{setTest:function(lt){F||(lt?ae(n.STENCIL_TEST):re(n.STENCIL_TEST))},setMask:function(lt){xe!==lt&&!F&&(n.stencilMask(lt),xe=lt)},setFunc:function(lt,Jt,ri){(ye!==lt||Ue!==Jt||Pe!==ri)&&(n.stencilFunc(lt,Jt,ri),ye=lt,Ue=Jt,Pe=ri)},setOp:function(lt,Jt,ri){(ot!==lt||at!==Jt||Lt!==ri)&&(n.stencilOp(lt,Jt,ri),ot=lt,at=Jt,Lt=ri)},setLocked:function(lt){F=lt},setClear:function(lt){Zt!==lt&&(n.clearStencil(lt),Zt=lt)},reset:function(){F=!1,xe=null,ye=null,Ue=null,Pe=null,ot=null,at=null,Lt=null,Zt=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,f=new WeakMap;let h={},d={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,b=null,E=null,T=null,L=null,y=new nt(0,0,0),w=0,N=!1,U=null,$=null,D=null,B=null,O=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,ne=0;const ue=n.getParameter(n.VERSION);ue.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(ue)[1]),H=ne>=1):ue.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),H=ne>=2);let le=null,pe={};const Y=n.getParameter(n.SCISSOR_BOX),se=n.getParameter(n.VIEWPORT),me=new zt().fromArray(Y),Se=new zt().fromArray(se);function V(F,xe,ye,Ue){const Pe=new Uint8Array(4),ot=n.createTexture();n.bindTexture(F,ot),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let at=0;at<ye;at++)i&&(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)?n.texImage3D(xe,0,n.RGBA,1,1,Ue,0,n.RGBA,n.UNSIGNED_BYTE,Pe):n.texImage2D(xe+at,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Pe);return ot}const fe={};fe[n.TEXTURE_2D]=V(n.TEXTURE_2D,n.TEXTURE_2D,1),fe[n.TEXTURE_CUBE_MAP]=V(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(fe[n.TEXTURE_2D_ARRAY]=V(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),fe[n.TEXTURE_3D]=V(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ae(n.DEPTH_TEST),l.setFunc(Vl),ie(!1),A(Bp),ae(n.CULL_FACE),X(dr);function ae(F){h[F]!==!0&&(n.enable(F),h[F]=!0)}function re(F){h[F]!==!1&&(n.disable(F),h[F]=!1)}function Ee(F,xe){return d[F]!==xe?(n.bindFramebuffer(F,xe),d[F]=xe,i&&(F===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),F===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe)),!0):!1}function W(F,xe){let ye=_,Ue=!1;if(F)if(ye=g.get(xe),ye===void 0&&(ye=[],g.set(xe,ye)),F.isWebGLMultipleRenderTargets){const Pe=F.texture;if(ye.length!==Pe.length||ye[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,at=Pe.length;ot<at;ot++)ye[ot]=n.COLOR_ATTACHMENT0+ot;ye.length=Pe.length,Ue=!0}}else ye[0]!==n.COLOR_ATTACHMENT0&&(ye[0]=n.COLOR_ATTACHMENT0,Ue=!0);else ye[0]!==n.BACK&&(ye[0]=n.BACK,Ue=!0);Ue&&(t.isWebGL2?n.drawBuffers(ye):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ye))}function C(F){return m!==F?(n.useProgram(F),m=F,!0):!1}const P={[Hr]:n.FUNC_ADD,[j1]:n.FUNC_SUBTRACT,[q1]:n.FUNC_REVERSE_SUBTRACT};if(i)P[Vp]=n.MIN,P[Gp]=n.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(P[Vp]=F.MIN_EXT,P[Gp]=F.MAX_EXT)}const k={[$1]:n.ZERO,[Y1]:n.ONE,[K1]:n.SRC_COLOR,[wf]:n.SRC_ALPHA,[nR]:n.SRC_ALPHA_SATURATE,[eR]:n.DST_COLOR,[J1]:n.DST_ALPHA,[Z1]:n.ONE_MINUS_SRC_COLOR,[Af]:n.ONE_MINUS_SRC_ALPHA,[tR]:n.ONE_MINUS_DST_COLOR,[Q1]:n.ONE_MINUS_DST_ALPHA,[iR]:n.CONSTANT_COLOR,[rR]:n.ONE_MINUS_CONSTANT_COLOR,[sR]:n.CONSTANT_ALPHA,[oR]:n.ONE_MINUS_CONSTANT_ALPHA};function X(F,xe,ye,Ue,Pe,ot,at,Lt,Zt,lt){if(F===dr){p===!0&&(re(n.BLEND),p=!1);return}if(p===!1&&(ae(n.BLEND),p=!0),F!==X1){if(F!==x||lt!==N){if((v!==Hr||E!==Hr)&&(n.blendEquation(n.FUNC_ADD),v=Hr,E=Hr),lt)switch(F){case Xs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case kp:n.blendFunc(n.ONE,n.ONE);break;case zp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hp:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Xs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case kp:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case zp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hp:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,b=null,T=null,L=null,y.set(0,0,0),w=0,x=F,N=lt}return}Pe=Pe||xe,ot=ot||ye,at=at||Ue,(xe!==v||Pe!==E)&&(n.blendEquationSeparate(P[xe],P[Pe]),v=xe,E=Pe),(ye!==S||Ue!==b||ot!==T||at!==L)&&(n.blendFuncSeparate(k[ye],k[Ue],k[ot],k[at]),S=ye,b=Ue,T=ot,L=at),(Lt.equals(y)===!1||Zt!==w)&&(n.blendColor(Lt.r,Lt.g,Lt.b,Zt),y.copy(Lt),w=Zt),x=F,N=!1}function J(F,xe){F.side===Ri?re(n.CULL_FACE):ae(n.CULL_FACE);let ye=F.side===_n;xe&&(ye=!ye),ie(ye),F.blending===Xs&&F.transparent===!1?X(dr):X(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),a.setMask(F.colorWrite);const Ue=F.stencilWrite;c.setTest(Ue),Ue&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),I(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):re(n.SAMPLE_ALPHA_TO_COVERAGE)}function ie(F){U!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),U=F)}function A(F){F!==V1?(ae(n.CULL_FACE),F!==$&&(F===Bp?n.cullFace(n.BACK):F===G1?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):re(n.CULL_FACE),$=F}function M(F){F!==D&&(H&&n.lineWidth(F),D=F)}function I(F,xe,ye){F?(ae(n.POLYGON_OFFSET_FILL),(B!==xe||O!==ye)&&(n.polygonOffset(xe,ye),B=xe,O=ye)):re(n.POLYGON_OFFSET_FILL)}function z(F){F?ae(n.SCISSOR_TEST):re(n.SCISSOR_TEST)}function q(F){F===void 0&&(F=n.TEXTURE0+G-1),le!==F&&(n.activeTexture(F),le=F)}function K(F,xe,ye){ye===void 0&&(le===null?ye=n.TEXTURE0+G-1:ye=le);let Ue=pe[ye];Ue===void 0&&(Ue={type:void 0,texture:void 0},pe[ye]=Ue),(Ue.type!==F||Ue.texture!==xe)&&(le!==ye&&(n.activeTexture(ye),le=ye),n.bindTexture(F,xe||fe[F]),Ue.type=F,Ue.texture=xe)}function he(){const F=pe[le];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function oe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Oe(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ie(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(F){me.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),me.copy(F))}function He(F){Se.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Se.copy(F))}function ut(F,xe){let ye=f.get(xe);ye===void 0&&(ye=new WeakMap,f.set(xe,ye));let Ue=ye.get(F);Ue===void 0&&(Ue=n.getUniformBlockIndex(xe,F.name),ye.set(F,Ue))}function We(F,xe){const Ue=f.get(xe).get(F);u.get(xe)!==Ue&&(n.uniformBlockBinding(xe,Ue,F.__bindingPointIndex),u.set(xe,Ue))}function _e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},le=null,pe={},d={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,b=null,E=null,T=null,L=null,y=new nt(0,0,0),w=0,N=!1,U=null,$=null,D=null,B=null,O=null,me.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ae,disable:re,bindFramebuffer:Ee,drawBuffers:W,useProgram:C,setBlending:X,setMaterial:J,setFlipSided:ie,setCullFace:A,setLineWidth:M,setPolygonOffset:I,setScissorTest:z,activeTexture:q,bindTexture:K,unbindTexture:he,compressedTexImage2D:oe,compressedTexImage3D:de,texImage2D:we,texImage3D:Te,updateUBOMapping:ut,uniformBlockBinding:We,texStorage2D:Oe,texStorage3D:Ie,texSubImage2D:ve,texSubImage3D:be,compressedTexSubImage2D:ce,compressedTexSubImage3D:ze,scissor:Re,viewport:He,reset:_e}}function GD(n,e,t,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return d?new OffscreenCanvas(A,M):aa("canvas")}function _(A,M,I,z){let q=1;if((A.width>z||A.height>z)&&(q=z/Math.max(A.width,A.height)),q<1||M===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const K=M?Uf:Math.floor,he=K(q*A.width),oe=K(q*A.height);f===void 0&&(f=g(he,oe));const de=I?g(he,oe):f;return de.width=he,de.height=oe,de.getContext("2d").drawImage(A,0,0,he,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+he+"x"+oe+")."),de}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return xm(A.width)&&xm(A.height)}function p(A){return a?!1:A.wrapS!==ti||A.wrapT!==ti||A.minFilter!==nn&&A.minFilter!==Fn}function x(A,M){return A.generateMipmaps&&M&&A.minFilter!==nn&&A.minFilter!==Fn}function v(A){n.generateMipmap(A)}function S(A,M,I,z,q=!1){if(a===!1)return M;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=M;if(M===n.RED&&(I===n.FLOAT&&(K=n.R32F),I===n.HALF_FLOAT&&(K=n.R16F),I===n.UNSIGNED_BYTE&&(K=n.R8)),M===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(K=n.R8UI),I===n.UNSIGNED_SHORT&&(K=n.R16UI),I===n.UNSIGNED_INT&&(K=n.R32UI),I===n.BYTE&&(K=n.R8I),I===n.SHORT&&(K=n.R16I),I===n.INT&&(K=n.R32I)),M===n.RG&&(I===n.FLOAT&&(K=n.RG32F),I===n.HALF_FLOAT&&(K=n.RG16F),I===n.UNSIGNED_BYTE&&(K=n.RG8)),M===n.RGBA){const he=q?Gl:tt.getTransfer(z);I===n.FLOAT&&(K=n.RGBA32F),I===n.HALF_FLOAT&&(K=n.RGBA16F),I===n.UNSIGNED_BYTE&&(K=he===ft?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function b(A,M,I){return x(A,I)===!0||A.isFramebufferTexture&&A.minFilter!==nn&&A.minFilter!==Fn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function E(A){return A===nn||A===Wp||A===Zc?n.NEAREST:n.LINEAR}function T(A){const M=A.target;M.removeEventListener("dispose",T),y(M),M.isVideoTexture&&u.delete(M)}function L(A){const M=A.target;M.removeEventListener("dispose",L),N(M)}function y(A){const M=i.get(A);if(M.__webglInit===void 0)return;const I=A.source,z=h.get(I);if(z){const q=z[M.__cacheKey];q.usedTimes--,q.usedTimes===0&&w(A),Object.keys(z).length===0&&h.delete(I)}i.remove(A)}function w(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const I=A.source,z=h.get(I);delete z[M.__cacheKey],o.memory.textures--}function N(A){const M=A.texture,I=i.get(A),z=i.get(M);if(z.__webglTexture!==void 0&&(n.deleteTexture(z.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(I.__webglFramebuffer[q]))for(let K=0;K<I.__webglFramebuffer[q].length;K++)n.deleteFramebuffer(I.__webglFramebuffer[q][K]);else n.deleteFramebuffer(I.__webglFramebuffer[q]);I.__webglDepthbuffer&&n.deleteRenderbuffer(I.__webglDepthbuffer[q])}else{if(Array.isArray(I.__webglFramebuffer))for(let q=0;q<I.__webglFramebuffer.length;q++)n.deleteFramebuffer(I.__webglFramebuffer[q]);else n.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&n.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&n.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let q=0;q<I.__webglColorRenderbuffer.length;q++)I.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(I.__webglColorRenderbuffer[q]);I.__webglDepthRenderbuffer&&n.deleteRenderbuffer(I.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let q=0,K=M.length;q<K;q++){const he=i.get(M[q]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),o.memory.textures--),i.remove(M[q])}i.remove(M),i.remove(A)}let U=0;function $(){U=0}function D(){const A=U;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),U+=1,A}function B(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function O(A,M){const I=i.get(A);if(A.isVideoTexture&&J(A),A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version){const z=A.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(I,A,M);return}}t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+M)}function G(A,M){const I=i.get(A);if(A.version>0&&I.__version!==A.version){me(I,A,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+M)}function H(A,M){const I=i.get(A);if(A.version>0&&I.__version!==A.version){me(I,A,M);return}t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+M)}function ne(A,M){const I=i.get(A);if(A.version>0&&I.__version!==A.version){Se(I,A,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+M)}const ue={[Pf]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[Lf]:n.MIRRORED_REPEAT},le={[nn]:n.NEAREST,[Wp]:n.NEAREST_MIPMAP_NEAREST,[Zc]:n.NEAREST_MIPMAP_LINEAR,[Fn]:n.LINEAR,[MR]:n.LINEAR_MIPMAP_NEAREST,[sa]:n.LINEAR_MIPMAP_LINEAR},pe={[NR]:n.NEVER,[HR]:n.ALWAYS,[OR]:n.LESS,[D0]:n.LEQUAL,[FR]:n.EQUAL,[zR]:n.GEQUAL,[BR]:n.GREATER,[kR]:n.NOTEQUAL};function Y(A,M,I){if(I?(n.texParameteri(A,n.TEXTURE_WRAP_S,ue[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ue[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ue[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,le[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,le[M.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(M.wrapS!==ti||M.wrapT!==ti)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,E(M.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,E(M.minFilter)),M.minFilter!==nn&&M.minFilter!==Fn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,pe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===nn||M.minFilter!==Zc&&M.minFilter!==sa||M.type===ar&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===oa&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function se(A,M){let I=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",T));const z=M.source;let q=h.get(z);q===void 0&&(q={},h.set(z,q));const K=B(M);if(K!==A.__cacheKey){q[K]===void 0&&(q[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),q[K].usedTimes++;const he=q[A.__cacheKey];he!==void 0&&(q[A.__cacheKey].usedTimes--,he.usedTimes===0&&w(M)),A.__cacheKey=K,A.__webglTexture=q[K].texture}return I}function me(A,M,I){let z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(z=n.TEXTURE_3D);const q=se(A,M),K=M.source;t.bindTexture(z,A.__webglTexture,n.TEXTURE0+I);const he=i.get(K);if(K.version!==he.__version||q===!0){t.activeTexture(n.TEXTURE0+I);const oe=tt.getPrimaries(tt.workingColorSpace),de=M.colorSpace===kn?null:tt.getPrimaries(M.colorSpace),ve=M.colorSpace===kn||oe===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const be=p(M)&&m(M.image)===!1;let ce=_(M.image,be,!1,r.maxTextureSize);ce=ie(M,ce);const ze=m(ce)||a,Oe=s.convert(M.format,M.colorSpace);let Ie=s.convert(M.type),we=S(M.internalFormat,Oe,Ie,M.colorSpace,M.isVideoTexture);Y(z,M,ze);let Te;const Re=M.mipmaps,He=a&&M.isVideoTexture!==!0&&we!==P0,ut=he.__version===void 0||q===!0,We=b(M,ce,ze);if(M.isDepthTexture)we=n.DEPTH_COMPONENT,a?M.type===ar?we=n.DEPTH_COMPONENT32F:M.type===or?we=n.DEPTH_COMPONENT24:M.type===Qr?we=n.DEPTH24_STENCIL8:we=n.DEPTH_COMPONENT16:M.type===ar&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===es&&we===n.DEPTH_COMPONENT&&M.type!==Fh&&M.type!==or&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=or,Ie=s.convert(M.type)),M.format===so&&we===n.DEPTH_COMPONENT&&(we=n.DEPTH_STENCIL,M.type!==Qr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Qr,Ie=s.convert(M.type))),ut&&(He?t.texStorage2D(n.TEXTURE_2D,1,we,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,we,ce.width,ce.height,0,Oe,Ie,null));else if(M.isDataTexture)if(Re.length>0&&ze){He&&ut&&t.texStorage2D(n.TEXTURE_2D,We,we,Re[0].width,Re[0].height);for(let _e=0,F=Re.length;_e<F;_e++)Te=Re[_e],He?t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Te.width,Te.height,Oe,Ie,Te.data):t.texImage2D(n.TEXTURE_2D,_e,we,Te.width,Te.height,0,Oe,Ie,Te.data);M.generateMipmaps=!1}else He?(ut&&t.texStorage2D(n.TEXTURE_2D,We,we,ce.width,ce.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ce.width,ce.height,Oe,Ie,ce.data)):t.texImage2D(n.TEXTURE_2D,0,we,ce.width,ce.height,0,Oe,Ie,ce.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){He&&ut&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,we,Re[0].width,Re[0].height,ce.depth);for(let _e=0,F=Re.length;_e<F;_e++)Te=Re[_e],M.format!==ni?Oe!==null?He?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,0,Te.width,Te.height,ce.depth,Oe,Te.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,_e,we,Te.width,Te.height,ce.depth,0,Te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?t.texSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,0,Te.width,Te.height,ce.depth,Oe,Ie,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,_e,we,Te.width,Te.height,ce.depth,0,Oe,Ie,Te.data)}else{He&&ut&&t.texStorage2D(n.TEXTURE_2D,We,we,Re[0].width,Re[0].height);for(let _e=0,F=Re.length;_e<F;_e++)Te=Re[_e],M.format!==ni?Oe!==null?He?t.compressedTexSubImage2D(n.TEXTURE_2D,_e,0,0,Te.width,Te.height,Oe,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,_e,we,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Te.width,Te.height,Oe,Ie,Te.data):t.texImage2D(n.TEXTURE_2D,_e,we,Te.width,Te.height,0,Oe,Ie,Te.data)}else if(M.isDataArrayTexture)He?(ut&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,we,ce.width,ce.height,ce.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Oe,Ie,ce.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,ce.width,ce.height,ce.depth,0,Oe,Ie,ce.data);else if(M.isData3DTexture)He?(ut&&t.texStorage3D(n.TEXTURE_3D,We,we,ce.width,ce.height,ce.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Oe,Ie,ce.data)):t.texImage3D(n.TEXTURE_3D,0,we,ce.width,ce.height,ce.depth,0,Oe,Ie,ce.data);else if(M.isFramebufferTexture){if(ut)if(He)t.texStorage2D(n.TEXTURE_2D,We,we,ce.width,ce.height);else{let _e=ce.width,F=ce.height;for(let xe=0;xe<We;xe++)t.texImage2D(n.TEXTURE_2D,xe,we,_e,F,0,Oe,Ie,null),_e>>=1,F>>=1}}else if(Re.length>0&&ze){He&&ut&&t.texStorage2D(n.TEXTURE_2D,We,we,Re[0].width,Re[0].height);for(let _e=0,F=Re.length;_e<F;_e++)Te=Re[_e],He?t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Oe,Ie,Te):t.texImage2D(n.TEXTURE_2D,_e,we,Oe,Ie,Te);M.generateMipmaps=!1}else He?(ut&&t.texStorage2D(n.TEXTURE_2D,We,we,ce.width,ce.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Oe,Ie,ce)):t.texImage2D(n.TEXTURE_2D,0,we,Oe,Ie,ce);x(M,ze)&&v(z),he.__version=K.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Se(A,M,I){if(M.image.length!==6)return;const z=se(A,M),q=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+I);const K=i.get(q);if(q.version!==K.__version||z===!0){t.activeTexture(n.TEXTURE0+I);const he=tt.getPrimaries(tt.workingColorSpace),oe=M.colorSpace===kn?null:tt.getPrimaries(M.colorSpace),de=M.colorSpace===kn||he===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const ve=M.isCompressedTexture||M.image[0].isCompressedTexture,be=M.image[0]&&M.image[0].isDataTexture,ce=[];for(let _e=0;_e<6;_e++)!ve&&!be?ce[_e]=_(M.image[_e],!1,!0,r.maxCubemapSize):ce[_e]=be?M.image[_e].image:M.image[_e],ce[_e]=ie(M,ce[_e]);const ze=ce[0],Oe=m(ze)||a,Ie=s.convert(M.format,M.colorSpace),we=s.convert(M.type),Te=S(M.internalFormat,Ie,we,M.colorSpace),Re=a&&M.isVideoTexture!==!0,He=K.__version===void 0||z===!0;let ut=b(M,ze,Oe);Y(n.TEXTURE_CUBE_MAP,M,Oe);let We;if(ve){Re&&He&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ut,Te,ze.width,ze.height);for(let _e=0;_e<6;_e++){We=ce[_e].mipmaps;for(let F=0;F<We.length;F++){const xe=We[F];M.format!==ni?Ie!==null?Re?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,0,0,xe.width,xe.height,Ie,xe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,Te,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,0,0,xe.width,xe.height,Ie,we,xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,Te,xe.width,xe.height,0,Ie,we,xe.data)}}}else{We=M.mipmaps,Re&&He&&(We.length>0&&ut++,t.texStorage2D(n.TEXTURE_CUBE_MAP,ut,Te,ce[0].width,ce[0].height));for(let _e=0;_e<6;_e++)if(be){Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ce[_e].width,ce[_e].height,Ie,we,ce[_e].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Te,ce[_e].width,ce[_e].height,0,Ie,we,ce[_e].data);for(let F=0;F<We.length;F++){const ye=We[F].image[_e].image;Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,0,0,ye.width,ye.height,Ie,we,ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,Te,ye.width,ye.height,0,Ie,we,ye.data)}}else{Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ie,we,ce[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Te,Ie,we,ce[_e]);for(let F=0;F<We.length;F++){const xe=We[F];Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,0,0,Ie,we,xe.image[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,Te,Ie,we,xe.image[_e])}}}x(M,Oe)&&v(n.TEXTURE_CUBE_MAP),K.__version=q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function V(A,M,I,z,q,K){const he=s.convert(I.format,I.colorSpace),oe=s.convert(I.type),de=S(I.internalFormat,he,oe,I.colorSpace);if(!i.get(M).__hasExternalTextures){const be=Math.max(1,M.width>>K),ce=Math.max(1,M.height>>K);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,K,de,be,ce,M.depth,0,he,oe,null):t.texImage2D(q,K,de,be,ce,0,he,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),X(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,q,i.get(I).__webglTexture,0,k(M)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,z,q,i.get(I).__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(A,M,I){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer&&!M.stencilBuffer){let z=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(I||X(M)){const q=M.depthTexture;q&&q.isDepthTexture&&(q.type===ar?z=n.DEPTH_COMPONENT32F:q.type===or&&(z=n.DEPTH_COMPONENT24));const K=k(M);X(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,K,z,M.width,M.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,K,z,M.width,M.height)}else n.renderbufferStorage(n.RENDERBUFFER,z,M.width,M.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(M.depthBuffer&&M.stencilBuffer){const z=k(M);I&&X(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,z,n.DEPTH24_STENCIL8,M.width,M.height):X(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,z,n.DEPTH24_STENCIL8,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{const z=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let q=0;q<z.length;q++){const K=z[q],he=s.convert(K.format,K.colorSpace),oe=s.convert(K.type),de=S(K.internalFormat,he,oe,K.colorSpace),ve=k(M);I&&X(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,de,M.width,M.height):X(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,de,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,de,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ae(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);const z=i.get(M.depthTexture).__webglTexture,q=k(M);if(M.depthTexture.format===es)X(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,z,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,z,0);else if(M.depthTexture.format===so)X(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,z,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,z,0);else throw new Error("Unknown depthTexture format")}function re(A){const M=i.get(A),I=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");ae(M.__webglFramebuffer,A)}else if(I){M.__webglDepthbuffer=[];for(let z=0;z<6;z++)t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[z]),M.__webglDepthbuffer[z]=n.createRenderbuffer(),fe(M.__webglDepthbuffer[z],A,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=n.createRenderbuffer(),fe(M.__webglDepthbuffer,A,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(A,M,I){const z=i.get(A);M!==void 0&&V(z.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&re(A)}function W(A){const M=A.texture,I=i.get(A),z=i.get(M);A.addEventListener("dispose",L),A.isWebGLMultipleRenderTargets!==!0&&(z.__webglTexture===void 0&&(z.__webglTexture=n.createTexture()),z.__version=M.version,o.memory.textures++);const q=A.isWebGLCubeRenderTarget===!0,K=A.isWebGLMultipleRenderTargets===!0,he=m(A)||a;if(q){I.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer[oe]=[];for(let de=0;de<M.mipmaps.length;de++)I.__webglFramebuffer[oe][de]=n.createFramebuffer()}else I.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)I.__webglFramebuffer[oe]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(K)if(r.drawBuffers){const oe=A.texture;for(let de=0,ve=oe.length;de<ve;de++){const be=i.get(oe[de]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&X(A)===!1){const oe=K?M:[M];I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let de=0;de<oe.length;de++){const ve=oe[de];I.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[de]);const be=s.convert(ve.format,ve.colorSpace),ce=s.convert(ve.type),ze=S(ve.internalFormat,be,ce,ve.colorSpace,A.isXRRenderTarget===!0),Oe=k(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,ze,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,I.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),fe(I.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Y(n.TEXTURE_CUBE_MAP,M,he);for(let oe=0;oe<6;oe++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)V(I.__webglFramebuffer[oe][de],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else V(I.__webglFramebuffer[oe],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);x(M,he)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(K){const oe=A.texture;for(let de=0,ve=oe.length;de<ve;de++){const be=oe[de],ce=i.get(be);t.bindTexture(n.TEXTURE_2D,ce.__webglTexture),Y(n.TEXTURE_2D,be,he),V(I.__webglFramebuffer,A,be,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),x(be,he)&&v(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?oe=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,z.__webglTexture),Y(oe,M,he),a&&M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)V(I.__webglFramebuffer[de],A,M,n.COLOR_ATTACHMENT0,oe,de);else V(I.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,oe,0);x(M,he)&&v(oe),t.unbindTexture()}A.depthBuffer&&re(A)}function C(A){const M=m(A)||a,I=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let z=0,q=I.length;z<q;z++){const K=I[z];if(x(K,M)){const he=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,oe=i.get(K).__webglTexture;t.bindTexture(he,oe),v(he),t.unbindTexture()}}}function P(A){if(a&&A.samples>0&&X(A)===!1){const M=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],I=A.width,z=A.height;let q=n.COLOR_BUFFER_BIT;const K=[],he=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(A),de=A.isWebGLMultipleRenderTargets===!0;if(de)for(let ve=0;ve<M.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ve=0;ve<M.length;ve++){K.push(n.COLOR_ATTACHMENT0+ve),A.depthBuffer&&K.push(he);const be=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(be===!1&&(A.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),de&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]),be===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[he]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[he])),de){const ce=i.get(M[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ce,0)}n.blitFramebuffer(0,0,I,z,0,0,I,z,q,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,K)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let ve=0;ve<M.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]);const be=i.get(M[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function k(A){return Math.min(r.maxSamples,A.samples)}function X(A){const M=i.get(A);return a&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function J(A){const M=o.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function ie(A,M){const I=A.colorSpace,z=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===Df||I!==Fi&&I!==kn&&(tt.getTransfer(I)===ft?a===!1?e.has("EXT_sRGB")===!0&&z===ni?(A.format=Df,A.minFilter=Fn,A.generateMipmaps=!1):M=U0.sRGBToLinear(M):(z!==ni||q!==mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),M}this.allocateTextureUnit=D,this.resetTextureUnits=$,this.setTexture2D=O,this.setTexture2DArray=G,this.setTexture3D=H,this.setTextureCube=ne,this.rebindTextures=Ee,this.setupRenderTarget=W,this.updateRenderTargetMipmap=C,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=V,this.useMultisampledRTT=X}function WD(n,e,t){const i=t.isWebGL2;function r(s,o=kn){let a;const l=tt.getTransfer(o);if(s===mr)return n.UNSIGNED_BYTE;if(s===T0)return n.UNSIGNED_SHORT_4_4_4_4;if(s===w0)return n.UNSIGNED_SHORT_5_5_5_1;if(s===ER)return n.BYTE;if(s===bR)return n.SHORT;if(s===Fh)return n.UNSIGNED_SHORT;if(s===b0)return n.INT;if(s===or)return n.UNSIGNED_INT;if(s===ar)return n.FLOAT;if(s===oa)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===TR)return n.ALPHA;if(s===ni)return n.RGBA;if(s===wR)return n.LUMINANCE;if(s===AR)return n.LUMINANCE_ALPHA;if(s===es)return n.DEPTH_COMPONENT;if(s===so)return n.DEPTH_STENCIL;if(s===Df)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===RR)return n.RED;if(s===A0)return n.RED_INTEGER;if(s===CR)return n.RG;if(s===R0)return n.RG_INTEGER;if(s===C0)return n.RGBA_INTEGER;if(s===Jc||s===Qc||s===eu||s===tu)if(l===ft)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Jc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Qc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===eu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===tu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Jc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Qc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===eu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===tu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Xp||s===jp||s===qp||s===$p)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Xp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===jp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===qp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===$p)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===P0)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Yp||s===Kp)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Yp)return l===ft?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Kp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Zp||s===Jp||s===Qp||s===em||s===tm||s===nm||s===im||s===rm||s===sm||s===om||s===am||s===lm||s===cm||s===um)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Zp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Jp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Qp)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===em)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===tm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===nm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===im)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===rm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===sm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===om)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===am)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===lm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===cm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===um)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===nu||s===fm||s===hm)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===nu)return l===ft?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===fm)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===hm)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===PR||s===dm||s===pm||s===mm)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===nu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===dm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===pm)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===mm)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Qr?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class XD extends Bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ll extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jD={type:"move"};class Au{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ll,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ll,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ll,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jD)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ll;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class qD extends fo{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const x=[],v=[],S=new Qe;let b=null;const E=new Bn;E.layers.enable(1),E.viewport=new zt;const T=new Bn;T.layers.enable(2),T.viewport=new zt;const L=[E,T],y=new XD;y.layers.enable(1),y.layers.enable(2);let w=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let se=x[Y];return se===void 0&&(se=new Au,x[Y]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Y){let se=x[Y];return se===void 0&&(se=new Au,x[Y]=se),se.getGripSpace()},this.getHand=function(Y){let se=x[Y];return se===void 0&&(se=new Au,x[Y]=se),se.getHandSpace()};function U(Y){const se=v.indexOf(Y.inputSource);if(se===-1)return;const me=x[se];me!==void 0&&(me.update(Y.inputSource,Y.frame,c||o),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function $(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",D);for(let Y=0;Y<x.length;Y++){const se=v[Y];se!==null&&(v[Y]=null,x[Y].disconnect(se))}w=null,N=null,e.setRenderTarget(m),d=null,h=null,f=null,r=null,p=null,pe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",$),r.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const se={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new as(d.framebufferWidth,d.framebufferHeight,{format:ni,type:mr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let se=null,me=null,Se=null;_.depth&&(Se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?so:es,me=_.stencil?Qr:or);const V={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(V),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),p=new as(h.textureWidth,h.textureHeight,{format:ni,type:mr,depthTexture:new q0(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const fe=e.properties.get(p);fe.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),pe.setContext(r),pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(Y){for(let se=0;se<Y.removed.length;se++){const me=Y.removed[se],Se=v.indexOf(me);Se>=0&&(v[Se]=null,x[Se].disconnect(me))}for(let se=0;se<Y.added.length;se++){const me=Y.added[se];let Se=v.indexOf(me);if(Se===-1){for(let fe=0;fe<x.length;fe++)if(fe>=v.length){v.push(me),Se=fe;break}else if(v[fe]===null){v[fe]=me,Se=fe;break}if(Se===-1)break}const V=x[Se];V&&V.connect(me)}}const B=new ee,O=new ee;function G(Y,se,me){B.setFromMatrixPosition(se.matrixWorld),O.setFromMatrixPosition(me.matrixWorld);const Se=B.distanceTo(O),V=se.projectionMatrix.elements,fe=me.projectionMatrix.elements,ae=V[14]/(V[10]-1),re=V[14]/(V[10]+1),Ee=(V[9]+1)/V[5],W=(V[9]-1)/V[5],C=(V[8]-1)/V[0],P=(fe[8]+1)/fe[0],k=ae*C,X=ae*P,J=Se/(-C+P),ie=J*-C;se.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ie),Y.translateZ(J),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const A=ae+J,M=re+J,I=k-ie,z=X+(Se-ie),q=Ee*re/M*A,K=W*re/M*A;Y.projectionMatrix.makePerspective(I,z,q,K,A,M),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function H(Y,se){se===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(se.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;y.near=T.near=E.near=Y.near,y.far=T.far=E.far=Y.far,(w!==y.near||N!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,N=y.far);const se=Y.parent,me=y.cameras;H(y,se);for(let Se=0;Se<me.length;Se++)H(me[Se],se);me.length===2?G(y,E,T):y.projectionMatrix.copy(E.projectionMatrix),ne(Y,y,se)};function ne(Y,se,me){me===null?Y.matrix.copy(se.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(se.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(se.projectionMatrix),Y.projectionMatrixInverse.copy(se.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=If*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)};let ue=null;function le(Y,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const me=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let Se=!1;me.length!==y.cameras.length&&(y.cameras.length=0,Se=!0);for(let V=0;V<me.length;V++){const fe=me[V];let ae=null;if(d!==null)ae=d.getViewport(fe);else{const Ee=f.getViewSubImage(h,fe);ae=Ee.viewport,V===0&&(e.setRenderTargetTextures(p,Ee.colorTexture,h.ignoreDepthValues?void 0:Ee.depthStencilTexture),e.setRenderTarget(p))}let re=L[V];re===void 0&&(re=new Bn,re.layers.enable(V),re.viewport=new zt,L[V]=re),re.matrix.fromArray(fe.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(fe.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(ae.x,ae.y,ae.width,ae.height),V===0&&(y.matrix.copy(re.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Se===!0&&y.cameras.push(re)}}for(let me=0;me<x.length;me++){const Se=v[me],V=x[me];Se!==null&&V!==void 0&&V.update(Se,se,c||o)}ue&&ue(Y,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const pe=new j0;pe.setAnimationLoop(le),this.setAnimationLoop=function(Y){ue=Y},this.dispose=function(){}}}function $D(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,V0(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,x,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===_n&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===_n&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===_n&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function YD(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const S=v.program;i.uniformBlockBinding(x,S)}function c(x,v){let S=r[x.id];S===void 0&&(g(x),S=u(x),r[x.id]=S,x.addEventListener("dispose",m));const b=v.program;i.updateUBOMapping(x,b);const E=e.render.frame;s[x.id]!==E&&(h(x),s[x.id]=E)}function u(x){const v=f();x.__bindingPointIndex=v;const S=n.createBuffer(),b=x.__size,E=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,b,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,S),S}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const v=r[x.id],S=x.uniforms,b=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let E=0,T=S.length;E<T;E++){const L=Array.isArray(S[E])?S[E]:[S[E]];for(let y=0,w=L.length;y<w;y++){const N=L[y];if(d(N,E,y,b)===!0){const U=N.__offset,$=Array.isArray(N.value)?N.value:[N.value];let D=0;for(let B=0;B<$.length;B++){const O=$[B],G=_(O);typeof O=="number"||typeof O=="boolean"?(N.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,U+D,N.__data)):O.isMatrix3?(N.__data[0]=O.elements[0],N.__data[1]=O.elements[1],N.__data[2]=O.elements[2],N.__data[3]=0,N.__data[4]=O.elements[3],N.__data[5]=O.elements[4],N.__data[6]=O.elements[5],N.__data[7]=0,N.__data[8]=O.elements[6],N.__data[9]=O.elements[7],N.__data[10]=O.elements[8],N.__data[11]=0):(O.toArray(N.__data,D),D+=G.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,v,S,b){const E=x.value,T=v+"_"+S;if(b[T]===void 0)return typeof E=="number"||typeof E=="boolean"?b[T]=E:b[T]=E.clone(),!0;{const L=b[T];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return b[T]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function g(x){const v=x.uniforms;let S=0;const b=16;for(let T=0,L=v.length;T<L;T++){const y=Array.isArray(v[T])?v[T]:[v[T]];for(let w=0,N=y.length;w<N;w++){const U=y[w],$=Array.isArray(U.value)?U.value:[U.value];for(let D=0,B=$.length;D<B;D++){const O=$[D],G=_(O),H=S%b;H!==0&&b-H<G.boundary&&(S+=b-H),U.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=G.storage}}}const E=S%b;return E>0&&(S+=b-E),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(const x in r)n.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Q0{constructor(e={}){const{canvas:t=GR(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Bt,this._useLegacyLights=!1,this.toneMapping=pr,this.toneMappingExposure=1;const v=this;let S=!1,b=0,E=0,T=null,L=-1,y=null;const w=new zt,N=new zt;let U=null;const $=new nt(0);let D=0,B=t.width,O=t.height,G=1,H=null,ne=null;const ue=new zt(0,0,B,O),le=new zt(0,0,B,O);let pe=!1;const Y=new X0;let se=!1,me=!1,Se=null;const V=new Ht,fe=new Qe,ae=new ee,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ee(){return T===null?G:1}let W=i;function C(R,j){for(let Q=0;Q<R.length;Q++){const te=R[Q],Z=t.getContext(te,j);if(Z!==null)return Z}return null}try{const R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Oh}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",xe,!1),W===null){const j=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&j.shift(),W=C(j,R),W===null)throw C(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let P,k,X,J,ie,A,M,I,z,q,K,he,oe,de,ve,be,ce,ze,Oe,Ie,we,Te,Re,He;function ut(){P=new s2(W),k=new JL(W,P,e),P.init(k),Te=new WD(W,P,k),X=new VD(W,P,k),J=new l2(W),ie=new RD,A=new GD(W,P,X,ie,k,Te,J),M=new e2(v),I=new r2(v),z=new mC(W,k),Re=new KL(W,P,z,k),q=new o2(W,z,J,Re),K=new h2(W,q,z,J),Oe=new f2(W,k,A),be=new QL(ie),he=new AD(v,M,I,P,k,Re,be),oe=new $D(v,ie),de=new PD,ve=new OD(P,k),ze=new YL(v,M,I,X,K,h,l),ce=new HD(v,K,k),He=new YD(W,J,k,X),Ie=new ZL(W,P,J,k),we=new a2(W,P,J,k),J.programs=he.programs,v.capabilities=k,v.extensions=P,v.properties=ie,v.renderLists=de,v.shadowMap=ce,v.state=X,v.info=J}ut();const We=new qD(v,W);this.xr=We,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const R=P.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=P.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(B,O,!1))},this.getSize=function(R){return R.set(B,O)},this.setSize=function(R,j,Q=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=R,O=j,t.width=Math.floor(R*G),t.height=Math.floor(j*G),Q===!0&&(t.style.width=R+"px",t.style.height=j+"px"),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(B*G,O*G).floor()},this.setDrawingBufferSize=function(R,j,Q){B=R,O=j,G=Q,t.width=Math.floor(R*Q),t.height=Math.floor(j*Q),this.setViewport(0,0,R,j)},this.getCurrentViewport=function(R){return R.copy(w)},this.getViewport=function(R){return R.copy(ue)},this.setViewport=function(R,j,Q,te){R.isVector4?ue.set(R.x,R.y,R.z,R.w):ue.set(R,j,Q,te),X.viewport(w.copy(ue).multiplyScalar(G).floor())},this.getScissor=function(R){return R.copy(le)},this.setScissor=function(R,j,Q,te){R.isVector4?le.set(R.x,R.y,R.z,R.w):le.set(R,j,Q,te),X.scissor(N.copy(le).multiplyScalar(G).floor())},this.getScissorTest=function(){return pe},this.setScissorTest=function(R){X.setScissorTest(pe=R)},this.setOpaqueSort=function(R){H=R},this.setTransparentSort=function(R){ne=R},this.getClearColor=function(R){return R.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(R=!0,j=!0,Q=!0){let te=0;if(R){let Z=!1;if(T!==null){const Me=T.texture.format;Z=Me===C0||Me===R0||Me===A0}if(Z){const Me=T.texture.type,Ae=Me===mr||Me===or||Me===Fh||Me===Qr||Me===T0||Me===w0,De=ze.getClearColor(),Ne=ze.getClearAlpha(),Ge=De.r,Be=De.g,ke=De.b;Ae?(d[0]=Ge,d[1]=Be,d[2]=ke,d[3]=Ne,W.clearBufferuiv(W.COLOR,0,d)):(g[0]=Ge,g[1]=Be,g[2]=ke,g[3]=Ne,W.clearBufferiv(W.COLOR,0,g))}else te|=W.COLOR_BUFFER_BIT}j&&(te|=W.DEPTH_BUFFER_BIT),Q&&(te|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),de.dispose(),ve.dispose(),ie.dispose(),M.dispose(),I.dispose(),K.dispose(),Re.dispose(),He.dispose(),he.dispose(),We.dispose(),We.removeEventListener("sessionstart",Zt),We.removeEventListener("sessionend",lt),Se&&(Se.dispose(),Se=null),Jt.stop()};function _e(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const R=J.autoReset,j=ce.enabled,Q=ce.autoUpdate,te=ce.needsUpdate,Z=ce.type;ut(),J.autoReset=R,ce.enabled=j,ce.autoUpdate=Q,ce.needsUpdate=te,ce.type=Z}function xe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ye(R){const j=R.target;j.removeEventListener("dispose",ye),Ue(j)}function Ue(R){Pe(R),ie.remove(R)}function Pe(R){const j=ie.get(R).programs;j!==void 0&&(j.forEach(function(Q){he.releaseProgram(Q)}),R.isShaderMaterial&&he.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,Q,te,Z,Me){j===null&&(j=re);const Ae=Z.isMesh&&Z.matrixWorld.determinant()<0,De=nx(R,j,Q,te,Z);X.setMaterial(te,Ae);let Ne=Q.index,Ge=1;if(te.wireframe===!0){if(Ne=q.getWireframeAttribute(Q),Ne===void 0)return;Ge=2}const Be=Q.drawRange,ke=Q.attributes.position;let Et=Be.start*Ge,yn=(Be.start+Be.count)*Ge;Me!==null&&(Et=Math.max(Et,Me.start*Ge),yn=Math.min(yn,(Me.start+Me.count)*Ge)),Ne!==null?(Et=Math.max(Et,0),yn=Math.min(yn,Ne.count)):ke!=null&&(Et=Math.max(Et,0),yn=Math.min(yn,ke.count));const Dt=yn-Et;if(Dt<0||Dt===1/0)return;Re.setup(Z,te,De,Q,Ne);let vi,pt=Ie;if(Ne!==null&&(vi=z.get(Ne),pt=we,pt.setIndex(vi)),Z.isMesh)te.wireframe===!0?(X.setLineWidth(te.wireframeLinewidth*Ee()),pt.setMode(W.LINES)):pt.setMode(W.TRIANGLES);else if(Z.isLine){let Xe=te.linewidth;Xe===void 0&&(Xe=1),X.setLineWidth(Xe*Ee()),Z.isLineSegments?pt.setMode(W.LINES):Z.isLineLoop?pt.setMode(W.LINE_LOOP):pt.setMode(W.LINE_STRIP)}else Z.isPoints?pt.setMode(W.POINTS):Z.isSprite&&pt.setMode(W.TRIANGLES);if(Z.isBatchedMesh)pt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)pt.renderInstances(Et,Dt,Z.count);else if(Q.isInstancedBufferGeometry){const Xe=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,yc=Math.min(Q.instanceCount,Xe);pt.renderInstances(Et,Dt,yc)}else pt.render(Et,Dt)};function ot(R,j,Q){R.transparent===!0&&R.side===Ri&&R.forceSinglePass===!1?(R.side=_n,R.needsUpdate=!0,Ma(R,j,Q),R.side=xr,R.needsUpdate=!0,Ma(R,j,Q),R.side=Ri):Ma(R,j,Q)}this.compile=function(R,j,Q=null){Q===null&&(Q=R),m=ve.get(Q),m.init(),x.push(m),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(j.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),R!==Q&&R.traverseVisible(function(Z){Z.isLight&&Z.layers.test(j.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),m.setupLights(v._useLegacyLights);const te=new Set;return R.traverse(function(Z){const Me=Z.material;if(Me)if(Array.isArray(Me))for(let Ae=0;Ae<Me.length;Ae++){const De=Me[Ae];ot(De,Q,Z),te.add(De)}else ot(Me,Q,Z),te.add(Me)}),x.pop(),m=null,te},this.compileAsync=function(R,j,Q=null){const te=this.compile(R,j,Q);return new Promise(Z=>{function Me(){if(te.forEach(function(Ae){ie.get(Ae).currentProgram.isReady()&&te.delete(Ae)}),te.size===0){Z(R);return}setTimeout(Me,10)}P.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let at=null;function Lt(R){at&&at(R)}function Zt(){Jt.stop()}function lt(){Jt.start()}const Jt=new j0;Jt.setAnimationLoop(Lt),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(R){at=R,We.setAnimationLoop(R),R===null?Jt.stop():Jt.start()},We.addEventListener("sessionstart",Zt),We.addEventListener("sessionend",lt),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(j),j=We.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,j,T),m=ve.get(R,x.length),m.init(),x.push(m),V.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Y.setFromProjectionMatrix(V),me=this.localClippingEnabled,se=be.init(this.clippingPlanes,me),_=de.get(R,p.length),_.init(),p.push(_),ri(R,j,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(H,ne),this.info.render.frame++,se===!0&&be.beginShadows();const Q=m.state.shadowsArray;if(ce.render(Q,R,j),se===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(_,R),m.setupLights(v._useLegacyLights),j.isArrayCamera){const te=j.cameras;for(let Z=0,Me=te.length;Z<Me;Z++){const Ae=te[Z];Gh(_,R,Ae,Ae.viewport)}}else Gh(_,R,j);T!==null&&(A.updateMultisampleRenderTarget(T),A.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(v,R,j),Re.resetDefaultState(),L=-1,y=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function ri(R,j,Q,te){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)Q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Y.intersectsSprite(R)){te&&ae.setFromMatrixPosition(R.matrixWorld).applyMatrix4(V);const Ae=K.update(R),De=R.material;De.visible&&_.push(R,Ae,De,Q,ae.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Y.intersectsObject(R))){const Ae=K.update(R),De=R.material;if(te&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ae.copy(R.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ae.copy(Ae.boundingSphere.center)),ae.applyMatrix4(R.matrixWorld).applyMatrix4(V)),Array.isArray(De)){const Ne=Ae.groups;for(let Ge=0,Be=Ne.length;Ge<Be;Ge++){const ke=Ne[Ge],Et=De[ke.materialIndex];Et&&Et.visible&&_.push(R,Ae,Et,Q,ae.z,ke)}}else De.visible&&_.push(R,Ae,De,Q,ae.z,null)}}const Me=R.children;for(let Ae=0,De=Me.length;Ae<De;Ae++)ri(Me[Ae],j,Q,te)}function Gh(R,j,Q,te){const Z=R.opaque,Me=R.transmissive,Ae=R.transparent;m.setupLightsView(Q),se===!0&&be.setGlobalState(v.clippingPlanes,Q),Me.length>0&&tx(Z,Me,j,Q),te&&X.viewport(w.copy(te)),Z.length>0&&Sa(Z,j,Q),Me.length>0&&Sa(Me,j,Q),Ae.length>0&&Sa(Ae,j,Q),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function tx(R,j,Q,te){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;const Me=k.isWebGL2;Se===null&&(Se=new as(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")?oa:mr,minFilter:sa,samples:Me?4:0})),v.getDrawingBufferSize(fe),Me?Se.setSize(fe.x,fe.y):Se.setSize(Uf(fe.x),Uf(fe.y));const Ae=v.getRenderTarget();v.setRenderTarget(Se),v.getClearColor($),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const De=v.toneMapping;v.toneMapping=pr,Sa(R,Q,te),A.updateMultisampleRenderTarget(Se),A.updateRenderTargetMipmap(Se);let Ne=!1;for(let Ge=0,Be=j.length;Ge<Be;Ge++){const ke=j[Ge],Et=ke.object,yn=ke.geometry,Dt=ke.material,vi=ke.group;if(Dt.side===Ri&&Et.layers.test(te.layers)){const pt=Dt.side;Dt.side=_n,Dt.needsUpdate=!0,Wh(Et,Q,te,yn,Dt,vi),Dt.side=pt,Dt.needsUpdate=!0,Ne=!0}}Ne===!0&&(A.updateMultisampleRenderTarget(Se),A.updateRenderTargetMipmap(Se)),v.setRenderTarget(Ae),v.setClearColor($,D),v.toneMapping=De}function Sa(R,j,Q){const te=j.isScene===!0?j.overrideMaterial:null;for(let Z=0,Me=R.length;Z<Me;Z++){const Ae=R[Z],De=Ae.object,Ne=Ae.geometry,Ge=te===null?Ae.material:te,Be=Ae.group;De.layers.test(Q.layers)&&Wh(De,j,Q,Ne,Ge,Be)}}function Wh(R,j,Q,te,Z,Me){R.onBeforeRender(v,j,Q,te,Z,Me),R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Z.onBeforeRender(v,j,Q,te,R,Me),Z.transparent===!0&&Z.side===Ri&&Z.forceSinglePass===!1?(Z.side=_n,Z.needsUpdate=!0,v.renderBufferDirect(Q,j,te,Z,R,Me),Z.side=xr,Z.needsUpdate=!0,v.renderBufferDirect(Q,j,te,Z,R,Me),Z.side=Ri):v.renderBufferDirect(Q,j,te,Z,R,Me),R.onAfterRender(v,j,Q,te,Z,Me)}function Ma(R,j,Q){j.isScene!==!0&&(j=re);const te=ie.get(R),Z=m.state.lights,Me=m.state.shadowsArray,Ae=Z.state.version,De=he.getParameters(R,Z.state,Me,j,Q),Ne=he.getProgramCacheKey(De);let Ge=te.programs;te.environment=R.isMeshStandardMaterial?j.environment:null,te.fog=j.fog,te.envMap=(R.isMeshStandardMaterial?I:M).get(R.envMap||te.environment),Ge===void 0&&(R.addEventListener("dispose",ye),Ge=new Map,te.programs=Ge);let Be=Ge.get(Ne);if(Be!==void 0){if(te.currentProgram===Be&&te.lightsStateVersion===Ae)return jh(R,De),Be}else De.uniforms=he.getUniforms(R),R.onBuild(Q,De,v),R.onBeforeCompile(De,v),Be=he.acquireProgram(De,Ne),Ge.set(Ne,Be),te.uniforms=De.uniforms;const ke=te.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(ke.clippingPlanes=be.uniform),jh(R,De),te.needsLights=rx(R),te.lightsStateVersion=Ae,te.needsLights&&(ke.ambientLightColor.value=Z.state.ambient,ke.lightProbe.value=Z.state.probe,ke.directionalLights.value=Z.state.directional,ke.directionalLightShadows.value=Z.state.directionalShadow,ke.spotLights.value=Z.state.spot,ke.spotLightShadows.value=Z.state.spotShadow,ke.rectAreaLights.value=Z.state.rectArea,ke.ltc_1.value=Z.state.rectAreaLTC1,ke.ltc_2.value=Z.state.rectAreaLTC2,ke.pointLights.value=Z.state.point,ke.pointLightShadows.value=Z.state.pointShadow,ke.hemisphereLights.value=Z.state.hemi,ke.directionalShadowMap.value=Z.state.directionalShadowMap,ke.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,ke.spotShadowMap.value=Z.state.spotShadowMap,ke.spotLightMatrix.value=Z.state.spotLightMatrix,ke.spotLightMap.value=Z.state.spotLightMap,ke.pointShadowMap.value=Z.state.pointShadowMap,ke.pointShadowMatrix.value=Z.state.pointShadowMatrix),te.currentProgram=Be,te.uniformsList=null,Be}function Xh(R){if(R.uniformsList===null){const j=R.currentProgram.getUniforms();R.uniformsList=_l.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function jh(R,j){const Q=ie.get(R);Q.outputColorSpace=j.outputColorSpace,Q.batching=j.batching,Q.instancing=j.instancing,Q.instancingColor=j.instancingColor,Q.skinning=j.skinning,Q.morphTargets=j.morphTargets,Q.morphNormals=j.morphNormals,Q.morphColors=j.morphColors,Q.morphTargetsCount=j.morphTargetsCount,Q.numClippingPlanes=j.numClippingPlanes,Q.numIntersection=j.numClipIntersection,Q.vertexAlphas=j.vertexAlphas,Q.vertexTangents=j.vertexTangents,Q.toneMapping=j.toneMapping}function nx(R,j,Q,te,Z){j.isScene!==!0&&(j=re),A.resetTextureUnits();const Me=j.fog,Ae=te.isMeshStandardMaterial?j.environment:null,De=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Fi,Ne=(te.isMeshStandardMaterial?I:M).get(te.envMap||Ae),Ge=te.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Be=!!Q.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),ke=!!Q.morphAttributes.position,Et=!!Q.morphAttributes.normal,yn=!!Q.morphAttributes.color;let Dt=pr;te.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Dt=v.toneMapping);const vi=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,pt=vi!==void 0?vi.length:0,Xe=ie.get(te),yc=m.state.lights;if(se===!0&&(me===!0||R!==y)){const Ln=R===y&&te.id===L;be.setState(te,R,Ln)}let xt=!1;te.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==yc.state.version||Xe.outputColorSpace!==De||Z.isBatchedMesh&&Xe.batching===!1||!Z.isBatchedMesh&&Xe.batching===!0||Z.isInstancedMesh&&Xe.instancing===!1||!Z.isInstancedMesh&&Xe.instancing===!0||Z.isSkinnedMesh&&Xe.skinning===!1||!Z.isSkinnedMesh&&Xe.skinning===!0||Z.isInstancedMesh&&Xe.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Xe.instancingColor===!1&&Z.instanceColor!==null||Xe.envMap!==Ne||te.fog===!0&&Xe.fog!==Me||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==be.numPlanes||Xe.numIntersection!==be.numIntersection)||Xe.vertexAlphas!==Ge||Xe.vertexTangents!==Be||Xe.morphTargets!==ke||Xe.morphNormals!==Et||Xe.morphColors!==yn||Xe.toneMapping!==Dt||k.isWebGL2===!0&&Xe.morphTargetsCount!==pt)&&(xt=!0):(xt=!0,Xe.__version=te.version);let Tr=Xe.currentProgram;xt===!0&&(Tr=Ma(te,j,Z));let qh=!1,po=!1,Sc=!1;const Gt=Tr.getUniforms(),wr=Xe.uniforms;if(X.useProgram(Tr.program)&&(qh=!0,po=!0,Sc=!0),te.id!==L&&(L=te.id,po=!0),qh||y!==R){Gt.setValue(W,"projectionMatrix",R.projectionMatrix),Gt.setValue(W,"viewMatrix",R.matrixWorldInverse);const Ln=Gt.map.cameraPosition;Ln!==void 0&&Ln.setValue(W,ae.setFromMatrixPosition(R.matrixWorld)),k.logarithmicDepthBuffer&&Gt.setValue(W,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Gt.setValue(W,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,po=!0,Sc=!0)}if(Z.isSkinnedMesh){Gt.setOptional(W,Z,"bindMatrix"),Gt.setOptional(W,Z,"bindMatrixInverse");const Ln=Z.skeleton;Ln&&(k.floatVertexTextures?(Ln.boneTexture===null&&Ln.computeBoneTexture(),Gt.setValue(W,"boneTexture",Ln.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(Gt.setOptional(W,Z,"batchingTexture"),Gt.setValue(W,"batchingTexture",Z._matricesTexture,A));const Mc=Q.morphAttributes;if((Mc.position!==void 0||Mc.normal!==void 0||Mc.color!==void 0&&k.isWebGL2===!0)&&Oe.update(Z,Q,Tr),(po||Xe.receiveShadow!==Z.receiveShadow)&&(Xe.receiveShadow=Z.receiveShadow,Gt.setValue(W,"receiveShadow",Z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(wr.envMap.value=Ne,wr.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),po&&(Gt.setValue(W,"toneMappingExposure",v.toneMappingExposure),Xe.needsLights&&ix(wr,Sc),Me&&te.fog===!0&&oe.refreshFogUniforms(wr,Me),oe.refreshMaterialUniforms(wr,te,G,O,Se),_l.upload(W,Xh(Xe),wr,A)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(_l.upload(W,Xh(Xe),wr,A),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Gt.setValue(W,"center",Z.center),Gt.setValue(W,"modelViewMatrix",Z.modelViewMatrix),Gt.setValue(W,"normalMatrix",Z.normalMatrix),Gt.setValue(W,"modelMatrix",Z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const Ln=te.uniformsGroups;for(let Ec=0,sx=Ln.length;Ec<sx;Ec++)if(k.isWebGL2){const $h=Ln[Ec];He.update($h,Tr),He.bind($h,Tr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Tr}function ix(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function rx(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,j,Q){ie.get(R.texture).__webglTexture=j,ie.get(R.depthTexture).__webglTexture=Q;const te=ie.get(R);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=Q===void 0,te.__autoAllocateDepthBuffer||P.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,j){const Q=ie.get(R);Q.__webglFramebuffer=j,Q.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(R,j=0,Q=0){T=R,b=j,E=Q;let te=!0,Z=null,Me=!1,Ae=!1;if(R){const Ne=ie.get(R);Ne.__useDefaultFramebuffer!==void 0?(X.bindFramebuffer(W.FRAMEBUFFER,null),te=!1):Ne.__webglFramebuffer===void 0?A.setupRenderTarget(R):Ne.__hasExternalTextures&&A.rebindTextures(R,ie.get(R.texture).__webglTexture,ie.get(R.depthTexture).__webglTexture);const Ge=R.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Ae=!0);const Be=ie.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Be[j])?Z=Be[j][Q]:Z=Be[j],Me=!0):k.isWebGL2&&R.samples>0&&A.useMultisampledRTT(R)===!1?Z=ie.get(R).__webglMultisampledFramebuffer:Array.isArray(Be)?Z=Be[Q]:Z=Be,w.copy(R.viewport),N.copy(R.scissor),U=R.scissorTest}else w.copy(ue).multiplyScalar(G).floor(),N.copy(le).multiplyScalar(G).floor(),U=pe;if(X.bindFramebuffer(W.FRAMEBUFFER,Z)&&k.drawBuffers&&te&&X.drawBuffers(R,Z),X.viewport(w),X.scissor(N),X.setScissorTest(U),Me){const Ne=ie.get(R.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ne.__webglTexture,Q)}else if(Ae){const Ne=ie.get(R.texture),Ge=j||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ne.__webglTexture,Q||0,Ge)}L=-1},this.readRenderTargetPixels=function(R,j,Q,te,Z,Me,Ae){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=ie.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ae!==void 0&&(De=De[Ae]),De){X.bindFramebuffer(W.FRAMEBUFFER,De);try{const Ne=R.texture,Ge=Ne.format,Be=Ne.type;if(Ge!==ni&&Te.convert(Ge)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ke=Be===oa&&(P.has("EXT_color_buffer_half_float")||k.isWebGL2&&P.has("EXT_color_buffer_float"));if(Be!==mr&&Te.convert(Be)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Be===ar&&(k.isWebGL2||P.has("OES_texture_float")||P.has("WEBGL_color_buffer_float")))&&!ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-te&&Q>=0&&Q<=R.height-Z&&W.readPixels(j,Q,te,Z,Te.convert(Ge),Te.convert(Be),Me)}finally{const Ne=T!==null?ie.get(T).__webglFramebuffer:null;X.bindFramebuffer(W.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(R,j,Q=0){const te=Math.pow(2,-Q),Z=Math.floor(j.image.width*te),Me=Math.floor(j.image.height*te);A.setTexture2D(j,0),W.copyTexSubImage2D(W.TEXTURE_2D,Q,0,0,R.x,R.y,Z,Me),X.unbindTexture()},this.copyTextureToTexture=function(R,j,Q,te=0){const Z=j.image.width,Me=j.image.height,Ae=Te.convert(Q.format),De=Te.convert(Q.type);A.setTexture2D(Q,0),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,Q.unpackAlignment),j.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,te,R.x,R.y,Z,Me,Ae,De,j.image.data):j.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,te,R.x,R.y,j.mipmaps[0].width,j.mipmaps[0].height,Ae,j.mipmaps[0].data):W.texSubImage2D(W.TEXTURE_2D,te,R.x,R.y,Ae,De,j.image),te===0&&Q.generateMipmaps&&W.generateMipmap(W.TEXTURE_2D),X.unbindTexture()},this.copyTextureToTexture3D=function(R,j,Q,te,Z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=R.max.x-R.min.x+1,Ae=R.max.y-R.min.y+1,De=R.max.z-R.min.z+1,Ne=Te.convert(te.format),Ge=Te.convert(te.type);let Be;if(te.isData3DTexture)A.setTexture3D(te,0),Be=W.TEXTURE_3D;else if(te.isDataArrayTexture||te.isCompressedArrayTexture)A.setTexture2DArray(te,0),Be=W.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,te.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,te.unpackAlignment);const ke=W.getParameter(W.UNPACK_ROW_LENGTH),Et=W.getParameter(W.UNPACK_IMAGE_HEIGHT),yn=W.getParameter(W.UNPACK_SKIP_PIXELS),Dt=W.getParameter(W.UNPACK_SKIP_ROWS),vi=W.getParameter(W.UNPACK_SKIP_IMAGES),pt=Q.isCompressedTexture?Q.mipmaps[Z]:Q.image;W.pixelStorei(W.UNPACK_ROW_LENGTH,pt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,pt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,R.min.x),W.pixelStorei(W.UNPACK_SKIP_ROWS,R.min.y),W.pixelStorei(W.UNPACK_SKIP_IMAGES,R.min.z),Q.isDataTexture||Q.isData3DTexture?W.texSubImage3D(Be,Z,j.x,j.y,j.z,Me,Ae,De,Ne,Ge,pt.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Be,Z,j.x,j.y,j.z,Me,Ae,De,Ne,pt.data)):W.texSubImage3D(Be,Z,j.x,j.y,j.z,Me,Ae,De,Ne,Ge,pt),W.pixelStorei(W.UNPACK_ROW_LENGTH,ke),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Et),W.pixelStorei(W.UNPACK_SKIP_PIXELS,yn),W.pixelStorei(W.UNPACK_SKIP_ROWS,Dt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,vi),Z===0&&te.generateMipmaps&&W.generateMipmap(Be),X.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?A.setTextureCube(R,0):R.isData3DTexture?A.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?A.setTexture2DArray(R,0):A.setTexture2D(R,0),X.unbindTexture()},this.resetState=function(){b=0,E=0,T=null,X.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Bh?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===mc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Bt?ts:L0}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ts?Bt:Fi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class KD extends Q0{}KD.prototype.isWebGL1Renderer=!0;class ZD extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}const r_={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class JD{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const QD=new JD;class Hh{constructor(e){this.manager=e!==void 0?e:QD,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Hh.DEFAULT_MATERIAL_NAME="__DEFAULT";class eI extends Hh{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=r_.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=aa("img");function l(){u(),r_.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class tI extends Hh{constructor(e){super(e)}load(e,t,i,r){const s=new gn,o=new eI(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oh);class nI{constructor(){this.gl=new Vh,this.canvas=this.gl.canvas,this.sizes=this.gl.sizes,this.scene=this.gl.scene,this.setInstance()}setInstance(){this.instance=new Bn(30,this.sizes.width/this.sizes.height,10,1e3),this.instance.position.z=600,this.instance.fov=2*Math.atan(this.sizes.height/2/600)*180/Math.PI,this.scene.add(this.instance),this.instance.updateProjectionMatrix()}resize(){this.instance.fov=2*Math.atan(this.sizes.height/2/600)*180/Math.PI,this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}}class ex{constructor(){this.callbacks={},this.callbacks.base={}}on(e,t){return typeof e>"u"||e===""?(console.warn("wrong names"),!1):typeof t>"u"?(console.warn("wrong callback"),!1):(this.resolveNames(e).forEach(r=>{const s=this.resolveName(r);this.callbacks[s.namespace]instanceof Object||(this.callbacks[s.namespace]={}),this.callbacks[s.namespace][s.value]instanceof Array||(this.callbacks[s.namespace][s.value]=[]),this.callbacks[s.namespace][s.value].push(t)}),this)}off(e){return typeof e>"u"||e===""?(console.warn("wrong name"),!1):(this.resolveNames(e).forEach(i=>{const r=this.resolveName(i);if(r.namespace!=="base"&&r.value==="")delete this.callbacks[r.namespace];else if(r.namespace==="base")for(const s in this.callbacks)this.callbacks[s]instanceof Object&&this.callbacks[s][r.value]instanceof Array&&(delete this.callbacks[s][r.value],Object.keys(this.callbacks[s]).length===0&&delete this.callbacks[s]);else this.callbacks[r.namespace]instanceof Object&&this.callbacks[r.namespace][r.value]instanceof Array&&(delete this.callbacks[r.namespace][r.value],Object.keys(this.callbacks[r.namespace]).length===0&&delete this.callbacks[r.namespace])}),this)}trigger(e,t){if(typeof e>"u"||e==="")return console.warn("wrong name"),!1;let i=null;const r=t instanceof Array?t:[];let s=this.resolveNames(e);if(s=this.resolveName(s[0]),s.namespace==="base")for(const o in this.callbacks)this.callbacks[o]instanceof Object&&this.callbacks[o][s.value]instanceof Array&&this.callbacks[o][s.value].forEach(function(a){a.apply(this,r)});else if(this.callbacks[s.namespace]instanceof Object){if(s.value==="")return console.warn("wrong name"),this;this.callbacks[s.namespace][s.value].forEach(function(o){o.apply(this,r)})}return i}resolveNames(e){let t=e;return t=t.replace(/[^a-zA-Z0-9 ,/.]/g,""),t=t.replace(/[,/]+/g," "),t=t.split(" "),t}resolveName(e){const t={},i=e.split(".");return t.original=e,t.value=i[0],t.namespace="base",i.length>1&&i[1]!==""&&(t.namespace=i[1]),t}}class iI extends ex{constructor(){super(),this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),window.addEventListener("resize",()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.trigger("resize")})}}class rI extends ex{constructor(){super(),this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16,window.requestAnimationFrame(()=>{this.tick()})}tick(){const e=Date.now();this.delta=e-this.current,this.current=e,this.elapsed=this.current-this.start,this.trigger("tick"),window.requestAnimationFrame(()=>{this.tick()})}}class sI{constructor(){this.gl=new Vh,this.canvas=this.gl.canvas,this.sizes=this.gl.sizes,this.scene=this.gl.scene,this.camera=this.gl.camera,this.setInstance()}setInstance(){this.instance=new Q0({canvas:this.canvas,antialias:!0,alpha:!0}),this.instance.setPixelRatio(this.sizes.pixelRatio),this.instance.setSize(this.sizes.width,this.sizes.height)}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(window.devicePixelRatio)}update(){this.instance.render(this.scene,this.camera.instance)}}var oI=`uniform float uSliderProgress;
uniform vec2 uTextureRatio;
uniform sampler2D uTexture;
uniform sampler2D uTextureNext;

varying vec2 vUv;
varying vec2 vSize;

uniform float uScrollProgress;
uniform float uParallaxStrength;
uniform float uSlider;

vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize) {
    vec2 tempUV = uv - vec2(0.5);

    float quadAspect = quadSize.x / quadSize.y;
    float textureAspect = textureSize.x / textureSize.y;

    if(quadAspect < textureAspect) {
        tempUV = tempUV * vec2(quadAspect / textureAspect, 1.);
    } else {
        tempUV = tempUV * vec2(1., textureAspect / quadAspect);
    }

    tempUV += vec2(0.5);
    return tempUV;
}

void main() {
    vec2 correctUV = getUV(vUv, uTextureRatio, vSize);
    mat3 sliderMat;

    if (uSlider > 0.0) 
    {
        sliderMat = mat3(
        vec3(1., 0.0 , 0.0),
        vec3(0.0, 1., 0.),
        vec3((uScrollProgress * uParallaxStrength), -uSliderProgress / 2., 1.0));
    }
    else 
    {
        sliderMat = mat3(
        vec3(1., 0.0 , 0.0),
        vec3(0.0, 1., 0.),
        vec3((uScrollProgress * uParallaxStrength) + uSliderProgress / 2., 0.0 , 1.0));
    }

    vec2 vUvLeft =  (sliderMat * vec3(correctUV, 1.0)).xy;
    vec2 vUvRight = (sliderMat * vec3(correctUV, 1.0)).xy;
    vec4 baseImg = texture(uTexture, vUvLeft); 
    vec4 nullImg = texture(uTextureNext, vUvRight );

    if (uSlider > 0.0) 
    {
        gl_FragColor = mix(baseImg, nullImg, step((vUv.y), uSliderProgress));
    }
    else
    {
        gl_FragColor = mix(baseImg, nullImg, step(1.0-vUv.x, uSliderProgress));
    }
}`,aI=`uniform float uScreenProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
varying vec2 vUv;
varying vec2 vSize;

void main() {
    vUv = uv;
    vec4 defaultState = modelMatrix * vec4 (position, 1.0);
    vec4 fullScreenState = vec4 (position, 1.0);
    fullScreenState.x *= uResolution.x ;
    fullScreenState.y *= uResolution.y ;

    vec4 finalState = mix(defaultState, fullScreenState, uScreenProgress);
    vSize = mix(uQuadSize, uResolution, uScreenProgress);

    gl_Position = projectionMatrix * viewMatrix * finalState;
}`;let Ru=null;class Vh{constructor(e,t,i,r){if(Ru)return Ru;Ru=this,window.gl=this,this.canvas=e,this.container=t,this.overlay=i,this.menuOverlay=r,this.sizes=new iI,this.time=new rI,this.scene=new ZD,this.camera=new nI,this.renderer=new sI,this.textureLoader=new tI,this.geometry=new vc(1,1,100,100),this.allMaterials=[],this.debugActive=!1,this.currentCategory="photos",this.allTypesProject=["photos","videos","contact"],this.firstLoadProject=!0,this.firstLoadApp=!0,this.indexMenuOpen=!1,this.sizes.on("resize",()=>{this.resize()}),this.time.on("tick",()=>{this.update()}),document.ondblclick=function(s){s.preventDefault()},this.createSliderMaterial()}createSliderMaterial(){this.material=new yr({uniforms:{uSlider:{value:0},uSliderProgress:{value:0},uScreenProgress:{value:0},uTexture:{value:null},uTextureNext:{value:null},uTextureRatio:{value:new Qe(16,9)},uParallaxStrength:{value:.1},uScrollProgress:{value:0},uResolution:{value:new Qe(this.sizes.width,this.sizes.height)},uQuadSize:{value:new Qe(1,1)}},vertexShader:aI,fragmentShader:oI}),this.material.transparent=!0}resize(){this.camera.resize(),this.renderer.resize(),this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.ASlider&&this.ASlider.resize(),this.homeSlider&&this.homeSlider.resize(),this.itemSlider&&this.itemSlider.resize(),this.allMaterials.length>0&&this.allMaterials.forEach(e=>{e.uniforms.uResolution.value.x=this.sizes.width,e.uniforms.uResolution.value.y=this.sizes.height})}update(){this.ASlider&&this.ASlider.syncLabels(),this.renderer.update(),this.debugActive&&(this.material.uniforms.uSliderProgress.value=this.settings.sliderProgress,this.material.uniforms.uScreenProgress.value=this.settings.screenProgress)}}function lI(n,e,t,i,r){let s=null,o=!1;const a=l=>{s||(s=l);const c=Math.min((l-s)/i,1),u=Math.floor(c*(t-e)+e);n.innerHTML=`${u}%`,c<1?window.requestAnimationFrame(a):!o&&u>=97&&(o=!0,n.innerHTML="100%",cI(n,r))};window.requestAnimationFrame(a)}function cI(n,e){n.innerHTML=n.textContent.replace(/([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]+)/g,'<div class="word">$1</div>'),n.querySelectorAll(".word").forEach(i=>{i.innerHTML=i.textContent.replace(/[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]/g,"<div class='perspective'><div class='letter'><div>$&</div></div></div>")}),e&&typeof e=="function"&&e()}const uI=[{slug:"dunod-mallier",acf:{title:"Dunod Mallier",localisation:"",project_number:"11",title_preview:{line_1:"Dunod",line_2:"Mallier"},primary:{url:"/projets/dunod-mallier/cover.webp",alt:"Dunod Mallier — couverture du projet"},slides:[{image:{url:"/projets/dunod-mallier/slide-5.webp",alt:"Dunod Mallier — photo 1"},format:"vertical"},{image:{url:"/projets/dunod-mallier/slide-2.webp",alt:"Dunod Mallier — photo 2"},format:"vertical"},{image:{url:"/projets/dunod-mallier/slide-4.webp",alt:"Dunod Mallier — photo 3"},format:"horizontal"},{image:{url:"/projets/dunod-mallier/slide-3.webp",alt:"Dunod Mallier — photo 4"},format:"horizontal"},{image:{url:"/projets/dunod-mallier/slide-1.webp",alt:"Dunod Mallier — photo 5"},format:"horizontal"}],context:[{title:"Contexte",body:"Dunod-Mallier est un atelier de ferronnerie d'art qui conçoit et restaure des ouvrages sur mesure en métal. L'entreprise s'adresse aux architectes, décorateurs et clients privés, avec un fort accent sur le savoir-faire artisanal, la qualité et la personnalisation."},{title:"Mission",body:"Mettre en avant le savoir faire des artisans à travers des photos et vidéos pendant la réalisation d'un meuble."}],type:"Artisan d'art",videos:[]}},{slug:"palet-saint-germain",acf:{title:"Palet Saint Germain",localisation:"",project_number:"12",title_preview:{line_1:"Palet",line_2:"Saint Germain"},primary:{url:"/projets/palet-saint-germain/cover.webp",alt:"Palet Saint Germain — couverture du projet"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Présentation du projet et de ses enjeux — texte à compléter."}],type:"Association sportive",videos:[]}},{slug:"terracall",acf:{title:"Terracall",localisation:"",project_number:"10",title_preview:{line_1:"Terracall",line_2:""},primary:{url:"/projets/terracall/cover.webp",alt:"Terracall — couverture du projet"},slides:[{image:{url:"/projets/terracall/slide-1.webp",alt:"Terracall — photo 1"},format:"horizontal"},{image:{url:"/projets/terracall/slide-2.webp",alt:"Terracall — photo 2"},format:"horizontal"},{image:{url:"/projets/terracall/slide-3.webp",alt:"Terracall — photo 3"},format:"vertical"}],context:[{title:"Contexte",body:"Terracall est un opérateur mobile nouvelle génération pour les professionnels. Il propose des forfaits avec un assistant IA intégré qui transcrit, résume et organise les appels, avec un enjeu clair : faire gagner du temps et valoriser le savoir-faire commercial des équipes."}],type:"Startup",videos:["https://www.instagram.com/reel/DLmgQpDvTTE/","https://www.instagram.com/reel/DMadI-CpjhO/","https://www.instagram.com/reel/DOvwuvdE8pN/","https://www.instagram.com/reel/DQ81rVeDIoP/"]}},{slug:"biere-masterclass",acf:{title:"Bière Masterclass",localisation:"",project_number:"09",title_preview:{line_1:"Bière",line_2:"Masterclass"},primary:{url:"/projets/biere-masterclass/cover.webp",alt:"Bière Masterclass — couverture du projet"},slides:[{image:{url:"/projets/biere-masterclass/slide-1.webp",alt:"Bière Masterclass — photo 1"},format:"horizontal"},{image:{url:"/projets/biere-masterclass/slide-2.webp",alt:"Bière Masterclass — photo 2"},format:"vertical"},{image:{url:"/projets/biere-masterclass/slide-3.webp",alt:"Bière Masterclass — photo 3"},format:"horizontal"},{image:{url:"/projets/biere-masterclass/slide-4.webp",alt:"Bière Masterclass — photo 4"},format:"vertical"},{image:{url:"/projets/biere-masterclass/slide-5.webp",alt:"Bière Masterclass — photo 5"},format:"horizontal"}],context:[{title:"Contexte",body:"Bière Masterclass est une agence événementielle et d'ateliers autour de la bière artisanale, qui propose des dégustations, des animations et des événements sur mesure pour particuliers et entreprises."}],type:"Organisateur d'événements découverte",videos:["https://www.instagram.com/reel/DU8LF4uCBJA/","https://www.instagram.com/reel/DVDr9IZjfM5/","https://www.instagram.com/reel/DYNFIiZg6bt/"]}},{slug:"carte-blanche",acf:{title:"Carte Blanche",localisation:"",project_number:"08",title_preview:{line_1:"Carte",line_2:"Blanche"},primary:{url:"/projets/carte-blanche/cover.webp",alt:"Carte Blanche — restaurant, cuisine en plein service"},slides:[{image:{url:"/projets/carte-blanche/slide-1.webp",alt:"Carte Blanche — photo 1"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-2.webp",alt:"Carte Blanche — photo 2"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-3.webp",alt:"Carte Blanche — photo 3"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-4.webp",alt:"Carte Blanche — photo 4"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-5.webp",alt:"Carte Blanche — photo 5"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-6.webp",alt:"Carte Blanche — photo 6"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-7.webp",alt:"Carte Blanche — photo 7"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-8.webp",alt:"Carte Blanche — photo 8"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-9.webp",alt:"Carte Blanche — photo 9"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-10.webp",alt:"Carte Blanche — photo 10"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-11.webp",alt:"Carte Blanche — photo 11"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-12.webp",alt:"Carte Blanche — photo 12"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-13.webp",alt:"Carte Blanche — photo 13"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-14.webp",alt:"Carte Blanche — photo 14"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-15.webp",alt:"Carte Blanche — photo 15"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-16.webp",alt:"Carte Blanche — photo 16"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-17.webp",alt:"Carte Blanche — photo 17"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-18.webp",alt:"Carte Blanche — photo 18"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-19.webp",alt:"Carte Blanche — photo 19"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-20.webp",alt:"Carte Blanche — photo 20"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-21.webp",alt:"Carte Blanche — photo 21"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-22.webp",alt:"Carte Blanche — photo 22"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-23.webp",alt:"Carte Blanche — photo 23"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-24.webp",alt:"Carte Blanche — photo 24"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-25.webp",alt:"Carte Blanche — photo 25"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-26.webp",alt:"Carte Blanche — photo 26"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-27.webp",alt:"Carte Blanche — photo 27"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-28.webp",alt:"Carte Blanche — photo 28"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-29.webp",alt:"Carte Blanche — photo 29"},format:"vertical"}],context:[{title:"Contexte",body:"Carte Blanche est un lieu de restauration du 10e arrondissement qui fonctionne comme une résidence de chefs. Il s'adresse aux amateurs de gastronomie curieux de découvrir des propositions renouvelées à chaque changement de chef."}],type:"Restaurant",videos:["https://www.instagram.com/reel/DO3pSB-DN4i/?hl=fr","https://www.instagram.com/reel/DO83r01jObE/","https://www.instagram.com/reel/DPWYqPVDKMz/","https://www.instagram.com/reel/DPos-AkjDL6/","https://www.instagram.com/reel/DQMgjo_jEFf/","https://www.instagram.com/reel/DRPGLfajL2D/","https://www.instagram.com/reel/DRXOHmbjDrh/","https://www.instagram.com/reel/DRfEqm1jAVi/","https://www.instagram.com/reel/DSAtTPXjJFE/","https://www.instagram.com/reel/DUWFe_TDHuW/"]}},{slug:"incubateur-ensam",acf:{title:"Incubateur ENSAM",localisation:"",project_number:"07",title_preview:{line_1:"Incubateur",line_2:"ENSAM"},primary:{url:"/projets/incubateur-ensam/cover.webp",alt:"Incubateur ENSAM — échange à l'incubateur Arts et Métiers, campus de Paris"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Incubateur ENSAM — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Incubateur ENSAM — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Présentation du projet et de ses enjeux — texte à compléter."}],type:"Incubateur d'école",videos:[]}},{slug:"vestaclim",acf:{title:"Vestaclim",localisation:"",project_number:"06",title_preview:{line_1:"Vestaclim",line_2:""},primary:{url:"/projets/vestaclim/cover.webp",alt:"Vestaclim — couverture du projet"},slides:[{image:{url:"/projets/vestaclim/slide-1.webp",alt:"Vestaclim — photo 1"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-2.webp",alt:"Vestaclim — photo 2"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-3.webp",alt:"Vestaclim — photo 3"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-4.webp",alt:"Vestaclim — photo 4"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-5.webp",alt:"Vestaclim — photo 5"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-6.webp",alt:"Vestaclim — photo 6"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-7.webp",alt:"Vestaclim — photo 7"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-8.webp",alt:"Vestaclim — photo 8"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-9.webp",alt:"Vestaclim — photo 9"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-10.webp",alt:"Vestaclim — photo 10"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-11.webp",alt:"Vestaclim — photo 11"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-12.webp",alt:"Vestaclim — photo 12"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-13.webp",alt:"Vestaclim — photo 13"},format:"vertical"}],context:[{title:"Contexte",body:`Vestaclim est une startup qui développe une solution écologique pour rafraîchir et purifier l'air dans les logements anciens, en particulier ceux où la climatisation classique est difficile à installer. Elle s'adresse aux habitants de logement anciens en ville, de copropriétés et professionnels sensibles au confort thermique.

L'enjeu de Vestaclim est de faire connaitre sa solution au plus grand nombre.`}],type:"Startup greentech",videos:[]}},{slug:"corail-et-nacre",acf:{title:"Corail & Nacre",localisation:"",project_number:"05",title_preview:{line_1:"Corail &",line_2:"Nacre"},primary:{url:"https://res.cloudinary.com/demo/image/upload/w_1200,h_1600,c_fill/sample.jpg",alt:"Corail & Nacre — photo principale (temporaire)"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Corail & Nacre — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Corail & Nacre — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Corail & Nacre est un studio d'architecture d'intérieur spécialisé dans la rénovation complète d'appartements et de maisons haut de gamme. L'agence s'adresse à une clientèle exigeante pour une prestation sur-mesure, de la qualité d'exécution et des projets clé en main."}],type:"Architecte d'intérieur",videos:["https://www.instagram.com/reel/DZkN8ooIe-S/","https://www.instagram.com/reel/DaIX13Do06J/","https://www.instagram.com/reel/DZ2QZjEoggl/","https://www.instagram.com/reel/DSxhCwNiL3T/","https://www.instagram.com/reel/DTppz0FiJfG/"]}},{slug:"pouryere",acf:{title:"Pouryère",localisation:"",project_number:"04",title_preview:{line_1:"Pouryère",line_2:""},primary:{url:"/projets/pouryere/cover.webp",alt:"Pouryère — couverture du projet"},slides:[{image:{url:"/projets/pouryere/slide-1.webp",alt:"Pouryère — photo 1"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-2.webp",alt:"Pouryère — photo 2"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-3.webp",alt:"Pouryère — photo 3"},format:"vertical"},{image:{url:"/projets/pouryere/slide-4.webp",alt:"Pouryère — photo 4"},format:"vertical"},{image:{url:"/projets/pouryere/slide-5.webp",alt:"Pouryère — photo 5"},format:"vertical"},{image:{url:"/projets/pouryere/slide-6.webp",alt:"Pouryère — photo 6"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-7.webp",alt:"Pouryère — photo 7"},format:"vertical"},{image:{url:"/projets/pouryere/slide-8.webp",alt:"Pouryère — photo 8"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-9.webp",alt:"Pouryère — photo 9"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-10.webp",alt:"Pouryère — photo 10"},format:"vertical"},{image:{url:"/projets/pouryere/slide-11.webp",alt:"Pouryère — photo 11"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-12.webp",alt:"Pouryère — photo 12"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-13.webp",alt:"Pouryère — photo 13"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-14.webp",alt:"Pouryère — photo 14"},format:"vertical"},{image:{url:"/projets/pouryere/slide-15.webp",alt:"Pouryère — photo 15"},format:"vertical"},{image:{url:"/projets/pouryere/slide-16.webp",alt:"Pouryère — photo 16"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-17.webp",alt:"Pouryère — photo 17"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-18.webp",alt:"Pouryère — photo 18"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-19.webp",alt:"Pouryère — photo 19"},format:"vertical"},{image:{url:"/projets/pouryere/slide-20.webp",alt:"Pouryère — photo 20"},format:"horizontal"}],context:[{title:"Contexte",body:`Pouryère est une startup spécialisée dans l'analyse et le diagnostic des sols, pour les particuliers comme pour les professionnels. Elle s'adresse aux particuliers voulant mieux connaître l'état de leur sol et avoir des conseils sur les plantations adaptées au sol.

Les enjeux de Pouryère sont de sensibiliser au sujet de la pollution du sol pour ensuite éduquer le plus de personne possible. C'est un sujet encore trop peu connu et peu réglementé alors qu'il touche directement la santé des habitants.`}],type:"Startup greentech",videos:["https://www.instagram.com/reel/Dak-479Bpzd/","https://www.instagram.com/reel/DZ-WWj7t6sI/","https://www.instagram.com/reel/DYpcLc8ha_X/","https://www.instagram.com/p/DY2UeTXtR8f/","https://www.instagram.com/p/DZc2G4avM7L/","https://www.instagram.com/p/DXHeTaACJVX/"]}},{slug:"renoo",acf:{title:"Renoo",localisation:"",project_number:"03",title_preview:{line_1:"Renoo",line_2:""},primary:{url:"/projets/renoo/cover.webp",alt:"Renoo — couverture du projet"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Renoo — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Renoo — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Renoo est une entreprise spécialisée dans la rénovation de l'habitat, qui accompagne les propriétaires et les professionnels de l'idée jusqu'aux finitions. Elle s'adresse à ceux qui veulent un bon accompagnement, sans le stress des travaux et un suivi millimétré."}],type:"Entreprise de rénovation",videos:[]}},{slug:"inskip",acf:{title:"Inskip",localisation:"",project_number:"02",title_preview:{line_1:"Inskip",line_2:""},primary:{url:"/projets/inskip/cover.webp",alt:"Inskip — couverture du projet"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Inskip — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Inskip — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:`INSKIP est un cabinet de conseil en stratégie et innovation qui accompagne startups, grands groupes et institutions dans la conception, le déploiement et la croissance de leurs projets. Il s'adresse à des organisations qui veulent passer de l'idée à l'action.

Le Sales Bootcamp accompagne des fondateurs et équipes commerciales à maitriser leur croissance avec des méthodes de prospection et de vente approuvées.`}],type:"Coaching en vente",videos:[]}},{slug:"grof",acf:{title:"Grof",localisation:"",project_number:"01",title_preview:{line_1:"Grof",line_2:""},primary:{url:"/projets/grof/cover.webp",alt:"Grof — couverture du projet"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Grof — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Grof — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Grof est une agence d'accompagnement commercial pour les entreprises de services et les fondateurs de PME. Elle aide ses clients à structurer leur prospection, améliorer leur performance commerciale pour accélérer leur croissance, avec un enjeu de mise en valeur des bonnes méthodes de vente et l'exécution efficace."}],type:"Coaching en vente",videos:["https://www.instagram.com/p/DYjZUIdib3b/","https://www.instagram.com/p/Daf3AGXFwlN/","https://www.instagram.com/reel/DYl-PPDEvTE/","https://www.instagram.com/reel/DY2TvT2DfvC/","https://www.instagram.com/reel/DZcDDfSgjrE/","https://www.instagram.com/reel/DZKBjywk5--/","https://www.instagram.com/reel/DX63GFtjrmi/","https://www.instagram.com/reel/DaCqJJ2ATp7/","https://www.instagram.com/reel/DaigEgHjGk1/"]}}],fI=[{slug:"nom-projet-perso",acf:{title:"Nom du projet perso",localisation:"Paris",project_number:"01",title_preview:{line_1:"Nom du",line_2:"Projet"},primary:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/photo-principale.jpg",alt:"Description"},slides:[{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/photo-1.jpg",alt:"Description"},format:"horizontal"}],video_url:null}}],hI={email:"contact.leo.crouzille@gmail.com",instagram_link:"https://www.instagram.com/TON-COMPTE",linkedin_link:"https://www.linkedin.com/in/TON-COMPTE",youtube_link:"https://www.youtube.com/@TON-COMPTE",contact_slider_image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/photo-contact.jpg",alt:"Photo contact"}},dI={acf:hI},pI={page_title:"Léo Crouzille",page_subtitle_1:"Photographe",page_subtitle_2:"Indépendant",page_subtitle_3:"Portfolio",page_paragraph:"Photographe indépendant spécialisé dans les domaines du BTP et de l'architecture.",home_slider:[{image:{url:"/home/bnf.webp",alt:"Bibliothèque nationale de France, Paris"}},{image:{url:"/home/biarritz.webp",alt:"Biarritz"}},{image:{url:"/home/helsinki.webp",alt:"Helsinki"}}]},mI={acf:pI},_I={page_title:"Léo Crouzille",page_subtitle_1:"À Propos",page_subtitle_2:"Photographe",page_subtitle_3:"Portfolio",page_headline:{line_1:"Ligne 1",line_2:"Ligne 2",line_3:"Ligne 3"},page_paragraph_1:"Paragraphe de présentation 1.",page_paragraph_2:"Paragraphe de présentation 2.",about_slider:[{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/about-1.jpg",alt:"Photo about"}}]},gI={acf:_I},vI={page_title:"Léo Crouzille",page_subtitle_1:"Crédits",page_subtitle_2:"Mentions",page_subtitle_3:"Portfolio",page_credit_1:{title:"Conception & Développement",text:"Mickael Laval"},page_credit_2:{title:"Contenu photos/vidéos",text:"Léo Crouzille"},page_credit_3:{title:"Typographie",text_1:"Switzer Variable",url_1:"https://www.fontshare.com/fonts/switzer",text_2:"Fontshare",url_2:"https://www.fontshare.com"},credits_slider:{credits_slider_1:{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/credits-1.jpg",alt:"Photo credits"}}}},xI={acf:vI},yI={page_title:"Léo Crouzille",page_subtitle_1:"Mentions",page_subtitle_2:"Légales",page_subtitle_3:"Portfolio",page_mention_1:{title:"Éditeur",text_line_1:"Léo Crouzille",text_line_2:"contact.leo.crouzille@gmail.com",text_line_3:"",text_line_4:"",text_line_5:""},page_mention_2:{title:"Hébergement",text_line_1:"Vercel Inc.",text_line_2:"440 N Barranca Ave #4133",text_line_3:"Covina, CA 91723",text_line_4:"",text_line_5:""},mentions_slider:{mentions_slider_1:{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/mentions-1.jpg",alt:"Photo mentions"}}}},SI={acf:yI},MI=Ce("div",{class:"page__title__wrapper",style:{visibility:"hidden",position:"fixed",left:"20px",top:"70px","font-weight":"200"}},[Ce("span",{class:"page__title__primary loading__count reveal-loading",style:{visibility:"hidden","padding-right":"20px"}},"0%"),Ce("span",{class:"page__title__secondary reveal-loading",style:{visibility:"hidden","padding-right":"20px","text-transform":"uppercase"}},"Chargement")],-1),EI=[MI],bI={class:"nav__project__wrapper"},TI={id:"gl"},wI={__name:"app",setup(n){const e=Er(),t=En("settings"),i=En("home"),r=En("about"),s=En("credits"),o=En("projects"),a=En("projets-perso"),l=En("mentions"),c=En("gl"),u=At(null),f=At(null),h=At(null),d=At(null),g=At(!0);At(0);const _=At(null);H1(()=>{o.value=uI,a.value=fI,t.value=dI,i.value=mI,r.value=gI,s.value=xI,l.value=SI},"$E3KxD8SGyR");function m(){Jr(".reveal-header",!1),Ke.to(".link-line",{x:0,ease:"expo.inOut",duration:1.2,delay:1,stagger:.1,onComplete:()=>{OT()}}),(e.name=="index"||e.name=="about"||e.name=="credits"||e.name=="mentions"||e.name=="contact")&&(NT(),Ke.fromTo(".svg__mail",{y:100},{y:0,duration:1.5,delay:.1,ease:"expo.inOut"}))}function p(){if(g.value){try{m()}catch(x){console.error("firstUIReveal:",x)}_.value?Ke.to(_.value,{opacity:0,duration:.5,ease:"expo.inOut",onComplete:()=>{g.value=!1}}):g.value=!1}}return ki(async()=>{try{c.value=new Vh(u.value,f.value,h.value,d.value)}catch(x){console.error(x)}await Sr();try{Jr(".reveal-loading",!1)}catch{}setTimeout(()=>{lI(document.querySelector(".loading__count"),0,100,1300,()=>{try{Jr(".reveal-loading",!0)}catch{}p()})},400),setTimeout(p,3500)}),(x,v)=>{const S=IA,b=BA,E=zA,T=XA,L=z1;return Je(),mt(jt,null,[ht(g)?(Je(),mt("div",{key:0,id:"loading-screen",ref_key:"loadingScreen",ref:_,class:"page__title__wrapper",style:{position:"fixed",left:"0",top:"0",height:"100vh",width:"100vw","z-index":"1000","background-color":"rgb(31, 31, 31)"}},EI,512)):Zn("",!0),Ce("div",{id:"container",ref_key:"appContainer",ref:f},[qe(S,{social_1:ht(t).acf.instagram_link,social_2:ht(t).acf.linkedin_link,social_3:ht(t).acf.youtube_link},null,8,["social_1","social_2","social_3"]),qe(b),qe(E),Ce("nav",bI,[Ce("ul",null,[Ce("li",null,[qe(T,{link:"/photos",text:"Photos",spanClass:"reveal-nav-project category-link"})]),Ce("li",null,[qe(T,{link:"/videos",text:"Vidéos",spanClass:"reveal-nav-project category-link"})]),Ce("li",null,[qe(T,{link:"/contact",text:"Contact",spanClass:"reveal-nav-project category-link"})])])]),qe(L),Ce("div",{id:"overlay",ref_key:"appOverlay",ref:h},null,512),Ce("div",{id:"menuOverlay",ref_key:"menuOverlay",ref:d},null,512),Ce("section",TI,[Ce("canvas",{ref_key:"canvas",ref:u},null,512)])],512)],64)}}},AI={id:"errorContent"},RI={id:"pageTitle"},CI={class:"error-button"},PI={__name:"error",setup(n){const e=Pn();function t(){Jr(".reveal",!0),Ke.to("#errorContent",{opacity:0,duration:1,ease:"power2.inOut"}),Ke.to(".error-button",{height:"-10px",duration:.3,ease:"power2.inOut"}),setTimeout(()=>{e.push("/")},1e3)}return ki(()=>{Jr(".reveal",!1)}),(i,r)=>{const s=_0,o=p0;return Je(),mt("main",AI,[Ce("div",RI,[qe(s,{pageTitle:"Error 404",subtitleOne:"Page",subtitleTwo:"Introuvable"})]),Ce("div",CI,[qe(o,{onClick:t,text:"Accueil",spanClass:"reveal button-link "})])])}}},LI=dc(PI,[["__scopeId","data-v-1fcf34a8"]]),s_={__name:"nuxt-root",setup(n){const e=()=>null,t=st(),i=t.deferHydration(),r=!1;Hs(oc,Er()),t.hooks.callHookWith(a=>a.map(l=>l()),"vue:setup");const s=ac();J_((a,l,c)=>{if(t.hooks.callHook("vue:error",a,l,c).catch(u=>console.error("[nuxt] Error in `vue:error` hook",u)),YE(a)&&(a.fatal||a.unhandled))return t.runWithContext(()=>Ls(a)),!1});const o=!1;return(a,l)=>(Je(),nr(W_,{onResolve:ht(i)},{default:ha(()=>[ht(s)?(Je(),nr(ht(LI),{key:0,error:ht(s)},null,8,["error"])):ht(o)?(Je(),nr(ht(e),{key:1,context:ht(o)},null,8,["context"])):ht(r)?(Je(),nr(oy(ht(r)),{key:2})):(Je(),nr(ht(wI),{key:3}))]),_:1},8,["onResolve"]))}};let o_;{let n;o_=async function(){var o,a;if(n)return n;const i=!!((o=window.__NUXT__)!=null&&o.serverRendered||((a=document.getElementById("__NUXT_DATA__"))==null?void 0:a.dataset.ssr)==="true")?OS(s_):NS(s_),r=zM({vueApp:i});async function s(l){await r.callHook("app:error",l),r.payload.error=r.payload.error||l}i.config.errorHandler=s;try{await VM(r,LT)}catch(l){s(l)}try{await r.hooks.callHook("app:created",i),await r.hooks.callHook("app:beforeMount",i),i.mount(ib),await r.hooks.callHook("app:mounted",i),await Sr()}catch(l){s(l)}return i.config.errorHandler===s&&(i.config.errorHandler=void 0),i},n=o_().catch(e=>{throw console.error("Error while mounting app:",e),e})}export{Ke as A,aI as B,Jr as C,Tf as D,k_ as E,jt as F,Vh as G,z_ as H,zA as I,nh as J,NI as K,C1 as L,lr as M,Jw as N,zI as O,HI as P,II as Q,yr as S,UI as T,Qe as V,_0 as _,En as a,ki as b,NT as c,kI as d,mt as e,Ce as f,qe as g,ht as h,Nh as i,T1 as j,Je as k,Ry as l,Zn as m,Sr as n,OI as o,BI as p,nr as q,At as r,dc as s,tn as t,Er as u,Pn as v,ha as w,St as x,FI as y,is as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./about.aWGomN5c.js","./homeToSlider.f_n6J1mA.js","./homeToSlider.GxEtiuH-.css","./index.VNUXMW3u.js","./swipe.mfZJVM15.js","./imageLoad.M9IFnH9O.js","./about.kWbu5jPo.css","./contact.0-yDy7uC.js","./contact.HXt8RmGE.css","./credits.aTVKNjaj.js","./credits.KE1fdQj6.css","./index.jHEPdohv.js","./index.E_YiozyN.css","./mentions._sesKJVU.js","./mentions.cQCsjrSj.css","./_uid_.i5uC3eAm.js","./uid.vvX6gCvv.js","./project.X3iz2qKT.js","./_uid_.fSN8dYO0.css","./photos.Okbx4eH5.js","./CrossClose.VYW4BKzD.js","./CrossClose.x_HO5faz.css","./_uid_.nbgWzFBM.js","./_uid_.OOG9gFE9.css","./_uid_.MfiVbciB.js","./_uid_.V_5RdQsZ.css","./videos.79wdvm60.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
