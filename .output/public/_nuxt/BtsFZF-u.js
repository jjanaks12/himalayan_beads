import{e as h,r,x as g,D as x,o as a,c as m,M as d,h as t,k as c,O as f,n as l,w as v,a as y,T as B}from"./CSilbV6M.js";const _={"xs-phone":"319px",phone:"479px",tablet:"719px",desktop:"991px",widescreen:"1199px",largescreen:"1399px"},w=i=>Object.keys(_).reduce((n,s)=>({...n,[s]:`(min-width: ${_[s]})`}),{})[i],C={class:"dropdown__holder"},M=h({__name:"Dropdown",props:{as:{default:"div"}},setup(i){const o=r(!1),n=r(),s=r(!1),k=()=>{o.value=!o.value},p=e=>{o.value&&(e.preventDefault(),e.stopPropagation(),n.value.contains(e.target)||(o.value=!1))},u=e=>{s.value=e.matches};return g(()=>{document.addEventListener("click",p),matchMedia(w("desktop")).addListener(u),u(matchMedia(w("desktop")))}),x(()=>{document.removeEventListener("click",p)}),(e,D)=>(a(),m("div",{class:l({dropdown:!0,"dropdown--active":t(o)}),ref_key:"dropdown",ref:n},[d(e.$slots,"opener",{clickHandler:k}),t(s)?(a(),m("div",{key:1,class:l({dropdown__menu:!0,"dropdown--active":t(o)})},[(a(),c(f(e.as),{class:"dropdown__holder"},{default:v(()=>[d(e.$slots,"default")]),_:3}))],2)):(a(),c(B,{key:0,to:"body"},[(a(),c(f(e.as),{class:l({dropdown__menu:!0,"dropdown--active":t(o)})},{default:v(()=>[y("div",C,[d(e.$slots,"default")])]),_:3},8,["class"]))]))],2))}});export{M as _};
//# sourceMappingURL=BtsFZF-u.js.map