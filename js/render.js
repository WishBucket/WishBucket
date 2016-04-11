$.when($.ajax(loadBucket())).then(function () {
  //buckets = getBuckets();
   render();

});
var curBucket = 0;
var curProduct = 0;

$(document).ready(function(){

  $("#close-product").click(function(){
    $("#new-product").slideUp();
  });


  $("#add-product").click(function(){
    chrome.tabs.executeScript({file:"js/imagescript.js"});
    $('#product-add').show();
    $('#right_but').show();
    $('#left_but').show();
    $('#product-edit-submit').hide()
    $("#new-product").slideDown();
  });

  $("#close-bucket").click(function(){
    $("#new-bucket").slideUp();
  });

   $("#add-bucket").click(function(){
    $("#new-bucket-card").show();
    $("#update-bucket-card").hide();
    $("#new-bucket").slideDown();
    $("#bucket-name").clear();

  });

  $("#bucket-submit").click(function(){
    //saveChanges();
    var bucketName = $('#bucket-name').val();
    var color = $("input[name=color]:checked").val()
    var icon = $("input[name=icon]:checked").val()
    addBucket(bucketName, color, icon);
    //buckets = getBuckets();
    renderBuckets();
    $('#bucket-name').val("");
    $("#new-bucket").slideUp();
    saveChanges();
  });

  $("#delete-bucket").click(function(){
    removeBucket(arrBucket[curBucket]);
    $("#new-bucket").slideUp();
    saveChanges();
    renderBuckets();
    renderProducts(arrBucket[0].products);
  });

  $("#product-add").click(function(){
    //saveChanges();
    var productName = $('#product').val();
    var productPrice = $('#price').val();
    var productQuantity = $('#quantity').val();
    var productComment = $('#comments').val();
    var url = $('#pageURL').val();
    var imgURL = $('#prod_img').attr('src');
    arrBucket[curBucket].addProduct(url, imgURL, productPrice, productQuantity, productName, productComment);
    //saveChanges();
    //buckets = getBuckets();
    renderProducts(arrBucket[curBucket].products);
    $("#new-product").slideUp();
    saveChanges();
  });

  $("#product-edit-submit").click(function(){
    //saveChanges();
    var product = arrBucket[curBucket].getProductList()[curProduct];
    product.productName = $('#product').val();
    product.price = $('#price').val();
    product.quantity = $('#quantity').val();
    product.comment = $('#comments').val();
    renderProducts(arrBucket[curBucket].products);
    $("#new-product").slideUp();
    saveChanges();
  });

  $("#bucket-rename").click(function(){
    //saveChanges();
    arrBucket[curBucket].name = $('#bucket-name').val();
    arrBucket[curBucket].color = $("input[name=color]:checked").val();
    arrBucket[curBucket].icon = $("input[name=icon]:checked").val();
    renderBuckets();
    $("#new-bucket").slideUp();
    saveChanges();
  });

});


function renderBuckets(){
  $("#buckets").empty();
  var collection = document.createElement("ul");
  $(collection).addClass("collection")
  for (i = 0; i < arrBucket.length; i++) {
    var title = arrBucket[i].name;
    var color = arrBucket[i].color;
    var icon = arrBucket[i].icon;
    if (i == 0) {
      $(collection).append('<li class="collection-item bucket selected ' + color + '"><i class="material-icons circle">' + icon + '</i><div><div class="title">' + title +'</div><i class="material-icons valign settingsGear">settings</i></div></li>');
    } else {
      $(collection).append('<li class="collection-item bucket"><i class="material-icons circle ' + color + '">' + icon + '</i><div><div class="title">' + title +'</div><i class="material-icons valign settingsGear">settings</i></div></li>');
    }
  }
  $("#buckets").append(collection);

  $(".settingsGear").click(function(){
      $("#new-bucket-card").hide();
      $("#update-bucket-card").show();
      $("#new-bucket").slideDown();
      var color = arrBucket[curBucket].color;
      var icon = arrBucket[curBucket].icon;
      $("#select-" + color).prop("checked", true);
      $("#select-" + icon).prop("checked", true);
      $('#bucket-name').val(arrBucket[curBucket].name);

  });

  $(".bucket").click(function(){
    var circle = $(this).find("i");
    var classes = (circle.attr("class"));
    classes = classes.replace("material-icons circle","");
    $(this).addClass(classes);
    $(this).addClass("selected");
    $(circle).removeClass(classes);
    var siblings = $(this).siblings();
    $(siblings).each(function( index ) {

      if ($(siblings[index]).hasClass("selected")) {
      	$(".settingsGear").show();
        $(siblings[index]).removeClass("selected");
        classes = ($(siblings[index]).attr("class"));
        classes = classes.replace("collection-item bucket","");

        var icons = $(siblings[index]).find("i");
  	$(icons[0]).addClass(classes);
        $(siblings[index]).removeClass(classes);
        console.log(classes);
      }
    });

    //if the gear on the bucket is clicked
    // call render
    var name = $(this).find(".title")[0].innerHTML;
    for (i = 0; i < arrBucket.length; i++) {
      if (arrBucket[i].name == name) {
        curBucket = i;
        renderProducts(arrBucket[i].products);
      }
    }
  });

}

function render () {
  //buckets = getBuckets();
  if (arrBucket.length > 0){
    renderBuckets();
    renderProducts(arrBucket[curBucket].products);
  }
}

function renderProducts(productList){
  $("#product-list").empty();
  if (productList.length > 0) {
    for (j = 0; j < productList.length; j++) {
      var product = productList[j];
      var item = document.createElement("div");
      $(item).addClass("wishlist-item");
      $(item).addClass("valign-wrapper");
      $(item).append('<i class="material-icons valign checkbox">delete</i><div class="card-panel white product-card valign"><img src="' + product.imageURL + '" class="product-image" alt="Product Image"><div class="product-price">'+ product.price +'</div><div class="product-quantity chip red">' + product.quantity + '</div></div><div class="product-info valign"><div class="product-title" url="' + product.url +'">'+ product.productName +'</div><div class="product-description">'+ product.comment +'</div></div><i class="material-icons valign edit-product">create</i>');
      $("#product-list").append(item);
    }
  } else {
    var item = document.createElement("div");
    item.innerHTML = "This bucket is empty. Add a product by clicking on the + to the right.";
    $("#product-list").append('<div class="row"><div class="col s12">"This bucket is empty. Add a product by clicking on the red button to the right."</div></div>');
  }
  $(".product-title").click(function() {
      chrome.tabs.update({
       url: $(this).attr("url")
     })
  });
  $(".checkbox").click(function(){
    var parent = $(this).parent()
    var siblings = parent.parent().children();
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] == parent[0]) {
        arrBucket[curBucket].removeProduct(arrBucket[curBucket].getProductList()[i]);
        saveChanges();
        break;
      }
    }
    $(this).parent().fadeOut();
  });
  $(".edit-product").click(function(){
    var parent = $(this).parent()
    var siblings = parent.parent().children();
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] == parent[0]) {
        var product = arrBucket[curBucket].getProductList()[i];
        $("#new-product").slideDown();
        $('#product').val(product.productName);
        $('#price').val(product.price);
        $('#quantity').val(product.quantity);
        var productComment = $('#comments').val(product.comment);
        var url = $('#pageURL').val(product.url);
        $('#prod_img').attr('src', product.imageURL);
        $('#product-add').hide();
        $('#right_but').hide();
        $('#left_but').hide();
        $('#product-edit-submit').show()
        curProduct = i;
        break;
      }
    }
  });
}
