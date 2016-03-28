
var pictures = []; // Store product images
var area = document.getElementById('leftCol'); // Page area that contains product images
var title = document.getElementById('productTitle').innerHTML; // Product name
var price =  document.getElementById('priceblock_ourprice'); // First attempt to find price
var qlist = document.getElementById('quantity'); // Quantity dropdown
var quant;

if(qlist != null) {
  quant = qlist.options[qlist.selectedIndex].text; // Selected quantity
}
else {
  quant = 1;
}

// If price wasn't found on first attempt, try, try again
if(price == null) {
    price = document.getElementById('priceblock_saleprice');
}
if(price == null) {
    price = document.getElementsByClassName('offer-price')[0];
}

// Grab price as a string
price = price.innerHTML;
// Remove spaces if they exist
// Solution found at
//http://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
price = price.replace(/\s+/g, '');

findImages(area);

// Send data as a message to the extension
chrome.runtime.sendMessage({method:"gotImages",images:pictures, message:title, cost:price, number:quant});


// Recursively go through each element and find all images of a reasonable size
function findImages(elem){
    if(elem.children.length == 0) {
        if(elem.nodeName.toLowerCase() === 'img' && elem.width > 40 && elem.height > 40) {
            pictures.push(elem.src);
        }
    }
    
    else {
        for(var j = 0; j < elem.children.length; j++) {
            findImages(elem.children[j]);
        }
    }
}
