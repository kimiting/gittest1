(() => {
 const key='seigetsu.favorites.v1';
 const validIds=new Set(works.map(work=>work.id));
 let saved=new Set(),persistent=true;
 try {const data=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(data))saved=new Set(data.filter(id=>validIds.has(id)))} catch {persistent=false}
 const controls=document.createElement('div');
 controls.className='favorite-controls';
 controls.innerHTML='<button type="button" aria-pressed="false">お気に入りだけ表示</button><span aria-live="polite"></span>';
 document.querySelector('.filters').after(controls);
 const toggle=controls.querySelector('button'),status=controls.querySelector('span');
 let onlySaved=false;
 collectionPredicates.set('favorites',card=>!onlySaved||saved.has(works[Number(card.dataset.index)].id));
 function update(){
  status.textContent=`${saved.size}作品を保存${persistent?'（このブラウザ内）':'（この画面のみ・ブラウザ保存不可）'}`;
  document.querySelectorAll('.favorite-button').forEach(button=>{const active=saved.has(button.dataset.id);button.setAttribute('aria-pressed',active);button.textContent=active?'お気に入りから外す':'お気に入りに保存'});
  refreshCollection();
 }
 toggle.addEventListener('click',()=>{onlySaved=!onlySaved;toggle.setAttribute('aria-pressed',onlySaved);update()});
 const empty=document.createElement('p');empty.className='favorite-empty';empty.hidden=true;empty.setAttribute('role','status');empty.textContent='表示できるお気に入りがありません。お気に入りを保存するか、絞り込み条件を変更してください。';
 controls.after(empty);
 document.addEventListener('collection:updated',event=>{empty.hidden=!(onlySaved&&event.detail.count===0)});
 document.querySelectorAll('.work').forEach(card=>{
  const wrapper=document.createElement('div');wrapper.className='favorite-card';card.before(wrapper);wrapper.append(card);
  const button=document.createElement('button');button.className='favorite-button';button.type='button';button.dataset.id=works[Number(card.dataset.index)].id;button.setAttribute('aria-label',`${works[Number(card.dataset.index)].title}のお気に入り`);wrapper.append(button);
  button.addEventListener('click',()=>{const id=button.dataset.id;saved.has(id)?saved.delete(id):saved.add(id);try{localStorage.setItem(key,JSON.stringify([...saved]));persistent=true}catch{persistent=false}update()});
 });
 document.addEventListener('collection:updated',()=>{document.querySelectorAll('.favorite-card').forEach(wrapper=>{wrapper.hidden=wrapper.querySelector('.work').hidden})});
 window.addEventListener('storage',event=>{if(event.key!==key&&event.key!==null)return;try{const data=JSON.parse(event.newValue||'[]');saved=new Set(Array.isArray(data)?data.filter(id=>validIds.has(id)):[]);update()}catch{/* Ignore malformed updates from other tabs. */}});
 update();
})();
