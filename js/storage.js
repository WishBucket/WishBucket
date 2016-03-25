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
			var temp = new Product(url, price, quantity, productName, comment)
			this.products.push(temp);
			return temp;
		};

		this.getProduct = function(product){
			return this.products.find(product);
		};
		this.removeProduct = function(product){
			var index = this.products.indexOf(product)
			if(index == -1){
				return this.products.splice(index, 1);
			}
			else{
				console.log("Can't remove product; not found in array");
			}
		};
		this.addProductList = function(productList){
			this.products = productList;
		};
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

	arrBucket[0].addProduct("www.amazon.com", 280.57, 2, "couch", "its alright");
	arrBucket[1].addProduct("url", 10.27, 1, "Steak", "Online meat seams like a good idea");
	arrBucket[1].addProduct("url", 12.92, 5, "Camera", "Super cheap");
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

	function saveChanges(){
		s.set({'BucketList': arrBucket}, function(){});
	}

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

	function clearMem(){
		s.clear();
	}

	function removeBucket(bucket){
			try{
				if(arrBucket.length == 0){
					console.log("No buckets in the array to remove");
				}
				var index = arrBucket.indexOf(bucket);
				arrBucket.splice(index, 1);
			}
			catch(err){
				console.log(err + " :arrBucket object is null or non computable");
			}
	}
