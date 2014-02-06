describe "module: angleGrinder.forms tabs", ->

  beforeEach module "angleGrinder.forms"

  $parentScope = null
  $scope = null

  describe "directive: agTabPostRender", ->

    beforeEach inject ($injector, $rootScope) ->
      # stub the parent scope
      $parentScope = $rootScope.$new()
      $parentScope.contentLoading = true

      currentTab = loading: true
      $parentScope.currentTab = -> currentTab

      # create a new child scope
      $scope = $parentScope.$new()

      {element, $scope} = compileTemplate """
        <div ag-tab-post-render></div>
      """, $injector, $scope

    it "turns off tab loading", ->
      expect($parentScope.contentLoading).to.be.false

    it "turns off tab content loading", ->
      expect($parentScope.currentTab().loading).to.be.false
