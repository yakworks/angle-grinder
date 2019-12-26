/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common");

app.service("DeepDiffServ", ["DeepPickServ", function(DeepPickServ){
  var map = function(oldVal, newVal, allowed, reqFields) {
    let args;
    let diff = {};

    if (!_.isNil(reqFields) && (reqFields.length > 0)) {
      args = [];
      args.push(newVal);
      args = args.concat(reqFields);
      diff = DeepPickServ.apply(this, args);
    }

    if (!_.isNil(allowed) && (allowed.length > 0)) {
      args = [];
      args.push(newVal);
      args = args.concat(allowed);
      newVal = DeepPickServ.apply(this, args);
    }

    _.forEach(newVal, function(v, k){
      if ((!_.isNil(oldVal) && _.isEqual(v, oldVal[k])) || (k === "$cachedData")) {
        return;
      }
      return diff[k] = _.isObject(v) ? map(oldVal[k], v) : newVal[k];
    });
    return diff;
  };

  return function(oldVal, newVal, allowed, reqFields) {
    if (allowed == null) { allowed = []; }
    if (reqFields == null) { reqFields = []; }
    return map(oldVal, newVal, allowed, reqFields);
  };
}
]);
