'use strict';
/**
 * controllers for dynamic table
 * Remove/delete a table row dynamically 
 */

app.controller("dynamicTableCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.companies = [
	                    {
	                        'name': 'Infosys Technologies',
	                        'employees': 125000,
	                        'headoffice': 'Bangalore'
	                    },
	                    {
	                    	'name': 'Cognizant Technologies',
	                    	'employees': 100000,
	                    	'headoffice': 'Bangalore'
	                    },
		                {
		                    'name': 'Wipro',
		                    'employees': 115000,
		                    'headoffice': 'Bangalore'
		                },
			            {
			                'name': 'Tata Consultancy Services (TCS)',
			                'employees': 150000,
			                'headoffice': 'Bangalore'
			            },
    ];


    $scope.addRow = function () {
        $scope.companies.push({ 'name': $scope.name, 'employees': $scope.employees, 'headoffice': $scope.headoffice });
        $scope.name = '';
        $scope.employees = '';
        $scope.headoffice = '';
    };

    $scope.addRowAsyncAsNV = function () {
        $scope.companies.push({ 'name': $scope.name, 'employees': $scope.employees, 'headoffice': $scope.headoffice });
        // Writing it to the server
        //		
        var data = 'name=' + $scope.name + '&employees=' + $scope.employees + '&headoffice=' + $scope.headoffice;
        $http.post('/savecompany', data)
		.success(function (data, status, headers, config) {
		    $scope.message = data;
		})
		.error(function (data, status, headers, config) {
		    alert("failure message: " + JSON.stringify({ data: data }));
		});
        // Making the fields empty
        //
        $scope.name = '';
        $scope.employees = '';
        $scope.headoffice = '';
    };

    $scope.removeRow = function (name) {
        var index = -1;
        var comArr = eval($scope.companies);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.companies.splice(index, 1);
    };


}]);