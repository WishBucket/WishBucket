
var index = 0;
var pictures;

document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.executeScript({file:"js/imagescript.js"});
    
    document.getElementById("left_but").addEventListener('click', function() {
  
        if(index == 0) {
            index = pictures.length - 1;
        } else {
            index = index - 1;
        }
  
        document.getElementById('prod_img').src = pictures[index];
    });

    document.getElementById("right_but").addEventListener('click', function() {
        index = (index + 1) % pictures.length;
        document.getElementById('prod_img').src = pictures[index];
    });
});

chrome.runtime.onMessage.addListener(function(message) {
    if(message.method == "gotImages") {
                                     
        pictures = message.images;
        
        document.getElementById('product').value = message.message;
        
        document.getElementById('price').value = message.cost;
                                     
        document.getElementById('quantity').value = message.number;
                                     
        if(pictures[0] != null) {
                                     
            document.getElementById('prod_img').src = pictures[0];
        }
    }
});
