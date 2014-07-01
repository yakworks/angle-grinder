describe "controller: gridExample.ListCtrl", ->

  beforeEach module "templates/gridExample/form.html"

  beforeEach module "angleGrinder.forms", ($provide) ->
    $provide.value "$modal", open: sinon.stub().returns result: then: angular.noop
    return

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

      expect($scope.gridOptions.colModel.length).to.equal 6
      expect($scope.gridOptions.colModel[0].name).to.equal "id"
      expect($scope.gridOptions.colModel[1].name).to.equal "customer.name"
      expect($scope.gridOptions.colModel[2].name).to.equal "invoiceDate"
      expect($scope.gridOptions.colModel[3].name).to.equal "amount"
      expect($scope.gridOptions.colModel[4].name).to.equal "note"
      expect($scope.gridOptions.colModel[5].name).to.equal "complete"

      expect($scope.gridOptions.data.length).to.equal 100

    describe "#editRecord", ->
      record = null

      beforeEach ->
        record = id: 123
        sinon.stub(controller, "findRecordById").withArgs(123).returns(record)

        $scope.editRecord(record.id)
        $scope.$digest()

      it "loads an record", ->
        expect(controller.findRecordById).to.have.been.calledWith(123)

      it "opens opens a dialog for editing the the loaded record", inject ($modal) ->
        expect($modal.open).to.have.been.called

        options = $modal.open.getCall(0).args[0]
        expect(options).to.have.property "templateUrl", "/templates/gridExample/form.html"
        expect(options.resolve.dialogOptions().record).to.eq record

    describe "#createRecord", ->

      it "opens a dialog for creating a new item", inject ($modal) ->
        # When
        $scope.createRecord()

        # Then
        expect($modal.open).to.have.been.called

        options = $modal.open.getCall(0).args[0]
        expect(options).to.have.property "templateUrl", "/templates/gridExample/form.html"
        expect(options.resolve.dialogOptions().record).to.not.be.undefined

  describe "controller", ->

    beforeEach ->
      controller.data = [
        { id: 123, name: "foo" }
        { id: 456, name: "bar" }
      ]

    describe "#findRecordById", ->

      context "when an item can be found", ->

        it "returns the item", ->
          item = controller.findRecordById(123)
          expect(item).to.not.be.undefined
          expect(item.id).to.equal 123
          expect(item.name).to.equal "foo"

      context "when an item cannot be found", ->

        it "returns undefined", ->
          item = controller.findRecordById(1)
          expect(item).to.be.undefined

    describe "#deleteRecordById", ->

      context "when an item can be found", ->

        it "deletes the item", ->
          controller.deleteRecordById(123)
          expect(controller.data).to.have.length(1)

      context "when an item cannot be found", ->

        it "does not delete", ->
          controller.deleteRecordById(1231)
          expect(controller.data).to.have.length(2)
