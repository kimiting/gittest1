(() => {
 document.querySelectorAll('.work').forEach(card=>card.addEventListener('click',()=>{
  const image=document.querySelector('#dialog-content .detail-image');
  if(!image)return;
  const panel=document.createElement('div');panel.className='image-viewer';
  const viewport=document.createElement('div');viewport.className='image-viewport';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label','作品画像。拡大時はスクロールして細部をご覧ください');
  image.before(panel);panel.append(viewport);viewport.append(image);
  const controls=document.createElement('div');controls.className='image-controls';
  controls.innerHTML='<button type="button" data-zoom="out" aria-label="画像を縮小">−</button><output aria-live="polite">100%</output><button type="button" data-zoom="in" aria-label="画像を拡大">＋</button><button type="button" data-zoom="reset">全体を表示</button>';
  panel.append(controls);
  const help=document.createElement('p');help.className='viewer-help';help.textContent='拡大後は画像をスクロールして細部をご覧いただけます。';panel.append(help);
  let zoom=100;
  function render(){
   image.style.width=zoom+'%';
   controls.querySelector('output').textContent=zoom+'%';
   controls.querySelector('[data-zoom="out"]').disabled=zoom===100;
   controls.querySelector('[data-zoom="in"]').disabled=zoom===300;
   if(zoom===100){viewport.scrollLeft=0;viewport.scrollTop=0}
  }
  controls.addEventListener('click',event=>{
   const action=event.target.dataset.zoom;if(!action)return;
   zoom=action==='reset'?100:Math.max(100,Math.min(300,zoom+(action==='in'?50:-50)));
   render();
  });
  render();
 }));
})();
