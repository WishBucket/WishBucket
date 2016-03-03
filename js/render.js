var obj = jQuery.parseJSON( '{ "Buckets" : [ { "Title" : "School", "Color" : "green", "Icon" : "account_balance"},{ "Title" : "Family", "Color" : "pink", "Icon" : "grade"},{ "Title" : "Family", "Color" : "red", "Icon" : "grade"},{ "Title" : "Family", "Color" : "blue", "Icon" : "grade"},{ "Title" : "Family", "Color" : "red", "Icon" : "grade"},{ "Title" : "Family", "Color" : "red", "Icon" : "grade"},{ "Title" : "Clothes", "Color" : "orange", "Icon" : "favorite"}]}' );

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

$(document).ready(function(){
  var collection = document.createElement("ul");
  $(collection).addClass("collection")
  for (i = 0; i < obj.Buckets.length; i++) {
    var title = obj.Buckets[i].Title;
    var color = obj.Buckets[i].Color;
    var icon = obj.Buckets[i].Icon;
    $(collection).append('<li class="collection-item bucket"><i class="material-icons circle ' + color + '">' + icon + '</i><div class="title">' + title +'</div></li>');
  }
  $("#bucket-list").append(collection);

  //$(".bucket").click(function(){
  //    if (this.)
  //    $(this).addClass("selected");
  //    });
});
