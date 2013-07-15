describe "angleGrinder.gridz", ->
  beforeEach module("angleGrinder.gridz")

  describe "directives", ->
    describe "agGrid", ->
      element = null
      gridz = null

      sampleGridOptions =
        data: []
        colModel: [
          name: "id"
          label: "Inv No"
          search: true
        ]

      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()
        $scope.gridOptions = sampleGridOptions

        # create a spy on the gridz plugin
        gridz = spyOn($.fn, "gridz").andCallThrough()

        element = angular.element """
          <div ag-grid="gridOptions"></div>
        """

        $compile(element)($scope)
        $scope.$digest()

      it "passes valid options to the gridz plugin", ->
        expect(gridz).toHaveBeenCalledWith sampleGridOptions

      it "renders the grid", ->
        expect(element.find("div.ui-jqgrid").length).toEqual 1
        expect(element.find("table#grid").length).toEqual 1
        expect(element.find("div#gridPager").length).toEqual 1

    describe "match", ->
      formElement = null
      $scope = null

      beforeEach inject ($rootScope, $compile) ->
        $scope = $rootScope.$new()
        formElement = angular.element """
          <form name="form">
            <input name="password" type="password"
                   ng-model="user.password" />
            <input name="passwordConfirmation" type="password"
                   ng-model="user.passwordConfirmation" match="user.password" />
          </form>
        """

        $compile(formElement)($scope)
        $scope.$digest()

      describe "when the fileds are equal", ->
        beforeEach ->
          $scope.user =
            password: "password"
            passwordConfirmation: "password"
          $scope.$digest()

        it "marks the form as valid", ->
          expect($scope.form.$valid).toBeTruthy()
          expect($scope.form.$invalid).toBeFalsy()

        it "does not set errors on the input", ->
          expect($scope.form.passwordConfirmation.$valid).toBeTruthy()
          expect($scope.form.passwordConfirmation.$invalid).toBeFalsy()

      describe "when the fields are not equal", ->
        beforeEach ->
          $scope.user =
            password: "password"
            passwordConfirmation: "other password"
          $scope.$digest()

        it "marks the form as invalid", ->
          expect($scope.form.$valid).toBeFalsy()
          expect($scope.form.$invalid).toBeTruthy()

        it "sets the valid form errors", ->
          expect($scope.form.$error).toBeDefined()
          expect($scope.form.$error.mismatch[0].$name).toEqual "passwordConfirmation"

        it "sets the valid input errors", ->
          expect($scope.form.passwordConfirmation.$valid).toBeFalsy()
          expect($scope.form.passwordConfirmation.$invalid).toBeTruthy()
          expect($scope.form.passwordConfirmation.$error.mismatch).toBeTruthy()

  describe "services", ->
    describe "#editDialog", ->
      it "is defined", inject (editDialog) ->
        expect(editDialog).toBeDefined()

      describe "#open", ->
        beforeEach inject ($httpBackend) ->
          $httpBackend.whenGET("/views/some_template.html").respond({})

        it "opens the create dialog", inject (editDialog) ->
          item = name: "Foo"
          editDialog.open("/views/some_template.html", item)

    describe "#flatten", ->
      flatten = null
      beforeEach inject ($injector) ->
        flatten = $injector.get("flatten")

      it "is defined", ->
        expect(flatten).toBeDefined()

      it "flattens an object", ->
        target =
          id: 123
          consumer:
            firstName: "Luke"
            lastName: "Sywalker"
          createdAt: "2013-11-11"

        flattened = flatten(target)

        expect(flattened.id).toEqual target.id
        expect(flattened["consumer.firstName"]).toEqual target.consumer.firstName
        expect(flattened["consumer.lastName"]).toEqual target.consumer.lastName
        expect(flattened.createdAt).toEqual target.createdAt

    describe "#hasSearchFilters", ->
      describe "if filters contain at least one non-empty field", ->
        filters = foo: "  ", bar: "test", biz: null

        it "returns true", inject (hasSearchFilters) ->
          expect(hasSearchFilters(filters)).toBeTruthy()

      describe "if filters contains only empty fileds", ->
        filters = foo: "  ", bar: "", biz: null, baz: undefined

        it "returns false", inject (hasSearchFilters) ->
          expect(hasSearchFilters(filters)).toBeFalsy()
