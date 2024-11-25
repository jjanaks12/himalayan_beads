import{_ as F}from"./D2NsX_gF.js";import{_ as z}from"./Bo4FUJye.js";import{e as Y,A as V,B as P,o as n,k as O,w as x,a as e,c as i,b as d,l as w,t as h,q as v,d as y,r as p,j as A,h as o,n as b,F as T,p as D,_ as U}from"./CSilbV6M.js";import{_ as G}from"./BtsFZF-u.js";import{u as J}from"./Niu-L1hA.js";import"./CfwLjDUh.js";const K={class:"confirm__dialog"},Q={key:0,class:"icon__holder"},R={class:"text__holder"},W={class:"confirm__dialog__action"},X=Y({__name:"Confirm",props:V({title:{},text:{},icon:{default:"mdiHelpCircle"},confirmText:{default:"Yes"},cancelText:{default:"No"}},{show:{required:!0,default:!1},showModifiers:{}}),emits:V(["confirmed","canceled"],["update:show"]),setup(I,{emit:M}){const r=M,m=P(I,"show"),a=()=>{r("confirmed")},g=()=>{r("canceled"),m.value=!1};return(c,B)=>{const _=F,l=z;return n(),O(l,{show:m.value,"onModal:close":g},{default:x(()=>[e("div",K,[c.icon?(n(),i("div",Q,[d(_,{icon:c.icon,size:"64"},null,8,["icon"])])):w("",!0),e("h2",null,h(c.title),1),e("div",R,[e("p",null,h(c.text),1)]),e("div",W,[e("a",{href:"#",class:"btn btn__primary btn--outline",onClick:v(g,["prevent"])},[d(_,{icon:"mdiClose"}),y(" "+h(c.cancelText),1)]),e("a",{href:"#",class:"btn btn__primary",onClick:v(a,["prevent"])},[d(_,{icon:"mdiCheck"}),y(" "+h(c.confirmText),1)])])])]),_:1},8,["show"])}}}),Z={class:"content__body"},ee={class:"image__section"},te={class:"custom__file"},se={class:"custom__file__list"},oe={class:"custom__file__list__item"},ne=["src","alt"],le=["onClick"],ie={class:"custom__file__list__item custom__file__list__item--last"},ae={class:"holder"},ce={key:1,class:"custom__file__list__item"},_e={class:"image__list"},de=["src"],re={class:"image__action"},ue={key:0,class:"image__action__item"},me=["onClick"],fe=["onClick"],pe=["onClick"],he={key:0},ve=["onClick"],ge={key:0,class:"image__holder"},ke=["src"],Ce=Y({__name:"imageBlock",props:{id:{},images:{}},emits:["update"],setup(I,{emit:M}){const r=I,m=M,{files:a,handleFileInput:g}=J(),c=p(!1),B=p(!1),_=p(null),l=p(null),N=p(!1),f=p({}),q=()=>{c.value=!0,$fetch(`/api/product/${r.id}/images`,{method:"POST",body:{files:a.value,product_id:r.id}}).then(()=>{a.value=[],m("update")}).finally(()=>{c.value=!1})},E=async()=>{l.value&&(f.value[l.value]=!0,await $fetch(`/api/product/${r.id}/images/${l.value}`,{method:"delete"}).then(u=>{u.status=="success"&&m("update")}).finally(()=>{l.value&&(f.value[l.value]=!1,l.value=null)}))},L=async u=>{f.value[u]=!0,await $fetch(`/api/product/${r.id}/images/${u}`,{method:"put"}).then(t=>{t.status=="success"&&m("update")}).finally(()=>{f.value[u]=!1})};return A(_,()=>{B.value=_.value!=null}),A(l,()=>{N.value=l.value!=null}),(u,t)=>{const k=F,j=z,H=X;return n(),i("div",Z,[t[8]||(t[8]=e("div",{class:"content__block__title"},[e("h2",null,"Images")],-1)),e("div",ee,[e("label",te,[e("input",{type:"file",onChange:t[0]||(t[0]=(...s)=>o(g)&&o(g)(...s)),name:"file",multiple:"",accept:"image/*"},null,32),e("div",{class:b({custom__file__text:!0,"custom__file__text--has__files":o(a).length>0})},[e("ol",se,[o(a).length>0?(n(),i(T,{key:0},[(n(!0),i(T,null,D(o(a),(s,$)=>(n(),i("li",oe,[e("img",{src:s.content,alt:s.name},null,8,ne),e("a",{href:"#",onClick:v(C=>o(a).splice($,1),["prevent"])},t[3]||(t[3]=[e("span",{class:"icon-add"},null,-1)]),8,le)]))),256)),e("li",ie,[e("div",ae,[e("span",null,"You have selected "+h(o(a).length)+" image"+h(o(a).length>1?"s":""),1),e("button",{class:b({"btn btn__primary":!0,loading:o(c)}),onClick:q}," save images ",2)])])],64)):(n(),i("li",ce,t[4]||(t[4]=[e("strong",null,"Upload files",-1),e("em",null,"(You can choose multiple images)",-1)])))])],2)]),e("div",_e,[(n(!0),i(T,null,D(u.images,s=>{var $;return n(),i("figure",{class:b({image:!0,"image--featured":s.featured})},[e("img",{src:($=s.images)==null?void 0:$.url,alt:"image description"},null,8,de),e("div",re,[s.featured?(n(),i("span",ue,[d(k,{icon:"mdiStar",class:"featured--icon text--warning"})])):w("",!0),d(G,{as:"ul"},{opener:x(({clickHandler:C})=>[e("a",{href:"#",class:b({"dropdown__opener image__action__item image__action__item--link":!0,loading:o(f)[s.id]}),onClick:v(C,["prevent"])},[o(f)[s.id]?w("",!0):(n(),O(k,{key:0,icon:"mdiDotsVertical",size:"24"}))],10,me)]),default:x(()=>[e("li",null,[e("a",{href:"#",onClick:v(C=>l.value=s.id,["prevent"])},[t[5]||(t[5]=y(" Delete ")),d(k,{icon:"mdiTrashCan"})],8,fe)]),e("li",null,[e("a",{href:"#",onClick:C=>{var S;return _.value=(S=s.images)==null?void 0:S.url}},[t[6]||(t[6]=y(" view ")),d(k,{icon:"mdiEye"})],8,pe)]),s.featured?w("",!0):(n(),i("li",he,[e("a",{href:"#",onClick:v(C=>L(s.id),["prevent"])},[t[7]||(t[7]=y(" Set as featured ")),d(k,{icon:"mdiStarCircleOutline"})],8,ve)]))]),_:2},1024)])],2)}),256))]),d(j,{show:o(B),size:"xl","onModal:close":t[1]||(t[1]=s=>_.value=null)},{default:x(()=>[o(_)?(n(),i("div",ge,[e("img",{src:o(_),alt:"image description"},null,8,ke)])):w("",!0)]),_:1},8,["show"]),d(H,{show:o(N),title:"Are you sure you want to delete?",text:"Once you delete this image you cannot go back.",onConfirmed:E,onCanceled:t[2]||(t[2]=s=>l.value=null),"cancel-text":"No, not now","confirm-text":"Yes, delete it"},null,8,["show"])])])}}}),Me=U(Ce,[["__scopeId","data-v-f139f834"]]);export{Me as default};
//# sourceMappingURL=B0dN-k72.js.map