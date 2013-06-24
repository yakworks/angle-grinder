/**
* Utils
*/
function toArray(element) {
  return Array.prototype.slice.call(element);
}

Function.prototype.curry = function() {
  if (arguments.length < 1) {
    return this; //nothing to curry with - return function
  }
  var __method = this;
  var args = toArray(arguments);
  return function() {
    return __method.apply(this, args.concat(toArray(arguments)));
  }
}

/**
 * A service for storing one-time messages to be displayed after redirecting to
 * another view.
 */
 angular.module('flashService', []).factory('Flash', function() {
  var flash = {};

  flash.getMessage = function() {
    var value = this.message;
    this.message = undefined;
    return value;
  };

  flash.error = function(text) {
    this.message = {level: 'error', text: text};
  };
  flash.success = function(text) {
    this.message = {level: 'success', text: text};
  };
  flash.info = function(text) {
    this.message = {level: 'info', text: text};
  };

  return flash;
});

/**
 * The main scaffolding module.
 */
var adminModule = angular.module('admin', ['grailsService', 'flashService','ui.bootstrap','ui']);

adminModule.directive('agGrid', function() {
  function link( $scope, element, attrs ) {
    // console.log("gridz setup")
    // console.log(attrs)
    // console.log($scope.$eval(attrs.ngzGrid))
    var gridOpts = $scope.$eval(attrs.agGrid)

    var $grid = $("#grid",element)

    $grid.on('click',"a.editActionLink" , function(evt) {
      evt.preventDefault();
      var id = $(this).parents("tr:first").attr("id");
      $scope.$apply(function() {
        $scope.editDialog(id)
      });
    })
    //console.log(gridOpts)
    $grid.gridz(gridOpts)
    var grid = $grid[0]
      
    //$grid.jqGrid('setGridParam', { search: true, postData: { "filters": {name:'billy%'}})//.trigger("reloadGrid");
    //catch broadcast event after save. This will need to change 
    $scope.$on('itemUpdated', function(evt,data){
      if($grid.jqGrid("getInd",data.id) === false){
        $grid.jqGrid("addRowData", data.id,data,"first")
      }else{
        $grid.jqGrid("setRowData", data.id,data)
      }
      //use for future on loading outside of jqgrid
      //var d = {"page": 1,"records": 27, "total": 2, "rows":[data]}
      
      //$grid[0].addJSONData(d)
      //$grid[0].grid.populate()

      //$target.html("").hide();
      var ind = $grid[0].rows.namedItem(data.id);

      //flash the row so use knows its updated
      $(ind).css("background-color", "#DFF0D8")
      $(ind).delay(100).fadeOut('medium',function(){
        $(ind).css("background-color", "")
      }).fadeIn('fast')
    });

    $scope.$on('searchUpdated', function(evt,filter,cscope){
      if(cscope) cscope.searching = true
      $grid.setGridParam({
        search: true, 
        postData: { 
          "filters": JSON.stringify(filter)
        }
      }).trigger("reloadGrid");
      if(cscope) cscope.searching = false
    });  


  } //end link

  return {
    restrict: 'A',
    template: '<table id="grid"></table><div id="gridPager"></div>',
    link:link
  }
});


/**
 * Generic $resource error handler used by all controllers.
 */
function errorHandler($scope, Flash, response) {
    switch (response.status) {
        case 404: // resource not found - return to the list and display message returned by the controller
            Flash.error(response.data.message);
            //$location.path('/list');
            break;
        case 409: // optimistic locking failure - display error message on the page
            $scope.message = {level: 'error', text: response.data.message};
            break;
        case 400: // validation error - display errors alongside form fields
            $scope.saving = false
            $scope.message = {level: 'error', text: response.data.message};
            $scope.errors = response.data.errors;
            break;
        default: // TODO: general error handling
    }
}

adminModule.service('EditDialog', function($dialog) {
    this.open = function(editTemplateUrl,item,isCreateNew) {
      var dlg = $dialog.dialog({
        backdropFade: false,
        dialogFade: false,
        resolve: { 
          item: function(){ return item; } ,
          isCreateNew:function(){ return isCreateNew; }
        }
      });

      //override so we can intercept form dirty and prevent escape
      dlg.handledEscapeKey = function(e) {
        if (e.which === 27) {
          e.preventDefault();
          if(!dlg.$scope.editForm.$dirty){
            dlg.close();
            dlg.$scope.$apply();
          }
        }
      };

      //override so we can intercept form dirty and prevent backdrop click
      dlg.handleBackDropClick = function(e) {
          //console.log("handleBackDropClick")         
        e.preventDefault();
          if(!dlg.$scope.editForm.$dirty){
            dlg.close();
            dlg.$scope.$apply();
          }
      };

        //warn if navigating away
        // window.onbeforeunload = function () {
        //     if ($scope.editForm.$dirty) {
        //         return "You have unsaved pages. Do you want to stay on the page?";
        //     }
        // }

      dlg.open(editTemplateUrl,'EditItemController')
    };
});

adminModule.controller('ListCtrl', function($scope,$rootScope, $routeParams, $location, Grails, Flash, EditDialog) {

    $scope.createDialog = function(){
        $scope.item = new Grails;
        //$scope.createForm = true;
        EditDialog.open($scope.editTemplateUrl, $scope.item,true)
    }

    $scope.editDialog = function(id) {
        //clear errors
        $scope.errors = null;
        $scope.dataLoaded = false;

        Grails.get({id: id}, function(item) {
          $scope.item = item;
          $scope.dataLoaded = true;
          //openEditDialog($scope.item,false)
          EditDialog.open($scope.editTemplateUrl, $scope.item,false)

        }, errorHandler.curry($scope, $location, Flash));

    };

    $scope.quickSearch = function(search) {
        //console.log(searchCall)
        $rootScope.$broadcast('searchUpdated', search)
    }

    // $scope.createTest = function() {
    //     $scope.item = new Grails;
    //     var i = $scope.item
    //     angular.extend(i,{
    //       contact :{
    //         firstName :'x',
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
adminModule.controller('EditItemController', function($scope,$rootScope, dialog, item, isCreateNew,Flash){
    console.log($scope)

    $scope.item = item;
    $scope.isCreateNew= isCreateNew;

    $scope.closeEditDialog = function(){
        dialog.close();
    }

    $scope.save = function(item) {
        console.log("saveOrUpdate " + item)
        $scope.saving = true
        item.$save(function(response) {
            //console.log("saved");console.log(response);
            $scope.closeEditDialog()
            $rootScope.$broadcast('itemUpdated', response)
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
    //     $(ind).delay(100).fadeOut('medium',function(){
    //       $(ind).css("background-color", "")
    //     }).fadeIn('fast')
    // }

});


