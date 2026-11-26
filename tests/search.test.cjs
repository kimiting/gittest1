const {test}=require('node:test');
const assert=require('node:assert/strict');
const {setup}=require('./helpers.cjs');
test('search combines normalized terms with region and resets',()=>{
 const w=setup(),d=w.document,input=d.querySelector('#artwork-query');
 const search=value=>{input.value=value;input.dispatchEvent(new w.Event('input'))};
 search('１６００ 日本');assert.equal(d.querySelector('#count').textContent,'1作品');assert.equal(d.querySelector('[data-index="1"]').hidden,false);
 d.querySelector('[data-filter="china"]').click();assert.equal(d.querySelector('#count').textContent,'0作品');assert.equal(d.querySelector('.search-empty').hidden,false);
 d.querySelector('.artwork-search button').click();assert.equal(input.value,'');assert.equal(d.querySelector('#count').textContent,'1作品');
 search('<script>');assert.equal(d.querySelector('#count').textContent,'0作品');w.close();
});
