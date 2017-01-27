(function(angular){
	
		app.factory('EventResource',function(Restangular){

		var retVal = {};

		
// /application/:aid/event
		retVal.getEventsByIdApp =  function(ida){
			console.log(ida);
			return Restangular.one('application',ida).all('event').getList().then(function(response){
				return response;
			});
		}


		return retVal;
	})

})(angular);