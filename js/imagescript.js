
// URL for domain matching
var link = document.URL;
var found = true;

var pictures = []; // Store product images
var area;  // Page area that contains product images
var title; // Product name
var price; // First attempt to find price
var qlist; // Quantity dropdown
var quant; // Selected quantity

// If URL matches an Amazon domain
if(link.search(/[a-z]*\.amazon\.com/i) > -1) {

  pictures = [];
  area = document.getElementById('leftCol');
  title = document.getElementById('productTitle').innerHTML;
  price =  document.getElementById('priceblock_ourprice');
  qlist = document.getElementById('quantity');
  quant;

  // Make sure quantity dropdown exists
  if(qlist != null) {
    quant = qlist.options[qlist.selectedIndex].text;
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
}
// If the domain is not optomized
else {
  found = false;
  
  title = "This website is not optomized";
  
  // Grab all images on the page
  pics = document.images;
  
  // Only return ones that are decently sized
  for(var i = 0; i < pics.length; i++) {
    if(pics[i].width > 40 && pics[i].height > 40) {
      pictures.push(pics[i].src);
    }
  }
  
}

// Send data as a message to the extension
chrome.runtime.sendMessage({method:"gotImages", images:pictures, message:title, cost:price, number:quant, supported:found});


// Recursively go through each element and find all images of a reasonable size on Amazon
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
