(function(){
	
	app.factory('ApplicationResource',function(Restangular){
		
		var retVal = {};
		
		retVal.getAllApps = function(uid){
			return Restangular.one('user', uid).all('oapplication').getList().then(function(items){
				return items;
			});
		}

		return retVal;
	})
	
})();