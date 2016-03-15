//Prototype Product Object
	function Product(url, price, quantity, productName, comment){
			this.url = url;
			this.price = price;
			this.quantity = quantity;
			this.productName = productName;
			this.comment = comment;
			
			
			//object behavior
			this.getUrl = function(){
				return this.url;
			};
			this.setUrl = function(url){
				this.url = url;	
			};
			this.getPrice = function(){
				return this.price;
			};
			this.setPrice = function(price){
				this.price = price;
			};
			this.getComment = function(){
				return this.comment;
			};
			this.setComment = function(comment){
				this.comment = comment;
			};
			this.getQuantity = function(){
				return this.quantity;
			};
			this.setQuantity = function(quantity){
				this.quantity = quantity;
			};
			this.getProductName = function(){
				return this.productName;
			};
			this.setProductName = function(productName){
				this.productName = productName;
			};
	}

//Prototype Buckey Object
	function Bucket(name, color, icon){
		this.name = name;
		this.color = color;
		this.icon = icon;
		this.products = new Array;
		
		//Bucket Behavior
		this.getName = function(){
			return 	this.name;
		};
		this.setName = function(name){
			this.name = name;
		};
		this.getColor = function(){
			return this.color;
		};
		this.setColor = function(color){
			this.color = color;
		};
		this.getIcon = function(){
			return this.icon;
		};
		this.setIcon = function(icon){
			this.icon = icon;
		};
		this.getProductList = function(){
			return this.products;
		};
		/**Add a product to the bucket
			@param {String} url - product URL
			@param {Float} price - price of object
			@param {Int} quantity - quantity of object
			@param {String} productName - Name of product
			@param {String} comment - Description of product
			
			@return {Product} - product created
		*/
		this.addProduct = function(url, price, quantity, productName, comment){
			var temp = new Product(url, price, quantity, productName, comment)
			this.products.push(temp);
			return temp;
		};
		
		this.getProduct = function(product){
			return this.products.find(product);
		};
		this.removeProduct = function(product){
			
		};
		
		
		
	}

//Global variable initialization
   var s = chrome.storage.sync;
   
   var bucketNames = [] //bucketNames act as keys to buckets Objects
	//array of Buckets
	var arrBucket = [];
	
	
	//test code
	//addBucket("tom", "red", "bat");
	//addBucket("Jerry", "Blue", "cat");
	var testList = arrBucket;
	
	
   //load list of existing buckets.
   s.get('BucketList', function(data){
		arrBucket = data.BucketList;
		var n = arrBucket.length;
		console.log(arrBucket);
	});
	
	//more test code
	//console.log(arrBucket);
	//arrBucket[0].addProduct("url", 280.57, 2, "couch", "its alright");
	//var testProduct = arrBucket[0].getProductList();
	//console.log(testProduct);
	//console.log(arrBucket[0].getProduct(testProduct[0]));
	//s.set({'BucketList': arrBucket}, function(){})	
   
   //****************************************************************
	
	/**Adds a bucket to the list of buckets
	   @param {String} bucketName - name of Bucket
	   @param {color} color - color of bucket
	   @param {icon} icon - icon that represents bucket
	*/
	function addBucket(bucketName, color, icon){
		
		//declares Bucket object
		var bucket = new Bucket(bucketName, color, icon)	
		arrBucket.push(bucket);

	}
	/**Returns a list of buckets
		
	*/
	function getBuckets(){
		return arrBucket;
	}
	

	
