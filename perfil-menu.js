/* Trattoria D'Elite: atalho para login/perfil em todas as páginas, modo local */
(()=>{"use strict";function init(){
  let logged=false;
  try{const id=localStorage.getItem("trattoriaSessaoDemoV2");const list=JSON.parse(localStorage.getItem("trattoriaPerfisDemoV2")||"[]");logged=!!id&&Array.isArray(list)&&list.some(x=>x&&x.id===id)}catch{}
  const href=logged?"perfil.html":"login.html";
  const name=logged?"Meu perfil":"Entrar";
  let a=document.querySelector("#account-entry");
  if(a){a.href=href;a.textContent="👤 "+(logged?"Meu perfil":"Entrar no perfil");return}
  const root=document.querySelector(".site-header,.topbar .nav,.elite-top nav,.hub-nav,.about-top");
  if(!root)return;
  a=[...root.querySelectorAll("a")].find(e=>e.getAttribute("href")==="perfil.html"||e.classList.contains("pf-access-button"));
  if(a){a.href=href;a.textContent="👤 "+name;return}
  a=document.createElement("a");a.href=href;a.className="pf-access-button";a.setAttribute("aria-label",logged?"Abrir meu perfil":"Entrar no meu perfil");
  a.innerHTML='<span aria-hidden="true">👤</span><span class="pf-access-text"></span>';a.querySelector(".pf-access-text").textContent=name;
  if(root.classList.contains("site-header")){const cart=root.querySelector(".site-cart");if(cart)root.insertBefore(a,cart);else root.append(a)}else root.append(a);
  const style=document.createElement("style");style.textContent=".pf-access-button{display:inline-flex;align-items:center;gap:5px;border:1px solid #d4ae76;border-radius:22px;padding:9px 12px;color:#fff4e7!important;background:#ffffff13;text-decoration:none!important;font:700 11px Montserrat,Arial,sans-serif;white-space:nowrap}.pf-access-button:hover{background:#ffffff30}.site-header>.pf-access-button{position:absolute;right:65px;top:50%;transform:translateY(-50%);z-index:3}.about-top>.pf-access-button{margin-left:auto}@media(max-width:760px){.site-header>.pf-access-button{right:42px;padding:7px 8px}.site-header>.pf-access-button .pf-access-text{display:none}.pf-access-button{font-size:10px;padding:6px 9px}}";
  document.head.append(style);
}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();})();