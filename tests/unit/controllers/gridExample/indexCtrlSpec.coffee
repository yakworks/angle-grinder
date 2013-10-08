describe "controller: gridExample.IndexCtrl", ->
  beforeEach module("angleGrinder")
  beforeEach module("templates/partials/itemForm.html")

  $scope = null
  controller = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    controller = $controller "gridExample.IndexCtrl",
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

    describe "#editItem", ->
      dialogSpy = null
      resource = null

      beforeEach inject (editDialog) ->
        resource = id: 123

        sinon.stub(controller, "findItemById").withArgs(123).returns(resource)
        dialogSpy = sinon.spy(editDialog, "open")

        $scope.editItem(resource.id)

      it "loads a resource", ->
        expect(controller.findItemById.calledWith(123)).toBeTruthy()

      it "opens opens a dialog for editing the the loaded resource", ->
        expect(dialogSpy.called).toBeTruthy()
        expect(dialogSpy.calledWith("templates/partials/itemForm.html", resource)).toBeTruthy()

    describe "#createItem", ->
      spy = null

      beforeEach inject (editDialog) ->
        spy = sinon.spy(editDialog, "open")

      it "opens a dialog for creating a new item", ->
        # When
        $scope.createItem()

        # Then
        expect(spy.called).toBeTruthy()
        expect(spy.calledWith("templates/partials/itemForm.html")).toBeTruthy()

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
