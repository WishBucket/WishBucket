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

//Prototype Bucket Object
	function Bucket(name, color, icon){
		this.name = name;
		this.color = color;
		this.icon = icon;
		this.products = new Array();

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
			try{
				//check that varaibles are defined
				if(typeof url != 'undefined' && typeof price != 'undefined' && typeof quantity != 'undefined' && typeof productName != 'undefined' && typeof comment != 'undefined'){
					//checks that quanitity is a number
					//Does not check price because price could exist as a string depending on implementation
					if(!isNaN(quantity)){
						var temp = new Product(url, price, quantity, productName, comment)
						this.products.push(temp);
						return temp;
					}
				}
			}
			catch(err){
				console.log("Error: " + err + " in addProduct function");
			}

		};

		this.getProduct = function(product){
			return this.products.find(product);
		};
		/**Removes product from productList

			@param {Product} - product to be removed
			@return - the product removed, or null if no product removed
		*/
		this.removeProduct = function(product){
			if(typeof product != 'undefined'){
				var index = this.products.indexOf(product)
				if(index != -1){
					return this.products.splice(index, 1);
				}
				else{
					return null;
				}
			}
		};
		/*Adds a new Product List
		  @param {Array} - list of Products
		*/
		this.addProductList = function(productList){
			this.products = productList;
		};
		/*Removes all products from the Bucket

		*/
		this.clearProducts = function(){
			this.products = {};
		};
	}

//Global variable initialization
   var s = chrome.storage.sync;
	 var loadComplete = false;
	//array of Buckets
	var arrBucket = [];

	//test code
	addBucket("tom", "red", "account_balance");
	addBucket("Jerry", "blue", "grade");

	arrBucket[0].addProduct("http://ecx.images-amazon.com/images/I/31IGXQAOw8L.jpg", 24.99, 2, "Canon ES71II Lens Hood for EF 50mm f/1.4 SLR Lens", "its alright");
	arrBucket[1].addProduct("http://ecx.images-amazon.com/images/I/51Lo6eQGclL.jpg", 10.27, 1, "Steak", "Online meat seams like a good idea");
	arrBucket[1].addProduct("http://ecx.images-amazon.com/images/I/91J4beN4sEL._SX522_.jpg", 12.92, 5, "Camera", "Super cheap");
	saveChanges();
   //load list of existing buckets.

	//clearMem();
   s.get('BucketList', function(data){
		arrBucket = data.BucketList;

		//bucketify();
		console.log(arrBucket);
		loadComplete = true;
	});


   //****************************************************************

	/**Adds a bucket to the list of buckets
	   @param {String} bucketName - name of Bucket
	   @param {color} color - color of bucket
	   @param {icon} icon - icon that represents bucket
	*/
	function addBucket(bucketName, color, icon){

		//declares Bucket object
		var bucket = new Bucket(bucketName, color, icon);
		arrBucket.push(bucket);

	}
	/**Returns a list of buckets

	*/
	function getBuckets(){
		return arrBucket;
	}
	/*Saves changes to arrBucket. Must be called before session
	  closes in order to make changes permanent
	*/
	function saveChanges(){
		s.set({'BucketList': arrBucket}, function(){});
	}

	/*Makes array arrBucket into an array of Bucket objects
	  after being loaded. If this is not called then the
	  objects loaded will be plain Objects with only the
	  properties of the Bucket, but not the behavior.
	*/
	function bucketify(){
		try{
			if(arrBucket != null){
				var arrayLength = arrBucket.length;
				for(var i = 0; i < arrayLength; i++){
					var temp = new Bucket(arrBucket[i].name, arrBucket[i].color, arrBucket[i].icon);
					temp.addProductList(arrBucket.products);
					arrBucket.splice(i, 1, temp);
				}
			}

		}
		catch(err){
			console.log(err + " :error in bucketify(). Check that arrBucket is computable");
		}

	}

	/*Clears all objects from memory.

	*/
	function clearMem(){
		s.clear();
	}

	/*Removes a bucket from arrBucket.

	  @param {Bucket} - Bucket to be removed
	  @return - removed Bucket or null if Bucket could not be removed
	*/
	function removeBucket(bucket){
			try{
				if(arrBucket.length == 0){
					console.log("No buckets in the array to remove");
				}
				var index = arrBucket.indexOf(bucket);
				if(index != -1){
					return arrBucket.splice(index, 1);
				}
				else{
					return null;
				}
			}
			catch(err){
				console.log(err + " :arrBucket object is null or non computable");
			}
	}
