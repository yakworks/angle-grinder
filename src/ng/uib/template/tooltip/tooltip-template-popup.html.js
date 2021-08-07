angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-template-popup.html",
    "<div class=\"arrow\"></div>\n" +
    "<div class=\"tooltip-inner\"\n" +
    "  uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "  tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "");
}]);
