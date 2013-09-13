var app = angular.module("angleGrinder.examples", [
    "angleGrinder.common",
    "angleGrinder.dataGenerator",
    "angleGrinder.gridz",
    "angleGrinder.forms"
]);

app.controller("BasicExampleCtrl", function($scope, sampleData, editDialog) {
    $scope.data = sampleData.generate(100);

    $scope.gridColumns = function() {
        return [
            {
                name: "id",
                label: "Inv No",
                width: 90,
                sorttype: "int"
            },
            {
                name: "customer.name",
                label: "Customer",
                formatter: "editActionLink"
            },
            {
                name: "invoiceDate",
                label: "Date"
            },
            {
                name: "note",
                label: "Note"
            },
            {
                name: "complete",
                label: "Complete"
            }
        ];
    };

    $scope.gridOptions = {
        data: $scope.data,
        datatype: "local",
        colModel: $scope.gridColumns(),
        sortname: "id",
        rowNum: 10,
        multiselect: true
    };

    $scope.findItemById = function(id) {
        id = parseInt(id);
        return _.find($scope.data, function(row) {
            return row.id === id;
        });
    }

    $scope.deleteItemById = function(id) {
        var row = $scope.findItemById(id);
        if (row) {
            $scope.data = _.reject($scope.data, function(item) {
               return item.id === row.id;
            });
        }
    }

    $scope.editItem = function(id) {
        var item = $scope.findItemById(id);

        item.persisted = function() {
            return true;
        };

        item.save = function(callback) {
            return callback.success(this);
        };

        item["delete"] = function(callback) {
            $scope.deleteItemById(id);
            return callback.success(this);
        };

        return editDialog.open("/angle-grinder/assets/templates/itemForm.html", item, $scope.grid);
    };

    $scope.createItem = function() {
        var item = {};

        item.persisted = function() {
            return false;
        };

        item.save = function(callback) {
            var generateId = function() {
                return new Date().getTime();
            };

            item.id = generateId();

            return callback.success(this);
        };

        return editDialog.open("/angle-grinder/assets/templates/itemForm.html", item, $scope.grid).then(function(item) {
            return $scope.data.push(item);
        });
    };

    $scope.deleteItem = function(id) {
        $scope.deleteItemById(id);
        $scope.grid.removeRow(id);
    };

});
