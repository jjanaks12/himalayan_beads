import{_ as x}from"./BcVaiYpa.js";import{_ as y}from"./BOliC9PE.js";import{d as C}from"./CfwLjDUh.js";import{e as g,f as N,r as c,j as i,x as B,o as r,c as u,a as l,h as d,l as _,b as m,d as T,y as $}from"./DT-9z51a.js";const w={class:"content__block"},D={class:"content__block__title"},E={key:0,class:"loading"},M={key:1,class:"text--success"},j=g({__name:"productDescription",props:{product:{}},emits:["update"],setup(f,{emit:v}){const o=f,h=v,b=N(),e=c(""),a=c(!1),s=c(!1);return i(e,async p=>{var n;p!==((n=o.product)==null?void 0:n.description)&&(a.value=!0,await $fetch(`/api/product/${b.params.id}/update_description`,{method:"PUT",body:{description:e.value}}).then(()=>{h("update"),s.value=!0}).finally(()=>{a.value=!1}))}),i(()=>o.product,()=>{o.product&&(e.value=o.product.description)}),i(s,()=>{s.value&&C(()=>{s.value=!1},2e3)}),B(()=>{o.product&&(e.value=o.product.description)}),(p,t)=>{const n=x,k=y;return r(),u("div",w,[l("div",D,[t[2]||(t[2]=l("h2",null,"Product description",-1)),d(a)?(r(),u("span",E)):_("",!0),d(s)?(r(),u("span",M,[m(n,{icon:"mdiContentSaveCheck"}),t[1]||(t[1]=T(" saved "))])):_("",!0)]),m(k,{modelValue:d(e),"onUpdate:modelValue":t[0]||(t[0]=V=>$(e)?e.value=V:null),disabled:d(a)},null,8,["modelValue","disabled"])])}}});export{j as _};
//# sourceMappingURL=Db7BzHbg.js.map
