/* かご：localStorage に持つ。index.html と checkout.html で共有 */
const CART_KEY='kumo_cart';
const PRODUCTS={eth:{n:'Ethiopia Guji',jp:'エチオピア グジ',p:1480},col:{n:'Colombia Huila',jp:'コロンビア ウイラ',p:1380},gua:{n:'Guatemala Antigua',jp:'グアテマラ アンティグア',p:1280},bra:{n:'Brazil Cerrado',jp:'ブラジル セラード',p:1180},kum:{n:'Kumo Blend',jp:'くもブレンド',p:1280},sum:{n:'Sumatra Mandheling',jp:'スマトラ マンデリン',p:1380}};
const FREE_SHIP=5000,SHIP=660;
function cartGet(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'{}')}catch(e){return{}}}
function cartSet(c){try{localStorage.setItem(CART_KEY,JSON.stringify(c))}catch(e){}document.dispatchEvent(new Event('cart'))}
function cartAdd(id,n=1){const c=cartGet();c[id]=(c[id]||0)+n;if(c[id]<=0)delete c[id];cartSet(c)}
function cartCount(){return Object.values(cartGet()).reduce((a,b)=>a+b,0)}
function cartTotal(){const c=cartGet();const sub=Object.entries(c).reduce((a,[k,q])=>a+PRODUCTS[k].p*q,0);const ship=sub===0||sub>=FREE_SHIP?0:SHIP;return{sub,ship,total:sub+ship}}
