import angular from 'angular'
import commonModule from '../commonModule'
// TODO: refactor to make it component
angular.module(commonModule).directive('tagInput', () => ({
  restrict: 'E',
  transclude: true,
  scope: {
    tags: '=ngModel'
  },
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },

  link($scope, element, attrs, required) {
    $scope.tagVal = ''
    $scope.style = attrs.style || ''
    $scope.placeholder = attrs.placeholder
    $scope.label = attrs.label
    $scope.defaultWidth = '10px'
    $scope.labelClass = required.formCtrl.labelClass

    $scope.tagArray = function() {
      if ($scope.tags === undefined) { return [] }
      return $scope.tags.split(',').filter(tag => tag !== '')
    }

    $scope.addTag = function() {
      if ($scope.tagVal.length === 0) { return }
      const tagArray = $scope.tagArray()
      if (!Array.from(tagArray).includes($scope.tagVal)) {
        tagArray.push($scope.tagVal)
        $scope.tags = tagArray.join(',')
      }
      return $scope.tagVal = ''
    }

    $scope.deleteTag = function(key) {
      const tagArray = $scope.tagArray()
      if ((tagArray.length > 0) && ($scope.tagVal.length === 0) && (key === undefined)) {
        tagArray.pop()
      } else if (key !== undefined) { tagArray.splice(key, 1) }
      return $scope.tags = tagArray.join(',')
    }

    // $scope.$watch('tagVal', function(newVal, oldVal) {
    //   if ((newVal !== oldVal) || (newVal !== undefined)) {
    //     const tempEl = $('<span>' + newVal + '</span>').appendTo('body')
    //     $scope.inputWidth = tempEl.width() + 5
    //     if ($scope.inputWidth < $scope.defaultWidth) { $scope.inputWidth = $scope.defaultWidth }
    //     return tempEl.remove()
    //   }
    // })

    element.bind('keydown', function(e) {
      const key = e.which

      if ((key === 9) || (key === 13)) { e.preventDefault() }
      if (key === 8) { return $scope.$apply('deleteTag()') }
    })

    element.bind('keyup', function(e) {
      const key = e.which

      // Tab, Enter or , pressed
      if ((key === 9) || (key === 13) || (key === 188)) {
        e.preventDefault()
        return $scope.$apply('addTag()')
      }
    })

    return element.bind('focusout', function(e) {
      e.preventDefault()
      return $scope.$apply('addTag()')
    })
  },

  template: `
<div class="columns">
<ag-label label-class="{{labelClass}}">{{label}}</ag-label>
<div class="field column has-addons mb-0">
  <div class="control is-expanded">
    <div class='tag-input input tags' >
      <span class="tag bg-shade-20" ng-repeat="tag in tagArray() track by $index">
        {{tag}}
        <button class="delete is-small" ng-click='deleteTag($index)'></button>
      </span>
      <input type='text' class="input" ng-model='tagVal' placeholder='{{placeholder}}'/>
    </div>
  </div>
  <div class="control" >
        <ng-transclude class="is-addon"></ng-transclude>
    </div>
</div>
</div>`
}))
