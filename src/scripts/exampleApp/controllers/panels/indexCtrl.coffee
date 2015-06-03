class IndexCtrl extends BaseCtrl

  @register "exampleApp", "panels.IndexCtrl"
  @inject "$scope", "exampleGrid", "sampleData"

  initialize: ->
    @$scope.title = "Panels"

    @$scope.contents = []

    @$scope.addContent = =>
      content = { body: "new row [#{new Date()}]" }
      @$scope.contents.push(content)

    @$scope.removeContent = =>
      @$scope.contents.pop()

    @data = @sampleData.generate(100)
    @$scope.data = @data

    selectedRow = => @$log.debug "exampleGrid selected row:", arguments
    @$scope.gridOptions = @exampleGrid(data: @data, onSelectRow: selectedRow)
    @$scope.otherGridOptions = @exampleGrid(data: @data, pager: false)
    @$scope.selectedRowsData = []
