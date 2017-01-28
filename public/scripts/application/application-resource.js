(function(){
	
	app.factory('ApplicationResource',function(Restangular){
		
		var retVal = {};
		
		retVal.getAllApps = function(uid){
			return Restangular.one('user', uid).all('oapplication').getList().then(function(items){
				return items;
			});
		}

		retVal.getAppById = function(ida){
			
			return Restangular.one('application', ida).get().then(function(response){
				return response;
			});
		}
		return retVal;
	})
	
})();