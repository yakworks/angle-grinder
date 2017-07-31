describe "module:angleGrinder.gridz", ->

  describe "directive: gridCrud", ->

    beforeEach module "angleGrinder.gridz", ($provide) ->
      $provide.value "$uibModal", open: sinon.stub().returns({rendered: then: sinon.stub()})
      return

      $scope = null
      element = null

    it "applies custom classes", inject ($rootScope, $compile, $uibModal) ->
      $scope = $rootScope.$new()
      $scope.gridOptions = {}
      element = angular.element """
        <div>
          <div grid-crud
               is-modal="true"
               modal-options='{"windowClass":"custom-modal-dialog", "backdropClass":"transparent-backdrop"}'
               template="/payment/formTemplate"
               resource="payment"
               grid-name="grid"
               before-save="beforeSave">
          </div>
        </div>
        """
      element = $compile(element)($scope)
      $rootScope.$apply()

      $scope.createPayment()

      expect($uibModal.open).to.have.been.called
      options = $uibModal.open.getCall(0).args[0]
      expect(options.windowClass).to.not.be.undefined
      expect(options.windowClass).to.include "custom-modal-dialog"
      expect(options.backdropClass).to.not.be.undefined
      expect(options.backdropClass).to.include "transparent-backdrop"
