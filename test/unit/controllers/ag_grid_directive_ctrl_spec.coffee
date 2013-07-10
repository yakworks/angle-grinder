describe "AgGridDirectiveCtrl", ->
  beforeEach module("angleGrinder")

  $scope = null
  controller = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    controller = $controller "AgGridDirectiveCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).toBeDefined()

      expect($scope.gridOptions.colModel.length).toEqual 5
      expect($scope.gridOptions.colModel[0].name).toEqual "id"
      expect($scope.gridOptions.colModel[1].name).toEqual "customer.name"
      expect($scope.gridOptions.colModel[2].name).toEqual "invoiceDate"
      expect($scope.gridOptions.colModel[3].name).toEqual "note"
      expect($scope.gridOptions.colModel[4].name).toEqual "complete"

      expect($scope.gridOptions.data.length).toEqual 100

    describe "#editDialog", ->

      it "opens opens a dialog for editing the item", inject (editDialog) ->
        # Given
        item = id: 123
        spyOn(controller, "findItemById").andReturn(item)
        spyOn(editDialog, "open")

        # When
        $scope.editDialog(item.id)

        # Then
        expect(controller.findItemById).toHaveBeenCalledWith(item.id)

        expect(editDialog.open).toHaveBeenCalled()
        args = editDialog.open.mostRecentCall.args
        expect(args[0]).toEqual "templates/partials/item_form.html"
        expect(args[1].id).toEqual item.id

    describe "#createDialog", ->

      it "opens a dialog for creating a new item", inject (editDialog) ->
        # Given
        spyOn(editDialog, "open").andCallThrough()

        # When
        $scope.createDialog()

        # Then
        expect(editDialog.open).toHaveBeenCalled()
        args = editDialog.open.mostRecentCall.args
        expect(args[0]).toEqual "templates/partials/item_form.html"

  describe "controller", ->

    describe "#findItemById", ->

      beforeEach ->
        controller.data = [
          { id: 123, name: "foo" }
          { id: 456, name: "bar" }
        ]

      describe "when an item can be found", ->

        it "returns the item", ->
          item = controller.findItemById(123)
          expect(item).not.toBeNull()
          expect(item.id).toEqual 123
          expect(item.name).toEqual "foo"

      describe "when an item cannot be found", ->

        it "returns undefined", ->
          item = controller.findItemById(1)
          expect(item).toBeUndefined()
