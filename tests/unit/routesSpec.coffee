describe "Application routes", ->

  # create spy on `userResolver` service
  beforeEach module "angleGrinder.resources", ($provide) ->
    $provide.value "userResolver", sinon.spy()
    return

  beforeEach module "angleGrinder"

  beforeEach ->
    module("templates/docs.html")
    module("templates/docs/develop.html")
    module("templates/docs/sidebar/develop.html")
    module("templates/docs/api.html")
    module("templates/docs/sidebar/api.html")

    module("templates/examples.html")
    module("templates/examples/gridExample/list.html")
    module("templates/examples/usersDialog/list.html")
    module("templates/examples/users/list.html")
    module("templates/examples/users/show.html")
    module("templates/examples/users/form.html")

  $state = null
  navigateTo = null

  beforeEach inject ($rootScope, _$state_) ->
    $state = _$state_

    # shortcut for navigating to the given state with params
    navigateTo = (to, params = {}) ->
      $rootScope.$apply -> $state.go(to, params)

  it "recognizes `docs.develop`", ->
    navigateTo "docs.develop"
    expect($state.current.views[""].templateUrl).to.eq "templates/docs/develop.html"

  it "recognizes `docs.api`", ->
    navigateTo "docs.api"
    expect($state.current.views[""].templateUrl).to.eq "templates/docs/api.html"

  it "recognizes `examples.gridExample`", ->
    navigateTo "examples.gridExample"
    expect($state.current.templateUrl).to.eq "templates/examples/gridExample/list.html"
    expect($state.current.controller).to.eq "gridExample.ListCtrl"

  it "recognizes `examples.usersDialog`", ->
    navigateTo "examples.usersDialog"
    expect($state.current.templateUrl).to.eq "templates/examples/usersDialog/list.html"
    expect($state.current.controller).to.eq "usersDialog.ListCtrl"

  it "recognizes `examples.users.list`", ->
    navigateTo "examples.users.list"
    expect($state.current.templateUrl).to.eq "templates/examples/users/list.html"
    expect($state.current.controller).to.eq "users.ListCtrl"

  it "recognizes `examples.users.create`", ->
    navigateTo ".examples.users.create"
    expect($state.current.templateUrl).to.eq "templates/examples/users/form.html"
    expect($state.current.controller).to.eq "users.FormCtrl"
    expect($state.current.resolve.user).to.not.be.undefined

  it "recognizes `examples.users.show`", inject (userResolver) ->
    # When
    navigateTo "examples.users.show", id: 12345
    expect(userResolver.calledWith("12345")).to.be.true

    # Then
    expect($state.current.templateUrl).to.eq "templates/examples/users/show.html"
    expect($state.current.controller).to.eq "users.ShowCtrl"

  it "recognizes `examples.users.edit`", inject (userResolver) ->
    # When
    navigateTo "examples.users.edit", id: 234
    expect(userResolver.calledWith("234")).to.be.true

    # Then
    expect($state.current.templateUrl).to.eq "templates/examples/users/form.html"
    expect($state.current.controller).to.eq "users.FormCtrl"
    expect($state.current.resolve.user).to.not.be.undefined
