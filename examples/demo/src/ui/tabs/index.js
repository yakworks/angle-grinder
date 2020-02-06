import angular from 'angular'
import Swal from 'sweetalert2'

angular.module('app').controller('TabsDemoCtrl', function($scope) {
	$scope.tabs = [{
		title : 'Dynamic Title 1',
		content : 'Dynamic content 1'
	}, {
		title : 'Dynamic Title 2',
		content : 'Dynamic content 2',
		disabled : false
	}];

	$scope.alertMe = function() {
		setTimeout(function() {
			Swal.fire({
				title : 'You\'ve selected the alert tab!',
				confirmButtonColor : '#007AFF'
			});
		});
	};
})
