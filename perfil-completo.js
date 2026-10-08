/* Meu Perfil – demonstracao no navegador; nao é autenticacao de producao. */
(async()=>{
"use strict";
const KEY="trattoriaPerfisDemoV2",SESSION="trattoriaSessaoDemoV2";
const $=id=>document.getElementById(id),all=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?a:[]}catch{return []}};
const get=()=>all().find(x=>x.id===localStorage.getItem(SESSION))||null;
const read=(key)=>{try{const x=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(x)?x:[]}catch{return []}};
const save=list=>localStorage.setItem(KEY,JSON.stringify(list));
const date=str=>{const d=new Date(str||"");return str&&!Number.isNaN(d.getTime())?d.toLocaleDateString("pt-BR"):"Não informado"};
const money=n=>(Number(n)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const element=(t,cls,v)=>{const e=document.createElement(t);if(cls)e.className=cls;if(v!==undefined)e.textContent=v;return e};
const say=(s,err=false)=>{const e=$("pf-message");e.textContent=s;e.classList.toggle("error",err)};
const hex=a=>[...new Uint8Array(a)].map(b=>b.toString(16).padStart(2,"0")).join("");
const fromHex=s=>new Uint8Array((s.match(/.{2}/g)||[]).map(x=>parseInt(x,16)));
async function hash(s,salt){const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(s),"PBKDF2",false,["deriveBits"]);return hex(await crypto.subtle.deriveBits({name:"PBKDF2",salt:fromHex(salt),hash:"SHA-256",iterations:220000},base,256))}
const user=get();if(!user){location.replace("login.html");return}
function drawPerson(u){$("pf-name").textContent=u.name;$("pf-email").textContent=u.email;$("pf-email-data").textContent=u.email;$("pf-created").textContent=date(u.createdAt);$("pf-access-changed").textContent=date(u.accessUpdatedAt);$("pf-avatar").textContent=String(u.name||"T").slice(0,1).toLocaleUpperCase("pt-BR");$("pf-name-input").value=u.name}
drawPerson(user);
$("pf-favorites").textContent=read("eliteFavoritos").length;
const orders=read("trattoritoPedidos").filter(o=>o&&o.ownerProfileId===user.id&&typeof o.id==="string");
const unique=[...new Map(orders.map(o=>[o.id,o])).values()];
$("pf-count").textContent=unique.length;$("pf-total").textContent=money(unique.reduce((s,o)=>s+(Number(o.total)||0),0));
const list=$("pf-orders");if(!unique.length)list.append(element("p","pf-empty","Nenhuma compra demonstrativa vinculada a este perfil. Entre na conta antes de finalizar um pedido de teste. Pedidos antigos podem ser consultados pelo número."));
for(const o of unique){const card=element("article","pf-order"),top=element("div","pf-order-top");top.append(element("strong","",o.id),element("strong","",money(o.total)));card.append(top,element("p","",date(o.createdAt)+" · Pedido demonstrativo · "+(o.status||"recebido")));if(Array.isArray(o.items))card.append(element("p","",o.items.map(x=>(Number(x.quantidade)||1)+"× "+String(x.nome||x.nomeProduto||"Item").slice(0,70)).join(" · ")));const a=element("a","","Acompanhar pedido →");a.href="pedido.html?pedido="+encodeURIComponent(o.id);card.append(a);list.append(card)}
const tabs=[...document.querySelectorAll("[data-pf-tab]")],ids=["dados","compras","seguranca","preferencias"];
function openTab(id){if(!ids.includes(id))id="dados";for(const b of tabs){const active=b.dataset.pfTab===id;b.setAttribute("aria-selected",String(active));b.tabIndex=active?0:-1}for(const p of document.querySelectorAll(".pf-panel"))p.hidden=p.id!=="pf-"+id;say("")}
for(const b of tabs)b.addEventListener("click",()=>{openTab(b.dataset.pfTab);history.replaceState(null,"","#"+b.dataset.pfTab)});
openTab(location.hash.slice(1));
$("pf-name-form").addEventListener("submit",e=>{e.preventDefault();const name=$("pf-name-input").value.trim().replace(/\s+/g," ");if(name.length<2||name.length>80)return say("O nome deve ter entre 2 e 80 caracteres.",true);try{const users=all(),u=users.find(x=>x.id===user.id);if(!u)return say("Perfil indisponível.",true);u.name=name;save(users);drawPerson(u);say("Nome atualizado neste navegador.")}catch{say("Falha ao salvar o nome.",true)}});
$("pf-eye").addEventListener("click",()=>{const ids=["pf-old","pf-new","pf-new-confirm"];const show=$(ids[0]).type==="password";ids.forEach(id=>$(id).type=show?"text":"password");$("pf-eye").textContent=show?"Ocultar códigos":"Mostrar o que digitei"});
$("pf-password-form").addEventListener("submit",async e=>{e.preventDefault();const current=$("pf-old").value,pass=$("pf-new").value,confirmation=$("pf-new-confirm").value;if(pass.length<8||pass.length>64)return say("Novo acesso: de 8 a 64 caracteres.",true);if(pass!==confirmation)return say("Os novos acessos não coincidem.",true);if(pass===current)return say("Use um acesso diferente do anterior.",true);const b=e.currentTarget.querySelector("button[type=submit]");b.disabled=true;try{const users=all(),u=users.find(x=>x.id===user.id);if(!u)return say("Perfil indisponível.",true);if(await hash(current,u.salt)!==u.verifier)return say("Acesso atual incorreto.",true);const salt=hex(crypto.getRandomValues(new Uint8Array(16)));u.salt=salt;u.verifier=await hash(pass,salt);u.accessUpdatedAt=new Date().toISOString();save(users);e.currentTarget.reset();localStorage.removeItem(SESSION);say("Acesso alterado! Entre novamente.");setTimeout(()=>location.assign("login.html"),1500)}catch(ex){console.error(ex);say("Erro ao alterar acesso.",true)}finally{b.disabled=false}});
$("pf-logout").addEventListener("click",()=>{localStorage.removeItem(SESSION);location.assign("login.html")});
$("pf-delete").addEventListener("click",async()=>{const pass=$("pf-delete-password").value;if(!pass)return say("Digite o acesso atual para excluir.",true);const b=$("pf-delete");b.disabled=true;try{const u=get();if(!u||await hash(pass,u.salt)!==u.verifier)return say("Acesso incorreto. Perfil preservado.",true);if(!confirm("Deseja excluir somente este perfil de demonstração deste navegador?"))return;save(all().filter(x=>x.id!==u.id));localStorage.removeItem(SESSION);location.assign("cadastro.html")}catch{say("Erro ao excluir.",true)}finally{b.disabled=false}});
let prefs={};try{prefs=JSON.parse(localStorage.getItem("trattoriaPreferenciasDemoV2")||"{}")||{}}catch{}
$("pf-large").checked=!!prefs[user.id]?.largeText;document.querySelector(".pf-layout").classList.toggle("pf-large",$("pf-large").checked);
$("pf-large").addEventListener("change",()=>{try{prefs[user.id]={largeText:$("pf-large").checked};localStorage.setItem("trattoriaPreferenciasDemoV2",JSON.stringify(prefs));document.querySelector(".pf-layout").classList.toggle("pf-large",$("pf-large").checked);say("Preferência salva.")}catch{say("Falha ao salvar preferência.",true)}});
})();