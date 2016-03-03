//Global variable initialization
   
   var s = chrome.storage.sync;
   
   var bucketNames = [] //bucketNames act as keys to buckets Objects
	//array of Buckets
	var arrBucket = [];
	
	//test
	/*
	addBucket("tom", "red", "bat");
	 addBucket("Jerry", "Blue", "cat")
	var testList = arrBucket;
	*/
	
   //load list of existing buckets.
   s.get('BucketList', function(data){
		arrBucket = data.BucketList;
		var n = arrBucket.length;
		
	});
	
   
   //****************************************************************
	
	/**Adds a bucket to the list of buckets
	   @param {String} bucketName - name of Bucket
	   @param {color} color - color of bucket
	   @param {icon} icon - icon that represents bucket
	   @return {bool} returns true if bucket is successfully made
	*/
	function addBucket(bucketName, color, icon){
		
		
		//declares Bucket object
		var Bucket = new Object(),
			name,
			color,
			icon,
			products;
			
		
	    Bucket.name = bucketName;
		Bucket.color = color;
		Bucket.icon = icon;
		Bucket.products = [];
		
		arrBucket.push(Bucket);
		
		return true;
	}
	/**Returns a list of buckets
		
	*/
	function getBuckets(){
		return arrBucket;
	}
	
