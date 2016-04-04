
// Image index and array
var index = 0;
var pictures;

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Inject script
    chrome.tabs.executeScript({file:"js/imagescript.js"});
    
    // Attach listener to scroll through images
    document.getElementById("left_but").addEventListener('click', function() {
  
        if(index == 0) {
            index = pictures.length - 1;
        } else {
            index = index - 1;
        }
  
        document.getElementById('prod_img').src = pictures[index];
    });

    // Attach another listener to scroll other direction
    document.getElementById("right_but").addEventListener('click', function() {
        index = (index + 1) % pictures.length;
        document.getElementById('prod_img').src = pictures[index];
    });
});

// Wait for content script to return info, then enter it into product page
chrome.runtime.onMessage.addListener(function(message) {
    if(message.method == "gotImages") {
        
        pictures = message.images;
        
        // Check if webpage is optomized
        if(message.supported) {
        
          document.getElementById('price').value = message.cost;
                                     
          document.getElementById('quantity').value = message.number;
          
          if(message.com != null) {
            document.getElementById('comments').value = message.com;
          }
        }
        
        document.getElementById('product').value = message.message;
        
        document.getElementById('pageURL').value = message.pagelink;
                                     
        if(pictures[0] != null) {
                                     
            document.getElementById('prod_img').src = pictures[0];
        }
    }
});
