var buckets = getBuckets();
var curBucket = 0;

$(document).ready(function(){

  renderBuckets(buckets);
  renderProducts(buckets[curBucket].products);

  $("#close-product").click(function(){
    $("#new-product").slideUp();
  });

  $("#add-product").click(function(){
    $("#new-product").slideDown();
  });

  $("#close-bucket").click(function(){
    $("#new-bucket").slideUp();
  });

  $("#add-bucket").click(function(){
    $("#new-bucket").slideDown();
  });

  $("#bucket-submit").click(function(){
    saveChanges();
    var bucketName = $('#bucket-name').val();
    var color = $("input[name=color]:checked").val()
    var icon = $("input[name=icon]:checked").val()
    addBucket(bucketName, color, icon);
    buckets = getBuckets();
    renderBuckets(buckets);
    $('#bucket-name').val("");
    $("#new-bucket").slideUp();
  });

  $("#product-add").click(function(){
    saveChanges();
    var productName = $('#product').val();
    var productPrice = $('#price').val();
    var productQuantity = $('#quantity').val();
    var productComment = $('#comments').val();
    var imgURL = $('#prod_img').attr('src');
    buckets[curBucket].addProduct(imgURL, productPrice, productQuantity, productName, productComment);
    renderProducts(buckets[curBucket].products);
    $("#new-product").slideUp();
  });

});

function renderBuckets(buckets){
  $("#buckets").empty();
  var collection = document.createElement("ul");
  $(collection).addClass("collection")
  for (i = 0; i < buckets.length; i++) {
    var title = buckets[i].name;
    var color = buckets[i].color;
    var icon = buckets[i].icon;
    if (i == 0) {
      $(collection).append('<li class="collection-item bucket selected ' + color + '"><i class="material-icons circle">' + icon + '</i><div class="title">' + title +'</div></li>');
    } else {
      $(collection).append('<li class="collection-item bucket"><i class="material-icons circle ' + color + '">' + icon + '</i><div class="title">' + title +'</div></li>');
    }
  }
  $("#buckets").append(collection);
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
        $(siblings[index]).removeClass("selected");
        classes = ($(siblings[index]).attr("class"));
        classes = classes.replace("collection-item bucket","");
        $(siblings[index]).find("i").addClass(classes);
        $(siblings[index]).removeClass(classes);
        console.log(classes);
      }
    });
    // call render
    var name = $(this).find(".title")[0].innerHTML;
    for (i = 0; i < buckets.length; i++) {
      if (buckets[i].name == name) {
        curBucket = i;
        renderProducts(buckets[i].products);
      }
    }
  });
}

function renderProducts(productList){
  $("#product-list").empty();
  if (productList.length > 0) {
    for (j = 0; j < productList.length; j++) {
      var product = productList[j];
      var item = document.createElement("div");
      $(item).addClass("wishlist-item");
      $(item).addClass("valign-wrapper");
      $(item).append('<i class="material-icons valign">more_vert</i><i class="material-icons valign checkbox">check_box_outline_blank</i><div class="card-panel white product-card valign"><img src="' + product.url + '" class="product-image" alt="Product Image"><div class="product-price">$'+ product.price +'</div></div><div class="product-info valign"><div class="product-title">'+ product.productName +'</div><div class="product-description">'+ product.comment +'</div></div>');
      $("#product-list").append(item);
    }
  } else {
    var item = document.createElement("div");
    item.innerHTML = "empty";
    $("#product-list").append(item);
  }
  $(".checkbox").click(function(){
    if ($(this).text() == "check_box_outline_blank") {
      $(this).text("check_box");
      //call something
    } else {
      $(this).text("check_box_outline_blank");
      //call something else...
    }
  });
}
