var xx=Object.defineProperty;var yx=(n,e,t)=>e in n?xx(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var oi=(n,e,t)=>(yx(n,typeof e!="symbol"?e+"":e,t),t);/**
* @vue/shared v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function zf(n,e){const t=new Set(n.split(","));return e?i=>t.has(i.toLowerCase()):i=>t.has(i)}const pt={},ks=[],Gn=()=>{},Sx=()=>!1,ua=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Hf=n=>n.startsWith("onUpdate:"),Ct=Object.assign,Gf=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Mx=Object.prototype.hasOwnProperty,Ye=(n,e)=>Mx.call(n,e),Le=Array.isArray,Bs=n=>fa(n)==="[object Map]",d_=n=>fa(n)==="[object Set]",Ex=n=>fa(n)==="[object RegExp]",Fe=n=>typeof n=="function",vt=n=>typeof n=="string",co=n=>typeof n=="symbol",ct=n=>n!==null&&typeof n=="object",p_=n=>(ct(n)||Fe(n))&&Fe(n.then)&&Fe(n.catch),m_=Object.prototype.toString,fa=n=>m_.call(n),bx=n=>fa(n).slice(8,-1),__=n=>fa(n)==="[object Object]",Vf=n=>vt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Po=zf(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Yl=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Tx=/-(\w)/g,gi=Yl(n=>n.replace(Tx,(e,t)=>t?t.toUpperCase():"")),wx=/\B([A-Z])/g,uo=Yl(n=>n.replace(wx,"-$1").toLowerCase()),Kl=Yl(n=>n.charAt(0).toUpperCase()+n.slice(1)),wc=Yl(n=>n?`on${Kl(n)}`:""),vr=(n,e)=>!Object.is(n,e),Lo=(n,e)=>{for(let t=0;t<n.length;t++)n[t](e)},xl=(n,e,t)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value:t})},Ax=n=>{const e=parseFloat(n);return isNaN(e)?n:e},g_=n=>{const e=vt(n)?Number(n):NaN;return isNaN(e)?n:e};let ed;const v_=()=>ed||(ed=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Wf(n){if(Le(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=vt(i)?Lx(i):Wf(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(vt(n)||ct(n))return n}const Cx=/;(?![^(]*\))/g,Rx=/:([^]+)/,Px=/\/\*[^]*?\*\//g;function Lx(n){const e={};return n.replace(Px,"").split(Cx).forEach(t=>{if(t){const i=t.split(Rx);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function ss(n){let e="";if(vt(n))e=n;else if(Le(n))for(let t=0;t<n.length;t++){const i=ss(n[t]);i&&(e+=i+" ")}else if(ct(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Dx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ix=zf(Dx);function x_(n){return!!n||n===""}const nn=n=>vt(n)?n:n==null?"":Le(n)||ct(n)&&(n.toString===m_||!Fe(n.toString))?JSON.stringify(n,y_,2):String(n),y_=(n,e)=>e&&e.__v_isRef?y_(n,e.value):Bs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[Ac(i,s)+" =>"]=r,t),{})}:d_(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ac(t))}:co(e)?Ac(e):ct(e)&&!Le(e)&&!__(e)?String(e):e,Ac=(n,e="")=>{var t;return co(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Jn;class S_{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Jn,!e&&Jn&&(this.index=(Jn.scopes||(Jn.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=Jn;try{return Jn=this,e()}finally{Jn=t}}}on(){Jn=this}off(){Jn=this.parent}stop(e){if(this._active){let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function Ux(n){return new S_(n)}function Nx(n,e=Jn){e&&e.active&&e.effects.push(n)}function Ox(){return Jn}let Xr;class jf{constructor(e,t,i,r){this.fn=e,this.trigger=t,this.scheduler=i,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Nx(this,r)}get dirty(){if(this._dirtyLevel===1){us();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(Fx(t.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),fs()}return this._dirtyLevel>=2}set dirty(e){this._dirtyLevel=e?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=fr,t=Xr;try{return fr=!0,Xr=this,this._runnings++,td(this),this.fn()}finally{nd(this),this._runnings--,Xr=t,fr=e}}stop(){var e;this.active&&(td(this),nd(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function Fx(n){return n.value}function td(n){n._trackId++,n._depsLength=0}function nd(n){if(n.deps&&n.deps.length>n._depsLength){for(let e=n._depsLength;e<n.deps.length;e++)M_(n.deps[e],n);n.deps.length=n._depsLength}}function M_(n,e){const t=n.get(e);t!==void 0&&e._trackId!==t&&(n.delete(e),n.size===0&&n.cleanup())}let fr=!0,Du=0;const E_=[];function us(){E_.push(fr),fr=!1}function fs(){const n=E_.pop();fr=n===void 0?!0:n}function Xf(){Du++}function qf(){for(Du--;!Du&&Iu.length;)Iu.shift()()}function b_(n,e,t){if(e.get(n)!==n._trackId){e.set(n,n._trackId);const i=n.deps[n._depsLength];i!==e?(i&&M_(i,n),n.deps[n._depsLength++]=e):n._depsLength++}}const Iu=[];function T_(n,e,t){Xf();for(const i of n.keys())if(n.get(i)===i._trackId){if(i._dirtyLevel<e&&!(i._runnings&&!i.allowRecurse)){const r=i._dirtyLevel;i._dirtyLevel=e,r===0&&(i._shouldSchedule=!0,i.trigger())}i.scheduler&&i._shouldSchedule&&(!i._runnings||i.allowRecurse)&&(i._shouldSchedule=!1,Iu.push(i.scheduler))}qf()}const w_=(n,e)=>{const t=new Map;return t.cleanup=n,t.computed=e,t},yl=new WeakMap,qr=Symbol(""),Uu=Symbol("");function xn(n,e,t){if(fr&&Xr){let i=yl.get(n);i||yl.set(n,i=new Map);let r=i.get(t);r||i.set(t,r=w_(()=>i.delete(t))),b_(Xr,r)}}function Di(n,e,t,i,r,s){const o=yl.get(n);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(t==="length"&&Le(n)){const l=Number(i);o.forEach((c,u)=>{(u==="length"||!co(u)&&u>=l)&&a.push(c)})}else switch(t!==void 0&&a.push(o.get(t)),e){case"add":Le(n)?Vf(t)&&a.push(o.get("length")):(a.push(o.get(qr)),Bs(n)&&a.push(o.get(Uu)));break;case"delete":Le(n)||(a.push(o.get(qr)),Bs(n)&&a.push(o.get(Uu)));break;case"set":Bs(n)&&a.push(o.get(qr));break}Xf();for(const l of a)l&&T_(l,2);qf()}function kx(n,e){var t;return(t=yl.get(n))==null?void 0:t.get(e)}const Bx=zf("__proto__,__v_isRef,__isVue"),A_=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(co)),id=zx();function zx(){const n={};return["includes","indexOf","lastIndexOf"].forEach(e=>{n[e]=function(...t){const i=Je(this);for(let s=0,o=this.length;s<o;s++)xn(i,"get",s+"");const r=i[e](...t);return r===-1||r===!1?i[e](...t.map(Je)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{n[e]=function(...t){us(),Xf();const i=Je(this)[e].apply(this,t);return qf(),fs(),i}}),n}function Hx(n){const e=Je(this);return xn(e,"has",n),e.hasOwnProperty(n)}class C_{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t}get(e,t,i){const r=this._isReadonly,s=this._shallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?ey:D_:s?L_:P_).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Le(e);if(!r){if(o&&Ye(id,t))return Reflect.get(id,t,i);if(t==="hasOwnProperty")return Hx}const a=Reflect.get(e,t,i);return(co(t)?A_.has(t):Bx(t))||(r||xn(e,"get",t),s)?a:Gt(a)?o&&Vf(t)?a:a.value:ct(a)?r?I_(a):Ii(a):a}}class R_ extends C_{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._shallow){const l=os(s);if(!Sl(i)&&!os(i)&&(s=Je(s),i=Je(i)),!Le(e)&&Gt(s)&&!Gt(i))return l?!1:(s.value=i,!0)}const o=Le(e)&&Vf(t)?Number(t)<e.length:Ye(e,t),a=Reflect.set(e,t,i,r);return e===Je(r)&&(o?vr(i,s)&&Di(e,"set",t,i):Di(e,"add",t,i)),a}deleteProperty(e,t){const i=Ye(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&Di(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!co(t)||!A_.has(t))&&xn(e,"has",t),i}ownKeys(e){return xn(e,"iterate",Le(e)?"length":qr),Reflect.ownKeys(e)}}class Gx extends C_{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Vx=new R_,Wx=new Gx,jx=new R_(!0),$f=n=>n,Zl=n=>Reflect.getPrototypeOf(n);function Ta(n,e,t=!1,i=!1){n=n.__v_raw;const r=Je(n),s=Je(e);t||(vr(e,s)&&xn(r,"get",e),xn(r,"get",s));const{has:o}=Zl(r),a=i?$f:t?Zf:jo;if(o.call(r,e))return a(n.get(e));if(o.call(r,s))return a(n.get(s));n!==r&&n.get(e)}function wa(n,e=!1){const t=this.__v_raw,i=Je(t),r=Je(n);return e||(vr(n,r)&&xn(i,"has",n),xn(i,"has",r)),n===r?t.has(n):t.has(n)||t.has(r)}function Aa(n,e=!1){return n=n.__v_raw,!e&&xn(Je(n),"iterate",qr),Reflect.get(n,"size",n)}function rd(n){n=Je(n);const e=Je(this);return Zl(e).has.call(e,n)||(e.add(n),Di(e,"add",n,n)),this}function sd(n,e){e=Je(e);const t=Je(this),{has:i,get:r}=Zl(t);let s=i.call(t,n);s||(n=Je(n),s=i.call(t,n));const o=r.call(t,n);return t.set(n,e),s?vr(e,o)&&Di(t,"set",n,e):Di(t,"add",n,e),this}function od(n){const e=Je(this),{has:t,get:i}=Zl(e);let r=t.call(e,n);r||(n=Je(n),r=t.call(e,n)),i&&i.call(e,n);const s=e.delete(n);return r&&Di(e,"delete",n,void 0),s}function ad(){const n=Je(this),e=n.size!==0,t=n.clear();return e&&Di(n,"clear",void 0,void 0),t}function Ca(n,e){return function(i,r){const s=this,o=s.__v_raw,a=Je(o),l=e?$f:n?Zf:jo;return!n&&xn(a,"iterate",qr),o.forEach((c,u)=>i.call(r,l(c),l(u),s))}}function Ra(n,e,t){return function(...i){const r=this.__v_raw,s=Je(r),o=Bs(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=r[n](...i),u=t?$f:e?Zf:jo;return!e&&xn(s,"iterate",l?Uu:qr),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Gi(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Xx(){const n={get(s){return Ta(this,s)},get size(){return Aa(this)},has:wa,add:rd,set:sd,delete:od,clear:ad,forEach:Ca(!1,!1)},e={get(s){return Ta(this,s,!1,!0)},get size(){return Aa(this)},has:wa,add:rd,set:sd,delete:od,clear:ad,forEach:Ca(!1,!0)},t={get(s){return Ta(this,s,!0)},get size(){return Aa(this,!0)},has(s){return wa.call(this,s,!0)},add:Gi("add"),set:Gi("set"),delete:Gi("delete"),clear:Gi("clear"),forEach:Ca(!0,!1)},i={get(s){return Ta(this,s,!0,!0)},get size(){return Aa(this,!0)},has(s){return wa.call(this,s,!0)},add:Gi("add"),set:Gi("set"),delete:Gi("delete"),clear:Gi("clear"),forEach:Ca(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Ra(s,!1,!1),t[s]=Ra(s,!0,!1),e[s]=Ra(s,!1,!0),i[s]=Ra(s,!0,!0)}),[n,t,e,i]}const[qx,$x,Yx,Kx]=Xx();function Yf(n,e){const t=e?n?Kx:Yx:n?$x:qx;return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(Ye(t,r)&&r in i?t:i,r,s)}const Zx={get:Yf(!1,!1)},Jx={get:Yf(!1,!0)},Qx={get:Yf(!0,!1)},P_=new WeakMap,L_=new WeakMap,D_=new WeakMap,ey=new WeakMap;function ty(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ny(n){return n.__v_skip||!Object.isExtensible(n)?0:ty(bx(n))}function Ii(n){return os(n)?n:Kf(n,!1,Vx,Zx,P_)}function ha(n){return Kf(n,!1,jx,Jx,L_)}function I_(n){return Kf(n,!0,Wx,Qx,D_)}function Kf(n,e,t,i,r){if(!ct(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=r.get(n);if(s)return s;const o=ny(n);if(o===0)return n;const a=new Proxy(n,o===2?i:t);return r.set(n,a),a}function zs(n){return os(n)?zs(n.__v_raw):!!(n&&n.__v_isReactive)}function os(n){return!!(n&&n.__v_isReadonly)}function Sl(n){return!!(n&&n.__v_isShallow)}function U_(n){return zs(n)||os(n)}function Je(n){const e=n&&n.__v_raw;return e?Je(e):n}function N_(n){return xl(n,"__v_skip",!0),n}const jo=n=>ct(n)?Ii(n):n,Zf=n=>ct(n)?I_(n):n;class O_{constructor(e,t,i,r){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new jf(()=>e(this._value),()=>Nu(this,1)),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=i}get value(){const e=Je(this);return(!e._cacheable||e.effect.dirty)&&vr(e._value,e._value=e.effect.run())&&Nu(e,2),F_(e),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function iy(n,e,t=!1){let i,r;const s=Fe(n);return s?(i=n,r=Gn):(i=n.get,r=n.set),new O_(i,r,s||!r,t)}function F_(n){fr&&Xr&&(n=Je(n),b_(Xr,n.dep||(n.dep=w_(()=>n.dep=void 0,n instanceof O_?n:void 0))))}function Nu(n,e=2,t){n=Je(n);const i=n.dep;i&&T_(i,e)}function Gt(n){return!!(n&&n.__v_isRef===!0)}function At(n){return k_(n,!1)}function Xo(n){return k_(n,!0)}function k_(n,e){return Gt(n)?n:new ry(n,e)}class ry{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:Je(e),this._value=t?e:jo(e)}get value(){return F_(this),this._value}set value(e){const t=this.__v_isShallow||Sl(e)||os(e);e=t?e:Je(e),vr(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:jo(e),Nu(this,2))}}function ht(n){return Gt(n)?n.value:n}const sy={get:(n,e,t)=>ht(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return Gt(r)&&!Gt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function B_(n){return zs(n)?n:new Proxy(n,sy)}class oy{constructor(e,t,i){this._object=e,this._key=t,this._defaultValue=i,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return kx(Je(this._object),this._key)}}class ay{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function z_(n,e,t){return Gt(n)?n:Fe(n)?new ay(n):ct(n)&&arguments.length>1?ly(n,e,t):At(n)}function ly(n,e,t){const i=n[e];return Gt(i)?i:new oy(n,e,t)}/**
* @vue/runtime-core v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function hr(n,e,t,i){let r;try{r=i?n(...i):n()}catch(s){da(s,e,t)}return r}function Xn(n,e,t,i){if(Fe(n)){const s=hr(n,e,t,i);return s&&p_(s)&&s.catch(o=>{da(o,e,t)}),s}const r=[];for(let s=0;s<n.length;s++)r.push(Xn(n[s],e,t,i));return r}function da(n,e,t,i=!0){const r=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=`https://vuejs.org/errors/#runtime-${t}`;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,o,a)===!1)return}s=s.parent}const l=e.appContext.config.errorHandler;if(l){hr(l,null,10,[n,o,a]);return}}cy(n,t,r,i)}function cy(n,e,t,i=!0){console.error(n)}let qo=!1,Ou=!1;const qt=[];let ui=0;const Hs=[];let Qi=null,Gr=0;const H_=Promise.resolve();let Jf=null;function Er(n){const e=Jf||H_;return n?e.then(this?n.bind(this):n):e}function uy(n){let e=ui+1,t=qt.length;for(;e<t;){const i=e+t>>>1,r=qt[i],s=$o(r);s<n||s===n&&r.pre?e=i+1:t=i}return e}function Qf(n){(!qt.length||!qt.includes(n,qo&&n.allowRecurse?ui+1:ui))&&(n.id==null?qt.push(n):qt.splice(uy(n.id),0,n),G_())}function G_(){!qo&&!Ou&&(Ou=!0,Jf=H_.then(V_))}function fy(n){const e=qt.indexOf(n);e>ui&&qt.splice(e,1)}function Fu(n){Le(n)?Hs.push(...n):(!Qi||!Qi.includes(n,n.allowRecurse?Gr+1:Gr))&&Hs.push(n),G_()}function ld(n,e,t=qo?ui+1:0){for(;t<qt.length;t++){const i=qt[t];if(i&&i.pre){if(n&&i.id!==n.uid)continue;qt.splice(t,1),t--,i()}}}function Ml(n){if(Hs.length){const e=[...new Set(Hs)].sort((t,i)=>$o(t)-$o(i));if(Hs.length=0,Qi){Qi.push(...e);return}for(Qi=e,Gr=0;Gr<Qi.length;Gr++)Qi[Gr]();Qi=null,Gr=0}}const $o=n=>n.id==null?1/0:n.id,hy=(n,e)=>{const t=$o(n)-$o(e);if(t===0){if(n.pre&&!e.pre)return-1;if(e.pre&&!n.pre)return 1}return t};function V_(n){Ou=!1,qo=!0,qt.sort(hy);try{for(ui=0;ui<qt.length;ui++){const e=qt[ui];e&&e.active!==!1&&hr(e,null,14)}}finally{ui=0,qt.length=0,Ml(),qo=!1,Jf=null,(qt.length||Hs.length)&&V_()}}function dy(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||pt;let r=t;const s=e.startsWith("update:"),o=s&&e.slice(7);if(o&&o in i){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:h}=i[u]||pt;h&&(r=t.map(d=>vt(d)?d.trim():d)),f&&(r=t.map(Ax))}let a,l=i[a=wc(e)]||i[a=wc(gi(e))];!l&&s&&(l=i[a=wc(uo(e))]),l&&Xn(l,n,6,r);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Xn(c,n,6,r)}}function W_(n,e,t=!1){const i=e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!Fe(n)){const l=c=>{const u=W_(c,e,!0);u&&(a=!0,Ct(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(ct(n)&&i.set(n,null),null):(Le(s)?s.forEach(l=>o[l]=null):Ct(o,s),ct(n)&&i.set(n,o),o)}function Jl(n,e){return!n||!ua(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ye(n,e[0].toLowerCase()+e.slice(1))||Ye(n,uo(e))||Ye(n,e))}let Bt=null,Ql=null;function El(n){const e=Bt;return Bt=n,Ql=n&&n.type.__scopeId||null,e}function j_(n){Ql=n}function X_(){Ql=null}function pa(n,e=Bt,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&Ed(-1);const s=El(e);let o;try{o=n(...r)}finally{El(s),i._d&&Ed(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Cc(n){const{type:e,vnode:t,proxy:i,withProxy:r,props:s,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=n;let m,p;const x=El(n);try{if(t.shapeFlag&4){const S=r||i,b=S;m=kn(u.call(b,S,f,s,d,h,g)),p=l}else{const S=e;m=kn(S.length>1?S(s,{attrs:l,slots:a,emit:c}):S(s,null)),p=e.props?l:my(l)}}catch(S){No.length=0,da(S,n,1),m=qe(an)}let v=m;if(p&&_!==!1){const S=Object.keys(p),{shapeFlag:b}=v;S.length&&b&7&&(o&&S.some(Hf)&&(p=_y(p,o)),v=Ui(v,p))}return t.dirs&&(v=Ui(v),v.dirs=v.dirs?v.dirs.concat(t.dirs):t.dirs),t.transition&&(v.transition=t.transition),m=v,El(x),m}function py(n,e=!0){let t;for(let i=0;i<n.length;i++){const r=n[i];if(Zs(r)){if(r.type!==an||r.children==="v-if"){if(t)return;t=r}}else return}return t}const my=n=>{let e;for(const t in n)(t==="class"||t==="style"||ua(t))&&((e||(e={}))[t]=n[t]);return e},_y=(n,e)=>{const t={};for(const i in n)(!Hf(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function gy(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?cd(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==i[h]&&!Jl(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?cd(i,o,c):!0:!!o;return!1}function cd(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!Jl(t,s))return!0}return!1}function eh({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const th="components";function vy(n,e){return $_(th,n,!0,e)||n}const q_=Symbol.for("v-ndc");function xy(n){return vt(n)?$_(th,n,!1)||n:n||q_}function $_(n,e,t=!0,i=!1){const r=Bt||Nt;if(r){const s=r.type;if(n===th){const a=qu(s,!1);if(a&&(a===e||a===gi(e)||a===Kl(gi(e))))return s}const o=ud(r[n]||s[n],e)||ud(r.appContext[n],e);return!o&&i?s:o}}function ud(n,e){return n&&(n[e]||n[gi(e)]||n[Kl(gi(e))])}const Y_=n=>n.__isSuspense;let ku=0;const yy={name:"Suspense",__isSuspense:!0,process(n,e,t,i,r,s,o,a,l,c){if(n==null)Sy(e,t,i,r,s,o,a,l,c);else{if(s&&s.deps>0){e.suspense=n.suspense;return}My(n,e,t,i,r,o,a,l,c)}},hydrate:Ey,create:nh,normalize:by},K_=yy;function Yo(n,e){const t=n.props&&n.props[e];Fe(t)&&t()}function Sy(n,e,t,i,r,s,o,a,l){const{p:c,o:{createElement:u}}=l,f=u("div"),h=n.suspense=nh(n,r,i,e,f,t,s,o,a,l);c(null,h.pendingBranch=n.ssContent,f,null,i,h,s,o),h.deps>0?(Yo(n,"onPending"),Yo(n,"onFallback"),c(null,n.ssFallback,e,t,i,null,s,o),Gs(h,n.ssFallback)):h.resolve(!1,!0)}function My(n,e,t,i,r,s,o,a,{p:l,um:c,o:{createElement:u}}){const f=e.suspense=n.suspense;f.vnode=e,e.el=n.el;const h=e.ssContent,d=e.ssFallback,{activeBranch:g,pendingBranch:_,isInFallback:m,isHydrating:p}=f;if(_)f.pendingBranch=h,ti(h,_)?(l(_,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0?f.resolve():m&&(p||(l(g,d,t,i,r,null,s,o,a),Gs(f,d)))):(f.pendingId=ku++,p?(f.isHydrating=!1,f.activeBranch=_):c(_,r,f),f.deps=0,f.effects.length=0,f.hiddenContainer=u("div"),m?(l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0?f.resolve():(l(g,d,t,i,r,null,s,o,a),Gs(f,d))):g&&ti(h,g)?(l(g,h,t,i,r,f,s,o,a),f.resolve(!0)):(l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0&&f.resolve()));else if(g&&ti(h,g))l(g,h,t,i,r,f,s,o,a),Gs(f,h);else if(Yo(e,"onPending"),f.pendingBranch=h,h.shapeFlag&512?f.pendingId=h.component.suspenseId:f.pendingId=ku++,l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0)f.resolve();else{const{timeout:x,pendingId:v}=f;x>0?setTimeout(()=>{f.pendingId===v&&f.fallback(d)},x):x===0&&f.fallback(d)}}function nh(n,e,t,i,r,s,o,a,l,c,u=!1){const{p:f,m:h,um:d,n:g,o:{parentNode:_,remove:m}}=c;let p;const x=Ty(n);x&&e!=null&&e.pendingBranch&&(p=e.pendingId,e.deps++);const v=n.props?g_(n.props.timeout):void 0,S=s,b={vnode:n,parent:e,parentComponent:t,namespace:o,container:i,hiddenContainer:r,deps:0,pendingId:ku++,timeout:typeof v=="number"?v:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(E=!1,T=!1){const{vnode:L,activeBranch:y,pendingBranch:w,pendingId:N,effects:U,parentComponent:$,container:D}=b;let k=!1;b.isHydrating?b.isHydrating=!1:E||(k=y&&w.transition&&w.transition.mode==="out-in",k&&(y.transition.afterLeave=()=>{N===b.pendingId&&(h(w,D,s===S?g(y):s,0),Fu(U))}),y&&(_(y.el)!==b.hiddenContainer&&(s=g(y)),d(y,$,b,!0)),k||h(w,D,s,0)),Gs(b,w),b.pendingBranch=null,b.isInFallback=!1;let O=b.parent,V=!1;for(;O;){if(O.pendingBranch){O.effects.push(...U),V=!0;break}O=O.parent}!V&&!k&&Fu(U),b.effects=[],x&&e&&e.pendingBranch&&p===e.pendingId&&(e.deps--,e.deps===0&&!T&&e.resolve()),Yo(L,"onResolve")},fallback(E){if(!b.pendingBranch)return;const{vnode:T,activeBranch:L,parentComponent:y,container:w,namespace:N}=b;Yo(T,"onFallback");const U=g(L),$=()=>{b.isInFallback&&(f(null,E,w,U,y,null,N,a,l),Gs(b,E))},D=E.transition&&E.transition.mode==="out-in";D&&(L.transition.afterLeave=$),b.isInFallback=!0,d(L,y,null,!0),D||$()},move(E,T,L){b.activeBranch&&h(b.activeBranch,E,T,L),b.container=E},next(){return b.activeBranch&&g(b.activeBranch)},registerDep(E,T){const L=!!b.pendingBranch;L&&b.deps++;const y=E.vnode.el;E.asyncDep.catch(w=>{da(w,E,0)}).then(w=>{if(E.isUnmounted||b.isUnmounted||b.pendingId!==E.suspenseId)return;E.asyncResolved=!0;const{vnode:N}=E;Xu(E,w,!1),y&&(N.el=y);const U=!y&&E.subTree.el;T(E,N,_(y||E.subTree.el),y?null:g(E.subTree),b,o,l),U&&m(U),eh(E,N.el),L&&--b.deps===0&&b.resolve()})},unmount(E,T){b.isUnmounted=!0,b.activeBranch&&d(b.activeBranch,t,E,T),b.pendingBranch&&d(b.pendingBranch,t,E,T)}};return b}function Ey(n,e,t,i,r,s,o,a,l){const c=e.suspense=nh(e,i,t,n.parentNode,document.createElement("div"),null,r,s,o,a,!0),u=l(n,c.pendingBranch=e.ssContent,t,c,s,o);return c.deps===0&&c.resolve(!1,!0),u}function by(n){const{shapeFlag:e,children:t}=n,i=e&32;n.ssContent=fd(i?t.default:t),n.ssFallback=i?fd(t.fallback):qe(an)}function fd(n){let e;if(Fe(n)){const t=Ks&&n._c;t&&(n._d=!1,Ke()),n=n(),t&&(n._d=!0,e=Vn,vg())}return Le(n)&&(n=py(n)),n=kn(n),e&&!n.dynamicChildren&&(n.dynamicChildren=e.filter(t=>t!==n)),n}function Z_(n,e){e&&e.pendingBranch?Le(n)?e.effects.push(...n):e.effects.push(n):Fu(n)}function Gs(n,e){n.activeBranch=e;const{vnode:t,parentComponent:i}=n;let r=e.el;for(;!r&&e.component;)e=e.component.subTree,r=e.el;t.el=r,i&&i.subTree===t&&(i.vnode.el=r,eh(i,r))}function Ty(n){var e;return((e=n.props)==null?void 0:e.suspensible)!=null&&n.props.suspensible!==!1}const wy=Symbol.for("v-scx"),Ay=()=>on(wy);function Cy(n,e){return ih(n,null,e)}const Pa={};function $r(n,e,t){return ih(n,e,t)}function ih(n,e,{immediate:t,deep:i,flush:r,once:s,onTrack:o,onTrigger:a}=pt){if(e&&s){const E=e;e=(...T)=>{E(...T),b()}}const l=Nt,c=E=>i===!0?E:Ds(E,i===!1?1:void 0);let u,f=!1,h=!1;if(Gt(n)?(u=()=>n.value,f=Sl(n)):zs(n)?(u=()=>c(n),f=!0):Le(n)?(h=!0,f=n.some(E=>zs(E)||Sl(E)),u=()=>n.map(E=>{if(Gt(E))return E.value;if(zs(E))return c(E);if(Fe(E))return hr(E,l,2)})):Fe(n)?e?u=()=>hr(n,l,2):u=()=>(d&&d(),Xn(n,l,3,[g])):u=Gn,e&&i){const E=u;u=()=>Ds(E())}let d,g=E=>{d=v.onStop=()=>{hr(E,l,4),d=v.onStop=void 0}},_;if(rc)if(g=Gn,e?t&&Xn(e,l,3,[u(),h?[]:void 0,g]):u(),r==="sync"){const E=Ay();_=E.__watcherHandles||(E.__watcherHandles=[])}else return Gn;let m=h?new Array(n.length).fill(Pa):Pa;const p=()=>{if(!(!v.active||!v.dirty))if(e){const E=v.run();(i||f||(h?E.some((T,L)=>vr(T,m[L])):vr(E,m)))&&(d&&d(),Xn(e,l,3,[E,m===Pa?void 0:h&&m[0]===Pa?[]:m,g]),m=E)}else v.run()};p.allowRecurse=!!e;let x;r==="sync"?x=p:r==="post"?x=()=>Ft(p,l&&l.suspense):(p.pre=!0,l&&(p.id=l.uid),x=()=>Qf(p));const v=new jf(u,Gn,x),S=Ox(),b=()=>{v.stop(),S&&Gf(S.effects,v)};return e?t?p():m=v.run():r==="post"?Ft(v.run.bind(v),l&&l.suspense):v.run(),_&&_.push(b),b}function Ry(n,e,t){const i=this.proxy,r=vt(n)?n.includes(".")?J_(i,n):()=>i[n]:n.bind(i,i);let s;Fe(e)?s=e:(s=e.handler,t=e);const o=_a(this),a=ih(r,s.bind(i),t);return o(),a}function J_(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}function Ds(n,e,t=0,i){if(!ct(n)||n.__v_skip)return n;if(e&&e>0){if(t>=e)return n;t++}if(i=i||new Set,i.has(n))return n;if(i.add(n),Gt(n))Ds(n.value,e,t,i);else if(Le(n))for(let r=0;r<n.length;r++)Ds(n[r],e,t,i);else if(d_(n)||Bs(n))n.forEach(r=>{Ds(r,e,t,i)});else if(__(n))for(const r in n)Ds(n[r],e,t,i);return n}function li(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(us(),Xn(l,t,8,[n.el,a,n,e]),fs())}}const er=Symbol("_leaveCb"),La=Symbol("_enterCb");function Py(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Hi(()=>{n.isMounted=!0}),ma(()=>{n.isUnmounting=!0}),n}const In=[Function,Array],Q_={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:In,onEnter:In,onAfterEnter:In,onEnterCancelled:In,onBeforeLeave:In,onLeave:In,onAfterLeave:In,onLeaveCancelled:In,onBeforeAppear:In,onAppear:In,onAfterAppear:In,onAppearCancelled:In},Ly={name:"BaseTransition",props:Q_,setup(n,{slots:e}){const t=ic(),i=Py();let r;return()=>{const s=e.default&&tg(e.default(),!0);if(!s||!s.length)return;let o=s[0];if(s.length>1){for(const _ of s)if(_.type!==an){o=_;break}}const a=Je(n),{mode:l}=a;if(i.isLeaving)return Rc(o);const c=hd(o);if(!c)return Rc(o);const u=Bu(c,a,i,t);bl(c,u);const f=t.subTree,h=f&&hd(f);let d=!1;const{getTransitionKey:g}=c.type;if(g){const _=g();r===void 0?r=_:_!==r&&(r=_,d=!0)}if(h&&h.type!==an&&(!ti(c,h)||d)){const _=Bu(h,a,i,t);if(bl(h,_),l==="out-in")return i.isLeaving=!0,_.afterLeave=()=>{i.isLeaving=!1,t.update.active!==!1&&(t.effect.dirty=!0,t.update())},Rc(o);l==="in-out"&&c.type!==an&&(_.delayLeave=(m,p,x)=>{const v=eg(i,h);v[String(h.key)]=h,m[er]=()=>{p(),m[er]=void 0,delete u.delayedLeave},u.delayedLeave=x})}return o}}},Dy=Ly;function eg(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Bu(n,e,t,i){const{appear:r,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:f,onLeave:h,onAfterLeave:d,onLeaveCancelled:g,onBeforeAppear:_,onAppear:m,onAfterAppear:p,onAppearCancelled:x}=e,v=String(n.key),S=eg(t,n),b=(L,y)=>{L&&Xn(L,i,9,y)},E=(L,y)=>{const w=y[1];b(L,y),Le(L)?L.every(N=>N.length<=1)&&w():L.length<=1&&w()},T={mode:s,persisted:o,beforeEnter(L){let y=a;if(!t.isMounted)if(r)y=_||a;else return;L[er]&&L[er](!0);const w=S[v];w&&ti(n,w)&&w.el[er]&&w.el[er](),b(y,[L])},enter(L){let y=l,w=c,N=u;if(!t.isMounted)if(r)y=m||l,w=p||c,N=x||u;else return;let U=!1;const $=L[La]=D=>{U||(U=!0,D?b(N,[L]):b(w,[L]),T.delayedLeave&&T.delayedLeave(),L[La]=void 0)};y?E(y,[L,$]):$()},leave(L,y){const w=String(n.key);if(L[La]&&L[La](!0),t.isUnmounting)return y();b(f,[L]);let N=!1;const U=L[er]=$=>{N||(N=!0,y(),$?b(g,[L]):b(d,[L]),L[er]=void 0,S[w]===n&&delete S[w])};S[w]=n,h?E(h,[L,U]):U()},clone(L){return Bu(L,e,t,i)}};return T}function Rc(n){if(ec(n))return n=Ui(n),n.children=null,n}function hd(n){return ec(n)?n.children?n.children[0]:void 0:n}function bl(n,e){n.shapeFlag&6&&n.component?bl(n.component.subTree,e):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function tg(n,e=!1,t){let i=[],r=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===Xt?(o.patchFlag&128&&r++,i=i.concat(tg(o.children,e,a))):(e||o.type!==an)&&i.push(a!=null?Ui(o,{key:a}):o)}if(r>1)for(let s=0;s<i.length;s++)i[s].patchFlag=-2;return i}/*! #__NO_SIDE_EFFECTS__ */function fo(n,e){return Fe(n)?Ct({name:n.name},e,{setup:n}):n}const Yr=n=>!!n.type.__asyncLoader,ec=n=>n.type.__isKeepAlive,Iy={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(n,{slots:e}){const t=ic(),i=t.ctx;if(!i.renderer)return()=>{const x=e.default&&e.default();return x&&x.length===1?x[0]:x};const r=new Map,s=new Set;let o=null;const a=t.suspense,{renderer:{p:l,m:c,um:u,o:{createElement:f}}}=i,h=f("div");i.activate=(x,v,S,b,E)=>{const T=x.component;c(x,v,S,0,a),l(T.vnode,x,v,S,T,a,b,x.slotScopeIds,E),Ft(()=>{T.isDeactivated=!1,T.a&&Lo(T.a);const L=x.props&&x.props.onVnodeMounted;L&&un(L,T.parent,x)},a)},i.deactivate=x=>{const v=x.component;c(x,h,null,1,a),Ft(()=>{v.da&&Lo(v.da);const S=x.props&&x.props.onVnodeUnmounted;S&&un(S,v.parent,x),v.isDeactivated=!0},a)};function d(x){Pc(x),u(x,t,a,!0)}function g(x){r.forEach((v,S)=>{const b=qu(v.type);b&&(!x||!x(b))&&_(S)})}function _(x){const v=r.get(x);!o||!ti(v,o)?d(v):o&&Pc(o),r.delete(x),s.delete(x)}$r(()=>[n.include,n.exclude],([x,v])=>{x&&g(S=>wo(x,S)),v&&g(S=>!wo(v,S))},{flush:"post",deep:!0});let m=null;const p=()=>{m!=null&&r.set(m,Lc(t.subTree))};return Hi(p),ig(p),ma(()=>{r.forEach(x=>{const{subTree:v,suspense:S}=t,b=Lc(v);if(x.type===b.type&&x.key===b.key){Pc(b);const E=b.component.da;E&&Ft(E,S);return}d(x)})}),()=>{if(m=null,!e.default)return null;const x=e.default(),v=x[0];if(x.length>1)return o=null,x;if(!Zs(v)||!(v.shapeFlag&4)&&!(v.shapeFlag&128))return o=null,v;let S=Lc(v);const b=S.type,E=qu(Yr(S)?S.type.__asyncResolved||{}:b),{include:T,exclude:L,max:y}=n;if(T&&(!E||!wo(T,E))||L&&E&&wo(L,E))return o=S,v;const w=S.key==null?b:S.key,N=r.get(w);return S.el&&(S=Ui(S),v.shapeFlag&128&&(v.ssContent=S)),m=w,N?(S.el=N.el,S.component=N.component,S.transition&&bl(S,S.transition),S.shapeFlag|=512,s.delete(w),s.add(w)):(s.add(w),y&&s.size>parseInt(y,10)&&_(s.values().next().value)),S.shapeFlag|=256,o=S,Y_(v.type)?v:S}}},Uy=Iy;function wo(n,e){return Le(n)?n.some(t=>wo(t,e)):vt(n)?n.split(",").includes(e):Ex(n)?n.test(e):!1}function rh(n,e){ng(n,"a",e)}function sh(n,e){ng(n,"da",e)}function ng(n,e,t=Nt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(tc(e,i,t),t){let r=t.parent;for(;r&&r.parent;)ec(r.parent.vnode)&&Ny(i,e,t,r),r=r.parent}}function Ny(n,e,t,i){const r=tc(e,n,i,!0);oh(()=>{Gf(i[e],r)},t)}function Pc(n){n.shapeFlag&=-257,n.shapeFlag&=-513}function Lc(n){return n.shapeFlag&128?n.ssContent:n}function tc(n,e,t=Nt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{if(t.isUnmounted)return;us();const a=_a(t),l=Xn(e,t,n,o);return a(),fs(),l});return i?r.unshift(s):r.push(s),s}}const zi=n=>(e,t=Nt)=>(!rc||n==="sp")&&tc(n,(...i)=>e(...i),t),Oy=zi("bm"),Hi=zi("m"),Fy=zi("bu"),ig=zi("u"),ma=zi("bum"),oh=zi("um"),ky=zi("sp"),By=zi("rtg"),zy=zi("rtc");function rg(n,e=Nt){tc("ec",n,e)}function Hy(n,e,t,i){let r;const s=t&&t[i];if(Le(n)||vt(n)){r=new Array(n.length);for(let o=0,a=n.length;o<a;o++)r[o]=e(n[o],o,void 0,s&&s[o])}else if(typeof n=="number"){r=new Array(n);for(let o=0;o<n;o++)r[o]=e(o+1,o,void 0,s&&s[o])}else if(ct(n))if(n[Symbol.iterator])r=Array.from(n,(o,a)=>e(o,a,void 0,s&&s[a]));else{const o=Object.keys(n);r=new Array(o.length);for(let a=0,l=o.length;a<l;a++){const c=o[a];r[a]=e(n[c],c,a,s&&s[a])}}else r=[];return t&&(t[i]=r),r}function YI(n,e,t={},i,r){if(Bt.isCE||Bt.parent&&Yr(Bt.parent)&&Bt.parent.isCE)return e!=="default"&&(t.name=e),qe("slot",t,i&&i());let s=n[e];s&&s._c&&(s._d=!1),Ke();const o=s&&sg(s(t)),a=rr(Xt,{key:t.key||o&&o.key||`_${e}`},o||(i?i():[]),o&&n._===1?64:-2);return!r&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),s&&s._c&&(s._d=!0),a}function sg(n){return n.some(e=>Zs(e)?!(e.type===an||e.type===Xt&&!sg(e.children)):!0)?n:null}const zu=n=>n?Mg(n)?fh(n)||n.proxy:zu(n.parent):null,Do=Ct(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>zu(n.parent),$root:n=>zu(n.root),$emit:n=>n.emit,$options:n=>ah(n),$forceUpdate:n=>n.f||(n.f=()=>{n.effect.dirty=!0,Qf(n.update)}),$nextTick:n=>n.n||(n.n=Er.bind(n.proxy)),$watch:n=>Ry.bind(n)}),Dc=(n,e)=>n!==pt&&!n.__isScriptSetup&&Ye(n,e),Gy={get({_:n},e){const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Dc(i,e))return o[e]=1,i[e];if(r!==pt&&Ye(r,e))return o[e]=2,r[e];if((c=n.propsOptions[0])&&Ye(c,e))return o[e]=3,s[e];if(t!==pt&&Ye(t,e))return o[e]=4,t[e];Hu&&(o[e]=0)}}const u=Do[e];let f,h;if(u)return e==="$attrs"&&xn(n,"get",e),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==pt&&Ye(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,Ye(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return Dc(r,e)?(r[e]=t,!0):i!==pt&&Ye(i,e)?(i[e]=t,!0):Ye(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s}},o){let a;return!!t[o]||n!==pt&&Ye(n,o)||Dc(e,o)||(a=s[0])&&Ye(a,o)||Ye(i,o)||Ye(Do,o)||Ye(r.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ye(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function dd(n){return Le(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Hu=!0;function Vy(n){const e=ah(n),t=n.proxy,i=n.ctx;Hu=!1,e.beforeCreate&&pd(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:x,destroyed:v,unmounted:S,render:b,renderTracked:E,renderTriggered:T,errorCaptured:L,serverPrefetch:y,expose:w,inheritAttrs:N,components:U,directives:$,filters:D}=e;if(c&&Wy(c,i,null),o)for(const V in o){const H=o[V];Fe(H)&&(i[V]=H.bind(t))}if(r){const V=r.call(t,t);ct(V)&&(n.data=Ii(V))}if(Hu=!0,s)for(const V in s){const H=s[V],ne=Fe(H)?H.bind(t,t):Fe(H.get)?H.get.bind(t,t):Gn,ue=!Fe(H)&&Fe(H.set)?H.set.bind(t):Gn,le=St({get:ne,set:ue});Object.defineProperty(i,V,{enumerable:!0,configurable:!0,get:()=>le.value,set:pe=>le.value=pe})}if(a)for(const V in a)og(a[V],i,t,V);if(l){const V=Fe(l)?l.call(t):l;Reflect.ownKeys(V).forEach(H=>{Vs(H,V[H])})}u&&pd(u,n,"c");function O(V,H){Le(H)?H.forEach(ne=>V(ne.bind(t))):H&&V(H.bind(t))}if(O(Oy,f),O(Hi,h),O(Fy,d),O(ig,g),O(rh,_),O(sh,m),O(rg,L),O(zy,E),O(By,T),O(ma,x),O(oh,S),O(ky,y),Le(w))if(w.length){const V=n.exposed||(n.exposed={});w.forEach(H=>{Object.defineProperty(V,H,{get:()=>t[H],set:ne=>t[H]=ne})})}else n.exposed||(n.exposed={});b&&n.render===Gn&&(n.render=b),N!=null&&(n.inheritAttrs=N),U&&(n.components=U),$&&(n.directives=$)}function Wy(n,e,t=Gn){Le(n)&&(n=Gu(n));for(const i in n){const r=n[i];let s;ct(r)?"default"in r?s=on(r.from||i,r.default,!0):s=on(r.from||i):s=on(r),Gt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function pd(n,e,t){Xn(Le(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function og(n,e,t,i){const r=i.includes(".")?J_(t,i):()=>t[i];if(vt(n)){const s=e[n];Fe(s)&&$r(r,s)}else if(Fe(n))$r(r,n.bind(t));else if(ct(n))if(Le(n))n.forEach(s=>og(s,e,t,i));else{const s=Fe(n.handler)?n.handler.bind(t):e[n.handler];Fe(s)&&$r(r,s,n)}}function ah(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>Tl(l,c,o,!0)),Tl(l,e,o)),ct(e)&&s.set(e,l),l}function Tl(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&Tl(n,s,t,!0),r&&r.forEach(o=>Tl(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=jy[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const jy={data:md,props:_d,emits:_d,methods:Ao,computed:Ao,beforeCreate:en,created:en,beforeMount:en,mounted:en,beforeUpdate:en,updated:en,beforeDestroy:en,beforeUnmount:en,destroyed:en,unmounted:en,activated:en,deactivated:en,errorCaptured:en,serverPrefetch:en,components:Ao,directives:Ao,watch:qy,provide:md,inject:Xy};function md(n,e){return e?n?function(){return Ct(Fe(n)?n.call(this,this):n,Fe(e)?e.call(this,this):e)}:e:n}function Xy(n,e){return Ao(Gu(n),Gu(e))}function Gu(n){if(Le(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function en(n,e){return n?[...new Set([].concat(n,e))]:e}function Ao(n,e){return n?Ct(Object.create(null),n,e):e}function _d(n,e){return n?Le(n)&&Le(e)?[...new Set([...n,...e])]:Ct(Object.create(null),dd(n),dd(e??{})):e}function qy(n,e){if(!n)return e;if(!e)return n;const t=Ct(Object.create(null),n);for(const i in e)t[i]=en(n[i],e[i]);return t}function ag(){return{app:null,config:{isNativeTag:Sx,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let $y=0;function Yy(n,e){return function(i,r=null){Fe(i)||(i=Ct({},i)),r!=null&&!ct(r)&&(r=null);const s=ag(),o=new WeakSet;let a=!1;const l=s.app={_uid:$y++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:bg,get config(){return s.config},set config(c){},use(c,...u){return o.has(c)||(c&&Fe(c.install)?(o.add(c),c.install(l,...u)):Fe(c)&&(o.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,f){if(!a){const h=qe(i,r);return h.appContext=s,f===!0?f="svg":f===!1&&(f=void 0),u&&e?e(h,c):n(h,c,f),a=!0,l._container=c,c.__vue_app__=l,fh(h.component)||h.component.proxy}},unmount(){a&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l},runWithContext(c){Ko=l;try{return c()}finally{Ko=null}}};return l}}let Ko=null;function Vs(n,e){if(Nt){let t=Nt.provides;const i=Nt.parent&&Nt.parent.provides;i===t&&(t=Nt.provides=Object.create(i)),t[n]=e}}function on(n,e,t=!1){const i=Nt||Bt;if(i||Ko){const r=i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:Ko._context.provides;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Fe(e)?e.call(i&&i.proxy):e}}function lg(){return!!(Nt||Bt||Ko)}function Ky(n,e,t,i=!1){const r={},s={};xl(s,nc,1),n.propsDefaults=Object.create(null),cg(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:ha(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function Zy(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=Je(r),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Jl(n.emitsOptions,h))continue;const d=e[h];if(l)if(Ye(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=gi(h);r[g]=Vu(l,a,g,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{cg(n,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!Ye(e,f)&&((u=uo(f))===f||!Ye(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Vu(l,a,f,void 0,n,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!Ye(e,f))&&(delete s[f],c=!0)}c&&Di(n,"set","$attrs")}function cg(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Po(l))continue;const c=e[l];let u;r&&Ye(r,u=gi(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Jl(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=Je(t),c=a||pt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Vu(r,l,f,c[f],n,!Ye(c,f))}}return o}function Vu(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=Ye(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Fe(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=_a(r);i=c[t]=l.call(null,e),u()}}else i=l}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===uo(t))&&(i=!0))}return i}function ug(n,e,t=!1){const i=e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!Fe(n)){const u=f=>{l=!0;const[h,d]=ug(f,e,!0);Ct(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return ct(n)&&i.set(n,ks),ks;if(Le(s))for(let u=0;u<s.length;u++){const f=gi(s[u]);gd(f)&&(o[f]=pt)}else if(s)for(const u in s){const f=gi(u);if(gd(f)){const h=s[u],d=o[f]=Le(h)||Fe(h)?{type:h}:Ct({},h);if(d){const g=yd(Boolean,d.type),_=yd(String,d.type);d[0]=g>-1,d[1]=_<0||g<_,(g>-1||Ye(d,"default"))&&a.push(f)}}}const c=[o,a];return ct(n)&&i.set(n,c),c}function gd(n){return n[0]!=="$"}function vd(n){const e=n&&n.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:n===null?"null":""}function xd(n,e){return vd(n)===vd(e)}function yd(n,e){return Le(e)?e.findIndex(t=>xd(t,n)):Fe(e)&&xd(e,n)?0:-1}const fg=n=>n[0]==="_"||n==="$stable",lh=n=>Le(n)?n.map(kn):[kn(n)],Jy=(n,e,t)=>{if(e._n)return e;const i=pa((...r)=>lh(e(...r)),t);return i._c=!1,i},hg=(n,e,t)=>{const i=n._ctx;for(const r in n){if(fg(r))continue;const s=n[r];if(Fe(s))e[r]=Jy(r,s,i);else if(s!=null){const o=lh(s);e[r]=()=>o}}},dg=(n,e)=>{const t=lh(e);n.slots.default=()=>t},Qy=(n,e)=>{if(n.vnode.shapeFlag&32){const t=e._;t?(n.slots=Je(e),xl(e,"_",t)):hg(e,n.slots={})}else n.slots={},e&&dg(n,e);xl(n.slots,nc,1)},eS=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=pt;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:(Ct(r,e),!t&&a===1&&delete r._):(s=!e.$stable,hg(e,r)),o=e}else e&&(dg(n,e),o={default:1});if(s)for(const a in r)!fg(a)&&o[a]==null&&delete r[a]};function wl(n,e,t,i,r=!1){if(Le(n)){n.forEach((h,d)=>wl(h,e&&(Le(e)?e[d]:e),t,i,r));return}if(Yr(i)&&!r)return;const s=i.shapeFlag&4?fh(i.component)||i.component.proxy:i.el,o=r?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===pt?a.refs={}:a.refs,f=a.setupState;if(c!=null&&c!==l&&(vt(c)?(u[c]=null,Ye(f,c)&&(f[c]=null)):Gt(c)&&(c.value=null)),Fe(l))hr(l,a,12,[o,u]);else{const h=vt(l),d=Gt(l);if(h||d){const g=()=>{if(n.f){const _=h?Ye(f,l)?f[l]:u[l]:l.value;r?Le(_)&&Gf(_,s):Le(_)?_.includes(s)||_.push(s):h?(u[l]=[s],Ye(f,l)&&(f[l]=u[l])):(l.value=[s],n.k&&(u[n.k]=l.value))}else h?(u[l]=o,Ye(f,l)&&(f[l]=o)):d&&(l.value=o,n.k&&(u[n.k]=o))};o?(g.id=-1,Ft(g,t)):g()}}}let Vi=!1;const tS=n=>n.namespaceURI.includes("svg")&&n.tagName!=="foreignObject",nS=n=>n.namespaceURI.includes("MathML"),Da=n=>{if(tS(n))return"svg";if(nS(n))return"mathml"},Ia=n=>n.nodeType===8;function iS(n){const{mt:e,p:t,o:{patchProp:i,createText:r,nextSibling:s,parentNode:o,remove:a,insert:l,createComment:c}}=n,u=(v,S)=>{if(!S.hasChildNodes()){t(null,v,S),Ml(),S._vnode=v;return}Vi=!1,f(S.firstChild,v,null,null,null),Ml(),S._vnode=v,Vi&&console.error("Hydration completed but contains mismatches.")},f=(v,S,b,E,T,L=!1)=>{const y=Ia(v)&&v.data==="[",w=()=>_(v,S,b,E,T,y),{type:N,ref:U,shapeFlag:$,patchFlag:D}=S;let k=v.nodeType;S.el=v,D===-2&&(L=!1,S.dynamicChildren=null);let O=null;switch(N){case Ys:k!==3?S.children===""?(l(S.el=r(""),o(v),v),O=v):O=w():(v.data!==S.children&&(Vi=!0,v.data=S.children),O=s(v));break;case an:x(v)?(O=s(v),p(S.el=v.content.firstChild,v,b)):k!==8||y?O=w():O=s(v);break;case Uo:if(y&&(v=s(v),k=v.nodeType),k===1||k===3){O=v;const V=!S.children.length;for(let H=0;H<S.staticCount;H++)V&&(S.children+=O.nodeType===1?O.outerHTML:O.data),H===S.staticCount-1&&(S.anchor=O),O=s(O);return y?s(O):O}else w();break;case Xt:y?O=g(v,S,b,E,T,L):O=w();break;default:if($&1)(k!==1||S.type.toLowerCase()!==v.tagName.toLowerCase())&&!x(v)?O=w():O=h(v,S,b,E,T,L);else if($&6){S.slotScopeIds=T;const V=o(v);if(y?O=m(v):Ia(v)&&v.data==="teleport start"?O=m(v,v.data,"teleport end"):O=s(v),e(S,V,null,b,E,Da(V),L),Yr(S)){let H;y?(H=qe(Xt),H.anchor=O?O.previousSibling:V.lastChild):H=v.nodeType===3?Sg(""):qe("div"),H.el=v,S.component.subTree=H}}else $&64?k!==8?O=w():O=S.type.hydrate(v,S,b,E,T,L,n,d):$&128&&(O=S.type.hydrate(v,S,b,E,Da(o(v)),T,L,n,f))}return U!=null&&wl(U,null,E,S),O},h=(v,S,b,E,T,L)=>{L=L||!!S.dynamicChildren;const{type:y,props:w,patchFlag:N,shapeFlag:U,dirs:$,transition:D}=S,k=y==="input"||y==="option";if(k||N!==-1){$&&li(S,null,b,"created");let O=!1;if(x(v)){O=mg(E,D)&&b&&b.vnode.props&&b.vnode.props.appear;const H=v.content.firstChild;O&&D.beforeEnter(H),p(H,v,b),S.el=v=H}if(U&16&&!(w&&(w.innerHTML||w.textContent))){let H=d(v.firstChild,S,v,b,E,T,L);for(;H;){Vi=!0;const ne=H;H=H.nextSibling,a(ne)}}else U&8&&v.textContent!==S.children&&(Vi=!0,v.textContent=S.children);if(w)if(k||!L||N&48)for(const H in w)(k&&(H.endsWith("value")||H==="indeterminate")||ua(H)&&!Po(H)||H[0]===".")&&i(v,H,null,w[H],void 0,void 0,b);else w.onClick&&i(v,"onClick",null,w.onClick,void 0,void 0,b);let V;(V=w&&w.onVnodeBeforeMount)&&un(V,b,S),$&&li(S,null,b,"beforeMount"),((V=w&&w.onVnodeMounted)||$||O)&&Z_(()=>{V&&un(V,b,S),O&&D.enter(v),$&&li(S,null,b,"mounted")},E)}return v.nextSibling},d=(v,S,b,E,T,L,y)=>{y=y||!!S.dynamicChildren;const w=S.children,N=w.length;for(let U=0;U<N;U++){const $=y?w[U]:w[U]=kn(w[U]);if(v)v=f(v,$,E,T,L,y);else{if($.type===Ys&&!$.children)continue;Vi=!0,t(null,$,b,null,E,T,Da(b),L)}}return v},g=(v,S,b,E,T,L)=>{const{slotScopeIds:y}=S;y&&(T=T?T.concat(y):y);const w=o(v),N=d(s(v),S,w,b,E,T,L);return N&&Ia(N)&&N.data==="]"?s(S.anchor=N):(Vi=!0,l(S.anchor=c("]"),w,N),N)},_=(v,S,b,E,T,L)=>{if(Vi=!0,S.el=null,L){const N=m(v);for(;;){const U=s(v);if(U&&U!==N)a(U);else break}}const y=s(v),w=o(v);return a(v),t(null,S,w,y,b,E,Da(w),T),y},m=(v,S="[",b="]")=>{let E=0;for(;v;)if(v=s(v),v&&Ia(v)&&(v.data===S&&E++,v.data===b)){if(E===0)return s(v);E--}return v},p=(v,S,b)=>{const E=S.parentNode;E&&E.replaceChild(v,S);let T=b;for(;T;)T.vnode.el===S&&(T.vnode.el=T.subTree.el=v),T=T.parent},x=v=>v.nodeType===1&&v.tagName.toLowerCase()==="template";return[u,f]}const Ft=Z_;function rS(n){return pg(n)}function sS(n){return pg(n,iS)}function pg(n,e){const t=v_();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=Gn,insertStaticContent:g}=n,_=(R,P,B,j=null,J=null,ie=null,A=void 0,M=null,I=!!P.dynamicChildren)=>{if(R===P)return;R&&!ti(R,P)&&(j=G(R),pe(R,J,ie,!0),R=null),P.patchFlag===-2&&(I=!1,P.dynamicChildren=null);const{type:z,ref:q,shapeFlag:K}=P;switch(z){case Ys:m(R,P,B,j);break;case an:p(R,P,B,j);break;case Uo:R==null&&x(P,B,j,A);break;case Xt:U(R,P,B,j,J,ie,A,M,I);break;default:K&1?b(R,P,B,j,J,ie,A,M,I):K&6?$(R,P,B,j,J,ie,A,M,I):(K&64||K&128)&&z.process(R,P,B,j,J,ie,A,M,I,re)}q!=null&&J&&wl(q,R&&R.ref,ie,P||R,!P)},m=(R,P,B,j)=>{if(R==null)i(P.el=a(P.children),B,j);else{const J=P.el=R.el;P.children!==R.children&&c(J,P.children)}},p=(R,P,B,j)=>{R==null?i(P.el=l(P.children||""),B,j):P.el=R.el},x=(R,P,B,j)=>{[R.el,R.anchor]=g(R.children,P,B,j,R.el,R.anchor)},v=({el:R,anchor:P},B,j)=>{let J;for(;R&&R!==P;)J=h(R),i(R,B,j),R=J;i(P,B,j)},S=({el:R,anchor:P})=>{let B;for(;R&&R!==P;)B=h(R),r(R),R=B;r(P)},b=(R,P,B,j,J,ie,A,M,I)=>{P.type==="svg"?A="svg":P.type==="math"&&(A="mathml"),R==null?E(P,B,j,J,ie,A,M,I):y(R,P,J,ie,A,M,I)},E=(R,P,B,j,J,ie,A,M)=>{let I,z;const{props:q,shapeFlag:K,transition:he,dirs:oe}=R;if(I=R.el=o(R.type,ie,q&&q.is,q),K&8?u(I,R.children):K&16&&L(R.children,I,null,j,J,Ic(R,ie),A,M),oe&&li(R,null,j,"created"),T(I,R,R.scopeId,A,j),q){for(const ve in q)ve!=="value"&&!Po(ve)&&s(I,ve,null,q[ve],ie,R.children,j,J,Se);"value"in q&&s(I,"value",null,q.value,ie),(z=q.onVnodeBeforeMount)&&un(z,j,R)}oe&&li(R,null,j,"beforeMount");const de=mg(J,he);de&&he.beforeEnter(I),i(I,P,B),((z=q&&q.onVnodeMounted)||de||oe)&&Ft(()=>{z&&un(z,j,R),de&&he.enter(I),oe&&li(R,null,j,"mounted")},J)},T=(R,P,B,j,J)=>{if(B&&d(R,B),j)for(let ie=0;ie<j.length;ie++)d(R,j[ie]);if(J){let ie=J.subTree;if(P===ie){const A=J.vnode;T(R,A,A.scopeId,A.slotScopeIds,J.parent)}}},L=(R,P,B,j,J,ie,A,M,I=0)=>{for(let z=I;z<R.length;z++){const q=R[z]=M?tr(R[z]):kn(R[z]);_(null,q,P,B,j,J,ie,A,M)}},y=(R,P,B,j,J,ie,A)=>{const M=P.el=R.el;let{patchFlag:I,dynamicChildren:z,dirs:q}=P;I|=R.patchFlag&16;const K=R.props||pt,he=P.props||pt;let oe;if(B&&Rr(B,!1),(oe=he.onVnodeBeforeUpdate)&&un(oe,B,P,R),q&&li(P,R,B,"beforeUpdate"),B&&Rr(B,!0),z?w(R.dynamicChildren,z,M,B,j,Ic(P,J),ie):A||H(R,P,M,null,B,j,Ic(P,J),ie,!1),I>0){if(I&16)N(M,P,K,he,B,j,J);else if(I&2&&K.class!==he.class&&s(M,"class",null,he.class,J),I&4&&s(M,"style",K.style,he.style,J),I&8){const de=P.dynamicProps;for(let ve=0;ve<de.length;ve++){const be=de[ve],ce=K[be],ze=he[be];(ze!==ce||be==="value")&&s(M,be,ce,ze,J,R.children,B,j,Se)}}I&1&&R.children!==P.children&&u(M,P.children)}else!A&&z==null&&N(M,P,K,he,B,j,J);((oe=he.onVnodeUpdated)||q)&&Ft(()=>{oe&&un(oe,B,P,R),q&&li(P,R,B,"updated")},j)},w=(R,P,B,j,J,ie,A)=>{for(let M=0;M<P.length;M++){const I=R[M],z=P[M],q=I.el&&(I.type===Xt||!ti(I,z)||I.shapeFlag&70)?f(I.el):B;_(I,z,q,null,j,J,ie,A,!0)}},N=(R,P,B,j,J,ie,A)=>{if(B!==j){if(B!==pt)for(const M in B)!Po(M)&&!(M in j)&&s(R,M,B[M],null,A,P.children,J,ie,Se);for(const M in j){if(Po(M))continue;const I=j[M],z=B[M];I!==z&&M!=="value"&&s(R,M,z,I,A,P.children,J,ie,Se)}"value"in j&&s(R,"value",B.value,j.value,A)}},U=(R,P,B,j,J,ie,A,M,I)=>{const z=P.el=R?R.el:a(""),q=P.anchor=R?R.anchor:a("");let{patchFlag:K,dynamicChildren:he,slotScopeIds:oe}=P;oe&&(M=M?M.concat(oe):oe),R==null?(i(z,B,j),i(q,B,j),L(P.children||[],B,q,J,ie,A,M,I)):K>0&&K&64&&he&&R.dynamicChildren?(w(R.dynamicChildren,he,B,J,ie,A,M),(P.key!=null||J&&P===J.subTree)&&ch(R,P,!0)):H(R,P,B,q,J,ie,A,M,I)},$=(R,P,B,j,J,ie,A,M,I)=>{P.slotScopeIds=M,R==null?P.shapeFlag&512?J.ctx.activate(P,B,j,A,I):D(P,B,j,J,ie,A,I):k(R,P,I)},D=(R,P,B,j,J,ie,A)=>{const M=R.component=mS(R,j,J);if(ec(R)&&(M.ctx.renderer=re),_S(M),M.asyncDep){if(J&&J.registerDep(M,O),!R.el){const I=M.subTree=qe(an);p(null,I,P,B)}}else O(M,R,P,B,J,ie,A)},k=(R,P,B)=>{const j=P.component=R.component;if(gy(R,P,B))if(j.asyncDep&&!j.asyncResolved){V(j,P,B);return}else j.next=P,fy(j.update),j.effect.dirty=!0,j.update();else P.el=R.el,j.vnode=P},O=(R,P,B,j,J,ie,A)=>{const M=()=>{if(R.isMounted){let{next:q,bu:K,u:he,parent:oe,vnode:de}=R;{const Oe=_g(R);if(Oe){q&&(q.el=de.el,V(R,q,A)),Oe.asyncDep.then(()=>{R.isUnmounted||M()});return}}let ve=q,be;Rr(R,!1),q?(q.el=de.el,V(R,q,A)):q=de,K&&Lo(K),(be=q.props&&q.props.onVnodeBeforeUpdate)&&un(be,oe,q,de),Rr(R,!0);const ce=Cc(R),ze=R.subTree;R.subTree=ce,_(ze,ce,f(ze.el),G(ze),R,J,ie),q.el=ce.el,ve===null&&eh(R,ce.el),he&&Ft(he,J),(be=q.props&&q.props.onVnodeUpdated)&&Ft(()=>un(be,oe,q,de),J)}else{let q;const{el:K,props:he}=P,{bm:oe,m:de,parent:ve}=R,be=Yr(P);if(Rr(R,!1),oe&&Lo(oe),!be&&(q=he&&he.onVnodeBeforeMount)&&un(q,ve,P),Rr(R,!0),K&&W){const ce=()=>{R.subTree=Cc(R),W(K,R.subTree,R,J,null)};be?P.type.__asyncLoader().then(()=>!R.isUnmounted&&ce()):ce()}else{const ce=R.subTree=Cc(R);_(null,ce,B,j,R,J,ie),P.el=ce.el}if(de&&Ft(de,J),!be&&(q=he&&he.onVnodeMounted)){const ce=P;Ft(()=>un(q,ve,ce),J)}(P.shapeFlag&256||ve&&Yr(ve.vnode)&&ve.vnode.shapeFlag&256)&&R.a&&Ft(R.a,J),R.isMounted=!0,P=B=j=null}},I=R.effect=new jf(M,Gn,()=>Qf(z),R.scope),z=R.update=()=>{I.dirty&&I.run()};z.id=R.uid,Rr(R,!0),z()},V=(R,P,B)=>{P.component=R;const j=R.vnode.props;R.vnode=P,R.next=null,Zy(R,P.props,j,B),eS(R,P.children,B),us(),ld(R),fs()},H=(R,P,B,j,J,ie,A,M,I=!1)=>{const z=R&&R.children,q=R?R.shapeFlag:0,K=P.children,{patchFlag:he,shapeFlag:oe}=P;if(he>0){if(he&128){ue(z,K,B,j,J,ie,A,M,I);return}else if(he&256){ne(z,K,B,j,J,ie,A,M,I);return}}oe&8?(q&16&&Se(z,J,ie),K!==z&&u(B,K)):q&16?oe&16?ue(z,K,B,j,J,ie,A,M,I):Se(z,J,ie,!0):(q&8&&u(B,""),oe&16&&L(K,B,j,J,ie,A,M,I))},ne=(R,P,B,j,J,ie,A,M,I)=>{R=R||ks,P=P||ks;const z=R.length,q=P.length,K=Math.min(z,q);let he;for(he=0;he<K;he++){const oe=P[he]=I?tr(P[he]):kn(P[he]);_(R[he],oe,B,null,J,ie,A,M,I)}z>q?Se(R,J,ie,!0,!1,K):L(P,B,j,J,ie,A,M,I,K)},ue=(R,P,B,j,J,ie,A,M,I)=>{let z=0;const q=P.length;let K=R.length-1,he=q-1;for(;z<=K&&z<=he;){const oe=R[z],de=P[z]=I?tr(P[z]):kn(P[z]);if(ti(oe,de))_(oe,de,B,null,J,ie,A,M,I);else break;z++}for(;z<=K&&z<=he;){const oe=R[K],de=P[he]=I?tr(P[he]):kn(P[he]);if(ti(oe,de))_(oe,de,B,null,J,ie,A,M,I);else break;K--,he--}if(z>K){if(z<=he){const oe=he+1,de=oe<q?P[oe].el:j;for(;z<=he;)_(null,P[z]=I?tr(P[z]):kn(P[z]),B,de,J,ie,A,M,I),z++}}else if(z>he)for(;z<=K;)pe(R[z],J,ie,!0),z++;else{const oe=z,de=z,ve=new Map;for(z=de;z<=he;z++){const Ce=P[z]=I?tr(P[z]):kn(P[z]);Ce.key!=null&&ve.set(Ce.key,z)}let be,ce=0;const ze=he-de+1;let Oe=!1,Ie=0;const we=new Array(ze);for(z=0;z<ze;z++)we[z]=0;for(z=oe;z<=K;z++){const Ce=R[z];if(ce>=ze){pe(Ce,J,ie,!0);continue}let He;if(Ce.key!=null)He=ve.get(Ce.key);else for(be=de;be<=he;be++)if(we[be-de]===0&&ti(Ce,P[be])){He=be;break}He===void 0?pe(Ce,J,ie,!0):(we[He-de]=z+1,He>=Ie?Ie=He:Oe=!0,_(Ce,P[He],B,null,J,ie,A,M,I),ce++)}const Te=Oe?oS(we):ks;for(be=Te.length-1,z=ze-1;z>=0;z--){const Ce=de+z,He=P[Ce],ut=Ce+1<q?P[Ce+1].el:j;we[z]===0?_(null,He,B,ut,J,ie,A,M,I):Oe&&(be<0||z!==Te[be]?le(He,B,ut,2):be--)}}},le=(R,P,B,j,J=null)=>{const{el:ie,type:A,transition:M,children:I,shapeFlag:z}=R;if(z&6){le(R.component.subTree,P,B,j);return}if(z&128){R.suspense.move(P,B,j);return}if(z&64){A.move(R,P,B,re);return}if(A===Xt){i(ie,P,B);for(let K=0;K<I.length;K++)le(I[K],P,B,j);i(R.anchor,P,B);return}if(A===Uo){v(R,P,B);return}if(j!==2&&z&1&&M)if(j===0)M.beforeEnter(ie),i(ie,P,B),Ft(()=>M.enter(ie),J);else{const{leave:K,delayLeave:he,afterLeave:oe}=M,de=()=>i(ie,P,B),ve=()=>{K(ie,()=>{de(),oe&&oe()})};he?he(ie,de,ve):ve()}else i(ie,P,B)},pe=(R,P,B,j=!1,J=!1)=>{const{type:ie,props:A,ref:M,children:I,dynamicChildren:z,shapeFlag:q,patchFlag:K,dirs:he}=R;if(M!=null&&wl(M,null,B,R,!0),q&256){P.ctx.deactivate(R);return}const oe=q&1&&he,de=!Yr(R);let ve;if(de&&(ve=A&&A.onVnodeBeforeUnmount)&&un(ve,P,R),q&6)me(R.component,B,j);else{if(q&128){R.suspense.unmount(B,j);return}oe&&li(R,null,P,"beforeUnmount"),q&64?R.type.remove(R,P,B,J,re,j):z&&(ie!==Xt||K>0&&K&64)?Se(z,P,B,!1,!0):(ie===Xt&&K&384||!J&&q&16)&&Se(I,P,B),j&&Y(R)}(de&&(ve=A&&A.onVnodeUnmounted)||oe)&&Ft(()=>{ve&&un(ve,P,R),oe&&li(R,null,P,"unmounted")},B)},Y=R=>{const{type:P,el:B,anchor:j,transition:J}=R;if(P===Xt){se(B,j);return}if(P===Uo){S(R);return}const ie=()=>{r(B),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(R.shapeFlag&1&&J&&!J.persisted){const{leave:A,delayLeave:M}=J,I=()=>A(B,ie);M?M(R.el,ie,I):I()}else ie()},se=(R,P)=>{let B;for(;R!==P;)B=h(R),r(R),R=B;r(P)},me=(R,P,B)=>{const{bum:j,scope:J,update:ie,subTree:A,um:M}=R;j&&Lo(j),J.stop(),ie&&(ie.active=!1,pe(A,R,P,B)),M&&Ft(M,P),Ft(()=>{R.isUnmounted=!0},P),P&&P.pendingBranch&&!P.isUnmounted&&R.asyncDep&&!R.asyncResolved&&R.suspenseId===P.pendingId&&(P.deps--,P.deps===0&&P.resolve())},Se=(R,P,B,j=!1,J=!1,ie=0)=>{for(let A=ie;A<R.length;A++)pe(R[A],P,B,j,J)},G=R=>R.shapeFlag&6?G(R.component.subTree):R.shapeFlag&128?R.suspense.next():h(R.anchor||R.el);let fe=!1;const ae=(R,P,B)=>{R==null?P._vnode&&pe(P._vnode,null,null,!0):_(P._vnode||null,R,P,null,null,null,B),fe||(fe=!0,ld(),Ml(),fe=!1),P._vnode=R},re={p:_,um:pe,m:le,r:Y,mt:D,mc:L,pc:H,pbc:w,n:G,o:n};let Ee,W;return e&&([Ee,W]=e(re)),{render:ae,hydrate:Ee,createApp:Yy(ae,Ee)}}function Ic({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Rr({effect:n,update:e},t){n.allowRecurse=e.allowRecurse=t}function mg(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function ch(n,e,t=!1){const i=n.children,r=e.children;if(Le(i)&&Le(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=tr(r[s]),a.el=o.el),t||ch(o,a)),a.type===Ys&&(a.el=o.el)}}function oS(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function _g(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:_g(e)}const aS=n=>n.__isTeleport,Io=n=>n&&(n.disabled||n.disabled===""),Sd=n=>typeof SVGElement<"u"&&n instanceof SVGElement,Md=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Wu=(n,e)=>{const t=n&&n.to;return vt(t)?e?e(t):null:t},lS={name:"Teleport",__isTeleport:!0,process(n,e,t,i,r,s,o,a,l,c){const{mc:u,pc:f,pbc:h,o:{insert:d,querySelector:g,createText:_,createComment:m}}=c,p=Io(e.props);let{shapeFlag:x,children:v,dynamicChildren:S}=e;if(n==null){const b=e.el=_(""),E=e.anchor=_("");d(b,t,i),d(E,t,i);const T=e.target=Wu(e.props,g),L=e.targetAnchor=_("");T&&(d(L,T),o==="svg"||Sd(T)?o="svg":(o==="mathml"||Md(T))&&(o="mathml"));const y=(w,N)=>{x&16&&u(v,w,N,r,s,o,a,l)};p?y(t,E):T&&y(T,L)}else{e.el=n.el;const b=e.anchor=n.anchor,E=e.target=n.target,T=e.targetAnchor=n.targetAnchor,L=Io(n.props),y=L?t:E,w=L?b:T;if(o==="svg"||Sd(E)?o="svg":(o==="mathml"||Md(E))&&(o="mathml"),S?(h(n.dynamicChildren,S,y,r,s,o,a),ch(n,e,!0)):l||f(n,e,y,w,r,s,o,a,!1),p)L?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):Ua(e,t,b,c,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const N=e.target=Wu(e.props,g);N&&Ua(e,N,null,c,0)}else L&&Ua(e,E,T,c,1)}gg(e)},remove(n,e,t,i,{um:r,o:{remove:s}},o){const{shapeFlag:a,children:l,anchor:c,targetAnchor:u,target:f,props:h}=n;if(f&&s(u),o&&s(c),a&16){const d=o||!Io(h);for(let g=0;g<l.length;g++){const _=l[g];r(_,e,t,d,!!_.dynamicChildren)}}},move:Ua,hydrate:cS};function Ua(n,e,t,{o:{insert:i},m:r},s=2){s===0&&i(n.targetAnchor,e,t);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=s===2;if(f&&i(o,e,t),(!f||Io(u))&&l&16)for(let h=0;h<c.length;h++)r(c[h],e,t,2);f&&i(a,e,t)}function cS(n,e,t,i,r,s,{o:{nextSibling:o,parentNode:a,querySelector:l}},c){const u=e.target=Wu(e.props,l);if(u){const f=u._lpa||u.firstChild;if(e.shapeFlag&16)if(Io(e.props))e.anchor=c(o(n),e,a(n),t,i,r,s),e.targetAnchor=f;else{e.anchor=o(n);let h=f;for(;h;)if(h=o(h),h&&h.nodeType===8&&h.data==="teleport anchor"){e.targetAnchor=h,u._lpa=e.targetAnchor&&o(e.targetAnchor);break}c(f,e,u,t,i,r,s)}gg(e)}return e.anchor&&o(e.anchor)}const KI=lS;function gg(n){const e=n.ctx;if(e&&e.ut){let t=n.children[0].el;for(;t&&t!==n.targetAnchor;)t.nodeType===1&&t.setAttribute("data-v-owner",e.uid),t=t.nextSibling;e.ut()}}const Xt=Symbol.for("v-fgt"),Ys=Symbol.for("v-txt"),an=Symbol.for("v-cmt"),Uo=Symbol.for("v-stc"),No=[];let Vn=null;function Ke(n=!1){No.push(Vn=n?null:[])}function vg(){No.pop(),Vn=No[No.length-1]||null}let Ks=1;function Ed(n){Ks+=n}function xg(n){return n.dynamicChildren=Ks>0?Vn||ks:null,vg(),Ks>0&&Vn&&Vn.push(n),n}function dt(n,e,t,i,r,s){return xg(Re(n,e,t,i,r,s,!0))}function rr(n,e,t,i,r){return xg(qe(n,e,t,i,r,!0))}function Zs(n){return n?n.__v_isVNode===!0:!1}function ti(n,e){return n.type===e.type&&n.key===e.key}const nc="__vInternal",yg=({key:n})=>n??null,fl=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?vt(n)||Gt(n)||Fe(n)?{i:Bt,r:n,k:e,f:!!t}:n:null);function Re(n,e=null,t=null,i=0,r=null,s=n===Xt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&yg(e),ref:e&&fl(e),scopeId:Ql,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Bt};return a?(uh(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=vt(t)?8:16),Ks>0&&!o&&Vn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Vn.push(l),l}const qe=uS;function uS(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===q_)&&(n=an),Zs(n)){const a=Ui(n,e,!0);return t&&uh(a,t),Ks>0&&!s&&Vn&&(a.shapeFlag&6?Vn[Vn.indexOf(n)]=a:Vn.push(a)),a.patchFlag|=-2,a}if(yS(n)&&(n=n.__vccOpts),e){e=fS(e);let{class:a,style:l}=e;a&&!vt(a)&&(e.class=ss(a)),ct(l)&&(U_(l)&&!Le(l)&&(l=Ct({},l)),e.style=Wf(l))}const o=vt(n)?1:Y_(n)?128:aS(n)?64:ct(n)?4:Fe(n)?2:0;return Re(n,e,t,i,r,o,s,!0)}function fS(n){return n?U_(n)||nc in n?Ct({},n):n:null}function Ui(n,e,t=!1){const{props:i,ref:r,patchFlag:s,children:o}=n,a=e?hS(i||{},e):i;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:a,key:a&&yg(a),ref:e&&e.ref?t&&r?Le(r)?r.concat(fl(e)):[r,fl(e)]:fl(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Xt?s===-1?16:s|16:s,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ui(n.ssContent),ssFallback:n.ssFallback&&Ui(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce}}function Sg(n=" ",e=0){return qe(Ys,null,n,e)}function ZI(n,e){const t=qe(Uo,null,n);return t.staticCount=e,t}function On(n="",e=!1){return e?(Ke(),rr(an,null,n)):qe(an,null,n)}function kn(n){return n==null||typeof n=="boolean"?qe(an):Le(n)?qe(Xt,null,n.slice()):typeof n=="object"?tr(n):qe(Ys,null,String(n))}function tr(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ui(n)}function uh(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Le(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),uh(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!(nc in e)?e._ctx=Bt:r===3&&Bt&&(Bt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Fe(e)?(e={default:e,_ctx:Bt},t=32):(e=String(e),i&64?(t=16,e=[Sg(e)]):t=8);n.children=e,n.shapeFlag|=t}function hS(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=ss([e.class,i.class]));else if(r==="style")e.style=Wf([e.style,i.style]);else if(ua(r)){const s=e[r],o=i[r];o&&s!==o&&!(Le(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function un(n,e,t,i=null){Xn(n,e,7,[t,i])}const dS=ag();let pS=0;function mS(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||dS,s={uid:pS++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new S_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ug(i,r),emitsOptions:W_(i,r),emit:null,emitted:null,propsDefaults:pt,inheritAttrs:i.inheritAttrs,ctx:pt,data:pt,props:pt,attrs:pt,slots:pt,refs:pt,setupState:pt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=dy.bind(null,s),n.ce&&n.ce(s),s}let Nt=null;const ic=()=>Nt||Bt;let Al,ju;{const n=v_(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Al=e("__VUE_INSTANCE_SETTERS__",t=>Nt=t),ju=e("__VUE_SSR_SETTERS__",t=>rc=t)}const _a=n=>{const e=Nt;return Al(n),n.scope.on(),()=>{n.scope.off(),Al(e)}},bd=()=>{Nt&&Nt.scope.off(),Al(null)};function Mg(n){return n.vnode.shapeFlag&4}let rc=!1;function _S(n,e=!1){e&&ju(e);const{props:t,children:i}=n.vnode,r=Mg(n);Ky(n,t,r,e),Qy(n,i);const s=r?gS(n,e):void 0;return e&&ju(!1),s}function gS(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=N_(new Proxy(n.ctx,Gy));const{setup:i}=t;if(i){const r=n.setupContext=i.length>1?xS(n):null,s=_a(n);us();const o=hr(i,n,0,[n.props,r]);if(fs(),s(),p_(o)){if(o.then(bd,bd),e)return o.then(a=>{Xu(n,a,e)}).catch(a=>{da(a,n,0)});n.asyncDep=o}else Xu(n,o,e)}else Eg(n,e)}function Xu(n,e,t){Fe(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ct(e)&&(n.setupState=B_(e)),Eg(n,t)}let Td;function Eg(n,e,t){const i=n.type;if(!n.render){if(!e&&Td&&!i.render){const r=i.template||ah(n).template;if(r){const{isCustomElement:s,compilerOptions:o}=n.appContext.config,{delimiters:a,compilerOptions:l}=i,c=Ct(Ct({isCustomElement:s,delimiters:a},o),l);i.render=Td(r,c)}}n.render=i.render||Gn}{const r=_a(n);us();try{Vy(n)}finally{fs(),r()}}}function vS(n){return n.attrsProxy||(n.attrsProxy=new Proxy(n.attrs,{get(e,t){return xn(n,"get","$attrs"),e[t]}}))}function xS(n){const e=t=>{n.exposed=t||{}};return{get attrs(){return vS(n)},slots:n.slots,emit:n.emit,expose:e}}function fh(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(B_(N_(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Do)return Do[t](n)},has(e,t){return t in e||t in Do}}))}function qu(n,e=!0){return Fe(n)?n.displayName||n.name:n.name||e&&n.__name}function yS(n){return Fe(n)&&"__vccOpts"in n}const St=(n,e)=>iy(n,e,rc);function qn(n,e,t){const i=arguments.length;return i===2?ct(e)&&!Le(e)?Zs(e)?qe(n,null,[e]):qe(n,e):qe(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Zs(t)&&(t=[t]),qe(n,e,t))}const bg="3.4.14";/**
* @vue/runtime-dom v3.4.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const SS="http://www.w3.org/2000/svg",MS="http://www.w3.org/1998/Math/MathML",nr=typeof document<"u"?document:null,wd=nr&&nr.createElement("template"),ES={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?nr.createElementNS(SS,n):e==="mathml"?nr.createElementNS(MS,n):nr.createElement(n,t?{is:t}:void 0);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>nr.createTextNode(n),createComment:n=>nr.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>nr.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{wd.innerHTML=i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n;const a=wd.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Wi="transition",go="animation",Zo=Symbol("_vtc"),hh=(n,{slots:e})=>qn(Dy,bS(n),e);hh.displayName="Transition";const Tg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};hh.props=Ct({},Q_,Tg);const Pr=(n,e=[])=>{Le(n)?n.forEach(t=>t(...e)):n&&n(...e)},Ad=n=>n?Le(n)?n.some(e=>e.length>1):n.length>1:!1;function bS(n){const e={};for(const U in n)U in Tg||(e[U]=n[U]);if(n.css===!1)return e;const{name:t="v",type:i,duration:r,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:d=`${t}-leave-to`}=n,g=TS(r),_=g&&g[0],m=g&&g[1],{onBeforeEnter:p,onEnter:x,onEnterCancelled:v,onLeave:S,onLeaveCancelled:b,onBeforeAppear:E=p,onAppear:T=x,onAppearCancelled:L=v}=e,y=(U,$,D)=>{Lr(U,$?u:a),Lr(U,$?c:o),D&&D()},w=(U,$)=>{U._isLeaving=!1,Lr(U,f),Lr(U,d),Lr(U,h),$&&$()},N=U=>($,D)=>{const k=U?T:x,O=()=>y($,U,D);Pr(k,[$,O]),Cd(()=>{Lr($,U?l:s),ji($,U?u:a),Ad(k)||Rd($,i,_,O)})};return Ct(e,{onBeforeEnter(U){Pr(p,[U]),ji(U,s),ji(U,o)},onBeforeAppear(U){Pr(E,[U]),ji(U,l),ji(U,c)},onEnter:N(!1),onAppear:N(!0),onLeave(U,$){U._isLeaving=!0;const D=()=>w(U,$);ji(U,f),CS(),ji(U,h),Cd(()=>{U._isLeaving&&(Lr(U,f),ji(U,d),Ad(S)||Rd(U,i,m,D))}),Pr(S,[U,D])},onEnterCancelled(U){y(U,!1),Pr(v,[U])},onAppearCancelled(U){y(U,!0),Pr(L,[U])},onLeaveCancelled(U){w(U),Pr(b,[U])}})}function TS(n){if(n==null)return null;if(ct(n))return[Uc(n.enter),Uc(n.leave)];{const e=Uc(n);return[e,e]}}function Uc(n){return g_(n)}function ji(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Zo]||(n[Zo]=new Set)).add(e)}function Lr(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[Zo];t&&(t.delete(e),t.size||(n[Zo]=void 0))}function Cd(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let wS=0;function Rd(n,e,t,i){const r=n._endId=++wS,s=()=>{r===n._endId&&i()};if(t)return setTimeout(s,t);const{type:o,timeout:a,propCount:l}=AS(n,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{n.removeEventListener(c,h),s()},h=d=>{d.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),n.addEventListener(c,h)}function AS(n,e){const t=window.getComputedStyle(n),i=g=>(t[g]||"").split(", "),r=i(`${Wi}Delay`),s=i(`${Wi}Duration`),o=Pd(r,s),a=i(`${go}Delay`),l=i(`${go}Duration`),c=Pd(a,l);let u=null,f=0,h=0;e===Wi?o>0&&(u=Wi,f=o,h=s.length):e===go?c>0&&(u=go,f=c,h=l.length):(f=Math.max(o,c),u=f>0?o>c?Wi:go:null,h=u?u===Wi?s.length:l.length:0);const d=u===Wi&&/\b(transform|all)(,|$)/.test(i(`${Wi}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:d}}function Pd(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Ld(t)+Ld(n[i])))}function Ld(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function CS(){return document.body.offsetHeight}function RS(n,e,t){const i=n[Zo];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const PS=Symbol("_vod"),LS=Symbol("");function DS(n,e,t){const i=n.style,r=i.display,s=vt(t);if(t&&!s){if(e&&!vt(e))for(const o in e)t[o]==null&&$u(i,o,"");for(const o in t)$u(i,o,t[o])}else if(s){if(e!==t){const o=i[LS];o&&(t+=";"+o),i.cssText=t}}else e&&n.removeAttribute("style");PS in n&&(i.display=r)}const Dd=/\s*!important$/;function $u(n,e,t){if(Le(t))t.forEach(i=>$u(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=IS(n,e);Dd.test(t)?n.setProperty(uo(i),t.replace(Dd,""),"important"):n[i]=t}}const Id=["Webkit","Moz","ms"],Nc={};function IS(n,e){const t=Nc[e];if(t)return t;let i=gi(e);if(i!=="filter"&&i in n)return Nc[e]=i;i=Kl(i);for(let r=0;r<Id.length;r++){const s=Id[r]+i;if(s in n)return Nc[e]=s}return e}const Ud="http://www.w3.org/1999/xlink";function US(n,e,t,i,r){if(i&&e.startsWith("xlink:"))t==null?n.removeAttributeNS(Ud,e.slice(6,e.length)):n.setAttributeNS(Ud,e,t);else{const s=Ix(e);t==null||s&&!x_(t)?n.removeAttribute(e):n.setAttribute(e,s?"":t)}}function NS(n,e,t,i,r,s,o){if(e==="innerHTML"||e==="textContent"){i&&o(i,r,s),n[e]=t??"";return}const a=n.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){n._value=t;const c=a==="OPTION"?n.getAttribute("value"):n.value,u=t??"";c!==u&&(n.value=u),t==null&&n.removeAttribute(e);return}let l=!1;if(t===""||t==null){const c=typeof n[e];c==="boolean"?t=x_(t):t==null&&c==="string"?(t="",l=!0):c==="number"&&(t=0,l=!0)}try{n[e]=t}catch{}l&&n.removeAttribute(e)}function OS(n,e,t,i){n.addEventListener(e,t,i)}function FS(n,e,t,i){n.removeEventListener(e,t,i)}const Nd=Symbol("_vei");function kS(n,e,t,i,r=null){const s=n[Nd]||(n[Nd]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=BS(e);if(i){const c=s[e]=GS(i,r);OS(n,a,c,l)}else o&&(FS(n,a,o,l),s[e]=void 0)}}const Od=/(?:Once|Passive|Capture)$/;function BS(n){let e;if(Od.test(n)){e={};let i;for(;i=n.match(Od);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):uo(n.slice(2)),e]}let Oc=0;const zS=Promise.resolve(),HS=()=>Oc||(zS.then(()=>Oc=0),Oc=Date.now());function GS(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Xn(VS(i,t.value),e,5,[i])};return t.value=n,t.attached=HS(),t}function VS(n,e){if(Le(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const Fd=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,WS=(n,e,t,i,r,s,o,a,l)=>{const c=r==="svg";e==="class"?RS(n,i,c):e==="style"?DS(n,t,i):ua(e)?Hf(e)||kS(n,e,t,i,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):jS(n,e,i,c))?NS(n,e,i,s,o,a,l):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),US(n,e,i,c))};function jS(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Fd(e)&&Fe(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Fd(e)&&vt(t)?!1:e in n}const wg=Ct({patchProp:WS},ES);let Oo,kd=!1;function XS(){return Oo||(Oo=rS(wg))}function qS(){return Oo=kd?Oo:sS(wg),kd=!0,Oo}const $S=(...n)=>{const e=XS().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Cg(i);if(!r)return;const s=e._component;!Fe(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const o=t(r,!1,Ag(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e},YS=(...n)=>{const e=qS().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Cg(i);if(r)return t(r,!0,Ag(r))},e};function Ag(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Cg(n){return vt(n)?document.querySelector(n):n}const Rg=/#/g,Pg=/&/g,KS=/\//g,ZS=/=/g,JS=/\?/g,sc=/\+/g,QS=/%5e/gi,eM=/%60/gi,tM=/%7c/gi,nM=/%20/gi,iM=/%252f/gi;function Lg(n){return encodeURI(""+n).replace(tM,"|")}function Yu(n){return Lg(typeof n=="string"?n:JSON.stringify(n)).replace(sc,"%2B").replace(nM,"+").replace(Rg,"%23").replace(Pg,"%26").replace(eM,"`").replace(QS,"^")}function Fc(n){return Yu(n).replace(ZS,"%3D")}function Dg(n){return Lg(n).replace(Rg,"%23").replace(JS,"%3F").replace(iM,"%2F").replace(Pg,"%26").replace(sc,"%2B")}function Bd(n){return Dg(n).replace(KS,"%2F")}function Cl(n=""){try{return decodeURIComponent(""+n)}catch{return""+n}}function rM(n){return Cl(n.replace(sc," "))}function sM(n){return Cl(n.replace(sc," "))}function Ig(n=""){const e={};n[0]==="?"&&(n=n.slice(1));for(const t of n.split("&")){const i=t.match(/([^=]+)=?(.*)/)||[];if(i.length<2)continue;const r=rM(i[1]);if(r==="__proto__"||r==="constructor")continue;const s=sM(i[2]||"");e[r]===void 0?e[r]=s:Array.isArray(e[r])?e[r].push(s):e[r]=[e[r],s]}return e}function oM(n,e){return(typeof e=="number"||typeof e=="boolean")&&(e=String(e)),e?Array.isArray(e)?e.map(t=>`${Fc(n)}=${Yu(t)}`).join("&"):`${Fc(n)}=${Yu(e)}`:Fc(n)}function aM(n){return Object.keys(n).filter(e=>n[e]!==void 0).map(e=>oM(e,n[e])).filter(Boolean).join("&")}const lM=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,cM=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,uM=/^([/\\]\s*){2,}[^/\\]/;function Ni(n,e={}){return typeof e=="boolean"&&(e={acceptRelative:e}),e.strict?lM.test(n):cM.test(n)||(e.acceptRelative?uM.test(n):!1)}const fM=/^[\s\0]*(blob|data|javascript|vbscript):$/i;function hM(n){return!!n&&fM.test(n)}const dM=/\/$|\/\?|\/#/;function Ku(n="",e){return e?dM.test(n):n.endsWith("/")}function oc(n="",e){if(!e)return(Ku(n)?n.slice(0,-1):n)||"/";if(!Ku(n,!0))return n||"/";let t=n,i="";const r=n.indexOf("#");r>=0&&(t=n.slice(0,r),i=n.slice(r));const[s,...o]=t.split("?");return(s.slice(0,-1)||"/")+(o.length>0?`?${o.join("?")}`:"")+i}function Rl(n="",e){if(!e)return n.endsWith("/")?n:n+"/";if(Ku(n,!0))return n||"/";let t=n,i="";const r=n.indexOf("#");if(r>=0&&(t=n.slice(0,r),i=n.slice(r),!t))return i;const[s,...o]=t.split("?");return s+"/"+(o.length>0?`?${o.join("?")}`:"")+i}function pM(n=""){return n.startsWith("/")}function Zu(n=""){return pM(n)?n:"/"+n}function mM(n,e){if(Ng(e)||Ni(n))return n;const t=oc(e);return n.startsWith(t)?n:Oi(t,n)}function zd(n,e){if(Ng(e))return n;const t=oc(e);if(!n.startsWith(t))return n;const i=n.slice(t.length);return i[0]==="/"?i:"/"+i}function Ug(n,e){const t=ho(n),i={...Ig(t.search),...e};return t.search=aM(i),xM(t)}function Ng(n){return!n||n==="/"}function _M(n){return n&&n!=="/"}const gM=/^\.?\//;function Oi(n,...e){let t=n||"";for(const i of e.filter(r=>_M(r)))if(t){const r=i.replace(gM,"");t=Rl(t)+r}else t=i;return t}function vM(n,e,t={}){return t.trailingSlash||(n=Rl(n),e=Rl(e)),t.leadingSlash||(n=Zu(n),e=Zu(e)),t.encoding||(n=Cl(n),e=Cl(e)),n===e}function ho(n="",e){const t=n.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);if(t){const[,f,h=""]=t;return{protocol:f.toLowerCase(),pathname:h,href:f+h,auth:"",host:"",search:"",hash:""}}if(!Ni(n,{acceptRelative:!0}))return e?ho(e+n):Hd(n);const[,i="",r,s=""]=n.replace(/\\/g,"/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[],[,o="",a=""]=s.match(/([^#/?]*)(.*)?/)||[],{pathname:l,search:c,hash:u}=Hd(a.replace(/\/(?=[A-Za-z]:)/,""));return{protocol:i.toLowerCase(),auth:r?r.slice(0,Math.max(0,r.length-1)):"",host:o,pathname:l,search:c,hash:u}}function Hd(n=""){const[e="",t="",i=""]=(n.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:e,search:t,hash:i}}function xM(n){const e=n.pathname||"",t=n.search?(n.search.startsWith("?")?"":"?")+n.search:"",i=n.hash||"",r=n.auth?n.auth+"@":"",s=n.host||"";return(n.protocol?n.protocol+"//":"")+r+s+e+t+i}const yM=()=>{var n;return((n=window==null?void 0:window.__NUXT__)==null?void 0:n.config)||{}},Pl=yM().app,SM=()=>Pl.baseURL,MM=()=>Pl.buildAssetsDir,dh=(...n)=>Oi(Og(),MM(),...n),Og=(...n)=>{const e=Pl.cdnURL||Pl.baseURL;return n.length?Oi(e,...n):e};globalThis.__buildAssetsURL=dh,globalThis.__publicAssetsURL=Og;const EM=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,bM=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,TM=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function wM(n,e){if(n==="__proto__"||n==="constructor"&&e&&typeof e=="object"&&"prototype"in e){AM(n);return}return e}function AM(n){console.warn(`[destr] Dropping "${n}" key to prevent prototype pollution.`)}function Ll(n,e={}){if(typeof n!="string")return n;const t=n.trim();if(n[0]==='"'&&n.at(-1)==='"'&&!n.includes("\\"))return t.slice(1,-1);if(t.length<=9){const i=t.toLowerCase();if(i==="true")return!0;if(i==="false")return!1;if(i==="undefined")return;if(i==="null")return null;if(i==="nan")return Number.NaN;if(i==="infinity")return Number.POSITIVE_INFINITY;if(i==="-infinity")return Number.NEGATIVE_INFINITY}if(!TM.test(n)){if(e.strict)throw new SyntaxError("[destr] Invalid JSON");return n}try{if(EM.test(n)||bM.test(n)){if(e.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(n,wM)}return JSON.parse(n)}catch(i){if(e.strict)throw i;return n}}class CM extends Error{constructor(e,t){super(e,t),this.name="FetchError",t!=null&&t.cause&&!this.cause&&(this.cause=t.cause)}}function RM(n){var l,c,u,f,h;const e=((l=n.error)==null?void 0:l.message)||((c=n.error)==null?void 0:c.toString())||"",t=((u=n.request)==null?void 0:u.method)||((f=n.options)==null?void 0:f.method)||"GET",i=((h=n.request)==null?void 0:h.url)||String(n.request)||"/",r=`[${t}] ${JSON.stringify(i)}`,s=n.response?`${n.response.status} ${n.response.statusText}`:"<no response>",o=`${r}: ${s}${e?` ${e}`:""}`,a=new CM(o,n.error?{cause:n.error}:void 0);for(const d of["request","options","response"])Object.defineProperty(a,d,{get(){return n[d]}});for(const[d,g]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,d,{get(){return n.response&&n.response[g]}});return a}const PM=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function Gd(n="GET"){return PM.has(n.toUpperCase())}function LM(n){if(n===void 0)return!1;const e=typeof n;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(n)?!0:n.buffer?!1:n.constructor&&n.constructor.name==="Object"||typeof n.toJSON=="function"}const DM=new Set(["image/svg","application/xml","application/xhtml","application/html"]),IM=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function UM(n=""){if(!n)return"json";const e=n.split(";").shift()||"";return IM.test(e)?"json":DM.has(e)||e.startsWith("text/")?"text":"blob"}function NM(n,e,t=globalThis.Headers){const i={...e,...n};if(e!=null&&e.params&&(n!=null&&n.params)&&(i.params={...e==null?void 0:e.params,...n==null?void 0:n.params}),e!=null&&e.query&&(n!=null&&n.query)&&(i.query={...e==null?void 0:e.query,...n==null?void 0:n.query}),e!=null&&e.headers&&(n!=null&&n.headers)){i.headers=new t((e==null?void 0:e.headers)||{});for(const[r,s]of new t((n==null?void 0:n.headers)||{}))i.headers.set(r,s)}return i}const OM=new Set([408,409,425,429,500,502,503,504]),FM=new Set([101,204,205,304]);function Fg(n={}){const{fetch:e=globalThis.fetch,Headers:t=globalThis.Headers,AbortController:i=globalThis.AbortController}=n;async function r(a){const l=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!l){let u;typeof a.options.retry=="number"?u=a.options.retry:u=Gd(a.options.method)?0:1;const f=a.response&&a.response.status||500;if(u>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(f):OM.has(f))){const h=a.options.retryDelay||0;return h>0&&await new Promise(d=>setTimeout(d,h)),s(a.request,{...a.options,retry:u-1,timeout:a.options.timeout})}}const c=RM(a);throw Error.captureStackTrace&&Error.captureStackTrace(c,s),c}const s=async function(l,c={}){var h;const u={request:l,options:NM(c,n.defaults,t),response:void 0,error:void 0};if(u.options.method=(h=u.options.method)==null?void 0:h.toUpperCase(),u.options.onRequest&&await u.options.onRequest(u),typeof u.request=="string"&&(u.options.baseURL&&(u.request=mM(u.request,u.options.baseURL)),(u.options.query||u.options.params)&&(u.request=Ug(u.request,{...u.options.params,...u.options.query}))),u.options.body&&Gd(u.options.method)&&(LM(u.options.body)?(u.options.body=typeof u.options.body=="string"?u.options.body:JSON.stringify(u.options.body),u.options.headers=new t(u.options.headers||{}),u.options.headers.has("content-type")||u.options.headers.set("content-type","application/json"),u.options.headers.has("accept")||u.options.headers.set("accept","application/json")):("pipeTo"in u.options.body&&typeof u.options.body.pipeTo=="function"||typeof u.options.body.pipe=="function")&&("duplex"in u.options||(u.options.duplex="half"))),!u.options.signal&&u.options.timeout){const d=new i;setTimeout(()=>d.abort(),u.options.timeout),u.options.signal=d.signal}try{u.response=await e(u.request,u.options)}catch(d){return u.error=d,u.options.onRequestError&&await u.options.onRequestError(u),await r(u)}if(u.response.body&&!FM.has(u.response.status)&&u.options.method!=="HEAD"){const d=(u.options.parseResponse?"json":u.options.responseType)||UM(u.response.headers.get("content-type")||"");switch(d){case"json":{const g=await u.response.text(),_=u.options.parseResponse||Ll;u.response._data=_(g);break}case"stream":{u.response._data=u.response.body;break}default:u.response._data=await u.response[d]()}}return u.options.onResponse&&await u.options.onResponse(u),!u.options.ignoreResponseError&&u.response.status>=400&&u.response.status<600?(u.options.onResponseError&&await u.options.onResponseError(u),await r(u)):u.response},o=async function(l,c){return(await s(l,c))._data};return o.raw=s,o.native=(...a)=>e(...a),o.create=(a={})=>Fg({...n,defaults:{...n.defaults,...a}}),o}const ph=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),kM=ph.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),BM=ph.Headers,zM=ph.AbortController,HM=Fg({fetch:kM,Headers:BM,AbortController:zM}),GM=HM;globalThis.$fetch||(globalThis.$fetch=GM.create({baseURL:SM()}));function Ju(n,e={},t){for(const i in n){const r=n[i],s=t?`${t}:${i}`:i;typeof r=="object"&&r!==null?Ju(r,e,s):typeof r=="function"&&(e[s]=r)}return e}const VM={run:n=>n()},WM=()=>VM,kg=typeof console.createTask<"u"?console.createTask:WM;function jM(n,e){const t=e.shift(),i=kg(t);return n.reduce((r,s)=>r.then(()=>i.run(()=>s(...e))),Promise.resolve())}function XM(n,e){const t=e.shift(),i=kg(t);return Promise.all(n.map(r=>i.run(()=>r(...e))))}function kc(n,e){for(const t of[...n])t(e)}class qM{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,t,i={}){if(!e||typeof t!="function")return()=>{};const r=e;let s;for(;this._deprecatedHooks[e];)s=this._deprecatedHooks[e],e=s.to;if(s&&!i.allowDeprecated){let o=s.message;o||(o=`${r} hook has been deprecated`+(s.to?`, please use ${s.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(o)||(console.warn(o),this._deprecatedMessages.add(o))}if(!t.name)try{Object.defineProperty(t,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&(this.removeHook(e,t),t=void 0)}}hookOnce(e,t){let i,r=(...s)=>(typeof i=="function"&&i(),i=void 0,r=void 0,t(...s));return i=this.hook(e,r),i}removeHook(e,t){if(this._hooks[e]){const i=this._hooks[e].indexOf(t);i!==-1&&this._hooks[e].splice(i,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,t){this._deprecatedHooks[e]=typeof t=="string"?{to:t}:t;const i=this._hooks[e]||[];delete this._hooks[e];for(const r of i)this.hook(e,r)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const t in e)this.deprecateHook(t,e[t])}addHooks(e){const t=Ju(e),i=Object.keys(t).map(r=>this.hook(r,t[r]));return()=>{for(const r of i.splice(0,i.length))r()}}removeHooks(e){const t=Ju(e);for(const i in t)this.removeHook(i,t[i])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...t){return t.unshift(e),this.callHookWith(jM,e,...t)}callHookParallel(e,...t){return t.unshift(e),this.callHookWith(XM,e,...t)}callHookWith(e,t,...i){const r=this._before||this._after?{name:t,args:i,context:{}}:void 0;this._before&&kc(this._before,r);const s=e(t in this._hooks?[...this._hooks[t]]:[],i);return s instanceof Promise?s.finally(()=>{this._after&&r&&kc(this._after,r)}):(this._after&&r&&kc(this._after,r),s)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const t=this._before.indexOf(e);t!==-1&&this._before.splice(t,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const t=this._after.indexOf(e);t!==-1&&this._after.splice(t,1)}}}}function Bg(){return new qM}function $M(n={}){let e,t=!1;const i=o=>{if(e&&e!==o)throw new Error("Context conflict")};let r;if(n.asyncContext){const o=n.AsyncLocalStorage||globalThis.AsyncLocalStorage;o?r=new o:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}const s=()=>{if(r&&e===void 0){const o=r.getStore();if(o!==void 0)return o}return e};return{use:()=>{const o=s();if(o===void 0)throw new Error("Context is not available");return o},tryUse:()=>s(),set:(o,a)=>{a||i(o),e=o,t=!0},unset:()=>{e=void 0,t=!1},call:(o,a)=>{i(o),e=o;try{return r?r.run(o,a):a()}finally{t||(e=void 0)}},async callAsync(o,a){e=o;const l=()=>{e=o},c=()=>e===o?l:void 0;Qu.add(c);try{const u=r?r.run(o,a):a();return t||(e=void 0),await u}finally{Qu.delete(c)}}}}function YM(n={}){const e={};return{get(t,i={}){return e[t]||(e[t]=$M({...n,...i})),e[t],e[t]}}}const Dl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},Vd="__unctx__",KM=Dl[Vd]||(Dl[Vd]=YM()),ZM=(n,e={})=>KM.get(n,e),Wd="__unctx_async_handlers__",Qu=Dl[Wd]||(Dl[Wd]=new Set);function Jo(n){const e=[];for(const r of Qu){const s=r();s&&e.push(s)}const t=()=>{for(const r of e)r()};let i=n();return i&&typeof i=="object"&&"catch"in i&&(i=i.catch(r=>{throw t(),r})),[i,t]}const zg=ZM("nuxt-app",{asyncContext:!1}),JM="__nuxt_plugin";function QM(n){let e=0;const t={_scope:Ux(),provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.9.1"},get vue(){return t.vueApp.version}},payload:Ii({data:{},state:{},once:new Set,_errors:{},...window.__NUXT__??{}}),static:{data:{}},runWithContext:r=>t._scope.run(()=>nE(t,r)),isHydrating:!0,deferHydration(){if(!t.isHydrating)return()=>{};e++;let r=!1;return()=>{if(!r&&(r=!0,e--,e===0))return t.isHydrating=!1,t.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:{},_payloadRevivers:{},...n};t.hooks=Bg(),t.hook=t.hooks.hook,t.callHook=t.hooks.callHook,t.provide=(r,s)=>{const o="$"+r;Na(t,o,s),Na(t.vueApp.config.globalProperties,o,s)},Na(t.vueApp,"$nuxt",t),Na(t.vueApp.config.globalProperties,"$nuxt",t);{window.addEventListener("nuxt.preloadError",s=>{t.callHook("app:chunkError",{error:s.payload})}),window.useNuxtApp=window.useNuxtApp||st;const r=t.hook("app:error",(...s)=>{console.error("[nuxt] error caught during app initialization",...s)});t.hook("app:mounted",r)}const i=Ii(t.payload.config);return t.provide("config",i),t}async function eE(n,e){if(e.hooks&&n.hooks.addHooks(e.hooks),typeof e=="function"){const{provide:t}=await n.runWithContext(()=>e(n))||{};if(t&&typeof t=="object")for(const i in t)n.provide(i,t[i])}}async function tE(n,e){const t=[],i=[],r=[],s=[];let o=0;async function a(l){if(l.dependsOn&&!l.dependsOn.every(c=>t.includes(c)))i.push([new Set(l.dependsOn),l]);else{const c=eE(n,l).then(async()=>{l._name&&(t.push(l._name),await Promise.all(i.map(async([u,f])=>{u.has(l._name)&&(u.delete(l._name),u.size===0&&(o++,await a(f)))})))});l.parallel?r.push(c.catch(u=>s.push(u))):await c}}for(const l of e)await a(l);if(await Promise.all(r),o)for(let l=0;l<o;l++)await Promise.all(r);if(s.length)throw s[0]}function br(n){if(typeof n=="function")return n;const e=n._name||n.name;return delete n.name,Object.assign(n.setup||(()=>{}),n,{[JM]:!0,_name:e})}function nE(n,e,t){const i=()=>t?e(...t):e();return zg.set(n),n.vueApp.runWithContext(i)}function st(){var e;let n;if(lg()&&(n=(e=ic())==null?void 0:e.appContext.app.$nuxt),n=n||zg.tryUse(),!n)throw new Error("[nuxt] instance unavailable");return n}function ga(){return st().$config}function Na(n,e,t){Object.defineProperty(n,e,{get:()=>t})}const iE="modulepreload",rE=function(n,e){return n[0]==="."?new URL(n,e).href:n},jd={},sE=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){const s=document.getElementsByTagName("link");r=Promise.all(t.map(o=>{if(o=rE(o,i),o in jd)return;jd[o]=!0;const a=o.endsWith(".css"),l=a?'[rel="stylesheet"]':"";if(!!i)for(let f=s.length-1;f>=0;f--){const h=s[f];if(h.href===o&&(!a||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":iE,a||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),a)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${o}`)))})}))}return r.then(()=>e()).catch(s=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s})},ai=(...n)=>sE(...n).catch(e=>{const t=new Event("nuxt.preloadError");throw t.payload=e,window.dispatchEvent(t),e}),oE=-1,aE=-2,lE=-3,cE=-4,uE=-5,fE=-6;function hE(n,e){return dE(JSON.parse(n),e)}function dE(n,e){if(typeof n=="number")return r(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const t=n,i=Array(t.length);function r(s,o=!1){if(s===oE)return;if(s===lE)return NaN;if(s===cE)return 1/0;if(s===uE)return-1/0;if(s===fE)return-0;if(o)throw new Error("Invalid input");if(s in i)return i[s];const a=t[s];if(!a||typeof a!="object")i[s]=a;else if(Array.isArray(a))if(typeof a[0]=="string"){const l=a[0],c=e==null?void 0:e[l];if(c)return i[s]=c(r(a[1]));switch(l){case"Date":i[s]=new Date(a[1]);break;case"Set":const u=new Set;i[s]=u;for(let d=1;d<a.length;d+=1)u.add(r(a[d]));break;case"Map":const f=new Map;i[s]=f;for(let d=1;d<a.length;d+=2)f.set(r(a[d]),r(a[d+1]));break;case"RegExp":i[s]=new RegExp(a[1],a[2]);break;case"Object":i[s]=Object(a[1]);break;case"BigInt":i[s]=BigInt(a[1]);break;case"null":const h=Object.create(null);i[s]=h;for(let d=1;d<a.length;d+=2)h[a[d]]=r(a[d+1]);break;default:throw new Error(`Unknown type ${l}`)}}else{const l=new Array(a.length);i[s]=l;for(let c=0;c<a.length;c+=1){const u=a[c];u!==aE&&(l[c]=r(u))}}else{const l={};i[s]=l;for(const c in a){const u=a[c];l[c]=r(u)}}return i[s]}return r(0)}function pE(n){return Array.isArray(n)?n:[n]}const mE=["title","titleTemplate","script","style","noscript"],hl=["base","meta","link","style","script","noscript"],_E=["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"],gE=["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"],Hg=["tagPosition","tagPriority","tagDuplicateStrategy","children","innerHTML","textContent","processTemplateParams"],vE=typeof window<"u";function mh(n){let e=9;for(let t=0;t<n.length;)e=Math.imul(e^n.charCodeAt(t++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function Xd(n){return n._h||mh(n._d?n._d:`${n.tag}:${n.textContent||n.innerHTML||""}:${Object.entries(n.props).map(([e,t])=>`${e}:${String(t)}`).join(",")}`)}function Gg(n,e){const{props:t,tag:i}=n;if(gE.includes(i))return i;if(i==="link"&&t.rel==="canonical")return"canonical";if(t.charset)return"charset";const r=["id"];i==="meta"&&r.push("name","property","http-equiv");for(const s of r)if(typeof t[s]<"u"){const o=String(t[s]);return e&&!e(o)?!1:`${i}:${s}:${o}`}return!1}function qd(n,e){return n==null?e||null:typeof n=="function"?n(e):n}function Vg(n,e){const t=[],i=e.resolveKeyData||(s=>s.key),r=e.resolveValueData||(s=>s.value);for(const[s,o]of Object.entries(n))t.push(...(Array.isArray(o)?o:[o]).map(a=>{const l={key:s,value:a},c=r(l);return typeof c=="object"?Vg(c,e):Array.isArray(c)?c:{[typeof e.key=="function"?e.key(l):e.key]:i(l),[typeof e.value=="function"?e.value(l):e.value]:c}}).flat());return t}function Wg(n,e){return Object.entries(n).map(([t,i])=>{if(typeof i=="object"&&(i=Wg(i,e)),e.resolve){const r=e.resolve({key:t,value:i});if(r)return r}return typeof i=="number"&&(i=i.toString()),typeof i=="string"&&e.wrapValue&&(i=i.replace(new RegExp(e.wrapValue,"g"),`\\${e.wrapValue}`),i=`${e.wrapValue}${i}${e.wrapValue}`),`${t}${e.keyValueSeparator||""}${i}`}).join(e.entrySeparator||"")}const Qt=n=>({keyValue:n,metaKey:"property"}),Bc=n=>({keyValue:n}),_h={appleItunesApp:{unpack:{entrySeparator:", ",resolve({key:n,value:e}){return`${Pi(n)}=${e}`}}},articleExpirationTime:Qt("article:expiration_time"),articleModifiedTime:Qt("article:modified_time"),articlePublishedTime:Qt("article:published_time"),bookReleaseDate:Qt("book:release_date"),charset:{metaKey:"charset"},contentSecurityPolicy:{unpack:{entrySeparator:"; ",resolve({key:n,value:e}){return`${Pi(n)} ${e}`}},metaKey:"http-equiv"},contentType:{metaKey:"http-equiv"},defaultStyle:{metaKey:"http-equiv"},fbAppId:Qt("fb:app_id"),msapplicationConfig:Bc("msapplication-Config"),msapplicationTileColor:Bc("msapplication-TileColor"),msapplicationTileImage:Bc("msapplication-TileImage"),ogAudioSecureUrl:Qt("og:audio:secure_url"),ogAudioUrl:Qt("og:audio"),ogImageSecureUrl:Qt("og:image:secure_url"),ogImageUrl:Qt("og:image"),ogSiteName:Qt("og:site_name"),ogVideoSecureUrl:Qt("og:video:secure_url"),ogVideoUrl:Qt("og:video"),profileFirstName:Qt("profile:first_name"),profileLastName:Qt("profile:last_name"),profileUsername:Qt("profile:username"),refresh:{metaKey:"http-equiv",unpack:{entrySeparator:";",resolve({key:n,value:e}){if(n==="seconds")return`${e}`}}},robots:{unpack:{entrySeparator:", ",resolve({key:n,value:e}){return typeof e=="boolean"?`${Pi(n)}`:`${Pi(n)}:${e}`}}},xUaCompatible:{metaKey:"http-equiv"}},jg=["og","book","article","profile"];function Xg(n){var t;const e=Pi(n).split(":")[0];return jg.includes(e)?"property":((t=_h[n])==null?void 0:t.metaKey)||"name"}function xE(n){var e;return((e=_h[n])==null?void 0:e.keyValue)||Pi(n)}function Pi(n){const e=n.replace(/([A-Z])/g,"-$1").toLowerCase(),t=e.split("-")[0];return jg.includes(t)||t==="twitter"?n.replace(/([A-Z])/g,":$1").toLowerCase():e}function ef(n){if(Array.isArray(n))return n.map(t=>ef(t));if(typeof n!="object"||Array.isArray(n))return n;const e={};for(const[t,i]of Object.entries(n))e[Pi(t)]=ef(i);return e}function yE(n,e){const t=_h[e];return e==="refresh"?`${n.seconds};url=${n.url}`:Wg(ef(n),{keyValueSeparator:"=",entrySeparator:", ",resolve({value:i,key:r}){if(i===null)return"";if(typeof i=="boolean")return`${r}`},...t==null?void 0:t.unpack})}const qg=["og:image","og:video","og:audio","twitter:image"];function $g(n){const e={};return Object.entries(n).forEach(([t,i])=>{String(i)!=="false"&&t&&(e[t]=i)}),e}function $d(n,e){const t=$g(e),i=Pi(n),r=Xg(i);if(qg.includes(i)){const s={};return Object.entries(t).forEach(([o,a])=>{s[`${n}${o==="url"?"":`${o.charAt(0).toUpperCase()}${o.slice(1)}`}`]=a}),Yg(s).sort((o,a)=>{var l,c;return(((l=o[r])==null?void 0:l.length)||0)-(((c=a[r])==null?void 0:c.length)||0)})}return[{[r]:i,...t}]}function Yg(n){const e=[],t={};Object.entries(n).forEach(([r,s])=>{if(!Array.isArray(s)){if(typeof s=="object"&&s){if(qg.includes(Pi(r))){e.push(...$d(r,s));return}t[r]=$g(s)}else t[r]=s;return}s.forEach(o=>{e.push(...typeof o=="string"?Yg({[r]:o}):$d(r,o))})});const i=Vg(t,{key({key:r}){return Xg(r)},value({key:r}){return r==="charset"?"charset":"content"},resolveKeyData({key:r}){return xE(r)},resolveValueData({value:r,key:s}){return r===null?"_null":typeof r=="object"?yE(r,s):typeof r=="number"?r.toString():r}});return[...e,...i].map(r=>(r.content==="_null"&&(r.content=null),r))}async function SE(n,e,t){const i={tag:n,props:await Kg(typeof e=="object"&&typeof e!="function"&&!(e instanceof Promise)?{...e}:{[["script","noscript","style"].includes(n)?"innerHTML":"textContent"]:e},["templateParams","titleTemplate"].includes(n))};return Hg.forEach(r=>{const s=typeof i.props[r]<"u"?i.props[r]:t[r];typeof s<"u"&&((!["innerHTML","textContent","children"].includes(r)||mE.includes(i.tag))&&(i[r==="children"?"innerHTML":r]=s),delete i.props[r])}),i.props.body&&(i.tagPosition="bodyClose",delete i.props.body),i.tag==="script"&&typeof i.innerHTML=="object"&&(i.innerHTML=JSON.stringify(i.innerHTML),i.props.type=i.props.type||"application/json"),Array.isArray(i.props.content)?i.props.content.map(r=>({...i,props:{...i.props,content:r}})):i}function ME(n){return typeof n=="object"&&!Array.isArray(n)&&(n=Object.keys(n).filter(e=>n[e])),(Array.isArray(n)?n.join(" "):n).split(" ").filter(e=>e.trim()).filter(Boolean).join(" ")}async function Kg(n,e){for(const t of Object.keys(n)){if(t==="class"){n[t]=ME(n[t]);continue}if(n[t]instanceof Promise&&(n[t]=await n[t]),!e&&!Hg.includes(t)){const i=String(n[t]),r=t.startsWith("data-");i==="true"||i===""?n[t]=r?"true":!0:n[t]||(r&&i==="false"?n[t]="false":delete n[t])}}return n}const EE=10;async function bE(n){const e=[];return Object.entries(n.resolvedInput).filter(([t,i])=>typeof i<"u"&&_E.includes(t)).forEach(([t,i])=>{const r=pE(i);e.push(...r.map(s=>SE(t,s,n)).flat())}),(await Promise.all(e)).flat().filter(Boolean).map((t,i)=>(t._e=n._i,n.mode&&(t._m=n.mode),t._p=(n._i<<EE)+i,t))}const Yd={base:-10,title:10},Kd={critical:-80,high:-10,low:20};function Il(n){let e=100;const t=n.tagPriority;return typeof t=="number"?t:(n.tag==="meta"?(n.props["http-equiv"]==="content-security-policy"&&(e=-30),n.props.charset&&(e=-20),n.props.name==="viewport"&&(e=-15)):n.tag==="link"&&n.props.rel==="preconnect"?e=20:n.tag in Yd&&(e=Yd[n.tag]),typeof t=="string"&&t in Kd?e+Kd[t]:e)}const TE=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}],Zg=["onload","onerror","onabort","onprogress","onloadstart"],Xi="%separator";function dl(n,e,t){if(typeof n!="string"||!n.includes("%"))return n;function i(o){let a;return["s","pageTitle"].includes(o)?a=e.pageTitle:o.includes(".")?a=o.split(".").reduce((l,c)=>l&&l[c]||void 0,e):a=e[o],typeof a<"u"?(a||"").replace(/"/g,'\\"'):!1}let r=n;try{r=decodeURI(n)}catch{}return(r.match(/%(\w+\.+\w+)|%(\w+)/g)||[]).sort().reverse().forEach(o=>{const a=i(o.slice(1));typeof a=="string"&&(n=n.replace(new RegExp(`\\${o}(\\W|$)`,"g"),(l,c)=>`${a}${c}`).trim())}),n.includes(Xi)&&(n.endsWith(Xi)&&(n=n.slice(0,-Xi.length).trim()),n.startsWith(Xi)&&(n=n.slice(Xi.length).trim()),n=n.replace(new RegExp(`\\${Xi}\\s*\\${Xi}`,"g"),Xi),n=dl(n,{separator:t},t)),n}async function wE(n){const e={tag:n.tagName.toLowerCase(),props:await Kg(n.getAttributeNames().reduce((t,i)=>({...t,[i]:n.getAttribute(i)}),{})),innerHTML:n.innerHTML};return e._d=Gg(e),e}async function Jg(n,e={}){var u;const t=e.document||n.resolvedOptions.document;if(!t)return;const i={shouldRender:n.dirty,tags:[]};if(await n.hooks.callHook("dom:beforeRender",i),!i.shouldRender)return;const r=(await n.resolveTags()).map(f=>({tag:f,id:hl.includes(f.tag)?Xd(f):f.tag,shouldRender:!0}));let s=n._dom;if(!s){s={elMap:{htmlAttrs:t.documentElement,bodyAttrs:t.body}};for(const f of["body","head"]){const h=(u=t==null?void 0:t[f])==null?void 0:u.children;for(const d of[...h].filter(g=>hl.includes(g.tagName.toLowerCase())))s.elMap[d.getAttribute("data-hid")||Xd(await wE(d))]=d}}s.pendingSideEffects={...s.sideEffects||{}},s.sideEffects={};function o(f,h,d){const g=`${f}:${h}`;s.sideEffects[g]=d,delete s.pendingSideEffects[g]}function a({id:f,$el:h,tag:d}){const g=d.tag.endsWith("Attrs");s.elMap[f]=h,g||(["textContent","innerHTML"].forEach(_=>{d[_]&&d[_]!==h[_]&&(h[_]=d[_])}),o(f,"el",()=>{s.elMap[f].remove(),delete s.elMap[f]})),Object.entries(d.props).forEach(([_,m])=>{const p=`attr:${_}`;if(_==="class")for(const x of(m||"").split(" ").filter(Boolean))g&&o(f,`${p}:${x}`,()=>h.classList.remove(x)),!h.classList.contains(x)&&h.classList.add(x);else h.getAttribute(_)!==m&&h.setAttribute(_,m===!0?"":String(m)),g&&o(f,p,()=>h.removeAttribute(_))})}const l=[],c={bodyClose:void 0,bodyOpen:void 0,head:void 0};for(const f of r){const{tag:h,shouldRender:d,id:g}=f;if(d){if(h.tag==="title"){t.title=h.textContent;continue}f.$el=f.$el||s.elMap[g],f.$el?a(f):hl.includes(h.tag)&&l.push(f)}}for(const f of l){const h=f.tag.tagPosition||"head";f.$el=t.createElement(f.tag.tag),a(f),c[h]=c[h]||t.createDocumentFragment(),c[h].appendChild(f.$el)}for(const f of r)await n.hooks.callHook("dom:renderTag",f,t,o);c.head&&t.head.appendChild(c.head),c.bodyOpen&&t.body.insertBefore(c.bodyOpen,t.body.firstChild),c.bodyClose&&t.body.appendChild(c.bodyClose),Object.values(s.pendingSideEffects).forEach(f=>f()),n._dom=s,n.dirty=!1,await n.hooks.callHook("dom:rendered",{renders:r})}async function AE(n,e={}){const t=e.delayFn||(i=>setTimeout(i,10));return n._domUpdatePromise=n._domUpdatePromise||new Promise(i=>t(async()=>{await Jg(n,e),delete n._domUpdatePromise,i()}))}function CE(n){return e=>{var i,r;const t=((r=(i=e.resolvedOptions.document)==null?void 0:i.head.querySelector('script[id="unhead:payload"]'))==null?void 0:r.innerHTML)||!1;return t&&e.push(JSON.parse(t)),{mode:"client",hooks:{"entries:updated":function(s){AE(s,n)}}}}}const RE=["templateParams","htmlAttrs","bodyAttrs"],PE={hooks:{"tag:normalise":function({tag:n}){["hid","vmid","key"].forEach(i=>{n.props[i]&&(n.key=n.props[i],delete n.props[i])});const t=Gg(n)||(n.key?`${n.tag}:${n.key}`:!1);t&&(n._d=t)},"tags:resolve":function(n){const e={};n.tags.forEach(i=>{const r=(i.key?`${i.tag}:${i.key}`:i._d)||i._p,s=e[r];if(s){let a=i==null?void 0:i.tagDuplicateStrategy;if(!a&&RE.includes(i.tag)&&(a="merge"),a==="merge"){const l=s.props;["class","style"].forEach(c=>{l[c]&&(i.props[c]?(c==="style"&&!l[c].endsWith(";")&&(l[c]+=";"),i.props[c]=`${l[c]} ${i.props[c]}`):i.props[c]=l[c])}),e[r].props={...l,...i.props};return}else if(i._e===s._e){s._duped=s._duped||[],i._d=`${s._d}:${s._duped.length+1}`,s._duped.push(i);return}else if(Il(i)>Il(s))return}const o=Object.keys(i.props).length+(i.innerHTML?1:0)+(i.textContent?1:0);if(hl.includes(i.tag)&&o===0){delete e[r];return}e[r]=i});const t=[];Object.values(e).forEach(i=>{const r=i._duped;delete i._duped,t.push(i),r&&t.push(...r)}),n.tags=t,n.tags=n.tags.filter(i=>!(i.tag==="meta"&&(i.props.name||i.props.property)&&!i.props.content))}}},LE={mode:"server",hooks:{"tags:resolve":function(n){const e={};n.tags.filter(t=>["titleTemplate","templateParams","title"].includes(t.tag)&&t._m==="server").forEach(t=>{e[t.tag]=t.tag.startsWith("title")?t.textContent:t.props}),Object.keys(e).length&&n.tags.push({tag:"script",innerHTML:JSON.stringify(e),props:{id:"unhead:payload",type:"application/json"}})}}},DE=["script","link","bodyAttrs"];function IE(n){const e={},t={};return Object.entries(n.props).forEach(([i,r])=>{i.startsWith("on")&&typeof r=="function"?(Zg.includes(i)&&(e[i]=`this.dataset.${i} = true`),t[i]=r):e[i]=r}),{props:e,eventHandlers:t}}const UE=n=>({hooks:{"tags:resolve":function(e){for(const t of e.tags)if(DE.includes(t.tag)){const{props:i,eventHandlers:r}=IE(t);t.props=i,Object.keys(r).length&&((t.props.src||t.props.href)&&(t.key=t.key||mh(t.props.src||t.props.href)),t._eventHandlers=r)}},"dom:renderTag":function(e,t,i){if(!e.tag._eventHandlers)return;const r=e.tag.tag==="bodyAttrs"?t.defaultView:e.$el;Object.entries(e.tag._eventHandlers).forEach(([s,o])=>{const a=`${e.tag._d||e.tag._p}:${s}`,l=s.slice(2).toLowerCase(),c=`data-h-${l}`;if(i(e.id,a,()=>{}),e.$el.hasAttribute(c))return;e.$el.setAttribute(c,"");let u;const f=h=>{o(h),u==null||u.disconnect()};s in e.$el.dataset?f(new Event(s.replace("on",""))):Zg.includes(s)&&typeof MutationObserver<"u"?(u=new MutationObserver(h=>{h.some(g=>g.attributeName===`data-${s}`)&&(f(new Event(s.replace("on",""))),u==null||u.disconnect())}),u.observe(e.$el,{attributes:!0})):r.addEventListener(l,f),i(e.id,a,()=>{u==null||u.disconnect(),r.removeEventListener(l,f),e.$el.removeAttribute(c)})})}}}),NE=["link","style","script","noscript"],OE={hooks:{"tag:normalise":({tag:n})=>{n.key&&NE.includes(n.tag)&&(n.props["data-hid"]=n._h=mh(n.key))}}},FE={hooks:{"tags:resolve":n=>{const e=t=>{var i;return(i=n.tags.find(r=>r._d===t))==null?void 0:i._p};for(const{prefix:t,offset:i}of TE)for(const r of n.tags.filter(s=>typeof s.tagPriority=="string"&&s.tagPriority.startsWith(t))){const s=e(r.tagPriority.replace(t,""));typeof s<"u"&&(r._p=s+i)}n.tags.sort((t,i)=>t._p-i._p).sort((t,i)=>Il(t)-Il(i))}}},kE={meta:"content",link:"href",htmlAttrs:"lang"},BE=n=>({hooks:{"tags:resolve":e=>{var a;const{tags:t}=e,i=(a=t.find(l=>l.tag==="title"))==null?void 0:a.textContent,r=t.findIndex(l=>l.tag==="templateParams"),s=r!==-1?t[r].props:{},o=s.separator||"|";delete s.separator,s.pageTitle=dl(s.pageTitle||i||"",s,o);for(const l of t.filter(c=>c.processTemplateParams!==!1)){const c=kE[l.tag];c&&typeof l.props[c]=="string"?l.props[c]=dl(l.props[c],s,o):(l.processTemplateParams===!0||["titleTemplate","title"].includes(l.tag))&&["innerHTML","textContent"].forEach(u=>{typeof l[u]=="string"&&(l[u]=dl(l[u],s,o))})}n._templateParams=s,n._separator=o,e.tags=t.filter(l=>l.tag!=="templateParams")}}}),zE={hooks:{"tags:resolve":n=>{const{tags:e}=n;let t=e.findIndex(r=>r.tag==="titleTemplate");const i=e.findIndex(r=>r.tag==="title");if(i!==-1&&t!==-1){const r=qd(e[t].textContent,e[i].textContent);r!==null?e[i].textContent=r||e[i].textContent:delete e[i]}else if(t!==-1){const r=qd(e[t].textContent);r!==null&&(e[t].textContent=r,e[t].tag="title",t=-1)}t!==-1&&delete e[t],n.tags=e.filter(Boolean)}}},HE={hooks:{"tags:afterResolve":function(n){for(const e of n.tags)typeof e.innerHTML=="string"&&(e.innerHTML&&["application/ld+json","application/json"].includes(e.props.type)?e.innerHTML=e.innerHTML.replace(/</g,"\\u003C"):e.innerHTML=e.innerHTML.replace(new RegExp(`</${e.tag}`,"g"),`<\\/${e.tag}`))}}};let Qg;function GE(n={}){const e=VE(n);return e.use(CE()),Qg=e}function Zd(n,e){return!n||n==="server"&&e||n==="client"&&!e}function VE(n={}){const e=Bg();e.addHooks(n.hooks||{}),n.document=n.document||(vE?document:void 0);const t=!n.document,i=()=>{a.dirty=!0,e.callHook("entries:updated",a)};let r=0,s=[];const o=[],a={plugins:o,dirty:!1,resolvedOptions:n,hooks:e,headEntries(){return s},use(l){const c=typeof l=="function"?l(a):l;(!c.key||!o.some(u=>u.key===c.key))&&(o.push(c),Zd(c.mode,t)&&e.addHooks(c.hooks||{}))},push(l,c){c==null||delete c.head;const u={_i:r++,input:l,...c};return Zd(u.mode,t)&&(s.push(u),i()),{dispose(){s=s.filter(f=>f._i!==u._i),e.callHook("entries:updated",a),i()},patch(f){s=s.map(h=>(h._i===u._i&&(h.input=u.input=f),h)),i()}}},async resolveTags(){const l={tags:[],entries:[...s]};await e.callHook("entries:resolve",l);for(const c of l.entries){const u=c.resolvedInput||c.input;if(c.resolvedInput=await(c.transform?c.transform(u):u),c.resolvedInput)for(const f of await bE(c)){const h={tag:f,entry:c,resolvedOptions:a.resolvedOptions};await e.callHook("tag:normalise",h),l.tags.push(h.tag)}}return await e.callHook("tags:beforeResolve",l),await e.callHook("tags:resolve",l),await e.callHook("tags:afterResolve",l),l.tags},ssr:t};return[PE,LE,UE,OE,FE,BE,zE,HE,...(n==null?void 0:n.plugins)||[]].forEach(l=>a.use(l)),a.hooks.callHook("init",a),a}function WE(){return Qg}const jE=bg.startsWith("3");function XE(n){return typeof n=="function"?n():ht(n)}function Ul(n,e=""){if(n instanceof Promise)return n;const t=XE(n);return!n||!t?t:Array.isArray(t)?t.map(i=>Ul(i,e)):typeof t=="object"?Object.fromEntries(Object.entries(t).map(([i,r])=>i==="titleTemplate"||i.startsWith("on")?[i,ht(r)]:[i,Ul(r,i)])):t}const qE={hooks:{"entries:resolve":function(n){for(const e of n.entries)e.resolvedInput=Ul(e.input)}}},ev="usehead";function $E(n){return{install(t){jE&&(t.config.globalProperties.$unhead=n,t.config.globalProperties.$head=n,t.provide(ev,n))}}.install}function YE(n={}){n.domDelayFn=n.domDelayFn||(t=>Er(()=>setTimeout(()=>t(),0)));const e=GE(n);return e.use(qE),e.install=$E(e),e}const tf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},nf="__unhead_injection_handler__";function KE(n){tf[nf]=n}function ZE(){if(nf in tf)return tf[nf]();const n=on(ev);return n||WE()}function JE(n,e={}){const t=e.head||ZE();if(t)return t.ssr?t.push(n,e):QE(t,n,e)}function QE(n,e,t={}){const i=At(!1),r=At({});Cy(()=>{r.value=i.value?{}:Ul(e)});const s=n.push(r.value,t);return $r(r,a=>{s.patch(a)}),ic()&&(ma(()=>{s.dispose()}),sh(()=>{i.value=!0}),rh(()=>{i.value=!1})),s}function eb(n){return{ctx:{table:n},matchAll:e=>nv(e,n)}}function tv(n){const e={};for(const t in n)e[t]=t==="dynamic"?new Map(Object.entries(n[t]).map(([i,r])=>[i,tv(r)])):new Map(Object.entries(n[t]));return e}function tb(n){return eb(tv(n))}function nv(n,e){const t=[];for(const[r,s]of Jd(e.wildcard))n.startsWith(r)&&t.push(s);for(const[r,s]of Jd(e.dynamic))if(n.startsWith(r+"/")){const o="/"+n.slice(r.length).split("/").splice(2).join("/");t.push(...nv(o,s))}const i=e.static.get(n);return i&&t.push(i),t.filter(Boolean)}function Jd(n){return[...n.entries()].sort((e,t)=>e[0].length-t[0].length)}function zc(n){if(n===null||typeof n!="object")return!1;const e=Object.getPrototypeOf(n);return e!==null&&e!==Object.prototype&&Object.getPrototypeOf(e)!==null||Symbol.iterator in n?!1:Symbol.toStringTag in n?Object.prototype.toString.call(n)==="[object Module]":!0}function rf(n,e,t=".",i){if(!zc(e))return rf(n,{},t,i);const r=Object.assign({},e);for(const s in n){if(s==="__proto__"||s==="constructor")continue;const o=n[s];o!=null&&(i&&i(r,s,o,t)||(Array.isArray(o)&&Array.isArray(r[s])?r[s]=[...o,...r[s]]:zc(o)&&zc(r[s])?r[s]=rf(o,r[s],(t?`${t}.`:"")+s.toString(),i):r[s]=o))}return r}function iv(n){return(...e)=>e.reduce((t,i)=>rf(t,i,"",n),{})}const ac=iv(),nb=iv((n,e,t)=>{if(n[e]!==void 0&&typeof t=="function")return n[e]=t(n[e]),!0});function ib(n,e){try{return e in n}catch{return!1}}var rb=Object.defineProperty,sb=(n,e,t)=>e in n?rb(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,kr=(n,e,t)=>(sb(n,typeof e!="symbol"?e+"":e,t),t);class sf extends Error{constructor(e,t={}){super(e,t),kr(this,"statusCode",500),kr(this,"fatal",!1),kr(this,"unhandled",!1),kr(this,"statusMessage"),kr(this,"data"),kr(this,"cause"),t.cause&&!this.cause&&(this.cause=t.cause)}toJSON(){const e={message:this.message,statusCode:af(this.statusCode,500)};return this.statusMessage&&(e.statusMessage=rv(this.statusMessage)),this.data!==void 0&&(e.data=this.data),e}}kr(sf,"__h3_error__",!0);function of(n){if(typeof n=="string")return new sf(n);if(ob(n))return n;const e=new sf(n.message??n.statusMessage??"",{cause:n.cause||n});if(ib(n,"stack"))try{Object.defineProperty(e,"stack",{get(){return n.stack}})}catch{try{e.stack=n.stack}catch{}}if(n.data&&(e.data=n.data),n.statusCode?e.statusCode=af(n.statusCode,e.statusCode):n.status&&(e.statusCode=af(n.status,e.statusCode)),n.statusMessage?e.statusMessage=n.statusMessage:n.statusText&&(e.statusMessage=n.statusText),e.statusMessage){const t=e.statusMessage;rv(e.statusMessage)!==t&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return n.fatal!==void 0&&(e.fatal=n.fatal),n.unhandled!==void 0&&(e.unhandled=n.unhandled),e}function ob(n){var e;return((e=n==null?void 0:n.constructor)==null?void 0:e.__h3_error__)===!0}const ab=/[^\u0009\u0020-\u007E]/g;function rv(n=""){return n.replace(ab,"")}function af(n,e=200){return!n||(typeof n=="string"&&(n=Number.parseInt(n,10)),n<100||n>999)?e:n}const lb=Symbol("layout-meta"),lc=Symbol("route"),sv="__nuxt_error",cc=()=>z_(st().payload,"error"),Is=n=>{const e=gh(n);try{const t=st(),i=cc();t.hooks.callHook("app:error",e),i.value=i.value||e}catch{throw e}return e},cb=async(n={})=>{const e=st(),t=cc();e.callHook("app:error:cleared",n),n.redirect&&await Ln().replace(n.redirect),t.value=null},ub=n=>!!n&&typeof n=="object"&&sv in n,gh=n=>{const e=of(n);return Object.defineProperty(e,sv,{value:!0,configurable:!1,writable:!1}),e},Ln=()=>{var n;return(n=st())==null?void 0:n.$router},Tr=()=>lg()?on(lc,st()._route):st()._route;const fb=()=>{try{if(st()._processingMiddleware)return!0}catch{return!0}return!1},hb=(n,e)=>{n||(n="/");const t=typeof n=="string"?n:Ug(n.path||"/",n.query||{})+(n.hash||"");if(e!=null&&e.open){{const{target:a="_blank",windowFeatures:l={}}=e.open,c=Object.entries(l).filter(([u,f])=>f!==void 0).map(([u,f])=>`${u.toLowerCase()}=${f}`).join(", ");open(t,a,c)}return Promise.resolve()}const i=(e==null?void 0:e.external)||Ni(t,{acceptRelative:!0});if(i){if(!(e!=null&&e.external))throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");const a=ho(t).protocol;if(a&&hM(a))throw new Error(`Cannot navigate to a URL with '${a}' protocol.`)}const r=fb();if(!i&&r)return n;const s=Ln(),o=st();return i?(o._scope.stop(),e!=null&&e.replace?location.replace(t):location.href=t,r?o.isHydrating?new Promise(()=>{}):!1:Promise.resolve()):e!=null&&e.replace?s.replace(n):s.push(n)},db={nuxt:{buildId:"a253c121-7574-43ea-a498-3c8dd86fe4e0"}},pb=nb(db);function mb(){const n=st();return n._appConfig||(n._appConfig=Ii(pb)),n._appConfig}const lf=!1,_b=!1,gb={componentName:"NuxtLink"},vb="#__nuxt";let pl,ov;function xb(){var e;const n=(e=mb().nuxt)==null?void 0:e.buildId;return pl=$fetch(dh(`builds/meta/${n}.json`)),pl.then(t=>{ov=tb(t.matcher)}),pl}function uc(){return pl||xb()}async function av(n){return await uc(),ac({},...ov.matchAll(n).reverse())}function Qd(n,e={}){const t=yb(n,e),i=st(),r=i._payloadCache=i._payloadCache||{};return t in r||(r[t]=Sb(n).then(s=>s?lv(t).then(o=>o||(delete r[t],null)):(r[t]=null,null))),r[t]}const ep="json";function yb(n,e={}){const t=new URL(n,"http://localhost");if(t.search)throw new Error("Payload URL cannot contain search params: "+n);if(t.host!=="localhost"||Ni(t.pathname,{acceptRelative:!0}))throw new Error("Payload URL must not include hostname: "+n);const i=e.hash||(e.fresh?Date.now():"");return Oi(ga().app.baseURL,t.pathname,i?`_payload.${i}.${ep}`:`_payload.${ep}`)}async function lv(n){const e=fetch(n).then(t=>t.text().then(cv));try{return await e}catch(t){console.warn("[nuxt] Cannot load payload ",n,t)}return null}async function Sb(n=Tr().path){if(n=oc(n),(await uc()).prerendered.includes(n))return!0;const t=await av(n);return!!t.prerender&&!t.redirect}let Oa=null;async function Mb(){if(Oa)return Oa;const n=document.getElementById("__NUXT_DATA__");if(!n)return{};const e=cv(n.textContent||""),t=n.dataset.src?await lv(n.dataset.src):void 0;return Oa={...e,...t,...window.__NUXT__},Oa}function cv(n){return hE(n,st()._payloadRevivers)}function Eb(n,e){st()._payloadRevivers[n]=e}const tp={NuxtError:n=>gh(n),EmptyShallowRef:n=>Xo(n==="_"?void 0:n==="0n"?BigInt(0):Ll(n)),EmptyRef:n=>At(n==="_"?void 0:n==="0n"?BigInt(0):Ll(n)),ShallowRef:n=>Xo(n),ShallowReactive:n=>ha(n),Ref:n=>At(n),Reactive:n=>Ii(n)},bb=br({name:"nuxt:revive-payload:client",order:-30,async setup(n){let e,t;for(const i in tp)Eb(i,tp[i]);Object.assign(n.payload,([e,t]=Jo(()=>n.runWithContext(Mb)),e=await e,t(),e)),window.__NUXT__=n.payload}}),Tb=[],wb=br({name:"nuxt:head",enforce:"pre",setup(n){const e=YE({plugins:Tb});KE(()=>st().vueApp._context.provides.usehead),n.vueApp.use(e);{let t=!0;const i=async()=>{t=!1,await Jg(e)};e.hooks.hook("dom:beforeRender",r=>{r.shouldRender=!t}),n.hooks.hook("page:start",()=>{t=!0}),n.hooks.hook("page:finish",()=>{n.isHydrating||i()}),n.hooks.hook("app:error",i),n.hooks.hook("app:suspense:resolve",i)}}});/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Ls=typeof window<"u";function Ab(n){return n.__esModule||n[Symbol.toStringTag]==="Module"}const et=Object.assign;function Hc(n,e){const t={};for(const i in e){const r=e[i];t[i]=ri(r)?r.map(n):n(r)}return t}const Fo=()=>{},ri=Array.isArray,Cb=/\/$/,Rb=n=>n.replace(Cb,"");function Gc(n,e,t="/"){let i,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(i=e.slice(0,l),s=e.slice(l+1,a>-1?a:e.length),r=n(s)),a>-1&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=Ib(i??e,t),{fullPath:i+(s&&"?")+s+o,path:i,query:r,hash:o}}function Pb(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function np(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function Lb(n,e,t){const i=e.matched.length-1,r=t.matched.length-1;return i>-1&&i===r&&Js(e.matched[i],t.matched[r])&&uv(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Js(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function uv(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!Db(n[t],e[t]))return!1;return!0}function Db(n,e){return ri(n)?ip(n,e):ri(e)?ip(e,n):n===e}function ip(n,e){return ri(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function Ib(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=t.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+i.slice(o-(o===i.length?1:0)).join("/")}var Qo;(function(n){n.pop="pop",n.push="push"})(Qo||(Qo={}));var ko;(function(n){n.back="back",n.forward="forward",n.unknown=""})(ko||(ko={}));function Ub(n){if(!n)if(Ls){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Rb(n)}const Nb=/^[^#]+#/;function Ob(n,e){return n.replace(Nb,"#")+e}function Fb(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const fc=()=>({left:window.pageXOffset,top:window.pageYOffset});function kb(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=Fb(r,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function rp(n,e){return(history.state?history.state.position-e:-1)+n}const cf=new Map;function Bb(n,e){cf.set(n,e)}function zb(n){const e=cf.get(n);return cf.delete(n),e}let Hb=()=>location.protocol+"//"+location.host;function fv(n,e){const{pathname:t,search:i,hash:r}=e,s=n.indexOf("#");if(s>-1){let a=r.includes(n.slice(s))?n.slice(s).length:1,l=r.slice(a);return l[0]!=="/"&&(l="/"+l),np(l,"")}return np(t,n)+i+r}function Gb(n,e,t,i){let r=[],s=[],o=null;const a=({state:h})=>{const d=fv(n,location),g=t.value,_=e.value;let m=0;if(h){if(t.value=d,e.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(d);r.forEach(p=>{p(t.value,g,{delta:m,type:Qo.pop,direction:m?m>0?ko.forward:ko.back:ko.unknown})})};function l(){o=t.value}function c(h){r.push(h);const d=()=>{const g=r.indexOf(h);g>-1&&r.splice(g,1)};return s.push(d),d}function u(){const{history:h}=window;h.state&&h.replaceState(et({},h.state,{scroll:fc()}),"")}function f(){for(const h of s)h();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function sp(n,e,t,i=!1,r=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:r?fc():null}}function Vb(n){const{history:e,location:t}=window,i={value:fv(n,t)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=n.indexOf("#"),h=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+l:Hb()+n+l;try{e[u?"replaceState":"pushState"](c,"",h),r.value=c}catch(d){console.error(d),t[u?"replace":"assign"](h)}}function o(l,c){const u=et({},e.state,sp(r.value.back,l,r.value.forward,!0),c,{position:r.value.position});s(l,u,!0),i.value=l}function a(l,c){const u=et({},r.value,e.state,{forward:l,scroll:fc()});s(u.current,u,!0);const f=et({},sp(i.value,l,null),{position:u.position+1},c);s(l,f,!1),i.value=l}return{location:i,state:r,push:a,replace:o}}function hv(n){n=Ub(n);const e=Vb(n),t=Gb(n,e.state,e.location,e.replace);function i(s,o=!0){o||t.pauseListeners(),history.go(s)}const r=et({location:"",base:n,go:i,createHref:Ob.bind(null,n)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function Wb(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),hv(n)}function jb(n){return typeof n=="string"||n&&typeof n=="object"}function dv(n){return typeof n=="string"||typeof n=="symbol"}const Qn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},pv=Symbol("");var op;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(op||(op={}));function Qs(n,e){return et(new Error,{type:n,[pv]:!0},e)}function yi(n,e){return n instanceof Error&&pv in n&&(e==null||!!(n.type&e))}const ap="[^/]+?",Xb={sensitive:!1,strict:!1,start:!0,end:!0},qb=/[.+*?^${}()[\]/\\]/g;function $b(n,e){const t=et({},Xb,e),i=[];let r=t.start?"^":"";const s=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(r+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=40+(t.sensitive?.25:0);if(h.type===0)f||(r+="/"),r+=h.value.replace(qb,"\\$&"),d+=40;else if(h.type===1){const{value:g,repeatable:_,optional:m,regexp:p}=h;s.push({name:g,repeatable:_,optional:m});const x=p||ap;if(x!==ap){d+=10;try{new RegExp(`(${x})`)}catch(S){throw new Error(`Invalid custom RegExp for param "${g}" (${x}): `+S.message)}}let v=_?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;f||(v=m&&c.length<2?`(?:/${v})`:"/"+v),m&&(v+="?"),r+=v,d+=20,m&&(d+=-8),_&&(d+=-20),x===".*"&&(d+=-50)}u.push(d)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}t.strict||(r+="/?"),t.end?r+="$":t.strict&&(r+="(?:/|$)");const o=new RegExp(r,t.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=s[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===0)u+=d.value;else if(d.type===1){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(ri(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const x=ri(p)?p.join("/"):p;if(!x)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=x}}return u||"/"}return{re:o,score:i,keys:s,parse:a,stringify:l}}function Yb(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Kb(n,e){let t=0;const i=n.score,r=e.score;for(;t<i.length&&t<r.length;){const s=Yb(i[t],r[t]);if(s)return s;t++}if(Math.abs(r.length-i.length)===1){if(lp(i))return 1;if(lp(r))return-1}return r.length-i.length}function lp(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Zb={type:0,value:""},Jb=/[a-zA-Z0-9_]/;function Qb(n){if(!n)return[[]];if(n==="/")return[[Zb]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(d){throw new Error(`ERR (${t})/"${c}": ${d}`)}let t=0,i=t;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(t===0?s.push({type:0,value:c}):t===1||t===2||t===3?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&t!==2){i=t,t=4;continue}switch(t){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),t=1):h();break;case 4:h(),t=i;break;case 1:l==="("?t=2:Jb.test(l)?h():(f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),r}function eT(n,e,t){const i=$b(Qb(n.path),t),r=et(i,{record:n,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function tT(n,e){const t=[],i=new Map;e=fp({strict:!1,end:!0,sensitive:!1},e);function r(u){return i.get(u)}function s(u,f,h){const d=!h,g=nT(u);g.aliasOf=h&&h.record;const _=fp(e,u),m=[g];if("alias"in u){const v=typeof u.alias=="string"?[u.alias]:u.alias;for(const S of v)m.push(et({},g,{components:h?h.record.components:g.components,path:S,aliasOf:h?h.record:g}))}let p,x;for(const v of m){const{path:S}=v;if(f&&S[0]!=="/"){const b=f.record.path,E=b[b.length-1]==="/"?"":"/";v.path=f.record.path+(S&&E+S)}if(p=eT(v,f,_),h?h.alias.push(p):(x=x||p,x!==p&&x.alias.push(p),d&&u.name&&!up(p)&&o(u.name)),g.children){const b=g.children;for(let E=0;E<b.length;E++)s(b[E],p,h&&h.children[E])}h=h||p,(p.record.components&&Object.keys(p.record.components).length||p.record.name||p.record.redirect)&&l(p)}return x?()=>{o(x)}:Fo}function o(u){if(dv(u)){const f=i.get(u);f&&(i.delete(u),t.splice(t.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=t.indexOf(u);f>-1&&(t.splice(f,1),u.record.name&&i.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return t}function l(u){let f=0;for(;f<t.length&&Kb(u,t[f])>=0&&(u.record.path!==t[f].record.path||!mv(u,t[f]));)f++;t.splice(f,0,u),u.record.name&&!up(u)&&i.set(u.record.name,u)}function c(u,f){let h,d={},g,_;if("name"in u&&u.name){if(h=i.get(u.name),!h)throw Qs(1,{location:u});_=h.record.name,d=et(cp(f.params,h.keys.filter(x=>!x.optional).map(x=>x.name)),u.params&&cp(u.params,h.keys.map(x=>x.name))),g=h.stringify(d)}else if("path"in u)g=u.path,h=t.find(x=>x.re.test(g)),h&&(d=h.parse(g),_=h.record.name);else{if(h=f.name?i.get(f.name):t.find(x=>x.re.test(f.path)),!h)throw Qs(1,{location:u,currentLocation:f});_=h.record.name,d=et({},f.params,u.params),g=h.stringify(d)}const m=[];let p=h;for(;p;)m.unshift(p.record),p=p.parent;return{name:_,path:g,params:d,matched:m,meta:rT(m)}}return n.forEach(u=>s(u)),{addRoute:s,resolve:c,removeRoute:o,getRoutes:a,getRecordMatcher:r}}function cp(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function nT(n){return{path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:void 0,beforeEnter:n.beforeEnter,props:iT(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}}}function iT(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function up(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function rT(n){return n.reduce((e,t)=>et(e,t.meta),{})}function fp(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}function mv(n,e){return e.children.some(t=>t===n||mv(n,t))}const _v=/#/g,sT=/&/g,oT=/\//g,aT=/=/g,lT=/\?/g,gv=/\+/g,cT=/%5B/g,uT=/%5D/g,vv=/%5E/g,fT=/%60/g,xv=/%7B/g,hT=/%7C/g,yv=/%7D/g,dT=/%20/g;function vh(n){return encodeURI(""+n).replace(hT,"|").replace(cT,"[").replace(uT,"]")}function pT(n){return vh(n).replace(xv,"{").replace(yv,"}").replace(vv,"^")}function uf(n){return vh(n).replace(gv,"%2B").replace(dT,"+").replace(_v,"%23").replace(sT,"%26").replace(fT,"`").replace(xv,"{").replace(yv,"}").replace(vv,"^")}function mT(n){return uf(n).replace(aT,"%3D")}function _T(n){return vh(n).replace(_v,"%23").replace(lT,"%3F")}function gT(n){return n==null?"":_T(n).replace(oT,"%2F")}function Nl(n){try{return decodeURIComponent(""+n)}catch{}return""+n}function vT(n){const e={};if(n===""||n==="?")return e;const i=(n[0]==="?"?n.slice(1):n).split("&");for(let r=0;r<i.length;++r){const s=i[r].replace(gv," "),o=s.indexOf("="),a=Nl(o<0?s:s.slice(0,o)),l=o<0?null:Nl(s.slice(o+1));if(a in e){let c=e[a];ri(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function hp(n){let e="";for(let t in n){const i=n[t];if(t=mT(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(ri(i)?i.map(s=>s&&uf(s)):[i&&uf(i)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+t,s!=null&&(e+="="+s))})}return e}function xT(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=ri(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const xh=Symbol(""),dp=Symbol(""),yh=Symbol(""),Sv=Symbol(""),ff=Symbol("");function vo(){let n=[];function e(i){return n.push(i),()=>{const r=n.indexOf(i);r>-1&&n.splice(r,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Mv(n,e,t){const i=()=>{n[e].delete(t)};oh(i),sh(i),rh(()=>{n[e].add(t)}),n[e].add(t)}function JI(n){const e=on(xh,{}).value;e&&Mv(e,"leaveGuards",n)}function QI(n){const e=on(xh,{}).value;e&&Mv(e,"updateGuards",n)}function ir(n,e,t,i,r){const s=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((o,a)=>{const l=f=>{f===!1?a(Qs(4,{from:t,to:e})):f instanceof Error?a(f):jb(f)?a(Qs(2,{from:e,to:f})):(s&&i.enterCallbacks[r]===s&&typeof f=="function"&&s.push(f),o())},c=n.call(i&&i.instances[r],e,t,l);let u=Promise.resolve(c);n.length<3&&(u=u.then(l)),u.catch(f=>a(f))})}function Vc(n,e,t,i){const r=[];for(const s of n)for(const o in s.components){let a=s.components[o];if(!(e!=="beforeRouteEnter"&&!s.instances[o]))if(yT(a)){const c=(a.__vccOpts||a)[e];c&&r.push(ir(c,t,i,s,o))}else{let l=a();r.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${s.path}"`));const u=Ab(c)?c.default:c;s.components[o]=u;const h=(u.__vccOpts||u)[e];return h&&ir(h,t,i,s,o)()}))}}return r}function yT(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function pp(n){const e=on(yh),t=on(Sv),i=St(()=>e.resolve(ht(n.to))),r=St(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=t.matched;if(!u||!f.length)return-1;const h=f.findIndex(Js.bind(null,u));if(h>-1)return h;const d=mp(l[c-2]);return c>1&&mp(u)===d&&f[f.length-1].path!==d?f.findIndex(Js.bind(null,l[c-2])):h}),s=St(()=>r.value>-1&&bT(t.params,i.value.params)),o=St(()=>r.value>-1&&r.value===t.matched.length-1&&uv(t.params,i.value.params));function a(l={}){return ET(l)?e[ht(n.replace)?"replace":"push"](ht(n.to)).catch(Fo):Promise.resolve()}return{route:i,href:St(()=>i.value.href),isActive:s,isExactActive:o,navigate:a}}const ST=fo({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:pp,setup(n,{slots:e}){const t=Ii(pp(n)),{options:i}=on(yh),r=St(()=>({[_p(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[_p(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&e.default(t);return n.custom?s:qn("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},s)}}}),MT=ST;function ET(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function bT(n,e){for(const t in e){const i=e[t],r=n[t];if(typeof i=="string"){if(i!==r)return!1}else if(!ri(r)||r.length!==i.length||i.some((s,o)=>s!==r[o]))return!1}return!0}function mp(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const _p=(n,e,t)=>n??e??t,TT=fo({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=on(ff),r=St(()=>n.route||i.value),s=on(dp,0),o=St(()=>{let c=ht(s);const{matched:u}=r.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=St(()=>r.value.matched[o.value]);Vs(dp,St(()=>o.value+1)),Vs(xh,a),Vs(ff,r);const l=At();return $r(()=>[l.value,a.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!Js(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=r.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return gp(t.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=qn(h,et({},g,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return gp(t.default,{Component:m,route:c})||m}}});function gp(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const Ev=TT;function wT(n){const e=tT(n.routes,n),t=n.parseQuery||vT,i=n.stringifyQuery||hp,r=n.history,s=vo(),o=vo(),a=vo(),l=Xo(Qn);let c=Qn;Ls&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Hc.bind(null,G=>""+G),f=Hc.bind(null,gT),h=Hc.bind(null,Nl);function d(G,fe){let ae,re;return dv(G)?(ae=e.getRecordMatcher(G),re=fe):re=G,e.addRoute(re,ae)}function g(G){const fe=e.getRecordMatcher(G);fe&&e.removeRoute(fe)}function _(){return e.getRoutes().map(G=>G.record)}function m(G){return!!e.getRecordMatcher(G)}function p(G,fe){if(fe=et({},fe||l.value),typeof G=="string"){const P=Gc(t,G,fe.path),B=e.resolve({path:P.path},fe),j=r.createHref(P.fullPath);return et(P,B,{params:h(B.params),hash:Nl(P.hash),redirectedFrom:void 0,href:j})}let ae;if("path"in G)ae=et({},G,{path:Gc(t,G.path,fe.path).path});else{const P=et({},G.params);for(const B in P)P[B]==null&&delete P[B];ae=et({},G,{params:f(P)}),fe.params=f(fe.params)}const re=e.resolve(ae,fe),Ee=G.hash||"";re.params=u(h(re.params));const W=Pb(i,et({},G,{hash:pT(Ee),path:re.path})),R=r.createHref(W);return et({fullPath:W,hash:Ee,query:i===hp?xT(G.query):G.query||{}},re,{redirectedFrom:void 0,href:R})}function x(G){return typeof G=="string"?Gc(t,G,l.value.path):et({},G)}function v(G,fe){if(c!==G)return Qs(8,{from:fe,to:G})}function S(G){return T(G)}function b(G){return S(et(x(G),{replace:!0}))}function E(G){const fe=G.matched[G.matched.length-1];if(fe&&fe.redirect){const{redirect:ae}=fe;let re=typeof ae=="function"?ae(G):ae;return typeof re=="string"&&(re=re.includes("?")||re.includes("#")?re=x(re):{path:re},re.params={}),et({query:G.query,hash:G.hash,params:"path"in re?{}:G.params},re)}}function T(G,fe){const ae=c=p(G),re=l.value,Ee=G.state,W=G.force,R=G.replace===!0,P=E(ae);if(P)return T(et(x(P),{state:typeof P=="object"?et({},Ee,P.state):Ee,force:W,replace:R}),fe||ae);const B=ae;B.redirectedFrom=fe;let j;return!W&&Lb(i,re,ae)&&(j=Qs(16,{to:B,from:re}),le(re,re,!0,!1)),(j?Promise.resolve(j):w(B,re)).catch(J=>yi(J)?yi(J,2)?J:ue(J):H(J,B,re)).then(J=>{if(J){if(yi(J,2))return T(et({replace:R},x(J.to),{state:typeof J.to=="object"?et({},Ee,J.to.state):Ee,force:W}),fe||B)}else J=U(B,re,!0,R,Ee);return N(B,re,J),J})}function L(G,fe){const ae=v(G,fe);return ae?Promise.reject(ae):Promise.resolve()}function y(G){const fe=se.values().next().value;return fe&&typeof fe.runWithContext=="function"?fe.runWithContext(G):G()}function w(G,fe){let ae;const[re,Ee,W]=AT(G,fe);ae=Vc(re.reverse(),"beforeRouteLeave",G,fe);for(const P of re)P.leaveGuards.forEach(B=>{ae.push(ir(B,G,fe))});const R=L.bind(null,G,fe);return ae.push(R),Se(ae).then(()=>{ae=[];for(const P of s.list())ae.push(ir(P,G,fe));return ae.push(R),Se(ae)}).then(()=>{ae=Vc(Ee,"beforeRouteUpdate",G,fe);for(const P of Ee)P.updateGuards.forEach(B=>{ae.push(ir(B,G,fe))});return ae.push(R),Se(ae)}).then(()=>{ae=[];for(const P of W)if(P.beforeEnter)if(ri(P.beforeEnter))for(const B of P.beforeEnter)ae.push(ir(B,G,fe));else ae.push(ir(P.beforeEnter,G,fe));return ae.push(R),Se(ae)}).then(()=>(G.matched.forEach(P=>P.enterCallbacks={}),ae=Vc(W,"beforeRouteEnter",G,fe),ae.push(R),Se(ae))).then(()=>{ae=[];for(const P of o.list())ae.push(ir(P,G,fe));return ae.push(R),Se(ae)}).catch(P=>yi(P,8)?P:Promise.reject(P))}function N(G,fe,ae){a.list().forEach(re=>y(()=>re(G,fe,ae)))}function U(G,fe,ae,re,Ee){const W=v(G,fe);if(W)return W;const R=fe===Qn,P=Ls?history.state:{};ae&&(re||R?r.replace(G.fullPath,et({scroll:R&&P&&P.scroll},Ee)):r.push(G.fullPath,Ee)),l.value=G,le(G,fe,ae,R),ue()}let $;function D(){$||($=r.listen((G,fe,ae)=>{if(!me.listening)return;const re=p(G),Ee=E(re);if(Ee){T(et(Ee,{replace:!0}),re).catch(Fo);return}c=re;const W=l.value;Ls&&Bb(rp(W.fullPath,ae.delta),fc()),w(re,W).catch(R=>yi(R,12)?R:yi(R,2)?(T(R.to,re).then(P=>{yi(P,20)&&!ae.delta&&ae.type===Qo.pop&&r.go(-1,!1)}).catch(Fo),Promise.reject()):(ae.delta&&r.go(-ae.delta,!1),H(R,re,W))).then(R=>{R=R||U(re,W,!1),R&&(ae.delta&&!yi(R,8)?r.go(-ae.delta,!1):ae.type===Qo.pop&&yi(R,20)&&r.go(-1,!1)),N(re,W,R)}).catch(Fo)}))}let k=vo(),O=vo(),V;function H(G,fe,ae){ue(G);const re=O.list();return re.length?re.forEach(Ee=>Ee(G,fe,ae)):console.error(G),Promise.reject(G)}function ne(){return V&&l.value!==Qn?Promise.resolve():new Promise((G,fe)=>{k.add([G,fe])})}function ue(G){return V||(V=!G,D(),k.list().forEach(([fe,ae])=>G?ae(G):fe()),k.reset()),G}function le(G,fe,ae,re){const{scrollBehavior:Ee}=n;if(!Ls||!Ee)return Promise.resolve();const W=!ae&&zb(rp(G.fullPath,0))||(re||!ae)&&history.state&&history.state.scroll||null;return Er().then(()=>Ee(G,fe,W)).then(R=>R&&kb(R)).catch(R=>H(R,G,fe))}const pe=G=>r.go(G);let Y;const se=new Set,me={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,hasRoute:m,getRoutes:_,resolve:p,options:n,push:S,replace:b,go:pe,back:()=>pe(-1),forward:()=>pe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:O.add,isReady:ne,install(G){const fe=this;G.component("RouterLink",MT),G.component("RouterView",Ev),G.config.globalProperties.$router=fe,Object.defineProperty(G.config.globalProperties,"$route",{enumerable:!0,get:()=>ht(l)}),Ls&&!Y&&l.value===Qn&&(Y=!0,S(r.location).catch(Ee=>{}));const ae={};for(const Ee in Qn)Object.defineProperty(ae,Ee,{get:()=>l.value[Ee],enumerable:!0});G.provide(yh,fe),G.provide(Sv,ha(ae)),G.provide(ff,l);const re=G.unmount;se.add(G),G.unmount=function(){se.delete(G),se.size<1&&(c=Qn,$&&$(),$=null,l.value=Qn,Y=!1,V=!1),re()}}};function Se(G){return G.reduce((fe,ae)=>fe.then(()=>y(ae)),Promise.resolve())}return me}function AT(n,e){const t=[],i=[],r=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(c=>Js(c,a))?i.push(a):t.push(a));const l=n.matched[o];l&&(e.matched.find(c=>Js(c,l))||r.push(l))}return[t,i,r]}const CT=(n,e)=>e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var i;return((i=n.params[t.slice(1)])==null?void 0:i.toString())||""}),hf=(n,e)=>{const t=n.route.matched.find(r=>{var s;return((s=r.components)==null?void 0:s.default)===n.Component.type}),i=e??(t==null?void 0:t.meta.key)??(t&&CT(n.route,t));return typeof i=="function"?i(n.route):i},RT=(n,e)=>({default:()=>n?qn(Uy,n===!0?{}:n,e):e});function Sh(n){return Array.isArray(n)?n:[n]}const vp=[{name:"about",path:"/about",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./about.wuPJUxES.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url).then(n=>n.default||n)},{name:"contact",path:"/contact",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./contact.5J0mNTDC.js"),__vite__mapDeps([7,1,2,3,4,8]),import.meta.url).then(n=>n.default||n)},{name:"credits",path:"/credits",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./credits.LmM-MM2m.js"),__vite__mapDeps([9,1,2,3,4,5,10]),import.meta.url).then(n=>n.default||n)},{name:"index",path:"/",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./index.RBReaNWn.js"),__vite__mapDeps([11,1,2,4,12]),import.meta.url).then(n=>n.default||n)},{name:"mentions",path:"/mentions",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./mentions.A_dGPzE5.js"),__vite__mapDeps([13,1,2,3,4,5,14]),import.meta.url).then(n=>n.default||n)},{name:"photos",path:"/photos",children:[{name:"photos-uid",path:":uid()",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./_uid_.e7ziI-6D.js"),__vite__mapDeps([15,1,2,3,16,17,18]),import.meta.url).then(n=>n.default||n)}],meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./photos.jZmgP-aG.js"),__vite__mapDeps([19,1,2,20,21,3,17,5]),import.meta.url).then(n=>n.default||n)},{name:"projets-perso-uid",path:"/projets-perso/:uid()",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./_uid_.tI3hxnW-.js"),__vite__mapDeps([22,1,2,5,16,17,23]),import.meta.url).then(n=>n.default||n)},{name:"videos",path:"/videos",children:[{name:"videos-uid",path:":uid()",meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./_uid_.xkI1xbsi.js"),__vite__mapDeps([24,1,2,3,16,17,25]),import.meta.url).then(n=>n.default||n)}],meta:{},alias:[],redirect:void 0,component:()=>ai(()=>import("./videos.xtz6wMJn.js"),__vite__mapDeps([26,1,2,20,21,3,17,5]),import.meta.url).then(n=>n.default||n)}],PT=(n,e,t)=>(e=e===!0?{}:e,{default:()=>{var i;return e?qn(n,e,t):(i=t.default)==null?void 0:i.call(t)}});function xp(n){const e=(n==null?void 0:n.meta.key)??n.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var i;return((i=n.params[t.slice(1)])==null?void 0:i.toString())||""});return typeof e=="function"?e(n):e}function LT(n,e){return n===e||e===Qn?!1:xp(n)!==xp(e)?!0:!n.matched.every((i,r)=>{var s,o;return i.components&&i.components.default===((o=(s=e.matched[r])==null?void 0:s.components)==null?void 0:o.default)})}const DT={scrollBehavior(n,e,t){var c;const i=st(),r=((c=Ln().options)==null?void 0:c.scrollBehaviorType)??"auto";let s=t||void 0;const o=typeof n.meta.scrollToTop=="function"?n.meta.scrollToTop(n,e):n.meta.scrollToTop;if(!s&&e&&n&&o!==!1&&LT(n,e)&&(s={left:0,top:0}),n.path===e.path){if(e.hash&&!n.hash)return{left:0,top:0};if(n.hash)return{el:n.hash,top:yp(n.hash),behavior:r}}const a=u=>!!(u.meta.pageTransition??lf),l=a(e)&&a(n)?"page:transition:finish":"page:finish";return new Promise(u=>{i.hooks.hookOnce(l,async()=>{await Er(),n.hash&&(s={el:n.hash,top:yp(n.hash),behavior:r}),u(s)})})}};function yp(n){try{const e=document.querySelector(n);if(e)return parseFloat(getComputedStyle(e).scrollMarginTop)}catch{}return 0}const IT={hashMode:!1,scrollBehaviorType:"auto"},ln={...IT,...DT},UT=async n=>{var l;let e,t;if(!((l=n.meta)!=null&&l.validate))return;const i=st(),r=Ln();if(([e,t]=Jo(()=>Promise.resolve(n.meta.validate(n))),e=await e,t(),e)===!0)return;const o=gh({statusCode:404,statusMessage:`Page Not Found: ${n.fullPath}`,data:{path:n.fullPath}}),a=r.beforeResolve(c=>{if(a(),c===n){const u=r.afterEach(async()=>{u(),await i.runWithContext(()=>Is(o)),window.history.pushState({},"",n.fullPath)});return!1}})},NT=async n=>{let e,t;const i=([e,t]=Jo(()=>av(n.path)),e=await e,t(),e);if(i.redirect)return i.redirect},OT=[UT,NT],Bo={};function FT(n,e,t){const{pathname:i,search:r,hash:s}=e,o=n.indexOf("#");if(o>-1){const c=s.includes(n.slice(o))?n.slice(o).length:1;let u=s.slice(c);return u[0]!=="/"&&(u="/"+u),zd(u,"")}const a=zd(i,n),l=!t||vM(a,t,{trailingSlash:!0})?a:t;return l+(l.includes("?")?"":r)+s}const kT=br({name:"nuxt:router",enforce:"pre",async setup(n){var _,m;let e,t,i=ga().app.baseURL;ln.hashMode&&!i.includes("#")&&(i+="#");const r=((_=ln.history)==null?void 0:_.call(ln,i))??(ln.hashMode?Wb(i):hv(i)),s=((m=ln.routes)==null?void 0:m.call(ln,vp))??vp;let o;const a=FT(i,window.location,n.payload.path),l=wT({...ln,scrollBehavior:(p,x,v)=>{var S;if(x===Qn){o=v;return}return l.options.scrollBehavior=ln.scrollBehavior,(S=ln.scrollBehavior)==null?void 0:S.call(ln,p,Qn,o||v)},history:r,routes:s});n.vueApp.use(l);const c=Xo(l.currentRoute.value);l.afterEach((p,x)=>{c.value=x}),Object.defineProperty(n.vueApp.config.globalProperties,"previousRoute",{get:()=>c.value});const u=Xo(l.resolve(a)),f=()=>{u.value=l.currentRoute.value};n.hook("page:finish",f),l.afterEach((p,x)=>{var v,S,b,E;((S=(v=p.matched[0])==null?void 0:v.components)==null?void 0:S.default)===((E=(b=x.matched[0])==null?void 0:b.components)==null?void 0:E.default)&&f()});const h={};for(const p in u.value)Object.defineProperty(h,p,{get:()=>u.value[p]});n._route=ha(h),n._middleware=n._middleware||{global:[],named:{}};const d=cc();try{[e,t]=Jo(()=>l.isReady()),await e,t()}catch(p){[e,t]=Jo(()=>n.runWithContext(()=>Is(p))),await e,t()}const g=n.payload.state._layout;return l.beforeEach(async(p,x)=>{var v;await n.callHook("page:loading:start"),p.meta=Ii(p.meta),n.isHydrating&&g&&!os(p.meta.layout)&&(p.meta.layout=g),n._processingMiddleware=!0;{const S=new Set([...OT,...n._middleware.global]);for(const b of p.matched){const E=b.meta.middleware;if(E)for(const T of Sh(E))S.add(T)}for(const b of S){const E=typeof b=="string"?n._middleware.named[b]||await((v=Bo[b])==null?void 0:v.call(Bo).then(L=>L.default||L)):b;if(!E)throw new Error(`Unknown route middleware: '${b}'.`);const T=await n.runWithContext(()=>E(p,x));if(!n.payload.serverRendered&&n.isHydrating&&(T===!1||T instanceof Error)){const L=T||of({statusCode:404,statusMessage:`Page Not Found: ${a}`});return await n.runWithContext(()=>Is(L)),!1}if(T!==!0&&(T||T===!1))return T}}}),l.onError(async()=>{delete n._processingMiddleware,await n.callHook("page:loading:end")}),l.afterEach(async(p,x,v)=>{delete n._processingMiddleware,!n.isHydrating&&d.value&&await n.runWithContext(cb),v&&await n.callHook("page:loading:end"),p.matched.length===0&&await n.runWithContext(()=>Is(of({statusCode:404,fatal:!1,statusMessage:`Page not found: ${p.fullPath}`,data:{path:p.fullPath}})))}),n.hooks.hookOnce("app:created",async()=>{try{await l.replace({...l.resolve(a),name:void 0,force:!0}),l.options.scrollBehavior=ln.scrollBehavior}catch(p){await n.runWithContext(()=>Is(p))}}),{provide:{router:l}}}}),df=globalThis.requestIdleCallback||(n=>{const e=Date.now(),t={didTimeout:!1,timeRemaining:()=>Math.max(0,50-(Date.now()-e))};return setTimeout(()=>{n(t)},1)}),BT=globalThis.cancelIdleCallback||(n=>{clearTimeout(n)}),Mh=n=>{const e=st();e.isHydrating?e.hooks.hookOnce("app:suspense:resolve",()=>{df(n)}):df(n)},zT=br({name:"nuxt:payload",setup(n){Ln().beforeResolve(async(e,t)=>{if(e.path===t.path)return;const i=await Qd(e.path);i&&Object.assign(n.static.data,i.data)}),Mh(()=>{var e;n.hooks.hook("link:prefetch",async t=>{ho(t).protocol||await Qd(t)}),((e=navigator.connection)==null?void 0:e.effectiveType)!=="slow-2g"&&setTimeout(uc,1e3)})}}),HT=br(n=>{let e;async function t(){const i=await uc();e&&clearTimeout(e),e=setTimeout(t,1e3*60*60);const r=await $fetch(dh("builds/latest.json"));r.id!==i.id&&n.hooks.callHook("app:manifest:update",r)}Mh(()=>{e=setTimeout(t,1e3*60*60)})}),GT=br({name:"nuxt:global-components"}),Fa={},VT=br({name:"nuxt:prefetch",setup(n){const e=Ln();n.hooks.hook("app:mounted",()=>{e.beforeEach(async t=>{var r;const i=(r=t==null?void 0:t.meta)==null?void 0:r.layout;i&&typeof Fa[i]=="function"&&await Fa[i]()})}),n.hooks.hook("link:prefetch",t=>{if(Ni(t))return;const i=e.resolve(t);if(!i)return;const r=i.meta.layout;let s=Sh(i.meta.middleware);s=s.filter(o=>typeof o=="string");for(const o of s)typeof Bo[o]=="function"&&Bo[o]();r&&typeof Fa[r]=="function"&&Fa[r]()})}});function WT(n={}){const e=n.path||window.location.pathname;let t={};try{t=Ll(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(n.force||(t==null?void 0:t.path)!==e||(t==null?void 0:t.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:e,expires:Date.now()+(n.ttl??1e4)}))}catch{}if(n.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:st().payload.state}))}catch{}window.location.pathname!==e?window.location.href=e:window.location.reload()}}const jT=br({name:"nuxt:chunk-reload",setup(n){const e=Ln(),t=ga(),i=new Set;e.beforeEach(()=>{i.clear()}),n.hook("app:chunkError",({error:s})=>{i.add(s)});function r(s){const a="href"in s&&s.href[0]==="#"?t.app.baseURL+s.href:Oi(t.app.baseURL,s.fullPath);WT({path:a,persistState:!0})}n.hook("app:manifest:update",()=>{e.beforeResolve(r)}),e.onError((s,o)=>{i.has(s)&&r(o)})}}),XT=[bb,wb,kT,zT,HT,GT,VT,jT],qT="$s";function bn(...n){const e=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(e);const[t,i]=n;if(!t||typeof t!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+t);if(i!==void 0&&typeof i!="function")throw new Error("[nuxt] [useState] init must be a function: "+i);const r=qT+t,s=st(),o=z_(s.payload.state,r);if(o.value===void 0&&i){const a=i();if(Gt(a))return s.payload.state[r]=a,a;o.value=a}return o}function eU(){const n=document.getElementById("container");n.style.pointerEvents="none"}function tU(){const n=document.getElementById("container");n.style.pointerEvents="auto"}function $T(n){const e=document.getElementById(n);e.style.pointerEvents="auto"}function YT(n){const e=document.getElementById(n);e.style.pointerEvents="none"}function Sp(n,e){let t=e?"none":"auto";document.querySelectorAll(n).forEach(r=>{r.style.pointerEvents=t})}function KT(){let n=document.getElementById("navHeader");if(!n)return;n.querySelectorAll(".button-link").forEach(t=>{t.parentElement&&t.parentElement.classList.contains("router-link-active")?setTimeout(()=>{t.classList.add("is-active")},1e3):t.classList.remove("is-active")})}function ZT(n){const e=document.querySelector(".router-link-active");if(!e)return;const t=e.querySelector(".button-link");if(t)setTimeout(()=>{t.classList.add("is-active")},1e3);else{const i=document.querySelectorAll(".nav-link");if(i[1]){const r=i[1].querySelector(".button-link");setTimeout(()=>{r&&r.classList.add("is-active")},1e3)}}}function Ai(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function bv(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Cn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},eo={duration:.5,overwrite:!1,delay:0},Eh,Yt,yt,Wn=1e8,rt=1/Wn,pf=Math.PI*2,JT=pf/4,QT=0,Tv=Math.sqrt,ew=Math.cos,tw=Math.sin,Ot=function(e){return typeof e=="string"},Mt=function(e){return typeof e=="function"},Fi=function(e){return typeof e=="number"},bh=function(e){return typeof e>"u"},vi=function(e){return typeof e=="object"},dn=function(e){return e!==!1},Th=function(){return typeof window<"u"},ka=function(e){return Mt(e)||Ot(e)},wv=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Kt=Array.isArray,mf=/(?:-?\.?\d|\.)+/gi,Av=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Us=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Wc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Cv=/[+-]=-?[.\d]+/,Rv=/[^,'"\[\]\s]+/gi,nw=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,_t,Fn,_f,wh,Pn={},Ol={},Pv,Lv=function(e){return(Ol=as(e,Pn))&&yn},Ah=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ea=function(e,t){return!t&&console.warn(e)},Dv=function(e,t){return e&&(Pn[e]=t)&&Ol&&(Ol[e]=t)||Pn},ta=function(){return 0},iw={suppressEvents:!0,isStart:!0,kill:!1},ml={suppressEvents:!0,kill:!1},rw={suppressEvents:!0},Ch={},dr=[],gf={},Iv,Tn={},jc={},Mp=30,_l=[],Rh="",Ph=function(e){var t=e[0],i,r;if(vi(t)||Mt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=_l.length;r--&&!_l[r].targetTest(t););i=_l[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new i0(e[r],i)))||e.splice(r,1);return e},Kr=function(e){return e._gsap||Ph(jn(e))[0]._gsap},Uv=function(e,t,i){return(i=e[t])&&Mt(i)?e[t]():bh(i)&&e.getAttribute&&e.getAttribute(t)||i},pn=function(e,t){return(e=e.split(",")).forEach(t)||e},bt=function(e){return Math.round(e*1e5)/1e5||0},Ut=function(e){return Math.round(e*1e7)/1e7||0},Ws=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},sw=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Fl=function(){var e=dr.length,t=dr.slice(0),i,r;for(gf={},dr.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Nv=function(e,t,i,r){dr.length&&!Yt&&Fl(),e.render(t,i,r||Yt&&t<0&&(e._initted||e._startAt)),dr.length&&!Yt&&Fl()},Ov=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Rv).length<2?t:Ot(e)?e.trim():e},Fv=function(e){return e},$n=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},ow=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},as=function(e,t){for(var i in t)e[i]=t[i];return e},Ep=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=vi(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},kl=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},zo=function(e){var t=e.parent||_t,i=e.keyframes?ow(Kt(e.keyframes)):$n;if(dn(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},aw=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},kv=function(e,t,i,r,s){i===void 0&&(i="_first"),r===void 0&&(r="_last");var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},hc=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},xr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Zr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},lw=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},vf=function(e,t,i,r){return e._startAt&&(Yt?e._startAt.revert(ml):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},cw=function n(e){return!e||e._ts&&n(e.parent)},bp=function(e){return e._repeat?to(e._tTime,e=e.duration()+e._rDelay)*e:0},to=function(e,t){var i=Math.floor(e/=t);return e&&i===e?i-1:i},Bl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},dc=function(e){return e._end=Ut(e._start+(e._tDur/Math.abs(e._ts||e._rts||rt)||0))},pc=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Ut(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),dc(e),i._dirty||Zr(i,e)),e},Bv=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Bl(e.rawTime(),t),(!t._dur||va(0,t.totalDuration(),i)-t._tTime>rt)&&t.render(i,!0)),Zr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-rt}},fi=function(e,t,i,r){return t.parent&&xr(t),t._start=Ut((Fi(i)?i:i||e!==_t?Nn(e,i,t):e._time)+t._delay),t._end=Ut(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),kv(e,t,"_first","_last",e._sort?"_start":0),xf(t)||(e._recent=t),r||Bv(e,t),e._ts<0&&pc(e,e._tTime),e},zv=function(e,t){return(Pn.ScrollTrigger||Ah("scrollTrigger",t))&&Pn.ScrollTrigger.create(t,e)},Hv=function(e,t,i,r,s){if(Dh(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!Yt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Iv!==wn.frame)return dr.push(e),e._lazy=[s,r],1},uw=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},xf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},fw=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&uw(e)&&!(!e._initted&&xf(e))||(e._ts<0||e._dp._ts<0)&&!xf(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=va(0,e._tDur,t),u=to(l,a),e._yoyo&&u&1&&(o=1-o),u!==to(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Yt||r||e._zTime===rt||!t&&e._zTime){if(!e._initted&&Hv(e,t,r,i,l))return;for(f=e._zTime,e._zTime=t||(i?rt:0),i||(i=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&vf(e,t,i,!0),e._onUpdate&&!i&&An(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&An(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&xr(e,1),!i&&!Yt&&(An(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},hw=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},no=function(e,t,i,r){var s=e._repeat,o=Ut(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ut(o*(s+1)+e._rDelay*s):o,a>0&&!r&&pc(e,e._tTime=e._tDur*a),e.parent&&dc(e),i||Zr(e.parent,e),e},Tp=function(e){return e instanceof sn?Zr(e):no(e,e._dur)},dw={_start:0,endTime:ta,totalDuration:ta},Nn=function n(e,t,i){var r=e.labels,s=e._recent||dw,o=e.duration()>=Wn?s.endTime(!1):e._dur,a,l,c;return Ot(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(Kt(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},Ho=function(e,t,i){var r=Fi(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=dn(l.vars.inherit)&&l.parent;o.immediateRender=dn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new wt(t[0],o,t[s+1])},wr=function(e,t){return e||e===0?t(e):t},va=function(e,t,i){return i<e?e:i>t?t:i},$t=function(e,t){return!Ot(e)||!(t=nw.exec(e))?"":t[1]},pw=function(e,t,i){return wr(i,function(r){return va(e,t,r)})},yf=[].slice,Gv=function(e,t){return e&&vi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&vi(e[0]))&&!e.nodeType&&e!==Fn},mw=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Ot(r)&&!t||Gv(r,1)?(s=i).push.apply(s,jn(r)):i.push(r)})||i},jn=function(e,t,i){return yt&&!t&&yt.selector?yt.selector(e):Ot(e)&&!i&&(_f||!io())?yf.call((t||wh).querySelectorAll(e),0):Kt(e)?mw(e,i):Gv(e)?yf.call(e,0):e?[e]:[]},Sf=function(e){return e=jn(e)[0]||ea("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return jn(t,i.querySelectorAll?i:i===e?ea("Invalid scope")||wh.createElement("div"):e)}},Vv=function(e){return e.sort(function(){return .5-Math.random()})},Wv=function(e){if(Mt(e))return e;var t=vi(e)?e:{each:e},i=Jr(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,f=r;return Ot(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var _=(g||t).length,m=o[_],p,x,v,S,b,E,T,L,y;if(!m){if(y=t.grid==="auto"?0:(t.grid||[1,Wn])[1],!y){for(T=-Wn;T<(T=g[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(m=o[_]=[],p=l?Math.min(y,_)*u-.5:r%y,x=y===Wn?0:l?_*f/y-.5:r/y|0,T=0,L=Wn,E=0;E<_;E++)v=E%y-p,S=x-(E/y|0),m[E]=b=c?Math.abs(c==="y"?S:v):Tv(v*v+S*S),b>T&&(T=b),b<L&&(L=b);r==="random"&&Vv(m),m.max=T-L,m.min=L,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(y>_?_-1:c?c==="y"?_/y:y:Math.max(y,_/y))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=$t(t.amount||t.each)||0,i=i&&_<0?e0(i):i}return _=(m[h]-m.min)/m.max||0,Ut(m.b+(i?i(_):_)*m.v)+m.u}},Mf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Ut(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(Fi(i)?0:$t(i))}},jv=function(e,t){var i=Kt(e),r,s;return!i&&vi(e)&&(r=i=e.radius||Wn,e.values?(e=jn(e.values),(s=!Fi(e[0]))&&(r*=r)):e=Mf(e.increment)),wr(t,i?Mt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Wn,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||Fi(o)?u:u+$t(o)}:Mf(e))},Xv=function(e,t,i,r){return wr(Kt(e)?!t:i===!0?!!(i=0):!r,function(){return Kt(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},_w=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},gw=function(e,t){return function(i){return e(parseFloat(i))+(t||$t(i))}},vw=function(e,t,i){return $v(e,t,0,1,i)},qv=function(e,t,i){return wr(i,function(r){return e[~~t(r)]})},xw=function n(e,t,i){var r=t-e;return Kt(e)?qv(e,n(0,e.length),t):wr(i,function(s){return(r+(s-e)%r)%r+e})},yw=function n(e,t,i){var r=t-e,s=r*2;return Kt(e)?qv(e,n(0,e.length-1),t):wr(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},na=function(e){for(var t=0,i="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?Rv:mf),i+=e.substr(t,r-t)+Xv(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return i+e.substr(t,e.length-t)},$v=function(e,t,i,r,s){var o=t-e,a=r-i;return wr(s,function(l){return i+((l-e)/o*a||0)})},Sw=function n(e,t,i,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=Ot(e),a={},l,c,u,f,h;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(Kt(e)&&!Kt(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(n(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},i=t}else r||(e=as(Kt(e)?[]:{},e));if(!u){for(l in t)Lh.call(a,e,l,"get",t[l]);s=function(g){return Nh(g,a)||(o?e.p:e)}}}return wr(i,s)},wp=function(e,t,i){var r=e.labels,s=Wn,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},An=function(e,t,i){var r=e.vars,s=r[t],o=yt,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,i&&dr.length&&Fl(),a&&(yt=a),u=l?s.apply(c,l):s.call(c),yt=o,u},Co=function(e){return xr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Yt),e.progress()<1&&An(e,"onInterrupt"),e},Ns,Yv=[],Kv=function(e){if(Th()&&e){e=!e.name&&e.default||e;var t=e.name,i=Mt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:ta,render:Nh,add:Lh,kill:Fw,modifier:Ow,rawVars:0},o={targetTest:0,get:0,getSetter:Uh,aliases:{},register:0};if(io(),e!==r){if(Tn[t])return;$n(r,$n(kl(e,s),o)),as(r.prototype,as(s,kl(e,o))),Tn[r.prop=t]=r,e.targetTest&&(_l.push(r),Ch[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Dv(t,r),e.register&&e.register(yn,r,mn)}else e&&Yv.push(e)},it=255,Ro={aqua:[0,it,it],lime:[0,it,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,it],navy:[0,0,128],white:[it,it,it],olive:[128,128,0],yellow:[it,it,0],orange:[it,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[it,0,0],pink:[it,192,203],cyan:[0,it,it],transparent:[it,it,it,0]},Xc=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*it+.5|0},Zv=function(e,t,i){var r=e?Fi(e)?[e>>16,e>>8&it,e&it]:0:Ro.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ro[e])r=Ro[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&it,r&it,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&it,e&it]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(mf),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Xc(l+1/3,s,o),r[1]=Xc(l,s,o),r[2]=Xc(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(Av),i&&r.length<4&&(r[3]=1),r}else r=e.match(mf)||Ro.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/it,o=r[1]/it,a=r[2]/it,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),i&&r.length<4&&(r[3]=1),r},Jv=function(e){var t=[],i=[],r=-1;return e.split(pr).forEach(function(s){var o=s.match(Us)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},Ap=function(e,t,i){var r="",s=(e+r).match(pr),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=Zv(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(u=Jv(e),l=i.c,l.join(r)!==u.c.join(r)))for(c=e.replace(pr,"1").split(Us),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:i).shift());if(!c)for(c=e.split(pr),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},pr=function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ro)n+="|"+e+"\\b";return new RegExp(n+")","gi")}(),Mw=/hsl[a]?\(/,Qv=function(e){var t=e.join(" "),i;if(pr.lastIndex=0,pr.test(t))return i=Mw.test(t),e[1]=Ap(e[1],i),e[0]=Ap(e[0],i,Jv(e[1])),!0},ia,wn=function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function _(m){var p=n()-r,x=m===!0,v,S,b,E;if(p>e&&(i+=p-t),r+=p,b=r-i,v=b-o,(v>0||x)&&(E=++f.frame,h=b-f.time*1e3,f.time=b=b/1e3,o+=v+(v>=s?4:s-v),S=1),x||(l=c(_)),S)for(d=0;d<a.length;d++)a[d](b,h,E,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){Pv&&(!_f&&Th()&&(Fn=_f=window,wh=Fn.document||{},Pn.gsap=yn,(Fn.gsapVersions||(Fn.gsapVersions=[])).push(yn.version),Lv(Ol||Fn.GreenSockGlobals||!Fn.gsap&&Fn||{}),u=Fn.requestAnimationFrame,Yv.forEach(Kv)),l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},ia=1,g(2))},sleep:function(){(u?Fn.cancelAnimationFrame:clearTimeout)(l),ia=0,c=ta},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,x){var v=p?function(S,b,E,T){m(S,b,E,T),f.remove(v)}:m;return f.remove(m),a[x?"unshift":"push"](v),io(),v},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f}(),io=function(){return!ia&&wn.wake()},$e={},Ew=/^[\d.\-M][\d.\-,\s]/,bw=/["']/g,Tw=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,c;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(bw,"").trim():+c,r=l.substr(a+1).trim();return t},ww=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},Aw=function(e){var t=(e+"").split("("),i=$e[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[Tw(t[1])]:ww(e).split(",").map(Ov)):$e._CE&&Ew.test(e)?$e._CE("",e):i},e0=function(e){return function(t){return 1-e(1-t)}},t0=function n(e,t){for(var i=e._first,r;i;)i instanceof sn?n(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?n(i.timeline,t):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=t)),i=i._next},Jr=function(e,t){return e&&(Mt(e)?e:$e[e]||Aw(e))||t},hs=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return pn(e,function(a){$e[a]=Pn[a]=s,$e[o=a.toLowerCase()]=i;for(var l in s)$e[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=$e[a+"."+l]=s[l]}),s},n0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},qc=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/pf*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*tw((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:n0(a);return s=pf/s,l.config=function(c,u){return n(e,c,u)},l},$c=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:n0(i);return r.config=function(s){return n(e,s)},r};pn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;hs(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});$e.Linear.easeNone=$e.none=$e.Linear.easeIn;hs("Elastic",qc("in"),qc("out"),qc());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};hs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);hs("Expo",function(n){return n?Math.pow(2,10*(n-1)):0});hs("Circ",function(n){return-(Tv(1-n*n)-1)});hs("Sine",function(n){return n===1?1:-ew(n*JT)+1});hs("Back",$c("in"),$c("out"),$c());$e.SteppedEase=$e.steps=Pn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-rt;return function(a){return((r*va(0,o,a)|0)+s)*i}}};eo.ease=$e["quad.out"];pn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Rh+=n+","+n+"Params,"});var i0=function(e,t){this.id=QT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Uv,this.set=t?t.getSetter:Uh},ra=function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,no(this,+t.duration,1,1),this.data=t.data,yt&&(this._ctx=yt,yt.data.push(this)),ia||wn.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,no(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(io(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(pc(this,i),!s._dp||s.parent||Bv(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&fi(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===rt||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Nv(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+bp(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+bp(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?to(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-rt?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?Bl(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-rt?0:this._rts,this.totalTime(va(-Math.abs(this._delay),this._tDur,s),r!==!1),dc(this),lw(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(io(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==rt&&(this._tTime-=rt)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&fi(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(dn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Bl(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=rw);var r=Yt;return Yt=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Yt=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Tp(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Tp(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Nn(this,i),dn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,dn(r))},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-rt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-rt,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-rt)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this;return new Promise(function(s){var o=Mt(i)?i:Fv,a=function(){var c=r.then;r.then=null,Mt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){Co(this)},n}();$n(ra.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-rt,_prom:0,_ps:!1,_rts:1});var sn=function(n){bv(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=dn(i.sortChildren),_t&&fi(i.parent||_t,Ai(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&zv(Ai(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Ho(0,arguments,this),this},t.from=function(r,s,o){return Ho(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Ho(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,zo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new wt(r,s,Nn(this,o),1),this},t.call=function(r,s,o){return fi(this,wt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new wt(r,o,Nn(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,zo(o).immediateRender=dn(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,zo(a).immediateRender=dn(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Ut(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,_,m,p,x,v,S,b,E,T;if(this!==_t&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,S=this._start,v=this._ts,p=!v,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=Ut(u%m),u===l?(_=this._repeat,h=c):(_=~~(u/m),_&&_===u/m&&(h=c,_--),h>c&&(h=c)),b=to(this._tTime,m),!a&&this._tTime&&b!==_&&this._tTime-b*m-this._dur<=0&&(b=_),E&&_&1&&(h=c-h,T=1),_!==b&&!this._lock){var L=E&&b&1,y=L===(E&&_&1);if(_<b&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Ut(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&An(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;t0(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=hw(this,Ut(a),Ut(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&h&&!s&&!_&&(An(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){x=0,g&&(u+=this._zTime=-rt);break}}d=g}else{d=this._last;for(var w=r<0?r:h;d;){if(g=d._prev,(d._act||w<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(w-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(w-d._start)*d._ts,s,o||Yt&&(d._initted||d._startAt)),h!==this._time||!this._ts&&!p){x=0,g&&(u+=this._zTime=w?-rt:rt);break}}d=g}}if(x&&!s&&(this.pause(),x.render(h>=a?0:-rt)._zTime=h>=a?1:-1,this._ts))return this._start=S,dc(this),this.render(r,s,o);this._onUpdate&&!s&&An(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(S===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&xr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(An(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Fi(s)||(s=Nn(this,s,r)),!(r instanceof ra)){if(Kt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Ot(r))return this.addLabel(r,s);if(Mt(r))r=wt.delayedCall(0,r);else return this}return this!==r?fi(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Wn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof wt?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return Ot(r)?this.removeLabel(r):Mt(r)?this.killTweensOf(r):(hc(this,r),r===this._recent&&(this._recent=this._last),Zr(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ut(wn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Nn(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=wt.delayedCall(0,s||ta,o);return a.data="isPause",this._hasPause=1,fi(this,a,Nn(this,r))},t.removePause=function(r){var s=this._first;for(r=Nn(this,r);s;)s._start===r&&s.data==="isPause"&&xr(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)sr!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=jn(r),l=this._first,c=Fi(s),u;l;)l instanceof wt?sw(l._targets,a)&&(c?(!sr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Nn(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=wt.to(o,$n({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||rt,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&no(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,$n({startAt:{time:Nn(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),wp(this,Nn(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),wp(this,Nn(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+rt)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Zr(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Zr(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Wn,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,fi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;no(o,o===_t&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(_t._ts&&(Nv(_t,Bl(r,_t)),Iv=wn.frame),wn.frame>=Mp){Mp+=Cn.autoSleep||120;var s=_t._first;if((!s||!s._ts)&&Cn.autoSleep&&wn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||wn.sleep()}}},e}(ra);$n(sn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Cw=function(e,t,i,r,s,o,a){var l=new mn(this._pt,e,t,0,1,c0,null,s),c=0,u=0,f,h,d,g,_,m,p,x;for(l.b=i,l.e=r,i+="",r+="",(p=~r.indexOf("random("))&&(r=na(r)),o&&(x=[i,r],o(x,e,t),i=x[0],r=x[1]),h=i.match(Wc)||[];f=Wc.exec(r);)g=f[0],_=r.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Ws(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Wc.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Cv.test(r)||p)&&(l.e=0),this._pt=l,l},Lh=function(e,t,i,r,s,o,a,l,c,u){Mt(r)&&(r=r(s||0,e,o));var f=e[t],h=i!=="get"?i:Mt(f)?c?e[t.indexOf("set")||!Mt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Mt(f)?c?Iw:a0:Ih,g;if(Ot(r)&&(~r.indexOf("random(")&&(r=na(r)),r.charAt(1)==="="&&(g=Ws(h,r)+($t(h)||0),(g||g===0)&&(r=g))),!u||h!==r||Ef)return!isNaN(h*r)&&r!==""?(g=new mn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?Nw:l0,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&Ah(t,r),Cw.call(this,e,t,h,r,d,l||Cn.stringFilter,c))},Rw=function(e,t,i,r,s){if(Mt(e)&&(e=Go(e,s,t,i,r)),!vi(e)||e.style&&e.nodeType||Kt(e)||wv(e))return Ot(e)?Go(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=Go(e[a],s,t,i,r);return o},r0=function(e,t,i,r,s,o){var a,l,c,u;if(Tn[e]&&(a=new Tn[e]).init(s,a.rawVars?t[e]:Rw(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new mn(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==Ns))for(c=i._ptLookup[i._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},sr,Ef,Dh=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,v=e._overwrite==="auto"&&!Eh,S=e.timeline,b,E,T,L,y,w,N,U,$,D,k,O,V;if(S&&(!h||!s)&&(s="none"),e._ease=Jr(s,eo.ease),e._yEase=f?e0(Jr(f===!0?s:f,eo.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!S&&!!r.runBackwards,!S||h&&!r.stagger){if(U=m[0]?Kr(m[0]).harness:0,O=U&&r[U.prop],b=kl(r,Ch),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?ml:iw),_._lazy=0),o){if(xr(e._startAt=wt.set(m,$n({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&dn(l),startAt:null,delay:0,onUpdate:c&&function(){return An(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Yt||!a&&!d)&&e._startAt.revert(ml),a&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),T=$n({overwrite:!1,data:"isFromStart",lazy:a&&!_&&dn(l),immediateRender:a,stagger:0,parent:p},b),O&&(T[U.prop]=O),xr(e._startAt=wt.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Yt?e._startAt.revert(ml):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,rt,rt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&dn(l)||l&&!g,E=0;E<m.length;E++){if(y=m[E],N=y._gsap||Ph(m)[E]._gsap,e._ptLookup[E]=D={},gf[N.id]&&dr.length&&Fl(),k=x===m?E:x.indexOf(y),U&&($=new U).init(y,O||b,e,k,x)!==!1&&(e._pt=L=new mn(e._pt,y,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(H){D[H]=L}),$.priority&&(w=1)),!U||O)for(T in b)Tn[T]&&($=r0(T,b,e,k,y,x))?$.priority&&(w=1):D[T]=L=Lh.call(e,y,T,"get",b[T],k,x,0,r.stringFilter);e._op&&e._op[E]&&e.kill(y,e._op[E]),v&&e._pt&&(sr=e,_t.killTweensOf(y,D,e.globalTime(t)),V=!e.parent,sr=0),e._pt&&l&&(gf[N.id]=1)}w&&u0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!V,h&&t<=0&&S.render(Wn,!0,!0)},Pw=function(e,t,i,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Ef=1,e.vars[t]="+=0",Dh(e,a),Ef=0,l?ea(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=i-u.s,f.e&&(f.e=bt(i)+$t(f.e)),f.b&&(f.b=u.s+$t(f.b))},Lw=function(e,t){var i=e[0]?Kr(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=as({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},Dw=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(Kt(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Go=function(e,t,i,r,s){return Mt(e)?e.call(t,i,r,s):Ot(e)&&~e.indexOf("random(")?na(e):e},s0=Rh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",o0={};pn(s0+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return o0[n]=1});var wt=function(n){bv(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:zo(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=r.parent||_t,v=(Kt(i)||wv(i)?Fi(i[0]):"length"in r)?[i]:jn(i),S,b,E,T,L,y,w,N;if(a._targets=v.length?Ph(v):ea("GSAP target "+i+" not found. https://gsap.com",!Cn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||ka(c)||ka(u)){if(r=a.vars,S=a.timeline=new sn({data:"nested",defaults:_||{},targets:x&&x.data==="nested"?x.vars.targets:v}),S.kill(),S.parent=S._dp=Ai(a),S._start=0,h||ka(c)||ka(u)){if(T=v.length,w=h&&Wv(h),vi(h))for(L in h)~s0.indexOf(L)&&(N||(N={}),N[L]=h[L]);for(b=0;b<T;b++)E=kl(r,o0),E.stagger=0,p&&(E.yoyoEase=p),N&&as(E,N),y=v[b],E.duration=+Go(c,Ai(a),b,y,v),E.delay=(+Go(u,Ai(a),b,y,v)||0)-a._delay,!h&&T===1&&E.delay&&(a._delay=u=E.delay,a._start+=u,E.delay=0),S.to(y,E,w?w(b,y,v):0),S._ease=$e.none;S.duration()?c=u=0:a.timeline=0}else if(g){zo($n(S.vars.defaults,{ease:"none"})),S._ease=Jr(g.ease||r.ease||"none");var U=0,$,D,k;if(Kt(g))g.forEach(function(O){return S.to(v,O,">")}),S.duration();else{E={};for(L in g)L==="ease"||L==="easeEach"||Dw(L,g[L],E,g.easeEach);for(L in E)for($=E[L].sort(function(O,V){return O.t-V.t}),U=0,b=0;b<$.length;b++)D=$[b],k={ease:D.e,duration:(D.t-(b?$[b-1].t:0))/100*c},k[L]=D.v,S.to(v,k,U),U+=k.duration;S.duration()<c&&S.to({},{duration:c-S.duration()})}}c||a.duration(c=S.duration())}else a.timeline=0;return d===!0&&!Eh&&(sr=Ai(a),_t.killTweensOf(v),sr=0),fi(x,Ai(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===Ut(x._time)&&dn(f)&&cw(Ai(a))&&x.data!=="nested")&&(a._tTime=-rt,a.render(Math.max(0,-u)||0)),m&&zv(Ai(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-rt&&!u?l:r<rt?0:r,h,d,g,_,m,p,x,v,S;if(!c)fw(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(h=f,v=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=Ut(f%_),f===l?(g=this._repeat,h=c):(g=~~(f/_),g&&g===Ut(f/_)&&(h=c,g--),h>c&&(h=c)),p=this._yoyo&&g&1,p&&(S=this._yEase,h=c-h),m=to(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(v&&this._yEase&&t0(v,p),this.vars.repeatRefresh&&!p&&!this._lock&&this._time!==c&&this._initted&&(this._lock=o=1,this.render(Ut(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Hv(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(S||this._ease)(h/c),this._from&&(this.ratio=x=1-x),h&&!a&&!s&&!g&&(An(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;v&&v.render(r<0?r:!h&&p?-rt:v._dur*v._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&vf(this,r,s,o),An(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&An(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&vf(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&xr(this,1),!s&&!(u&&!a)&&(f||a||p)&&(An(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){ia||wn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Dh(this,c),u=this._ease(c/this._dur),Pw(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(pc(this,0),this.parent||kv(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Co(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,sr&&sr.vars.overwrite!==!0)._first||Co(this),this.parent&&o!==this.timeline.totalDuration()&&no(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?jn(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&aw(a,l))return s==="all"&&(this._pt=0),Co(this);for(f=this._op=this._op||[],s!=="all"&&(Ot(s)&&(_={},pn(s,function(x){return _[x]=1}),s=_),s=Lw(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&hc(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Co(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ho(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Ho(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return _t.killTweensOf(r,s,o)},e}(ra);$n(wt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});pn("staggerTo,staggerFrom,staggerFromTo",function(n){wt[n]=function(){var e=new sn,t=yf.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var Ih=function(e,t,i){return e[t]=i},a0=function(e,t,i){return e[t](i)},Iw=function(e,t,i,r){return e[t](r.fp,i)},Uw=function(e,t,i){return e.setAttribute(t,i)},Uh=function(e,t){return Mt(e[t])?a0:bh(e[t])&&e.setAttribute?Uw:Ih},l0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Nw=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},c0=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Nh=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Ow=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},Fw=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?hc(this,t,"_pt"):t.dep||(i=1),t=r;return!i},kw=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},u0=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},mn=function(){function n(t,i,r,s,o,a,l,c,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||l0,this.d=l||this,this.set=c||Ih,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=kw,this.m=i,this.mt=s,this.tween=r},n}();pn(Rh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Ch[n]=1});Pn.TweenMax=Pn.TweenLite=wt;Pn.TimelineLite=Pn.TimelineMax=sn;_t=new sn({sortChildren:!1,defaults:eo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Cn.stringFilter=Qv;var Qr=[],gl={},Bw=[],Cp=0,zw=0,Yc=function(e){return(gl[e]||Bw).map(function(t){return t()})},bf=function(){var e=Date.now(),t=[];e-Cp>2&&(Yc("matchMediaInit"),Qr.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,c;for(a in r)o=Fn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(i.revert(),l&&t.push(i))}),Yc("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Cp=e,Yc("matchMedia"))},f0=function(){function n(t,i){this.selector=i&&Sf(i),this.data=[],this._r=[],this.isReverted=!1,this.id=zw++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){Mt(i)&&(s=r,r=i,i=Mt);var o=this,a=function(){var c=yt,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=Sf(s)),yt=o,f=r.apply(o,arguments),Mt(f)&&o._r.push(f),yt=c,o.selector=u,o.isReverted=!1,f};return o.last=a,i===Mt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=yt;yt=null,i(this),yt=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof wt&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=s.data.length;l--;)c=s.data[l],c instanceof sn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof wt)&&c.revert&&c.revert(i);s._r.forEach(function(u){return u(i,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Qr.length;o--;)Qr[o].id===this.id&&Qr.splice(o,1)},e.revert=function(i){this.kill(i||{})},n}(),Hw=function(){function n(t){this.contexts=[],this.scope=t}var e=n.prototype;return e.add=function(i,r,s){vi(i)||(i={matches:i});var o=new f0(0,s||this.scope),a=o.conditions={},l,c,u;yt&&!o.selector&&(o.selector=yt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(c in i)c==="all"?u=1:(l=Fn.matchMedia(i[c]),l&&(Qr.indexOf(o)<0&&Qr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(bf):l.addEventListener("change",bf)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n}(),zl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return Kv(r)})},timeline:function(e){return new sn(e)},getTweensOf:function(e,t){return _t.getTweensOf(e,t)},getProperty:function(e,t,i,r){Ot(e)&&(e=jn(e)[0]);var s=Kr(e||{}).get,o=i?Fv:Ov;return i==="native"&&(i=""),e&&(t?o((Tn[t]&&Tn[t].get||s)(e,t,i,r)):function(a,l,c){return o((Tn[a]&&Tn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=jn(e),e.length>1){var r=e.map(function(u){return yn.quickSetter(u,t,i)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=Tn[t],a=Kr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;Ns._pt=0,f.init(e,i?u+i:u,Ns,0,[e]),f.render(1,f),Ns._pt&&Nh(1,Ns)}:a.set(e,l);return o?c:function(u){return c(e,l,i?u+i:u,a,1)}},quickTo:function(e,t,i){var r,s=yn.to(e,as((r={},r[t]="+=0.1",r.paused=!0,r),i||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return _t.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Jr(e.ease,eo.ease)),Ep(eo,e||{})},config:function(e){return Ep(Cn,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Tn[a]&&!Pn[a]&&ea(t+" effect requires "+a+" plugin.")}),jc[t]=function(a,l,c){return i(jn(a),$n(l||{},s),c)},o&&(sn.prototype[t]=function(a,l,c){return this.add(jc[t](a,vi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){$e[e]=Jr(t)},parseEase:function(e,t){return arguments.length?Jr(e,t):$e},getById:function(e){return _t.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new sn(e),r,s;for(i.smoothChildTiming=dn(e.smoothChildTiming),_t.remove(i),i._dp=0,i._time=i._tTime=_t._time,r=_t._first;r;)s=r._next,(t||!(!r._dur&&r instanceof wt&&r.vars.onComplete===r._targets[0]))&&fi(i,r,r._start-r._delay),r=s;return fi(_t,i,0),i},context:function(e,t){return e?new f0(e,t):yt},matchMedia:function(e){return new Hw(e)},matchMediaRefresh:function(){return Qr.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||bf()},addEventListener:function(e,t){var i=gl[e]||(gl[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=gl[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:xw,wrapYoyo:yw,distribute:Wv,random:Xv,snap:jv,normalize:vw,getUnit:$t,clamp:pw,splitColor:Zv,toArray:jn,selector:Sf,mapRange:$v,pipe:_w,unitize:gw,interpolate:Sw,shuffle:Vv},install:Lv,effects:jc,ticker:wn,updateRoot:sn.updateRoot,plugins:Tn,globalTimeline:_t,core:{PropTween:mn,globals:Dv,Tween:wt,Timeline:sn,Animation:ra,getCache:Kr,_removeLinkedListItem:hc,reverting:function(){return Yt},context:function(e){return e&&yt&&(yt.data.push(e),e._ctx=yt),yt},suppressOverwrites:function(e){return Eh=e}}};pn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return zl[n]=wt[n]});wn.add(sn.updateRoot);Ns=zl.to({},{duration:0});var Gw=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Vw=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=Gw(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},Kc=function(e,t){return{name:e,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(Ot(s)&&(l={},pn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Vw(a,s)}}}},yn=zl.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)Yt?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Kc("roundProps",Mf),Kc("modifiers"),Kc("snap",jv))||zl;wt.version=sn.version=yn.version="3.12.4";Pv=1;Th()&&io();$e.Power0;$e.Power1;$e.Power2;$e.Power3;$e.Power4;$e.Linear;$e.Quad;$e.Cubic;$e.Quart;$e.Quint;$e.Strong;$e.Elastic;$e.Back;$e.SteppedEase;$e.Bounce;$e.Sine;$e.Expo;$e.Circ;/*!
 * CSSPlugin 3.12.4
 * https://gsap.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Rp,or,js,Oh,jr,Pp,Fh,Ww=function(){return typeof window<"u"},ki={},Br=180/Math.PI,Xs=Math.PI/180,ps=Math.atan2,Lp=1e8,kh=/([A-Z])/g,jw=/(left|right|width|margin|padding|x)/i,Xw=/[\s,\(]\S/,hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Tf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},qw=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},$w=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Yw=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},h0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},d0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Kw=function(e,t,i){return e.style[t]=i},Zw=function(e,t,i){return e.style.setProperty(t,i)},Jw=function(e,t,i){return e._gsap[t]=i},Qw=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},e1=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},t1=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},gt="transform",_n=gt+"Origin",n1=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in ki&&s){if(this.tfm=this.tfm||{},e!=="transform")e=hi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Ci(r,a)}):this.tfm[e]=o.x?o[e]:Ci(r,e),e===_n&&(this.tfm.zOrigin=o.zOrigin);else return hi.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(gt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(_n,t,"")),e=gt}(s||t)&&this.props.push(e,t,s[e])},p0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},i1=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(kh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Fh(),(!s||!s.isStart)&&!i[gt]&&(p0(i),r.zOrigin&&i[_n]&&(i[_n]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},m0=function(e,t){var i={target:e,props:[],revert:i1,save:n1};return e._gsap||yn.core.getCache(e),t&&t.split(",").forEach(function(r){return i.save(r)}),i},_0,wf=function(e,t){var i=or.createElementNS?or.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):or.createElement(e);return i&&i.style?i:or.createElement(e)},mi=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(kh,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,ro(t)||t,1)||""},Dp="O,Moz,ms,Ms,Webkit".split(","),ro=function(e,t,i){var r=t||jr,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Dp[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Dp[o]:"")+e},Af=function(){Ww()&&window.document&&(Rp=window,or=Rp.document,js=or.documentElement,jr=wf("div")||{style:{}},wf("div"),gt=ro(gt),_n=gt+"Origin",jr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_0=!!ro("perspective"),Fh=yn.core.reverting,Oh=1)},Zc=function n(e){var t=wf("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,r=this.nextSibling,s=this.style.cssText,o;if(js.appendChild(t),t.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=n}catch{}else this._gsapBBox&&(o=this._gsapBBox());return i&&(r?i.insertBefore(this,r):i.appendChild(this)),js.removeChild(t),this.style.cssText=s,o},Ip=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},g0=function(e){var t;try{t=e.getBBox()}catch{t=Zc.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===Zc||(t=Zc.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+Ip(e,["x","cx","x1"])||0,y:+Ip(e,["y","cy","y1"])||0,width:0,height:0}:t},v0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&g0(e))},ls=function(e,t){if(t){var i=e.style,r;t in ki&&t!==_n&&(t=gt),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(kh,"-$1").toLowerCase())):i.removeAttribute(t)}},ar=function(e,t,i,r,s,o){var a=new mn(e._pt,t,i,0,1,o?d0:h0);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},Up={deg:1,rad:1,turn:1},r1={grid:1,flex:1},yr=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=jr.style,l=jw.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,_,m,p;if(r===o||!s||Up[r]||Up[o])return s;if(o!=="px"&&!h&&(s=n(e,t,i,"px")),p=e.getCTM&&v0(e),(d||o==="%")&&(ki[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],bt(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),_=~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===or||!_.appendChild)&&(_=or.body),m=_._gsap,m&&d&&m.width&&l&&m.time===wn.time&&!m.uncache)return bt(s/m.width*f);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=f+r,g=e[u],x?e.style[t]=x:ls(e,t)}else(d||o==="%")&&!r1[mi(_,"display")]&&(a.position=mi(e,"position")),_===e&&(a.position="static"),_.appendChild(jr),g=jr[u],_.removeChild(jr),a.position="absolute";return l&&d&&(m=Kr(_),m.time=wn.time,m.width=_[u]),bt(h?g*s/f:g&&s?f/g*s:0)},Ci=function(e,t,i,r){var s;return Oh||Af(),t in hi&&t!=="transform"&&(t=hi[t],~t.indexOf(",")&&(t=t.split(",")[0])),ki[t]&&t!=="transform"?(s=oa(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Gl(mi(e,_n))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Hl[t]&&Hl[t](e,t,i)||mi(e,t)||Uv(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?yr(e,t,s,i)+i:s},s1=function(e,t,i,r){if(!i||i==="none"){var s=ro(t,e,1),o=s&&mi(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=mi(e,"borderTopColor"))}var a=new mn(this._pt,e.style,t,0,1,c0),l=0,c=0,u,f,h,d,g,_,m,p,x,v,S,b;if(a.b=i,a.e=r,i+="",r+="",r==="auto"&&(_=e.style[t],e.style[t]=r,r=mi(e,t)||r,_?e.style[t]=_:ls(e,t)),u=[i,r],Qv(u),i=u[0],r=u[1],h=i.match(Us)||[],b=r.match(Us)||[],b.length){for(;f=Us.exec(r);)m=f[0],x=r.substring(l,f.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,S=_.substr((d+"").length),m.charAt(1)==="="&&(m=Ws(d,m)+S),p=parseFloat(m),v=m.substr((p+"").length),l=Us.lastIndex-v.length,v||(v=v||Cn.units[t]||S,l===r.length&&(r+=v,a.e+=v)),S!==v&&(d=yr(e,t,_,v)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?d0:h0;return Cv.test(r)&&(a.e=0),this._pt=a,a},Np={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},o1=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Np[i]||i,t[1]=Np[r]||r,t.join(" ")},a1=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],ki[a]&&(l=1,a=a==="transformOrigin"?_n:gt),ls(i,a);l&&(ls(i,gt),o&&(o.svg&&i.removeAttribute("transform"),oa(i,1),o.uncache=1,p0(r)))}},Hl={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new mn(e._pt,t,i,0,0,a1);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},sa=[1,0,0,1,0,0],x0={},y0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Op=function(e){var t=mi(e,gt);return y0(t)?sa:t.substr(7).match(Av).map(bt)},Bh=function(e,t){var i=e._gsap||Kr(e),r=e.style,s=Op(e),o,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?sa:s):(s===sa&&!e.offsetParent&&e!==js&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(c=1,a=e.nextElementSibling,js.appendChild(e)),s=Op(e),l?r.display=l:ls(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):js.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Cf=function(e,t,i,r,s,o){var a=e._gsap,l=s||Bh(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],x=l[5],v=t.split(" "),S=parseFloat(v[0])||0,b=parseFloat(v[1])||0,E,T,L,y;i?l!==sa&&(T=d*m-g*_)&&(L=S*(m/T)+b*(-_/T)+(_*x-m*p)/T,y=S*(-g/T)+b*(d/T)-(d*x-g*p)/T,S=L,b=y):(E=g0(e),S=E.x+(~v[0].indexOf("%")?S/100*E.width:S),b=E.y+(~(v[1]||v[0]).indexOf("%")?b/100*E.height:b)),r||r!==!1&&a.smooth?(p=S-c,x=b-u,a.xOffset=f+(p*d+x*_)-p,a.yOffset=h+(p*g+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=S,a.yOrigin=b,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[_n]="0px 0px",o&&(ar(o,a,"xOrigin",c,S),ar(o,a,"yOrigin",u,b),ar(o,a,"xOffset",f,a.xOffset),ar(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",S+" "+b)},oa=function(e,t){var i=e._gsap||new i0(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=mi(e,_n)||"0",u,f,h,d,g,_,m,p,x,v,S,b,E,T,L,y,w,N,U,$,D,k,O,V,H,ne,ue,le,pe,Y,se,me;return u=f=h=_=m=p=x=v=S=0,d=g=1,i.svg=!!(e.getCTM&&v0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[gt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[gt]!=="none"?l[gt]:"")),r.scale=r.rotate=r.translate="none"),T=Bh(e,i.svg),i.svg&&(i.uncache?(H=e.getBBox(),c=i.xOrigin-H.x+"px "+(i.yOrigin-H.y)+"px",V=""):V=!t&&e.getAttribute("data-svg-origin"),Cf(e,V||c,!!V||i.originIsAbsolute,i.smooth!==!1,T)),b=i.xOrigin||0,E=i.yOrigin||0,T!==sa&&(N=T[0],U=T[1],$=T[2],D=T[3],u=k=T[4],f=O=T[5],T.length===6?(d=Math.sqrt(N*N+U*U),g=Math.sqrt(D*D+$*$),_=N||U?ps(U,N)*Br:0,x=$||D?ps($,D)*Br+_:0,x&&(g*=Math.abs(Math.cos(x*Xs))),i.svg&&(u-=b-(b*N+E*$),f-=E-(b*U+E*D))):(me=T[6],Y=T[7],ue=T[8],le=T[9],pe=T[10],se=T[11],u=T[12],f=T[13],h=T[14],L=ps(me,pe),m=L*Br,L&&(y=Math.cos(-L),w=Math.sin(-L),V=k*y+ue*w,H=O*y+le*w,ne=me*y+pe*w,ue=k*-w+ue*y,le=O*-w+le*y,pe=me*-w+pe*y,se=Y*-w+se*y,k=V,O=H,me=ne),L=ps(-$,pe),p=L*Br,L&&(y=Math.cos(-L),w=Math.sin(-L),V=N*y-ue*w,H=U*y-le*w,ne=$*y-pe*w,se=D*w+se*y,N=V,U=H,$=ne),L=ps(U,N),_=L*Br,L&&(y=Math.cos(L),w=Math.sin(L),V=N*y+U*w,H=k*y+O*w,U=U*y-N*w,O=O*y-k*w,N=V,k=H),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=bt(Math.sqrt(N*N+U*U+$*$)),g=bt(Math.sqrt(O*O+me*me)),L=ps(k,O),x=Math.abs(L)>2e-4?L*Br:0,S=se?1/(se<0?-se:se):0),i.svg&&(V=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!y0(mi(e,gt)),V&&e.setAttribute("transform",V))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(d*=-1,x+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=h+o,i.scaleX=bt(d),i.scaleY=bt(g),i.rotation=bt(_)+a,i.rotationX=bt(m)+a,i.rotationY=bt(p)+a,i.skewX=x+a,i.skewY=v+a,i.transformPerspective=S+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(r[_n]=Gl(c)),i.xOffset=i.yOffset=0,i.force3D=Cn.force3D,i.renderTransform=i.svg?c1:_0?S0:l1,i.uncache=0,i},Gl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Jc=function(e,t,i){var r=$t(t);return bt(parseFloat(t)+parseFloat(yr(e,"x",i+"px",r)))+r},l1=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,S0(e,t)},Dr="0deg",xo="0px",Ir=") ",S0=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,u=i.rotationY,f=i.rotationX,h=i.skewX,d=i.skewY,g=i.scaleX,_=i.scaleY,m=i.transformPerspective,p=i.force3D,x=i.target,v=i.zOrigin,S="",b=p==="auto"&&e&&e!==1||p===!0;if(v&&(f!==Dr||u!==Dr)){var E=parseFloat(u)*Xs,T=Math.sin(E),L=Math.cos(E),y;E=parseFloat(f)*Xs,y=Math.cos(E),o=Jc(x,o,T*y*-v),a=Jc(x,a,-Math.sin(E)*-v),l=Jc(x,l,L*y*-v+v)}m!==xo&&(S+="perspective("+m+Ir),(r||s)&&(S+="translate("+r+"%, "+s+"%) "),(b||o!==xo||a!==xo||l!==xo)&&(S+=l!==xo||b?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ir),c!==Dr&&(S+="rotate("+c+Ir),u!==Dr&&(S+="rotateY("+u+Ir),f!==Dr&&(S+="rotateX("+f+Ir),(h!==Dr||d!==Dr)&&(S+="skew("+h+", "+d+Ir),(g!==1||_!==1)&&(S+="scale("+g+", "+_+Ir),x.style[gt]=S||"translate(0, 0)"},c1=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,u=i.skewY,f=i.scaleX,h=i.scaleY,d=i.target,g=i.xOrigin,_=i.yOrigin,m=i.xOffset,p=i.yOffset,x=i.forceCSS,v=parseFloat(o),S=parseFloat(a),b,E,T,L,y;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Xs,c*=Xs,b=Math.cos(l)*f,E=Math.sin(l)*f,T=Math.sin(l-c)*-h,L=Math.cos(l-c)*h,c&&(u*=Xs,y=Math.tan(c-u),y=Math.sqrt(1+y*y),T*=y,L*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),b*=y,E*=y)),b=bt(b),E=bt(E),T=bt(T),L=bt(L)):(b=f,L=h,E=T=0),(v&&!~(o+"").indexOf("px")||S&&!~(a+"").indexOf("px"))&&(v=yr(d,"x",o,"px"),S=yr(d,"y",a,"px")),(g||_||m||p)&&(v=bt(v+g-(g*b+_*T)+m),S=bt(S+_-(g*E+_*L)+p)),(r||s)&&(y=d.getBBox(),v=bt(v+r/100*y.width),S=bt(S+s/100*y.height)),y="matrix("+b+","+E+","+T+","+L+","+v+","+S+")",d.setAttribute("transform",y),x&&(d.style[gt]=y)},u1=function(e,t,i,r,s){var o=360,a=Ot(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Br:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Lp)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Lp)%o-~~(c/o)*o)),e._pt=h=new mn(e._pt,t,i,r,c,qw),h.e=u,h.u="deg",e._props.push(i),h},Fp=function(e,t){for(var i in t)e[i]=t[i];return e},f1=function(e,t,i){var r=Fp({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,u,f,h,d,g;r.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[gt]=t,a=oa(i,1),ls(i,gt),i.setAttribute("transform",c)):(c=getComputedStyle(i)[gt],o[gt]=t,a=oa(i,1),o[gt]=c);for(l in ki)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=$t(c),g=$t(u),f=d!==g?yr(i,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new mn(e._pt,a,l,f,h-f,Tf),e._pt.u=g||0,e._props.push(l));Fp(a,r)};pn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});Hl[e>1?"border"+n:n]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Ci(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var M0={name:"css",register:Af,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,c,u,f,h,d,g,_,m,p,x,v,S,b,E,T,L;Oh||Af(),this.styles=this.styles||m0(e),L=this.styles.props,this.tween=i;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Tn[_]&&r0(_,t,i,r,e,s)))){if(d=typeof u,g=Hl[_],d==="function"&&(u=u.call(i,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=na(u)),g)g(this,e,_,u,i)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",pr.lastIndex=0,pr.test(c)||(m=$t(c),p=$t(u)),p?m!==p&&(c=yr(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),L.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(i,r,e,s):l[_],Ot(c)&&~c.indexOf("random(")&&(c=na(c)),$t(c+"")||c==="auto"||(c+=Cn.units[_]||$t(Ci(e,_))||""),(c+"").charAt(1)==="="&&(c=Ci(e,_))):c=Ci(e,_),h=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),f=parseFloat(u),_ in hi&&(_==="autoAlpha"&&(h===1&&Ci(e,"visibility")==="hidden"&&f&&(h=0),L.push("visibility",0,a.visibility),ar(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=hi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in ki,v){if(this.styles.save(_),S||(b=e._gsap,b.renderTransform&&!t.parseTransform||oa(e,t.parseTransform),E=t.smoothOrigin!==!1&&b.smooth,S=this._pt=new mn(this._pt,a,gt,0,1,b.renderTransform,b,0,-1),S.dep=1),_==="scale")this._pt=new mn(this._pt,b,"scaleY",b.scaleY,(x?Ws(b.scaleY,x+f):f)-b.scaleY||0,Tf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){L.push(_n,0,a[_n]),u=o1(u),b.svg?Cf(e,u,0,E,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==b.zOrigin&&ar(this,b,"zOrigin",b.zOrigin,p),ar(this,a,_,Gl(c),Gl(u)));continue}else if(_==="svgOrigin"){Cf(e,u,1,E,0,this);continue}else if(_ in x0){u1(this,b,_,h,x?Ws(h,x+u):u);continue}else if(_==="smoothOrigin"){ar(this,b,"smooth",b.smooth,u);continue}else if(_==="force3D"){b[_]=u;continue}else if(_==="transform"){f1(this,u,e);continue}}else _ in a||(_=ro(_)||_);if(v||(f||f===0)&&(h||h===0)&&!Xw.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),p=$t(u)||(_ in Cn.units?Cn.units[_]:m),m!==p&&(h=yr(e,_,c,p)),this._pt=new mn(this._pt,v?b:a,_,h,(x?Ws(h,x+f):f)-h,!v&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?Yw:Tf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=$w);else if(_ in a)s1.call(this,e,_,c,x?x+u:u);else if(_ in e)this.add(e,_,c||e[_],x?x+u:u,r,s);else if(_!=="parseTransform"){Ah(_,u);continue}v||(_ in a?L.push(_,0,a[_]):L.push(_,1,c||e[_])),o.push(_)}}T&&u0(this)},render:function(e,t){if(t.tween._time||!Fh())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Ci,aliases:hi,getSetter:function(e,t,i){var r=hi[t];return r&&r.indexOf(",")<0&&(t=r),t in ki&&t!==_n&&(e._gsap.x||Ci(e,"x"))?i&&Pp===i?t==="scale"?Qw:Jw:(Pp=i||{})&&(t==="scale"?e1:t1):e.style&&!bh(e.style[t])?Kw:~t.indexOf("-")?Zw:Uh(e,t)},core:{_removeProperty:ls,_getMatrix:Bh}};yn.utils.checkPrefix=ro;yn.core.getStyleSaver=m0;(function(n,e,t,i){var r=pn(n+","+e+","+t,function(s){ki[s]=1});pn(e,function(s){Cn.units[s]="deg",x0[s]=1}),hi[r[13]]=n+","+e,pn(i,function(s){var o=s.split(":");hi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");pn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){Cn.units[n]="px"});yn.registerPlugin(M0);var Ze=yn.registerPlugin(M0)||yn;Ze.core.Tween;function nU(n){for(let e=0;e<n.value.ASlider.store.length;e++){const t=n.value.ASlider.store[e];Ze.timeline().to(t.mesh.position,{y:-t.top+n.value.sizes.height/2-t.height/2,duration:1.2,ease:"expo.inOut",delay:.07*e})}}function h1(n){n.value.ASlider.store.forEach(e=>{Ze.set(e.mesh.position,{y:-e.top+n.value.sizes.height/2-e.height/2})})}function iU(n,e){let t=e?"expo.inOut":"expo.out";n.value.ASlider.store.forEach((i,r)=>{Ze.to(i.mesh.position,{y:n.value.sizes.height/2+i.height/2,duration:1,delay:.02*r,ease:t})})}function d1(n){n.value.ASlider.store.forEach(e=>{Ze.set(e.mesh.position,{y:n.value.sizes.height/2+e.height/2})})}/*!
 * paths 3.12.4
 * https://gsap.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var p1=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,m1=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,_1=Math.PI/180,Ba=Math.sin,za=Math.cos,Vo=Math.abs,yo=Math.sqrt,g1=function(e){return typeof e=="number"},kp=1e5,qi=function(e){return Math.round(e*kp)/kp||0};function v1(n,e,t,i,r,s,o){for(var a=n.length,l,c,u,f,h;--a>-1;)for(l=n[a],c=l.length,u=0;u<c;u+=2)f=l[u],h=l[u+1],l[u]=f*e+h*i+s,l[u+1]=f*t+h*r+o;return n._dirty=1,n}function x1(n,e,t,i,r,s,o,a,l){if(!(n===a&&e===l)){t=Vo(t),i=Vo(i);var c=r%360*_1,u=za(c),f=Ba(c),h=Math.PI,d=h*2,g=(n-a)/2,_=(e-l)/2,m=u*g+f*_,p=-f*g+u*_,x=m*m,v=p*p,S=x/(t*t)+v/(i*i);S>1&&(t=yo(S)*t,i=yo(S)*i);var b=t*t,E=i*i,T=(b*E-b*v-E*x)/(b*v+E*x);T<0&&(T=0);var L=(s===o?-1:1)*yo(T),y=L*(t*p/i),w=L*-(i*m/t),N=(n+a)/2,U=(e+l)/2,$=N+(u*y-f*w),D=U+(f*y+u*w),k=(m-y)/t,O=(p-w)/i,V=(-m-y)/t,H=(-p-w)/i,ne=k*k+O*O,ue=(O<0?-1:1)*Math.acos(k/yo(ne)),le=(k*H-O*V<0?-1:1)*Math.acos((k*V+O*H)/yo(ne*(V*V+H*H)));isNaN(le)&&(le=h),!o&&le>0?le-=d:o&&le<0&&(le+=d),ue%=d,le%=d;var pe=Math.ceil(Vo(le)/(d/4)),Y=[],se=le/pe,me=4/3*Ba(se/2)/(1+za(se/2)),Se=u*t,G=f*t,fe=f*-i,ae=u*i,re;for(re=0;re<pe;re++)r=ue+re*se,m=za(r),p=Ba(r),k=za(r+=se),O=Ba(r),Y.push(m-me*p,p+me*m,k+me*O,O-me*k,k,O);for(re=0;re<Y.length;re+=2)m=Y[re],p=Y[re+1],Y[re]=m*Se+p*fe+$,Y[re+1]=m*G+p*ae+D;return Y[re-2]=a,Y[re-1]=l,Y}}function y1(n){var e=(n+"").replace(m1,function(y){var w=+y;return w<1e-4&&w>-1e-4?0:w}).match(p1)||[],t=[],i=0,r=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+n,c,u,f,h,d,g,_,m,p,x,v,S,b,E,T,L=function(w,N,U,$){x=(U-w)/3,v=($-N)/3,_.push(w+x,N+v,U-x,$-v,U,$)};if(!n||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(b=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,f=+e[c+1],h=+e[c+2],g&&(f+=i,h+=r),c||(m=f,p=h),d==="M")_&&(_.length<8?t.length-=1:a+=_.length),i=m=f,r=p=h,_=[f,h],t.push(_),c+=2,d="L";else if(d==="C")_||(_=[0,0]),g||(i=r=0),_.push(f,h,i+e[c+3]*1,r+e[c+4]*1,i+=e[c+5]*1,r+=e[c+6]*1),c+=6;else if(d==="S")x=i,v=r,(b==="C"||b==="S")&&(x+=i-_[_.length-4],v+=r-_[_.length-3]),g||(i=r=0),_.push(x,v,f,h,i+=e[c+3]*1,r+=e[c+4]*1),c+=4;else if(d==="Q")x=i+(f-i)*s,v=r+(h-r)*s,g||(i=r=0),i+=e[c+3]*1,r+=e[c+4]*1,_.push(x,v,i+(f-i)*s,r+(h-r)*s,i,r),c+=4;else if(d==="T")x=i-_[_.length-4],v=r-_[_.length-3],_.push(i+x,r+v,f+(i+x*1.5-f)*s,h+(r+v*1.5-h)*s,i=f,r=h),c+=2;else if(d==="H")L(i,r,i=f,r),c+=1;else if(d==="V")L(i,r,i,r=f+(g?r-i:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(f=m,h=p,_.closed=!0),(d==="L"||Vo(i-f)>.5||Vo(r-h)>.5)&&(L(i,r,f,h),d==="L"&&(c+=2)),i=f,r=h;else if(d==="A"){if(E=e[c+4],T=e[c+5],x=e[c+6],v=e[c+7],u=7,E.length>1&&(E.length<3?(v=x,x=T,u--):(v=T,x=E.substr(2),u-=2),T=E.charAt(1),E=E.charAt(0)),S=x1(i,r,+e[c+1],+e[c+2],+e[c+3],+E,+T,(g?i:0)+x*1,(g?r:0)+v*1),c+=u,S)for(u=0;u<S.length;u++)_.push(S[u]);i=_[_.length-2],r=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function S1(n){g1(n[0])&&(n=[n]);var e="",t=n.length,i,r,s,o;for(r=0;r<t;r++){for(o=n[r],e+="M"+qi(o[0])+","+qi(o[1])+" C",i=o.length,s=2;s<i;s++)e+=qi(o[s++])+","+qi(o[s++])+" "+qi(o[s++])+","+qi(o[s++])+" "+qi(o[s++])+","+qi(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * CustomEase 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var fn,E0,b0=function(){return fn||typeof window<"u"&&(fn=window.gsap)&&fn.registerPlugin&&fn},Bp=function(){fn=b0(),fn?(fn.registerEase("_CE",di.create),E0=1):console.warn("Please gsap.registerPlugin(CustomEase)")},M1=1e20,Ha=function(e){return~~(e*1e3+(e<0?-.5:.5))/1e3},E1=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,b1=/[cLlsSaAhHvVtTqQ]/g,T1=function(e){var t=e.length,i=M1,r;for(r=1;r<t;r+=6)+e[r]<i&&(i=+e[r]);return i},w1=function(e,t,i){!i&&i!==0&&(i=Math.max(+e[e.length-1],+e[1]));var r=+e[0]*-1,s=-i,o=e.length,a=1/(+e[o-2]+r),l=-t||(Math.abs(+e[o-1]-+e[1])<.01*(+e[o-2]-+e[0])?T1(e)+s:+e[o-1]+s),c;for(l?l=1/l:l=-a,c=0;c<o;c+=2)e[c]=(+e[c]+r)*a,e[c+1]=(+e[c+1]+s)*l},A1=function n(e,t,i,r,s,o,a,l,c,u,f){var h=(e+i)/2,d=(t+r)/2,g=(i+s)/2,_=(r+o)/2,m=(s+a)/2,p=(o+l)/2,x=(h+g)/2,v=(d+_)/2,S=(g+m)/2,b=(_+p)/2,E=(x+S)/2,T=(v+b)/2,L=a-e,y=l-t,w=Math.abs((i-a)*y-(r-l)*L),N=Math.abs((s-a)*y-(o-l)*L),U;return u||(u=[{x:e,y:t},{x:a,y:l}],f=1),u.splice(f||u.length-1,0,{x:E,y:T}),(w+N)*(w+N)>c*(L*L+y*y)&&(U=u.length,n(e,t,h,d,x,v,E,T,c,u,f),n(E,T,S,b,m,p,a,l,c,u,f+1+(u.length-U))),u},di=function(){function n(t,i,r){E0||Bp(),this.id=t,this.setData(i,r)}var e=n.prototype;return e.setData=function(i,r){r=r||{},i=i||"0,0,1,1";var s=i.match(E1),o=1,a=[],l=[],c=r.precision||1,u=c<=1,f,h,d,g,_,m,p,x,v;if(this.data=i,(b1.test(i)||~i.indexOf("M")&&i.indexOf("C")<0)&&(s=y1(i)[0]),f=s.length,f===4)s.unshift(0,0),s.push(1,1),f=8;else if((f-2)%6)throw"Invalid CustomEase";for((+s[0]!=0||+s[f-2]!=1)&&w1(s,r.height,r.originY),this.segment=s,g=2;g<f;g+=6)h={x:+s[g-2],y:+s[g-1]},d={x:+s[g+4],y:+s[g+5]},a.push(h,d),A1(h.x,h.y,+s[g],+s[g+1],+s[g+2],+s[g+3],d.x,d.y,1/(c*2e5),a,a.length-1);for(f=a.length,g=0;g<f;g++)p=a[g],x=a[g-1]||p,(p.x>x.x||x.y!==p.y&&x.x===p.x||p===x)&&p.x<=1?(x.cx=p.x-x.x,x.cy=p.y-x.y,x.n=p,x.nx=p.x,u&&g>1&&Math.abs(x.cy/x.cx-a[g-2].cy/a[g-2].cx)>2&&(u=0),x.cx<o&&(x.cx?o=x.cx:(x.cx=.001,g===f-1&&(x.x-=.001,o=Math.min(o,.001),u=0)))):(a.splice(g--,1),f--);if(f=1/o+1|0,_=1/f,m=0,p=a[0],u){for(g=0;g<f;g++)v=g*_,p.nx<v&&(p=a[++m]),h=p.y+(v-p.x)/p.cx*p.cy,l[g]={x:v,cx:_,y:h,cy:0,nx:9},g&&(l[g-1].cy=h-l[g-1].y);l[f-1].cy=a[a.length-1].y-h}else{for(g=0;g<f;g++)p.nx<g*_&&(p=a[++m]),l[g]=p;m<a.length-1&&(l[g-1]=a[a.length-2])}return this.ease=function(S){var b=l[S*f|0]||l[f-1];return b.nx<S&&(b=b.n),b.y+(S-b.x)/b.cx*b.cy},this.ease.custom=this,this.id&&fn&&fn.registerEase(this.id,this.ease),this},e.getSVGData=function(i){return n.getSVGData(this,i)},n.create=function(i,r,s){return new n(i,r,s).ease},n.register=function(i){fn=i,Bp()},n.get=function(i){return fn.parseEase(i)},n.getSVGData=function(i,r){r=r||{};var s=r.width||100,o=r.height||100,a=r.x||0,l=(r.y||0)+o,c=fn.utils.toArray(r.path)[0],u,f,h,d,g,_,m,p,x,v;if(r.invert&&(o=-o,l=0),typeof i=="string"&&(i=fn.parseEase(i)),i.custom&&(i=i.custom),i instanceof n)u=S1(v1([i.segment],s,0,0,-o,a,l));else{for(u=[a,l],m=Math.max(5,(r.precision||1)*200),d=1/m,m+=2,p=5/m,x=Ha(a+d*s),v=Ha(l+i(d)*-o),f=(v-l)/(x-a),h=2;h<m;h++)g=Ha(a+h*d*s),_=Ha(l+i(h*d)*-o),(Math.abs((_-v)/(g-x)-f)>p||h===m-1)&&(u.push(x,v),f=(_-v)/(g-x)),x=g,v=_;u="M"+u.join(",")}return c&&c.setAttribute("d",u),u},n}();b0()&&fn.registerPlugin(di);di.version="3.12.4";function Rf(n,e){if(Ze.registerPlugin(di),n==".reveal-text-menu"&&e){const o=document.querySelectorAll(".text-words");Ze.timeline().to(o,{yPercent:120,duration:.6,ease:di.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}if(n==".reveal-text-project"&&e){const o=document.querySelectorAll(".text-words");Ze.timeline().to(o,{yPercent:200,stagger:.025,duration:.7,ease:di.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}if(e){const o=document.querySelectorAll(".text-words");if(o.length==0)return;Ze.timeline().to(o,{yPercent:-200,stagger:.025,duration:1.6,ease:di.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}let t=function(o){var a=document.querySelectorAll(o);a.forEach(function(l){l.dataset.splitText=l.textContent,l.innerHTML=l.textContent.split(/\s/).map(function(c){return c.split("-").map(function(u){return'<span class="text-word">'+u+"</span>"}).join('<span class="hyphen">-</span>')}).join('<span class="whitespace"> </span>')})},i=function(o){var a=document.querySelectorAll(o);t(o),a.forEach(function(l){var c=r(l),u="";c.forEach(function(f){u+='<span class="line"><span class="text-words">',f.forEach(function(h){u+=h.outerHTML}),u+="</span></span>"}),l.innerHTML=u})},r=function(o){for(var a=[],l,c=o.querySelectorAll("span"),u,f=0;f<c.length;f++){var h=c[f];h.offsetTop!=u&&(h.classList.contains("whitespace")||(u=h.offsetTop,l=[],a.push(l))),l.push(h)}return a};i(n),document.querySelectorAll(n).forEach(o=>{const a=o.querySelectorAll(".text-words");let l=Ze.timeline();l.set(o,{autoAlpha:1}),l.from(a,{yPercent:120,duration:1,ease:"power3.out",stagger:.25},.5)})}function es(n,e){Ze.registerPlugin(di);let t=null,i=null,r=-1;const s=document.querySelectorAll(n);s.forEach(o=>{if(n==".reveal-loading"&&(s[0].parentElement.style.visibility="visible"),(n==".reveal-menu"||n==".reveal-preview")&&e?(t=.7,r=1):t=1.6,n==".reveal-loading"?i=.7:i=1.6,e){const u=o.querySelectorAll(".letter");Ze.timeline().fromTo(u,{rotationX:.1,y:0},{transformOrigin:"center",rotationX:90,y:100*r,stagger:.015,duration:t,ease:di.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")});return}o.innerHTML=o.textContent.replace(/([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]+)/g,'<div class="word">$1</div>'),o.querySelectorAll(".word").forEach(u=>{u.innerHTML=u.textContent.replace(/[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]/g,"<div class='perspective'><div class='letter'><div>$&</div></div></div>")});const l=o.querySelectorAll(".letter");let c=Ze.timeline();c.set(o,{autoAlpha:1}),c.fromTo(l,{transformOrigin:"center",rotationX:90,y:100},{rotationX:.1,y:0,stagger:.015,duration:i,ease:di.create("custom","M0,0 C0.425,0.005 0,1 1,1 ")})})}function T0(n,e,t,i,r){Ze.to(n.value.menuOverlay,{opacity:e,delay:r*2,duration:.5+r*2,ease:"expo.out"}),Ze.to("#pageTitle",{y:t,ease:"expo.out",duration:i,delay:r}),Ze.to("#pageHeader",{y:t,ease:"expo.out",duration:i,delay:r}),Ze.to("#gl",{y:-t,ease:"expo.out",duration:i,delay:r}),n.value.ASlider&&n.value.ASlider.store.forEach((s,o)=>{Ze.to(s.mesh.position,{y:-t*4,ease:"expo.out",duration:i,delay:(o+1)*(r/4)})})}function C1(n,e){Ze.set(n.value.menuOverlay,{opacity:0}),e.name.includes("uid")||Ze.set("#pageTitle",{y:0}),Ze.set("#pageHeader",{y:0}),Ze.set("#gl",{y:0}),n.value.ASlider&&!e.name.includes("uid")&&h1(n)}function R1(n){if(n.value.indexMenuOpen)return;n.value.indexMenuOpen=!0,n.value.lenisMenu.scrollTo(0,{immediate:!0}),T0(n,1,100,1.3,0),Rf(".reveal-text-menu"),es(".reveal-menu");const e=Ze.timeline();let t=window.innerWidth>900?"240%":"100%";e.set("#indexMenu",{autoAlpha:1},0),e.fromTo("#indexMenu",{height:"0vh"},{height:"100vh",duration:.5,ease:"expo.out"},0),e.fromTo(".index__content__separator",{width:"0%"},{width:t,duration:1,ease:"expo.out"},.5),e.fromTo(".index__card__img",{y:"110%"},{y:"0%",duration:1.2,stagger:.055,delay:.3,ease:"expo.out"},0)}function Qc(n,e,t){YT("closeMenu"),Rf(".reveal-text-menu",!0),Rf(".reveal-text",!1),es(".reveal-menu",!0);const i=Ze.timeline();i.fromTo(".index__card__img",{y:"0%"},{y:"110%",duration:.7,stagger:.015,ease:"expo.out"},0),i.to("#indexMenu",{height:"0vh",duration:1,ease:"expo.out"},.4),i.to(".index__content__separator",{width:"0%",duration:.5,ease:"expo.out"},0),i.set("#indexMenu",{autoAlpha:0,onComplete:()=>{n.value.indexMenuOpen=!1,$T("closeMenu")}},1.2),t||T0(n,0,0,1.3,.3)}const mc=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},P1=n=>(j_("data-v-814d2ec9"),n=n(),X_(),n),L1=P1(()=>Re("div",{class:"cross__wrapper__header"},[Re("span",{class:"cross__content__v"}),Re("span",{class:"cross__content__h"})],-1)),D1=[L1],I1={__name:"CrossHeader",setup(n){const e=bn("gl");function t(i){Sp(".index__card",!0),R1(e),setTimeout(()=>{Sp(".index__card",!1)},1200)}return(i,r)=>(Ke(),dt("span",{onClick:t,id:"crossHeader"},D1))}},U1=mc(I1,[["__scopeId","data-v-814d2ec9"]]);async function w0(n,e=Ln()){const{path:t,matched:i}=e.resolve(n);if(!i.length||(e._routePreloaded||(e._routePreloaded=new Set),e._routePreloaded.has(t)))return;const r=e._preloadPromises=e._preloadPromises||[];if(r.length>4)return Promise.all(r).then(()=>w0(n,e));e._routePreloaded.add(t);const s=i.map(o=>{var a;return(a=o.components)==null?void 0:a.default}).filter(o=>typeof o=="function");for(const o of s){const a=Promise.resolve(o()).catch(()=>{}).finally(()=>r.splice(r.indexOf(a)));r.push(a)}await Promise.all(r)}const N1=(...n)=>n.find(e=>e!==void 0),O1="noopener noreferrer";function F1(n){const e=n.componentName||"NuxtLink",t=(i,r)=>{if(!i||n.trailingSlash!=="append"&&n.trailingSlash!=="remove")return i;if(typeof i=="string")return zp(i,n.trailingSlash);const s="path"in i?i.path:r(i).path;return{...i,name:void 0,path:zp(s,n.trailingSlash)}};return fo({name:e,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(i,{slots:r}){const s=Ln(),o=ga(),a=St(()=>{const d=i.to||i.href||"";return t(d,s.resolve)}),l=St(()=>typeof a.value=="string"&&Ni(a.value,{acceptRelative:!0})),c=St(()=>i.external||i.target&&i.target!=="_self"?!0:typeof a.value=="object"?!1:a.value===""||l.value),u=At(!1),f=At(null),h=d=>{var g;f.value=i.custom?(g=d==null?void 0:d.$el)==null?void 0:g.nextElementSibling:d==null?void 0:d.$el};if(i.prefetch!==!1&&i.noPrefetch!==!0&&i.target!=="_blank"&&!B1()){const g=st();let _,m=null;Hi(()=>{const p=k1();Mh(()=>{_=df(()=>{var x;(x=f==null?void 0:f.value)!=null&&x.tagName&&(m=p.observe(f.value,async()=>{m==null||m(),m=null;const v=typeof a.value=="string"?a.value:s.resolve(a.value).fullPath;await Promise.all([g.hooks.callHook("link:prefetch",v).catch(()=>{}),!c.value&&w0(a.value,s).catch(()=>{})]),u.value=!0}))})})}),ma(()=>{_&&BT(_),m==null||m(),m=null})}return()=>{var p,x;if(!c.value){const v={ref:h,to:a.value,activeClass:i.activeClass||n.activeClass,exactActiveClass:i.exactActiveClass||n.exactActiveClass,replace:i.replace,ariaCurrentValue:i.ariaCurrentValue,custom:i.custom};return i.custom||(u.value&&(v.class=i.prefetchedClass||n.prefetchedClass),v.rel=i.rel),qn(vy("RouterLink"),v,r.default)}const d=typeof a.value=="object"?((p=s.resolve(a.value))==null?void 0:p.href)??null:a.value&&!i.external&&!l.value?t(Oi(o.app.baseURL,a.value),s.resolve):a.value||null,g=i.target||null,_=i.noRel?null:N1(i.rel,n.externalRelAttribute,d?O1:"")||null,m=()=>hb(d,{replace:i.replace});return i.custom?r.default?r.default({href:d,navigate:m,get route(){if(!d)return;const v=ho(d);return{path:v.pathname,fullPath:v.pathname,get query(){return Ig(v.search)},hash:v.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:d}},rel:_,target:g,isExternal:c.value,isActive:!1,isExactActive:!1}):null:qn("a",{ref:f,href:d,rel:_,target:g},(x=r.default)==null?void 0:x.call(r))}}})}const zh=F1(gb);function zp(n,e){const t=e==="append"?Rl:oc;return Ni(n)&&!n.startsWith("http")?n:t(n,!0)}function k1(){const n=st();if(n._observer)return n._observer;let e=null;const t=new Map,i=(s,o)=>(e||(e=new IntersectionObserver(a=>{for(const l of a){const c=t.get(l.target);(l.isIntersecting||l.intersectionRatio>0)&&c&&c()}})),t.set(s,o),e.observe(s),()=>{t.delete(s),e.unobserve(s),t.size===0&&(e.disconnect(),e=null)});return n._observer={observe:i}}function B1(){const n=navigator.connection;return!!(n&&(n.saveData||/2g/.test(n.effectiveType)))}const z1=Re("span",{class:"link-line"},null,-1),A0={__name:"ButtonLink",props:{link:String,text:String,spanClass:String},setup(n){Tr();function e(t){document.querySelectorAll(".button-link").forEach(r=>{r.classList.remove("is-active")}),t.target.closest(".button-link").classList.add("is-active")}return Hi(()=>{}),(t,i)=>{const r=zh;return Ke(),dt("div",null,[qe(r,{to:n.link,style:{position:"relative"},class:"nav-link"},{default:pa(()=>[Re("span",{onClick:e,class:ss(n.spanClass),style:{visibility:"hidden"}},nn(n.text),3),z1]),_:1},8,["to"])])}}},H1={id:"pageHeader"},G1={id:"wrapperHeader"},V1={id:"socialHeader"},W1=["href"],j1=["href"],X1={key:0},q1=["href"],$1={id:"navHeader"},Y1={__name:"Header",props:{social_1:String,social_2:String,social_3:String},setup(n){const e=Ln();Tr();const t=bn("gl");function i(){e.push("/"+t.value.currentCategory)}return(r,s)=>{const o=U1,a=A0;return Ke(),dt("header",H1,[qe(o),Re("div",G1,[Re("div",V1,[Re("ul",null,[Re("li",null,[Re("a",{href:n.social_1,target:"blank",class:"reveal-header",style:{visibility:"hidden"}},"Instagram",8,W1)]),Re("li",null,[Re("a",{href:n.social_2,target:"blank",class:"reveal-header",style:{visibility:"hidden"}},"LinkedIn",8,j1)]),n.social_3?(Ke(),dt("li",X1,[Re("a",{href:n.social_3,target:"blank",class:"reveal-header",style:{visibility:"hidden"}},"Youtube",8,q1)])):On("",!0)])]),Re("nav",$1,[Re("ul",null,[Re("li",null,[qe(a,{link:"/",text:"Accueil",spanClass:"reveal-header button-link"})]),Re("li",null,[qe(a,{text:"Projets",onClick:i,spanClass:"reveal-header button-link"})]),Re("li",null,[qe(a,{link:"/about",text:"À Propos",spanClass:"reveal-header button-link"})])])])])])}}},C0=n=>(j_("data-v-76111161"),n=n(),X_(),n),K1=C0(()=>Re("span",{id:"pageCrossSelect"},null,-1)),Z1=C0(()=>Re("div",{class:"cross__wrapper"},[Re("span",{class:"cross__content__v"}),Re("span",{class:"cross__content__h"})],-1)),J1=[K1,Z1],Q1={__name:"CrossPage",setup(n){const e=Tr(),t=Ln(),i=bn("gl");function r(){if(e.name!=="index")return;const o=document.querySelectorAll(".cross__handler__item")[0]||null;if(!o)return;i.value.currentCategory=o.textContent.toLowerCase(),Ze.to(".cross__handler__title",{y:"100",duration:1.3,ease:"ease.out"});const a=document.querySelectorAll(".nav-link");a.forEach(l=>{l.querySelector(".button-link").classList.remove("is-active")}),a[1].querySelector(".button-link").classList.add("is-active"),t.push(i.value.currentCategory)}return(s,o)=>(Ke(),dt("span",{onClick:r,id:"pageCross"},J1))}},eA=mc(Q1,[["__scopeId","data-v-76111161"]]),tA=fo({props:{vnode:{type:Object,required:!0},route:{type:Object,required:!0},vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(n){const e=n.renderKey,t=n.route,i={};for(const r in n.route)Object.defineProperty(i,r,{get:()=>e===n.renderKey?n.route[r]:t[r]});return Vs(lc,ha(i)),()=>qn(n.vnode,{ref:n.vnodeRef})}}),nA=fo({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(n,{attrs:e,expose:t}){const i=st(),r=At(),s=on(lc,null);let o;t({pageRef:r});const a=on(lb,null);let l;const c=i.deferHydration();return n.pageKey&&$r(()=>n.pageKey,(u,f)=>{u!==f&&i.callHook("page:loading:start")}),()=>qn(Ev,{name:n.name,route:n.route,...e},{default:u=>{const f=rA(s,u.route,u.Component),h=s&&s.matched.length===u.route.matched.length;if(!u.Component){if(l&&!h)return l;c();return}if(l&&a&&!a.isCurrent(u.route))return l;if(f&&s&&(!a||a!=null&&a.isCurrent(s)))return h?l:null;const d=hf(u,n.pageKey);!i.isHydrating&&!sA(s,u.route,u.Component)&&o===d&&i.callHook("page:loading:end"),o=d;const g=!!(n.transition??u.route.meta.pageTransition??lf),_=g&&iA([n.transition,u.route.meta.pageTransition,lf,{onAfterLeave:()=>{i.callHook("page:transition:finish",u.Component)}}].filter(Boolean)),m=n.keepalive??u.route.meta.keepalive??_b;return l=PT(hh,g&&_,RT(m,qn(K_,{suspensible:!0,onPending:()=>i.callHook("page:start",u.Component),onResolve:()=>{Er(()=>i.callHook("page:finish",u.Component).then(()=>i.callHook("page:loading:end")).finally(c))}},{default:()=>{const p=qn(tA,{key:d||void 0,vnode:u.Component,route:u.route,renderKey:d||void 0,trackRootNodes:g,vnodeRef:r});return m&&(p.type.name=u.Component.type.name||u.Component.type.__name||"RouteProvider"),p}}))).default(),l}})}});function iA(n){const e=n.map(t=>({...t,onAfterLeave:t.onAfterLeave?Sh(t.onAfterLeave):void 0}));return ac(...e)}function rA(n,e,t){if(!n)return!1;const i=e.matched.findIndex(r=>{var s;return((s=r.components)==null?void 0:s.default)===(t==null?void 0:t.type)});return!i||i===-1?!1:e.matched.slice(0,i).some((r,s)=>{var o,a,l;return((o=r.components)==null?void 0:o.default)!==((l=(a=n.matched[s])==null?void 0:a.components)==null?void 0:l.default)})||t&&hf({route:e,Component:t})!==hf({route:n,Component:t})}function sA(n,e,t){return n?e.matched.findIndex(r=>{var s;return((s=r.components)==null?void 0:s.default)===(t==null?void 0:t.type)})<e.matched.length-1:!1}const oA=Re("span",{class:"project-link-line"},null,-1),aA={__name:"CategoryLink",props:{link:String,text:String,spanClass:String},setup(n){Tr();function e(){document.querySelectorAll(".category-link").forEach(r=>{r.classList.remove("is-active"),r.style.backgroundColor="rgba(255, 255, 255, 0)",r.style.color="white"})}function t(i){let s=i.target.closest("a").querySelector(".category-link");e(),s.classList.add("is-active");let o=document.querySelector(".category-link.is-active");o.style.backgroundColor="rgba(255, 255, 255, 1)",o.style.color="black"}return(i,r)=>{const s=zh;return Ke(),dt("div",null,[qe(s,{to:n.link,style:{position:"relative"},onClick:t,class:"project-link"},{default:pa(()=>[Re("span",{class:ss(n.spanClass)},nn(n.text),3),oA]),_:1},8,["to"])])}}},lA={class:"page__title__wrapper"},cA={key:0,class:"page__title__primary reveal"},uA={key:1,class:"page__title__primary__alt reveal"},fA={key:2,class:"page__title__primary reveal-menu",style:{"margin-left":"-0.3%"}},hA={key:3,class:"page__title__secondary"},dA={key:0,class:"reveal"},pA={key:1,class:"reveal"},mA={key:2,class:"reveal"},_A={key:3,class:"reveal-menu"},gA={key:4,class:"page__title__secondary"},vA={key:0,class:"reveal-menu"},xA={key:1,class:"reveal-menu"},R0={__name:"PageTitle",props:{homeTitle:"",pageTitle:"",menuTitle:"",subtitleOne:"",subtitleTwo:"",subtitleThree:"",subtitleMenu:"",subtitleMenuTwo:""},setup(n){return(e,t)=>(Ke(),dt("div",lA,[n.homeTitle?(Ke(),dt("h1",cA,nn(n.homeTitle),1)):n.pageTitle?(Ke(),dt("h1",uA,nn(n.pageTitle),1)):n.menuTitle?(Ke(),dt("div",fA,nn(n.menuTitle),1)):On("",!0),n.subtitleOne?(Ke(),dt("h2",hA,[n.subtitleOne?(Ke(),dt("span",dA,nn(n.subtitleOne),1)):On("",!0),n.subtitleTwo?(Ke(),dt("span",pA,nn(n.subtitleTwo),1)):On("",!0),n.subtitleThree?(Ke(),dt("span",mA,nn(n.subtitleThree),1)):On("",!0),n.subtitleMenu?(Ke(),dt("span",_A,nn(n.subtitleMenu),1)):On("",!0)])):On("",!0),n.subtitleMenu?(Ke(),dt("span",gA,[n.subtitleMenu?(Ke(),dt("span",vA,nn(n.subtitleMenu),1)):On("",!0),n.subtitleMenuTwo?(Ke(),dt("span",xA,nn(n.subtitleMenuTwo),1)):On("",!0)])):On("",!0)]))}};async function yA(n,e){return await SA(e).catch(i=>(console.error("Failed to get image meta for "+e,i+""),{width:0,height:0,ratio:0}))}async function SA(n){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((e,t)=>{const i=new Image;i.onload=()=>{const r={width:i.width,height:i.height,ratio:i.width/i.height};e(r)},i.onerror=r=>t(r),i.src=n})}function Hp(n){return e=>e?n[e]||e:n.missingValue}function MA({formatter:n,keyMap:e,joinWith:t="/",valueMap:i}={}){n||(n=(s,o)=>`${s}=${o}`),e&&typeof e!="function"&&(e=Hp(e));const r=i||{};return Object.keys(r).forEach(s=>{typeof r[s]!="function"&&(r[s]=Hp(r[s]))}),(s={})=>Object.entries(s).filter(([a,l])=>typeof l<"u").map(([a,l])=>{const c=r[a];return typeof c=="function"&&(l=c(s[a])),a=typeof e=="function"?e(a):a,n(a,l)}).join(t)}function pi(n=""){if(typeof n=="number")return n;if(typeof n=="string"&&n.replace("px","").match(/^\d+$/g))return parseInt(n,10)}function EA(n=""){if(n===void 0||!n.length)return[];const e=new Set;for(const t of n.split(" ")){const i=parseInt(t.replace("x",""));i&&e.add(i)}return Array.from(e)}function bA(n){if(n.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function TA(n){const e={};if(typeof n=="string")for(const t of n.split(/[\s,]+/).filter(i=>i)){const i=t.split(":");i.length!==2?e["1px"]=i[0].trim():e[i[0].trim()]=i[1].trim()}else Object.assign(e,n);return e}function wA(n){const e={options:n},t=(r,s={})=>P0(e,r,s),i=(r,s={},o={})=>t(r,{...o,modifiers:ac(s,o.modifiers||{})}).url;for(const r in n.presets)i[r]=(s,o,a)=>i(s,o,{...n.presets[r],...a});return i.options=n,i.getImage=t,i.getMeta=(r,s)=>AA(e,r,s),i.getSizes=(r,s)=>PA(e,r,s),e.$img=i,i}async function AA(n,e,t){const i=P0(n,e,{...t});return typeof i.getMeta=="function"?await i.getMeta():await yA(n,i.url)}function P0(n,e,t){var c,u;if(typeof e!="string"||e==="")throw new TypeError(`input must be a string (received ${typeof e}: ${JSON.stringify(e)})`);if(e.startsWith("data:"))return{url:e};const{provider:i,defaults:r}=CA(n,t.provider||n.options.provider),s=RA(n,t.preset);if(e=Ni(e)?e:Zu(e),!i.supportsAlias)for(const f in n.options.alias)e.startsWith(f)&&(e=Oi(n.options.alias[f],e.substr(f.length)));if(i.validateDomains&&Ni(e)){const f=ho(e).host;if(!n.options.domains.find(h=>h===f))return{url:e}}const o=ac(t,s,r);o.modifiers={...o.modifiers};const a=o.modifiers.format;(c=o.modifiers)!=null&&c.width&&(o.modifiers.width=pi(o.modifiers.width)),(u=o.modifiers)!=null&&u.height&&(o.modifiers.height=pi(o.modifiers.height));const l=i.getImage(e,o,n);return l.format=l.format||a||"",l}function CA(n,e){const t=n.options.providers[e];if(!t)throw new Error("Unknown provider: "+e);return t}function RA(n,e){if(!e)return{};if(!n.options.presets[e])throw new Error("Unknown preset: "+e);return n.options.presets[e]}function PA(n,e,t){var g,_,m,p,x;const i=pi((g=t.modifiers)==null?void 0:g.width),r=pi((_=t.modifiers)==null?void 0:_.height),s=TA(t.sizes),o=(m=t.densities)!=null&&m.trim()?EA(t.densities.trim()):n.options.densities;bA(o);const a=i&&r?r/i:0,l=[],c=[];if(Object.keys(s).length>=1){for(const v in s){const S=Gp(v,String(s[v]),r,a,n);if(S!==void 0){l.push({size:S.size,screenMaxWidth:S.screenMaxWidth,media:`(max-width: ${S.screenMaxWidth}px)`});for(const b of o)c.push({width:S._cWidth*b,src:Vp(n,e,t,S,b)})}}LA(l)}else for(const v of o){const S=Object.keys(s)[0];let b=Gp(S,String(s[S]),r,a,n);b===void 0&&(b={size:"",screenMaxWidth:0,_cWidth:(p=t.modifiers)==null?void 0:p.width,_cHeight:(x=t.modifiers)==null?void 0:x.height}),c.push({width:v,src:Vp(n,e,t,b,v)})}DA(c);const u=c[c.length-1],f=l.length?l.map(v=>`${v.media?v.media+" ":""}${v.size}`).join(", "):void 0,h=f?"w":"x",d=c.map(v=>`${v.src} ${v.width}${h}`).join(", ");return{sizes:f,srcset:d,src:u==null?void 0:u.src}}function Gp(n,e,t,i,r){const s=r.options.screens&&r.options.screens[n]||parseInt(n),o=e.endsWith("vw");if(!o&&/^\d+$/.test(e)&&(e=e+"px"),!o&&!e.endsWith("px"))return;let a=parseInt(e);if(!s||!a)return;o&&(a=Math.round(a/100*s));const l=i?Math.round(a*i):t;return{size:e,screenMaxWidth:s,_cWidth:a,_cHeight:l}}function Vp(n,e,t,i,r){return n.$img(e,{...t.modifiers,width:i._cWidth?i._cWidth*r:void 0,height:i._cHeight?i._cHeight*r:void 0},t)}function LA(n){var t;n.sort((i,r)=>i.screenMaxWidth-r.screenMaxWidth);let e=null;for(let i=n.length-1;i>=0;i--){const r=n[i];r.media===e&&n.splice(i,1),e=r.media}for(let i=0;i<n.length;i++)n[i].media=((t=n[i+1])==null?void 0:t.media)||""}function DA(n){n.sort((t,i)=>t.width-i.width);let e=null;for(let t=n.length-1;t>=0;t--){const i=n[t];i.width===e&&n.splice(t,1),e=i.width}}const IA=MA({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(n,e)=>Bd(n)+"_"+Bd(e)}),UA=(n,{modifiers:e={},baseURL:t}={},i)=>{e.width&&e.height&&(e.resize=`${e.width}x${e.height}`,delete e.width,delete e.height);const r=IA(e)||"_";return t||(t=Oi(i.options.nuxt.baseURL,"/_ipx")),{url:Oi(t,r,Dg(n))}},NA=!0,OA=!0,FA=Object.freeze(Object.defineProperty({__proto__:null,getImage:UA,supportsAlias:OA,validateDomains:NA},Symbol.toStringTag,{value:"Module"})),L0={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:["res.cloudinary.com"],alias:{},densities:[1,2],format:["webp"]};L0.providers={ipxStatic:{provider:FA,defaults:{}}};const D0=()=>{const n=ga(),e=st();return e.$img||e._img||(e._img=wA({...L0,nuxt:{baseURL:n.app.baseURL}}))},kA={src:{type:String,required:!0},format:{type:String,default:void 0},quality:{type:[Number,String],default:void 0},background:{type:String,default:void 0},fit:{type:String,default:void 0},modifiers:{type:Object,default:void 0},preset:{type:String,default:void 0},provider:{type:String,default:void 0},sizes:{type:[Object,String],default:void 0},densities:{type:String,default:void 0},preload:{type:Boolean,default:void 0},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0},alt:{type:String,default:void 0},referrerpolicy:{type:String,default:void 0},usemap:{type:String,default:void 0},longdesc:{type:String,default:void 0},ismap:{type:Boolean,default:void 0},loading:{type:String,default:void 0,validator:n=>["lazy","eager"].includes(n)},crossorigin:{type:[Boolean,String],default:void 0,validator:n=>["anonymous","use-credentials","",!0,!1].includes(n)},decoding:{type:String,default:void 0,validator:n=>["async","auto","sync"].includes(n)},nonce:{type:[String],default:void 0}},BA=n=>{const e=St(()=>({provider:n.provider,preset:n.preset})),t=St(()=>({width:pi(n.width),height:pi(n.height),alt:n.alt,referrerpolicy:n.referrerpolicy,usemap:n.usemap,longdesc:n.longdesc,ismap:n.ismap,crossorigin:n.crossorigin===!0?"anonymous":n.crossorigin||void 0,loading:n.loading,decoding:n.decoding,nonce:n.nonce})),i=D0(),r=St(()=>({...n.modifiers,width:pi(n.width),height:pi(n.height),format:n.format,quality:n.quality||i.options.quality,background:n.background,fit:n.fit}));return{options:e,attrs:t,modifiers:r}},zA={...kA,placeholder:{type:[Boolean,String,Number,Array],default:void 0}},HA=fo({name:"NuxtImg",props:zA,emits:["load","error"],setup:(n,e)=>{const t=D0(),i=BA(n),r=At(!1),s=St(()=>t.getSizes(n.src,{...i.options.value,sizes:n.sizes,densities:n.densities,modifiers:{...i.modifiers.value,width:pi(n.width),height:pi(n.height)}})),o=St(()=>{const d={...i.attrs.value,"data-nuxt-img":""};return(!n.placeholder||r.value)&&(d.sizes=s.value.sizes,d.srcset=s.value.srcset),d}),a=St(()=>{let d=n.placeholder;if(d===""&&(d=!0),!d||r.value)return!1;if(typeof d=="string")return d;const g=Array.isArray(d)?d:typeof d=="number"?[d,d]:[10,10];return t(n.src,{...i.modifiers.value,width:g[0],height:g[1],quality:g[2]||50,blur:g[3]||3},i.options.value)}),l=St(()=>n.sizes?s.value.src:t(n.src,i.modifiers.value,i.options.value)),c=St(()=>a.value?a.value:l.value);if(n.preload){const d=Object.values(s.value).every(g=>g);JE({link:[{rel:"preload",as:"image",nonce:n.nonce,...d?{href:s.value.src,imagesizes:s.value.sizes,imagesrcset:s.value.srcset}:{href:c.value}}]})}const u=At(),h=st().isHydrating;return Hi(()=>{if(a.value){const d=new Image;d.src=l.value,n.sizes&&(d.sizes=s.value.sizes||"",d.srcset=s.value.srcset),d.onload=g=>{r.value=!0,e.emit("load",g)};return}u.value&&(u.value.complete&&h&&(u.value.getAttribute("data-error")?e.emit("error",new Event("error")):e.emit("load",new Event("load"))),u.value.onload=d=>{e.emit("load",d)},u.value.onerror=d=>{e.emit("error",d)})}),()=>qn("img",{ref:u,src:c.value,...o.value,...e.attrs})}});function Vl(n,e,t){return Math.max(n,Math.min(e,t))}class GA{advance(e){var a;if(!this.isRunning)return;let t=!1;if(this.lerp)this.value=(i=this.value,r=this.to,s=60*this.lerp,o=e,function(l,c,u){return(1-u)*l+u*c}(i,r,1-Math.exp(-s*o))),Math.round(this.value)===this.to&&(this.value=this.to,t=!0);else{this.currentTime+=e;const l=Vl(0,this.currentTime/this.duration,1);t=l>=1;const c=t?1:this.easing(l);this.value=this.from+(this.to-this.from)*c}var i,r,s,o;(a=this.onUpdate)==null||a.call(this,this.value,t),t&&this.stop()}stop(){this.isRunning=!1}fromTo(e,t,{lerp:i=.1,duration:r=1,easing:s=l=>l,onStart:o,onUpdate:a}){this.from=this.value=e,this.to=t,this.lerp=i,this.duration=r,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=a}}class VA{constructor({wrapper:e,content:t,autoResize:i=!0}={}){oi(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});oi(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});oi(this,"onContentResize",()=>{this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth});if(this.wrapper=e,this.content=t,i){const r=function(s,o){let a;return function(){let l=arguments,c=this;clearTimeout(a),a=setTimeout(function(){s.apply(c,l)},o)}}(this.resize,250);this.wrapper!==window&&(this.wrapperResizeObserver=new ResizeObserver(r),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(r),this.contentResizeObserver.observe(this.content)}this.resize()}destroy(){var e,t;(e=this.wrapperResizeObserver)==null||e.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class I0{constructor(){this.events={}}emit(e,...t){let i=this.events[e]||[];for(let r=0,s=i.length;r<s;r++)i[r](...t)}on(e,t){var i;return(i=this.events[e])!=null&&i.push(t)||(this.events[e]=[t]),()=>{var r;this.events[e]=(r=this.events[e])==null?void 0:r.filter(s=>t!==s)}}off(e,t){var i;this.events[e]=(i=this.events[e])==null?void 0:i.filter(r=>t!==r)}destroy(){this.events={}}}class WA{constructor(e,{wheelMultiplier:t=1,touchMultiplier:i=2,normalizeWheel:r=!1}){oi(this,"onTouchStart",e=>{const{clientX:t,clientY:i}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})});oi(this,"onTouchMove",e=>{const{clientX:t,clientY:i}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.touchMultiplier,s=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=t,this.touchStart.y=i,this.lastDelta={x:r,y:s},this.emitter.emit("scroll",{deltaX:r,deltaY:s,event:e})});oi(this,"onTouchEnd",e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})});oi(this,"onWheel",e=>{let{deltaX:t,deltaY:i}=e;this.normalizeWheel&&(t=Vl(-100,t,100),i=Vl(-100,i,100)),t*=this.wheelMultiplier,i*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:i,event:e})});this.element=e,this.wheelMultiplier=t,this.touchMultiplier=i,this.normalizeWheel=r,this.touchStart={x:null,y:null},this.emitter=new I0,this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class jA{constructor({wrapper:e=window,content:t=document.documentElement,wheelEventsTarget:i=e,eventsTarget:r=i,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:a=.075,touchInertiaMultiplier:l=35,duration:c,easing:u=v=>Math.min(1,1.001-Math.pow(2,-10*v)),lerp:f=!c&&.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:g="vertical",touchMultiplier:_=1,wheelMultiplier:m=1,normalizeWheel:p=!1,autoResize:x=!0}={}){oi(this,"onVirtualScroll",({deltaX:e,deltaY:t,event:i})=>{if(i.ctrlKey)return;const r=i.type.includes("touch"),s=i.type.includes("wheel");if(this.options.syncTouch&&r&&i.type==="touchstart")return void this.reset();const o=e===0&&t===0,a=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||a)return;let l=i.composedPath();if(l=l.slice(0,l.indexOf(this.rootElement)),l.find(h=>{var d,g,_,m;return((d=h.hasAttribute)==null?void 0:d.call(h,"data-lenis-prevent"))||r&&((g=h.hasAttribute)==null?void 0:g.call(h,"data-lenis-prevent-touch"))||s&&((_=h.hasAttribute)==null?void 0:_.call(h,"data-lenis-prevent-wheel"))||((m=h.classList)==null?void 0:m.contains("lenis"))}))return;if(this.isStopped||this.isLocked)return void i.preventDefault();if(this.isSmooth=this.options.syncTouch&&r||this.options.smoothWheel&&s,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();i.preventDefault();let c=t;this.options.gestureOrientation==="both"?c=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(c=e);const u=r&&this.options.syncTouch,f=r&&i.type==="touchend"&&Math.abs(c)>5;f&&(c=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+c,{programmatic:!1,...u?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});oi(this,"onNativeScroll",()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-e),this.emit()}});window.lenisVersion="1.0.34",e!==document.documentElement&&e!==document.body||(e=window),this.options={wrapper:e,content:t,wheelEventsTarget:i,eventsTarget:r,smoothWheel:s,syncTouch:o,syncTouchLerp:a,touchInertiaMultiplier:l,duration:c,easing:u,lerp:f,infinite:h,gestureOrientation:g,orientation:d,touchMultiplier:_,wheelMultiplier:m,normalizeWheel:p,autoResize:x},this.animate=new GA,this.emitter=new I0,this.dimensions=new VA({wrapper:e,content:t,autoResize:x}),this.toggleClass("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=o||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll=new WA(r,{touchMultiplier:_,wheelMultiplier:m,normalizeWheel:p}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClass("lenis",!1),this.toggleClass("lenis-smooth",!1),this.toggleClass("lenis-scrolling",!1),this.toggleClass("lenis-stopped",!1),this.toggleClass("lenis-locked",!1)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}setScroll(e){this.isHorizontal?this.rootElement.scrollLeft=e:this.rootElement.scrollTop=e}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(e){const t=e-(this.time||e);this.time=e,this.animate.advance(.001*t)}scrollTo(e,{offset:t=0,immediate:i=!1,lock:r=!1,duration:s=this.options.duration,easing:o=this.options.easing,lerp:a=!s&&this.options.lerp,onComplete:l=null,force:c=!1,programmatic:u=!0}={}){if(!this.isStopped&&!this.isLocked||c){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let f;if(typeof e=="string"?f=document.querySelector(e):e!=null&&e.nodeType&&(f=e),f){if(this.options.wrapper!==window){const d=this.options.wrapper.getBoundingClientRect();t-=this.isHorizontal?d.left:d.top}const h=f.getBoundingClientRect();e=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof e=="number"){if(e+=t,e=Math.round(e),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):e=Vl(0,e,this.limit),i)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(l==null?void 0:l(this));if(!u){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:s,easing:o,lerp:a,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(f,h)=>{this.isScrolling=!0,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(e=this.animatedScroll,t=this.limit,(e%t+t)%t):this.animatedScroll;var e,t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(e){this.__isSmooth!==e&&(this.__isSmooth=e,this.toggleClass("lenis-smooth",e))}get isScrolling(){return this.__isScrolling}set isScrolling(e){this.__isScrolling!==e&&(this.__isScrolling=e,this.toggleClass("lenis-scrolling",e))}get isStopped(){return this.__isStopped}set isStopped(e){this.__isStopped!==e&&(this.__isStopped=e,this.toggleClass("lenis-stopped",e))}get isLocked(){return this.__isLocked}set isLocked(e){this.__isLocked!==e&&(this.__isLocked=e,this.toggleClass("lenis-locked",e))}get className(){let e="lenis";return this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isSmooth&&(e+=" lenis-smooth"),e}toggleClass(e,t){this.rootElement.classList.toggle(e,t),this.emitter.emit("className change",this)}}const XA={class:"title__menu__wrapper"},qA={id:"indexContentWrapper"},$A={class:"index__content__col"},YA={class:"index__card__img__wrapper"},KA={class:"index__card__info__wrapper"},ZA={class:"index__card__number reveal-text-menu"},JA={class:"index__card__title reveal-text-menu"},QA={key:0,class:"index__card__type reveal-text-menu"},eC={class:"index__card__subtitle reveal-text-menu"},tC={__name:"IndexMenu",setup(n){const e=At(null),t=bn("gl"),i=bn("projects"),r=At(!1),s=Tr();let o=!1;function a(){return new Promise(h=>{t.value.lenisMenu=new jA({wrapper:e.value,content:e.value,autoResize:!0}),t.value.lenisMenu.scrollTo(0,{immediate:!0});const d=g=>{t.value.lenisMenu.raf(g),requestAnimationFrame(d)};d(t.value.time.elapsed),h()})}function l(h){Qc(t,s,!1)}function c(h){o||(o=!0,C1(t,s),Ze.set("#pageContent",{autoAlpha:0}),Ze.set(".cross__wrapper",{autoAlpha:1,y:"-130%"}),t.value.ASlider&&d1(t),Qc(t,s,!0),setTimeout(()=>{o=!1},300))}const u=Ln();function f(h){Qc(t,s,!1),u.push("/mentions")}return Hi(async()=>{await Er(),r.value="ontouchstart"in window||navigator.maxTouchPoints>0,a().then(()=>{Ze.set("#indexMenu",{autoAlpha:0})})}),(h,d)=>{const g=R0,_=HA,m=zh;return Ke(),dt("section",{id:"indexMenu",ref_key:"indexMenuRef",ref:e},[Re("span",{class:ss(["close__menu reveal-text-menu",{"button-link":!ht(r)}]),id:"closeMenu",onClick:l},"Fermer",2),Re("span",{class:ss(["mentions__menu reveal-text-menu",{"button-link":!ht(r)}]),id:"mentionsMenu",onClick:f},"Mentions",2),Re("div",XA,[qe(g,{menuTitle:"Index",subtitleMenu:"Projets"})]),Re("div",qA,[Re("nav",$A,[(Ke(!0),dt(Xt,null,Hy(ht(i).slice().reverse(),(p,x)=>(Ke(),rr(m,{key:x,to:"/photos/"+p.slug,class:"index__card",id:"item",onClick:c},{default:pa(()=>[Re("div",YA,[qe(_,{class:"index__card__img",src:p.acf.primary.url,alt:p.acf.primary.alt,width:"200"},null,8,["src","alt"])]),Re("div",KA,[Re("div",null,[Re("p",ZA,nn(p.acf.project_number),1)]),Re("div",null,[Re("p",JA,nn(p.acf.title),1),p.acf.type?(Ke(),dt("p",QA,nn(p.acf.type),1)):On("",!0),Re("p",eC,nn(p.acf.localisation),1)])])]),_:2},1032,["to"]))),128))])])],512)}}},nC=mc(tC,[["__scopeId","data-v-ab0821b4"]]);async function iC(...n){const e=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(e);const[t,i]=n;if(!t||typeof t!="string")throw new TypeError("[nuxt] [callOnce] key must be a string: "+t);if(i!==void 0&&typeof i!="function")throw new Error("[nuxt] [callOnce] fn must be a function: "+i);const r=st();r.payload.once.has(t)||(r._once=r._once||{},r._once[t]=r._once[t]||i(),await r._once[t],r.payload.once.add(t),delete r._once[t])}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hh="160",rC=0,Wp=1,sC=2,U0=1,oC=2,wi=3,Sr=0,gn=1,Ri=2,mr=0,qs=1,jp=2,Xp=3,qp=4,aC=5,Vr=100,lC=101,cC=102,$p=103,Yp=104,uC=200,fC=201,hC=202,dC=203,Pf=204,Lf=205,pC=206,mC=207,_C=208,gC=209,vC=210,xC=211,yC=212,SC=213,MC=214,EC=0,bC=1,TC=2,Wl=3,wC=4,AC=5,CC=6,RC=7,N0=0,PC=1,LC=2,_r=0,DC=1,IC=2,UC=3,NC=4,OC=5,FC=6,O0=300,so=301,oo=302,Df=303,If=304,_c=306,Uf=1e3,ni=1001,Nf=1002,rn=1003,Kp=1004,eu=1005,Bn=1006,kC=1007,aa=1008,gr=1009,BC=1010,zC=1011,Gh=1012,F0=1013,lr=1014,cr=1015,la=1016,k0=1017,B0=1018,ts=1020,HC=1021,ii=1023,GC=1024,VC=1025,ns=1026,ao=1027,WC=1028,z0=1029,jC=1030,H0=1031,G0=1033,tu=33776,nu=33777,iu=33778,ru=33779,Zp=35840,Jp=35841,Qp=35842,em=35843,V0=36196,tm=37492,nm=37496,im=37808,rm=37809,sm=37810,om=37811,am=37812,lm=37813,cm=37814,um=37815,fm=37816,hm=37817,dm=37818,pm=37819,mm=37820,_m=37821,su=36492,gm=36494,vm=36495,XC=36283,xm=36284,ym=36285,Sm=36286,W0=3e3,is=3001,qC=3200,$C=3201,YC=0,KC=1,Hn="",kt="srgb",Bi="srgb-linear",Vh="display-p3",gc="display-p3-linear",jl="linear",ft="srgb",Xl="rec709",ql="p3",ms=7680,Mm=519,ZC=512,JC=513,QC=514,j0=515,eR=516,tR=517,nR=518,iR=519,Em=35044,bm="300 es",Of=1035,Li=2e3,$l=2001;class po{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ou=Math.PI/180,Ff=180/Math.PI;function xa(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function hn(n,e,t){return Math.max(e,Math.min(t,n))}function rR(n,e){return(n%e+e)%e}function au(n,e,t){return(1-t)*n+t*e}function Tm(n){return(n&n-1)===0&&n!==0}function kf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function So(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,i,r,s,o,a,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],x=r[1],v=r[4],S=r[7],b=r[2],E=r[5],T=r[8];return s[0]=o*_+a*x+l*b,s[3]=o*m+a*v+l*E,s[6]=o*p+a*S+l*T,s[1]=c*_+u*x+f*b,s[4]=c*m+u*v+f*E,s[7]=c*p+u*S+f*T,s[2]=h*_+d*x+g*b,s[5]=h*m+d*v+g*E,s[8]=h*p+d*S+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+i*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lu.makeScale(e,t)),this}rotate(e){return this.premultiply(lu.makeRotation(-e)),this}translate(e,t){return this.premultiply(lu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lu=new Xe;function X0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ca(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function sR(){const n=ca("canvas");return n.style.display="block",n}const wm={};function Wo(n){n in wm||(wm[n]=!0,console.warn(n))}const Am=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Cm=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ga={[Bi]:{transfer:jl,primaries:Xl,toReference:n=>n,fromReference:n=>n},[kt]:{transfer:ft,primaries:Xl,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[gc]:{transfer:jl,primaries:ql,toReference:n=>n.applyMatrix3(Cm),fromReference:n=>n.applyMatrix3(Am)},[Vh]:{transfer:ft,primaries:ql,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Cm),fromReference:n=>n.applyMatrix3(Am).convertLinearToSRGB()}},oR=new Set([Bi,gc]),tt={enabled:!0,_workingColorSpace:Bi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!oR.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ga[e].toReference,r=Ga[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ga[n].primaries},getTransfer:function(n){return n===Hn?jl:Ga[n].transfer}};function $s(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function cu(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let _s;class q0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_s===void 0&&(_s=ca("canvas")),_s.width=e.width,_s.height=e.height;const i=_s.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=_s}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ca("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=$s(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($s(t[i]/255)*255):t[i]=$s(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let aR=0;class $0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:aR++}),this.uuid=xa(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(uu(r[o].image)):s.push(uu(r[o]))}else s=uu(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function uu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?q0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lR=0;class vn extends po{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,i=ni,r=ni,s=Bn,o=aa,a=ii,l=gr,c=vn.DEFAULT_ANISOTROPY,u=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lR++}),this.uuid=xa(),this.name="",this.source=new $0(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Wo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===is?kt:Hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==O0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Uf:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case Nf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Uf:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case Nf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Wo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===kt?is:W0}set encoding(e){Wo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===is?kt:Hn}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=O0;vn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,i=0,r=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,b=(p+1)/2,E=(u+h)/4,T=(f+_)/4,L=(g+m)/4;return v>S&&v>b?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=E/i,s=T/i):S>b?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=L/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=T/s,r=L/s),this.set(i,r,s,t),this}let x=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(f-_)/x,this.z=(h-u)/x,this.w=Math.acos((c+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cR extends po{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Wo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===is?kt:Hn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new vn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $0(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cs extends cR{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Y0 extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uR extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ya{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const b=Math.sqrt(v),E=Math.atan2(b,p*x);m=Math.sin(m*E)/b,a=Math.sin(a*E)/b}const S=a*x;if(l=l*m+h*S,c=c*m+d*S,u=u*m+g*S,f=f*m+_*S,m===1-a){const b=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=b,c*=b,u*=b,f*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(hn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ee{constructor(e=0,t=0,i=0){ee.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fu.copy(this).projectOnVector(e),this.sub(fu)}reflect(e){return this.sub(fu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fu=new ee,Rm=new ya;class Sa{constructor(e=new ee(1/0,1/0,1/0),t=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yn):Yn.fromBufferAttribute(s,o),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Va.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Va.copy(i.boundingBox)),Va.applyMatrix4(e.matrixWorld),this.union(Va)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mo),Wa.subVectors(this.max,Mo),gs.subVectors(e.a,Mo),vs.subVectors(e.b,Mo),xs.subVectors(e.c,Mo),$i.subVectors(vs,gs),Yi.subVectors(xs,vs),Ur.subVectors(gs,xs);let t=[0,-$i.z,$i.y,0,-Yi.z,Yi.y,0,-Ur.z,Ur.y,$i.z,0,-$i.x,Yi.z,0,-Yi.x,Ur.z,0,-Ur.x,-$i.y,$i.x,0,-Yi.y,Yi.x,0,-Ur.y,Ur.x,0];return!hu(t,gs,vs,xs,Wa)||(t=[1,0,0,0,1,0,0,0,1],!hu(t,gs,vs,xs,Wa))?!1:(ja.crossVectors($i,Yi),t=[ja.x,ja.y,ja.z],hu(t,gs,vs,xs,Wa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Si=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],Yn=new ee,Va=new Sa,gs=new ee,vs=new ee,xs=new ee,$i=new ee,Yi=new ee,Ur=new ee,Mo=new ee,Wa=new ee,ja=new ee,Nr=new ee;function hu(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Nr.fromArray(n,s);const a=r.x*Math.abs(Nr.x)+r.y*Math.abs(Nr.y)+r.z*Math.abs(Nr.z),l=e.dot(Nr),c=t.dot(Nr),u=i.dot(Nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const fR=new Sa,Eo=new ee,du=new ee;class Wh{constructor(e=new ee,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):fR.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Eo.subVectors(e,this.center);const t=Eo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Eo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(du.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Eo.copy(e.center).add(du)),this.expandByPoint(Eo.copy(e.center).sub(du))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mi=new ee,pu=new ee,Xa=new ee,Ki=new ee,mu=new ee,qa=new ee,_u=new ee;class hR{constructor(e=new ee,t=new ee(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){pu.copy(e).add(t).multiplyScalar(.5),Xa.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(pu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Xa),a=Ki.dot(this.direction),l=-Ki.dot(Xa),c=Ki.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(pu).addScaledVector(Xa,h),d}intersectSphere(e,t){Mi.subVectors(e.center,this.origin);const i=Mi.dot(this.direction),r=Mi.dot(Mi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,i,r,s){mu.subVectors(t,e),qa.subVectors(i,e),_u.crossVectors(mu,qa);let o=this.direction.dot(_u),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ki.subVectors(this.origin,e);const l=a*this.direction.dot(qa.crossVectors(Ki,qa));if(l<0)return null;const c=a*this.direction.dot(mu.cross(Ki));if(c<0||l+c>o)return null;const u=-a*Ki.dot(_u);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ys.setFromMatrixColumn(e,0).length(),s=1/ys.setFromMatrixColumn(e,1).length(),o=1/ys.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dR,e,pR)}lookAt(e,t,i){const r=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Zi.crossVectors(i,Mn),Zi.lengthSq()===0&&(Math.abs(i.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Zi.crossVectors(i,Mn)),Zi.normalize(),$a.crossVectors(Mn,Zi),r[0]=Zi.x,r[4]=$a.x,r[8]=Mn.x,r[1]=Zi.y,r[5]=$a.y,r[9]=Mn.y,r[2]=Zi.z,r[6]=$a.z,r[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],x=i[3],v=i[7],S=i[11],b=i[15],E=r[0],T=r[4],L=r[8],y=r[12],w=r[1],N=r[5],U=r[9],$=r[13],D=r[2],k=r[6],O=r[10],V=r[14],H=r[3],ne=r[7],ue=r[11],le=r[15];return s[0]=o*E+a*w+l*D+c*H,s[4]=o*T+a*N+l*k+c*ne,s[8]=o*L+a*U+l*O+c*ue,s[12]=o*y+a*$+l*V+c*le,s[1]=u*E+f*w+h*D+d*H,s[5]=u*T+f*N+h*k+d*ne,s[9]=u*L+f*U+h*O+d*ue,s[13]=u*y+f*$+h*V+d*le,s[2]=g*E+_*w+m*D+p*H,s[6]=g*T+_*N+m*k+p*ne,s[10]=g*L+_*U+m*O+p*ue,s[14]=g*y+_*$+m*V+p*le,s[3]=x*E+v*w+S*D+b*H,s[7]=x*T+v*N+S*k+b*ne,s[11]=x*L+v*U+S*O+b*ue,s[15]=x*y+v*$+S*V+b*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*d-i*l*d)+_*(+t*l*d-t*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-t*l*f+t*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,v=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,S=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,b=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,E=t*x+i*v+r*S+s*b;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=x*T,e[1]=(_*h*s-f*m*s-_*r*d+i*m*d+f*r*p-i*h*p)*T,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*T,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*d-i*l*d)*T,e[4]=v*T,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*T,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*T,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*d+t*l*d)*T,e[8]=S*T,e[9]=(g*f*s-u*_*s-g*i*d+t*_*d+u*i*p-t*f*p)*T,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*p+t*a*p)*T,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*d-t*a*d)*T,e[12]=b*T,e[13]=(u*_*r-g*f*r+g*i*h-t*_*h-u*i*m+t*f*m)*T,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*T,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*h+t*a*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,x=l*c,v=l*u,S=l*f,b=i.x,E=i.y,T=i.z;return r[0]=(1-(_+p))*b,r[1]=(d+S)*b,r[2]=(g-v)*b,r[3]=0,r[4]=(d-S)*E,r[5]=(1-(h+p))*E,r[6]=(m+x)*E,r[7]=0,r[8]=(g+v)*T,r[9]=(m-x)*T,r[10]=(1-(h+_))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ys.set(r[0],r[1],r[2]).length();const o=ys.set(r[4],r[5],r[6]).length(),a=ys.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Kn.copy(this);const c=1/s,u=1/o,f=1/a;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=f,Kn.elements[9]*=f,Kn.elements[10]*=f,t.setFromRotationMatrix(Kn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Li){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let d,g;if(a===Li)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===$l)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Li){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(o-s),h=(t+e)*c,d=(i+r)*u;let g,_;if(a===Li)g=(o+s)*f,_=-2*f;else if(a===$l)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ys=new ee,Kn=new Ht,dR=new ee(0,0,0),pR=new ee(1,1,1),Zi=new ee,$a=new ee,Mn=new ee,Pm=new Ht,Lm=new ya;class vc{constructor(e=0,t=0,i=0,r=vc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(hn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-hn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(hn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Pm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lm.setFromEuler(this),this.setFromQuaternion(Lm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vc.DEFAULT_ORDER="XYZ";class K0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mR=0;const Dm=new ee,Ss=new ya,Ei=new Ht,Ya=new ee,bo=new ee,_R=new ee,gR=new ya,Im=new ee(1,0,0),Um=new ee(0,1,0),Nm=new ee(0,0,1),vR={type:"added"},xR={type:"removed"};class Rn extends po{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mR++}),this.uuid=xa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const e=new ee,t=new vc,i=new ya,r=new ee(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Xe}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new K0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Im,e)}rotateY(e){return this.rotateOnAxis(Um,e)}rotateZ(e){return this.rotateOnAxis(Nm,e)}translateOnAxis(e,t){return Dm.copy(e).applyQuaternion(this.quaternion),this.position.add(Dm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Im,e)}translateY(e){return this.translateOnAxis(Um,e)}translateZ(e){return this.translateOnAxis(Nm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ya.copy(e):Ya.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(bo,Ya,this.up):Ei.lookAt(Ya,bo,this.up),this.quaternion.setFromRotationMatrix(Ei),r&&(Ei.extractRotation(r.matrixWorld),Ss.setFromRotationMatrix(Ei),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(vR)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xR)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bo,e,_R),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bo,gR,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rn.DEFAULT_UP=new ee(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zn=new ee,bi=new ee,gu=new ee,Ti=new ee,Ms=new ee,Es=new ee,Om=new ee,vu=new ee,xu=new ee,yu=new ee;let Ka=!1;class ei{constructor(e=new ee,t=new ee,i=new ee){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Zn.subVectors(e,t),r.cross(Zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Zn.subVectors(r,t),bi.subVectors(i,t),gu.subVectors(e,t);const o=Zn.dot(Zn),a=Zn.dot(bi),l=Zn.dot(gu),c=bi.dot(bi),u=bi.dot(gu),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getUV(e,t,i,r,s,o,a,l){return Ka===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ka=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ti.x),l.addScaledVector(o,Ti.y),l.addScaledVector(a,Ti.z),l)}static isFrontFacing(e,t,i,r){return Zn.subVectors(i,t),bi.subVectors(e,t),Zn.cross(bi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),Zn.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ei.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Ka===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ka=!0),ei.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return ei.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ms.subVectors(r,i),Es.subVectors(s,i),vu.subVectors(e,i);const l=Ms.dot(vu),c=Es.dot(vu);if(l<=0&&c<=0)return t.copy(i);xu.subVectors(e,r);const u=Ms.dot(xu),f=Es.dot(xu);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ms,o);yu.subVectors(e,s);const d=Ms.dot(yu),g=Es.dot(yu);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Es,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Om.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(Om,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(i).addScaledVector(Ms,o).addScaledVector(Es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Z0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ji={h:0,s:0,l:0},Za={h:0,s:0,l:0};function Su(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class nt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=tt.workingColorSpace){if(e=rR(e,1),t=hn(t,0,1),i=hn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Su(o,s,e+1/3),this.g=Su(o,s,e),this.b=Su(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,t=kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const i=Z0[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}copyLinearToSRGB(e){return this.r=cu(e.r),this.g=cu(e.g),this.b=cu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return tt.fromWorkingColorSpace(jt.copy(this),e),Math.round(hn(jt.r*255,0,255))*65536+Math.round(hn(jt.g*255,0,255))*256+Math.round(hn(jt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(jt.copy(this),t);const i=jt.r,r=jt.g,s=jt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=kt){tt.fromWorkingColorSpace(jt.copy(this),e);const t=jt.r,i=jt.g,r=jt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ji),this.setHSL(Ji.h+e,Ji.s+t,Ji.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ji),e.getHSL(Za);const i=au(Ji.h,Za.h,t),r=au(Ji.s,Za.s,t),s=au(Ji.l,Za.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new nt;nt.NAMES=Z0;let yR=0;class xc extends po{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yR++}),this.uuid=xa(),this.name="",this.type="Material",this.blending=qs,this.side=Sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pf,this.blendDst=Lf,this.blendEquation=Vr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Wl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==qs&&(i.blending=this.blending),this.side!==Sr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Pf&&(i.blendSrc=this.blendSrc),this.blendDst!==Lf&&(i.blendDst=this.blendDst),this.blendEquation!==Vr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Wl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class J0 extends xc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=N0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new ee,Ja=new Qe;class _i{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Em,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=cr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ja.fromBufferAttribute(this,t),Ja.applyMatrix3(e),this.setXY(t,Ja.x,Ja.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=So(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=So(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=So(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=So(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=So(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array),s=cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Em&&(e.usage=this.usage),e}}class Q0 extends _i{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ex extends _i{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class rs extends _i{constructor(e,t,i){super(new Float32Array(e),t,i)}}let SR=0;const Un=new Ht,Mu=new Rn,bs=new ee,En=new Sa,To=new Sa,It=new ee;class ds extends po{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:SR++}),this.uuid=xa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(X0(e)?ex:Q0)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,i){return Un.makeTranslation(e,t,i),this.applyMatrix4(Un),this}scale(e,t,i){return Un.makeScale(e,t,i),this.applyMatrix4(Un),this}lookAt(e){return Mu.lookAt(e),Mu.updateMatrix(),this.applyMatrix4(Mu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new rs(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];En.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ee,1/0);return}if(e){const i=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];To.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(En.min,To.min),En.expandByPoint(It),It.addVectors(En.max,To.max),En.expandByPoint(It)):(En.expandByPoint(To.min),En.expandByPoint(To.max))}En.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)It.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(It));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)It.fromBufferAttribute(a,c),l&&(bs.fromBufferAttribute(e,c),It.add(bs)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _i(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<a;w++)c[w]=new ee,u[w]=new ee;const f=new ee,h=new ee,d=new ee,g=new Qe,_=new Qe,m=new Qe,p=new ee,x=new ee;function v(w,N,U){f.fromArray(r,w*3),h.fromArray(r,N*3),d.fromArray(r,U*3),g.fromArray(o,w*2),_.fromArray(o,N*2),m.fromArray(o,U*2),h.sub(f),d.sub(f),_.sub(g),m.sub(g);const $=1/(_.x*m.y-m.x*_.y);isFinite($)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar($),x.copy(d).multiplyScalar(_.x).addScaledVector(h,-m.x).multiplyScalar($),c[w].add(p),c[N].add(p),c[U].add(p),u[w].add(x),u[N].add(x),u[U].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let w=0,N=S.length;w<N;++w){const U=S[w],$=U.start,D=U.count;for(let k=$,O=$+D;k<O;k+=3)v(i[k+0],i[k+1],i[k+2])}const b=new ee,E=new ee,T=new ee,L=new ee;function y(w){T.fromArray(s,w*3),L.copy(T);const N=c[w];b.copy(N),b.sub(T.multiplyScalar(T.dot(N))).normalize(),E.crossVectors(L,N);const $=E.dot(u[w])<0?-1:1;l[w*4]=b.x,l[w*4+1]=b.y,l[w*4+2]=b.z,l[w*4+3]=$}for(let w=0,N=S.length;w<N;++w){const U=S[w],$=U.start,D=U.count;for(let k=$,O=$+D;k<O;k+=3)y(i[k+0]),y(i[k+1]),y(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _i(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new ee,s=new ee,o=new ee,a=new ee,l=new ee,c=new ee,u=new ee,f=new ee;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new _i(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ds,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fm=new Ht,Or=new hR,Qa=new Wh,km=new ee,Ts=new ee,ws=new ee,As=new ee,Eu=new ee,el=new ee,tl=new Qe,nl=new Qe,il=new Qe,Bm=new ee,zm=new ee,Hm=new ee,rl=new ee,sl=new ee;class ur extends Rn{constructor(e=new ds,t=new J0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){el.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Eu.fromBufferAttribute(f,e),o?el.addScaledVector(Eu,u):el.addScaledVector(Eu.sub(t),u))}t.add(el)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qa.copy(i.boundingSphere),Qa.applyMatrix4(s),Or.copy(e.ray).recast(e.near),!(Qa.containsPoint(Or.origin)===!1&&(Or.intersectSphere(Qa,km)===null||Or.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(Fm.copy(s).invert(),Or.copy(e.ray).applyMatrix4(Fm),!(i.boundingBox!==null&&Or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,b=v;S<b;S+=3){const E=a.getX(S),T=a.getX(S+1),L=a.getX(S+2);r=ol(this,p,e,i,c,u,f,E,T,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);r=ol(this,o,e,i,c,u,f,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,b=v;S<b;S+=3){const E=S,T=S+1,L=S+2;r=ol(this,p,e,i,c,u,f,E,T,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,S=m+2;r=ol(this,o,e,i,c,u,f,x,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function MR(n,e,t,i,r,s,o,a){let l;if(e.side===gn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Sr,a),l===null)return null;sl.copy(a),sl.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(sl);return c<t.near||c>t.far?null:{distance:c,point:sl.clone(),object:n}}function ol(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Ts),n.getVertexPosition(l,ws),n.getVertexPosition(c,As);const u=MR(n,e,t,i,Ts,ws,As,rl);if(u){r&&(tl.fromBufferAttribute(r,a),nl.fromBufferAttribute(r,l),il.fromBufferAttribute(r,c),u.uv=ei.getInterpolation(rl,Ts,ws,As,tl,nl,il,new Qe)),s&&(tl.fromBufferAttribute(s,a),nl.fromBufferAttribute(s,l),il.fromBufferAttribute(s,c),u.uv1=ei.getInterpolation(rl,Ts,ws,As,tl,nl,il,new Qe),u.uv2=u.uv1),o&&(Bm.fromBufferAttribute(o,a),zm.fromBufferAttribute(o,l),Hm.fromBufferAttribute(o,c),u.normal=ei.getInterpolation(rl,Ts,ws,As,Bm,zm,Hm,new ee),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new ee,materialIndex:0};ei.getNormal(Ts,ws,As,f.normal),u.face=f}return u}class Ma extends ds{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new rs(c,3)),this.setAttribute("normal",new rs(u,3)),this.setAttribute("uv",new rs(f,2));function g(_,m,p,x,v,S,b,E,T,L,y){const w=S/T,N=b/L,U=S/2,$=b/2,D=E/2,k=T+1,O=L+1;let V=0,H=0;const ne=new ee;for(let ue=0;ue<O;ue++){const le=ue*N-$;for(let pe=0;pe<k;pe++){const Y=pe*w-U;ne[_]=Y*x,ne[m]=le*v,ne[p]=D,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[m]=0,ne[p]=E>0?1:-1,u.push(ne.x,ne.y,ne.z),f.push(pe/T),f.push(1-ue/L),V+=1}}for(let ue=0;ue<L;ue++)for(let le=0;le<T;le++){const pe=h+le+k*ue,Y=h+le+k*(ue+1),se=h+(le+1)+k*(ue+1),me=h+(le+1)+k*ue;l.push(pe,Y,me),l.push(Y,se,me),H+=6}a.addGroup(d,H,y),d+=H,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ma(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function lo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function tn(n){const e={};for(let t=0;t<n.length;t++){const i=lo(n[t]);for(const r in i)e[r]=i[r]}return e}function ER(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function tx(n){return n.getRenderTarget()===null?n.outputColorSpace:tt.workingColorSpace}const bR={clone:lo,merge:tn};var TR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mr extends xc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=TR,this.fragmentShader=wR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lo(e.uniforms),this.uniformsGroups=ER(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}let nx=class extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};class zn extends nx{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ff*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ou*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ff*2*Math.atan(Math.tan(ou*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ou*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Cs=-90,Rs=1;class AR extends Rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new zn(Cs,Rs,e,t);r.layers=this.layers,this.add(r);const s=new zn(Cs,Rs,e,t);s.layers=this.layers,this.add(s);const o=new zn(Cs,Rs,e,t);o.layers=this.layers,this.add(o);const a=new zn(Cs,Rs,e,t);a.layers=this.layers,this.add(a);const l=new zn(Cs,Rs,e,t);l.layers=this.layers,this.add(l);const c=new zn(Cs,Rs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Li)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$l)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ix extends vn{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:so,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class CR extends cs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Wo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===is?kt:Hn),this.texture=new ix(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ma(5,5,5),s=new Mr({name:"CubemapFromEquirect",uniforms:lo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:mr});s.uniforms.tEquirect.value=t;const o=new ur(r,s),a=t.minFilter;return t.minFilter===aa&&(t.minFilter=Bn),new AR(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const bu=new ee,RR=new ee,PR=new Xe;class zr{constructor(e=new ee(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=bu.subVectors(i,t).cross(RR.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(bu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||PR.getNormalMatrix(e),r=this.coplanarPoint(bu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fr=new Wh,al=new ee;class rx{constructor(e=new zr,t=new zr,i=new zr,r=new zr,s=new zr,o=new zr){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Li){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],x=r[13],v=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-d,S-p).normalize(),i[1].setComponents(l+s,h+c,m+d,S+p).normalize(),i[2].setComponents(l+o,h+u,m+g,S+x).normalize(),i[3].setComponents(l-o,h-u,m-g,S-x).normalize(),i[4].setComponents(l-a,h-f,m-_,S-v).normalize(),t===Li)i[5].setComponents(l+a,h+f,m+_,S+v).normalize();else if(t===$l)i[5].setComponents(a,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fr)}intersectsSprite(e){return Fr.center.set(0,0,0),Fr.radius=.7071067811865476,Fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(al.x=r.normal.x>0?e.max.x:e.min.x,al.y=r.normal.y>0?e.max.y:e.min.y,al.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(al)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sx(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function LR(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,h=c.usage,d=f.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=n.SHORT;else if(f instanceof Uint32Array)_=n.UNSIGNED_INT;else if(f instanceof Int32Array)_=n.INT;else if(f instanceof Int8Array)_=n.BYTE;else if(f instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,u,f){const h=u.array,d=u._updateRange,g=u.updateRanges;if(n.bindBuffer(f,c),d.count===-1&&g.length===0&&n.bufferSubData(f,0,h),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?n.bufferSubData(f,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count):n.bufferSubData(f,p.start*h.BYTES_PER_ELEMENT,h.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?n.bufferSubData(f,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count):n.bufferSubData(f,d.offset*h.BYTES_PER_ELEMENT,h.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:o,remove:a,update:l}}class yc extends ds{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const x=p*h-o;for(let v=0;v<c;v++){const S=v*f-s;g.push(S,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const v=x+c*p,S=x+c*(p+1),b=x+1+c*(p+1),E=x+1+c*p;d.push(v,S,E),d.push(S,b,E)}this.setIndex(d),this.setAttribute("position",new rs(g,3)),this.setAttribute("normal",new rs(_,3)),this.setAttribute("uv",new rs(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yc(e.width,e.height,e.widthSegments,e.heightSegments)}}var DR=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,IR=`#ifdef USE_ALPHAHASH
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
#endif`,UR=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,NR=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,OR=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,FR=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kR=`#ifdef USE_AOMAP
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
#endif`,BR=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zR=`#ifdef USE_BATCHING
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
#endif`,HR=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,GR=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,VR=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,WR=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jR=`#ifdef USE_IRIDESCENCE
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
#endif`,XR=`#ifdef USE_BUMPMAP
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
#endif`,qR=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$R=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,YR=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KR=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ZR=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,JR=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,QR=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,eP=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,tP=`#define PI 3.141592653589793
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
} // validated`,nP=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,iP=`vec3 transformedNormal = objectNormal;
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
#endif`,rP=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sP=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,oP=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,aP=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lP="gl_FragColor = linearToOutputTexel( gl_FragColor );",cP=`
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
}`,uP=`#ifdef USE_ENVMAP
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
#endif`,fP=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hP=`#ifdef USE_ENVMAP
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
#endif`,dP=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pP=`#ifdef USE_ENVMAP
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
#endif`,mP=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_P=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gP=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vP=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xP=`#ifdef USE_GRADIENTMAP
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
}`,yP=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,SP=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,MP=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,EP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bP=`uniform bool receiveShadow;
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
#endif`,TP=`#ifdef USE_ENVMAP
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
#endif`,wP=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CP=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PP=`PhysicalMaterial material;
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
#endif`,LP=`struct PhysicalMaterial {
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
}`,DP=`
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
#endif`,IP=`#if defined( RE_IndirectDiffuse )
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
#endif`,UP=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,NP=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,OP=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FP=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,kP=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,BP=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zP=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,HP=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,GP=`#if defined( USE_POINTS_UV )
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
#endif`,VP=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WP=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jP=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,XP=`#ifdef USE_MORPHNORMALS
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
#endif`,qP=`#ifdef USE_MORPHTARGETS
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
#endif`,$P=`#ifdef USE_MORPHTARGETS
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
#endif`,YP=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,KP=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ZP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QP=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,eL=`#ifdef USE_NORMALMAP
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
#endif`,tL=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nL=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iL=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rL=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sL=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,oL=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,aL=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lL=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cL=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uL=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fL=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hL=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dL=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pL=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mL=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_L=`float getShadowMask() {
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
}`,gL=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vL=`#ifdef USE_SKINNING
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
#endif`,xL=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yL=`#ifdef USE_SKINNING
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
#endif`,SL=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ML=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,EL=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bL=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,TL=`#ifdef USE_TRANSMISSION
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
#endif`,wL=`#ifdef USE_TRANSMISSION
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
#endif`,AL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PL=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const LL=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,DL=`uniform sampler2D t2D;
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
}`,IL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UL=`#ifdef ENVMAP_TYPE_CUBE
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
}`,NL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OL=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FL=`#include <common>
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
}`,kL=`#if DEPTH_PACKING == 3200
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
}`,BL=`#define DISTANCE
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
}`,zL=`#define DISTANCE
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
}`,HL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,GL=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VL=`uniform float scale;
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
}`,WL=`uniform vec3 diffuse;
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
}`,jL=`#include <common>
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
}`,XL=`uniform vec3 diffuse;
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
}`,qL=`#define LAMBERT
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
}`,$L=`#define LAMBERT
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
}`,YL=`#define MATCAP
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
}`,KL=`#define MATCAP
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
}`,ZL=`#define NORMAL
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
}`,JL=`#define NORMAL
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
}`,QL=`#define PHONG
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
}`,e2=`#define PHONG
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
}`,t2=`#define STANDARD
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
}`,n2=`#define STANDARD
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
}`,i2=`#define TOON
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
}`,r2=`#define TOON
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
}`,s2=`uniform float size;
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
}`,o2=`uniform vec3 diffuse;
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
}`,a2=`#include <common>
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
}`,l2=`uniform vec3 color;
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
}`,c2=`uniform float rotation;
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
}`,u2=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:DR,alphahash_pars_fragment:IR,alphamap_fragment:UR,alphamap_pars_fragment:NR,alphatest_fragment:OR,alphatest_pars_fragment:FR,aomap_fragment:kR,aomap_pars_fragment:BR,batching_pars_vertex:zR,batching_vertex:HR,begin_vertex:GR,beginnormal_vertex:VR,bsdfs:WR,iridescence_fragment:jR,bumpmap_pars_fragment:XR,clipping_planes_fragment:qR,clipping_planes_pars_fragment:$R,clipping_planes_pars_vertex:YR,clipping_planes_vertex:KR,color_fragment:ZR,color_pars_fragment:JR,color_pars_vertex:QR,color_vertex:eP,common:tP,cube_uv_reflection_fragment:nP,defaultnormal_vertex:iP,displacementmap_pars_vertex:rP,displacementmap_vertex:sP,emissivemap_fragment:oP,emissivemap_pars_fragment:aP,colorspace_fragment:lP,colorspace_pars_fragment:cP,envmap_fragment:uP,envmap_common_pars_fragment:fP,envmap_pars_fragment:hP,envmap_pars_vertex:dP,envmap_physical_pars_fragment:TP,envmap_vertex:pP,fog_vertex:mP,fog_pars_vertex:_P,fog_fragment:gP,fog_pars_fragment:vP,gradientmap_pars_fragment:xP,lightmap_fragment:yP,lightmap_pars_fragment:SP,lights_lambert_fragment:MP,lights_lambert_pars_fragment:EP,lights_pars_begin:bP,lights_toon_fragment:wP,lights_toon_pars_fragment:AP,lights_phong_fragment:CP,lights_phong_pars_fragment:RP,lights_physical_fragment:PP,lights_physical_pars_fragment:LP,lights_fragment_begin:DP,lights_fragment_maps:IP,lights_fragment_end:UP,logdepthbuf_fragment:NP,logdepthbuf_pars_fragment:OP,logdepthbuf_pars_vertex:FP,logdepthbuf_vertex:kP,map_fragment:BP,map_pars_fragment:zP,map_particle_fragment:HP,map_particle_pars_fragment:GP,metalnessmap_fragment:VP,metalnessmap_pars_fragment:WP,morphcolor_vertex:jP,morphnormal_vertex:XP,morphtarget_pars_vertex:qP,morphtarget_vertex:$P,normal_fragment_begin:YP,normal_fragment_maps:KP,normal_pars_fragment:ZP,normal_pars_vertex:JP,normal_vertex:QP,normalmap_pars_fragment:eL,clearcoat_normal_fragment_begin:tL,clearcoat_normal_fragment_maps:nL,clearcoat_pars_fragment:iL,iridescence_pars_fragment:rL,opaque_fragment:sL,packing:oL,premultiplied_alpha_fragment:aL,project_vertex:lL,dithering_fragment:cL,dithering_pars_fragment:uL,roughnessmap_fragment:fL,roughnessmap_pars_fragment:hL,shadowmap_pars_fragment:dL,shadowmap_pars_vertex:pL,shadowmap_vertex:mL,shadowmask_pars_fragment:_L,skinbase_vertex:gL,skinning_pars_vertex:vL,skinning_vertex:xL,skinnormal_vertex:yL,specularmap_fragment:SL,specularmap_pars_fragment:ML,tonemapping_fragment:EL,tonemapping_pars_fragment:bL,transmission_fragment:TL,transmission_pars_fragment:wL,uv_pars_fragment:AL,uv_pars_vertex:CL,uv_vertex:RL,worldpos_vertex:PL,background_vert:LL,background_frag:DL,backgroundCube_vert:IL,backgroundCube_frag:UL,cube_vert:NL,cube_frag:OL,depth_vert:FL,depth_frag:kL,distanceRGBA_vert:BL,distanceRGBA_frag:zL,equirect_vert:HL,equirect_frag:GL,linedashed_vert:VL,linedashed_frag:WL,meshbasic_vert:jL,meshbasic_frag:XL,meshlambert_vert:qL,meshlambert_frag:$L,meshmatcap_vert:YL,meshmatcap_frag:KL,meshnormal_vert:ZL,meshnormal_frag:JL,meshphong_vert:QL,meshphong_frag:e2,meshphysical_vert:t2,meshphysical_frag:n2,meshtoon_vert:i2,meshtoon_frag:r2,points_vert:s2,points_frag:o2,shadow_vert:a2,shadow_frag:l2,sprite_vert:c2,sprite_frag:u2},ge={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},ci={basic:{uniforms:tn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:tn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:tn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:tn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:tn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:tn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:tn([ge.points,ge.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:tn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:tn([ge.common,ge.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:tn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:tn([ge.sprite,ge.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:tn([ge.common,ge.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:tn([ge.lights,ge.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ci.physical={uniforms:tn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const ll={r:0,b:0,g:0};function f2(n,e,t,i,r,s,o){const a=new nt(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(m,p){let x=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),x=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===_c)?(u===void 0&&(u=new ur(new Ma(1,1,1),new Mr({name:"BackgroundCubeMaterial",uniforms:lo(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=tt.getTransfer(v.colorSpace)!==ft,(f!==v||h!==v.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ur(new yc(2,2),new Mr({name:"BackgroundMaterial",uniforms:lo(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=tt.getTransfer(v.colorSpace)!==ft,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(ll,tx(n)),i.buffers.color.setClear(ll.r,ll.g,ll.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function h2(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function f(D,k,O,V,H){let ne=!1;if(o){const ue=_(V,O,k);c!==ue&&(c=ue,d(c.object)),ne=p(D,V,O,H),ne&&x(D,V,O,H)}else{const ue=k.wireframe===!0;(c.geometry!==V.id||c.program!==O.id||c.wireframe!==ue)&&(c.geometry=V.id,c.program=O.id,c.wireframe=ue,ne=!0)}H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(ne||u)&&(u=!1,L(D,k,O,V),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function h(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function d(D){return i.isWebGL2?n.bindVertexArray(D):s.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?n.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function _(D,k,O){const V=O.wireframe===!0;let H=a[D.id];H===void 0&&(H={},a[D.id]=H);let ne=H[k.id];ne===void 0&&(ne={},H[k.id]=ne);let ue=ne[V];return ue===void 0&&(ue=m(h()),ne[V]=ue),ue}function m(D){const k=[],O=[],V=[];for(let H=0;H<r;H++)k[H]=0,O[H]=0,V[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:O,attributeDivisors:V,object:D,attributes:{},index:null}}function p(D,k,O,V){const H=c.attributes,ne=k.attributes;let ue=0;const le=O.getAttributes();for(const pe in le)if(le[pe].location>=0){const se=H[pe];let me=ne[pe];if(me===void 0&&(pe==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),pe==="instanceColor"&&D.instanceColor&&(me=D.instanceColor)),se===void 0||se.attribute!==me||me&&se.data!==me.data)return!0;ue++}return c.attributesNum!==ue||c.index!==V}function x(D,k,O,V){const H={},ne=k.attributes;let ue=0;const le=O.getAttributes();for(const pe in le)if(le[pe].location>=0){let se=ne[pe];se===void 0&&(pe==="instanceMatrix"&&D.instanceMatrix&&(se=D.instanceMatrix),pe==="instanceColor"&&D.instanceColor&&(se=D.instanceColor));const me={};me.attribute=se,se&&se.data&&(me.data=se.data),H[pe]=me,ue++}c.attributes=H,c.attributesNum=ue,c.index=V}function v(){const D=c.newAttributes;for(let k=0,O=D.length;k<O;k++)D[k]=0}function S(D){b(D,0)}function b(D,k){const O=c.newAttributes,V=c.enabledAttributes,H=c.attributeDivisors;O[D]=1,V[D]===0&&(n.enableVertexAttribArray(D),V[D]=1),H[D]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,k),H[D]=k)}function E(){const D=c.newAttributes,k=c.enabledAttributes;for(let O=0,V=k.length;O<V;O++)k[O]!==D[O]&&(n.disableVertexAttribArray(O),k[O]=0)}function T(D,k,O,V,H,ne,ue){ue===!0?n.vertexAttribIPointer(D,k,O,H,ne):n.vertexAttribPointer(D,k,O,V,H,ne)}function L(D,k,O,V){if(i.isWebGL2===!1&&(D.isInstancedMesh||V.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const H=V.attributes,ne=O.getAttributes(),ue=k.defaultAttributeValues;for(const le in ne){const pe=ne[le];if(pe.location>=0){let Y=H[le];if(Y===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(Y=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(Y=D.instanceColor)),Y!==void 0){const se=Y.normalized,me=Y.itemSize,Se=t.get(Y);if(Se===void 0)continue;const G=Se.buffer,fe=Se.type,ae=Se.bytesPerElement,re=i.isWebGL2===!0&&(fe===n.INT||fe===n.UNSIGNED_INT||Y.gpuType===F0);if(Y.isInterleavedBufferAttribute){const Ee=Y.data,W=Ee.stride,R=Y.offset;if(Ee.isInstancedInterleavedBuffer){for(let P=0;P<pe.locationSize;P++)b(pe.location+P,Ee.meshPerAttribute);D.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let P=0;P<pe.locationSize;P++)S(pe.location+P);n.bindBuffer(n.ARRAY_BUFFER,G);for(let P=0;P<pe.locationSize;P++)T(pe.location+P,me/pe.locationSize,fe,se,W*ae,(R+me/pe.locationSize*P)*ae,re)}else{if(Y.isInstancedBufferAttribute){for(let Ee=0;Ee<pe.locationSize;Ee++)b(pe.location+Ee,Y.meshPerAttribute);D.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ee=0;Ee<pe.locationSize;Ee++)S(pe.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,G);for(let Ee=0;Ee<pe.locationSize;Ee++)T(pe.location+Ee,me/pe.locationSize,fe,se,me*ae,me/pe.locationSize*Ee*ae,re)}}else if(ue!==void 0){const se=ue[le];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(pe.location,se);break;case 3:n.vertexAttrib3fv(pe.location,se);break;case 4:n.vertexAttrib4fv(pe.location,se);break;default:n.vertexAttrib1fv(pe.location,se)}}}}E()}function y(){U();for(const D in a){const k=a[D];for(const O in k){const V=k[O];for(const H in V)g(V[H].object),delete V[H];delete k[O]}delete a[D]}}function w(D){if(a[D.id]===void 0)return;const k=a[D.id];for(const O in k){const V=k[O];for(const H in V)g(V[H].object),delete V[H];delete k[O]}delete a[D.id]}function N(D){for(const k in a){const O=a[k];if(O[D.id]===void 0)continue;const V=O[D.id];for(const H in V)g(V[H].object),delete V[H];delete O[D.id]}}function U(){$(),u=!0,c!==l&&(c=l,d(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:U,resetDefaultState:$,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfProgram:N,initAttributes:v,enableAttribute:S,disableUnusedAttributes:E}}function d2(n,e,t,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,h){if(h===0)return;let d,g;if(r)d=n,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](s,u,f,h),t.update(f,s,h)}function c(u,f,h){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<h;g++)this.render(u[g],f[g]);else{d.multiDrawArraysWEBGL(s,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=f[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function p2(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,S=o||e.has("OES_texture_float"),b=v&&S,E=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:b,maxSamples:E}}function m2(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new zr,a=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const x=s?0:i,v=x*4;let S=p.clippingState||null;l.value=S,S=u(g,h,v,d);for(let b=0;b!==v;++b)S[b]=t[b];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=d;v!==_;++v,S+=4)o.copy(f[v]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function _2(n){let e=new WeakMap;function t(o,a){return a===Df?o.mapping=so:a===If&&(o.mapping=oo),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Df||a===If)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new CR(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class g2 extends nx{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Os=4,Gm=[.125,.215,.35,.446,.526,.582],Wr=20,Tu=new g2,Vm=new nt;let wu=null,Au=0,Cu=0;const Hr=(1+Math.sqrt(5))/2,Ps=1/Hr,Wm=[new ee(1,1,1),new ee(-1,1,1),new ee(1,1,-1),new ee(-1,1,-1),new ee(0,Hr,Ps),new ee(0,Hr,-Ps),new ee(Ps,0,Hr),new ee(-Ps,0,Hr),new ee(Hr,Ps,0),new ee(-Hr,Ps,0)];class jm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){wu=this._renderer.getRenderTarget(),Au=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$m(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wu,Au,Cu),e.scissorTest=!1,cl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===so||e.mapping===oo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wu=this._renderer.getRenderTarget(),Au=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:la,format:ii,colorSpace:Bi,depthBuffer:!1},r=Xm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xm(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=v2(s)),this._blurMaterial=x2(s,e,t)}return r}_compileMaterial(e){const t=new ur(this._lodPlanes[0],e);this._renderer.compile(t,Tu)}_sceneToCubeUV(e,t,i,r){const a=new zn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Vm),u.toneMapping=_r,u.autoClear=!1;const d=new J0({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),g=new ur(new Ma,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(Vm),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const v=this._cubeSize;cl(r,x*v,p>2?v:0,v,v),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===so||e.mapping===oo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$m()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ur(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;cl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Tu)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Wm[(r-1)%Wm.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new ur(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Wr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Wr;m>Wr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wr}`);const p=[];let x=0;for(let T=0;T<Wr;++T){const L=T/_,y=Math.exp(-L*L/2);p.push(y),T===0?x+=y:T<m&&(x+=2*y)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-i;const S=this._sizeLods[r],b=3*S*(r>v-Os?r-v+Os:0),E=4*(this._cubeSize-S);cl(t,b,E,3*S,2*S),l.setRenderTarget(t),l.render(f,Tu)}}function v2(n){const e=[],t=[],i=[];let r=n;const s=n-Os+1+Gm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Os?l=Gm[o-n+Os-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*d),v=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let E=0;E<d;E++){const T=E%3*2/3-1,L=E>2?0:-1,y=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];x.set(y,_*g*E),v.set(h,m*g*E);const w=[E,E,E,E,E,E];S.set(w,p*g*E)}const b=new ds;b.setAttribute("position",new _i(x,_)),b.setAttribute("uv",new _i(v,m)),b.setAttribute("faceIndex",new _i(S,p)),e.push(b),r>Os&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Xm(n,e,t){const i=new cs(n,e,t);return i.texture.mapping=_c,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function x2(n,e,t){const i=new Float32Array(Wr),r=new ee(0,1,0);return new Mr({name:"SphericalGaussianBlur",defines:{n:Wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:jh(),fragmentShader:`

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
		`,blending:mr,depthTest:!1,depthWrite:!1})}function qm(){return new Mr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jh(),fragmentShader:`

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
		`,blending:mr,depthTest:!1,depthWrite:!1})}function $m(){return new Mr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mr,depthTest:!1,depthWrite:!1})}function jh(){return`

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
	`}function y2(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Df||l===If,u=l===so||l===oo;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new jm(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new jm(n));const h=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function S2(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function M2(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let v=0,S=x.length;v<S;v+=3){const b=x[v+0],E=x[v+1],T=x[v+2];h.push(b,E,E,T,T,b)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const b=v+0,E=v+1,T=v+2;h.push(b,E,E,T,T,b)}}else return;const m=new(X0(h)?ex:Q0)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function E2(n,e,t,i){const r=i.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,g){n.drawElements(s,g,a,d*l),t.update(g,s,1)}function f(d,g,_){if(_===0)return;let m,p;if(r)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,d*l,_),t.update(g,s,_)}function h(d,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,d,0,_);let p=0;for(let x=0;x<_;x++)p+=g[x];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function b2(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function T2(n,e){return n[0]-e[0]}function w2(n,e){return Math.abs(e[1])-Math.abs(n[1])}function A2(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new zt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0;let _=s.get(u);if(_===void 0||_.count!==g){let D=function(){U.dispose(),s.delete(u),u.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();const x=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,b=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let L=0;x===!0&&(L=1),v===!0&&(L=2),S===!0&&(L=3);let y=u.attributes.position.count*L,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const N=new Float32Array(y*w*4*g),U=new Y0(N,y,w,g);U.type=cr,U.needsUpdate=!0;const $=L*4;for(let k=0;k<g;k++){const O=b[k],V=E[k],H=T[k],ne=y*w*4*k;for(let ue=0;ue<O.count;ue++){const le=ue*$;x===!0&&(o.fromBufferAttribute(O,ue),N[ne+le+0]=o.x,N[ne+le+1]=o.y,N[ne+le+2]=o.z,N[ne+le+3]=0),v===!0&&(o.fromBufferAttribute(V,ue),N[ne+le+4]=o.x,N[ne+le+5]=o.y,N[ne+le+6]=o.z,N[ne+le+7]=0),S===!0&&(o.fromBufferAttribute(H,ue),N[ne+le+8]=o.x,N[ne+le+9]=o.y,N[ne+le+10]=o.z,N[ne+le+11]=H.itemSize===4?o.w:1)}}_={count:g,texture:U,size:new Qe(y,w)},s.set(u,_),u.addEventListener("dispose",D)}let m=0;for(let x=0;x<h.length;x++)m+=h[x];const p=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",p),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",_.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",_.size)}else{const d=h===void 0?0:h.length;let g=i[u.id];if(g===void 0||g.length!==d){g=[];for(let v=0;v<d;v++)g[v]=[v,0];i[u.id]=g}for(let v=0;v<d;v++){const S=g[v];S[0]=v,S[1]=h[v]}g.sort(w2);for(let v=0;v<8;v++)v<d&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(T2);const _=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const S=a[v],b=S[0],E=S[1];b!==Number.MAX_SAFE_INTEGER&&E?(_&&u.getAttribute("morphTarget"+v)!==_[b]&&u.setAttribute("morphTarget"+v,_[b]),m&&u.getAttribute("morphNormal"+v)!==m[b]&&u.setAttribute("morphNormal"+v,m[b]),r[v]=E,p+=E):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),r[v]=0)}const x=u.morphTargetsRelative?1:1-p;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function C2(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class ox extends vn{constructor(e,t,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:ns,u!==ns&&u!==ao)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===ns&&(i=lr),i===void 0&&u===ao&&(i=ts),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ax=new vn,lx=new ox(1,1);lx.compareFunction=j0;const cx=new Y0,ux=new uR,fx=new ix,Ym=[],Km=[],Zm=new Float32Array(16),Jm=new Float32Array(9),Qm=new Float32Array(4);function mo(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ym[r];if(s===void 0&&(s=new Float32Array(r),Ym[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Sc(n,e){let t=Km[e];t===void 0&&(t=new Int32Array(e),Km[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function R2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function P2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function L2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function D2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function I2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,i))return;Qm.set(i),n.uniformMatrix2fv(this.addr,!1,Qm),Pt(t,i)}}function U2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,i))return;Jm.set(i),n.uniformMatrix3fv(this.addr,!1,Jm),Pt(t,i)}}function N2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,i))return;Zm.set(i),n.uniformMatrix4fv(this.addr,!1,Zm),Pt(t,i)}}function O2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function F2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function k2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function B2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function z2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function H2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function G2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function V2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function W2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?lx:ax;t.setTexture2D(e||s,r)}function j2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ux,r)}function X2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||fx,r)}function q2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||cx,r)}function $2(n){switch(n){case 5126:return R2;case 35664:return P2;case 35665:return L2;case 35666:return D2;case 35674:return I2;case 35675:return U2;case 35676:return N2;case 5124:case 35670:return O2;case 35667:case 35671:return F2;case 35668:case 35672:return k2;case 35669:case 35673:return B2;case 5125:return z2;case 36294:return H2;case 36295:return G2;case 36296:return V2;case 35678:case 36198:case 36298:case 36306:case 35682:return W2;case 35679:case 36299:case 36307:return j2;case 35680:case 36300:case 36308:case 36293:return X2;case 36289:case 36303:case 36311:case 36292:return q2}}function Y2(n,e){n.uniform1fv(this.addr,e)}function K2(n,e){const t=mo(e,this.size,2);n.uniform2fv(this.addr,t)}function Z2(n,e){const t=mo(e,this.size,3);n.uniform3fv(this.addr,t)}function J2(n,e){const t=mo(e,this.size,4);n.uniform4fv(this.addr,t)}function Q2(n,e){const t=mo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function eD(n,e){const t=mo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function tD(n,e){const t=mo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function nD(n,e){n.uniform1iv(this.addr,e)}function iD(n,e){n.uniform2iv(this.addr,e)}function rD(n,e){n.uniform3iv(this.addr,e)}function sD(n,e){n.uniform4iv(this.addr,e)}function oD(n,e){n.uniform1uiv(this.addr,e)}function aD(n,e){n.uniform2uiv(this.addr,e)}function lD(n,e){n.uniform3uiv(this.addr,e)}function cD(n,e){n.uniform4uiv(this.addr,e)}function uD(n,e,t){const i=this.cache,r=e.length,s=Sc(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||ax,s[o])}function fD(n,e,t){const i=this.cache,r=e.length,s=Sc(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ux,s[o])}function hD(n,e,t){const i=this.cache,r=e.length,s=Sc(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||fx,s[o])}function dD(n,e,t){const i=this.cache,r=e.length,s=Sc(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||cx,s[o])}function pD(n){switch(n){case 5126:return Y2;case 35664:return K2;case 35665:return Z2;case 35666:return J2;case 35674:return Q2;case 35675:return eD;case 35676:return tD;case 5124:case 35670:return nD;case 35667:case 35671:return iD;case 35668:case 35672:return rD;case 35669:case 35673:return sD;case 5125:return oD;case 36294:return aD;case 36295:return lD;case 36296:return cD;case 35678:case 36198:case 36298:case 36306:case 35682:return uD;case 35679:case 36299:case 36307:return fD;case 35680:case 36300:case 36308:case 36293:return hD;case 36289:case 36303:case 36311:case 36292:return dD}}class mD{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$2(t.type)}}class _D{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pD(t.type)}}class gD{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Ru=/(\w+)(\])?(\[|\.)?/g;function e_(n,e){n.seq.push(e),n.map[e.id]=e}function vD(n,e,t){const i=n.name,r=i.length;for(Ru.lastIndex=0;;){const s=Ru.exec(i),o=Ru.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){e_(t,c===void 0?new mD(a,n,e):new _D(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new gD(a),e_(t,f)),t=f}}}class vl{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);vD(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function t_(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const xD=37297;let yD=0;function SD(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function MD(n){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(n);let i;switch(e===t?i="":e===ql&&t===Xl?i="LinearDisplayP3ToLinearSRGB":e===Xl&&t===ql&&(i="LinearSRGBToLinearDisplayP3"),n){case Bi:case gc:return[i,"LinearTransferOETF"];case kt:case Vh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function n_(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+SD(n.getShaderSource(e),o)}else return r}function ED(n,e){const t=MD(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function bD(n,e){let t;switch(e){case DC:t="Linear";break;case IC:t="Reinhard";break;case UC:t="OptimizedCineon";break;case NC:t="ACESFilmic";break;case FC:t="AgX";break;case OC:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function TD(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fs).join(`
`)}function wD(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Fs).join(`
`)}function AD(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function CD(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Fs(n){return n!==""}function i_(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function r_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const RD=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bf(n){return n.replace(RD,LD)}const PD=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function LD(n,e){let t=Ge[e];if(t===void 0){const i=PD.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Bf(t)}const DD=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function s_(n){return n.replace(DD,ID)}function ID(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function o_(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function UD(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===U0?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===oC?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function ND(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case so:case oo:e="ENVMAP_TYPE_CUBE";break;case _c:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OD(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case oo:e="ENVMAP_MODE_REFRACTION";break}return e}function FD(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case N0:e="ENVMAP_BLENDING_MULTIPLY";break;case PC:e="ENVMAP_BLENDING_MIX";break;case LC:e="ENVMAP_BLENDING_ADD";break}return e}function kD(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function BD(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=UD(t),c=ND(t),u=OD(t),f=FD(t),h=kD(t),d=t.isWebGL2?"":TD(t),g=wD(t),_=AD(s),m=r.createProgram();let p,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fs).join(`
`),p.length>0&&(p+=`
`),x=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fs).join(`
`),x.length>0&&(x+=`
`)):(p=[o_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),x=[d,o_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_r?"#define TONE_MAPPING":"",t.toneMapping!==_r?Ge.tonemapping_pars_fragment:"",t.toneMapping!==_r?bD("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,ED("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),o=Bf(o),o=i_(o,t),o=r_(o,t),a=Bf(a),a=i_(a,t),a=r_(a,t),o=s_(o),a=s_(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===bm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+p+o,b=v+x+a,E=t_(r,r.VERTEX_SHADER,S),T=t_(r,r.FRAGMENT_SHADER,b);r.attachShader(m,E),r.attachShader(m,T),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function L(U){if(n.debug.checkShaderErrors){const $=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(E).trim(),k=r.getShaderInfoLog(T).trim();let O=!0,V=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,E,T);else{const H=n_(r,E,"vertex"),ne=n_(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+H+`
`+ne)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(D===""||k==="")&&(V=!1);V&&(U.diagnostics={runnable:O,programLog:$,vertexShader:{log:D,prefix:p},fragmentShader:{log:k,prefix:x}})}r.deleteShader(E),r.deleteShader(T),y=new vl(r,m),w=CD(r,m)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(m,xD)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yD++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=T,this}let zD=0;class HD{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new GD(e),t.set(e,i)),i}}class GD{constructor(e){this.id=zD++,this.code=e,this.usedTimes=0}}function VD(n,e,t,i,r,s,o){const a=new K0,l=new HD,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,w,N,U,$){const D=U.fog,k=$.geometry,O=y.isMeshStandardMaterial?U.environment:null,V=(y.isMeshStandardMaterial?t:e).get(y.envMap||O),H=V&&V.mapping===_c?V.image.height:null,ne=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const ue=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,le=ue!==void 0?ue.length:0;let pe=0;k.morphAttributes.position!==void 0&&(pe=1),k.morphAttributes.normal!==void 0&&(pe=2),k.morphAttributes.color!==void 0&&(pe=3);let Y,se,me,Se;if(ne){const Zt=ci[ne];Y=Zt.vertexShader,se=Zt.fragmentShader}else Y=y.vertexShader,se=y.fragmentShader,l.update(y),me=l.getVertexShaderID(y),Se=l.getFragmentShaderID(y);const G=n.getRenderTarget(),fe=$.isInstancedMesh===!0,ae=$.isBatchedMesh===!0,re=!!y.map,Ee=!!y.matcap,W=!!V,R=!!y.aoMap,P=!!y.lightMap,B=!!y.bumpMap,j=!!y.normalMap,J=!!y.displacementMap,ie=!!y.emissiveMap,A=!!y.metalnessMap,M=!!y.roughnessMap,I=y.anisotropy>0,z=y.clearcoat>0,q=y.iridescence>0,K=y.sheen>0,he=y.transmission>0,oe=I&&!!y.anisotropyMap,de=z&&!!y.clearcoatMap,ve=z&&!!y.clearcoatNormalMap,be=z&&!!y.clearcoatRoughnessMap,ce=q&&!!y.iridescenceMap,ze=q&&!!y.iridescenceThicknessMap,Oe=K&&!!y.sheenColorMap,Ie=K&&!!y.sheenRoughnessMap,we=!!y.specularMap,Te=!!y.specularColorMap,Ce=!!y.specularIntensityMap,He=he&&!!y.transmissionMap,ut=he&&!!y.thicknessMap,We=!!y.gradientMap,_e=!!y.alphaMap,F=y.alphaTest>0,xe=!!y.alphaHash,ye=!!y.extensions,Ue=!!k.attributes.uv1,Pe=!!k.attributes.uv2,ot=!!k.attributes.uv3;let at=_r;return y.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(at=n.toneMapping),{isWebGL2:u,shaderID:ne,shaderType:y.type,shaderName:y.name,vertexShader:Y,fragmentShader:se,defines:y.defines,customVertexShaderID:me,customFragmentShaderID:Se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ae,instancing:fe,instancingColor:fe&&$.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:G===null?n.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Bi,map:re,matcap:Ee,envMap:W,envMapMode:W&&V.mapping,envMapCubeUVHeight:H,aoMap:R,lightMap:P,bumpMap:B,normalMap:j,displacementMap:h&&J,emissiveMap:ie,normalMapObjectSpace:j&&y.normalMapType===KC,normalMapTangentSpace:j&&y.normalMapType===YC,metalnessMap:A,roughnessMap:M,anisotropy:I,anisotropyMap:oe,clearcoat:z,clearcoatMap:de,clearcoatNormalMap:ve,clearcoatRoughnessMap:be,iridescence:q,iridescenceMap:ce,iridescenceThicknessMap:ze,sheen:K,sheenColorMap:Oe,sheenRoughnessMap:Ie,specularMap:we,specularColorMap:Te,specularIntensityMap:Ce,transmission:he,transmissionMap:He,thicknessMap:ut,gradientMap:We,opaque:y.transparent===!1&&y.blending===qs,alphaMap:_e,alphaTest:F,alphaHash:xe,combine:y.combine,mapUv:re&&_(y.map.channel),aoMapUv:R&&_(y.aoMap.channel),lightMapUv:P&&_(y.lightMap.channel),bumpMapUv:B&&_(y.bumpMap.channel),normalMapUv:j&&_(y.normalMap.channel),displacementMapUv:J&&_(y.displacementMap.channel),emissiveMapUv:ie&&_(y.emissiveMap.channel),metalnessMapUv:A&&_(y.metalnessMap.channel),roughnessMapUv:M&&_(y.roughnessMap.channel),anisotropyMapUv:oe&&_(y.anisotropyMap.channel),clearcoatMapUv:de&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ve&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(y.sheenRoughnessMap.channel),specularMapUv:we&&_(y.specularMap.channel),specularColorMapUv:Te&&_(y.specularColorMap.channel),specularIntensityMapUv:Ce&&_(y.specularIntensityMap.channel),transmissionMapUv:He&&_(y.transmissionMap.channel),thicknessMapUv:ut&&_(y.thicknessMap.channel),alphaMapUv:_e&&_(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(j||I),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Pe,vertexUv3s:ot,pointsUvs:$.isPoints===!0&&!!k.attributes.uv&&(re||_e),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:$.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:pe,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:at,useLegacyLights:n._useLegacyLights,decodeVideoTexture:re&&y.map.isVideoTexture===!0&&tt.getTransfer(y.map.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ri,flipSided:y.side===gn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ye&&y.extensions.derivatives===!0,extensionFragDepth:ye&&y.extensions.fragDepth===!0,extensionDrawBuffers:ye&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)w.push(N),w.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(x(w,y),v(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function x(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function v(y,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function S(y){const w=g[y.type];let N;if(w){const U=ci[w];N=bR.clone(U.uniforms)}else N=y.uniforms;return N}function b(y,w){let N;for(let U=0,$=c.length;U<$;U++){const D=c[U];if(D.cacheKey===w){N=D,++N.usedTimes;break}}return N===void 0&&(N=new BD(n,w,y,s),c.push(N)),N}function E(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function T(y){l.remove(y)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:b,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:L}}function WD(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function jD(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function a_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function l_(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,d,g,_,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||jD),i.length>1&&i.sort(h||a_),r.length>1&&r.sort(h||a_)}function u(){for(let f=e,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function XD(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new l_,n.set(i,[o])):r>=s.length?(o=new l_,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function qD(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ee,color:new nt};break;case"SpotLight":t={position:new ee,direction:new ee,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ee,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ee,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return n[e.id]=t,t}}}function $D(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let YD=0;function KD(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ZD(n,e){const t=new qD,i=$D(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new ee);const s=new ee,o=new Ht,a=new Ht;function l(u,f){let h=0,d=0,g=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let _=0,m=0,p=0,x=0,v=0,S=0,b=0,E=0,T=0,L=0,y=0;u.sort(KD);const w=f===!0?Math.PI:1;for(let U=0,$=u.length;U<$;U++){const D=u[U],k=D.color,O=D.intensity,V=D.distance,H=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=k.r*O*w,d+=k.g*O*w,g+=k.b*O*w;else if(D.isLightProbe){for(let ne=0;ne<9;ne++)r.probe[ne].addScaledVector(D.sh.coefficients[ne],O);y++}else if(D.isDirectionalLight){const ne=t.get(D);if(ne.color.copy(D.color).multiplyScalar(D.intensity*w),D.castShadow){const ue=D.shadow,le=i.get(D);le.shadowBias=ue.bias,le.shadowNormalBias=ue.normalBias,le.shadowRadius=ue.radius,le.shadowMapSize=ue.mapSize,r.directionalShadow[_]=le,r.directionalShadowMap[_]=H,r.directionalShadowMatrix[_]=D.shadow.matrix,S++}r.directional[_]=ne,_++}else if(D.isSpotLight){const ne=t.get(D);ne.position.setFromMatrixPosition(D.matrixWorld),ne.color.copy(k).multiplyScalar(O*w),ne.distance=V,ne.coneCos=Math.cos(D.angle),ne.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),ne.decay=D.decay,r.spot[p]=ne;const ue=D.shadow;if(D.map&&(r.spotLightMap[T]=D.map,T++,ue.updateMatrices(D),D.castShadow&&L++),r.spotLightMatrix[p]=ue.matrix,D.castShadow){const le=i.get(D);le.shadowBias=ue.bias,le.shadowNormalBias=ue.normalBias,le.shadowRadius=ue.radius,le.shadowMapSize=ue.mapSize,r.spotShadow[p]=le,r.spotShadowMap[p]=H,E++}p++}else if(D.isRectAreaLight){const ne=t.get(D);ne.color.copy(k).multiplyScalar(O),ne.halfWidth.set(D.width*.5,0,0),ne.halfHeight.set(0,D.height*.5,0),r.rectArea[x]=ne,x++}else if(D.isPointLight){const ne=t.get(D);if(ne.color.copy(D.color).multiplyScalar(D.intensity*w),ne.distance=D.distance,ne.decay=D.decay,D.castShadow){const ue=D.shadow,le=i.get(D);le.shadowBias=ue.bias,le.shadowNormalBias=ue.normalBias,le.shadowRadius=ue.radius,le.shadowMapSize=ue.mapSize,le.shadowCameraNear=ue.camera.near,le.shadowCameraFar=ue.camera.far,r.pointShadow[m]=le,r.pointShadowMap[m]=H,r.pointShadowMatrix[m]=D.shadow.matrix,b++}r.point[m]=ne,m++}else if(D.isHemisphereLight){const ne=t.get(D);ne.skyColor.copy(D.color).multiplyScalar(O*w),ne.groundColor.copy(D.groundColor).multiplyScalar(O*w),r.hemi[v]=ne,v++}}x>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_FLOAT_1,r.rectAreaLTC2=ge.LTC_FLOAT_2):(r.rectAreaLTC1=ge.LTC_HALF_1,r.rectAreaLTC2=ge.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_FLOAT_1,r.rectAreaLTC2=ge.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_HALF_1,r.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=d,r.ambient[2]=g;const N=r.hash;(N.directionalLength!==_||N.pointLength!==m||N.spotLength!==p||N.rectAreaLength!==x||N.hemiLength!==v||N.numDirectionalShadows!==S||N.numPointShadows!==b||N.numSpotShadows!==E||N.numSpotMaps!==T||N.numLightProbes!==y)&&(r.directional.length=_,r.spot.length=p,r.rectArea.length=x,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=b,r.pointShadowMap.length=b,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=b,r.spotLightMatrix.length=E+T-L,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=y,N.directionalLength=_,N.pointLength=m,N.spotLength=p,N.rectAreaLength=x,N.hemiLength=v,N.numDirectionalShadows=S,N.numPointShadows=b,N.numSpotShadows=E,N.numSpotMaps=T,N.numLightProbes=y,r.version=YD++)}function c(u,f){let h=0,d=0,g=0,_=0,m=0;const p=f.matrixWorldInverse;for(let x=0,v=u.length;x<v;x++){const S=u[x];if(S.isDirectionalLight){const b=r.directional[h];b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),h++}else if(S.isSpotLight){const b=r.spot[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const b=r.rectArea[_];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const b=r.point[d];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const b=r.hemi[m];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:r}}function c_(n,e){const t=new ZD(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function JD(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new c_(n,e),t.set(s,[l])):o>=a.length?(l=new c_(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class QD extends xc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qC,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eI extends xc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tI=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nI=`uniform sampler2D shadow_pass;
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
}`;function iI(n,e,t){let i=new rx;const r=new Qe,s=new Qe,o=new zt,a=new QD({depthPacking:$C}),l=new eI,c={},u=t.maxTextureSize,f={[Sr]:gn,[gn]:Sr,[Ri]:Ri},h=new Mr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:tI,fragmentShader:nI}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new ds;g.setAttribute("position",new _i(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ur(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=U0;let p=this.type;this.render=function(E,T,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const y=n.getRenderTarget(),w=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),U=n.state;U.setBlending(mr),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const $=p!==wi&&this.type===wi,D=p===wi&&this.type!==wi;for(let k=0,O=E.length;k<O;k++){const V=E[k],H=V.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ne=H.getFrameExtents();if(r.multiply(ne),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,H.mapSize.y=s.y)),H.map===null||$===!0||D===!0){const le=this.type!==wi?{minFilter:rn,magFilter:rn}:{};H.map!==null&&H.map.dispose(),H.map=new cs(r.x,r.y,le),H.map.texture.name=V.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ue=H.getViewportCount();for(let le=0;le<ue;le++){const pe=H.getViewport(le);o.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),U.viewport(o),H.updateMatrices(V,le),i=H.getFrustum(),S(T,L,H.camera,V,this.type)}H.isPointLightShadow!==!0&&this.type===wi&&x(H,L),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,w,N)};function x(E,T){const L=e.update(_);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new cs(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(T,null,L,h,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(T,null,L,d,_,null)}function v(E,T,L,y){let w=null;const N=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)w=N;else if(w=L.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const U=w.uuid,$=T.uuid;let D=c[U];D===void 0&&(D={},c[U]=D);let k=D[$];k===void 0&&(k=w.clone(),D[$]=k,T.addEventListener("dispose",b)),w=k}if(w.visible=T.visible,w.wireframe=T.wireframe,y===wi?w.side=T.shadowSide!==null?T.shadowSide:T.side:w.side=T.shadowSide!==null?T.shadowSide:f[T.side],w.alphaMap=T.alphaMap,w.alphaTest=T.alphaTest,w.map=T.map,w.clipShadows=T.clipShadows,w.clippingPlanes=T.clippingPlanes,w.clipIntersection=T.clipIntersection,w.displacementMap=T.displacementMap,w.displacementScale=T.displacementScale,w.displacementBias=T.displacementBias,w.wireframeLinewidth=T.wireframeLinewidth,w.linewidth=T.linewidth,L.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=n.properties.get(w);U.light=L}return w}function S(E,T,L,y,w){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&w===wi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);const $=e.update(E),D=E.material;if(Array.isArray(D)){const k=$.groups;for(let O=0,V=k.length;O<V;O++){const H=k[O],ne=D[H.materialIndex];if(ne&&ne.visible){const ue=v(E,ne,y,w);E.onBeforeShadow(n,E,T,L,$,ue,H),n.renderBufferDirect(L,null,$,ue,E,H),E.onAfterShadow(n,E,T,L,$,ue,H)}}}else if(D.visible){const k=v(E,D,y,w);E.onBeforeShadow(n,E,T,L,$,k,null),n.renderBufferDirect(L,null,$,k,E,null),E.onAfterShadow(n,E,T,L,$,k,null)}}const U=E.children;for(let $=0,D=U.length;$<D;$++)S(U[$],T,L,y,w)}function b(E){E.target.removeEventListener("dispose",b);for(const L in c){const y=c[L],w=E.target.uuid;w in y&&(y[w].dispose(),delete y[w])}}}function rI(n,e,t){const i=t.isWebGL2;function r(){let F=!1;const xe=new zt;let ye=null;const Ue=new zt(0,0,0,0);return{setMask:function(Pe){ye!==Pe&&!F&&(n.colorMask(Pe,Pe,Pe,Pe),ye=Pe)},setLocked:function(Pe){F=Pe},setClear:function(Pe,ot,at,Lt,Zt){Zt===!0&&(Pe*=Lt,ot*=Lt,at*=Lt),xe.set(Pe,ot,at,Lt),Ue.equals(xe)===!1&&(n.clearColor(Pe,ot,at,Lt),Ue.copy(xe))},reset:function(){F=!1,ye=null,Ue.set(-1,0,0,0)}}}function s(){let F=!1,xe=null,ye=null,Ue=null;return{setTest:function(Pe){Pe?ae(n.DEPTH_TEST):re(n.DEPTH_TEST)},setMask:function(Pe){xe!==Pe&&!F&&(n.depthMask(Pe),xe=Pe)},setFunc:function(Pe){if(ye!==Pe){switch(Pe){case EC:n.depthFunc(n.NEVER);break;case bC:n.depthFunc(n.ALWAYS);break;case TC:n.depthFunc(n.LESS);break;case Wl:n.depthFunc(n.LEQUAL);break;case wC:n.depthFunc(n.EQUAL);break;case AC:n.depthFunc(n.GEQUAL);break;case CC:n.depthFunc(n.GREATER);break;case RC:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=Pe}},setLocked:function(Pe){F=Pe},setClear:function(Pe){Ue!==Pe&&(n.clearDepth(Pe),Ue=Pe)},reset:function(){F=!1,xe=null,ye=null,Ue=null}}}function o(){let F=!1,xe=null,ye=null,Ue=null,Pe=null,ot=null,at=null,Lt=null,Zt=null;return{setTest:function(lt){F||(lt?ae(n.STENCIL_TEST):re(n.STENCIL_TEST))},setMask:function(lt){xe!==lt&&!F&&(n.stencilMask(lt),xe=lt)},setFunc:function(lt,Jt,si){(ye!==lt||Ue!==Jt||Pe!==si)&&(n.stencilFunc(lt,Jt,si),ye=lt,Ue=Jt,Pe=si)},setOp:function(lt,Jt,si){(ot!==lt||at!==Jt||Lt!==si)&&(n.stencilOp(lt,Jt,si),ot=lt,at=Jt,Lt=si)},setLocked:function(lt){F=lt},setClear:function(lt){Zt!==lt&&(n.clearStencil(lt),Zt=lt)},reset:function(){F=!1,xe=null,ye=null,Ue=null,Pe=null,ot=null,at=null,Lt=null,Zt=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,f=new WeakMap;let h={},d={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,b=null,E=null,T=null,L=null,y=new nt(0,0,0),w=0,N=!1,U=null,$=null,D=null,k=null,O=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,ne=0;const ue=n.getParameter(n.VERSION);ue.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(ue)[1]),H=ne>=1):ue.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),H=ne>=2);let le=null,pe={};const Y=n.getParameter(n.SCISSOR_BOX),se=n.getParameter(n.VIEWPORT),me=new zt().fromArray(Y),Se=new zt().fromArray(se);function G(F,xe,ye,Ue){const Pe=new Uint8Array(4),ot=n.createTexture();n.bindTexture(F,ot),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let at=0;at<ye;at++)i&&(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)?n.texImage3D(xe,0,n.RGBA,1,1,Ue,0,n.RGBA,n.UNSIGNED_BYTE,Pe):n.texImage2D(xe+at,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Pe);return ot}const fe={};fe[n.TEXTURE_2D]=G(n.TEXTURE_2D,n.TEXTURE_2D,1),fe[n.TEXTURE_CUBE_MAP]=G(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(fe[n.TEXTURE_2D_ARRAY]=G(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),fe[n.TEXTURE_3D]=G(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ae(n.DEPTH_TEST),l.setFunc(Wl),ie(!1),A(Wp),ae(n.CULL_FACE),j(mr);function ae(F){h[F]!==!0&&(n.enable(F),h[F]=!0)}function re(F){h[F]!==!1&&(n.disable(F),h[F]=!1)}function Ee(F,xe){return d[F]!==xe?(n.bindFramebuffer(F,xe),d[F]=xe,i&&(F===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),F===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe)),!0):!1}function W(F,xe){let ye=_,Ue=!1;if(F)if(ye=g.get(xe),ye===void 0&&(ye=[],g.set(xe,ye)),F.isWebGLMultipleRenderTargets){const Pe=F.texture;if(ye.length!==Pe.length||ye[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,at=Pe.length;ot<at;ot++)ye[ot]=n.COLOR_ATTACHMENT0+ot;ye.length=Pe.length,Ue=!0}}else ye[0]!==n.COLOR_ATTACHMENT0&&(ye[0]=n.COLOR_ATTACHMENT0,Ue=!0);else ye[0]!==n.BACK&&(ye[0]=n.BACK,Ue=!0);Ue&&(t.isWebGL2?n.drawBuffers(ye):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ye))}function R(F){return m!==F?(n.useProgram(F),m=F,!0):!1}const P={[Vr]:n.FUNC_ADD,[lC]:n.FUNC_SUBTRACT,[cC]:n.FUNC_REVERSE_SUBTRACT};if(i)P[$p]=n.MIN,P[Yp]=n.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(P[$p]=F.MIN_EXT,P[Yp]=F.MAX_EXT)}const B={[uC]:n.ZERO,[fC]:n.ONE,[hC]:n.SRC_COLOR,[Pf]:n.SRC_ALPHA,[vC]:n.SRC_ALPHA_SATURATE,[_C]:n.DST_COLOR,[pC]:n.DST_ALPHA,[dC]:n.ONE_MINUS_SRC_COLOR,[Lf]:n.ONE_MINUS_SRC_ALPHA,[gC]:n.ONE_MINUS_DST_COLOR,[mC]:n.ONE_MINUS_DST_ALPHA,[xC]:n.CONSTANT_COLOR,[yC]:n.ONE_MINUS_CONSTANT_COLOR,[SC]:n.CONSTANT_ALPHA,[MC]:n.ONE_MINUS_CONSTANT_ALPHA};function j(F,xe,ye,Ue,Pe,ot,at,Lt,Zt,lt){if(F===mr){p===!0&&(re(n.BLEND),p=!1);return}if(p===!1&&(ae(n.BLEND),p=!0),F!==aC){if(F!==x||lt!==N){if((v!==Vr||E!==Vr)&&(n.blendEquation(n.FUNC_ADD),v=Vr,E=Vr),lt)switch(F){case qs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jp:n.blendFunc(n.ONE,n.ONE);break;case Xp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qp:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case qs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jp:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Xp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qp:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,b=null,T=null,L=null,y.set(0,0,0),w=0,x=F,N=lt}return}Pe=Pe||xe,ot=ot||ye,at=at||Ue,(xe!==v||Pe!==E)&&(n.blendEquationSeparate(P[xe],P[Pe]),v=xe,E=Pe),(ye!==S||Ue!==b||ot!==T||at!==L)&&(n.blendFuncSeparate(B[ye],B[Ue],B[ot],B[at]),S=ye,b=Ue,T=ot,L=at),(Lt.equals(y)===!1||Zt!==w)&&(n.blendColor(Lt.r,Lt.g,Lt.b,Zt),y.copy(Lt),w=Zt),x=F,N=!1}function J(F,xe){F.side===Ri?re(n.CULL_FACE):ae(n.CULL_FACE);let ye=F.side===gn;xe&&(ye=!ye),ie(ye),F.blending===qs&&F.transparent===!1?j(mr):j(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),a.setMask(F.colorWrite);const Ue=F.stencilWrite;c.setTest(Ue),Ue&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),I(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):re(n.SAMPLE_ALPHA_TO_COVERAGE)}function ie(F){U!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),U=F)}function A(F){F!==rC?(ae(n.CULL_FACE),F!==$&&(F===Wp?n.cullFace(n.BACK):F===sC?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):re(n.CULL_FACE),$=F}function M(F){F!==D&&(H&&n.lineWidth(F),D=F)}function I(F,xe,ye){F?(ae(n.POLYGON_OFFSET_FILL),(k!==xe||O!==ye)&&(n.polygonOffset(xe,ye),k=xe,O=ye)):re(n.POLYGON_OFFSET_FILL)}function z(F){F?ae(n.SCISSOR_TEST):re(n.SCISSOR_TEST)}function q(F){F===void 0&&(F=n.TEXTURE0+V-1),le!==F&&(n.activeTexture(F),le=F)}function K(F,xe,ye){ye===void 0&&(le===null?ye=n.TEXTURE0+V-1:ye=le);let Ue=pe[ye];Ue===void 0&&(Ue={type:void 0,texture:void 0},pe[ye]=Ue),(Ue.type!==F||Ue.texture!==xe)&&(le!==ye&&(n.activeTexture(ye),le=ye),n.bindTexture(F,xe||fe[F]),Ue.type=F,Ue.texture=xe)}function he(){const F=pe[le];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function oe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Oe(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ie(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ce(F){me.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),me.copy(F))}function He(F){Se.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Se.copy(F))}function ut(F,xe){let ye=f.get(xe);ye===void 0&&(ye=new WeakMap,f.set(xe,ye));let Ue=ye.get(F);Ue===void 0&&(Ue=n.getUniformBlockIndex(xe,F.name),ye.set(F,Ue))}function We(F,xe){const Ue=f.get(xe).get(F);u.get(xe)!==Ue&&(n.uniformBlockBinding(xe,Ue,F.__bindingPointIndex),u.set(xe,Ue))}function _e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},le=null,pe={},d={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,b=null,E=null,T=null,L=null,y=new nt(0,0,0),w=0,N=!1,U=null,$=null,D=null,k=null,O=null,me.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ae,disable:re,bindFramebuffer:Ee,drawBuffers:W,useProgram:R,setBlending:j,setMaterial:J,setFlipSided:ie,setCullFace:A,setLineWidth:M,setPolygonOffset:I,setScissorTest:z,activeTexture:q,bindTexture:K,unbindTexture:he,compressedTexImage2D:oe,compressedTexImage3D:de,texImage2D:we,texImage3D:Te,updateUBOMapping:ut,uniformBlockBinding:We,texStorage2D:Oe,texStorage3D:Ie,texSubImage2D:ve,texSubImage3D:be,compressedTexSubImage2D:ce,compressedTexSubImage3D:ze,scissor:Ce,viewport:He,reset:_e}}function sI(n,e,t,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return d?new OffscreenCanvas(A,M):ca("canvas")}function _(A,M,I,z){let q=1;if((A.width>z||A.height>z)&&(q=z/Math.max(A.width,A.height)),q<1||M===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const K=M?kf:Math.floor,he=K(q*A.width),oe=K(q*A.height);f===void 0&&(f=g(he,oe));const de=I?g(he,oe):f;return de.width=he,de.height=oe,de.getContext("2d").drawImage(A,0,0,he,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+he+"x"+oe+")."),de}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return Tm(A.width)&&Tm(A.height)}function p(A){return a?!1:A.wrapS!==ni||A.wrapT!==ni||A.minFilter!==rn&&A.minFilter!==Bn}function x(A,M){return A.generateMipmaps&&M&&A.minFilter!==rn&&A.minFilter!==Bn}function v(A){n.generateMipmap(A)}function S(A,M,I,z,q=!1){if(a===!1)return M;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=M;if(M===n.RED&&(I===n.FLOAT&&(K=n.R32F),I===n.HALF_FLOAT&&(K=n.R16F),I===n.UNSIGNED_BYTE&&(K=n.R8)),M===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(K=n.R8UI),I===n.UNSIGNED_SHORT&&(K=n.R16UI),I===n.UNSIGNED_INT&&(K=n.R32UI),I===n.BYTE&&(K=n.R8I),I===n.SHORT&&(K=n.R16I),I===n.INT&&(K=n.R32I)),M===n.RG&&(I===n.FLOAT&&(K=n.RG32F),I===n.HALF_FLOAT&&(K=n.RG16F),I===n.UNSIGNED_BYTE&&(K=n.RG8)),M===n.RGBA){const he=q?jl:tt.getTransfer(z);I===n.FLOAT&&(K=n.RGBA32F),I===n.HALF_FLOAT&&(K=n.RGBA16F),I===n.UNSIGNED_BYTE&&(K=he===ft?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function b(A,M,I){return x(A,I)===!0||A.isFramebufferTexture&&A.minFilter!==rn&&A.minFilter!==Bn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function E(A){return A===rn||A===Kp||A===eu?n.NEAREST:n.LINEAR}function T(A){const M=A.target;M.removeEventListener("dispose",T),y(M),M.isVideoTexture&&u.delete(M)}function L(A){const M=A.target;M.removeEventListener("dispose",L),N(M)}function y(A){const M=i.get(A);if(M.__webglInit===void 0)return;const I=A.source,z=h.get(I);if(z){const q=z[M.__cacheKey];q.usedTimes--,q.usedTimes===0&&w(A),Object.keys(z).length===0&&h.delete(I)}i.remove(A)}function w(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const I=A.source,z=h.get(I);delete z[M.__cacheKey],o.memory.textures--}function N(A){const M=A.texture,I=i.get(A),z=i.get(M);if(z.__webglTexture!==void 0&&(n.deleteTexture(z.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(I.__webglFramebuffer[q]))for(let K=0;K<I.__webglFramebuffer[q].length;K++)n.deleteFramebuffer(I.__webglFramebuffer[q][K]);else n.deleteFramebuffer(I.__webglFramebuffer[q]);I.__webglDepthbuffer&&n.deleteRenderbuffer(I.__webglDepthbuffer[q])}else{if(Array.isArray(I.__webglFramebuffer))for(let q=0;q<I.__webglFramebuffer.length;q++)n.deleteFramebuffer(I.__webglFramebuffer[q]);else n.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&n.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&n.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let q=0;q<I.__webglColorRenderbuffer.length;q++)I.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(I.__webglColorRenderbuffer[q]);I.__webglDepthRenderbuffer&&n.deleteRenderbuffer(I.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let q=0,K=M.length;q<K;q++){const he=i.get(M[q]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),o.memory.textures--),i.remove(M[q])}i.remove(M),i.remove(A)}let U=0;function $(){U=0}function D(){const A=U;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),U+=1,A}function k(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function O(A,M){const I=i.get(A);if(A.isVideoTexture&&J(A),A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version){const z=A.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(I,A,M);return}}t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+M)}function V(A,M){const I=i.get(A);if(A.version>0&&I.__version!==A.version){me(I,A,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+M)}function H(A,M){const I=i.get(A);if(A.version>0&&I.__version!==A.version){me(I,A,M);return}t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+M)}function ne(A,M){const I=i.get(A);if(A.version>0&&I.__version!==A.version){Se(I,A,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+M)}const ue={[Uf]:n.REPEAT,[ni]:n.CLAMP_TO_EDGE,[Nf]:n.MIRRORED_REPEAT},le={[rn]:n.NEAREST,[Kp]:n.NEAREST_MIPMAP_NEAREST,[eu]:n.NEAREST_MIPMAP_LINEAR,[Bn]:n.LINEAR,[kC]:n.LINEAR_MIPMAP_NEAREST,[aa]:n.LINEAR_MIPMAP_LINEAR},pe={[ZC]:n.NEVER,[iR]:n.ALWAYS,[JC]:n.LESS,[j0]:n.LEQUAL,[QC]:n.EQUAL,[nR]:n.GEQUAL,[eR]:n.GREATER,[tR]:n.NOTEQUAL};function Y(A,M,I){if(I?(n.texParameteri(A,n.TEXTURE_WRAP_S,ue[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ue[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ue[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,le[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,le[M.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(M.wrapS!==ni||M.wrapT!==ni)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,E(M.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,E(M.minFilter)),M.minFilter!==rn&&M.minFilter!==Bn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,pe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===rn||M.minFilter!==eu&&M.minFilter!==aa||M.type===cr&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===la&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function se(A,M){let I=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",T));const z=M.source;let q=h.get(z);q===void 0&&(q={},h.set(z,q));const K=k(M);if(K!==A.__cacheKey){q[K]===void 0&&(q[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),q[K].usedTimes++;const he=q[A.__cacheKey];he!==void 0&&(q[A.__cacheKey].usedTimes--,he.usedTimes===0&&w(M)),A.__cacheKey=K,A.__webglTexture=q[K].texture}return I}function me(A,M,I){let z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(z=n.TEXTURE_3D);const q=se(A,M),K=M.source;t.bindTexture(z,A.__webglTexture,n.TEXTURE0+I);const he=i.get(K);if(K.version!==he.__version||q===!0){t.activeTexture(n.TEXTURE0+I);const oe=tt.getPrimaries(tt.workingColorSpace),de=M.colorSpace===Hn?null:tt.getPrimaries(M.colorSpace),ve=M.colorSpace===Hn||oe===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const be=p(M)&&m(M.image)===!1;let ce=_(M.image,be,!1,r.maxTextureSize);ce=ie(M,ce);const ze=m(ce)||a,Oe=s.convert(M.format,M.colorSpace);let Ie=s.convert(M.type),we=S(M.internalFormat,Oe,Ie,M.colorSpace,M.isVideoTexture);Y(z,M,ze);let Te;const Ce=M.mipmaps,He=a&&M.isVideoTexture!==!0&&we!==V0,ut=he.__version===void 0||q===!0,We=b(M,ce,ze);if(M.isDepthTexture)we=n.DEPTH_COMPONENT,a?M.type===cr?we=n.DEPTH_COMPONENT32F:M.type===lr?we=n.DEPTH_COMPONENT24:M.type===ts?we=n.DEPTH24_STENCIL8:we=n.DEPTH_COMPONENT16:M.type===cr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===ns&&we===n.DEPTH_COMPONENT&&M.type!==Gh&&M.type!==lr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=lr,Ie=s.convert(M.type)),M.format===ao&&we===n.DEPTH_COMPONENT&&(we=n.DEPTH_STENCIL,M.type!==ts&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ts,Ie=s.convert(M.type))),ut&&(He?t.texStorage2D(n.TEXTURE_2D,1,we,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,we,ce.width,ce.height,0,Oe,Ie,null));else if(M.isDataTexture)if(Ce.length>0&&ze){He&&ut&&t.texStorage2D(n.TEXTURE_2D,We,we,Ce[0].width,Ce[0].height);for(let _e=0,F=Ce.length;_e<F;_e++)Te=Ce[_e],He?t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Te.width,Te.height,Oe,Ie,Te.data):t.texImage2D(n.TEXTURE_2D,_e,we,Te.width,Te.height,0,Oe,Ie,Te.data);M.generateMipmaps=!1}else He?(ut&&t.texStorage2D(n.TEXTURE_2D,We,we,ce.width,ce.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ce.width,ce.height,Oe,Ie,ce.data)):t.texImage2D(n.TEXTURE_2D,0,we,ce.width,ce.height,0,Oe,Ie,ce.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){He&&ut&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,we,Ce[0].width,Ce[0].height,ce.depth);for(let _e=0,F=Ce.length;_e<F;_e++)Te=Ce[_e],M.format!==ii?Oe!==null?He?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,0,Te.width,Te.height,ce.depth,Oe,Te.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,_e,we,Te.width,Te.height,ce.depth,0,Te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?t.texSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,0,Te.width,Te.height,ce.depth,Oe,Ie,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,_e,we,Te.width,Te.height,ce.depth,0,Oe,Ie,Te.data)}else{He&&ut&&t.texStorage2D(n.TEXTURE_2D,We,we,Ce[0].width,Ce[0].height);for(let _e=0,F=Ce.length;_e<F;_e++)Te=Ce[_e],M.format!==ii?Oe!==null?He?t.compressedTexSubImage2D(n.TEXTURE_2D,_e,0,0,Te.width,Te.height,Oe,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,_e,we,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Te.width,Te.height,Oe,Ie,Te.data):t.texImage2D(n.TEXTURE_2D,_e,we,Te.width,Te.height,0,Oe,Ie,Te.data)}else if(M.isDataArrayTexture)He?(ut&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,we,ce.width,ce.height,ce.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Oe,Ie,ce.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,ce.width,ce.height,ce.depth,0,Oe,Ie,ce.data);else if(M.isData3DTexture)He?(ut&&t.texStorage3D(n.TEXTURE_3D,We,we,ce.width,ce.height,ce.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Oe,Ie,ce.data)):t.texImage3D(n.TEXTURE_3D,0,we,ce.width,ce.height,ce.depth,0,Oe,Ie,ce.data);else if(M.isFramebufferTexture){if(ut)if(He)t.texStorage2D(n.TEXTURE_2D,We,we,ce.width,ce.height);else{let _e=ce.width,F=ce.height;for(let xe=0;xe<We;xe++)t.texImage2D(n.TEXTURE_2D,xe,we,_e,F,0,Oe,Ie,null),_e>>=1,F>>=1}}else if(Ce.length>0&&ze){He&&ut&&t.texStorage2D(n.TEXTURE_2D,We,we,Ce[0].width,Ce[0].height);for(let _e=0,F=Ce.length;_e<F;_e++)Te=Ce[_e],He?t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Oe,Ie,Te):t.texImage2D(n.TEXTURE_2D,_e,we,Oe,Ie,Te);M.generateMipmaps=!1}else He?(ut&&t.texStorage2D(n.TEXTURE_2D,We,we,ce.width,ce.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Oe,Ie,ce)):t.texImage2D(n.TEXTURE_2D,0,we,Oe,Ie,ce);x(M,ze)&&v(z),he.__version=K.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Se(A,M,I){if(M.image.length!==6)return;const z=se(A,M),q=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+I);const K=i.get(q);if(q.version!==K.__version||z===!0){t.activeTexture(n.TEXTURE0+I);const he=tt.getPrimaries(tt.workingColorSpace),oe=M.colorSpace===Hn?null:tt.getPrimaries(M.colorSpace),de=M.colorSpace===Hn||he===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const ve=M.isCompressedTexture||M.image[0].isCompressedTexture,be=M.image[0]&&M.image[0].isDataTexture,ce=[];for(let _e=0;_e<6;_e++)!ve&&!be?ce[_e]=_(M.image[_e],!1,!0,r.maxCubemapSize):ce[_e]=be?M.image[_e].image:M.image[_e],ce[_e]=ie(M,ce[_e]);const ze=ce[0],Oe=m(ze)||a,Ie=s.convert(M.format,M.colorSpace),we=s.convert(M.type),Te=S(M.internalFormat,Ie,we,M.colorSpace),Ce=a&&M.isVideoTexture!==!0,He=K.__version===void 0||z===!0;let ut=b(M,ze,Oe);Y(n.TEXTURE_CUBE_MAP,M,Oe);let We;if(ve){Ce&&He&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ut,Te,ze.width,ze.height);for(let _e=0;_e<6;_e++){We=ce[_e].mipmaps;for(let F=0;F<We.length;F++){const xe=We[F];M.format!==ii?Ie!==null?Ce?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,0,0,xe.width,xe.height,Ie,xe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,Te,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ce?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,0,0,xe.width,xe.height,Ie,we,xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F,Te,xe.width,xe.height,0,Ie,we,xe.data)}}}else{We=M.mipmaps,Ce&&He&&(We.length>0&&ut++,t.texStorage2D(n.TEXTURE_CUBE_MAP,ut,Te,ce[0].width,ce[0].height));for(let _e=0;_e<6;_e++)if(be){Ce?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ce[_e].width,ce[_e].height,Ie,we,ce[_e].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Te,ce[_e].width,ce[_e].height,0,Ie,we,ce[_e].data);for(let F=0;F<We.length;F++){const ye=We[F].image[_e].image;Ce?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,0,0,ye.width,ye.height,Ie,we,ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,Te,ye.width,ye.height,0,Ie,we,ye.data)}}else{Ce?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ie,we,ce[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Te,Ie,we,ce[_e]);for(let F=0;F<We.length;F++){const xe=We[F];Ce?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,0,0,Ie,we,xe.image[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,F+1,Te,Ie,we,xe.image[_e])}}}x(M,Oe)&&v(n.TEXTURE_CUBE_MAP),K.__version=q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function G(A,M,I,z,q,K){const he=s.convert(I.format,I.colorSpace),oe=s.convert(I.type),de=S(I.internalFormat,he,oe,I.colorSpace);if(!i.get(M).__hasExternalTextures){const be=Math.max(1,M.width>>K),ce=Math.max(1,M.height>>K);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,K,de,be,ce,M.depth,0,he,oe,null):t.texImage2D(q,K,de,be,ce,0,he,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),j(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,q,i.get(I).__webglTexture,0,B(M)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,z,q,i.get(I).__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(A,M,I){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer&&!M.stencilBuffer){let z=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(I||j(M)){const q=M.depthTexture;q&&q.isDepthTexture&&(q.type===cr?z=n.DEPTH_COMPONENT32F:q.type===lr&&(z=n.DEPTH_COMPONENT24));const K=B(M);j(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,K,z,M.width,M.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,K,z,M.width,M.height)}else n.renderbufferStorage(n.RENDERBUFFER,z,M.width,M.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(M.depthBuffer&&M.stencilBuffer){const z=B(M);I&&j(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,z,n.DEPTH24_STENCIL8,M.width,M.height):j(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,z,n.DEPTH24_STENCIL8,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{const z=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let q=0;q<z.length;q++){const K=z[q],he=s.convert(K.format,K.colorSpace),oe=s.convert(K.type),de=S(K.internalFormat,he,oe,K.colorSpace),ve=B(M);I&&j(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,de,M.width,M.height):j(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,de,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,de,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ae(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);const z=i.get(M.depthTexture).__webglTexture,q=B(M);if(M.depthTexture.format===ns)j(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,z,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,z,0);else if(M.depthTexture.format===ao)j(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,z,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,z,0);else throw new Error("Unknown depthTexture format")}function re(A){const M=i.get(A),I=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");ae(M.__webglFramebuffer,A)}else if(I){M.__webglDepthbuffer=[];for(let z=0;z<6;z++)t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[z]),M.__webglDepthbuffer[z]=n.createRenderbuffer(),fe(M.__webglDepthbuffer[z],A,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=n.createRenderbuffer(),fe(M.__webglDepthbuffer,A,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(A,M,I){const z=i.get(A);M!==void 0&&G(z.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&re(A)}function W(A){const M=A.texture,I=i.get(A),z=i.get(M);A.addEventListener("dispose",L),A.isWebGLMultipleRenderTargets!==!0&&(z.__webglTexture===void 0&&(z.__webglTexture=n.createTexture()),z.__version=M.version,o.memory.textures++);const q=A.isWebGLCubeRenderTarget===!0,K=A.isWebGLMultipleRenderTargets===!0,he=m(A)||a;if(q){I.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer[oe]=[];for(let de=0;de<M.mipmaps.length;de++)I.__webglFramebuffer[oe][de]=n.createFramebuffer()}else I.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)I.__webglFramebuffer[oe]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(K)if(r.drawBuffers){const oe=A.texture;for(let de=0,ve=oe.length;de<ve;de++){const be=i.get(oe[de]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&j(A)===!1){const oe=K?M:[M];I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let de=0;de<oe.length;de++){const ve=oe[de];I.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[de]);const be=s.convert(ve.format,ve.colorSpace),ce=s.convert(ve.type),ze=S(ve.internalFormat,be,ce,ve.colorSpace,A.isXRRenderTarget===!0),Oe=B(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,ze,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,I.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),fe(I.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Y(n.TEXTURE_CUBE_MAP,M,he);for(let oe=0;oe<6;oe++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)G(I.__webglFramebuffer[oe][de],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else G(I.__webglFramebuffer[oe],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);x(M,he)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(K){const oe=A.texture;for(let de=0,ve=oe.length;de<ve;de++){const be=oe[de],ce=i.get(be);t.bindTexture(n.TEXTURE_2D,ce.__webglTexture),Y(n.TEXTURE_2D,be,he),G(I.__webglFramebuffer,A,be,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),x(be,he)&&v(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?oe=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,z.__webglTexture),Y(oe,M,he),a&&M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)G(I.__webglFramebuffer[de],A,M,n.COLOR_ATTACHMENT0,oe,de);else G(I.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,oe,0);x(M,he)&&v(oe),t.unbindTexture()}A.depthBuffer&&re(A)}function R(A){const M=m(A)||a,I=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let z=0,q=I.length;z<q;z++){const K=I[z];if(x(K,M)){const he=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,oe=i.get(K).__webglTexture;t.bindTexture(he,oe),v(he),t.unbindTexture()}}}function P(A){if(a&&A.samples>0&&j(A)===!1){const M=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],I=A.width,z=A.height;let q=n.COLOR_BUFFER_BIT;const K=[],he=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(A),de=A.isWebGLMultipleRenderTargets===!0;if(de)for(let ve=0;ve<M.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ve=0;ve<M.length;ve++){K.push(n.COLOR_ATTACHMENT0+ve),A.depthBuffer&&K.push(he);const be=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(be===!1&&(A.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),de&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]),be===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[he]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[he])),de){const ce=i.get(M[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ce,0)}n.blitFramebuffer(0,0,I,z,0,0,I,z,q,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,K)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let ve=0;ve<M.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]);const be=i.get(M[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function B(A){return Math.min(r.maxSamples,A.samples)}function j(A){const M=i.get(A);return a&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function J(A){const M=o.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function ie(A,M){const I=A.colorSpace,z=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===Of||I!==Bi&&I!==Hn&&(tt.getTransfer(I)===ft?a===!1?e.has("EXT_sRGB")===!0&&z===ii?(A.format=Of,A.minFilter=Bn,A.generateMipmaps=!1):M=q0.sRGBToLinear(M):(z!==ii||q!==gr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),M}this.allocateTextureUnit=D,this.resetTextureUnits=$,this.setTexture2D=O,this.setTexture2DArray=V,this.setTexture3D=H,this.setTextureCube=ne,this.rebindTextures=Ee,this.setupRenderTarget=W,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=G,this.useMultisampledRTT=j}function oI(n,e,t){const i=t.isWebGL2;function r(s,o=Hn){let a;const l=tt.getTransfer(o);if(s===gr)return n.UNSIGNED_BYTE;if(s===k0)return n.UNSIGNED_SHORT_4_4_4_4;if(s===B0)return n.UNSIGNED_SHORT_5_5_5_1;if(s===BC)return n.BYTE;if(s===zC)return n.SHORT;if(s===Gh)return n.UNSIGNED_SHORT;if(s===F0)return n.INT;if(s===lr)return n.UNSIGNED_INT;if(s===cr)return n.FLOAT;if(s===la)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===HC)return n.ALPHA;if(s===ii)return n.RGBA;if(s===GC)return n.LUMINANCE;if(s===VC)return n.LUMINANCE_ALPHA;if(s===ns)return n.DEPTH_COMPONENT;if(s===ao)return n.DEPTH_STENCIL;if(s===Of)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===WC)return n.RED;if(s===z0)return n.RED_INTEGER;if(s===jC)return n.RG;if(s===H0)return n.RG_INTEGER;if(s===G0)return n.RGBA_INTEGER;if(s===tu||s===nu||s===iu||s===ru)if(l===ft)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===tu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===nu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===iu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ru)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===tu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===nu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===iu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ru)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Zp||s===Jp||s===Qp||s===em)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Zp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Jp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Qp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===em)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===V0)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===tm||s===nm)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===tm)return l===ft?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===nm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===im||s===rm||s===sm||s===om||s===am||s===lm||s===cm||s===um||s===fm||s===hm||s===dm||s===pm||s===mm||s===_m)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===im)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===rm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===sm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===om)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===am)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===lm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===cm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===um)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===fm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===hm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===dm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===pm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===mm)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===_m)return l===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===su||s===gm||s===vm)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===su)return l===ft?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===gm)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===vm)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===XC||s===xm||s===ym||s===Sm)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===su)return a.COMPRESSED_RED_RGTC1_EXT;if(s===xm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ym)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Sm)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ts?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class aI extends zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ul extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lI={type:"move"};class Pu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ul,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ul,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ul,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lI)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ul;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class cI extends po{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const x=[],v=[],S=new Qe;let b=null;const E=new zn;E.layers.enable(1),E.viewport=new zt;const T=new zn;T.layers.enable(2),T.viewport=new zt;const L=[E,T],y=new aI;y.layers.enable(1),y.layers.enable(2);let w=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let se=x[Y];return se===void 0&&(se=new Pu,x[Y]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Y){let se=x[Y];return se===void 0&&(se=new Pu,x[Y]=se),se.getGripSpace()},this.getHand=function(Y){let se=x[Y];return se===void 0&&(se=new Pu,x[Y]=se),se.getHandSpace()};function U(Y){const se=v.indexOf(Y.inputSource);if(se===-1)return;const me=x[se];me!==void 0&&(me.update(Y.inputSource,Y.frame,c||o),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function $(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",D);for(let Y=0;Y<x.length;Y++){const se=v[Y];se!==null&&(v[Y]=null,x[Y].disconnect(se))}w=null,N=null,e.setRenderTarget(m),d=null,h=null,f=null,r=null,p=null,pe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",$),r.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const se={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new cs(d.framebufferWidth,d.framebufferHeight,{format:ii,type:gr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let se=null,me=null,Se=null;_.depth&&(Se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?ao:ns,me=_.stencil?ts:lr);const G={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(G),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),p=new cs(h.textureWidth,h.textureHeight,{format:ii,type:gr,depthTexture:new ox(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const fe=e.properties.get(p);fe.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),pe.setContext(r),pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(Y){for(let se=0;se<Y.removed.length;se++){const me=Y.removed[se],Se=v.indexOf(me);Se>=0&&(v[Se]=null,x[Se].disconnect(me))}for(let se=0;se<Y.added.length;se++){const me=Y.added[se];let Se=v.indexOf(me);if(Se===-1){for(let fe=0;fe<x.length;fe++)if(fe>=v.length){v.push(me),Se=fe;break}else if(v[fe]===null){v[fe]=me,Se=fe;break}if(Se===-1)break}const G=x[Se];G&&G.connect(me)}}const k=new ee,O=new ee;function V(Y,se,me){k.setFromMatrixPosition(se.matrixWorld),O.setFromMatrixPosition(me.matrixWorld);const Se=k.distanceTo(O),G=se.projectionMatrix.elements,fe=me.projectionMatrix.elements,ae=G[14]/(G[10]-1),re=G[14]/(G[10]+1),Ee=(G[9]+1)/G[5],W=(G[9]-1)/G[5],R=(G[8]-1)/G[0],P=(fe[8]+1)/fe[0],B=ae*R,j=ae*P,J=Se/(-R+P),ie=J*-R;se.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ie),Y.translateZ(J),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const A=ae+J,M=re+J,I=B-ie,z=j+(Se-ie),q=Ee*re/M*A,K=W*re/M*A;Y.projectionMatrix.makePerspective(I,z,q,K,A,M),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function H(Y,se){se===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(se.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;y.near=T.near=E.near=Y.near,y.far=T.far=E.far=Y.far,(w!==y.near||N!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,N=y.far);const se=Y.parent,me=y.cameras;H(y,se);for(let Se=0;Se<me.length;Se++)H(me[Se],se);me.length===2?V(y,E,T):y.projectionMatrix.copy(E.projectionMatrix),ne(Y,y,se)};function ne(Y,se,me){me===null?Y.matrix.copy(se.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(se.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(se.projectionMatrix),Y.projectionMatrixInverse.copy(se.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ff*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)};let ue=null;function le(Y,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const me=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let Se=!1;me.length!==y.cameras.length&&(y.cameras.length=0,Se=!0);for(let G=0;G<me.length;G++){const fe=me[G];let ae=null;if(d!==null)ae=d.getViewport(fe);else{const Ee=f.getViewSubImage(h,fe);ae=Ee.viewport,G===0&&(e.setRenderTargetTextures(p,Ee.colorTexture,h.ignoreDepthValues?void 0:Ee.depthStencilTexture),e.setRenderTarget(p))}let re=L[G];re===void 0&&(re=new zn,re.layers.enable(G),re.viewport=new zt,L[G]=re),re.matrix.fromArray(fe.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(fe.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(ae.x,ae.y,ae.width,ae.height),G===0&&(y.matrix.copy(re.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Se===!0&&y.cameras.push(re)}}for(let me=0;me<x.length;me++){const Se=v[me],G=x[me];Se!==null&&G!==void 0&&G.update(Se,se,c||o)}ue&&ue(Y,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const pe=new sx;pe.setAnimationLoop(le),this.setAnimationLoop=function(Y){ue=Y},this.dispose=function(){}}}function uI(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,tx(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,x,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===gn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===gn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function fI(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const S=v.program;i.uniformBlockBinding(x,S)}function c(x,v){let S=r[x.id];S===void 0&&(g(x),S=u(x),r[x.id]=S,x.addEventListener("dispose",m));const b=v.program;i.updateUBOMapping(x,b);const E=e.render.frame;s[x.id]!==E&&(h(x),s[x.id]=E)}function u(x){const v=f();x.__bindingPointIndex=v;const S=n.createBuffer(),b=x.__size,E=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,b,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,S),S}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const v=r[x.id],S=x.uniforms,b=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let E=0,T=S.length;E<T;E++){const L=Array.isArray(S[E])?S[E]:[S[E]];for(let y=0,w=L.length;y<w;y++){const N=L[y];if(d(N,E,y,b)===!0){const U=N.__offset,$=Array.isArray(N.value)?N.value:[N.value];let D=0;for(let k=0;k<$.length;k++){const O=$[k],V=_(O);typeof O=="number"||typeof O=="boolean"?(N.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,U+D,N.__data)):O.isMatrix3?(N.__data[0]=O.elements[0],N.__data[1]=O.elements[1],N.__data[2]=O.elements[2],N.__data[3]=0,N.__data[4]=O.elements[3],N.__data[5]=O.elements[4],N.__data[6]=O.elements[5],N.__data[7]=0,N.__data[8]=O.elements[6],N.__data[9]=O.elements[7],N.__data[10]=O.elements[8],N.__data[11]=0):(O.toArray(N.__data,D),D+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,v,S,b){const E=x.value,T=v+"_"+S;if(b[T]===void 0)return typeof E=="number"||typeof E=="boolean"?b[T]=E:b[T]=E.clone(),!0;{const L=b[T];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return b[T]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function g(x){const v=x.uniforms;let S=0;const b=16;for(let T=0,L=v.length;T<L;T++){const y=Array.isArray(v[T])?v[T]:[v[T]];for(let w=0,N=y.length;w<N;w++){const U=y[w],$=Array.isArray(U.value)?U.value:[U.value];for(let D=0,k=$.length;D<k;D++){const O=$[D],V=_(O),H=S%b;H!==0&&b-H<V.boundary&&(S+=b-H),U.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=V.storage}}}const E=S%b;return E>0&&(S+=b-E),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(const x in r)n.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class hx{constructor(e={}){const{canvas:t=sR(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this._useLegacyLights=!1,this.toneMapping=_r,this.toneMappingExposure=1;const v=this;let S=!1,b=0,E=0,T=null,L=-1,y=null;const w=new zt,N=new zt;let U=null;const $=new nt(0);let D=0,k=t.width,O=t.height,V=1,H=null,ne=null;const ue=new zt(0,0,k,O),le=new zt(0,0,k,O);let pe=!1;const Y=new rx;let se=!1,me=!1,Se=null;const G=new Ht,fe=new Qe,ae=new ee,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ee(){return T===null?V:1}let W=i;function R(C,X){for(let Q=0;Q<C.length;Q++){const te=C[Q],Z=t.getContext(te,X);if(Z!==null)return Z}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hh}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",xe,!1),W===null){const X=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&X.shift(),W=R(X,C),W===null)throw R(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let P,B,j,J,ie,A,M,I,z,q,K,he,oe,de,ve,be,ce,ze,Oe,Ie,we,Te,Ce,He;function ut(){P=new S2(W),B=new p2(W,P,e),P.init(B),Te=new oI(W,P,B),j=new rI(W,P,B),J=new b2(W),ie=new WD,A=new sI(W,P,j,ie,B,Te,J),M=new _2(v),I=new y2(v),z=new LR(W,B),Ce=new h2(W,P,z,B),q=new M2(W,z,J,Ce),K=new C2(W,q,z,J),Oe=new A2(W,B,A),be=new m2(ie),he=new VD(v,M,I,P,B,Ce,be),oe=new uI(v,ie),de=new XD,ve=new JD(P,B),ze=new f2(v,M,I,j,K,h,l),ce=new iI(v,K,B),He=new fI(W,J,B,j),Ie=new d2(W,P,J,B),we=new E2(W,P,J,B),J.programs=he.programs,v.capabilities=B,v.extensions=P,v.properties=ie,v.renderLists=de,v.shadowMap=ce,v.state=j,v.info=J}ut();const We=new cI(v,W);this.xr=We,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const C=P.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=P.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(C){C!==void 0&&(V=C,this.setSize(k,O,!1))},this.getSize=function(C){return C.set(k,O)},this.setSize=function(C,X,Q=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,O=X,t.width=Math.floor(C*V),t.height=Math.floor(X*V),Q===!0&&(t.style.width=C+"px",t.style.height=X+"px"),this.setViewport(0,0,C,X)},this.getDrawingBufferSize=function(C){return C.set(k*V,O*V).floor()},this.setDrawingBufferSize=function(C,X,Q){k=C,O=X,V=Q,t.width=Math.floor(C*Q),t.height=Math.floor(X*Q),this.setViewport(0,0,C,X)},this.getCurrentViewport=function(C){return C.copy(w)},this.getViewport=function(C){return C.copy(ue)},this.setViewport=function(C,X,Q,te){C.isVector4?ue.set(C.x,C.y,C.z,C.w):ue.set(C,X,Q,te),j.viewport(w.copy(ue).multiplyScalar(V).floor())},this.getScissor=function(C){return C.copy(le)},this.setScissor=function(C,X,Q,te){C.isVector4?le.set(C.x,C.y,C.z,C.w):le.set(C,X,Q,te),j.scissor(N.copy(le).multiplyScalar(V).floor())},this.getScissorTest=function(){return pe},this.setScissorTest=function(C){j.setScissorTest(pe=C)},this.setOpaqueSort=function(C){H=C},this.setTransparentSort=function(C){ne=C},this.getClearColor=function(C){return C.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(C=!0,X=!0,Q=!0){let te=0;if(C){let Z=!1;if(T!==null){const Me=T.texture.format;Z=Me===G0||Me===H0||Me===z0}if(Z){const Me=T.texture.type,Ae=Me===gr||Me===lr||Me===Gh||Me===ts||Me===k0||Me===B0,De=ze.getClearColor(),Ne=ze.getClearAlpha(),Ve=De.r,ke=De.g,Be=De.b;Ae?(d[0]=Ve,d[1]=ke,d[2]=Be,d[3]=Ne,W.clearBufferuiv(W.COLOR,0,d)):(g[0]=Ve,g[1]=ke,g[2]=Be,g[3]=Ne,W.clearBufferiv(W.COLOR,0,g))}else te|=W.COLOR_BUFFER_BIT}X&&(te|=W.DEPTH_BUFFER_BIT),Q&&(te|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),de.dispose(),ve.dispose(),ie.dispose(),M.dispose(),I.dispose(),K.dispose(),Ce.dispose(),He.dispose(),he.dispose(),We.dispose(),We.removeEventListener("sessionstart",Zt),We.removeEventListener("sessionend",lt),Se&&(Se.dispose(),Se=null),Jt.stop()};function _e(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const C=J.autoReset,X=ce.enabled,Q=ce.autoUpdate,te=ce.needsUpdate,Z=ce.type;ut(),J.autoReset=C,ce.enabled=X,ce.autoUpdate=Q,ce.needsUpdate=te,ce.type=Z}function xe(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ye(C){const X=C.target;X.removeEventListener("dispose",ye),Ue(X)}function Ue(C){Pe(C),ie.remove(C)}function Pe(C){const X=ie.get(C).programs;X!==void 0&&(X.forEach(function(Q){he.releaseProgram(Q)}),C.isShaderMaterial&&he.releaseShaderCache(C))}this.renderBufferDirect=function(C,X,Q,te,Z,Me){X===null&&(X=re);const Ae=Z.isMesh&&Z.matrixWorld.determinant()<0,De=mx(C,X,Q,te,Z);j.setMaterial(te,Ae);let Ne=Q.index,Ve=1;if(te.wireframe===!0){if(Ne=q.getWireframeAttribute(Q),Ne===void 0)return;Ve=2}const ke=Q.drawRange,Be=Q.attributes.position;let Et=ke.start*Ve,Sn=(ke.start+ke.count)*Ve;Me!==null&&(Et=Math.max(Et,Me.start*Ve),Sn=Math.min(Sn,(Me.start+Me.count)*Ve)),Ne!==null?(Et=Math.max(Et,0),Sn=Math.min(Sn,Ne.count)):Be!=null&&(Et=Math.max(Et,0),Sn=Math.min(Sn,Be.count));const Dt=Sn-Et;if(Dt<0||Dt===1/0)return;Ce.setup(Z,te,De,Q,Ne);let xi,mt=Ie;if(Ne!==null&&(xi=z.get(Ne),mt=we,mt.setIndex(xi)),Z.isMesh)te.wireframe===!0?(j.setLineWidth(te.wireframeLinewidth*Ee()),mt.setMode(W.LINES)):mt.setMode(W.TRIANGLES);else if(Z.isLine){let je=te.linewidth;je===void 0&&(je=1),j.setLineWidth(je*Ee()),Z.isLineSegments?mt.setMode(W.LINES):Z.isLineLoop?mt.setMode(W.LINE_LOOP):mt.setMode(W.LINE_STRIP)}else Z.isPoints?mt.setMode(W.POINTS):Z.isSprite&&mt.setMode(W.TRIANGLES);if(Z.isBatchedMesh)mt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)mt.renderInstances(Et,Dt,Z.count);else if(Q.isInstancedBufferGeometry){const je=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Mc=Math.min(Q.instanceCount,je);mt.renderInstances(Et,Dt,Mc)}else mt.render(Et,Dt)};function ot(C,X,Q){C.transparent===!0&&C.side===Ri&&C.forceSinglePass===!1?(C.side=gn,C.needsUpdate=!0,ba(C,X,Q),C.side=Sr,C.needsUpdate=!0,ba(C,X,Q),C.side=Ri):ba(C,X,Q)}this.compile=function(C,X,Q=null){Q===null&&(Q=C),m=ve.get(Q),m.init(),x.push(m),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),C!==Q&&C.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),m.setupLights(v._useLegacyLights);const te=new Set;return C.traverse(function(Z){const Me=Z.material;if(Me)if(Array.isArray(Me))for(let Ae=0;Ae<Me.length;Ae++){const De=Me[Ae];ot(De,Q,Z),te.add(De)}else ot(Me,Q,Z),te.add(Me)}),x.pop(),m=null,te},this.compileAsync=function(C,X,Q=null){const te=this.compile(C,X,Q);return new Promise(Z=>{function Me(){if(te.forEach(function(Ae){ie.get(Ae).currentProgram.isReady()&&te.delete(Ae)}),te.size===0){Z(C);return}setTimeout(Me,10)}P.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let at=null;function Lt(C){at&&at(C)}function Zt(){Jt.stop()}function lt(){Jt.start()}const Jt=new sx;Jt.setAnimationLoop(Lt),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(C){at=C,We.setAnimationLoop(C),C===null?Jt.stop():Jt.start()},We.addEventListener("sessionstart",Zt),We.addEventListener("sessionend",lt),this.render=function(C,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(X),X=We.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,X,T),m=ve.get(C,x.length),m.init(),x.push(m),G.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Y.setFromProjectionMatrix(G),me=this.localClippingEnabled,se=be.init(this.clippingPlanes,me),_=de.get(C,p.length),_.init(),p.push(_),si(C,X,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(H,ne),this.info.render.frame++,se===!0&&be.beginShadows();const Q=m.state.shadowsArray;if(ce.render(Q,C,X),se===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(_,C),m.setupLights(v._useLegacyLights),X.isArrayCamera){const te=X.cameras;for(let Z=0,Me=te.length;Z<Me;Z++){const Ae=te[Z];$h(_,C,Ae,Ae.viewport)}}else $h(_,C,X);T!==null&&(A.updateMultisampleRenderTarget(T),A.updateRenderTargetMipmap(T)),C.isScene===!0&&C.onAfterRender(v,C,X),Ce.resetDefaultState(),L=-1,y=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function si(C,X,Q,te){if(C.visible===!1)return;if(C.layers.test(X.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(X);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){te&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(G);const Ae=K.update(C),De=C.material;De.visible&&_.push(C,Ae,De,Q,ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){const Ae=K.update(C),De=C.material;if(te&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ae.copy(Ae.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(G)),Array.isArray(De)){const Ne=Ae.groups;for(let Ve=0,ke=Ne.length;Ve<ke;Ve++){const Be=Ne[Ve],Et=De[Be.materialIndex];Et&&Et.visible&&_.push(C,Ae,Et,Q,ae.z,Be)}}else De.visible&&_.push(C,Ae,De,Q,ae.z,null)}}const Me=C.children;for(let Ae=0,De=Me.length;Ae<De;Ae++)si(Me[Ae],X,Q,te)}function $h(C,X,Q,te){const Z=C.opaque,Me=C.transmissive,Ae=C.transparent;m.setupLightsView(Q),se===!0&&be.setGlobalState(v.clippingPlanes,Q),Me.length>0&&px(Z,Me,X,Q),te&&j.viewport(w.copy(te)),Z.length>0&&Ea(Z,X,Q),Me.length>0&&Ea(Me,X,Q),Ae.length>0&&Ea(Ae,X,Q),j.buffers.depth.setTest(!0),j.buffers.depth.setMask(!0),j.buffers.color.setMask(!0),j.setPolygonOffset(!1)}function px(C,X,Q,te){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;const Me=B.isWebGL2;Se===null&&(Se=new cs(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")?la:gr,minFilter:aa,samples:Me?4:0})),v.getDrawingBufferSize(fe),Me?Se.setSize(fe.x,fe.y):Se.setSize(kf(fe.x),kf(fe.y));const Ae=v.getRenderTarget();v.setRenderTarget(Se),v.getClearColor($),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const De=v.toneMapping;v.toneMapping=_r,Ea(C,Q,te),A.updateMultisampleRenderTarget(Se),A.updateRenderTargetMipmap(Se);let Ne=!1;for(let Ve=0,ke=X.length;Ve<ke;Ve++){const Be=X[Ve],Et=Be.object,Sn=Be.geometry,Dt=Be.material,xi=Be.group;if(Dt.side===Ri&&Et.layers.test(te.layers)){const mt=Dt.side;Dt.side=gn,Dt.needsUpdate=!0,Yh(Et,Q,te,Sn,Dt,xi),Dt.side=mt,Dt.needsUpdate=!0,Ne=!0}}Ne===!0&&(A.updateMultisampleRenderTarget(Se),A.updateRenderTargetMipmap(Se)),v.setRenderTarget(Ae),v.setClearColor($,D),v.toneMapping=De}function Ea(C,X,Q){const te=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,Me=C.length;Z<Me;Z++){const Ae=C[Z],De=Ae.object,Ne=Ae.geometry,Ve=te===null?Ae.material:te,ke=Ae.group;De.layers.test(Q.layers)&&Yh(De,X,Q,Ne,Ve,ke)}}function Yh(C,X,Q,te,Z,Me){C.onBeforeRender(v,X,Q,te,Z,Me),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Z.onBeforeRender(v,X,Q,te,C,Me),Z.transparent===!0&&Z.side===Ri&&Z.forceSinglePass===!1?(Z.side=gn,Z.needsUpdate=!0,v.renderBufferDirect(Q,X,te,Z,C,Me),Z.side=Sr,Z.needsUpdate=!0,v.renderBufferDirect(Q,X,te,Z,C,Me),Z.side=Ri):v.renderBufferDirect(Q,X,te,Z,C,Me),C.onAfterRender(v,X,Q,te,Z,Me)}function ba(C,X,Q){X.isScene!==!0&&(X=re);const te=ie.get(C),Z=m.state.lights,Me=m.state.shadowsArray,Ae=Z.state.version,De=he.getParameters(C,Z.state,Me,X,Q),Ne=he.getProgramCacheKey(De);let Ve=te.programs;te.environment=C.isMeshStandardMaterial?X.environment:null,te.fog=X.fog,te.envMap=(C.isMeshStandardMaterial?I:M).get(C.envMap||te.environment),Ve===void 0&&(C.addEventListener("dispose",ye),Ve=new Map,te.programs=Ve);let ke=Ve.get(Ne);if(ke!==void 0){if(te.currentProgram===ke&&te.lightsStateVersion===Ae)return Zh(C,De),ke}else De.uniforms=he.getUniforms(C),C.onBuild(Q,De,v),C.onBeforeCompile(De,v),ke=he.acquireProgram(De,Ne),Ve.set(Ne,ke),te.uniforms=De.uniforms;const Be=te.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Be.clippingPlanes=be.uniform),Zh(C,De),te.needsLights=gx(C),te.lightsStateVersion=Ae,te.needsLights&&(Be.ambientLightColor.value=Z.state.ambient,Be.lightProbe.value=Z.state.probe,Be.directionalLights.value=Z.state.directional,Be.directionalLightShadows.value=Z.state.directionalShadow,Be.spotLights.value=Z.state.spot,Be.spotLightShadows.value=Z.state.spotShadow,Be.rectAreaLights.value=Z.state.rectArea,Be.ltc_1.value=Z.state.rectAreaLTC1,Be.ltc_2.value=Z.state.rectAreaLTC2,Be.pointLights.value=Z.state.point,Be.pointLightShadows.value=Z.state.pointShadow,Be.hemisphereLights.value=Z.state.hemi,Be.directionalShadowMap.value=Z.state.directionalShadowMap,Be.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Be.spotShadowMap.value=Z.state.spotShadowMap,Be.spotLightMatrix.value=Z.state.spotLightMatrix,Be.spotLightMap.value=Z.state.spotLightMap,Be.pointShadowMap.value=Z.state.pointShadowMap,Be.pointShadowMatrix.value=Z.state.pointShadowMatrix),te.currentProgram=ke,te.uniformsList=null,ke}function Kh(C){if(C.uniformsList===null){const X=C.currentProgram.getUniforms();C.uniformsList=vl.seqWithValue(X.seq,C.uniforms)}return C.uniformsList}function Zh(C,X){const Q=ie.get(C);Q.outputColorSpace=X.outputColorSpace,Q.batching=X.batching,Q.instancing=X.instancing,Q.instancingColor=X.instancingColor,Q.skinning=X.skinning,Q.morphTargets=X.morphTargets,Q.morphNormals=X.morphNormals,Q.morphColors=X.morphColors,Q.morphTargetsCount=X.morphTargetsCount,Q.numClippingPlanes=X.numClippingPlanes,Q.numIntersection=X.numClipIntersection,Q.vertexAlphas=X.vertexAlphas,Q.vertexTangents=X.vertexTangents,Q.toneMapping=X.toneMapping}function mx(C,X,Q,te,Z){X.isScene!==!0&&(X=re),A.resetTextureUnits();const Me=X.fog,Ae=te.isMeshStandardMaterial?X.environment:null,De=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Bi,Ne=(te.isMeshStandardMaterial?I:M).get(te.envMap||Ae),Ve=te.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ke=!!Q.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Be=!!Q.morphAttributes.position,Et=!!Q.morphAttributes.normal,Sn=!!Q.morphAttributes.color;let Dt=_r;te.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Dt=v.toneMapping);const xi=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,mt=xi!==void 0?xi.length:0,je=ie.get(te),Mc=m.state.lights;if(se===!0&&(me===!0||C!==y)){const Dn=C===y&&te.id===L;be.setState(te,C,Dn)}let xt=!1;te.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Mc.state.version||je.outputColorSpace!==De||Z.isBatchedMesh&&je.batching===!1||!Z.isBatchedMesh&&je.batching===!0||Z.isInstancedMesh&&je.instancing===!1||!Z.isInstancedMesh&&je.instancing===!0||Z.isSkinnedMesh&&je.skinning===!1||!Z.isSkinnedMesh&&je.skinning===!0||Z.isInstancedMesh&&je.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&je.instancingColor===!1&&Z.instanceColor!==null||je.envMap!==Ne||te.fog===!0&&je.fog!==Me||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==be.numPlanes||je.numIntersection!==be.numIntersection)||je.vertexAlphas!==Ve||je.vertexTangents!==ke||je.morphTargets!==Be||je.morphNormals!==Et||je.morphColors!==Sn||je.toneMapping!==Dt||B.isWebGL2===!0&&je.morphTargetsCount!==mt)&&(xt=!0):(xt=!0,je.__version=te.version);let Ar=je.currentProgram;xt===!0&&(Ar=ba(te,X,Z));let Jh=!1,_o=!1,Ec=!1;const Vt=Ar.getUniforms(),Cr=je.uniforms;if(j.useProgram(Ar.program)&&(Jh=!0,_o=!0,Ec=!0),te.id!==L&&(L=te.id,_o=!0),Jh||y!==C){Vt.setValue(W,"projectionMatrix",C.projectionMatrix),Vt.setValue(W,"viewMatrix",C.matrixWorldInverse);const Dn=Vt.map.cameraPosition;Dn!==void 0&&Dn.setValue(W,ae.setFromMatrixPosition(C.matrixWorld)),B.logarithmicDepthBuffer&&Vt.setValue(W,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Vt.setValue(W,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,_o=!0,Ec=!0)}if(Z.isSkinnedMesh){Vt.setOptional(W,Z,"bindMatrix"),Vt.setOptional(W,Z,"bindMatrixInverse");const Dn=Z.skeleton;Dn&&(B.floatVertexTextures?(Dn.boneTexture===null&&Dn.computeBoneTexture(),Vt.setValue(W,"boneTexture",Dn.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(Vt.setOptional(W,Z,"batchingTexture"),Vt.setValue(W,"batchingTexture",Z._matricesTexture,A));const bc=Q.morphAttributes;if((bc.position!==void 0||bc.normal!==void 0||bc.color!==void 0&&B.isWebGL2===!0)&&Oe.update(Z,Q,Ar),(_o||je.receiveShadow!==Z.receiveShadow)&&(je.receiveShadow=Z.receiveShadow,Vt.setValue(W,"receiveShadow",Z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Cr.envMap.value=Ne,Cr.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),_o&&(Vt.setValue(W,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&_x(Cr,Ec),Me&&te.fog===!0&&oe.refreshFogUniforms(Cr,Me),oe.refreshMaterialUniforms(Cr,te,V,O,Se),vl.upload(W,Kh(je),Cr,A)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(vl.upload(W,Kh(je),Cr,A),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Vt.setValue(W,"center",Z.center),Vt.setValue(W,"modelViewMatrix",Z.modelViewMatrix),Vt.setValue(W,"normalMatrix",Z.normalMatrix),Vt.setValue(W,"modelMatrix",Z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const Dn=te.uniformsGroups;for(let Tc=0,vx=Dn.length;Tc<vx;Tc++)if(B.isWebGL2){const Qh=Dn[Tc];He.update(Qh,Ar),He.bind(Qh,Ar)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ar}function _x(C,X){C.ambientLightColor.needsUpdate=X,C.lightProbe.needsUpdate=X,C.directionalLights.needsUpdate=X,C.directionalLightShadows.needsUpdate=X,C.pointLights.needsUpdate=X,C.pointLightShadows.needsUpdate=X,C.spotLights.needsUpdate=X,C.spotLightShadows.needsUpdate=X,C.rectAreaLights.needsUpdate=X,C.hemisphereLights.needsUpdate=X}function gx(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(C,X,Q){ie.get(C.texture).__webglTexture=X,ie.get(C.depthTexture).__webglTexture=Q;const te=ie.get(C);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=Q===void 0,te.__autoAllocateDepthBuffer||P.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,X){const Q=ie.get(C);Q.__webglFramebuffer=X,Q.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(C,X=0,Q=0){T=C,b=X,E=Q;let te=!0,Z=null,Me=!1,Ae=!1;if(C){const Ne=ie.get(C);Ne.__useDefaultFramebuffer!==void 0?(j.bindFramebuffer(W.FRAMEBUFFER,null),te=!1):Ne.__webglFramebuffer===void 0?A.setupRenderTarget(C):Ne.__hasExternalTextures&&A.rebindTextures(C,ie.get(C.texture).__webglTexture,ie.get(C.depthTexture).__webglTexture);const Ve=C.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ae=!0);const ke=ie.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(ke[X])?Z=ke[X][Q]:Z=ke[X],Me=!0):B.isWebGL2&&C.samples>0&&A.useMultisampledRTT(C)===!1?Z=ie.get(C).__webglMultisampledFramebuffer:Array.isArray(ke)?Z=ke[Q]:Z=ke,w.copy(C.viewport),N.copy(C.scissor),U=C.scissorTest}else w.copy(ue).multiplyScalar(V).floor(),N.copy(le).multiplyScalar(V).floor(),U=pe;if(j.bindFramebuffer(W.FRAMEBUFFER,Z)&&B.drawBuffers&&te&&j.drawBuffers(C,Z),j.viewport(w),j.scissor(N),j.setScissorTest(U),Me){const Ne=ie.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ne.__webglTexture,Q)}else if(Ae){const Ne=ie.get(C.texture),Ve=X||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ne.__webglTexture,Q||0,Ve)}L=-1},this.readRenderTargetPixels=function(C,X,Q,te,Z,Me,Ae){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=ie.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(De=De[Ae]),De){j.bindFramebuffer(W.FRAMEBUFFER,De);try{const Ne=C.texture,Ve=Ne.format,ke=Ne.type;if(Ve!==ii&&Te.convert(Ve)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=ke===la&&(P.has("EXT_color_buffer_half_float")||B.isWebGL2&&P.has("EXT_color_buffer_float"));if(ke!==gr&&Te.convert(ke)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===cr&&(B.isWebGL2||P.has("OES_texture_float")||P.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=C.width-te&&Q>=0&&Q<=C.height-Z&&W.readPixels(X,Q,te,Z,Te.convert(Ve),Te.convert(ke),Me)}finally{const Ne=T!==null?ie.get(T).__webglFramebuffer:null;j.bindFramebuffer(W.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(C,X,Q=0){const te=Math.pow(2,-Q),Z=Math.floor(X.image.width*te),Me=Math.floor(X.image.height*te);A.setTexture2D(X,0),W.copyTexSubImage2D(W.TEXTURE_2D,Q,0,0,C.x,C.y,Z,Me),j.unbindTexture()},this.copyTextureToTexture=function(C,X,Q,te=0){const Z=X.image.width,Me=X.image.height,Ae=Te.convert(Q.format),De=Te.convert(Q.type);A.setTexture2D(Q,0),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,Q.unpackAlignment),X.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,te,C.x,C.y,Z,Me,Ae,De,X.image.data):X.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,te,C.x,C.y,X.mipmaps[0].width,X.mipmaps[0].height,Ae,X.mipmaps[0].data):W.texSubImage2D(W.TEXTURE_2D,te,C.x,C.y,Ae,De,X.image),te===0&&Q.generateMipmaps&&W.generateMipmap(W.TEXTURE_2D),j.unbindTexture()},this.copyTextureToTexture3D=function(C,X,Q,te,Z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=C.max.x-C.min.x+1,Ae=C.max.y-C.min.y+1,De=C.max.z-C.min.z+1,Ne=Te.convert(te.format),Ve=Te.convert(te.type);let ke;if(te.isData3DTexture)A.setTexture3D(te,0),ke=W.TEXTURE_3D;else if(te.isDataArrayTexture||te.isCompressedArrayTexture)A.setTexture2DArray(te,0),ke=W.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,te.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,te.unpackAlignment);const Be=W.getParameter(W.UNPACK_ROW_LENGTH),Et=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Sn=W.getParameter(W.UNPACK_SKIP_PIXELS),Dt=W.getParameter(W.UNPACK_SKIP_ROWS),xi=W.getParameter(W.UNPACK_SKIP_IMAGES),mt=Q.isCompressedTexture?Q.mipmaps[Z]:Q.image;W.pixelStorei(W.UNPACK_ROW_LENGTH,mt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,mt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,C.min.x),W.pixelStorei(W.UNPACK_SKIP_ROWS,C.min.y),W.pixelStorei(W.UNPACK_SKIP_IMAGES,C.min.z),Q.isDataTexture||Q.isData3DTexture?W.texSubImage3D(ke,Z,X.x,X.y,X.z,Me,Ae,De,Ne,Ve,mt.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(ke,Z,X.x,X.y,X.z,Me,Ae,De,Ne,mt.data)):W.texSubImage3D(ke,Z,X.x,X.y,X.z,Me,Ae,De,Ne,Ve,mt),W.pixelStorei(W.UNPACK_ROW_LENGTH,Be),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Et),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Sn),W.pixelStorei(W.UNPACK_SKIP_ROWS,Dt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,xi),Z===0&&te.generateMipmaps&&W.generateMipmap(ke),j.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?A.setTextureCube(C,0):C.isData3DTexture?A.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?A.setTexture2DArray(C,0):A.setTexture2D(C,0),j.unbindTexture()},this.resetState=function(){b=0,E=0,T=null,j.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Vh?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===gc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===kt?is:W0}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===is?kt:Bi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class hI extends hx{}hI.prototype.isWebGL1Renderer=!0;class dI extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}const u_={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class pI{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const mI=new pI;class Xh{constructor(e){this.manager=e!==void 0?e:mI,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Xh.DEFAULT_MATERIAL_NAME="__DEFAULT";class _I extends Xh{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=u_.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=ca("img");function l(){u(),u_.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class gI extends Xh{constructor(e){super(e)}load(e,t,i,r){const s=new vn,o=new _I(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hh);class vI{constructor(){this.gl=new qh,this.canvas=this.gl.canvas,this.sizes=this.gl.sizes,this.scene=this.gl.scene,this.setInstance()}setInstance(){this.instance=new zn(30,this.sizes.width/this.sizes.height,10,1e3),this.instance.position.z=600,this.instance.fov=2*Math.atan(this.sizes.height/2/600)*180/Math.PI,this.scene.add(this.instance),this.instance.updateProjectionMatrix()}resize(){this.instance.fov=2*Math.atan(this.sizes.height/2/600)*180/Math.PI,this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}}class dx{constructor(){this.callbacks={},this.callbacks.base={}}on(e,t){return typeof e>"u"||e===""?(console.warn("wrong names"),!1):typeof t>"u"?(console.warn("wrong callback"),!1):(this.resolveNames(e).forEach(r=>{const s=this.resolveName(r);this.callbacks[s.namespace]instanceof Object||(this.callbacks[s.namespace]={}),this.callbacks[s.namespace][s.value]instanceof Array||(this.callbacks[s.namespace][s.value]=[]),this.callbacks[s.namespace][s.value].push(t)}),this)}off(e){return typeof e>"u"||e===""?(console.warn("wrong name"),!1):(this.resolveNames(e).forEach(i=>{const r=this.resolveName(i);if(r.namespace!=="base"&&r.value==="")delete this.callbacks[r.namespace];else if(r.namespace==="base")for(const s in this.callbacks)this.callbacks[s]instanceof Object&&this.callbacks[s][r.value]instanceof Array&&(delete this.callbacks[s][r.value],Object.keys(this.callbacks[s]).length===0&&delete this.callbacks[s]);else this.callbacks[r.namespace]instanceof Object&&this.callbacks[r.namespace][r.value]instanceof Array&&(delete this.callbacks[r.namespace][r.value],Object.keys(this.callbacks[r.namespace]).length===0&&delete this.callbacks[r.namespace])}),this)}trigger(e,t){if(typeof e>"u"||e==="")return console.warn("wrong name"),!1;let i=null;const r=t instanceof Array?t:[];let s=this.resolveNames(e);if(s=this.resolveName(s[0]),s.namespace==="base")for(const o in this.callbacks)this.callbacks[o]instanceof Object&&this.callbacks[o][s.value]instanceof Array&&this.callbacks[o][s.value].forEach(function(a){a.apply(this,r)});else if(this.callbacks[s.namespace]instanceof Object){if(s.value==="")return console.warn("wrong name"),this;this.callbacks[s.namespace][s.value].forEach(function(o){o.apply(this,r)})}return i}resolveNames(e){let t=e;return t=t.replace(/[^a-zA-Z0-9 ,/.]/g,""),t=t.replace(/[,/]+/g," "),t=t.split(" "),t}resolveName(e){const t={},i=e.split(".");return t.original=e,t.value=i[0],t.namespace="base",i.length>1&&i[1]!==""&&(t.namespace=i[1]),t}}class xI extends dx{constructor(){super(),this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),window.addEventListener("resize",()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.trigger("resize")})}}class yI extends dx{constructor(){super(),this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16,window.requestAnimationFrame(()=>{this.tick()})}tick(){const e=Date.now();this.delta=e-this.current,this.current=e,this.elapsed=this.current-this.start,this.trigger("tick"),window.requestAnimationFrame(()=>{this.tick()})}}class SI{constructor(){this.gl=new qh,this.canvas=this.gl.canvas,this.sizes=this.gl.sizes,this.scene=this.gl.scene,this.camera=this.gl.camera,this.setInstance()}setInstance(){this.instance=new hx({canvas:this.canvas,antialias:!0,alpha:!0}),this.instance.setPixelRatio(this.sizes.pixelRatio),this.instance.setSize(this.sizes.width,this.sizes.height)}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(window.devicePixelRatio)}update(){this.instance.render(this.scene,this.camera.instance)}}var MI=`uniform float uSliderProgress;
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
}`,EI=`uniform float uScreenProgress;
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
}`;let Lu=null;class qh{constructor(e,t,i,r){if(Lu)return Lu;Lu=this,window.gl=this,this.canvas=e,this.container=t,this.overlay=i,this.menuOverlay=r,this.sizes=new xI,this.time=new yI,this.scene=new dI,this.camera=new vI,this.renderer=new SI,this.textureLoader=new gI,this.geometry=new yc(1,1,100,100),this.allMaterials=[],this.debugActive=!1,this.currentCategory="photos",this.allTypesProject=["photos","videos","contact"],this.firstLoadProject=!0,this.firstLoadApp=!0,this.indexMenuOpen=!1,this.sizes.on("resize",()=>{this.resize()}),this.time.on("tick",()=>{this.update()}),document.ondblclick=function(s){s.preventDefault()},this.createSliderMaterial()}createSliderMaterial(){this.material=new Mr({uniforms:{uSlider:{value:0},uSliderProgress:{value:0},uScreenProgress:{value:0},uTexture:{value:null},uTextureNext:{value:null},uTextureRatio:{value:new Qe(16,9)},uParallaxStrength:{value:.1},uScrollProgress:{value:0},uResolution:{value:new Qe(this.sizes.width,this.sizes.height)},uQuadSize:{value:new Qe(1,1)}},vertexShader:EI,fragmentShader:MI}),this.material.transparent=!0}resize(){this.camera.resize(),this.renderer.resize(),this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.ASlider&&this.ASlider.resize(),this.homeSlider&&this.homeSlider.resize(),this.itemSlider&&this.itemSlider.resize(),this.allMaterials.length>0&&this.allMaterials.forEach(e=>{e.uniforms.uResolution.value.x=this.sizes.width,e.uniforms.uResolution.value.y=this.sizes.height})}update(){this.ASlider&&this.ASlider.syncLabels(),this.renderer.update(),this.debugActive&&(this.material.uniforms.uSliderProgress.value=this.settings.sliderProgress,this.material.uniforms.uScreenProgress.value=this.settings.screenProgress)}}function bI(n,e,t,i,r){let s=null,o=!1;const a=l=>{s||(s=l);const c=Math.min((l-s)/i,1),u=Math.floor(c*(t-e)+e);n.innerHTML=`${u}%`,c<1?window.requestAnimationFrame(a):!o&&u>=97&&(o=!0,n.innerHTML="100%",TI(n,r))};window.requestAnimationFrame(a)}function TI(n,e){n.innerHTML=n.textContent.replace(/([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]+)/g,'<div class="word">$1</div>'),n.querySelectorAll(".word").forEach(i=>{i.innerHTML=i.textContent.replace(/[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]/g,"<div class='perspective'><div class='letter'><div>$&</div></div></div>")}),e&&typeof e=="function"&&e()}const wI=[{slug:"dunod-mallier",acf:{title:"Dunod Mallier",localisation:"",project_number:"11",title_preview:{line_1:"Dunod",line_2:"Mallier"},primary:{url:"/projets/dunod-mallier/cover.webp",alt:"Dunod Mallier — couverture du projet"},slides:[{image:{url:"/projets/dunod-mallier/slide-5.webp",alt:"Dunod Mallier — photo 1"},format:"vertical"},{image:{url:"/projets/dunod-mallier/slide-2.webp",alt:"Dunod Mallier — photo 2"},format:"vertical"},{image:{url:"/projets/dunod-mallier/slide-4.webp",alt:"Dunod Mallier — photo 3"},format:"horizontal"},{image:{url:"/projets/dunod-mallier/slide-3.webp",alt:"Dunod Mallier — photo 4"},format:"horizontal"},{image:{url:"/projets/dunod-mallier/slide-1.webp",alt:"Dunod Mallier — photo 5"},format:"horizontal"}],context:[{title:"Contexte",body:"Dunod-Mallier est un atelier de ferronnerie d'art qui conçoit et restaure des ouvrages sur mesure en métal. L'entreprise s'adresse aux architectes, décorateurs et clients privés, avec un fort accent sur le savoir-faire artisanal, la qualité et la personnalisation."},{title:"Mission",body:"Mettre en avant le savoir faire des artisans à travers des photos et vidéos pendant la réalisation d'un meuble."}],type:"Artisan d'art",videos:[]}},{slug:"palet-saint-germain",acf:{title:"Palet Saint Germain",localisation:"",project_number:"12",title_preview:{line_1:"Palet",line_2:"Saint Germain"},primary:{url:"/projets/palet-saint-germain/cover.webp",alt:"Palet Saint Germain — couverture du projet"},slides:[{image:{url:"/projets/palet-saint-germain/slide-1.webp",alt:"Palet Saint Germain — photo 1"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-2.webp",alt:"Palet Saint Germain — photo 2"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-3.webp",alt:"Palet Saint Germain — photo 3"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-4.webp",alt:"Palet Saint Germain — photo 4"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-5.webp",alt:"Palet Saint Germain — photo 5"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-6.webp",alt:"Palet Saint Germain — photo 6"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-7.webp",alt:"Palet Saint Germain — photo 7"},format:"horizontal"},{image:{url:"/projets/palet-saint-germain/slide-8.webp",alt:"Palet Saint Germain — photo 8"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-9.webp",alt:"Palet Saint Germain — photo 9"},format:"horizontal"},{image:{url:"/projets/palet-saint-germain/slide-10.webp",alt:"Palet Saint Germain — photo 10"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-11.webp",alt:"Palet Saint Germain — photo 11"},format:"horizontal"},{image:{url:"/projets/palet-saint-germain/slide-12.webp",alt:"Palet Saint Germain — photo 12"},format:"vertical"},{image:{url:"/projets/palet-saint-germain/slide-13.webp",alt:"Palet Saint Germain — photo 13"},format:"horizontal"},{image:{url:"/projets/palet-saint-germain/slide-14.webp",alt:"Palet Saint Germain — photo 14"},format:"horizontal"}],context:[{title:"Contexte",body:"Association parisienne qui fait vivre le palet breton, ce jeu traditionnel de disques en fonte sur planche en bois. Tournois, concours et animations conviviaux qui réunissent des passionnés de toute la France."}],type:"Association sportive",videos:[]}},{slug:"terracall",acf:{title:"Terracall",localisation:"",project_number:"10",title_preview:{line_1:"Terracall",line_2:""},primary:{url:"/projets/terracall/cover.webp",alt:"Terracall — couverture du projet"},slides:[{image:{url:"/projets/terracall/slide-1.webp",alt:"Terracall — photo 1"},format:"horizontal"},{image:{url:"/projets/terracall/slide-2.webp",alt:"Terracall — photo 2"},format:"horizontal"},{image:{url:"/projets/terracall/slide-3.webp",alt:"Terracall — photo 3"},format:"vertical"}],context:[{title:"Contexte",body:"Terracall est un opérateur mobile nouvelle génération pour les professionnels. Il propose des forfaits avec un assistant IA intégré qui transcrit, résume et organise les appels, avec un enjeu clair : faire gagner du temps et valoriser le savoir-faire commercial des équipes."}],type:"Startup",videos:["https://www.instagram.com/reel/DLmgQpDvTTE/","https://www.instagram.com/reel/DMadI-CpjhO/","https://www.instagram.com/reel/DOvwuvdE8pN/","https://www.instagram.com/reel/DQ81rVeDIoP/"]}},{slug:"biere-masterclass",acf:{title:"Bière Masterclass",localisation:"",project_number:"09",title_preview:{line_1:"Bière",line_2:"Masterclass"},primary:{url:"/projets/biere-masterclass/cover.webp",alt:"Bière Masterclass — couverture du projet"},slides:[{image:{url:"/projets/biere-masterclass/slide-1.webp",alt:"Bière Masterclass — photo 1"},format:"horizontal"},{image:{url:"/projets/biere-masterclass/slide-2.webp",alt:"Bière Masterclass — photo 2"},format:"vertical"},{image:{url:"/projets/biere-masterclass/slide-3.webp",alt:"Bière Masterclass — photo 3"},format:"horizontal"},{image:{url:"/projets/biere-masterclass/slide-4.webp",alt:"Bière Masterclass — photo 4"},format:"vertical"},{image:{url:"/projets/biere-masterclass/slide-5.webp",alt:"Bière Masterclass — photo 5"},format:"horizontal"}],context:[{title:"Contexte",body:"Bière Masterclass est une agence événementielle et d'ateliers autour de la bière artisanale, qui propose des dégustations, des animations et des événements sur mesure pour particuliers et entreprises."}],type:"Organisateur d'événements découverte",videos:["https://www.instagram.com/reel/DU8LF4uCBJA/","https://www.instagram.com/reel/DVDr9IZjfM5/","https://www.instagram.com/reel/DYNFIiZg6bt/"]}},{slug:"carte-blanche",acf:{title:"Carte Blanche",localisation:"",project_number:"08",title_preview:{line_1:"Carte",line_2:"Blanche"},primary:{url:"/projets/carte-blanche/cover.webp",alt:"Carte Blanche — restaurant, cuisine en plein service"},slides:[{image:{url:"/projets/carte-blanche/slide-1.webp",alt:"Carte Blanche — photo 1"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-2.webp",alt:"Carte Blanche — photo 2"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-3.webp",alt:"Carte Blanche — photo 3"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-4.webp",alt:"Carte Blanche — photo 4"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-5.webp",alt:"Carte Blanche — photo 5"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-6.webp",alt:"Carte Blanche — photo 6"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-7.webp",alt:"Carte Blanche — photo 7"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-8.webp",alt:"Carte Blanche — photo 8"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-9.webp",alt:"Carte Blanche — photo 9"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-10.webp",alt:"Carte Blanche — photo 10"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-11.webp",alt:"Carte Blanche — photo 11"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-12.webp",alt:"Carte Blanche — photo 12"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-13.webp",alt:"Carte Blanche — photo 13"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-14.webp",alt:"Carte Blanche — photo 14"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-15.webp",alt:"Carte Blanche — photo 15"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-16.webp",alt:"Carte Blanche — photo 16"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-17.webp",alt:"Carte Blanche — photo 17"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-18.webp",alt:"Carte Blanche — photo 18"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-19.webp",alt:"Carte Blanche — photo 19"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-20.webp",alt:"Carte Blanche — photo 20"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-21.webp",alt:"Carte Blanche — photo 21"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-22.webp",alt:"Carte Blanche — photo 22"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-23.webp",alt:"Carte Blanche — photo 23"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-24.webp",alt:"Carte Blanche — photo 24"},format:"horizontal"},{image:{url:"/projets/carte-blanche/slide-25.webp",alt:"Carte Blanche — photo 25"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-26.webp",alt:"Carte Blanche — photo 26"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-27.webp",alt:"Carte Blanche — photo 27"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-28.webp",alt:"Carte Blanche — photo 28"},format:"vertical"},{image:{url:"/projets/carte-blanche/slide-29.webp",alt:"Carte Blanche — photo 29"},format:"vertical"}],context:[{title:"Contexte",body:"Carte Blanche est un lieu de restauration du 10e arrondissement qui fonctionne comme une résidence de chefs. Il s'adresse aux amateurs de gastronomie curieux de découvrir des propositions renouvelées à chaque changement de chef."}],type:"Restaurant",videos:["https://www.instagram.com/reel/DO3pSB-DN4i/?hl=fr","https://www.instagram.com/reel/DO83r01jObE/","https://www.instagram.com/reel/DPWYqPVDKMz/","https://www.instagram.com/reel/DPos-AkjDL6/","https://www.instagram.com/reel/DQMgjo_jEFf/","https://www.instagram.com/reel/DRPGLfajL2D/","https://www.instagram.com/reel/DRXOHmbjDrh/","https://www.instagram.com/reel/DRfEqm1jAVi/","https://www.instagram.com/reel/DSAtTPXjJFE/","https://www.instagram.com/reel/DUWFe_TDHuW/"]}},{slug:"incubateur-ensam",acf:{title:"Incubateur ENSAM",localisation:"",project_number:"07",title_preview:{line_1:"Incubateur",line_2:"ENSAM"},primary:{url:"/projets/incubateur-ensam/cover.webp",alt:"Incubateur ENSAM — échange à l'incubateur Arts et Métiers, campus de Paris"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Incubateur ENSAM — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Incubateur ENSAM — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Présentation du projet et de ses enjeux — texte à compléter."}],type:"Incubateur d'école",videos:[]}},{slug:"vestaclim",acf:{title:"Vestaclim",localisation:"",project_number:"06",title_preview:{line_1:"Vestaclim",line_2:""},primary:{url:"/projets/vestaclim/cover.webp",alt:"Vestaclim — couverture du projet"},slides:[{image:{url:"/projets/vestaclim/slide-1.webp",alt:"Vestaclim — photo 1"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-2.webp",alt:"Vestaclim — photo 2"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-3.webp",alt:"Vestaclim — photo 3"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-4.webp",alt:"Vestaclim — photo 4"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-5.webp",alt:"Vestaclim — photo 5"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-6.webp",alt:"Vestaclim — photo 6"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-7.webp",alt:"Vestaclim — photo 7"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-8.webp",alt:"Vestaclim — photo 8"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-9.webp",alt:"Vestaclim — photo 9"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-10.webp",alt:"Vestaclim — photo 10"},format:"horizontal"},{image:{url:"/projets/vestaclim/slide-11.webp",alt:"Vestaclim — photo 11"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-12.webp",alt:"Vestaclim — photo 12"},format:"vertical"},{image:{url:"/projets/vestaclim/slide-13.webp",alt:"Vestaclim — photo 13"},format:"vertical"}],context:[{title:"Contexte",body:`Vestaclim est une startup qui développe une solution écologique pour rafraîchir et purifier l'air dans les logements anciens, en particulier ceux où la climatisation classique est difficile à installer. Elle s'adresse aux habitants de logement anciens en ville, de copropriétés et professionnels sensibles au confort thermique.

L'enjeu de Vestaclim est de faire connaitre sa solution au plus grand nombre.`}],type:"Startup greentech",videos:[]}},{slug:"corail-et-nacre",acf:{title:"Corail & Nacre",localisation:"",project_number:"05",title_preview:{line_1:"Corail &",line_2:"Nacre"},primary:{url:"https://res.cloudinary.com/demo/image/upload/w_1200,h_1600,c_fill/sample.jpg",alt:"Corail & Nacre — photo principale (temporaire)"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Corail & Nacre — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Corail & Nacre — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Corail & Nacre est un studio d'architecture d'intérieur spécialisé dans la rénovation complète d'appartements et de maisons haut de gamme. L'agence s'adresse à une clientèle exigeante pour une prestation sur-mesure, de la qualité d'exécution et des projets clé en main."}],type:"Architecte d'intérieur",videos:["https://www.instagram.com/reel/DZkN8ooIe-S/","https://www.instagram.com/reel/DaIX13Do06J/","https://www.instagram.com/reel/DZ2QZjEoggl/","https://www.instagram.com/reel/DSxhCwNiL3T/","https://www.instagram.com/reel/DTppz0FiJfG/"]}},{slug:"pouryere",acf:{title:"Pouryère",localisation:"",project_number:"04",title_preview:{line_1:"Pouryère",line_2:""},primary:{url:"/projets/pouryere/cover.webp",alt:"Pouryère — couverture du projet"},slides:[{image:{url:"/projets/pouryere/slide-1.webp",alt:"Pouryère — photo 1"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-2.webp",alt:"Pouryère — photo 2"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-3.webp",alt:"Pouryère — photo 3"},format:"vertical"},{image:{url:"/projets/pouryere/slide-4.webp",alt:"Pouryère — photo 4"},format:"vertical"},{image:{url:"/projets/pouryere/slide-5.webp",alt:"Pouryère — photo 5"},format:"vertical"},{image:{url:"/projets/pouryere/slide-6.webp",alt:"Pouryère — photo 6"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-7.webp",alt:"Pouryère — photo 7"},format:"vertical"},{image:{url:"/projets/pouryere/slide-8.webp",alt:"Pouryère — photo 8"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-9.webp",alt:"Pouryère — photo 9"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-10.webp",alt:"Pouryère — photo 10"},format:"vertical"},{image:{url:"/projets/pouryere/slide-11.webp",alt:"Pouryère — photo 11"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-12.webp",alt:"Pouryère — photo 12"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-13.webp",alt:"Pouryère — photo 13"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-14.webp",alt:"Pouryère — photo 14"},format:"vertical"},{image:{url:"/projets/pouryere/slide-15.webp",alt:"Pouryère — photo 15"},format:"vertical"},{image:{url:"/projets/pouryere/slide-16.webp",alt:"Pouryère — photo 16"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-17.webp",alt:"Pouryère — photo 17"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-18.webp",alt:"Pouryère — photo 18"},format:"horizontal"},{image:{url:"/projets/pouryere/slide-19.webp",alt:"Pouryère — photo 19"},format:"vertical"},{image:{url:"/projets/pouryere/slide-20.webp",alt:"Pouryère — photo 20"},format:"horizontal"}],context:[{title:"Contexte",body:`Pouryère est une startup spécialisée dans l'analyse et le diagnostic des sols, pour les particuliers comme pour les professionnels. Elle s'adresse aux particuliers voulant mieux connaître l'état de leur sol et avoir des conseils sur les plantations adaptées au sol.

Les enjeux de Pouryère sont de sensibiliser au sujet de la pollution du sol pour ensuite éduquer le plus de personne possible. C'est un sujet encore trop peu connu et peu réglementé alors qu'il touche directement la santé des habitants.`}],type:"Startup greentech",videos:["https://www.instagram.com/reel/Dak-479Bpzd/","https://www.instagram.com/reel/DZ-WWj7t6sI/","https://www.instagram.com/reel/DYpcLc8ha_X/","https://www.instagram.com/p/DY2UeTXtR8f/","https://www.instagram.com/p/DZc2G4avM7L/","https://www.instagram.com/p/DXHeTaACJVX/"]}},{slug:"renoo",acf:{title:"Renoo",localisation:"",project_number:"03",title_preview:{line_1:"Renoo",line_2:""},primary:{url:"/projets/renoo/cover.webp",alt:"Renoo — couverture du projet"},slides:[{image:{url:"/projets/renoo/slide-1.webp",alt:"Renoo — photo 1"},format:"vertical"},{image:{url:"/projets/renoo/slide-2.webp",alt:"Renoo — photo 2"},format:"vertical"},{image:{url:"/projets/renoo/slide-3.webp",alt:"Renoo — photo 3"},format:"vertical"},{image:{url:"/projets/renoo/slide-4.webp",alt:"Renoo — photo 4"},format:"horizontal"},{image:{url:"/projets/renoo/slide-5.webp",alt:"Renoo — photo 5"},format:"horizontal"},{image:{url:"/projets/renoo/slide-6.webp",alt:"Renoo — photo 6"},format:"vertical"},{image:{url:"/projets/renoo/slide-7.webp",alt:"Renoo — photo 7"},format:"vertical"},{image:{url:"/projets/renoo/slide-8.webp",alt:"Renoo — photo 8"},format:"horizontal"},{image:{url:"/projets/renoo/slide-9.webp",alt:"Renoo — photo 9"},format:"horizontal"},{image:{url:"/projets/renoo/slide-10.webp",alt:"Renoo — photo 10"},format:"vertical"},{image:{url:"/projets/renoo/slide-11.webp",alt:"Renoo — photo 11"},format:"horizontal"},{image:{url:"/projets/renoo/slide-12.webp",alt:"Renoo — photo 12"},format:"horizontal"},{image:{url:"/projets/renoo/slide-13.webp",alt:"Renoo — photo 13"},format:"horizontal"},{image:{url:"/projets/renoo/slide-14.webp",alt:"Renoo — photo 14"},format:"vertical"},{image:{url:"/projets/renoo/slide-15.webp",alt:"Renoo — photo 15"},format:"vertical"},{image:{url:"/projets/renoo/slide-16.webp",alt:"Renoo — photo 16"},format:"vertical"},{image:{url:"/projets/renoo/slide-17.webp",alt:"Renoo — photo 17"},format:"vertical"},{image:{url:"/projets/renoo/slide-18.webp",alt:"Renoo — photo 18"},format:"vertical"},{image:{url:"/projets/renoo/slide-19.webp",alt:"Renoo — photo 19"},format:"vertical"},{image:{url:"/projets/renoo/slide-20.webp",alt:"Renoo — photo 20"},format:"horizontal"},{image:{url:"/projets/renoo/slide-21.webp",alt:"Renoo — photo 21"},format:"horizontal"}],context:[{title:"Contexte",body:"Renoo est une entreprise spécialisée dans la rénovation de l'habitat, qui accompagne les propriétaires et les professionnels de l'idée jusqu'aux finitions. Elle s'adresse à ceux qui veulent un bon accompagnement, sans le stress des travaux et un suivi millimétré."}],type:"Entreprise de rénovation",videos:["https://www.instagram.com/reel/DbJbx-qRXbE/","https://www.instagram.com/reel/DbbY-OwtfPI/","https://www.instagram.com/reel/Dbv_XyduOaY/","https://www.instagram.com/reel/DcBUAHutiRJ/","https://www.instagram.com/reel/DcLxqkoNobU/","https://www.instagram.com/reel/DdCNkWqtI09/","https://www.instagram.com/reel/DdUPeQhNvgH/"]}},{slug:"inskip",acf:{title:"Inskip",localisation:"",project_number:"02",title_preview:{line_1:"Inskip",line_2:""},primary:{url:"/projets/inskip/cover.webp",alt:"Inskip — couverture du projet"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Inskip — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Inskip — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:`INSKIP est un cabinet de conseil en stratégie et innovation qui accompagne startups, grands groupes et institutions dans la conception, le déploiement et la croissance de leurs projets. Il s'adresse à des organisations qui veulent passer de l'idée à l'action.

Le Sales Bootcamp accompagne des fondateurs et équipes commerciales à maitriser leur croissance avec des méthodes de prospection et de vente approuvées.`}],type:"Coaching en vente",videos:[]}},{slug:"grof",acf:{title:"Grof",localisation:"",project_number:"01",title_preview:{line_1:"Grof",line_2:""},primary:{url:"/projets/grof/cover.webp",alt:"Grof — couverture du projet"},slides:[{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1920,h_1280,c_fill/sample.jpg",alt:"Grof — photo 1 (temporaire)"},format:"horizontal"},{image:{url:"https://res.cloudinary.com/demo/image/upload/w_1280,h_1920,c_fill/sample.jpg",alt:"Grof — photo 2 (temporaire)"},format:"vertical"}],context:[{title:"Contexte",body:"Grof est une agence d'accompagnement commercial pour les entreprises de services et les fondateurs de PME. Elle aide ses clients à structurer leur prospection, améliorer leur performance commerciale pour accélérer leur croissance, avec un enjeu de mise en valeur des bonnes méthodes de vente et l'exécution efficace."}],type:"Coaching en vente",videos:["https://www.instagram.com/p/DYjZUIdib3b/","https://www.instagram.com/p/Daf3AGXFwlN/","https://www.instagram.com/reel/DYl-PPDEvTE/","https://www.instagram.com/reel/DY2TvT2DfvC/","https://www.instagram.com/reel/DZcDDfSgjrE/","https://www.instagram.com/reel/DZKBjywk5--/","https://www.instagram.com/reel/DX63GFtjrmi/","https://www.instagram.com/reel/DaCqJJ2ATp7/","https://www.instagram.com/reel/DaigEgHjGk1/"]}},{slug:"grof-cafe",acf:{title:"Grof Café",localisation:"",project_number:"13",title_preview:{line_1:"Grof",line_2:"Café"},primary:{url:"/projets/grof-cafe/cover.webp",alt:"Grof Café — couverture du projet"},slides:[{image:{url:"/projets/grof-cafe/slide-1.webp",alt:"Grof Café — photo 1"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-2.webp",alt:"Grof Café — photo 2"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-3.webp",alt:"Grof Café — photo 3"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-4.webp",alt:"Grof Café — photo 4"},format:"vertical"},{image:{url:"/projets/grof-cafe/slide-5.webp",alt:"Grof Café — photo 5"},format:"vertical"},{image:{url:"/projets/grof-cafe/slide-6.webp",alt:"Grof Café — photo 6"},format:"vertical"},{image:{url:"/projets/grof-cafe/slide-7.webp",alt:"Grof Café — photo 7"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-8.webp",alt:"Grof Café — photo 8"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-9.webp",alt:"Grof Café — photo 9"},format:"vertical"},{image:{url:"/projets/grof-cafe/slide-10.webp",alt:"Grof Café — photo 10"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-11.webp",alt:"Grof Café — photo 11"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-12.webp",alt:"Grof Café — photo 12"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-13.webp",alt:"Grof Café — photo 13"},format:"vertical"},{image:{url:"/projets/grof-cafe/slide-14.webp",alt:"Grof Café — photo 14"},format:"horizontal"},{image:{url:"/projets/grof-cafe/slide-15.webp",alt:"Grof Café — photo 15"},format:"vertical"}],context:[{title:"Contexte",body:"Coffee shop du Sentier (Paris 2e) pensé pour les pros : un lieu pour travailler, pitcher et closer entre deux rendez-vous. Café de spécialité, menu resserré et service rapide, dans une salle faite pour avancer."}],type:"Café",videos:[]}},{slug:"arkeos-club",acf:{title:"Arkeos Club",localisation:"",project_number:"14",title_preview:{line_1:"Arkeos",line_2:"Club"},primary:{url:"/projets/arkeos-club/cover.webp",alt:"Arkeos Club — couverture du projet"},slides:[{image:{url:"/projets/arkeos-club/slide-1.webp",alt:"Arkeos Club — photo 1"},format:"horizontal"},{image:{url:"/projets/arkeos-club/slide-2.webp",alt:"Arkeos Club — photo 2"},format:"horizontal"},{image:{url:"/projets/arkeos-club/slide-3.webp",alt:"Arkeos Club — photo 3"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-4.webp",alt:"Arkeos Club — photo 4"},format:"horizontal"},{image:{url:"/projets/arkeos-club/slide-5.webp",alt:"Arkeos Club — photo 5"},format:"horizontal"},{image:{url:"/projets/arkeos-club/slide-6.webp",alt:"Arkeos Club — photo 6"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-7.webp",alt:"Arkeos Club — photo 7"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-8.webp",alt:"Arkeos Club — photo 8"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-9.webp",alt:"Arkeos Club — photo 9"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-10.webp",alt:"Arkeos Club — photo 10"},format:"horizontal"},{image:{url:"/projets/arkeos-club/slide-11.webp",alt:"Arkeos Club — photo 11"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-12.webp",alt:"Arkeos Club — photo 12"},format:"vertical"},{image:{url:"/projets/arkeos-club/slide-13.webp",alt:"Arkeos Club — photo 13"},format:"horizontal"},{image:{url:"/projets/arkeos-club/slide-14.webp",alt:"Arkeos Club — photo 14"},format:"horizontal"}],context:[{title:"Contexte",body:"Club d'affaires parisien qui réunit une communauté de jeunes investisseurs autour de l'immobilier. Conférences, ateliers et rencontres pour échanger, se former et développer sa culture financière."}],type:"Club d'affaires",videos:[]}}],AI=[{slug:"nom-projet-perso",acf:{title:"Nom du projet perso",localisation:"Paris",project_number:"01",title_preview:{line_1:"Nom du",line_2:"Projet"},primary:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/photo-principale.jpg",alt:"Description"},slides:[{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/photo-1.jpg",alt:"Description"},format:"horizontal"}],video_url:null}}],CI={email:"contact.leo.crouzille@gmail.com",instagram_link:"https://www.instagram.com/_.l.leo/",linkedin_link:"https://www.linkedin.com/in/léo-crouzille/",youtube_link:"",contact_slider_image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/photo-contact.jpg",alt:"Photo contact"}},RI={acf:CI},PI={page_title:"Léo Crouzille",page_subtitle_1:"Photographe",page_subtitle_2:"Indépendant",page_subtitle_3:"Portfolio",page_paragraph:"Photographe et vidéaste indépendant.",page_paragraph_2:"Je mets en images les entreprises, startups et artisans, leurs équipes, leurs lieux, leur savoir-faire.",home_slider:[{image:{url:"/home/bnf.webp",alt:"Bibliothèque nationale de France, Paris"}},{image:{url:"/home/biarritz.webp",alt:"Biarritz"}},{image:{url:"/home/helsinki.webp",alt:"Helsinki"}}]},LI={acf:PI},DI={page_title:"Léo Crouzille",page_subtitle_1:"À Propos",page_subtitle_2:"Photographe",page_subtitle_3:"Portfolio",page_headline:{line_1:"Ligne 1",line_2:"Ligne 2",line_3:"Ligne 3"},page_paragraph_1:"Paragraphe de présentation 1.",page_paragraph_2:"Paragraphe de présentation 2.",about_slider:{about_slider_1:{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/about-1.jpg",alt:"Photo about"}}}},II={acf:DI},UI={page_title:"Léo Crouzille",page_subtitle_1:"Crédits",page_subtitle_2:"Mentions",page_subtitle_3:"Portfolio",page_credit_1:{title:"Conception & Développement",text:"Mickael Laval"},page_credit_2:{title:"Contenu photos/vidéos",text:"Léo Crouzille"},page_credit_3:{title:"Typographie",text_1:"Switzer Variable",url_1:"https://www.fontshare.com/fonts/switzer",text_2:"Fontshare",url_2:"https://www.fontshare.com"},credits_slider:{credits_slider_1:{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/credits-1.jpg",alt:"Photo credits"}}}},NI={acf:UI},OI={page_title:"Léo Crouzille",page_subtitle_1:"Mentions",page_subtitle_2:"Légales",page_subtitle_3:"Portfolio",page_mention_1:{title:"Éditeur",text_line_1:"Léo Crouzille",text_line_2:"contact.leo.crouzille@gmail.com",text_line_3:"",text_line_4:"",text_line_5:""},page_mention_2:{title:"Hébergement",text_line_1:"Vercel Inc.",text_line_2:"440 N Barranca Ave #4133",text_line_3:"Covina, CA 91723",text_line_4:"",text_line_5:""},page_mention_3:{title:"Conception / Réalisation",text_line_1:"Mickael Laval",text_line_2:"",text_line_3:"",text_line_4:"",text_line_5:""},mentions_slider:{mentions_slider_1:{image:{url:"https://res.cloudinary.com/TON-CLOUD/image/upload/mentions-1.jpg",alt:"Photo mentions"}}}},FI={acf:OI},kI=Re("div",{class:"page__title__wrapper",style:{visibility:"hidden",position:"fixed",left:"20px",top:"70px","font-weight":"200"}},[Re("span",{class:"page__title__primary loading__count reveal-loading",style:{visibility:"hidden","padding-right":"20px"}},"0%"),Re("span",{class:"page__title__secondary reveal-loading",style:{visibility:"hidden","padding-right":"20px","text-transform":"uppercase"}},"Chargement")],-1),BI=[kI],zI={class:"nav__project__wrapper"},HI={id:"gl"},GI={__name:"app",setup(n){const e=Tr(),t=bn("settings"),i=bn("home"),r=bn("about"),s=bn("credits"),o=bn("projects"),a=bn("projets-perso"),l=bn("mentions"),c=bn("gl"),u=At(null),f=At(null),h=At(null),d=At(null),g=At(!0);At(0);const _=At(null);iC(()=>{o.value=wI,a.value=AI,t.value=RI,i.value=LI,r.value=II,s.value=NI,l.value=FI},"$E3KxD8SGyR");function m(){es(".reveal-header",!1),Ze.to(".link-line",{x:0,ease:"expo.inOut",duration:1.2,delay:1,stagger:.1,onComplete:()=>{ZT()}}),(e.name=="index"||e.name=="about"||e.name=="credits"||e.name=="mentions"||e.name=="contact")&&(KT(),Ze.fromTo(".svg__mail",{y:100},{y:0,duration:1.5,delay:.1,ease:"expo.inOut"}))}function p(){if(g.value){try{m()}catch(x){console.error("firstUIReveal:",x)}_.value?Ze.to(_.value,{opacity:0,duration:.5,ease:"expo.inOut",onComplete:()=>{g.value=!1}}):g.value=!1}}return Hi(async()=>{try{c.value=new qh(u.value,f.value,h.value,d.value)}catch(x){console.error(x)}await Er();try{es(".reveal-loading",!1)}catch{}setTimeout(()=>{bI(document.querySelector(".loading__count"),0,100,1300,()=>{try{es(".reveal-loading",!0)}catch{}p()})},400),setTimeout(p,3500)}),(x,v)=>{const S=Y1,b=eA,E=nA,T=aA,L=nC;return Ke(),dt(Xt,null,[ht(g)?(Ke(),dt("div",{key:0,id:"loading-screen",ref_key:"loadingScreen",ref:_,class:"page__title__wrapper",style:{position:"fixed",left:"0",top:"0",height:"100vh",width:"100vw","z-index":"1000","background-color":"rgb(31, 31, 31)"}},BI,512)):On("",!0),Re("div",{id:"container",ref_key:"appContainer",ref:f},[qe(S,{social_1:ht(t).acf.instagram_link,social_2:ht(t).acf.linkedin_link,social_3:ht(t).acf.youtube_link},null,8,["social_1","social_2","social_3"]),qe(b),qe(E),Re("nav",zI,[Re("ul",null,[Re("li",null,[qe(T,{link:"/photos",text:"Photos",spanClass:"reveal-nav-project category-link"})]),Re("li",null,[qe(T,{link:"/videos",text:"Vidéos",spanClass:"reveal-nav-project category-link"})]),Re("li",null,[qe(T,{link:"/contact",text:"Contact",spanClass:"reveal-nav-project category-link"})])])]),qe(L),Re("div",{id:"overlay",ref_key:"appOverlay",ref:h},null,512),Re("div",{id:"menuOverlay",ref_key:"menuOverlay",ref:d},null,512),Re("section",HI,[Re("canvas",{ref_key:"canvas",ref:u},null,512)])],512)],64)}}},VI={id:"errorContent"},WI={id:"pageTitle"},jI={class:"error-button"},XI={__name:"error",setup(n){const e=Ln();function t(){es(".reveal",!0),Ze.to("#errorContent",{opacity:0,duration:1,ease:"power2.inOut"}),Ze.to(".error-button",{height:"-10px",duration:.3,ease:"power2.inOut"}),setTimeout(()=>{e.push("/")},1e3)}return Hi(()=>{es(".reveal",!1)}),(i,r)=>{const s=R0,o=A0;return Ke(),dt("main",VI,[Re("div",WI,[qe(s,{pageTitle:"Error 404",subtitleOne:"Page",subtitleTwo:"Introuvable"})]),Re("div",jI,[qe(o,{onClick:t,text:"Accueil",spanClass:"reveal button-link "})])])}}},qI=mc(XI,[["__scopeId","data-v-1fcf34a8"]]),f_={__name:"nuxt-root",setup(n){const e=()=>null,t=st(),i=t.deferHydration(),r=!1;Vs(lc,Tr()),t.hooks.callHookWith(a=>a.map(l=>l()),"vue:setup");const s=cc();rg((a,l,c)=>{if(t.hooks.callHook("vue:error",a,l,c).catch(u=>console.error("[nuxt] Error in `vue:error` hook",u)),ub(a)&&(a.fatal||a.unhandled))return t.runWithContext(()=>Is(a)),!1});const o=!1;return(a,l)=>(Ke(),rr(K_,{onResolve:ht(i)},{default:pa(()=>[ht(s)?(Ke(),rr(ht(qI),{key:0,error:ht(s)},null,8,["error"])):ht(o)?(Ke(),rr(ht(e),{key:1,context:ht(o)},null,8,["context"])):ht(r)?(Ke(),rr(xy(ht(r)),{key:2})):(Ke(),rr(ht(GI),{key:3}))]),_:1},8,["onResolve"]))}};let h_;{let n;h_=async function(){var o,a;if(n)return n;const i=!!((o=window.__NUXT__)!=null&&o.serverRendered||((a=document.getElementById("__NUXT_DATA__"))==null?void 0:a.dataset.ssr)==="true")?YS(f_):$S(f_),r=QM({vueApp:i});async function s(l){await r.callHook("app:error",l),r.payload.error=r.payload.error||l}i.config.errorHandler=s;try{await tE(r,XT)}catch(l){s(l)}try{await r.hooks.callHook("app:created",i),await r.hooks.callHook("app:beforeMount",i),i.mount(vb),await r.hooks.callHook("app:mounted",i),await Er()}catch(l){s(l)}return i.config.errorHandler===s&&(i.config.errorHandler=void 0),i},n=h_().catch(e=>{throw console.error("Error while mounting app:",e),e})}export{ss as A,Ze as B,EI as C,es as D,Rf as E,Xt as F,qh as G,oh as H,j_ as I,X_ as J,nA as K,jA as L,ur as M,ZI as N,Yg as O,d1 as P,nU as Q,iU as R,Mr as S,KI as T,YI as U,Qe as V,R0 as _,bn as a,JE as b,Hi as c,KT as d,tU as e,dt as f,Re as g,qe as h,ht as i,zh as j,HA as k,Ke as l,Hy as m,Er as n,JI as o,On as p,eU as q,At as r,rr as s,nn as t,Tr as u,mc as v,pa as w,Ln as x,St as y,QI as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./about.wuPJUxES.js","./homeToSlider.OQnS2KOm.js","./homeToSlider.GxEtiuH-.css","./index.0Mlvaqm4.js","./index.wnLQebpP.js","./imageLoad.M9IFnH9O.js","./about.kWbu5jPo.css","./contact.5J0mNTDC.js","./contact.HXt8RmGE.css","./credits.LmM-MM2m.js","./credits.GjVRIWSs.css","./index.RBReaNWn.js","./index.E3BaoxOQ.css","./mentions.A_dGPzE5.js","./mentions.VOPMBP86.css","./_uid_.e7ziI-6D.js","./uid.v7YRJhy5.js","./project.pZmgH9hz.js","./_uid_.xvjwSg9f.css","./photos.jZmgP-aG.js","./CrossClose.mRvyxjm3.js","./CrossClose.x_HO5faz.css","./_uid_.tI3hxnW-.js","./_uid_.OOG9gFE9.css","./_uid_.xkI1xbsi.js","./_uid_.G2iYM0oT.css","./videos.xtz6wMJn.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
