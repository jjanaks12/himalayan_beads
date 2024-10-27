import{r as b,e as B,s as U,j as R,o,k as N,w as F,h as n,l as q,a as e,b as v,m as M,c as d,p as E,F as D,n as I,q as y,t as h,v as T,x as j,d as w,y as V}from"./CwxkVYrh.js";import{f as P}from"./CCEua1kr.js";import{u as S,_ as G,a as J}from"./C42XPPgq.js";import{c as K,b as z,F as A,E as L,a as O}from"./DkRoiBUv.js";import{u as Q}from"./Cl9i07Bu.js";import".prisma/client/index-browser";const W=K({name:z().required().label("Name"),description:z().label("Description")});function X(){const $=b([]),k=l=>new Promise((p,m)=>{const i=new FileReader;i.onload=c=>{var f;$.value.push({...l,name:l.name,size:l.size,type:l.type,lastModified:l.lastModified,content:(f=c.target)==null?void 0:f.result}),p()},i.onerror=c=>{m(c)},i.readAsDataURL(l)});return{files:$,handleFileInput:async l=>{$.value.splice(0);const p=[];for(const m of l.target.files)p.push(k(m));await Promise.all(p)}}}const Y={class:"form__group"},Z={class:"form__group"},ee={class:"form__group"},te={class:"custom__file"},se={class:"custom__file__text"},ne={class:"custom__file__list"},ae={class:"custom__file__list__item"},le=["src","alt"],oe=["onClick"],ie={key:1,class:"custom__file__list__item"},re={class:"form__group"},de=["value"],ue={class:"text--right"},ce=B({__name:"form",props:{category:{}},emits:["update-form"],setup($,{emit:k}){const _=$,l=k,{saveCategory:p}=S(),{categoryList:m}=U(S()),{files:i,handleFileInput:c}=X(),f=b(),g=b(!1),C=(t,{resetForm:a})=>{g.value=!0,p({...t,files:i.value}).then(()=>{l("update-form"),a()}).finally(()=>{g.value=!1})},s=()=>{var t,a,u,r,x;(t=f.value)==null||t.resetForm(),_.category&&((a=f.value)==null||a.setFieldValue("id",_.category.id),(u=f.value)==null||u.setFieldValue("name",_.category.name),(r=f.value)==null||r.setFieldValue("description",_.category.description||""),(x=f.value)==null||x.setFieldValue("parent_category",_.category.parent_id||""),i.value=[])};return R(_,()=>{s()},{deep:!0,immediate:!0}),(t,a)=>(o(),N(n(O),{class:"category__form",action:"#","validation-schema":n(W),onSubmit:C,ref_key:"form",ref:f},{default:F(()=>[_.category?(o(),N(n(A),{key:0,type:"hidden",name:"id"})):q("",!0),e("div",Y,[a[1]||(a[1]=e("label",{for:"cf__name"},"Name",-1)),v(n(A),{type:"text",name:"name",id:"cf__name",autocomplete:"name"}),v(n(L),{class:"input--error",name:"name"})]),e("div",Z,[a[2]||(a[2]=e("label",{for:"cf__description"},"Description",-1)),v(n(A),{name:"description"},{default:F(({field:u})=>[e("textarea",M(u,{id:"cf__description"}),null,16)]),_:1}),v(n(L),{class:"input--error",name:"description"})]),e("div",ee,[e("label",te,[e("input",{type:"file",onChange:a[0]||(a[0]=(...u)=>n(c)&&n(c)(...u)),name:"file",multiple:"",accept:"image/*"},null,32),e("div",se,[e("ol",ne,[n(i).length>0?(o(!0),d(D,{key:0},E(n(i),(u,r)=>(o(),d("li",ae,[e("img",{src:u.content,alt:u.name},null,8,le),e("a",{href:"#",onClick:y(x=>n(i).splice(r,1),["prevent"])},a[3]||(a[3]=[e("span",{class:"icon-add"},null,-1)]),8,oe)]))),256)):(o(),d("span",ie,a[4]||(a[4]=[e("strong",null,"Select a file",-1)])))])])])]),e("div",re,[a[6]||(a[6]=e("label",{for:"cf__parent_category"},"Parent category",-1)),v(n(A),{name:"parent_category"},{default:F(({field:u})=>[e("select",M(u,{id:"cf__parent_category"}),[a[5]||(a[5]=e("option",{value:""},"Select a parent",-1)),(o(!0),d(D,null,E(n(m),r=>(o(),d("option",{value:r.id},h(r.name),9,de))),256))],16)]),_:1}),v(n(L),{class:"input--error",name:"parent_category"})]),e("div",ue,[e("button",{type:"submit",class:I({"btn btn__primary":!0,loading:n(g)})},"Save",2)])]),_:1},8,["validation-schema"]))}}),_e={class:"datatable__section"},pe={class:"datatable__header"},me={class:"datatable__header__action"},fe={class:"datatable__body"},ve={class:"sn"},he={class:"wrap"},be={key:0,class:"image"},ge=["src","alt"],ye={class:"holder"},$e={class:"title"},ke={class:"text--center nowrap"},Ce={class:"text--right nowrap"},xe=["onClick"],we=["onClick"],Fe=["onClick"],De={key:0,class:"icon-caret-d"},Ae={key:1,class:"icon-caret-t"},qe={key:0},Ee={colspan:"4",class:"no--spacing"},Se={class:"subtable"},Ve={class:"sn"},Le={class:"text--center"},Ne={class:"text--right"},Me=["onClick"],Pe=["onClick"],Te=B({__name:"category",setup($){Q({title:"Category :: Himalayan Beads"});const{categoryList:k}=U(S()),{fetchCategory:_}=S(),l=b(!1),p=b(!1),m=b({}),i=b(null),c=b(null),f=()=>{var C;p.value=!0,$fetch(`/api/category/${(C=c.value)==null?void 0:C.id}/`,{method:"DELETE"}).then(()=>{c.value=null,_()}).finally(()=>{p.value=!1})},g=T(()=>c.value!=null);return R(i,()=>{i.value?l.value=!0:l.value=!1}),j(()=>{_()}),(C,s)=>(o(),d("section",_e,[e("header",pe,[s[7]||(s[7]=e("div",{class:"datatable__header__holder"},[e("h1",null,"Product category")],-1)),e("div",me,[e("a",{class:"btn btn__primary",href:"#",onClick:s[0]||(s[0]=y(t=>l.value=!0,["prevent"]))},s[6]||(s[6]=[e("span",{class:"prepend-icon icon-add"},null,-1),w(" Add Category ")]))])]),e("div",fe,[e("table",null,[s[12]||(s[12]=e("thead",null,[e("tr",null,[e("th"),e("th",{class:"text--left"},"Name"),e("th",null,"Created at"),e("th",{class:"text--right"},"Action")])],-1)),e("tbody",null,[(o(!0),d(D,null,E(n(k),(t,a)=>{var u;return o(),d(D,{key:t.id},[e("tr",null,[e("td",ve,h(a+1),1),e("td",null,[e("div",he,[t.image?(o(),d("figure",be,[e("img",{src:((u=t.image)==null?void 0:u.url)||"",alt:t.name},null,8,ge)])):q("",!0),e("div",ye,[e("strong",$e,h(t.name),1)])])]),e("td",ke,h(n(P)(t.createdAt)),1),e("td",Ce,[e("a",{class:"btn btn--xs btn__info",href:"#",onClick:y(r=>i.value=t,["prevent"])},s[8]||(s[8]=[e("span",{class:"prepend-icon icon-edit"},null,-1),w(" Edit ")]),8,xe),e("a",{class:"btn btn--xs btn__danger",href:"#",onClick:y(r=>c.value=t,["prevent"])},s[9]||(s[9]=[e("span",{class:"prepend-icon icon-trash"},null,-1),w(" Delete ")]),8,we),(t==null?void 0:t.predecessor.length)>0?(o(),d("a",{key:0,href:"#",class:"btn btn--xs btn__primary btn--outline",onClick:y(r=>n(m)[t.id]=n(m)[t.id]?!n(m)[t.id]:!0,["prevent"])},[n(m)[t.id]?(o(),d("span",De)):(o(),d("span",Ae))],8,Fe)):q("",!0)])]),(t==null?void 0:t.predecessor.length)>0&&n(m)[t.id]?(o(),d("tr",qe,[e("td",Ee,[e("table",Se,[e("tbody",null,[(o(!0),d(D,null,E(t.predecessor,(r,x)=>(o(),d("tr",null,[e("td",Ve,h(a+1)+"."+h(x+1),1),e("td",Le,h(r.name),1),e("td",null,h(n(P)(r.createdAt)),1),e("td",Ne,[e("a",{class:"btn btn--xs btn__info",href:"#",onClick:y(H=>i.value=r,["prevent"])},s[10]||(s[10]=[e("span",{class:"prepend-icon icon-edit"},null,-1),w(" Edit ")]),8,Me),e("a",{class:"btn btn--xs btn__danger",href:"#",onClick:y(H=>c.value=r,["prevent"])},s[11]||(s[11]=[e("span",{class:"prepend-icon icon-trash"},null,-1),w(" Delete ")]),8,Pe)])]))),256))])])])])):q("",!0)],64)}),128))])])]),v(G,{show:n(l),"onUpdate:show":s[2]||(s[2]=t=>V(l)?l.value=t:null),"onModal:close":s[3]||(s[3]=t=>i.value=null)},{default:F(()=>[v(ce,{category:n(i)||null,onUpdateForm:s[1]||(s[1]=()=>{l.value=!1,n(_)()})},null,8,["category"])]),_:1},8,["show"]),v(J,{title:"Are you sure you want delete?",show:n(g),"onUpdate:show":s[4]||(s[4]=t=>V(g)?g.value=t:null),loading:n(p),"onUpdate:loading":s[5]||(s[5]=t=>V(p)?p.value=t:null),onCancel:()=>{c.value=null},onConfirm:f},{default:F(()=>s[13]||(s[13]=[e("p",null,"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quo, explicabo necessitatibus laboriosam a voluptatem hic ratione eius excepturi doloremque quidem odit eaque blanditiis illo obcaecati. Dicta adipisci accusantium quidem.",-1)])),_:1},8,["show","loading","onCancel"])]))}});export{Te as default};
//# sourceMappingURL=-MVjDnff.js.map
