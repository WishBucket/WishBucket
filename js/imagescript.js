
var pictures = [];
var area = document.getElementById('leftCol');
var title = document.getElementById('productTitle').innerHTML;
var price =  document.getElementById('priceblock_ourprice');
var qlist = document.getElementById('quantity');
var quant = qlist.options[qlist.selectedIndex].text;

if(price == null) {
    price = document.getElementById('priceblock_saleprice');
}
if(price == null) {
    price = document.getElementsByClassName('offer-price')[0];
}

price = price.innerHTML;
// Solution found at
//http://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
price = price.replace(/\s+/g, '');

findImages(area);

chrome.runtime.sendMessage({method:"gotImages",images:pictures, message:title, cost:price, number:quant});

function findImages(elem){
    if(elem.children.length == 0) {
        if(elem.nodeName.toLowerCase() === 'img' && elem.width > 70 && elem.height > 70) {
            pictures.push(elem.src);
        }
    }
    
    else {
        for(var j = 0; j < elem.children.length; j++) {
            findImages(elem.children[j]);
        }
    }
}
