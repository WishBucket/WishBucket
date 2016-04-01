
// URL for domain matching
var link = document.URL;
var found = true;

var pictures = []; // Store product images
var title; // Product name
var price; // First attempt to find price
var quant; // Selected quantity
var extra; // FOr any additional information

// If URL matches an Amazon domain
if(link.search(/[a-z]*\.amazon\.com/i) > -1) {

  var area = document.getElementById('leftCol'); // Area containing the images
  title = document.getElementById('productTitle').innerHTML;
  price =  document.getElementById('priceblock_ourprice');
  var qlist = document.getElementById('quantity'); // Quantity dropdown

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

  findImages(area);
}

// If URL matches an Ebay domain
else if(link.search(/[a-z]*\.ebay\.com/i) > -1) {

  var area = document.getElementById('PicturePanel');
  
  price = document.getElementById('prcIsum').innerHTML;
  var quant = document.getElementById('qtyTextBox');
  title = document.getElementById('itemTitle').innerHTML;
  var bid = document.getElementById('prcIsum_bidPrice');
  
  if(quant != null) {
    quant = quant.value;
  }
  else {
    quant = 1;
  }
  
  if(bid != null) {
    bid = bid.innerText;
    bid = bid.replace(/[^\d.$,-]/g, '');
    
    extra = "The last known bid was " + bid;
  }
  
  title = title.replace(/<.*>.*<.*>/, '');
  
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

// Remove unneeded characters if they exist
price = price.replace(/[^\d.$,-]/g, '');

// Send data as a message to the extension
chrome.runtime.sendMessage({method:"gotImages", images:pictures, message:title, cost:price, number:quant, com:extra, supported:found});


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
