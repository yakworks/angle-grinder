import angular from 'angular'
import agSelectModule from './agSelect2Module'
import _ from 'lodash'

var smod = angular.module(agSelectModule)

// Creates select2 component along with the "show" button
// Options:
//   `select-options` takes select2 options from the controller
//   `ng-model` takes a model
smod.directive('agSelect2', [
  '$rootScope', '$compile', '$log', 'pathWithContext',
  ($rootScope, $compile, $log, pathWithContext) => ({
    restrict: 'E',
    replace: true,
    transclude: true,

    scope: {
      selectOptions: '=',
      ngModel: '='
    },

    compile(element, attrs, transclude) {
      // find a template for the result item
      let resultTemplate = null
      const scope = $rootScope.$new()

      transclude(scope, clone => (() => {
        const result = []
        for (element of Array.from(clone)) {
          if (element instanceof HTMLElement && !_.isNil(element.getAttribute('ag-select2-result'))) {
            resultTemplate = element.outerHTML
            break
          } else {
            result.push(undefined)
          }
        }
        return result
      })())

      // pre linking function
      return {
        pre(scope, element, attrs) {
          let options = angular.copy(scope.selectOptions || { multiple: true })
          if (!_.isNil(attrs.selectMultiple)) {
            options.multiple = attrs.selectMultiple === 'true'
          }
          if (!_.isNil(attrs.selectUseDataObject)) {
            options.useDataObject = attrs.selectUseDataObject === 'true'
          }
          scope.options = options

          // read `minimumInputLength` option from the attribute
          if (options.minimumInputLength == null) { options.minimumInputLength = 1 }
          scope.showFill = attrs.fillAll && (attrs.fillAll === 'true')
          if (!_.isNil(attrs.selectMinimumInputLength)) {
            options.minimumInputLength = parseInt(attrs.selectMinimumInputLength)
          }
          if (!_.isNil(attrs.selectAll)) {
            options.minimumInputLength = 0
          }
          // set the default `width`
          if (options.width == null) { options.width = 'resolve' }
          if (options.initSelection == null) { options.initSelection = () => {} }
          if (options.useDataObject == null) { options.useDataObject = true }

          // create `ajax`
          if (_.isNil(options.ajax) && !_.isNil(attrs.selectAjaxUrl)) {
            options.ajax = {
              url: pathWithContext(attrs.selectAjaxUrl),
              data(term, page) {
                return {
                  q: term, // search term (query params)
                  max: 20,
                  page,
                  sort: 'name',
                  order: 'asc'
                }
              },
              results(data, page) {
                const more = page < data.total
                return { results: data.rows, more }
              }
            }

            // read `quietMillis` option from the attribute
            // Number of milliseconds to wait for the user to
            // stop typing before issuing the ajax request
            options.ajax.quietMillis = 500
            if (!_.isNil(attrs.selectAjaxQuietMillis)) {
              options.ajax.quietMillis = parseInt(attrs.selectAjaxQuietMillis)
            }
          }

          // create `formatResult` function from the given template
          if (!_.isNil(resultTemplate)) {
            if (options.formatResult == null) {
              options.formatResult = function(item) {
                options = { interpolate: /\{\{(.+?)\}\}/g }
                return angular.element(_.template(resultTemplate, options)({ item }))
              }
            }
          }

          // create default `formatSelection` method
          if (options.formatSelection == null) { options.formatSelection = item => item.name }

          return $log.debug('[forms] initializing AgSelect2 component', scope.options)
        }
      }
    },

    template: `\
<div class="input-group">
  <input ui-select2="options" ng-model="ngModel" class="form-control" type="hidden"/>
  <select-fill ng-if="showFill"></select-fill>
</div>
\
`
  })
])

smod.directive('agSelect2Open', () => ({
  restrict: 'E',
  replace: true,
  scope: true,

  controller: ['$scope', '$element', ($scope, $element) => $scope.openSelect2 = function() {
    const selectEl = $element.parent().find('.select2-container')
    selectEl.select2('open')
  }
  ],

  template: `\
<span class="input-group-btn">
  <button class="btn open-select2 btn-default " type="button" ng-click="openSelect2()"><i class="fa fa-search"></i></button>
</span>\
`
}))

smod.directive('selectFill', [
  '$http', 'pathWithContext', '$parse',
  ($http, pathWithContext, $parse) => ({
    restrict: 'E',
    replace: true,
    priority: 2000,

    link(scope, $element, attrs) {
      return scope.fill = function() {
        const selectEl = $element.parent().parent().find('div[select-ajax-url]')[0]
        const model = $parse(selectEl.attributes['ng-model'].value)
        return $http.get(pathWithContext(selectEl.attributes['select-ajax-url'].value)).then(function(resp) {
          let result = []
          if (model(scope.$parent.$parent).length < resp.data.rows.length) {
            result = resp.data.rows
          }
          return model.assign(scope.$parent.$parent, result)
        })
      }
    },

    template: `\
<span class="input-group-btn">
  <button class="btn open-select2 btn-default " type="button" ng-click="fill()"><i class="fa fa-truck"></i></button>
</span>\
`
  })
])

smod.directive('agSelect2Fill', [
  '$http', 'pathWithContext', '$parse',
  ($http, pathWithContext, $parse) => ({
    restrict: 'E',
    replace: true,
    scope: true,

    controller: ['$scope', '$element', ($scope, $element) => $scope.fill = function() {
      const selectEl = $element.parent().find('.select2-container')
      const select = document.getElementById(selectEl[0].attributes.id.value.replace('s2id_', ''))
      const model = $parse(angular.element(select)[0].attributes['ng-model'].value)
      let result = _.map(select.options, 'value')
      if (!_.isNil(model($scope.$parent)) && (model($scope.$parent).length === result.length)) {
        result = []
      }
      model.assign($scope.$parent, result)
    }
    ],

    link(scope, $element, attrs) {
      return $element.parent().css('display', 'table')
    },

    template: `\
<span class="input-group-btn">
  <button class="btn open-select2 btn-default " type="button" ng-click="fill()"><i class="fa fa-truck"></i></button>
</span>\
`
  })
])
