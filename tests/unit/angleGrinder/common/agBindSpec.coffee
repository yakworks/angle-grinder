describe "angleGrinder.common", ->

  beforeEach module "angleGrinder.common", ($provide) ->
    # dummy filter witch always returns falsy values
    $provide.service "dummyFilter", -> -> null
    return

  describe "directive: agBind", ->

    $scope = null
    element = null

    setValue = (value) ->
      $scope.item = { value: value }
      $scope.$digest()

    getValue = -> element.text()

    compileTemplate = (tpl) ->
      element = angular.element(tpl)
      inject ($compile) -> $compile(element)($scope)
      $scope.$digest()

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()

      compileTemplate """
        <span ag-bind="item.value">-- none --</span>
      """

    describe "when the value is defined", ->

      beforeEach -> setValue("luke")

      it "displays the value", ->
        expect(getValue()).to.eq "luke"

    describe "when the value is not defined", ->

      beforeEach -> setValue(undefined)

      it "displays the default value", ->
        expect(getValue()).to.eq "-- none --"

      describe "when the default value is not given", ->

        beforeEach ->
          compileTemplate """
            <span ag-bind="item.value"></span>
          """

        it "uses default placeholder", ->
          expect(getValue()).to.be.eq ' '

    describe "when the value is a number", ->

      it "displays the value", ->
        setValue(0)
        expect(getValue()).to.eq "0"

        setValue(0.1)
        expect(getValue()).to.eq "0.1"

        setValue(123)
        expect(getValue()).to.eq "123"

    describe "binding with filter", ->

      beforeEach ->
        compileTemplate """
          <span ag-bind="item.value | number:2"></span>
        """

      it "uses the filter to format the value", ->
        setValue(0)
        expect(getValue()).to.eq "0.00"

        setValue(1.1)
        expect(getValue()).to.eq "1.10"

        setValue(1.239)
        expect(getValue()).to.eq "1.24"

      describe "when filter returns falsy value", ->

        beforeEach ->
          compileTemplate """
            <span ag-bind="item.value | dummy">default value</span>
          """

        it "displays the default value", ->
          setValue("this is the value")
          expect(getValue()).to.eq "default value"

      describe "with agDate filter", ->

        beforeEach ->
          compileTemplate """
            <span ag-bind="item.value | agDate:false:'MM/DD/YY'">-- no date --</span>
          """

        it "displays the date", ->
          setValue(new Date(2012, 9, 15))
          expect(getValue()).to.eq "10/15/12"

        it "displays default value", ->
          setValue(undefined)
          expect(getValue()).to.eq "-- no date --"
