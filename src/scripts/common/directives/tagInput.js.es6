/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common");

app.directive('tagInput', () => ({
  restrict: 'E',

  scope: {
    tags: '=ngModel'
  },

  link($scope, element, attrs) {

    $scope.tagVal = '';
    $scope.style = attrs.style || "";
    $scope.placeholder = attrs.placeholder;
    $scope.defaultWidth = '10px';

    $scope.tagArray = function() {
      if ($scope.tags === undefined) { return []; }
      return $scope.tags.split(',').filter(tag => tag !== "");
    };

    $scope.addTag = function() {
      if ($scope.tagVal.length === 0) { return; }
      const tagArray = $scope.tagArray();
      if (!Array.from(tagArray).includes($scope.tagVal)) {
        tagArray.push($scope.tagVal);
        $scope.tags = tagArray.join(',');
      }
      return $scope.tagVal = "";
    };

    $scope.deleteTag = function(key) {
      const tagArray = $scope.tagArray();
      if ((tagArray.length > 0) && ($scope.tagVal.length === 0) && (key === undefined)) {
        tagArray.pop();
      } else if (key !== undefined) { tagArray.splice(key, 1); }
      return $scope.tags = tagArray.join(',');
    };

    $scope.$watch('tagVal', function(newVal, oldVal) {
      if ((newVal !== oldVal) || (newVal !== undefined)) {

        const tempEl = $("<span>" + newVal + "</span>").appendTo("body");
        $scope.inputWidth = tempEl.width() + 5;
        if ($scope.inputWidth < $scope.defaultWidth) { $scope.inputWidth = $scope.defaultWidth; }
        return tempEl.remove();
      }
    });

    element.bind("keydown", function(e) {
      const key = e.which;

      if ((key === 9) || (key === 13)) { e.preventDefault(); }
      if (key === 8) { return $scope.$apply('deleteTag()'); }
    });

    element.bind("keyup", function(e) {
      const key = e.which;

      // Tab, Enter or , pressed
      if ((key === 9) || (key === 13) || (key === 188)) {
        e.preventDefault();
        return $scope.$apply('addTag()');
      }
    });

    return element.bind("focusout", function(e) {
      e.preventDefault();
      return $scope.$apply('addTag()');
    });
  },

  template: "<div class='tagged-input'><div class='tag' ng-repeat=\"tag in tagArray() track by $index\"><a href='javascript:' class='delete-tag' ng-click='deleteTag($index)'><i class='glyphicon glyphicon-remove'></i></a>{{tag}}</div><input type='text' style='width:  {{inputWidth}}' ng-model='tagVal' placeholder='{{placeholder}}'/></div>"
}));
