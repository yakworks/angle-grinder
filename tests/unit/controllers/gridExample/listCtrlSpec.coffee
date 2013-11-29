describe "controller: gridExample.ListCtrl", ->
  beforeEach module("angleGrinder.examples")
  beforeEach module("templates/gridExample/form.html")

  $scope = null
  controller = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    controller = $controller "gridExample.ListCtrl",
      $scope: $scope

  describe "$scope", ->
    it "assigns gridOptions", ->
      expect($scope.gridOptions).to.not.be.undefined

      expect($scope.gridOptions.colModel.length).to.equal 5
      expect($scope.gridOptions.colModel[0].name).to.equal "id"
      expect($scope.gridOptions.colModel[1].name).to.equal "customer.name"
      expect($scope.gridOptions.colModel[2].name).to.equal "invoiceDate"
      expect($scope.gridOptions.colModel[3].name).to.equal "note"
      expect($scope.gridOptions.colModel[4].name).to.equal "complete"

      expect($scope.gridOptions.data.length).to.equal 100

    describe "#editItem", ->
      dialogSpy = null
      resource = null

      beforeEach inject (editDialog) ->
        resource = id: 123

        sinon.stub(controller, "findItemById").withArgs(123).returns(resource)
        dialogSpy = sinon.spy(editDialog, "open")

        $scope.editItem(resource.id)

      it "loads a resource", ->
        expect(controller.findItemById.calledWith(123)).to.be.true

      it "opens opens a dialog for editing the the loaded resource", ->
        expect(dialogSpy.called).to.be.true
        expect(dialogSpy.calledWith("templates/gridExample/form.html", resource)).to.be.true

    describe "#createItem", ->
      spy = null

      beforeEach inject (editDialog) ->
        spy = sinon.spy(editDialog, "open")

      it "opens a dialog for creating a new item", ->
        # When
        $scope.createItem()

        # Then
        expect(spy.called).to.be.true
        expect(spy.calledWith("templates/gridExample/form.html")).to.be.true

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
          expect(item).to.not.be.undefined
          expect(item.id).to.equal 123
          expect(item.name).to.equal "foo"

      describe "when an item cannot be found", ->

        it "returns undefined", ->
          item = controller.findItemById(1)
          expect(item).to.be.undefined
