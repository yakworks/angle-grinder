'use strict';
/**
 * controllers used for the dashboard
 */

app.controller('ProductsCtrl', ["$scope",
function($scope) {
	$scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.series = ['Alpha', 'Omega', 'Kappa'];
	$scope.data = [[656, 594, 806, 817, 568, 557, 408, 843, 642, 1202, 1322, 847], [282, 484, 402, 194, 864, 275, 905, 1025, 123, 1455, 650, 1651], [768, 368, 253, 163, 437, 678, 1239, 1345, 1898, 1766, 1603, 2116]];
	$scope.colors = [{
		fillColor : 'rgba(90,135,112,0.6)',
		strokeColor : 'rgba(90,135,112,1)',
		pointColor : 'rgba(90,135,112,1)'
	}, {
		fillColor : 'rgba(127,140,141,0.6)',
		strokeColor : 'rgba(127,140,141,1)',
		pointColor : 'rgba(127,140,141,1)'
	}, {
		fillColor : 'rgba(148,116,153,0.6)',
		strokeColor : 'rgba(148,116,153,1)',
		pointColor : 'rgba(148,116,153,1)'
	}];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
        maintainAspectRatio : false,
        responsive : true,
        scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
        scaleFontSize : 11,
        scaleFontColor : "#aaa",
        scaleShowGridLines : true,
        tooltipFontSize : 11,
        tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
        tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
        tooltipTitleFontSize : 12,
        scaleGridLineColor : 'rgba(0,0,0,.05)',
        scaleGridLineWidth : 1,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        scaleLineColor : 'transparent',
        scaleShowVerticalLines : false,
        pointDot : false,
        pointDotRadius : 2,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        tooltipXPadding: 20,
        datasetStrokeWidth : 2,
        datasetFill : true,
        animationEasing : "easeInOutExpo"
	};

}]);
app.controller('SalesCtrl', ["$scope",
function($scope) {
	$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	$scope.series = ['First', 'Second'];
	$scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
	$scope.colors = [{
		fillColor : 'rgba(148,116,153,0.7)',
		highlightFill : 'rgba(148,116,153,1)'
	}, {
		fillColor : 'rgba(127,140,141,0.7)',
		highlightFill : 'rgba(127,140,141,1)'
	}];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		maintainAspectRatio : false,
		tooltipFontSize : 11,
		tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
		responsive : true,
		scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
		scaleFontSize : 11,
		scaleFontColor : "#aaa",
		scaleBeginAtZero : true,
		tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontSize : 12,
		scaleShowGridLines : true,
		scaleLineColor : 'transparent',
		scaleShowVerticalLines : false,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		scaleGridLineWidth : 1,
		barShowStroke : false,
		barStrokeWidth : 2,
		barValueSpacing : 5,
		barDatasetSpacing : 1
	};

}]);
app.controller('AcquisitionCtrl', ["$scope",
function($scope) {
	$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	$scope.series = ['dataset'];
	$scope.data = [[65, 59, 80, 81, 56, 55, 40]];
	$scope.colors = [{
		fillColor : 'rgba(148,116,153,0.7)',
		strokeColor : 'rgba(148,116,153,0)',
		highlightFill : 'rgba(148,116,153,1)',
		highlightStroke : 'rgba(148,116,153,1)'
	}];
	// Chart.js Options
	$scope.options = {
		maintainAspectRatio : false,
		showScale : false,
		barDatasetSpacing : 0,
		tooltipFontSize : 11,
		tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
		responsive : true,
		scaleBeginAtZero : true,
		scaleShowGridLines : false,
		scaleLineColor : 'transparent',
		barShowStroke : false,
		barValueSpacing : 5
	};

}]);
app.controller('ConversionsCtrl', ["$scope",
function($scope) {
	$scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.series = ['Transactions', 'Unique Visitors'];
	$scope.data = [[65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 87], [172, 175, 193, 194, 161, 175, 153, 190, 175, 231, 234, 250]];
	$scope.colors = [{
		fillColor : 'rgba(91,155,209,0.5)',
		strokeColor : 'rgba(91,155,209,1)'
	}, {
		fillColor : 'rgba(91,155,209,0.5)',
		strokeColor : 'rgba(91,155,209,0.5)'
	}];

	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		maintainAspectRatio : false,
		showScale : false,
		scaleLineWidth : 0,
		responsive : true,
		scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
		scaleFontSize : 11,
		scaleFontColor : "#aaa",
		scaleShowGridLines : true,
		tooltipFontSize : 11,
		tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontSize : 12,
		scaleGridLineColor : 'rgba(0,0,0,.05)',
		scaleGridLineWidth : 1,
		bezierCurve : true,
		bezierCurveTension : 0.5,
		scaleLineColor : 'transparent',
		scaleShowVerticalLines : false,
		pointDot : false,
		pointDotRadius : 4,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		animationEasing : "easeInOutExpo"
	};

}]);
app.controller('BarCtrl', ["$scope",
function($scope) {
	$scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	$scope.series = ['dataset'];
	$scope.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]];
	$scope.colors = [{
		fillColor : 'rgba(154,137,181,0.6)',
		highlightFill : 'rgba(154,137,181,0.9)'
	}];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		maintainAspectRatio : false,
		showScale : false,
		barDatasetSpacing : 0,
		tooltipFontSize : 11,
		tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
		responsive : true,
		scaleBeginAtZero : true,
		scaleShowGridLines : false,
		scaleLineColor : 'transparent',
		barShowStroke : false,
		barValueSpacing : 5
	};

}]);
app.controller('BarCtrl2', ["$scope",
function($scope) {
	$scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	$scope.series = ['dataset'];
	$scope.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]];
	$scope.colors = [{
		fillColor: 'rgba(255,255,244,0.3)',
		strokeColor: 'rgba(255,255,244,0.5)'
	}];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		maintainAspectRatio: false,
		showScale: false,
		barDatasetSpacing: 0,
		tooltipFontSize: 11,
		tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
		responsive: true,
		scaleBeginAtZero: true,
		scaleShowGridLines: false,
		scaleLineColor: 'transparent',
		barShowStroke: false,
		barValueSpacing: 5
	};

}]);
app.controller('LineCtrl', ["$scope",
function($scope) {
	$scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
	$scope.series = ['dataset'];
	$scope.data = [[65, 59, 80, 81, 56, 95, 100]];
	$scope.colors = [{
		fillColor : 'rgba(0,0,0,0)',
		strokeColor : 'rgba(0,0,0,0.2)'
	}];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		maintainAspectRatio : false,
		showScale : false,
		scaleLineWidth : 0,
		responsive : true,
		scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
		scaleFontSize : 11,
		scaleFontColor : "#aaa",
		scaleShowGridLines : true,
		tooltipFontSize : 11,
		tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontSize : 12,
		scaleGridLineColor : 'rgba(0,0,0,.05)',
		scaleGridLineWidth : 1,
		bezierCurve : false,
		bezierCurveTension : 0.2,
		scaleLineColor : 'transparent',
		scaleShowVerticalLines : false,
		pointDot : true,
		pointDotRadius : 4,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		animationEasing : "easeInOutExpo"
	};

}]);
app.controller('RandomCtrl', function($scope, $interval) {
	$scope.randomUsers = 0;
	var interval = 1500;

	$scope.realtime = function() {

		var random = $interval(function() {
			$scope.randomUsers = Math.floor((Math.random() * 6) + 100);
			interval = Math.floor((Math.random() * 5000) + 1000);
			$interval.cancel(random);
			$scope.realtime();
		}, interval);
	};
	$scope.realtime();
});
app.controller('KnobCtrl1', function($scope) {
	$scope.value = 65;
	$scope.options = {
		unit : "%",
		readOnly : true,
		size : 70,
		fontSize : '11px',
		textColor : 'rgb(154,137,181)',
		trackWidth : 5,
		barWidth : 10,
		trackColor : 'rgba(154,137,181,0.6)',
		barColor : 'rgba(154,137,181,0.9)'
	};
});
app.controller('KnobCtrl2', function($scope) {
	$scope.value = 330;
	$scope.options = {
		unit : "MB",
		readOnly : true,
		size : 70,
		fontSize : '11px',
		textColor : 'rgb(154,137,181)',
		trackWidth : 5,
		barWidth : 10,
		trackColor : 'rgba(154,137,181,0.6)',
		barColor : 'rgba(154,137,181,0.9)',
		max : 1024
	};
});
app.controller('KnobCtrl3', function($scope) {
    $scope.value = 65;
    $scope.options = {
        unit : "%",
        readOnly : true,
        size : 70,
        fontSize : '11px',
        textColor : '#fff',
        trackWidth : 5,
        barWidth : 10,
        trackColor : 'rgba(255,255,255,0.4)',
        barColor : '#8773A8'
    };
});
app.controller('KnobCtrl4', function($scope) {
    $scope.value = 330;
    $scope.options = {
        unit : "MB",
        readOnly : true,
        size : 70,
        fontSize : '11px',
        textColor : '#fff',
        trackWidth : 5,
        barWidth : 10,
        trackColor : 'rgba(255,255,255,0.4)',
        barColor : '#8773A8',
        max : 1024
    };
});
app.controller('SocialCtrl1', ["$scope",
function($scope) {

	$scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
	$scope.data = [300, 150, 100, 80];
	$scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];

	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		responsive : false,
		scaleShowLabelBackdrop : true,
		scaleBackdropColor : 'rgba(255,255,255,0.75)',
		scaleBeginAtZero : true,
		scaleBackdropPaddingY : 2,
		scaleBackdropPaddingX : 2,
		scaleShowLine : true,
		segmentShowStroke : true,
		segmentStrokeColor : '#fff',
		segmentStrokeWidth : 2,
		animationSteps : 100,
		animationEasing : 'easeOutBounce',
		animateRotate : true,
		animateScale : false
	};
}]);
app.controller('SocialCtrl2', ["$scope",
function($scope) {

	$scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
	$scope.data = [180, 210, 97, 60];
	$scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		responsive : false,
		scaleShowLabelBackdrop : true,
		scaleBackdropColor : 'rgba(255,255,255,0.75)',
		scaleBeginAtZero : true,
		scaleBackdropPaddingY : 2,
		scaleBackdropPaddingX : 2,
		scaleShowLine : true,
		segmentShowStroke : true,
		segmentStrokeColor : '#fff',
		segmentStrokeWidth : 2,
		animationSteps : 100,
		animationEasing : 'easeOutBounce',
		animateRotate : true,
		animateScale : false
	};
}]);
app.controller('SocialCtrl3', ["$scope",
function($scope) {

	$scope.labels = ['Fb', 'YT', 'Tw'];
	$scope.data = [300, 50, 100];
	$scope.colors = ['#6F83B6', '#79BEF1', '#ED5952'];

	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		responsive: false,
		tooltipFontSize: 11,
		tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
		tooltipCornerRadius: 0,
		tooltipCaretSize: 2,
		segmentShowStroke: true,
		segmentStrokeColor: '#fff',
		segmentStrokeWidth: 2,
		percentageInnerCutout: 50,
		animationSteps: 100,
		animationEasing: 'easeOutBounce',
		animateRotate: true,
		animateScale: false

	};

}]);
app.controller('SocialCtrl4', ["$scope",
function($scope) {
	$scope.labels = ['Sc', 'Ad'];
	$scope.data = [200, 150];
	$scope.colors = ['#8BC33E', '#7F8C8D'];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		responsive: false,
		tooltipFontSize: 11,
		tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
		tooltipCornerRadius: 0,
		tooltipCaretSize: 2,
		segmentShowStroke: true,
		segmentStrokeColor: '#fff',
		segmentStrokeWidth: 2,
		percentageInnerCutout: 50,
		animationSteps: 100,
		animationEasing: 'easeOutBounce',
		animateRotate: true,
		animateScale: false

	};

}]);
app.controller('PerformanceCtrl1', ["$scope",
function($scope) {
	$scope.value = 85;
	$scope.options = {
		size : 125,
		unit : "%",
		trackWidth : 10,
		barWidth : 10,
		step : 5,
		trackColor : 'rgba(52,152,219,.1)',
		barColor : 'rgba(69,204,206,.5)'
	};
}]);
app.controller('BudgetCtrl', ["$scope",
function($scope) {
	$scope.dailyValue = "25";
	$scope.totalValue = "750";

	$scope.dailyOptions = {
		from : 1,
		to : 100,
		step : 1,
		dimension : " $",
		className : "clip-slider",
		css : {
			background : {
				"background-color" : "silver"
			},
			before : {
				"background-color" : "rgb(154,137,181)"
			}, // zone before default value
			after : {
				"background-color" : "rgb(154,137,181)"
			},  // zone after default value
		}
	};
	$scope.totalOptions = {
		from : 100,
		to : 1000,
		step : 1,
		dimension : " $",
		className : "clip-slider",
		css : {
			background : {
				"background-color" : "silver"
			},
			before : {
				"background-color" : "rgb(127,140,141)"
			}, // zone before default value
			after : {
				"background-color" : "rgb(127,140,141)"
			},  // zone after default value
		}
	};

}]);