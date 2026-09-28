
let all=[], cat='Wszystkie', shown=24;
const grid=document.getElementById('grid'), search=document.getElementById('search'), count=document.getElementById('count'), more=document.getElementById('more');
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function filtered(){let q=search.value.trim().toLowerCase();return all.filter(p=>(cat==='Wszystkie'||p.top===cat)&&(!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)))}
function render(){let f=filtered();count.textContent=`Znaleziono: ${f.length}`;grid.innerHTML=f.slice(0,shown).map(p=>`
<article class="card"><div class="pic">${p.image?`<img loading="lazy" src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.parentNode.innerHTML='<span class=noimg>🐾</span>'">`:'<span class="noimg">🐾</span>'}</div>
<div class="card-body"><div class="cat">${esc(p.category)}</div><h3>${esc(p.name)}</h3>${p.price?`<div class="price">${esc(p.price)} zł</div>`:''}
<div class="market">Oferta marketplace – wkrótce</div></div></article>`).join('');more.style.display=f.length>shown?'block':'none'}
fetch('products.json').then(r=>r.json()).then(d=>{all=d;render()});
search.addEventListener('input',()=>{shown=24;render()});document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');cat=b.dataset.cat;shown=24;render()});more.onclick=()=>{shown+=24;render()};


function selectCategory(name){
  cat=name; shown=24; search.value='';
  document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.cat===name));
  render();
  document.getElementById('produkty').scrollIntoView({behavior:'smooth',block:'start'});
}
// Nawigacja górna: Psy/Koty mają filtrować katalog, a nie tylko skakać do przycisku.
document.querySelectorAll('a[href="#psy"],a[href="#koty"]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault(); selectCategory(a.getAttribute('href')==='#psy'?'Psy':'Koty');
}));
// Linki Psy/Koty w stopce.
document.querySelectorAll('[data-footer-cat]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault(); selectCategory(a.dataset.footerCat);
}));


// Menu mobilne
const menuToggle=document.querySelector('.menu-toggle');
const mainNav=document.getElementById('main-nav');
if(menuToggle&&mainNav){
  menuToggle.addEventListener('click',()=>{
    const open=mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded',String(open));
    menuToggle.textContent=open?'✕':'☰';
  });
  mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    if(window.innerWidth<=700){mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}
  }));
}
