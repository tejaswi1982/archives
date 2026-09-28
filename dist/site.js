const media = [...document.querySelectorAll('audio,video')];
for (const item of media) item.addEventListener('play',()=>{for(const other of media)if(other!==item)other.pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)media.forEach(item=>item.pause());});
const dialog=document.querySelector('.lightbox');
if(dialog){
 let trigger;
 document.querySelectorAll('[data-enlarge]').forEach(link=>link.addEventListener('click',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();trigger=link;
  const original=link.querySelector('img');dialog.querySelector('img').src=link.href;dialog.querySelector('img').alt=original.alt;
  dialog.querySelector('h2').textContent=original.alt;dialog.querySelector('.full-size').href=link.href;
  dialog.showModal();document.body.style.overflow='hidden';
 }));
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const first=dialog.querySelector('[data-close]');
  const last=dialog.querySelector('.full-size');
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus();});
}
