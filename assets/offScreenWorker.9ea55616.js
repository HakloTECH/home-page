var y=Object.defineProperty;var P=(c,i,r)=>i in c?y(c,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):c[i]=r;var g=(c,i,r)=>(P(c,typeof i!="symbol"?i+"":i,r),r);(function(){"use strict";const c="modulepreload",i={},r="./",w=function(t,a){return t()};class k{constructor(){g(this,"cache",{})}async loadPainter(t,a){if(t in this.cache)return this.cache[t];const{painters:e}=await w(()=>import(t),void 0);if(!e)return{success:!1};let s=!1,d,n;for(n in e){const u=a[n];if(u){d=()=>e[n].init(u),s=!0;break}}const f={success:s,ctxName:n,init:d};return this.cache[t]=f,f}}const v=new k;let l;const p={};let h,m=null;self.onmessage=async o=>{switch(o.data.type){case"init":{const{ctxNames:t}=o.data;l=o.data.canvases;for(let a=t.length;a--;)p[t[a]]=l[a].getContext(t[a]);break}case"load":{const{scriptURL:t}=o.data,{success:a,ctxName:e,init:s}=await v.loadPainter(t,p);if(!a||m===t)return 0;postMessage({type:"paintStart",ctxName:e}),await(h==null?void 0:h()),m=t,h=(await s()).dispose,postMessage({type:"paintEnd"});break}case"resize":{const{width:t,height:a}=o.data;for(let e=l.length;e--;){const s=l[e];if(!s)break;s.width=t,s.height=a}break}}}})();
