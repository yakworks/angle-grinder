describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common", ($provide) ->
    # dummy filter witch always returns falsy values
    $provide.service "dummyFilter", -> -> null
    return

  describe "directive: agSelectBind", ->

    $scope = null
    element = null

    setValue = (id) ->
      objects = [
        id: 1
        name:"first"
      ,
        id: 2
        name: "second"
      ]
      $scope.test = {objects: objects}
      $scope.selected ={id: id}
      $scope.$digest()

    getValue = -> element.text()

    compileTemplate = (tpl) ->
      element = angular.element(tpl)
      inject ($compile) -> $compile(element)($scope)
      $scope.$digest()

    beforeEach inject ($rootScope) ->
      $scope = $rootScope.$new()

      compileTemplate """
        <span  ag-select-bind="selected.id"
               ag-select-bind-for="test.objects"
               ag-select-bind-field="name">-- none --</span>
      """

    describe "when the value is defined", ->

      beforeEach ->
        setValue(1)

      it "displays the name of the selected value", ->
        expect(getValue()).to.eq "first"

    describe "when the value is not defined", ->

      beforeEach -> setValue(undefined)

      it "displays the default value", ->
        expect(getValue()).to.eq "-- none --"

      describe "when the default value is not given", ->

        beforeEach ->
          compileTemplate """
           <span  ag-select-bind="id"
               ag-select-bind-for="objects"
               ag-select-bind-field="name"></span>
          """

        it "uses default placeholder", ->
          expect(getValue()).to.match /\s*/