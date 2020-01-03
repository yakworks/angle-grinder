/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("Example Application routes", function() {

  // create spy on `userResolver` service
  beforeEach(module("exampleApp.resources", function($provide) {
    $provide.value("userResolver", sinon.spy());
  })
  );

  beforeEach(module("exampleApp"));

  beforeEach(function() {
    module("templates/angleGrinder.html");
    module("templates/documentation.html");

    module("templates/gridExample/list.html");
    module("templates/usersDialog/list.html");
    module("templates/users/list.html");
    module("templates/users/show.html");
    return module("templates/users/form.html");
  });

  let $rootScope = null;
  let $route = null;
  let $location = null;

  beforeEach(inject(function(_$rootScope_, _$route_, _$location_) {
    $route = _$route_;
    $rootScope = _$rootScope_;
    return $location = _$location_;
  })
  );

  const navigateTo = path => $rootScope.$apply(() => $location.path(path));

  it("recognizes `/`", function() {
    navigateTo("/");
    return expect($route.current.templateUrl).to.equal("templates/angleGrinder.html");
  });

  it("recognizes `/examples/gridExample`", function() {
    navigateTo("/examples/gridExample");
    expect($route.current.templateUrl).to.equal("templates/gridExample/list.html");
    return expect($route.current.controller).to.equal("gridExample.ListCtrl");
  });

  it("recognizes `/examples/usersDialog`", function() {
    navigateTo("/examples/usersDialog");
    expect($route.current.templateUrl).to.equal("templates/usersDialog/list.html");
    return expect($route.current.controller).to.equal("usersDialog.ListCtrl");
  });

  it("recognizes `/examples/users`", function() {
    navigateTo("/examples/users");
    expect($route.current.templateUrl).to.equal("templates/users/list.html");
    return expect($route.current.controller).to.equal("users.ListCtrl");
  });

  it("recognizes `/examples/users/create`", function() {
    navigateTo("/examples/users/create");
    expect($route.current.templateUrl).to.equal("templates/users/form.html");
    expect($route.current.controller).to.equal("users.FormCtrl");
    return expect($route.current.resolve.user).to.not.be.undefined;
  });

  it("recognizes `/examples/users/:id`", inject(function(userResolver) {
    // When
    navigateTo("/examples/users/12345");
    expect(userResolver).to.have.been.calledWith("12345");

    // Then
    expect($route.current.templateUrl).to.equal("templates/users/show.html");
    return expect($route.current.controller).to.equal("users.ShowCtrl");
  })
  );

  return it("recognizes `/examples/users/:id/edit`", inject(function($q, userResolver) {
    // When
    navigateTo("/examples/users/234/edit");
    expect(userResolver).to.have.been.calledWith("234");

    // Then
    expect($route.current.templateUrl).to.equal("templates/users/form.html");
    expect($route.current.controller).to.equal("users.FormCtrl");
    return expect($route.current.resolve.user).to.not.be.undefined;
  })
  );
});
