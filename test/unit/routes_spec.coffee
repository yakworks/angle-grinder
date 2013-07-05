describe "Application routes", ->
  beforeEach module("angleGrinder")

  beforeEach inject ($location, $rootScope) ->
    @navigateTo = (path) ->
      $location.path(path)
      $rootScope.$digest()

  it "recognizes '/'", inject ($route) ->
    @navigateTo "/"
    expect($route.current.templateUrl).toEqual("templates/gridz_with_toolbar.html")
    expect($route.current.controller).toEqual("GridzWithToolbarCtrl")

  it "recognizes '/simple_jqgrid'", inject ($route) ->
    @navigateTo "/simple_jqgrid"
    expect($route.current.templateUrl).toEqual("templates/simple_jqgrid.html")
    expect($route.current.controller).toEqual("SimpleJqGridCtrl")

  it "recognizes '/simple_gridz'", inject ($route) ->
    @navigateTo "/simple_gridz"
    expect($route.current.templateUrl).toEqual("templates/simple_gridz.html")
    expect($route.current.controller).toEqual("SimpleGridzCtrl")

  it "recognizes '/jqgrid_basic'", inject ($route) ->
    @navigateTo "/jqgrid_basic"
    expect($route.current.templateUrl).toEqual("templates/jqgrid_basic.html")
    expect($route.current.controller).toEqual("JqGridBasicCtrl")

  it "recognizes '/ag_grid_directive'", inject ($route) ->
    @navigateTo "/ag_grid_directive"
    expect($route.current.templateUrl).toEqual("templates/ag_grid_directive.html")
    expect($route.current.controller).toEqual("AgGridDirectiveCtrl")
