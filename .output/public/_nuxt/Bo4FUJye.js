import{e as m,A as n,r as u,B as f,j as p,o as v,k,a as o,q as _,M,n as h,T as w}from"./CSilbV6M.js";import{d as B}from"./CfwLjDUh.js";const T=m({__name:"Modal",props:n({size:{default:"md"}},{show:{required:!0,default:!1},showModifiers:{}}),emits:n(["modal:close"],["update:show"]),setup(r,{emit:i}){const c=i,a=u(),e=f(r,"show"),t=()=>{e.value=!1,c("modal:close")},l=s=>B(()=>{e.value&&(a.value.contains(s.target)||(s.preventDefault(),t()))});return p(e,()=>{e.value?setTimeout(()=>{document.addEventListener("click",l)},500):document.removeEventListener("click",l)}),(s,d)=>(v(),k(w,{to:"body"},[o("section",{class:h({modal:!0,["modal--"+s.size]:!0,"modal--active":e.value})},[o("div",{class:"modal__content",ref_key:"modal",ref:a},[o("a",{href:"#",class:"modal__close",onClick:_(t,["prevent"])},d[0]||(d[0]=[o("span",{class:"icon-add"},null,-1)])),M(s.$slots,"default")],512)],2)]))}});export{T as _};
//# sourceMappingURL=Bo4FUJye.js.map