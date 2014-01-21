describe "Application routes", ->

  # create spy on `userResolver` service
  beforeEach module "angleGrinder.resources", ($provide) ->
    $provide.value "userResolver", sinon.spy()
    return

  beforeEach module "angleGrinder"

  beforeEach ->
    module "templates/angleGrinder.html"
    module "templates/documentation.html"

    module "templates/gridExample/list.html"
    module "templates/usersDialog/list.html"
    module "templates/users/list.html"
    module "templates/users/show.html"
    module "templates/users/form.html"

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
    expect($route.current.templateUrl).to.equal("templates/angleGrinder.html")

  it "recognizes `/examples/gridExample`", ->
    navigateTo "/examples/gridExample"
    expect($route.current.templateUrl).to.equal("templates/gridExample/list.html")
    expect($route.current.controller).to.equal("gridExample.ListCtrl")

  it "recognizes `/examples/usersDialog`", ->
    navigateTo "/examples/usersDialog"
    expect($route.current.templateUrl).to.equal("templates/usersDialog/list.html")
    expect($route.current.controller).to.equal("usersDialog.ListCtrl")

  it "recognizes `/examples/users`", ->
    navigateTo "/examples/users"
    expect($route.current.templateUrl).to.equal("templates/users/list.html")
    expect($route.current.controller).to.equal("users.ListCtrl")

  it "recognizes `/examples/users/create`", ->
    navigateTo "/examples/users/create"
    expect($route.current.templateUrl).to.equal("templates/users/form.html")
    expect($route.current.controller).to.equal("users.FormCtrl")
    expect($route.current.resolve.user).to.not.be.undefined

  it "recognizes `/examples/users/:id`", inject (userResolver) ->
    # When
    navigateTo "/examples/users/12345"
    expect(userResolver.calledWith("12345")).to.be.true

    # Then
    expect($route.current.templateUrl).to.equal("templates/users/show.html")
    expect($route.current.controller).to.equal("users.ShowCtrl")

  it "recognizes `/examples/users/:id/edit`", inject ($q, userResolver) ->
    # When
    navigateTo "/examples/users/234/edit"
    expect(userResolver.calledWith("234")).to.be.true

    # Then
    expect($route.current.templateUrl).to.equal("templates/users/form.html")
    expect($route.current.controller).to.equal("users.FormCtrl")
    expect($route.current.resolve.user).to.not.be.undefined
