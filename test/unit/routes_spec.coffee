describe "Application routes", ->

  # create spy on `userResolver` service
  beforeEach module "angleGrinder.resources", ($provide) ->
    $provide.value "userResolver", jasmine.createSpy("userResolver")
    null

  beforeEach module "angleGrinder"

  beforeEach ->
    module("templates/gridz_with_toolbar.html")
    module("templates/simple_jqgrid.html")
    module("templates/simple_gridz.html")
    module("templates/jqgrid_basic.html")
    module("templates/ag_grid_directive.html")
    module("templates/server_side.html")
    module("templates/users/list.html")
    module("templates/users/show.html")
    module("templates/users/edit.html")

  $rootScope = null
  $route = null
  $location = null

  beforeEach inject (_$rootScope_, _$route_, _$location_) ->
    $route = _$route_
    $rootScope = _$rootScope_
    $location = _$location_

  navigateTo = (path) ->
    $rootScope.$apply -> $location.path(path)

  it "recognizes `/`", ->
    navigateTo "/"
    expect($route.current.templateUrl).toEqual("templates/gridz_with_toolbar.html")
    expect($route.current.controller).toEqual("GridzWithToolbarCtrl")

  it "recognizes `/simple_jqgrid`", ->
    navigateTo "/simple_jqgrid"
    expect($route.current.templateUrl).toEqual("templates/simple_jqgrid.html")
    expect($route.current.controller).toEqual("SimpleJqGridCtrl")

  it "recognizes `/simple_gridz`", ->
    navigateTo "/simple_gridz"
    expect($route.current.templateUrl).toEqual("templates/simple_gridz.html")
    expect($route.current.controller).toEqual("SimpleGridzCtrl")

  it "recognizes `/jqgrid_basic`", ->
    navigateTo "/jqgrid_basic"
    expect($route.current.templateUrl).toEqual("templates/jqgrid_basic.html")
    expect($route.current.controller).toEqual("JqGridBasicCtrl")

  it "recognizes `/ag_grid_directive`", ->
    navigateTo "/ag_grid_directive"
    expect($route.current.templateUrl).toEqual("templates/ag_grid_directive.html")
    expect($route.current.controller).toEqual("AgGridDirectiveCtrl")

  it "recognizes `/server_side`", ->
    navigateTo "/server_side"
    expect($route.current.templateUrl).toEqual("templates/server_side.html")
    expect($route.current.controller).toEqual("ServerSideCtrl")

  it "recognizes `/users`", ->
    navigateTo "/users"
    expect($route.current.templateUrl).toEqual("templates/users/list.html")
    expect($route.current.controller).toEqual("users.ListCtrl")

  it "recognizes `/users/12345`", inject (userResolver) ->
    # When
    navigateTo "/users/12345"
    expect(userResolver).toHaveBeenCalledWith("12345")

    # Then
    expect($route.current.templateUrl).toEqual("templates/users/show.html")
    expect($route.current.controller).toEqual("users.ShowCtrl")

  it "recognizes `/users/234/edit`", inject (userResolver) ->
    # When
    navigateTo "/users/234/edit"
    expect(userResolver).toHaveBeenCalledWith("234")

    # Then
    expect($route.current.templateUrl).toEqual("templates/users/edit.html")
    expect($route.current.controller).toEqual("users.EditCtrl")
