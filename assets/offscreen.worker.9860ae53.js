var y=Object.defineProperty;var b=(c,s,a)=>s in c?y(c,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[s]=a;var g=(c,s,a)=>(b(c,typeof s!="symbol"?s+"":s,a),a);(function(){"use strict";class c{constructor(){g(this,"cache",{})}async loadPainter(t,e){if(t in this.cache)return this.cache[t];const{painters:n}=await import(t);if(!n)return{success:!1};let i=!1,p,l;for(l in n){const w=e[l];if(w){p=()=>n[l].init(w),i=!0;break}}const u={success:i,ctxName:l,init:p};return this.cache[t]=u,u}}const s=new c;let a;const h={};let o,d=null,f;self.onmessage=async r=>{switch(r.data.type){case"init":{const{ctxNames:t}=r.data;a=r.data.canvases;for(let e=t.length;e--;)h[t[e]]=a[e].getContext(t[e]);break}case"load":{const{scriptURL:t}=r.data;if(d===t)return 0;const{success:e,ctxName:n,init:i}=await s.loadPainter(t,h);if(!e)return 0;d=t,f=async()=>{await(o==null?void 0:o()),o=(await i()).dispose,postMessage({type:"paintEnd",ctxName:n})},postMessage({type:"loaded"});break}case"paintStart":{await f();break}case"resize":{const{width:t,height:e}=r.data;for(let n=a.length;n--;){const i=a[n];!i||(i.width=t,i.height=e)}break}}}})();
