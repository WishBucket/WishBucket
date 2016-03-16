
var images = [];
var area = document.getElementById('leftCol');
var title = document.getElementById('productTitle').innerHTML;

findImages(area);

chrome.runtime.sendMessage({method:"gotImages",images:images, message:title});

function findImages(elem){
    if(elem.children.length == 0) {
        if(elem.nodeName.toLowerCase() === 'img' && elem.width > 70 && elem.height > 70) {
            images.push(elem.src);
        }
    }
    
    else {
        for(var j = 0; j < elem.children.length; j++) {
            findImages(elem.children[j]);
        }
    }
}
