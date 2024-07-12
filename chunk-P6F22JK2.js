import{a as q,b as J,c as Y}from"./chunk-KQ4YTCVI.js";import{Bb as V,Hb as B,Sb as z,ec as w,fc as $,hc as k,ic as H,qc as L,qd as W,r as F}from"./chunk-ZERJL2RU.js";import{$b as b,Ac as v,Ad as y,Ca as x,Da as R,Hc as C,Ic as S,Mb as E,Na as d,Oa as u,Ob as A,Zb as i,_b as n,dc as M,gc as c,ic as _,pd as I,rc as T,sa as O,sb as l,sc as s,sd as N,tc as P,vd as G,wc as U,xa as m,xc as D,yc as j}from"./chunk-VRKKC5PY.js";var Q=(()=>{let t=class t{constructor(){this.router=m(F),this.rolesSrv=m($),this.permissionsSrv=m(w),this.currentRole="",this.currentPermissions=[],this.permissionsOfRole={ADMIN:["canAdd","canDelete","canEdit","canRead"],MANAGER:["canAdd","canEdit","canRead"],GUEST:["canRead"]}}ngOnInit(){this.currentRole=Object.keys(this.rolesSrv.getRoles())[0],console.log("this.currentRole"),console.log(this.currentRole),this.currentPermissions=Object.keys(this.permissionsSrv.getPermissions())}onPermissionChange(){this.currentPermissions=this.permissionsOfRole[this.currentRole],this.rolesSrv.flushRolesAndPermissions(),this.rolesSrv.addRoleWithPermissions(this.currentRole,this.currentPermissions),console.log("this.currentRole"),console.log(this.currentRole),this.router.navigateByUrl("/dashboard")}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=x({type:t,selectors:[["app-permissions-route-guard"]],standalone:!0,features:[v],decls:20,vars:7,consts:[[3,"ngModelChange","change","ngModel"],["value","ADMIN"],["value","MANAGER"],["value","GUEST"]],template:function(e,o){e&1&&(b(0,"page-header"),i(1,"p"),s(2,` The route will be redirected to dashboard after change permission.
`),n(),i(3,"mat-button-toggle-group",0),j("ngModelChange",function(h){return D(o.currentRole,h)||(o.currentRole=h),h}),c("change",function(){return o.onPermissionChange()}),i(4,"mat-button-toggle",1),s(5,"ADMIN"),n(),i(6,"mat-button-toggle",2),s(7,"MANAGER"),n(),i(8,"mat-button-toggle",3),s(9,"GUEST"),n()(),i(10,"p"),s(11," Your current role: "),i(12,"code"),s(13),C(14,"json"),n()(),i(15,"p"),s(16," Your current permissions: "),i(17,"code"),s(18),C(19,"json"),n()()),e&2&&(l(3),U("ngModel",o.currentRole),l(10),P(S(14,3,o.currentRole)),l(5),P(S(19,5,o.currentPermissions)))},dependencies:[G,z,V,B,Y,q,J,L]});let a=t;return a})();var X=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=R({type:t}),t.\u0275inj=O({imports:[y]});let a=t;return a})();function te(a,t){if(a&1){let p=M();i(0,"li")(1,"span"),s(2),n(),i(3,"div",11)(4,"button",12),c("click",function(){let e=d(p).$implicit,o=_();return u(o.adjustUserPermissions(e,"ADMIN"))}),s(5,"Set Admin"),n(),i(6,"button",13),c("click",function(){let e=d(p).$implicit,o=_();return u(o.adjustUserPermissions(e,"MANAGER"))}),s(7,"Set Manager"),n(),i(8,"button",14),c("click",function(){let e=d(p).$implicit,o=_();return u(o.adjustUserPermissions(e,"GUEST"))}),s(9,"Set Guest"),n()()()}if(a&2){let p=t.$implicit;l(2),P(p.email)}}var Z=(()=>{let t=class t{constructor(){this.permissionsSrv=m(w),this.firebasePermissionsSrv=m(W),this.comparedPermission=["guest"]}ngOnInit(){this.loadUsers()}loadUsers(){this.users$=this.firebasePermissionsSrv.getAllUsers()}getPermissions(){return Object.keys(this.permissionsSrv.getPermissions())}addPermission(){this.permissionsSrv.addPermission("admin",()=>new Promise((r,e)=>{setTimeout(()=>r(!0),2e3)}))}removePermission(){this.permissionsSrv.removePermission("admin")}unAuthorized(){console.log("unAuthorized")}authorized(){console.log("authorizes")}changeToAdmin(){this.comparedPermission=["admin"],console.log(this.comparedPermission)}changeToAnotherPermission(){this.comparedPermission=["awesome"],console.log(this.comparedPermission)}changeToGuest(){this.comparedPermission=["guest"],console.log(this.comparedPermission)}createUser(r,e){let o=this.firebasePermissionsSrv.auth.currentUser;if(o){let g=o.email||"";this.firebasePermissionsSrv.createUser(r,e,g,"1tlcone").subscribe(()=>{console.log("User created successfully."),this.loadUsers()},f=>{console.error("Error creating user 1:",f)})}else console.error("No authenticated user found.")}adjustUserPermissions(r,e){this.firebasePermissionsSrv.adjustUserPermissions(r.uid,e).subscribe(()=>{this.users$=this.firebasePermissionsSrv.getAllUsers()})}adjustUserPermissions2(r,e){console.log({permission:e}),r.permissions.includes(e)?r.permissions=r.permissions.filter(o=>o!==e):r.permissions.push(e),this.firebasePermissionsSrv.setUserPermissions(r.uid,r.permissions).subscribe(()=>{this.loadUsers()})}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=x({type:t,selectors:[["app-permissions-test"]],standalone:!0,features:[v],decls:22,vars:3,consts:[["emailInput",""],["passwordInput",""],[1,"container"],[1,"create-user-section"],[1,"input-group"],["type","email","required",""],["type","password","required",""],[1,"btn-create-user",3,"click"],[1,"list-users-section"],[1,"user-list"],[4,"ngFor","ngForOf"],[1,"btn-group"],[1,"btn-set-admin",3,"click"],[1,"btn-set-manager",3,"click"],[1,"btn-set-guest",3,"click"]],template:function(e,o){if(e&1){let g=M();i(0,"div",2)(1,"div",3)(2,"h2"),s(3,"Create User"),n(),i(4,"div",4)(5,"label"),s(6,"Email:"),n(),b(7,"input",5,0),n(),i(9,"div",4)(10,"label"),s(11,"Password:"),n(),b(12,"input",6,1),n(),i(14,"button",7),c("click",function(){d(g);let f=T(8),ee=T(13);return u(o.createUser(f.value,ee.value))}),s(15,"Create User"),n()(),i(16,"div",8)(17,"h2"),s(18,"List of Users"),n(),i(19,"ul",9),E(20,te,10,1,"li",10),C(21,"async"),n()()()}e&2&&(l(20),A("ngForOf",S(21,1,o.users$)))},dependencies:[X,H,y,I,N],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.create-user-section[_ngcontent-%COMP%], .list-users-section[_ngcontent-%COMP%]{width:80%;padding:16px;margin-bottom:24px;border-radius:8px;box-shadow:0 2px 4px #0000001a}.create-user-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .list-users-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:12px;font-size:20px}.input-group[_ngcontent-%COMP%]{margin-bottom:12px}.input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:4px}.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:8px;border:1px solid #ccc;border-radius:4px}.btn-create-user[_ngcontent-%COMP%], .btn-set-admin[_ngcontent-%COMP%], .btn-set-manager[_ngcontent-%COMP%], .btn-set-guest[_ngcontent-%COMP%]{padding:10px 20px;margin-right:8px;cursor:pointer;background-color:#3f51b5;border:none;border-radius:4px}.btn-group[_ngcontent-%COMP%]{margin-top:8px}.user-list[_ngcontent-%COMP%]{padding:0;list-style:none}.user-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #ccc}.user-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}"]});let a=t;return a})();var Ge=[{path:"route-guard",component:Q,canActivate:[k],data:{permissions:{except:"GUEST",redirectTo:"/dashboard"}}},{path:"test",component:Z,canActivate:[k],data:{permissions:{except:"GUEST",redirectTo:"/dashboard"}}}];export{Ge as routes};
