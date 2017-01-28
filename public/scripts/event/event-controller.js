(function(angular){


	app.controller('eventlCtrl',function(EventResource,$stateParams,ApplicationResource,$uibModal){

		var vm = this;

		var ida = $stateParams.appId;
		
		EventResource.getEventsByIdApp(ida).then(function(res){
			console.log(res);
			vm.eventList = res;
		});

		ApplicationResource.getAppById(ida).then(function(res){
			vm.application = res;
		});
		vm.filterEvents = "All";


		vm.openListUserModal = function(ida) {
			console.log("aaaaa");
        	var modalInstance = $uibModal.open({
        	   // parent:'home',
        	   templateUrl: '/views/modals/userListModal.html',
        	   controller: 'UserListModalCtrl as vm',  
        	   resolve: {
        	      ida: function() {
        	      return ida;
        	      }
        	   }
        	});
        };
	});
	
    app.controller('UserListModalCtrl',['ida','$uibModalInstance','ApplicationResource',function(ida,$uibModalInstance,ApplicationResource) {
		var vm = this;
		
		ApplicationResource.getAppById(ida).then(function(res){
			vm.application = res;
			vm.listUsers = vm.application.users;
			console.log(vm.listUsers);

		});

		vm.cancel = function() {
			// console.log("cancel");
			$uibModalInstance.dismiss('cancel');
		};
	}]);

})(angular);