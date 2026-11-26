const menu=document.querySelector('#menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');menu.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','メニューを開く');menu.textContent='☰'}));
const collectionPredicates = new Map();
function refreshCollection() {
 const region=document.querySelector('[data-filter].active').dataset.filter;
 let count=0;
 document.querySelectorAll('.work').forEach(card=>{
  card.hidden=!(region==='all'||card.dataset.region===region)||![...collectionPredicates.values()].every(predicate=>predicate(card));
  if(!card.hidden) count++;
 });
 document.querySelector('#count').textContent=count+'作品';
 document.dispatchEvent(new CustomEvent('collection:updated',{detail:{count}}));
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',other===button)});
 refreshCollection();
}));

const works=[{title:'建窯 兎毫天目茶碗',date:'中国・福建省 ／ 南宋時代（12〜13世紀）',description:'黒釉のなかを流れる、兎の毛のような繊細な筋文様。光の角度によって変わる釉の景色と、引き締まった器形が印象的な茶碗です。',id:'1948.206'},{title:'唐津茶碗',date:'日本 ／ 桃山時代（1600年頃）',description:'土の表情と柔らかな釉調に、唐津焼の魅力を感じる一碗。整いすぎないかたちに、手仕事ならではの温もりが息づいています。',id:'1983.158'},{title:'朝鮮の茶碗',date:'朝鮮 ／ 朝鮮王朝時代（17世紀）',description:'穏やかな佇まいのなかに、豊かな表情をたたえる茶碗。釉の流れや土の質感に目を向けると、一つの器が持つ奥行きが見えてきます。',id:'1996.4'}];
const dialog=document.querySelector('#detail'),content=document.querySelector('#dialog-content');function show(html){content.innerHTML=html;dialog.showModal()}
document.querySelectorAll('.work').forEach(w=>w.addEventListener('click',()=>{const i=Number(w.dataset.index),a=works[i];show(`<img class="detail-image" src="assets/bowl-${i}.jpg" alt="${a.title}"><p class="eyebrow">REFERENCE COLLECTION</p><h2>${a.title}</h2><p>${a.date}</p><p>${a.description}</p><p class="sample-note">鑑賞用サンプル・非売品<br>クリーブランド美術館所蔵。実際の店舗在庫ではありません。</p><a href="https://www.clevelandart.org/art/${a.id}" target="_blank" rel="noopener noreferrer">所蔵館の作品情報を見る</a>`)}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('#contact-open').addEventListener('click',()=>show('<p class="eyebrow">CONTACT</p><h2>お問い合わせ窓口は準備中です。</h2><p>こちらは「古美術 青月」のデザイン見本です。実際の店舗名・メールアドレス・電話番号が決まり次第、この場所にご案内を掲載します。</p><p>現在、ご注文・来店予約・お問い合わせの送信は受け付けておりません。</p>'));
document.querySelector('#credits-open').addEventListener('click',e=>{e.preventDefault();show('<p class="eyebrow">IMAGE CREDITS</p><h2>掲載画像について</h2><p>茶碗の画像：The Cleveland Museum of Art, Open Access（CC0）。作品番号 1948.206、1983.158、1996.4。</p><p>暮らしの器のイメージ：Unsplash。</p><p>画像はサイトのデザインを示す参考として掲載しています。美術館所蔵品を販売するものではありません。</p>')});
