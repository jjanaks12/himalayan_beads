import{_ as p}from"./EnSD2S2e.js";import{_ as x}from"./BIFzPT6V.js";import{f as b}from"./Dg8VEt95.js";import{i as g}from"./Q5hlEJEC.js";import{m as v,r as y,e as k,s as B,p as w,o as a,c as n,a as t,F as N,l as U,h as c,t as o,B as d,b as C,w as V,d as L,j as M}from"./DYYBa1ra.js";import{u as S}from"./DyWVWhbP.js";import".prisma/client/index-browser";g.Prisma.validator()({include:{image:!0,role:!0}});const _=v("user",()=>{const r=y([]);return{userList:r,fetchUser:()=>new Promise(async(i,m)=>{$fetch("/api/user",{method:"GET"}).then(s=>{s.status=="success"&&(r.value=s.data)})})}}),A={class:"datatable__section"},E={class:"datatable__body"},T={class:"sn"},j={class:"wrap"},D={key:0,class:"image"},F=["src","alt"],H={class:"holder"},P={class:"subtitle"},R={class:"badge badge--info"},G={class:"text--center"},I={class:"text--center"},Q=k({__name:"index",setup(r){S({title:"Users :: Himalayan Beads"});const{userList:l}=B(_()),{fetchUser:i}=_();return w(async()=>{await i()}),(m,s)=>{const h=p,u=x;return a(),n("section",A,[s[2]||(s[2]=t("header",{class:"datatable__header"},[t("div",{class:"datatable__header__holder"},[t("h1",null,"Users")])],-1)),t("div",E,[t("table",null,[s[1]||(s[1]=t("thead",null,[t("tr",null,[t("th"),t("th",{class:"text--left"},"Name"),t("th",null,"Created at"),t("th",null,"Email verified"),t("th",{class:"text--right"},"Action")])],-1)),t("tbody",null,[(a(!0),n(N,null,U(c(l),(e,f)=>(a(),n("tr",null,[t("td",T,o(f+1),1),t("td",null,[t("div",j,[e.image?(a(),n("figure",D,[t("img",{src:e==null?void 0:e.image.url,alt:e.name},null,8,F)])):d("",!0),t("div",H,[C(h,{to:"/dashboard/user/"+e.id,class:"title"},{default:V(()=>[L(o(e.name),1)]),_:2},1032,["to"]),t("em",P,o(e.email),1),t("span",R,o(e.role.name),1)])])]),t("td",G,o(c(b)(e.createdAt)),1),t("td",I,[e.emailVerified!=null?(a(),M(u,{key:0,preserveAspectRatio:"xMidYMid meet",icon:"mdiShieldCheck",class:"text--success"})):d("",!0)]),s[0]||(s[0]=t("td",{class:"text--right"},[t("a",{href:"#",class:"btn btn--xs btn__danger"},"change role")],-1))]))),256))])])])])}}});export{Q as default};
//# sourceMappingURL=DoPZCR_N.js.map
