/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const app = angular.module("angleGrinder.common");

app.value("requiredResourceFields", ["id"]);

app.factory("restrictResource", [
  "$log", "DeepDiffServ", "resourceBuilder", "requiredResourceFields",
  ($log, DeepDiffServ, resourceBuilder, requiredResourceFields) => (function(resource, allowedFields) {
    if (allowedFields == null) { allowedFields = []; }
    angular.extend(resource, {
      $cacheData() {
        return this.$cachedData = this.resourceData();
      },
      $save() {
        const Record = resourceBuilder(this.resourcePath());
        const cached = _.cloneDeep(this.$cachedData);
        const record = new Record(DeepDiffServ(cached, resource.resourceData(), allowedFields, requiredResourceFields));
        record.$save();
        this.$cachedData = _.merge(this.$cachedData, record.resourceData());
        return this;
      },

      save() {
        const Record = resourceBuilder(this.resourcePath());
        const record = new Record(DeepDiffServ(this.$cachedData, resource.resourceData(), allowedFields, requiredResourceFields));
        record.save();
        this.$cachedData = _.merge(this.$cachedData, record.resourceData());
        return this;
      }
    }
    );

    resource.$cacheData();
    return resource;
  })
]);