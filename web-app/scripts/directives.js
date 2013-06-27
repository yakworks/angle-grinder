var module = angular.module("admin.directives", []);

module.directive("agGrid", function () {
  function link($scope, element, attrs) {
    var gridOpts = $scope.$eval(attrs.agGrid)

    var $grid = $("#grid", element)

    $grid.on("click", "a.editActionLink", function (evt) {
      evt.preventDefault();
      var id = $(this).parents("tr:first").attr("id");
      $scope.$apply(function () {
        $scope.editDialog(id)
      });
    })
    $grid.gridz(gridOpts)
    var grid = $grid[0]

    //$grid.jqGrid("setGridParam", { search: true, postData: { "filters": {name:"billy%"}})//.trigger("reloadGrid");
    //catch broadcast event after save. This will need to change
    $scope.$on("itemUpdated", function (evt, data) {
      if ($grid.jqGrid("getInd", data.id) === false) {
        $grid.jqGrid("addRowData", data.id, data, "first")
      } else {
        $grid.jqGrid("setRowData", data.id, data)
      }
      //use for future on loading outside of jqgrid
      //var d = {"page": 1,"records": 27, "total": 2, "rows":[data]}

      //$grid[0].addJSONData(d)
      //$grid[0].grid.populate()

      //$target.html("").hide();
      var ind = $grid[0].rows.namedItem(data.id);

      //flash the row so use knows its updated
      $(ind).css("background-color", "#DFF0D8")
      $(ind).delay(100).fadeOut("medium",function () {
        $(ind).css("background-color", "")
      }).fadeIn("fast")
    });

    $scope.$on("searchUpdated", function (evt, filter, cscope) {
      if (cscope) cscope.searching = true
      $grid.setGridParam({
        search: true,
        postData: {
          "filters": JSON.stringify(filter)
        }
      }).trigger("reloadGrid");
      if (cscope) cscope.searching = false
    });


  } //end link

  return {
    restrict: "A",
    template: "<table id='grid'></table><div id='gridPager'></div>",
    link: link
  }
});
