import{f as _}from"./Dg8VEt95.js";import{m as h,r as p,e as f,s as m,p as g,o as l,c as r,a as t,F as b,l as y,h as i,t as s}from"./DYYBa1ra.js";import{u as A}from"./DyWVWhbP.js";const c=h("order",()=>{const n=p([]);return{list:n,fetch:async()=>{const d=await $fetch("/api/order");n.value=d}}}),O={class:"datatable__section"},x={class:"datatable__body"},v={class:"d-block"},B={class:"text--right"},S={class:"badge badge--info"},F=f({__name:"myOrder",setup(n){A({title:"My Order :: Himalayan Beads"});const{list:o}=m(c()),{fetch:d}=c();return g(async()=>{await d()}),(k,a)=>(l(),r("section",O,[a[1]||(a[1]=t("header",{class:"datatable__header"},[t("div",{class:"datatable__header__holder"},[t("h1",null,"Order")]),t("div",{class:"datatable__header__action"})],-1)),t("div",x,[t("table",null,[a[0]||(a[0]=t("thead",null,[t("tr",null,[t("th"),t("th",{class:"text--left"},"Order"),t("th",null,"Ordered at"),t("th",{class:"text--right"},"Status")])],-1)),t("tbody",null,[(l(!0),r(b,null,y(i(o),(e,u)=>(l(),r("tr",null,[t("td",null,s(u+1),1),t("td",null,[t("address",null,[t("strong",null,s(e.shippingAddress.address),1),t("em",v,s(e.shippingAddress.street)+", "+s(e.shippingAddress.city)+", "+s(e.shippingAddress.zipCode)+", "+s(e.shippingAddress.country.name),1)])]),t("td",null,s(i(_)(e.createdAt)),1),t("td",B,[t("span",S,s(e.status),1)])]))),256))])])])]))}});export{F as default};
//# sourceMappingURL=BhXQ01be.js.map
