describe("BaseCtrl", function() {

  let app = null;
  beforeEach(function() {
    app = angular.module("testApp", []);
    app.value("foo", "this is foo");
    return app.value("my.foo", "this is other foo");
  });

  describe("basic usage", function() {

    beforeEach(function() {
      class MyCtrl extends BaseCtrl {
        static initClass() {
  
          this.register(app);
          this.inject("$scope", "foo");
        }

        initialize() {
          this.$scope.foo = this.foo;
          return this.$scope.bar = "bar";
        }
      }
      MyCtrl.initClass();

      return module("testApp");
    });

    return it("registers the controller with all dependencies", inject(function($rootScope, $controller) {
      let $scope = $rootScope.$new();
      $controller("MyCtrl", {$scope});

      expect($scope.foo).to.eq("this is foo");
      return expect($scope.bar).to.eq("bar");
    })
    );
  });

  describe("when the controller name is specified", function() {

    beforeEach(function() {
      class MyCtrl extends BaseCtrl {
        static initClass() {
  
          this.register(app, "my.controller");
          this.inject("$scope");
        }

        initialize() {
          return this.$scope.foo = "foo";
        }
      }
      MyCtrl.initClass();

      return module("testApp");
    });

    return it("register controller at the different name", inject(function($rootScope, $controller) {
      let $scope = $rootScope.$new();
      $controller("my.controller", {$scope});

      return expect($scope.foo).to.eq("foo");
    })
    );
  });

  describe("when different name for a dependency is specified", function() {

    beforeEach(function() {
      class OtherCtrl extends BaseCtrl {
        static initClass() {
  
          this.register(app);
          this.inject("$scope", "my.foo as foobar");
        }

        initialize() {
          return this.$scope.foo = this.foobar;
        }
      }
      OtherCtrl.initClass();

      return module("testApp");
    });

    return it("registers the dependency under different name", inject(function($rootScope, $controller) {
      let $scope = $rootScope.$new();
      $controller("OtherCtrl", {$scope});

      return expect($scope.foo).to.eq("this is other foo");
    })
    );
  });

  describe("when the module name is given", function() {

    beforeEach(function() {
      class OtherCtrl extends BaseCtrl {
        static initClass() {
  
          this.register("testApp");
          this.inject("$scope", "my.foo as foobar");
        }

        initialize() {
          return this.$scope.foo = this.foobar;
        }
      }
      OtherCtrl.initClass();

      return module("testApp");
    });

    return it("registers under the given module", inject(function($rootScope, $controller) {
      let $scope = $rootScope.$new();
      $controller("OtherCtrl", {$scope});

      return expect($scope.foo).to.eq("this is other foo");
    })
    );
  });

  return describe("expose entitities to the scope", function() {

    beforeEach(function() {
      class MyCtrl extends BaseCtrl {
        static initClass() {
          this.register(app);
          this.inject("$scope", "foo");
        }

        initialize() {
          this.expose(this.$scope, "foo", "doFoo");

          return this.$scope.bar = "bar";
        }

        doFoo() { return this.$scope.called = true; }
      }
      MyCtrl.initClass();

      return module("testApp");
    });

    return it("exposes given entities to the scope", inject(function($rootScope, $controller) {
      let $scope = $rootScope.$new();
      let ctrl = $controller("MyCtrl", {$scope});

      expect($scope.foo).to.eq("this is foo");
      expect($scope.doFoo).to.be.a("function");

      $scope.called = false;
      $scope.doFoo();
      expect($scope.called).to.be.true;

      $scope.called = false;
      ctrl.doFoo();
      return expect($scope.called).to.be.true;
    })
    );
  });
});
