const {JSDOM}=require('jsdom');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'../seigetsu/dist');
function setup(){
 const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://example.test',runScripts:'outside-only'});
 const {window:w}=dom;
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};
 w.HTMLDialogElement.prototype.close=function(){this.open=false};
 for(const script of w.document.querySelectorAll('script[src]')) w.eval(fs.readFileSync(path.join(root,script.getAttribute('src')),'utf8'));
 return w;
}
module.exports={setup};
