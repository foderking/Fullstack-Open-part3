(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(14),r=n.n(c),o=n(3),a=n(2),u=n(4),s=n.n(u),i="./api/persons",d={getPersons:function(){return s.a.get(i).then((function(e){return e.data}))},addPerson:function(e){return s.a.post(i,e).then((function(e){return e.data}))},deletePerson:function(e){return s.a.delete("".concat(i,"/").concat(e)).then((function(e){return e.data}))},changePerson:function(e,t){return s.a.put("".concat(i,"/").concat(e),t).then((function(e){return e.data}))}},l=n(0),j=function(e){return Object(l.jsxs)("div",{children:["Filter shown with",Object(l.jsx)("input",{value:e.value,onChange:function(t){return e.search(t.target.value)}})]})},b=function(e){var t=e.data,n=e.submit;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:n,children:[t.map((function(e){return Object(l.jsx)(f,{text:e[0],value:e[1],handler:e[2]},e[0])})),Object(l.jsx)("button",{type:"submit",children:"add"})]})})},f=function(e){return Object(l.jsxs)("div",{children:[e.text,":",Object(l.jsx)("input",{value:e.value,onChange:function(t){return e.handler(t.target.value)}})]})},h=function(e){var t=e.data,n=e.search,c=e.button,r=t.filter((function(e){return n(e)}));return Object(l.jsx)("div",{children:r.map((function(e){return Object(l.jsx)(O,{id:e.id,name:e.name,number:e.number,button:c},e.id)}))})},O=function(e){var t=e.name,n=e.number,c=e.id,r=e.button;return Object(l.jsxs)("div",{children:[t," ",n,Object(l.jsx)("button",{onClick:function(){return r(c,t)},children:"delete"})]})},m=function(e){var t=e.message,n=e.class_;return null===t?null:Object(l.jsx)("div",{className:n,children:t})},x=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),u=Object(o.a)(r,2),s=u[0],i=u[1],f=Object(a.useState)(""),O=Object(o.a)(f,2),x=O[0],p=O[1],v=Object(a.useState)(""),g=Object(o.a)(v,2),w=g[0],P=g[1],C=[["Name",s,i],["Number",x,p]],S=Object(a.useState)(!1),k=Object(o.a)(S,2),N=k[0],y=k[1],D=Object(a.useState)(""),A=Object(o.a)(D,2),E=A[0],F=A[1],J=function(e,t){y(e),F(t),setTimeout((function(){return y(!1)}),4e3)};return Object(a.useEffect)((function(){d.getPersons().then((function(e){return c(e)}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),N?Object(l.jsx)(m,{message:N,class_:E}):Object(l.jsx)(l.Fragment,{}),Object(l.jsx)(j,{value:w,search:P}),Object(l.jsx)("h2",{children:"Add a new"}),Object(l.jsx)(b,{data:C,submit:function(e){e.preventDefault();var t={name:s,number:x};if(n.filter((function(e){return e.name===s})).length){if(window.confirm("".concat(s," is already added to Phonebook, replace the old number with a new one?"))){var r=n.find((function(e){return e.name===s})).id;d.changePerson(r,t).then((function(e){c(n.map((function(t){return t.id===r?e:t}))),J("Updated ".concat(s),"success")})).catch((function(e){J("".concat(e,": Could not update ").concat(s),"error"),console.log(e.response.data)}))}}else d.addPerson(t).then((function(e){console.log("POST:",e),c(n.concat(e)),J("Added ".concat(s),"success")})).catch((function(e){console.log(e.response.data),J("".concat(e,": Could not add ").concat(s),"error")}))}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(h,{data:n,search:function(e){return e.name.toLowerCase().startsWith(w.toLowerCase())},button:function(e,t){window.confirm("Delete ".concat(t,"?"))&&(console.log("id ".concat(e," deleted")),d.deletePerson(e).then((function(e){d.getPersons().then((function(e){return c(e)}))})).catch((function(e){console.log(e.response.data),J("".concat(e,": Could not delete ").concat(s),"error")}))),J("Deleted ".concat(t),"success")}})]})};n(38);r.a.render(Object(l.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.82d958a1.chunk.js.map