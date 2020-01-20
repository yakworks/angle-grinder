'use strict';
/**
 * A directive used for "close buttons" (eg: alert box).
 * It hides its parent node that has the class with the name of its value.
 */
app.directive('ctCrop', ['$uibModal',
function($uibModal) {
	return {
		restrict : 'E',
		scope : {
			options : "=cropOptions",
			labels : "=cropLabels",
			cropCallback : '&cropCallback',
			cancelCallback : '&cancelCallback',
			errorCallback : '&errorCallback'
		},
		template : '<div class="thumbnail crop-preview">' + '<div class="preview-wrapper">' + '<canvas class="canvasImg"></canvas>' + '</div>' + '<p class="no-margin"><a class="btn btn-info btn-block" ng-show="cropActive" ng-click="openCrop()"><i ng-show="textButton.icon" ng-class="textButton.icon" class="margin-right-10"></i>{{textButton.label}}</a></p>' + '</div>' + '</div>' + '<script type="text/ng-template" id="ModalCrop.html">' + '<div class="modal-header">' + '<h3 class="modal-title margin-right-30">{{optionsCrop.textLabels.modalTitle}}</h3>' + '<button class="btn btn-transparent btn-lg modal-close-button" type="button" ng-click="cancel()" uib-tooltip="{{optionsCrop.textLabels.cancelButton}}"><i ng-show="optionsCrop.textLabels.cancelIcon" ng-class="optionsCrop.textLabels.cancelIcon"></i></button>' + '<div class="crop-tools"><button class="btn btn-red btn-fit-image" uib-tooltip="{{optionsCrop.textLabels.fitButton}}"><i ng-class="optionsCrop.textLabels.fitIcon"></i></button></div>' + '</div>' + '<div class="modal-body modal-body-crop">' + '<div class="crop-image">' + '<div class="crop-wrapper load1 csspinner">' + '<div class="crop-active">' + '<img ng-src="{{optionsCrop.url}}" id="crop-target" alt="">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-primary" type="button" ng-click="ok()"><i ng-show="optionsCrop.textLabels.cropIcon" ng-class="optionsCrop.textLabels.cropIcon" class="margin-right-10"></i>{{optionsCrop.textLabels.cropButton}}</button>' + '</div>' + '</script>',
		link : function($scope, elem, attrs) {
			var cropObj, oldCropObj, oldOriginalCropObj, openModal = false, isCancel = false;
			$scope.$watch(function() {
				return $scope.options;
			}, function(newValue, oldValue) {

				if (!angular.equals(newValue, oldValue)) {

					if (newValue) {
						if ( typeof newValue.url !== "undefined" && newValue.url !== null) {

							if ($scope.tempOptions) {
								oldCropObj = $scope.tempOptions;
							} else {
								oldCropObj = oldValue;
							}
							if (!oldOriginalCropObj) {

								oldOriginalCropObj = oldValue;

							}

							cropObj = newValue;

							if (!isCancel) {
								$scope.tempOptions = null;
							}

							if (cropObj) {
								if (( typeof cropObj.autoOpenModal == 'undefined' || cropObj.autoOpenModal == null)) {
									openModal = true;
								} else {
									openModal = cropObj.autoOpenModal;
								}
								if ($scope.tempOptions) {
									if ($scope.tempOptions.url !== cropObj.url) {
										$scope.tempOptions = cropObj;
										isCancel = false;
										loadImage(openModal);

									} else {
										// $scope.tempOptions = cropObj;
										isCancel = true;
										loadImage(openModal);
									}

								} else {
									loadImage(openModal);

								}
							}
						}
					}
				}
			});

			cropObj = $scope.tempOptions ? $scope.tempOptions : $scope.options;

			$scope.textButton = {
				label : $scope.labels.modalButton.label ? $scope.labels.modalButton.label : "Modify",
				icon : $scope.labels.modalButton.icon ? $scope.labels.modalButton.icon : null,
			};

			var loadImage = function(e) {

				if (!e) {
					var nx, ny, nw, nh, width, height;

					var previewToLoad = new Image(), isError = false, errorType;

					previewToLoad.src = cropObj.url;
					angular.element(previewToLoad).bind('load', function() {
						if (previewToLoad.width < cropObj.cropMinWidth) {
							errorType = 'error-width';
							isError = true;
						} else if (previewToLoad.height < cropObj.cropMinHeight) {
							errorType = 'error-height';
							isError = true;
						}
						if (isError) {
							if ($scope.options == oldOriginalCropObj) {
								isCancel = false;

							} else {
								if (oldCropObj) {

									$scope.tempOptions = oldCropObj;

									$scope.options = oldOriginalCropObj;

									oldCropObj = null;
									isCancel = true;
								} else {
									if (!$scope.tempOptions)
										delete $scope.options;
								}
							}

							$scope.optionsCrop = $scope.options;
							if (angular.isDefined(attrs.errorCallback)) {
								var expressionHandler = $scope.errorCallback();
								expressionHandler(errorType);
							}

						} else {
							$scope.cropActive = true;
							cropObj.cropWidth = cropObj.cropWidth ? cropObj.cropWidth : 200;
							cropObj.cropHeight = cropObj.cropHeight ? cropObj.cropHeight : 200;
							if (( typeof cropObj.newWidth == 'undefined' || cropObj.newWidth == null)) {
								width = cropObj.cropWidth;
								height = width * previewToLoad.height / previewToLoad.width;
							} else {
								width = cropObj.newWidth;
								height = width * previewToLoad.height / previewToLoad.width;
							}

							if (cropObj.cropHeight > height) {
								height = parseInt(cropObj.cropHeight);
								width = Math.round(height * previewToLoad.width / previewToLoad.height);
							}

							nx = previewToLoad.width * cropObj.cropX / width;
							ny = previewToLoad.height * cropObj.cropY / height;
							nw = previewToLoad.width * cropObj.cropWidth / width;
							nh = previewToLoad.height * cropObj.cropHeight / height;

							elem.find(".crop-preview").removeClass("load1 csspinner");

							var imageObj = previewToLoad;
							var canvas = elem.find(".canvasImg")[0];
							canvas.width = cropObj.cropWidth;
							canvas.height = cropObj.cropHeight;
							var context = canvas.getContext("2d");
							context.drawImage(imageObj, nx, ny, nw, nh, 0, 0, canvas.width, canvas.height);

							$scope.tempOptions = cropObj;
							$scope.tempOptions.newWidth = Math.round(width);
							$scope.tempOptions.newHeight = Math.round(height);

							if (( typeof cropObj.autoOpenModal !== 'undefined' && cropObj.autoOpenModal !== null)) {
								cropObj.originalWidth = previewToLoad.width;
								cropObj.originalHeight = previewToLoad.height;
								if (cropObj.autoOpenModal == false) {
									oldOriginalCropObj = cropObj;
									oldCropObj = null;
									var expressionHandler = $scope.cropCallback();
									expressionHandler(cropObj);
									$scope.$apply();
								}

							}
						}
					});
				} else {
					if (!isCancel) {
						$scope.openCrop();
					}
				}
				isCancel = false;
				openModal = false;

			};

			if (( typeof cropObj !== 'undefined' && cropObj !== null)) {
				if (( typeof cropObj.url !== 'undefined' && cropObj.url !== null))
					loadImage();
			}

			$scope.openCrop = function() {
				isCancel = false;
				cropObj = $scope.tempOptions ? $scope.tempOptions : $scope.options;

				$scope.optionsCrop = {
					textLabels : {
						modalTitle : $scope.labels.modalTitle ? $scope.labels.modalTitle : "Crop Image",
						modalButton : $scope.labels.modalButton.label ? $scope.labels.modalButton.label : "Modify",
						modalIcon : $scope.labels.modalButton.icon ? $scope.labels.modalButton.icon : null,
						cropButton : $scope.labels.cropButton.label ? $scope.labels.cropButton.label : "Ok",
						cropIcon : $scope.labels.cropButton.icon ? $scope.labels.cropButton.icon : null,
						cancelButton : $scope.labels.cancelButton.label ? $scope.labels.cancelButton.label : "Cancel",
						cancelIcon : $scope.labels.cancelButton.icon ? $scope.labels.cancelButton.icon : null,
						fitButton : $scope.labels.fitButton.label ? $scope.labels.fitButton.label : "Cancel",
						fitIcon : $scope.labels.fitButton.icon ? $scope.labels.fitButton.icon : "fa fa-compress"
					},
					url : cropObj.url,
					cropX : cropObj.cropX ? cropObj.cropX : 0,
					cropX2 : (( typeof cropObj.cropWidth !== 'undefined' || cropObj.cropWidth !== null) || ( typeof cropObj.cropX !== 'undefined' || cropObj.cropX !== null)) ? parseInt(cropObj.cropX + cropObj.cropWidth) : 100,
					cropY : cropObj.cropY ? cropObj.cropY : 0,
					cropY2 : (( typeof cropObj.cropHeight !== 'undefined' || cropObj.cropHeight !== null) || ( typeof cropObj.cropY !== 'undefined' || cropObj.cropY !== null)) ? parseInt(cropObj.cropY + cropObj.cropHeight) : 100,
					cropWidth : cropObj.cropWidth ? cropObj.cropWidth : 100,
					cropHeight : cropObj.cropHeight ? cropObj.cropHeight : 100,
					cropMaxWidth : cropObj.cropMaxWidth ? cropObj.cropMaxWidth : 0,
					cropMaxHeight : cropObj.cropMaxHeight ? cropObj.cropMaxHeight : 0,
					cropMinWidth : cropObj.cropMinWidth ? cropObj.cropMinWidth : 0,
					cropMinHeight : cropObj.cropMinHeight ? cropObj.cropMinHeight : 0,
					newWidth : cropObj.newWidth ? cropObj.newWidth : 0,
					newHeight : cropObj.newHeight ? cropObj.newHeight : 0
				};
				var modalInstance = $uibModal.open({
					animation : false,
					backdrop : 'static',
					templateUrl : 'ModalCrop.html',
					controller : 'ModalCropCtrl',
					size : 'lg',
					resolve : {
						crop : function() {

							return $scope.optionsCrop;
						}
					}
				});
				modalInstance.result.then(function(cropItem) {

					if (cropItem == 'error-width' || cropItem == 'error-height') {
						if ($scope.options == oldOriginalCropObj) {
							isCancel = false;

						} else {
							if (oldCropObj) {

								$scope.tempOptions = oldCropObj;

								$scope.options = oldOriginalCropObj;

								oldCropObj = null;
								isCancel = true;
							} else {
								if (!$scope.tempOptions)
									delete $scope.options;
							}
						}

						$scope.optionsCrop = $scope.options;
						if (angular.isDefined(attrs.errorCallback)) {
							var expressionHandler = $scope.errorCallback();
							expressionHandler(cropItem);
						}
					} else {

						$scope.cropActive = true;

						$scope.tempOptions = cropItem;
						var nx, ny, nw, nh;
						var imageToCrop = new Image();
						nx = cropItem.originalWidth * cropItem.cropX / cropItem.newWidth;
						ny = cropItem.originalHeight * cropItem.cropY / cropItem.newHeight;
						nw = cropItem.originalWidth * cropItem.cropWidth / cropItem.newWidth;
						nh = cropItem.originalHeight * cropItem.cropHeight / cropItem.newHeight;

						imageToCrop.src = cropObj.url;
						var imageObj = imageToCrop;
						var canvas = elem.find(".canvasImg")[0];
						canvas.width = cropItem.cropWidth;
						canvas.height = cropItem.cropHeight;
						var context = canvas.getContext("2d");
						context.drawImage(imageObj, nx, ny, nw, nh, 0, 0, canvas.width, canvas.height);

						var expressionHandler = $scope.cropCallback();
						delete cropItem.textLabels;
						expressionHandler(cropItem);
						isCancel = false;
						oldCropObj = null;
						oldOriginalCropObj = null;
					}
				}, function() {

					if ($scope.options == oldOriginalCropObj) {
						isCancel = false;

					} else {
						if (oldCropObj) {

							$scope.tempOptions = oldCropObj;

							$scope.options = oldOriginalCropObj;

							oldCropObj = null;
							isCancel = true;
						} else {
							if (!$scope.tempOptions)
								delete $scope.options;
						}
					}

					$scope.optionsCrop = $scope.options;

					if (angular.isDefined(attrs.cancelCallback)) {
						var expressionHandler = $scope.cancelCallback();
						expressionHandler();
					}

				});
			};

		}
	};
}]);
app.controller('ModalCropCtrl', function($scope, $uibModalInstance, $compile, $window, crop) {
	$scope.optionsCrop = crop;
	angular.element(".crop-wrapper").addClass("load1 csspinner");
	var imageToLoad = new Image();

	imageToLoad.src = $scope.optionsCrop.url;
	angular.element(imageToLoad).bind('load', function() {

		if (imageToLoad.width < $scope.optionsCrop.cropMinWidth) {

			$uibModalInstance.close('error-width');

		} else if (imageToLoad.height < $scope.optionsCrop.cropMinHeight) {

			$uibModalInstance.close('error-height');

		} else {

			angular.element(".crop-wrapper").removeClass("load1 csspinner");

			$scope.optionsCrop.originalWidth = imageToLoad.width;
			$scope.optionsCrop.originalHeight = imageToLoad.height;
			var boxWidth = 850, newWidth, newHeight, startPoint = $scope.optionsCrop.cropMinWidth ? $scope.optionsCrop.cropMinWidth : 1, startPointWidth, startPointHeight;

			if (boxWidth < $scope.optionsCrop.cropMinWidth)
				boxWidth = $scope.optionsCrop.cropMinWidth;
			startPointWidth = startPoint;
			startPointHeight = imageToLoad.height * startPointWidth / imageToLoad.width;

			if (startPointHeight < $scope.optionsCrop.cropMinHeight) {
				startPointHeight = $scope.optionsCrop.cropMinHeight;
				startPointWidth = imageToLoad.width * startPointHeight / imageToLoad.height;

			}
			startPoint = Math.round(startPointWidth);

			if ($scope.optionsCrop.newWidth == 0) {
				if (imageToLoad.width > boxWidth) {

					newWidth = Math.round(boxWidth);
					newHeight = Math.round(newWidth * imageToLoad.height / imageToLoad.width);

					if ($scope.optionsCrop.cropMinHeight > newHeight) {
						newHeight = $scope.optionsCrop.cropMinHeight;
						newWidth = Math.round(newHeight * imageToLoad.width / imageToLoad.height);
						//startPoint = newWidth;
					}

				} else {
					newWidth = Math.round(imageToLoad.width);
					newHeight = Math.round(imageToLoad.height);

				}

			} else {
				newWidth = Math.round($scope.optionsCrop.newWidth);
				newHeight = Math.round(newWidth * imageToLoad.height / imageToLoad.width);

			}
			//if ($window.innerWidth <= newWidth) {
			//    newWidth = $window.innerWidth-60;
			//    newHeight = Math.round(newWidth * imageToLoad.height / imageToLoad.width);
			//}
			$scope.optionsCrop.newWidth = Math.round(newWidth);
			$scope.optionsCrop.newHeight = Math.round(newHeight);
			var resizeImage = function(value) {
				$scope.jcrop_api.destroy();
				var width = value;
				var height = Math.round(width * $scope.optionsCrop.originalHeight / $scope.optionsCrop.originalWidth);
				$scope.optionsCrop.newWidth = Math.round(width);
				$scope.optionsCrop.newHeight = Math.round(height);
				//$('#crop_target').width(width);
				initJcrop(width, height);

			};

			$scope.slider = {
				value : newWidth,
				options : {
					from : startPoint,
					to : $scope.optionsCrop.originalWidth,
					step : 1,
					dimension : " px",
					className : "clip-slider",
					smooth : true,
					css : {
						background : {
							"background-color" : "silver"
						},
						before : {
							"background-color" : "#58748B"
						}, // zone before default value
						after : {
							"background-color" : "#58748B"
						} // zone after default value
					},
					callback : function(value, released) {
						resizeImage(value);
					}
				}
			};

			angular.element(".btn-fit-image").on("mousedown touchstart", function() {
				$scope.slider.value = startPoint;
				resizeImage(startPoint);
				$scope.$apply();
			});

			var sliderDirective = angular.element('<input ng-model="slider.value" type="text" slider options="slider.options">');
			$(".crop-tools").append(sliderDirective);
			$compile(sliderDirective)($scope);

			var initJcrop = function(w, h) {
				var maxW = $scope.optionsCrop.cropMaxWidth, maxH = $scope.optionsCrop.cropMaxHeight, minW = $scope.optionsCrop.cropMinWidth, minH = $scope.optionsCrop.cropMinHeight, allowResize = true;
				if (maxW == 0) {
					maxW = $scope.optionsCrop.originalWidth;
				}
				if (maxH == 0) {
					maxH = $scope.optionsCrop.originalHeight;
				}
				if (minW > maxW) {
					minW = maxW;
				}
				if (minH > maxH) {
					minH = maxH;
				}

				if (minW == maxW && minH == maxH) {
					allowResize = false;
				}

				$('#crop-target').Jcrop({
					boxWidth : w,
					boxHeight : h,
					allowResize : allowResize,
					onChange : showCoords,
					onSelect : showCoords,
					bgColor : 'black',
					bgOpacity : .4,
					setSelect : [$scope.optionsCrop.cropX, $scope.optionsCrop.cropY, $scope.optionsCrop.cropX2, $scope.optionsCrop.cropY2],
					minSize : [minW, minH],
					maxSize : [maxW, maxH],
					trueSize : [w, h],
					allowSelect : false
				}, function() {
					$scope.jcrop_api = this;
				});
			};

			var showCoords = function(c) {
				$scope.optionsCrop.cropX = Math.round(c.x);
				$scope.optionsCrop.cropX2 = Math.round(c.x2);
				$scope.optionsCrop.cropY = Math.round(c.y);
				$scope.optionsCrop.cropY2 = Math.round(c.y2);
				$scope.optionsCrop.cropWidth = Math.round(c.w);
				$scope.optionsCrop.cropHeight = Math.round(c.h);
			};

			initJcrop(newWidth, newHeight);
		}
	});

	$scope.ok = function() {
		$scope.selected = {
			item : $scope.optionsCrop
		};

		$uibModalInstance.close($scope.selected.item);
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
