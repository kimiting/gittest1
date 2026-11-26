(() => {
 const filters=document.querySelector('.filters');
 const form=document.createElement('form');
 form.setAttribute('role','search');
 form.className='artwork-search';
 form.innerHTML='<label for="artwork-query">作品を検索</label><div><input id="artwork-query" type="search" placeholder="作品名・時代・地域で検索" autocomplete="off"><button type="reset">クリア</button></div>';
 filters.before(form);
 const empty=document.createElement('p');
 empty.className='search-empty';
 empty.textContent='条件に合う作品がありません。キーワードや地域を変更してください。';
 empty.hidden=true;
 empty.setAttribute('role','status');
 document.querySelector('.works').after(empty);
 const input=form.querySelector('input');
 const normalize=value=>value.normalize('NFKC').toLocaleLowerCase('ja').trim();
 collectionPredicates.set('search',card=>{
  const work=works[Number(card.dataset.index)];
  const text=normalize([work.title,work.date,work.description,card.textContent].join(' '));
  return normalize(input.value).split(/\s+/).filter(Boolean).every(term=>text.includes(term));
 });
 input.addEventListener('input',refreshCollection);
 form.addEventListener('submit',event=>event.preventDefault());
 form.addEventListener('reset',event=>{event.preventDefault();input.value='';refreshCollection();input.focus()});
 document.addEventListener('collection:updated',event=>{empty.hidden=event.detail.count!==0});
 refreshCollection();
})();
