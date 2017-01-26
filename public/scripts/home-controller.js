(function () {
	app.controller('homeCtrl', function(authentication, $location){
		 var vm = this;

		  vm.credentials = {
		    email : "",
		    password : ""
		  };

		  vm.onSubmit = function () {
		    authentication
		    .login(vm.credentials)
		    .then(function(){
		      $location.path('profile');
		    });
		  };
	});

	app.controller('profileCtrl', function($location, meanData, authentication){
		if(authentication.isLoggedIn()){
		  var vm = this;
		  vm.user = {};

		  meanData.getLoggedUser()
		    .then(function(user) {
		      vm.user = {
		      	email: user.data.email,
		      	first_name: user.data.first_name,
		      	last_name: user.data.last_name
		   	 	}
		    }, function (e) {
		      console.log(e);
		    });

		    vm.onLogout = function(){
		    	authentication.logout();
		    	$location.path('/');
		    }
		 }else{
		 	$location.path('/');
		 }
	});
})();