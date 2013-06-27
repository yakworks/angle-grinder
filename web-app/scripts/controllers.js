var module = angular.module("admin.controllers", ["admin.services"]);

module.controller("ListCtrl", function ($scope, $rootScope, $routeParams, $location, Grails, Flash, EditDialog) {

  $scope.createDialog = function () {
    $scope.item = new Grails;
    //$scope.createForm = true;
    EditDialog.open($scope.editTemplateUrl, $scope.item, true)
  }

  $scope.editDialog = function (id) {
    //clear errors
    $scope.errors = null;
    $scope.dataLoaded = false;

    Grails.get({id: id}, function (item) {
      $scope.item = item;
      $scope.dataLoaded = true;
      //openEditDialog($scope.item,false)
      EditDialog.open($scope.editTemplateUrl, $scope.item, false)

    }, errorHandler.curry($scope, $location, Flash));

  };

  $scope.quickSearch = function (search) {
    //console.log(searchCall)
    $rootScope.$broadcast("searchUpdated", search)
  }

  // $scope.createTest = function() {
  //     $scope.item = new Grails;
  //     var i = $scope.item
  //     angular.extend(i,{
  //       contact :{
  //         firstName :"x",
  //         email:"j@j.com"
  //       },
  //       //login:"l" + Math.floor(Math.random() * 9999),
  //       password:"123",
  //       repassword:"123"
  //     });

  //     i.$save(function(response) {
  //         console.log("response " + response.message)
  //     }, errorHandler.curry($scope, $location, Flash));
  // };

});

//dialog is the passed in instance from the angualr-ui dialog
module.controller("EditItemController", function ($scope, $rootScope, dialog, item, isCreateNew, Flash) {
  console.log($scope)

  $scope.item = item;
  $scope.isCreateNew = isCreateNew;

  $scope.closeEditDialog = function () {
    dialog.close();
  }

  $scope.save = function (item) {
    console.log("saveOrUpdate " + item)
    $scope.saving = true
    item.$save(function (response) {
      //console.log("saved");console.log(response);
      $scope.closeEditDialog()
      $rootScope.$broadcast("itemUpdated", response)
    }, errorHandler.curry($scope, Flash));
  };

  // function updateGrid(data){
  //     if(grid.jqGrid("getInd",data.id) === false){
  //         grid.jqGrid("addRowData", data.id,data,"first")
  //     }else{
  //         grid.jqGrid("setRowData", data.id,data)
  //     }

  //     //$target.html("").hide();
  //     var ind = grid[0].rows.namedItem(data.id);

  //     //flash the row so use knows its updated
  //     $(ind).css("background-color", "#DFF0D8")
  //     $(ind).delay(100).fadeOut("medium",function(){
  //       $(ind).css("background-color", "")
  //     }).fadeIn("fast")
  // }

});
