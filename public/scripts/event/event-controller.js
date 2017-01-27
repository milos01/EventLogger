(function(angular){


	app.controller('eventlCtrl',function(EventResource,$stateParams){

		var vm = this;

		var ida = $stateParams.appId;
		
		EventResource.getEventsByIdApp(ida).then(function(res){
			console.log(res);
			vm.eventList = res;
		});

	});
	
})(angular);