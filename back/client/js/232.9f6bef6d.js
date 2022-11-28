"use strict";(globalThis["webpackChunkauth_frontend"]=globalThis["webpackChunkauth_frontend"]||[]).push([[232],{3232:(t,e,a)=>{a.r(e),a.d(e,{default:()=>W});var o=a(9835);function l(t,e,a,l,n,s){const u=(0,o.up)("log-in-component"),r=(0,o.up)("log-out-component"),c=(0,o.up)("q-card"),i=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(i,{class:"row items-center justify-evenly"},{default:(0,o.w5)((()=>[(0,o.Wm)(c,{rounded:"",class:"my-card relative-position log-in-container bg-primary"},{default:(0,o.w5)((()=>[t.auth?((0,o.wg)(),(0,o.j4)(r,{key:1,title:"Log Out Component",active:""})):((0,o.wg)(),(0,o.j4)(u,{key:0,title:"Log In Component",active:""}))])),_:1})])),_:1})}function n(t,e,a,l,n,s){const u=(0,o.up)("q-card-section"),r=(0,o.up)("q-input"),c=(0,o.up)("q-btn");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(u,{class:"absolute-top text-h6 text-center text-weight-bold text-secondary"},{default:(0,o.w5)((()=>[(0,o.Uk)(" Зарегистрируйтесь или войдите в систему. ")])),_:1}),(0,o.Wm)(u,{class:"inputs absolute-center text-h5"},{default:(0,o.w5)((()=>[(0,o.Wm)(r,{class:"q-ma-sm",modelValue:t.emailValue,"onUpdate:modelValue":e[0]||(e[0]=e=>t.emailValue=e),label:"E-mail"},null,8,["modelValue"]),(0,o.Wm)(r,{class:"q-ma-sm",modelValue:t.passwordValue,"onUpdate:modelValue":e[1]||(e[1]=e=>t.passwordValue=e),label:"Password"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(u,{class:"absolute-bottom"},{default:(0,o.w5)((()=>[(0,o.Wm)(c,{class:"q-ma-sm float-left",color:"secondary",label:"Зарегистрировать нового пользователя",onClick:t.register},null,8,["onClick"]),(0,o.Wm)(c,{class:"q-ma-sm float-right",color:"secondary",label:"Войти",onClick:t.login},null,8,["onClick"])])),_:1})],64)}var s=a(499);const u=(0,o.aZ)({name:"LogInComponent",data(){return{auth:"",emailValue:(0,s.iH)(""),passwordValue:(0,s.iH)("")}},methods:{register(){this.$axios.post("/register",{email:this.emailValue,password:this.passwordValue}).then((t=>{localStorage.setItem("AuthToken",t.data),this.$router.push("/about-me")})).catch((t=>{400===t.response.status&&alert("Такой пользователь уже есть")}))},login(){this.$axios.post("/login",{email:this.emailValue,password:this.passwordValue}).then((t=>{localStorage.setItem("AuthToken",t.data),this.$router.push("/about-me")})).catch((t=>{400===t.response.status&&alert("Неверные логин и/или пароль")}))}}});var r=a(1639),c=a(3190),i=a(6867),m=a(7065),d=a(9984),p=a.n(d);const h=(0,r.Z)(u,[["render",n]]),g=h;function w(t,e,a,l,n,s){const u=(0,o.up)("q-card-section"),r=(0,o.up)("q-btn");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(u,{class:"absolute-top text-h6 text-center"},{default:(0,o.w5)((()=>[(0,o.Uk)(" Поздравляем, Вы успешно вошли в свой аккаунт! Можете приступать к редактированию данных. ")])),_:1}),(0,o.Wm)(u,{class:"absolute-bottom-right"},{default:(0,o.w5)((()=>[(0,o.Wm)(r,{onClick:t.logOut,color:"secondary",label:"Выйти"},null,8,["onClick"])])),_:1})],64)}p()(u,"components",{QCardSection:c.Z,QInput:i.Z,QBtn:m.Z});const b=(0,o.aZ)({name:"LogOutComponent",methods:{logOut(){localStorage.setItem("AuthToken",""),this.$router.go(0)}}}),k=(0,r.Z)(b,[["render",w]]),f=k;p()(b,"components",{QCardSection:c.Z,QBtn:m.Z});const C=(0,o.aZ)({name:"IndexPage",components:{LogInComponent:g,LogOutComponent:f},data(){return{auth:""}},created(){this.auth=localStorage.getItem("AuthToken")||""}});var V=a(9885),Z=a(4458);const q=(0,r.Z)(C,[["render",l]]),W=q;p()(C,"components",{QPage:V.Z,QCard:Z.Z})}}]);