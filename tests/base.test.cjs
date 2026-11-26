const {test}=require('node:test');
const assert=require('node:assert/strict');
const {setup}=require('./helpers.cjs');
test('region filters and artwork details remain available',()=>{const w=setup(),d=w.document;d.querySelector('[data-filter="japan"]').click();assert.equal([...d.querySelectorAll('.work')].filter(x=>!x.hidden).length,1);d.querySelector('[data-index="1"]').click();assert.equal(d.querySelector('#detail').open,true);assert.match(d.querySelector('#dialog-content').textContent,/唐津茶碗/);w.close()});
