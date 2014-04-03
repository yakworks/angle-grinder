describe "controller: gridExample.ListCtrl", ->
  beforeEach module "templates/gridExample/form.html"

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.decorator "editDialog", ($delegate) ->
      sinon.spy($delegate, "open")
      $delegate

  beforeEach module "exampleApp"

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
      resource = null

      beforeEach ->
        resource = id: 123
        sinon.stub(controller, "findItemById").withArgs(123).returns(resource)

        $scope.editItem(resource.id)
        $scope.$digest()

      it "loads a resource", ->
        expect(controller.findItemById).to.have.been.calledWith(123)

      it "opens opens a dialog for editing the the loaded resource", inject (editDialog) ->
        expect(editDialog.open).to.have.been.called
        expect(editDialog.open).to.have.been.calledWith("templates/gridExample/form.html", resource)

    describe "#createItem", ->

      it "opens a dialog for creating a new item", inject (editDialog) ->
        # When
        $scope.createItem()

        # Then
        expect(editDialog.open).to.have.been.called
        expect(editDialog.open).to.have.been.calledWith("templates/gridExample/form.html")

  describe "controller", ->

    beforeEach ->
      controller.data = [
        { id: 123, name: "foo" }
        { id: 456, name: "bar" }
      ]

    describe "#findItemById", ->

      context "when an item can be found", ->

        it "returns the item", ->
          item = controller.findItemById(123)
          expect(item).to.not.be.undefined
          expect(item.id).to.equal 123
          expect(item.name).to.equal "foo"

      context "when an item cannot be found", ->

        it "returns undefined", ->
          item = controller.findItemById(1)
          expect(item).to.be.undefined

    describe "#deleteItemById", ->

      context "when an item can be found", ->

        it "deletes the item", ->
          controller.deleteItemById(123)
          expect(controller.data).to.have.length(1)

      context "when an item cannot be found", ->

        it "does not delete", ->
          controller.deleteItemById(1231)
          expect(controller.data).to.have.length(2)
