(function(angular){


	app.controller('eventlCtrl',function(EventResource,$stateParams,ApplicationResource,$uibModal,filterFilter){

		var vm = this;

		var ida = $stateParams.appId;
		
		// vm.fragmentNames = [];

		EventResource.getEventsByIdApp(ida).then(function(res){
			
			vm.eventList = res;
	
			// for(ev in vm.eventList){
			// 	vm.eventTypes = vm.eventList[ev].fragment.split('&')[0];
			// 	if (!(vm.eventList[ev].fragment.split('&')[1] in vm.fragmentNames)) {
			// 		console.log("usao");
   // 					 vm.fragmentNames.push(vm.eventList[ev].fragment.split('&')[1]);
			// 	}
			// 	console.log(vm.fragmentNames);
			// }
		});

		ApplicationResource.getAppById(ida).then(function(res){
			vm.application = res;
		});
		vm.filterEvents = "All";

		vm.appVersions = "All";

		// vm.filterNames = "All";

		vm.getCount = function(f){
			return filterFilter(vm.eventList, {fragment:f}).length;
		}

		vm.getVersionList = function(version){
			vm.appVersions = version;
			console.log(version);
		}

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

        vm.openDeleteModal = function(ida) {
        	var modalInstance = $uibModal.open({
        	   templateUrl: '/views/modals/deleteAppModal.html',
        	   controller: 'deleteModalCtrl as vm',  
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

    app.controller('deleteModalCtrl',['ida','$uibModalInstance','ApplicationResource',function(ida,$uibModalInstance,ApplicationResource) {
		var vm = this;
		
		vm.yes = function(){
			alert(ida);
			$uibModalInstance.dismiss('cancel');
		}

		vm.cancel = function() {
			// console.log("cancel");
			$uibModalInstance.dismiss('cancel');
		};
	}]);

	app.filter('unique', function() {
	   return function(collection, keyname) {
	      var output = [], 
	          keys = [];

	      angular.forEach(collection, function(item) {
	          var key = item[keyname];
	          if(keys.indexOf(key) === -1) {
	              keys.push(key);
	              output.push(item);
	          }
	      });

	      return output;
	   };
	});

})(angular);