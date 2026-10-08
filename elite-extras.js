/* Trattoria D'Elite: módulos opcionais sem alterar o funcionamento original */
(function(){
'use strict';
const KEYS={favorites:'eliteFavoritos',reviews:'eliteAvaliacoes',added:'eliteProdutosExtras',cart:'carrinhoCantina',orders:'trattoritoPedidos'};
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
function read(k){try{const v=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(v)?v:[]}catch(e){return []}}
function save(k,arr){try{localStorage.setItem(k,JSON.stringify(arr));return true}catch(e){alert('Não foi possível salvar neste navegador. Verifique o armazenamento disponível.');return false}}
function money(n){return (Number(n)||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function el(tag,cls,t){const a=document.createElement(tag);if(cls)a.className=cls;if(t!==undefined)a.textContent=t;return a}
function validImg(src){return typeof src==='string'&&(/^(https:\/\/|imagens\/|data:image\/(png|webp|jpeg);base64,)/i).test(src)?src:'imagens/pratos/pizza-margherita.webp'}
function cartBadge(){const b=document.getElementById('cart-count');if(b)b.textContent=read(KEYS.cart).reduce((s,x)=>s+Math.max(0,Number(x.quantidade)||0),0)}
function addCart(item,qty){
 const list=read(KEYS.cart);
 const add=Math.max(1,Math.min(20,Number(qty)||1));
 const key=String(item.nome||'')+'|'+String(item.observacao||'')+'|'+String(item.adicionais||'');
 let current=list.find(x=>String(x.nome||'')+'|'+String(x.observacao||'')+'|'+String(x.adicionais||'')===key);
 if(current)current.quantidade=Number(current.quantidade||0)+add;
 else list.push({nome:String(item.nome||'Produto'),preco:Number(item.preco)||0,imagem:validImg(item.imagem),quantidade:add,observacao:String(item.observacao||''),adicionais:String(item.adicionais||'')});
 if(save(KEYS.cart,list)){cartBadge();alert('Produto adicionado ao carrinho!')}
}
function fromTuple(tuple,category){return {nome:String(tuple[0]),descricao:String(tuple[1]||''),preco:Number(tuple[2])||0,imagem:validImg(tuple[3]),categoria:category}}
function key(p){return p.categoria+'|'+p.nome}
function updateHeart(button,p){
 const active=read(KEYS.favorites).some(f=>key(f)===key(p));
 button.setAttribute('aria-pressed',String(active));
 button.textContent=active?'♥ Salvo':'♡ Favorito';
 button.setAttribute('aria-label',active?'Remover '+p.nome+' dos favoritos':'Salvar '+p.nome+' nos favoritos');
}
function toggleFavorite(button,p){
 let list=read(KEYS.favorites);
 const exists=list.some(f=>key(f)===key(p));
 if(exists)list=list.filter(f=>key(f)!==key(p));
 else list.unshift({...p,imagem:p.imagem});
 if(save(KEYS.favorites,list))updateHeart(button,p);
}
function formatProductCard(p){
 const article=el('article','elite-product');
 const image=el('img');image.src=validImg(p.imagem);image.alt=p.nome;image.loading='lazy';
 const body=el('div','elite-product-body');
 body.append(el('h3','',p.nome),el('p','',p.descricao||''));
 const price=el('div','elite-price',money(p.preco));body.append(price);
 const actions=el('div','elite-product-actions');
 const buy=el('button','elite-btn','Adicionar ao carrinho');
 buy.type='button';buy.addEventListener('click',()=>addCart(p,1));
 actions.append(buy);body.append(actions);article.append(image,body);
 return article;
}
function openPersonalize(p){
 let dialog=$('#elitePersonalization');
 if(!dialog){
  dialog=el('dialog','elite-dialog');
  dialog.id='elitePersonalization';
  dialog.innerHTML='<form method="dialog" class="elite-dialog-inner"><h2 id="eliteDialogTitle"></h2><p>Personalize seu item. Informe à cozinha quais ingredientes prefere retirar (demonstração).</p><label for="eliteQuantity">Quantidade</label><input id="eliteQuantity" type="number" min="1" max="20" value="1" required><label for="eliteNotes">Observações e ingredientes que deseja retirar</label><textarea id="eliteNotes" maxlength="180" placeholder="Ex.: sem cebola, molho separado"></textarea><label class="elite-option" id="eliteExtraWrap"><input id="eliteExtra" type="checkbox"> Adicional de parmesão (+ R$ 3,50)</label><div class="elite-options"><button type="button" class="elite-btn elite-secondary" id="eliteCancel">Cancelar</button><button type="submit" class="elite-btn">Adicionar ao carrinho</button></div></form>';
  document.body.appendChild(dialog);
  $('#eliteCancel').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 }
 $('#eliteDialogTitle').textContent=p.nome;
 $('#eliteQuantity').value='1';$('#eliteNotes').value='';$('#eliteExtra').checked=false;
 $('#eliteExtraWrap').hidden=p.categoria!=='Pratos Principais';
 const form=dialog.querySelector('form');
 form.onsubmit=e=>{
  e.preventDefault();
  const quantity=Math.max(1,Math.min(20,Math.floor(Number($('#eliteQuantity').value)||1)));
  const note=$('#eliteNotes').value.trim().slice(0,180);
  const extra=p.categoria==='Pratos Principais'&&$('#eliteExtra').checked;
  const additions=extra?'Parmesão extra':'';
  const chosen={...p,nome:p.nome+' · Personalizado',preco:p.preco+(extra?3.5:0),observacao:note,adicionais:additions};
  addCart(chosen,quantity);
  dialog.close();
 };
 if(typeof dialog.showModal==='function')dialog.showModal();
 else dialog.setAttribute('open','');
}
function bindCard(article,p){
 if(!article||article.dataset.eliteReady)return;
 article.dataset.eliteReady='yes';
 const body=article.querySelector('.menu-card-body')||article;
 const tools=el('div','elite-tools');
 const heart=el('button','elite-small-btn');heart.type='button';updateHeart(heart,p);
 heart.addEventListener('click',()=>toggleFavorite(heart,p));
 const custom=el('button','elite-small-btn','⚙ Personalizar');custom.type='button';
 custom.addEventListener('click',()=>openPersonalize(p));
 tools.append(heart,custom);body.appendChild(tools);
}
function menuProducts(){
 const name=location.pathname.split('/').pop();
 const kind=name==='pratos.html'?'Pratos Principais':name==='sobremesas.html'?'Sobremesas':name==='bebidas.html'?'Bebidas':'';
 let products=[];
 if(kind==='Pratos Principais'&&typeof pratos!=='undefined')products=pratos;
 if(kind==='Sobremesas'&&typeof doces!=='undefined')products=doces;
 if(kind==='Bebidas'&&typeof bebidas!=='undefined')products=bebidas;
 return {kind,products};
}
function extraMenu(category,container){
 const extra=read(KEYS.added).filter(x=>x.categoria===category);
 extra.forEach(p=>{
  const art=el('article','menu-card');
  const photo=el('img');photo.src=validImg(p.imagem);photo.alt=p.nome;photo.loading='lazy';
  const b=el('div','menu-card-body');
  b.append(el('h3','',p.nome),el('p','',p.descricao));
  b.append(el('span','price',money(p.preco)));
  const actions=el('div','card-actions');
  const buy=el('button','btn btn-buy','Compre agora');buy.type='button';
  buy.onclick=()=>{addCart(p,1);location.href='carrinho.html'};
  const cart=el('button','btn btn-cart','Adicionar ao carrinho');cart.type='button';cart.onclick=()=>addCart(p,1);
  actions.append(buy,cart);b.append(actions);art.append(photo,b);
  container.append(art);bindCard(art,p);
 });
}
function initMenus(){
 const {kind,products}=menuProducts();if(!kind)return;
 const cards=$$('.menu-card');
 cards.forEach((card,i)=>{if(products[i])bindCard(card,fromTuple(products[i],kind))});
 const grid=$('.menu-section .menu-grid');if(grid)extraMenu(kind,grid);
 const nav=$('.category-nav');
 if(nav){
  const bar=el('nav','elite-links');bar.setAttribute('aria-label','Recursos do cardápio');
  [['favoritos.html','♡ Favoritos'],['combos.html','★ Combos'],['avaliacoes.html','☆ Avaliações']].forEach(([link,title])=>{
   const a=el('a','',title);a.href=link;bar.appendChild(a);
  });nav.insertAdjacentElement('afterend',bar);
 }
}
function initFavorites(){
 const mount=$('#eliteFavorites');if(!mount)return;
 function draw(){
  mount.replaceChildren();
  const data=read(KEYS.favorites);
  if(!data.length){mount.append(el('p','elite-small','Você ainda não salvou pratos. Clique em ♡ Favorito no cardápio.'));return}
  for(const p of data){
   const card=el('div','elite-mini-card');const img=el('img');img.src=validImg(p.imagem);img.alt=p.nome;img.loading='lazy';
   const b=el('div');b.append(el('strong','',p.nome),el('p','',p.categoria+' · '+money(p.preco)));
   const buy=el('button','elite-btn','Adicionar');buy.onclick=()=>addCart(p,1);
   const del=el('button','elite-btn elite-secondary','Remover');
   del.onclick=()=>{save(KEYS.favorites,read(KEYS.favorites).filter(x=>key(x)!==key(p)));draw()};
   b.append(buy,del);card.append(img,b);mount.append(card);
  }
 }
 draw();
}
const combos=[
 {nome:'Combo Bella Italia',descricao:'Pizza Margherita + Limonada Rosa + Panna Cotta de Maracujá.',preco:89.9,de:98.79,imagem:'imagens/pratos/pizza-margherita.webp',categoria:'Combo'},
 {nome:'Combo Sabor da Casa',descricao:'Spaghetti alla Carbonara + Limonada + Classic Sicilian Cannoli.',preco:89.9,de:99.79,imagem:'imagens/pratos/spaghetti-carbonara.webp',categoria:'Combo'},
 {nome:'Combo Risoto Especial',descricao:'Risoto de Funghi + Limonada Rosa + Torta Caprese.',preco:119.9,de:131.79,imagem:'imagens/pratos/risoto-funghi.webp',categoria:'Combo'}
];
function initCombos(){
 const mount=$('#eliteCombos');if(!mount)return;
 combos.forEach(p=>{
  const card=formatProductCard({...p,observacao:'Itens inclusos: '+p.descricao});
  const price=card.querySelector('.elite-price');price.append(el('span','elite-old-price',money(p.de)));
  mount.append(card);
 });
}
function initReviews(){
 const form=$('#eliteReviewForm'),list=$('#eliteReviews');
 if(!form||!list)return;
 const draw=()=>{
  list.replaceChildren();
  const data=read(KEYS.reviews);
  if(!data.length){list.append(el('p','elite-small','Ainda não há avaliações registradas neste navegador.'));return}
  data.forEach(r=>{
   const card=el('div','elite-review');
   card.append(el('strong','',r.nome||'Cliente'),el('div','elite-stars','★'.repeat(r.estrelas)+'☆'.repeat(5-r.estrelas)));
   card.append(el('p','',r.comentario));list.append(card);
  });
 };
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const nome=$('#eliteReviewName').value.trim().slice(0,40)||'Cliente';
  const comentario=$('#eliteReviewText').value.trim().slice(0,240);
  const estrelas=Number($('#eliteReviewStars').value);
  if(!comentario||!(estrelas>=1&&estrelas<=5))return;
  const data=read(KEYS.reviews);
  data.unshift({nome,comentario,estrelas,createdAt:new Date().toISOString()});
  if(save(KEYS.reviews,data.slice(0,40))){form.reset();draw();$('#eliteReviewNotice').textContent='Avaliação salva neste navegador (demonstração).'}
 });
 draw();
}
function initAdmin(){
 const orders=$('#eliteAdminOrders'),catalog=$('#eliteAdminProducts'),form=$('#eliteAdminForm');
 if(!orders||!catalog||!form)return;
 const stages=[['recebido','Pedido recebido'],['preparo','Em preparo'],['entrega','Saiu para entrega'],['entregue','Entregue']];
 function drawOrders(){
  orders.replaceChildren();
  const list=read(KEYS.orders);
  $('#eliteOrderCount').textContent=list.length;
  if(!list.length){orders.append(el('p','elite-small','Ainda não há pedidos de demonstração neste navegador.'));return}
  list.forEach(order=>{
   const box=el('div','elite-admin-order');
   box.append(el('h3','',String(order.id)),el('p','',money(order.total)+' · '+(Array.isArray(order.items)?order.items.length:0)+' itens'));
   const label=el('label','','Etapa de demonstração');box.append(label);
   const select=el('select');
   stages.forEach(([id,txt])=>{const opt=el('option','',txt);opt.value=id;opt.selected=order.status===id;select.append(opt)});
   select.addEventListener('change',()=>{
    const all=read(KEYS.orders),found=all.find(o=>o.id===order.id);
    if(found){found.status=select.value;if(save(KEYS.orders,all))drawOrders()}
   });
   box.append(select);orders.append(box);
  });
 }
 function drawProducts(){
  catalog.replaceChildren();
  const data=read(KEYS.added);
  if(!data.length){catalog.append(el('p','elite-small','Nenhum produto adicional cadastrado neste navegador.'));return}
  data.forEach((p,i)=>{
   const row=el('div','elite-admin-order');
   row.append(el('h3','',p.nome),el('p','',p.categoria+' · '+money(p.preco)));
   const remove=el('button','elite-btn elite-secondary','Excluir do catálogo local');
   remove.onclick=()=>{const all=read(KEYS.added);all.splice(i,1);if(save(KEYS.added,all))drawProducts()};
   row.append(remove);catalog.append(row);
  });
 }
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const nome=$('#eliteAdminName').value.trim().slice(0,80),
   descricao=$('#eliteAdminDescription').value.trim().slice(0,200),
   preco=Number($('#eliteAdminPrice').value),
   categoria=$('#eliteAdminCategory').value;
  if(!nome||!descricao||!Number.isFinite(preco)||preco<=0||preco>9999||!['Pratos Principais','Sobremesas','Bebidas'].includes(categoria))return;
  const imageDefault=categoria==='Sobremesas'?'imagens/sobremesas/cannoli-classic.webp':categoria==='Bebidas'?'imagens/pratos/pizza-margherita.webp':'imagens/pratos/pizza-margherita.webp';
  const item={nome,descricao,preco,categoria,imagem:imageDefault};
  const data=read(KEYS.added);
  if(data.some(p=>p.nome.toLocaleLowerCase('pt-BR')===nome.toLocaleLowerCase('pt-BR')&&p.categoria===categoria)){alert('Produto já existe no catálogo adicional.');return}
  data.push(item);
  if(save(KEYS.added,data)){form.reset();drawProducts();$('#eliteAdminMessage').textContent='Produto adicionado ao catálogo local. Abra a categoria neste navegador para visualizá-lo.'}
 });
 drawOrders();drawProducts();
}
function init(){
 initMenus();initFavorites();initCombos();initReviews();initAdmin();
 cartBadge();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();