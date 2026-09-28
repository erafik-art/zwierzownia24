/* Menu stron poradnikowych; katalog korzysta z oryginalnego app.js. */
const toggle=document.querySelector('.menu-toggle');
const nav=document.getElementById('main-nav');
if(toggle&&nav){
 const setOpen=open=>{nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');toggle.textContent=open?'✕':'☰';};
 toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){setOpen(false);toggle.focus();}});
}
