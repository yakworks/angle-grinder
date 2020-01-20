'use strict';
/**
 * controllers for UI Bootstrap components
 */
app.controller('AlertDemoCtrl', ["$scope",
function($scope) {
	$scope.alerts = [{
		type : 'danger',
		msg : 'Oh snap! Change a few things up and try submitting again.'
	}, {
		type : 'success',
		msg : 'Well done! You successfully read this important alert message.'
	}];

	$scope.addAlert = function() {
		$scope.alerts.push({
			msg : 'Another alert!'
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
}]).controller('ButtonsCtrl', ["$scope",
function($scope) {
	$scope.singleModel = 1;

	$scope.radioModel = 'Middle';

	$scope.checkModel = {
		left : false,
		middle : true,
		right : false
	};
}]).controller('ProgressDemoCtrl', ["$scope",
function($scope) {
	$scope.max = 200;

	$scope.random = function() {
		var value = Math.floor((Math.random() * 100) + 1);
		var type;

		if (value < 25) {
			type = 'success';
		} else if (value < 50) {
			type = 'info';
		} else if (value < 75) {
			type = 'warning';
		} else {
			type = 'danger';
		}

		$scope.showWarning = (type === 'danger' || type === 'warning');

		$scope.dynamic = value;
		$scope.type = type;
	};
	$scope.random();

	$scope.randomStacked = function() {
		$scope.stacked = [];
		var types = ['success', 'info', 'warning', 'danger'];

		for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
			var index = Math.floor((Math.random() * 4));
			$scope.stacked.push({
				value : Math.floor((Math.random() * 30) + 1),
				type : types[index]
			});
		}
	};
	$scope.randomStacked();
}]).controller('TooltipDemoCtrl', ["$scope",
function($scope) {
	$scope.dynamicTooltip = 'I am a dynamic Tooltip text';
	$scope.dynamicTooltipText = 'I am a dynamic Tooltip Popup text';
	$scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
}]).controller('PopoverDemoCtrl', ["$scope",
function($scope) {
	$scope.dynamicPopover = 'Hello, World!';
	$scope.dynamicPopoverTitle = 'Title';
	$scope.popoverType = 'bottom';
}]).controller('PaginationDemoCtrl', ["$scope", "$log",
function($scope, $log) {
	$scope.totalItems = 64;
	$scope.currentPage = 4;

	$scope.setPage = function(pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() {
		$log.log('Page changed to: ' + $scope.currentPage);
	};

	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
}]).controller('RatingDemoCtrl', ["$scope",
function($scope) {
	$scope.rate = 7;
	$scope.max = 10;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.ratingStates = [{
		stateOn : 'glyphicon-ok-sign',
		stateOff : 'glyphicon-ok-circle'
	}, {
		stateOn : 'glyphicon-star',
		stateOff : 'glyphicon-star-empty'
	}, {
		stateOn : 'glyphicon-heart',
		stateOff : 'glyphicon-ban-circle'
	}, {
		stateOn : 'glyphicon-heart'
	}, {
		stateOff : 'glyphicon-off'
	}];
}]).controller('DropdownCtrl', ["$scope", "$log",
function($scope, $log) {
	$scope.items = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

	$scope.status = {
		isopen : false
	};

	$scope.toggled = function(open) {
		$log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
}]).controller('TabsDemoCtrl', ["$scope", "SweetAlert",
function($scope, SweetAlert) {
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
			SweetAlert.swal({
				title : 'You\'ve selected the alert tab!',
				confirmButtonColor : '#007AFF'
			});
		});
	};
}]).controller('AccordionDemoCtrl', ["$scope",
function($scope) {
	$scope.oneAtATime = true;

	$scope.groups = [{
		title : 'Dynamic Group Header - 1',
		content : 'Dynamic Group Body - 1'
	}, {
		title : 'Dynamic Group Header - 2',
		content : 'Dynamic Group Body - 2'
	}];

	$scope.items = ['Item 1', 'Item 2', 'Item 3'];

	$scope.addItem = function() {
		var newItemNo = $scope.items.length + 1;
		$scope.items.push('Item ' + newItemNo);
	};

	$scope.status = {
		isFirstOpen : true,
		isFirstDisabled : false
	};
}]).controller('DatepickerDemoCtrl', ["$scope", "$log",
function($scope, $log) {
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();
	$scope.start = $scope.minDate;
	$scope.end = $scope.maxDate;
	
	$scope.clear = function() {
		$scope.dt = null;
	};
	$scope.datepickerOptions = {
		showWeeks : false,
		startingDay : 1
	};
	$scope.dateDisabledOptions = {
		dateDisabled : disabled,
		showWeeks : false,
		startingDay : 1
	};
	$scope.startOptions = {
		showWeeks : false,
		startingDay : 1,
		minDate: $scope.minDate,
		maxDate: $scope.maxDate
	};
	$scope.endOptions = {
		showWeeks : false,
		startingDay : 1,
		minDate: $scope.minDate,
		maxDate: $scope.maxDate
	};
	// Disable weekend selection
	function disabled(data) {
		var date = data.date, mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	}


	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};
	$scope.toggleMin = function() {
		$scope.datepickerOptions.minDate = $scope.datepickerOptions.minDate ? null : new Date();
		$scope.dateDisabledOptions.minDate = $scope.dateDisabledOptions.minDate ? null : new Date();
	};
	$scope.maxDate = new Date(2020, 5, 22);
	$scope.minDate = new Date(1970, 12, 31);
	
	$scope.open = function() {
		$scope.opened = !$scope.opened;
	};
	
	
	$scope.endOpen = function() {
		$scope.endOptions.minDate = $scope.start;
		$scope.startOpened = false;
		$scope.endOpened = !$scope.endOpened;
	};
	$scope.startOpen = function() {
		$scope.startOptions.maxDate = $scope.end;
		$scope.endOpened = false;
		$scope.startOpened = !$scope.startOpened;
	};

	$scope.dateOptions = {
		formatYear : 'yy',
		startingDay : 1
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

	$scope.hstep = 1;
	$scope.mstep = 15;

	// Time Picker
	$scope.options = {
		hstep : [1, 2, 3],
		mstep : [1, 5, 10, 15, 25, 30]
	};

	$scope.ismeridian = true;
	$scope.toggleMode = function() {
		$scope.ismeridian = !$scope.ismeridian;
	};

	$scope.update = function() {
		var d = new Date();
		d.setHours(14);
		d.setMinutes(0);
		$scope.dt = d;
	};

	$scope.changed = function() {
		$log.log('Time changed to: ' + $scope.dt);
	};

	$scope.clear = function() {
		$scope.dt = null;
	};

}]).controller('DropdownCtrl', ["$scope", "$log",
function($scope, $log) {
	$scope.items = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

	$scope.status = {
		isopen : false
	};

	$scope.toggled = function(open) {
		$log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
}]).controller('ModalDemoCtrl', ["$scope", "$uibModal", "$log",
function($scope, $uibModal, $log) {

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function(size) {

		var modalInstance = $uibModal.open({
			templateUrl : 'myModalContent.html',
			controller : 'ModalInstanceCtrl',
			size : size,
			resolve : {
				items : function() {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', ["$scope", "$uibModalInstance", "items",
function($scope, $uibModalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item : $scope.items[0]
	};

	$scope.ok = function() {
		$uibModalInstance.close($scope.selected.item);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
