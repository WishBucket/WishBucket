$(document).ready(function(){

  var obj = jQuery.parseJSON( '{ "Buckets" : [ { "Title" : "School", "Color" : "green", "Icon" : "account_balance"},{ "Title" : "Family", "Color" : "blue", "Icon" : "grade"},{ "Title" : "Family", "Color" : "red", "Icon" : "grade"},{ "Title" : "Clothes", "Color" : "orange", "Icon" : "favorite"}]}' );

  $.getJSON(chrome.extension.getURL('/testData.json'), function(data) {
    console.log(data);

    var items = data.items.map(function (item) {
      return item.key + ': ' + item.value;
    });
    showData.empty();

  if (items.length) {
    var content = '<li>' + items.join('</li><li>') + '</li>';
    var list = $('<ul />').html(content);
    showData.append(list);
  }
  });

  var collection = document.createElement("ul");
  $(collection).addClass("collection")
  for (i = 0; i < obj.Buckets.length; i++) {
    var title = obj.Buckets[i].Title;
    var color = obj.Buckets[i].Color;
    var icon = obj.Buckets[i].Icon;
    $(collection).append('<li class="collection-item bucket"><i class="material-icons circle ' + color + '">' + icon + '</i><div class="title">' + title +'</div></li>');
  }
  $("#bucket-list").append(collection);

  for (i = 0; i < 6; i++) {
    var item = document.createElement("div");
    $(item).addClass("wishlist-item");
    $(item).addClass("valign-wrapper");
    $(item).append('<i class="material-icons valign">more_vert</i><i class="material-icons valign">check_box_outline_blank</i><div class="card-panel white product-card valign"><img src="4352000_sa.jpg" class="product-image" alt="Product Image"><div class="product-price">$341.05</div></div><div class="product-info valign"><div class="product-title">Asus 15.6" Laptop - Intel Core i3 - 4GB Memory - 1TB Hard Drive Black X555LA-HI31103J - Best Buy</div><div class="product-description">Really want to get this before school starts!</div></div>');
    $("#product-column").append(item);
  }
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

  $(".bucket").click(function(){
    var circle = $(this).find("i");
    var classes = (circle.attr("class"));
    classes = classes.replace("material-icons circle","");
    console.log(classes);
    $(this).addClass(classes);
    $(circle).removeClass(classes);
    // call render
  });


  //$(".bucket").click(function(){
  //    if (this.)
  //    $(this).addClass("selected");
  //    });
});
