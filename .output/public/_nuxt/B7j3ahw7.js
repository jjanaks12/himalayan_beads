import{_ as b}from"./OFHl7TvF.js";import{_ as g}from"./BwAtOiEe.js";import{F as i,E as _,a as h}from"./CA_3KXji.js";import{l as v}from"./BhQI5_Jo.js";import{e as w,u as x,f as y,r as k,g as S,o as B,c as E,a as o,b as a,w as c,h as t,n as N,d as m}from"./DT-9z51a.js";import"./B4Jnn1uA.js";const C={class:"account__section"},F={class:"account__body"},L={class:"form__group"},U={class:"form__group"},V={class:"text--right"},q={class:"account__meta"},T=w({__name:"login",setup(R){const n=x(),r=y(),e=k(!1),{signIn:u}=S(),d=l=>{e.value=!0,u("credentials",{...l,redirect:!1,callbackUrl:"/dashboard"}).then(({ok:s})=>{s&&(r.query.callbackUrl?n.push(r.query.callbackUrl):n.push("/dashboard"))}).finally(()=>{e.value=!1})};return(l,s)=>{const p=b,f=g;return B(),E("section",C,[o("div",F,[a(p),a(t(h),{class:"account__form",id:"login-form",onSubmit:d,validationSchema:t(v)},{default:c(()=>[s[2]||(s[2]=o("div",{class:"account__form__text"},[o("h1",{class:"h2"},"Login"),o("p",null,"Welcome back!!")],-1)),o("div",L,[s[0]||(s[0]=o("label",{for:"lf__email"},"Email",-1)),a(t(i),{type:"email",name:"email",id:"lf__email"}),a(t(_),{class:"input--error",name:"email"})]),o("div",U,[s[1]||(s[1]=o("label",{for:"lf__password"},"Password",-1)),a(t(i),{type:"password",name:"password",id:"lf__password"}),a(t(_),{class:"input--error",name:"password"})]),o("div",V,[o("button",{type:"submit",class:N({"btn btn__primary":!0,loading:t(e)})},"Sign in",2)])]),_:1},8,["validationSchema"]),o("div",q,[o("p",null,[s[4]||(s[4]=m("Has no account? ")),a(f,{to:"/register"},{default:c(()=>s[3]||(s[3]=[m("signup")])),_:1})])])])])}}});export{T as default};
//# sourceMappingURL=B7j3ahw7.js.map
