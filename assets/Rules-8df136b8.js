import{ai as N,aj as S,ak as E,al as y,am as k,an as v,r as f,ao as A,ap as B,T as R,aq as O,ar as T,A as x,z as L,j as o,W as F,B as z,u as b,b as D,g as U,C as Q,e as q}from"./index-53fdbd0e.js";import{a as W,V}from"./index.esm-f21bb81c.js";import{R as j,T as H}from"./TextFilter-7d947fda.js";import{f as G}from"./index-7f657819.js";import{F as J,p as K}from"./Fab-e17c9364.js";import{u as X}from"./useRemainingViewPortHeight-c1f957bd.js";import"./rotate-cw-b2c59e1a.js";import"./debounce-c1ba2006.js";class Y extends N{constructor(e,t){super(),this.client=e,this.setOptions(t),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var t;const r=this.options;this.options=this.client.defaultMutationOptions(e),S(r,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),(t=this.currentMutation)==null||t.setOptions(this.options)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.currentMutation)==null||e.removeObserver(this)}}onMutationUpdate(e){this.updateResult();const t={listeners:!0};e.type==="success"?t.onSuccess=!0:e.type==="error"&&(t.onError=!0),this.notify(t)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(e,t){return this.mutateOptions=t,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:typeof e<"u"?e:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const e=this.currentMutation?this.currentMutation.state:E(),t={...e,isLoading:e.status==="loading",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset};this.currentResult=t}notify(e){y.batch(()=>{if(this.mutateOptions&&this.hasListeners()){if(e.onSuccess){var t,r,n,i;(t=(r=this.mutateOptions).onSuccess)==null||t.call(r,this.currentResult.data,this.currentResult.variables,this.currentResult.context),(n=(i=this.mutateOptions).onSettled)==null||n.call(i,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context)}else if(e.onError){var a,l,u,c;(a=(l=this.mutateOptions).onError)==null||a.call(l,this.currentResult.error,this.currentResult.variables,this.currentResult.context),(u=(c=this.mutateOptions).onSettled)==null||u.call(c,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}}e.listeners&&this.listeners.forEach(({listener:m})=>{m(this.currentResult)})})}}function _(s,e,t){const r=k(s,e,t),n=v({context:r.context}),[i]=f.useState(()=>new Y(n,r));f.useEffect(()=>{i.setOptions(r)},[i,r]);const a=A(f.useCallback(u=>i.subscribe(y.batchCalls(u)),[i]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),l=f.useCallback((u,c)=>{i.mutate(u,c).catch(Z)},[i]);if(a.error&&B(i.options.useErrorBoundary,[a.error]))throw a.error;return{...a,mutate:l,mutateAsync:a.mutate}}function Z(){}function $(s){const e=s.providers,t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const i=t[n];r[i]={...e[i],idx:n}}return{byName:r,names:t}}async function ee(s,e){const{url:t,init:r}=R(e);let n={providers:{}};try{const i=await fetch(t+s,r);i.ok&&(n=await i.json())}catch(i){console.log("failed to GET /providers/rules",i)}return $(n)}async function P({name:s,apiConfig:e}){const{url:t,init:r}=R(e);try{return(await fetch(t+`/providers/rules/${s}`,{method:"PUT",...r})).ok}catch(n){return console.log("failed to PUT /providers/rules/:name",n),!1}}async function te({names:s,apiConfig:e}){for(let t=0;t<s.length;t++)await P({name:s[t],apiConfig:e})}var se=function(s,e,t,r,n,i,a,l){if(!s){var u;if(e===void 0)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[t,r,n,i,a,l],m=0;u=new Error(e.replace(/%s/g,function(){return c[m++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}},re=se;const ne=O(re);function ie(s){return ne(s.rules&&s.rules.length>=0,"there is no valid rules list in the rules API response"),s.rules.map((e,t)=>({...e,id:t}))}async function oe(s,e){let t={rules:[]};try{const{url:r,init:n}=R(e),i=await fetch(r+s,n);i.ok&&(t=await i.json())}catch(r){console.log("failed to fetch rules",r)}return ie(t)}const C=T("");function ae(s,e){const t=v(),{mutate:r,isLoading:n}=_(P,{onSuccess:()=>{t.invalidateQueries(["/providers/rules"])}});return[a=>{a.preventDefault(),r({name:s,apiConfig:e})},n]}function ue(s){const e=v(),{data:t}=w(s),{mutate:r,isLoading:n}=_(te,{onSuccess:()=>{e.invalidateQueries(["/providers/rules"])}});return[a=>{a.preventDefault(),r({names:t.names,apiConfig:s})},n]}function w(s){return x(["/providers/rules",s],()=>ee("/providers/rules",s))}function le(s){const{data:e,isFetching:t}=x(["/rules",s],()=>oe("/rules",s)),{data:r}=w(s),[n]=L(C);if(n==="")return{rules:e,provider:r,isFetching:t};{const i=n.toLowerCase();return{rules:e.filter(a=>a.payload.toLowerCase().indexOf(i)>=0),isFetching:t,provider:{byName:r.byName,names:r.names.filter(a=>a.toLowerCase().indexOf(i)>=0)}}}}const ce="_RuleProviderItem_12aid_1",de="_left_12aid_7",he="_middle_12aid_14",fe="_gray_12aid_21",me="_action_12aid_25",pe="_refreshBtn_12aid_32",d={RuleProviderItem:ce,left:de,middle:he,gray:fe,action:me,refreshBtn:pe};function ve({idx:s,name:e,vehicleType:t,behavior:r,updatedAt:n,ruleCount:i,apiConfig:a}){const[l,u]=ae(e,a),c=G(new Date(n),new Date);return o.jsxs("div",{className:d.RuleProviderItem,children:[o.jsx("span",{className:d.left,children:s}),o.jsxs("div",{className:d.middle,children:[o.jsx(F,{name:e,type:`${t} / ${r}`}),o.jsx("div",{className:d.gray,children:i<2?`${i} rule`:`${i} rules`}),o.jsxs("div",{className:d.action,children:[o.jsxs(z,{onClick:l,disabled:u,className:d.refreshBtn,children:[o.jsx(j,{isRotating:u,size:13}),o.jsx("span",{className:"visually-hidden",children:"Refresh"})]}),o.jsxs("small",{className:d.gray,children:["Updated ",c," ago"]})]})]})]})}function Re({apiConfig:s}){const[e,t]=ue(s),{t:r}=b();return o.jsx(J,{icon:o.jsx(j,{isRotating:t}),text:r("update_all_rule_provider"),style:K,onClick:e})}const ge="_rule_1kxgd_1",ye="_left_1kxgd_12",xe="_a_1kxgd_19",be="_b_1kxgd_26",je="_type_1kxgd_37",h={rule:ge,left:ye,a:xe,b:be,type:je},p={_default:"#59caf9",DIRECT:"#f5bc41",REJECT:"#cb3166"};function _e({proxy:s}){let e=p._default;return p[s]&&(e=p[s]),{color:e}}function Pe({type:s,payload:e,proxy:t,id:r}){const n=_e({proxy:t});return o.jsxs("div",{className:h.rule,children:[o.jsx("div",{className:h.left,children:r}),o.jsxs("div",{children:[o.jsx("div",{className:h.b,children:e}),o.jsxs("div",{className:h.a,children:[o.jsx("div",{className:h.type,children:s}),o.jsx("div",{style:n,children:t})]})]})]})}const Ce="_header_n1m95_1",we="_RuleProviderItemWrapper_n1m95_17",M={header:Ce,RuleProviderItemWrapper:we},{memo:Me}=q,g=30;function Ie(s,{rules:e,provider:t}){const r=t.names.length;return s<r?t.names[s]:e[s-r].id}function Ne({provider:s}){return function(t){const r=s.names.length;return t<r?110:80}}const I=Me(({index:s,style:e,data:t})=>{const{rules:r,provider:n,apiConfig:i}=t,a=n.names.length;if(s<a){const u=n.names[s],c=n.byName[u];return o.jsx("div",{style:e,className:M.RuleProviderItemWrapper,children:o.jsx(ve,{apiConfig:i,...c})})}const l=r[s-a];return o.jsx("div",{style:e,children:o.jsx(Pe,{...l})})},W);I.displayName="MemoRow";const Se=s=>({apiConfig:U(s)}),De=D(Se)(Ee);function Ee({apiConfig:s}){const[e,t]=X(),{rules:r,provider:n}=le(s),i=Ne({provider:n}),{t:a}=b();return o.jsxs("div",{children:[o.jsxs("div",{className:M.header,children:[o.jsx(Q,{title:a("Rules")}),o.jsx(H,{placeholder:"Filter",textAtom:C})]}),o.jsx("div",{ref:e,style:{paddingBottom:g},children:o.jsx(V,{height:t-g,width:"100%",itemCount:r.length+n.names.length,itemSize:i,itemData:{rules:r,provider:n,apiConfig:s},itemKey:Ie,children:I})}),n&&n.names&&n.names.length>0?o.jsx(Re,{apiConfig:s}):null]})}export{De as default};