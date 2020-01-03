var slice = [].slice;

this.BaseCtrl = (function() {
  BaseCtrl.register = function(app, name) {
    var ref;
    if (name == null) {
      name = this.name || ((ref = this.toString().match(/function\s*(.*?)\(/)) != null ? ref[1] : void 0);
    }
    if (typeof app === "string") {
      app = angular.module(app);
    }
    return app.controller(name, this);
  };

  BaseCtrl.inject = function() {
    var ANNOTATION_REG, annotations;
    annotations = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ANNOTATION_REG = /^(\S+)(\s+as\s+(\w+))?$/;
    this.annotations = _.map(annotations, function(annotation) {
      var match;
      match = annotation.match(ANNOTATION_REG);
      return {
        name: match[1],
        identifier: match[3] || match[1]
      };
    });
    return this.$inject = _.map(this.annotations, function(annotation) {
      return annotation.name;
    });
  };

  BaseCtrl.prototype.expose = function() {
    var $scope, members;
    $scope = arguments[0], members = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return _.chain(members).map((function(_this) {
      return function(field) {
        return [field, _this[field]];
      };
    })(this)).each((function(_this) {
      return function(arg) {
        var entity, field;
        field = arg[0], entity = arg[1];
        return $scope[field] = typeof entity === "function" ? _.bind(entity, _this) : entity;
      };
    })(this)).value();
  };

  function BaseCtrl() {
    var annotation, dependencies, i, index, len, ref;
    dependencies = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ref = this.constructor.annotations;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      annotation = ref[index];
      this[annotation.identifier] = dependencies[index];
    }
    if (typeof this.initialize === "function") {
      this.initialize();
    }
  }

  return BaseCtrl;

})();
