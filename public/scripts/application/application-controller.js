(function () {
	app.controller('applicaitonCtrl', function(meanData, ApplicationResource){
		var vm = this;

		meanData.getLoggedUser().then(function(user) {
		   	 ApplicationResource.getAllApps(user.data._id).then(function(items){
		   	 		vm.applications = items;
		   	 });
		}, function (e) {
		      console.log(e);
		});
	});
})();