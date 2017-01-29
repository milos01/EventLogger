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

		retVal.saveNewEvent = function(obj,ap){
			var ev = {
				"data":obj.data,
				"stack":obj.stack,
				"event_type":obj.event_type,
				"fragment":obj.fragment,
				"app_version": ap.version
			}
			return Restangular.one('application',ap._id).all('event').post(ev).then(function(res){
				return res;
			});
		}

		return retVal;
	})

})(angular);