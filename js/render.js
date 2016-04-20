$.when($.ajax(loadBucket())).then(function () {
  //buckets = getBuckets();
   render();

});
var curBucket = 0;
var curProduct = 0;

$(document).ready(function(){

  //render if you type in the Search bar (matt)
  $("#top-bar").on('input', function(){
    render();
  });

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
      $(collection).append('<li class="collection-item bucket"><i class="material-icons circle ' + color + '">' + icon + '</i><div><div class="title">' + title +'</div><i class="material-icons valign settingsGear" style="display: none;">settings</i></div></li>');

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
    var circle = $(this).find("i.material-icons.circle");
    var classes = (circle.attr("class"));
    var gear = $(this).find("i.material-icons.settingsGear");
    classes = classes.replace("material-icons circle","");
    $(this).addClass(classes);
    $(this).addClass("selected");
    $(circle).removeClass(classes);
    gear.show();
    var siblings = $(this).siblings();
    $(siblings).each(function( index ) {

      if ($(siblings[index]).hasClass("selected")) {
        $(siblings[index]).removeClass("selected");
        classes = ($(siblings[index]).attr("class"));
        classes = classes.replace("collection-item bucket","");
	var gear = $(siblings[index]).find("i.material-icons.settingsGear");
        var icons = $(siblings[index]).find("i");
        gear.hide();
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
  if (arrBucket.length > 0){
    renderBuckets();
    renderProducts(arrBucket[curBucket].products);
  }
  else{
    var item = document.createElement("div");
    item.innerHTML = "Welcome! Get started by making a Bucket!";
    $("#product-list").append('<div class="row"><div class="col s12">"Welcome! Get started by making a Bucket!"</div></div>');
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

      //if no text in search bar, show all items
      if(document.getElementsByName("SearchFieldName")[0].value===""){
        $("#product-list").append(item);
      }
      //if text in search bar, show items with substring match
      else if(product.productName.indexOf(document.getElementsByName("SearchFieldName")[0].value) > -1){
        $("#product-list").append(item);
      }
    }
  } else {
    var item = document.createElement("div");
    item.innerHTML = "This bucket is empty. Add a product by clicking on the + to the right.";
    $("#product-list").append('<div class="row"><div class="col s12">There are no items in your current bucket.</div></div>');
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
