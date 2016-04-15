
// URL for domain matching
var link = document.URL;
var found = true;

var pictures = []; // Store product images
var title; // Product name
var price; // First attempt to find price
var quant; // Selected quantity
var extra; // For any additional information

// If URL matches an Amazon domain
if(link.search(/[a-z]*\.amazon\.com/i) > -1) {

  var area = document.getElementById('leftCol'); // Area containing the images
  title = document.getElementById('productTitle');
  price =  document.getElementById('priceblock_ourprice');
  var qlist = document.getElementById('quantity'); // Quantity dropdown
  
  if(title != null) {
    title = title.innerHTML;
  }
  else {
    title = document.getElementById('ebooksProductTitle').innerHTML;
  }

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
  if(price == null) {
      price = document.getElementsByClassName('a-size-medium a-color-price')[0];
  }

  // Grab price as a string
  price = price.innerHTML;
  
  // Remove unneeded characters if they exist
  price = price.replace(/[^\d.$,-]/g, '');

  findImages(area);
}

// If URL matches an Ebay domain
else if(link.search(/[a-z]*\.ebay\.com/i) > -1) {

  var area = document.getElementById('PicturePanel');
  
  price = document.getElementById('prcIsum');
  var quant = document.getElementById('qtyTextBox');
  title = document.getElementById('itemTitle').innerText;
  var bid = document.getElementById('prcIsum_bidPrice');
  
  if(price != null) {
    price = price.innerHTML;

    // Remove unneeded characters if they exist
    price = price.replace(/[^\d.$,-]/g, '');
  }
  else {
    price = "Bid Only";
  }
  
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
  
  title = title.replace(/Details about  /, '');
  
  findImages(area);
}
//if URL matches newegg domain
else if(link.search(/[a-z]*\.newegg\.com/i) > -1){
	//test if regular sales page or shell shocker page
	var shellShocker = document.title
	var testSS = new RegExp("Shell Shocker");
	console.log(testSS.test(shellShocker));
	if(testSS.test(shellShocker)){
	/*
		var area = document.getElementsByClassName("objImages")[0];
		title = document.getElementById("shellShockerViewDetails").innerText;
		quant = 1;
		price = document.getElementsByClassName("price-current ")[0].innerText;
		findImages(area);
		price = price.replace(/[^\d.$,-]/g, '');
		//link = document.getElementById("shellShockerViewDetails").getAttribute("href");
		*/
	}
	else{
		var area = document.getElementsByClassName("objImages")[0];
		title = document.getElementById("grpDescrip_0");
		if(title != null){
			title = title.innerText;
		}
		else{
			title = document.title;
		}
		var classElement = document.getElementsByClassName("price-current ")
		
		price = document.getElementById("TotalPrice")
		
		
		//check variety of ways that price can manifest

		if(price != null){
					price = price.innerText;
		}
		else{
			
			if(document.getElementById("singleFinalPrice") != null){
				price = document.getElementById("singleFinalPrice").getAttribute("content");
				if(price == null){
					price = document.getElementById("singleFinalPrice").innerText;
				}
			}
			//default to 0 if all else fails
			if(price == null){
				price = "0";
			}
		}
		
		quant = document.getElementById('qtyMainItems').getAttribute("value");
		
		price = price.replace(/[^\d.$,-]/g, '');
		findImages(area);
	}
	
	
	
}

// If the URL matches a BestBuy domain
else if(link.search(/[a-z]*\.bestbuy\.com/i) > -1){
    
    title = document.getElementById('sku-title').innerText;
    price = document.getElementsByClassName('item-price')[0].innerText;
    quant = 1;
    
    findImages(document.getElementsByClassName('image-gallery-thumbs-slides-inner')[0]);
}

// If the domain is not optomized
else {
  found = false;
  
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
chrome.runtime.sendMessage({method:"gotImages", images:pictures, message:title, cost:price, number:quant, com:extra, supported:found, pagelink:link});


// Recursively go through each element and find all images of a reasonable size on Amazon
function findImages(elem){
    if(elem.children.length == 0) {
        if(elem.nodeName.toLowerCase() === 'img' && elem.width > 40 && elem.height > 40) {
            if(elem.src.length < 1000) {
                var n = elem.src.indexOf(';');
                pictures.push(elem.src.substring(0, n != -1 ? n : elem.src.length));
            }
            else {
                setTimeout(waiturl(elem), 500);
            }
        }
    }
    
    else {
        for(var j = 0; j < elem.children.length; j++) {
            findImages(elem.children[j]);
        }
    }
}

function waiturl(elem) {
    pictures.push(elem.src);
}
