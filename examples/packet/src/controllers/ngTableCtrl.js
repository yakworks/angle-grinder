'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var data = [{
    id: 1,
    name: "Batman",
    alias: "Bruce Wayne",
    publisher: "DC Comics",
    gender: "male",
    power: 37
}, {
    id: 2,
    name: "Superman",
    alias: "Clark Kent",
    publisher: "DC Comics",
    gender: "male",
    power: 94
}, {
    id: 3,
    name: "Catwoman",
    alias: "Selina Kyle",
    publisher: "DC Comics",
    gender: "female",
    power: 24
}, {
    id: 4,
    name: "Spider-Man",
    alias: "Peter Benjamin Parker",
    publisher: "Marvel Comics",
    gender: "male",
    power: 58
}, {
    id: 5,
    name: "Banshee",
    alias: "Sean Cassidy",
    publisher: "Marvel Comics",
    gender: "male",
    power: 60
}, {
    id: 6,
    name: "Black Mamba",
    alias: "Tanya Sealy",
    publisher: "Marvel Comics",
    gender: "female",
    power: 78
}, {
    id: 7,
    name: "Batgirl",
    alias: "Mary Elizabeth Kane",
    publisher: "DC Comics",
    gender: "female",
    power: 12
}, {
    id: 8,
    name: "Blade",
    alias: "Eric Brooks",
    publisher: "Marvel Comics",
    gender: "male",
    power: 33
}, {
    id: 9,
    name: "Captain America",
    alias: "Steven Grant Rogers",
    publisher: "Marvel Comics",
    gender: "male",
    power: 46
}, {
    id: 10,
    name: "Lex Luthor",
    alias: "Alexander 'Lex' Joseph Luthor",
    publisher: "DC Comics",
    gender: "male",
    power: 10
}, {
    id: 11,
    name: "Marvel Girl",
    alias: "Rachel Anne Summers",
    publisher: "Marvel Comics",
    gender: "female",
    power: 95
}, {
    id: 12,
    name: "Penguin",
    alias: "Oswald Chesterfield Cobblepot",
    publisher: "DC Comics",
    gender: "male",
    power: 30
}, {
    id: 13,
    name: "Rogue",
    alias: "Anna Marie",
    publisher: "Marvel Comics",
    gender: "female",
    power: 80
}];
app.controller('ngTableCtrl', ["$scope", "NgTableParams", function ($scope, NgTableParams) {
    $scope.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 5, // count per page
        // initial sort order
        sorting: {
            name: "asc"
        }
    }, {
            total: data.length, // length of data
            dataset: data
        });
}]);
app.controller('ngTableCtrl2', ["$scope", "$filter", "NgTableParams", function ($scope, $filter, NgTableParams) {
    $scope.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 5, // count per page
        sorting: {
            name: "asc" // initial sorting
        }
    }, {
            total: data.length, // length of data
            dataset: data
        });
}]);
app.controller('ngTableCtrl3', ["$scope", "$filter", "NgTableParams", function ($scope, $filter, NgTableParams) {
    $scope.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 5, // count per page
        filter: {
            name: "M" // initial filter
        }
    }, {
            total: data.length, // length of data
            dataset: data            
        });
}]);
app.controller('ngTableCtrl4', ["$scope", "$filter", "NgTableParams", function ($scope, $filter, NgTableParams) {
    $scope.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10 // count per page

    }, {
            total: data.length, // length of data
            dataset: data
        });
}]);
app.controller('ngTableCtrl5', ["$scope", "$filter", "NgTableParams", function ($scope, $filter, NgTableParams) {
    $scope.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
            total: data.length, // length of data
            dataset: data
        });
}]);
app.controller('ngTableCtrl6', ["$scope", "$filter", "NgTableParams", function ($scope, $filter, NgTableParams) {
    var data = [{
        "id": 1,
        "lm": 138661285100,
        "ln": "Smith",
        "fn": "John",
        "dc": "CEO",
        "em": "j.smith@company.com",
        "ph": "617-321-4567",
        "ac": true,
        "dl": false
    }, {
        "id": 2,
        "lm": 138661285200,
        "ln": "Taylor",
        "fn": "Lisa",
        "dc": "VP of Marketing",
        "em": "l.taylor@company.com",
        "ph": "617-522-5588",
        "ac": true,
        "dl": false
    }, {
        "id": 3,
        "lm": 138661285300,
        "ln": "Jones",
        "fn": "James",
        "dc": "VP of Sales",
        "em": "j.jones@company.com",
        "ph": "617-589-9977",
        "ac": true,
        "dl": false
    }, {
        "id": 4,
        "lm": 138661285400,
        "ln": "Wong",
        "fn": "Paul",
        "dc": "VP of Engineering",
        "em": "p.wong@company.com",
        "ph": "617-245-9785",
        "ac": true,
        "dl": false
    }, {
        "id": 5,
        "lm": 138661285500,
        "ln": "King",
        "fn": "Alice",
        "dc": "Architect",
        "em": "a.king@company.com",
        "ph": "617-244-1177",
        "ac": true,
        "dl": false
    }, {
        "id": 6,
        "lm": 138661285600,
        "ln": "Brown",
        "fn": "Jan",
        "dc": "Software Engineer",
        "em": "j.brown@company.com",
        "ph": "617-568-9863",
        "ac": true,
        "dl": false
    }, {
        "id": 7,
        "lm": 138661285700,
        "ln": "Garcia",
        "fn": "Ami",
        "dc": "Software Engineer",
        "em": "a.garcia@company.com",
        "ph": "617-327-9966",
        "ac": true,
        "dl": false
    }, {
        "id": 8,
        "lm": 138661285800,
        "ln": "Green",
        "fn": "Jack",
        "dc": "Software Engineer",
        "em": "j.green@company.com",
        "ph": "617-565-9966",
        "ac": true,
        "dl": false
    }, {
        "id": 9,
        "lm": 138661285900,
        "ln": "Liesen",
        "fn": "Abraham",
        "dc": "Plumber",
        "em": "a.liesen@company.com",
        "ph": "617-523-4468",
        "ac": true,
        "dl": false
    }, {
        "id": 10,
        "lm": 138661286000,
        "ln": "Bower",
        "fn": "Angela",
        "dc": "Product Manager",
        "em": "a.bower@company.com",
        "ph": "617-877-3434",
        "ac": true,
        "dl": false
    }, {
        "id": 11,
        "lm": 138661286100,
        "ln": "Davidoff",
        "fn": "Fjodor",
        "dc": "Database Admin",
        "em": "f.davidoff@company.com",
        "ph": "617-446-9999",
        "ac": true,
        "dl": false
    }, {
        "id": 12,
        "lm": 138661286200,
        "ln": "Vitrovic",
        "fn": "Biljana",
        "dc": "Director of Communications",
        "em": "b.vitrovic@company.com",
        "ph": "617-111-1111",
        "ac": true,
        "dl": false
    }, {
        "id": 13,
        "lm": 138661286300,
        "ln": "Valet",
        "fn": "Guillaume",
        "dc": "Software Engineer",
        "em": "g.valet@company.com",
        "ph": "617-565-4412",
        "ac": true,
        "dl": false
    }, {
        "id": 14,
        "lm": 138661286400,
        "ln": "Tran",
        "fn": "Min",
        "dc": "Gui Designer",
        "em": "m.tran@company.com",
        "ph": "617-866-2554",
        "ac": true,
        "dl": false
    }];
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10
    }, {
            total: data.length,
            dataset: data
        });

    $scope.editId = -1;

    $scope.setEditId = function (pid) {
        $scope.editId = pid;
    };
}]);
