describe "Application routes", ->

  beforeEach module("angleGrinder")

  beforeEach inject ($httpBackend) ->
    partials = [
      "views/gridz_with_toolbar.html"
      "views/simple_jqgrid.html"
      "views/simple_gridz.html"
      "views/jqgrid_basic.html"
    ]

    for partial in partials
      $httpBackend.whenGET(partial).respond({})

  beforeEach inject ($location, $rootScope) ->
    @navigateTo = (path) ->
      $location.path(path)
      $rootScope.$digest()

  it "recognizes '/'", inject ($route) ->
    @navigateTo "/"
    expect($route.current.templateUrl).toEqual("views/gridz_with_toolbar.html")
    expect($route.current.controller).toEqual("GridzWithToolbarCtrl")

  it "recognizes '/simple_jqgrid'", inject ($route) ->
    @navigateTo "/simple_jqgrid"
    expect($route.current.templateUrl).toEqual("views/simple_jqgrid.html")
    expect($route.current.controller).toEqual("SimpleJqGridCtrl")

  it "recognizes '/simple_gridz'", inject ($route) ->
    @navigateTo "/simple_gridz"
    expect($route.current.templateUrl).toEqual("views/simple_gridz.html")
    expect($route.current.controller).toEqual("SimpleGridzCtrl")

  it "recognizes '/jqgrid_basic'", inject ($route) ->
    @navigateTo "/jqgrid_basic"
    expect($route.current.templateUrl).toEqual("views/jqgrid_basic.html")
    expect($route.current.controller).toEqual("JqGridBasicCtrl")
