import{F as i,E as p,a as l}from"./CA_3KXji.js";import{p as _}from"./CLGcQZy5.js";import{e as f,f as h,r as b,v,o as y,k as g,w as S,b as o,h as a,a as e,n as x}from"./DT-9z51a.js";const k={class:"form__group"},w={class:"text--right"},P=f({__name:"form",emits:["update"],setup(B,{emit:m}){const s=h(),u=m,t=b(!1),c=v(()=>s.params.id),d=async r=>{t.value=!0,await $fetch(`/api/product/${s.params.id}/rate`,{method:"POST",body:{...r}}).then(()=>{u("update")}).finally(()=>{t.value=!1})};return(r,n)=>(y(),g(a(l),{"validation-schema":a(_),onSubmit:d,class:"form"},{default:S(({errors:C})=>[o(a(i),{type:"hidden",name:"product_id",value:a(c)},null,8,["value"]),e("div",k,[n[0]||(n[0]=e("label",{for:"prf__amount"},"Amount",-1)),o(a(i),{type:"number",name:"amount",id:"prf__amount"}),o(a(p),{class:"input--error",name:"amount"})]),e("div",w,[e("button",{type:"submit",class:x({"btn btn__primary":!0,loading:a(t)})},"Save",2)])]),_:1},8,["validation-schema"]))}});export{P as _};
//# sourceMappingURL=3abPso_G.js.map
