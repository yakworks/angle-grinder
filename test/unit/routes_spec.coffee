describe "Application routes", ->
  beforeEach module("angleGrinder")

  beforeEach module("templates/gridz_with_toolbar.html")
  beforeEach module("templates/simple_jqgrid.html")
  beforeEach module("templates/simple_gridz.html")
  beforeEach module("templates/jqgrid_basic.html")
  beforeEach module("templates/ag_grid_directive.html")
  beforeEach module("templates/server_side.html")

  $route = null

  beforeEach inject ($location, $rootScope, $injector) ->
    $route = $injector.get("$route")

    @navigateTo = (path) ->
      $rootScope.$apply -> $location.path(path)

  it "recognizes '/'", ->
    @navigateTo "/"
    expect($route.current.templateUrl).toEqual("templates/gridz_with_toolbar.html")
    expect($route.current.controller).toEqual("GridzWithToolbarCtrl")

  it "recognizes '/simple_jqgrid'", ->
    @navigateTo "/simple_jqgrid"
    expect($route.current.templateUrl).toEqual("templates/simple_jqgrid.html")
    expect($route.current.controller).toEqual("SimpleJqGridCtrl")

  it "recognizes '/simple_gridz'", ->
    @navigateTo "/simple_gridz"
    expect($route.current.templateUrl).toEqual("templates/simple_gridz.html")
    expect($route.current.controller).toEqual("SimpleGridzCtrl")

  it "recognizes '/jqgrid_basic'", ->
    @navigateTo "/jqgrid_basic"
    expect($route.current.templateUrl).toEqual("templates/jqgrid_basic.html")
    expect($route.current.controller).toEqual("JqGridBasicCtrl")

  it "recognizes '/ag_grid_directive'", ->
    @navigateTo "/ag_grid_directive"
    expect($route.current.templateUrl).toEqual("templates/ag_grid_directive.html")
    expect($route.current.controller).toEqual("AgGridDirectiveCtrl")

  it "recognizes '/server_side", ->
    @navigateTo "/server_side"
    expect($route.current.templateUrl).toEqual("templates/server_side.html")
    expect($route.current.controller).toEqual("ServerSideCtrl")
