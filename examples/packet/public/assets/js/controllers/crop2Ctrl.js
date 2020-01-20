'use strict';
/**
 * controller for ngImgCrop
 * Simple Image Crop directive for AngularJS.
 */
app.controller('Crop2Ctrl', ["$scope", "$uibModal",
function($scope, $uibModal) {

	$scope.options = {
		url : "https://static.pexels.com/photos/105587/pexels-photo-105587.jpeg",
		cropX : 0,
		cropY : 0,
		cropWidth : 633,
		cropHeight : 313,
		cropMaxWidth : 833,
		cropMaxHeight : 813,
		cropMinWidth : 300,
		cropMinHeight : 300,
		autoOpenModal : true
	};

	$scope.labels = {
		modalTitle : "Resize and crop image",
		modalButton : {
			label : "modify",
			icon : "fa fa-picture-o"
		},
		cropButton : {
			label : "Crop Image",
			icon : "fa fa-scissors"
		},
		cancelButton : {
			label : "Close",
			icon : "fa fa-times"
		},
		fitButton : {
			label : "minimize image size",
			icon : "fa fa-compress"
		}
	};

	$scope.updateCrop = function(cropItem) {
		if (cropItem) {
			$scope.isCrop = true;
			$scope.cropItem = cropItem;
		}
	};
	$scope.ch = 0;
	$scope.changeImg = function() {
		if ($scope.ch == 0) {
			$scope.options = {
				url : "https://static.pexels.com/photos/105587/pexels-photo-105587.jpeg",
				cropX : 0,
				cropY : 0,
				cropWidth : 633,
				cropHeight : 313,
				cropMaxWidth : 833,
				cropMaxHeight : 813,
				cropMinWidth : 300,
				cropMinHeight : 300,
				autoOpenModal : true
			};
		} else if ($scope.ch == 1) {
			$scope.options = {
				url : "https://static.pexels.com/photos/39493/animals-cat-girl-happiness-39493.jpeg",
				cropX : 0,
				cropY : 0,
				cropWidth : 633,
				cropHeight : 313,
				cropMaxWidth : 833,
				cropMaxHeight : 813,
				cropMinWidth : 300,
				cropMinHeight : 300,
				autoOpenModal : true
			};
		} else {
			$scope.options = {
				url : "https://static.pexels.com/photos/9229/animal-pet-eyes-cat.jpg",
				cropX : 0,
				cropY : 0,
				cropWidth : 633,
				cropHeight : 313,
				cropMaxWidth : 833,
				cropMaxHeight : 813,
				cropMinWidth : 300,
				cropMinHeight : 300,
				autoOpenModal : false
			};
		}
	};

}]);
