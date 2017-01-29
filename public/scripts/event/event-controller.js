(function(angular){


	app.controller('eventlCtrl',function(EventResource,$stateParams,ApplicationResource,$uibModal,filterFilter,$scope){

		var vm = this;

		var ida = $stateParams.appId;
		
		// vm.fragmentNames = [];

		EventResource.getEventsByIdApp(ida).then(function(res){
			
			$scope.eventList = res;
	
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
			return filterFilter($scope.eventList, {fragment:f}).length;
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

        vm.openEventModal = function(appl) {
        	var modalInstance = $uibModal.open({
        	   // parent: 'applicationProf',
        	   templateUrl: '/views/modals/newEventModal.html',
        	   controller: 'eventModalCtrl as vm',
        	   scope: $scope, 
        	   resolve: {
        	      appl: function() {
        	      return appl;
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

    app.controller('eventModalCtrl',['appl','$uibModalInstance','EventResource','$scope',function(appl,$uibModalInstance,EventResource,$scope) {
		var vm = this;
		
		vm.ap = appl;
		vm.dnsError = false;
		vm.yes = function(){
			console.log(vm.dns +" aaaaaaaaaa");
			EventResource.saveNewEvent(vm,vm.ap).then(function(res){
				console.log(res);
				if (res.fild==true){
					vm.dnsError = true;
				}
				else{
					$scope.eventList.push(res.events[res.events.length-1]);
					$uibModalInstance.dismiss('cancel');
				}
			});
			// $uibModalInstance.dismiss('cancel');
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