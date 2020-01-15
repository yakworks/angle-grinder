import angular from 'angular'
import prettify from 'google-code-prettify/bin/prettify.min.js'
const docs = angular.module("exampleApp.docs", []);

export default "exampleApp.docs"

docs.directive("prettyprint", () => ({
  restrict: "C",
  terminal: true,

  compile(element) {
    const extractLang = function() {
      const classes = element[0].className;

      let lang = "coffee";
      if (classes.indexOf("lang-") !== -1) {
        for (let className of Array.from(classes.split(" "))) {
          if (className.indexOf("lang-") !== -1) {
            lang = className.split("-")[1];
            break;
          }
        }
      }

      return lang;
    };

    const lang = extractLang();
    const code = element.html();

    return element.html(prettify.prettyPrintOne(code, lang, true));
  }
}));

docs.factory("scrollTo", ["$routeParams", "$timeout", ($routeParams, $timeout) => (function(id) {
  const scroll = function() {
    const element = document.getElementById(id);
    if (element != null) { return element.scrollIntoView(); }
  };
  return $timeout(scroll, 10);
})
]);
