import angular from 'angular'
import _ from 'lodash'
import select2Setup from './select2Setup'

require('Select2/select2.js')

/**
 * Enhanced Select2 Dropmenus
 *
 * @AJAX Mode - When in this mode, your value will be an object (or array of objects) of the data used by Select2
 *     This change is so that you do not have to do an additional query yourself on top of Select2's own query
 * @params [options] {object} The configuration options passed to $.fn.select2(). Refer to the documentation
 */
export default 'ui.select2'

angular.module('ui.select2', [])
  .directive('uiSelect2', function($timeout, dataStoreApi) {
    'ngInject';
    return {
      require: 'ngModel',
      priority: 1,
      compile: function(tElm, tAttrs) {

        // var elname = tElm.attr('name') // for logging
        const log = function(msg, val) {
          // console.log(`[${elname}] - ${msg}`, val)
        }

        return {
          pre: function(scope, elm, attrs, ngModelCtrl) {

            var opts = angular.extend({}, scope.$eval(attrs.uiSelect2))
            select2Setup(opts, dataStoreApi)

            const updateSelectFromModel = function() {
              // log(`Initialize elm.select2(${dataVar}, ngModelCtrl.$modelValue)`, ngModelCtrl.$modelValue)
              const mdata = ngModelCtrl.$modelValue
              const idProp = opts.idProp
              // if its useDataObject & existing data has only and "id" then let select pick it up
              if (opts.useDataObject && !opts.multiple && Object.keys(mdata).length === 1) {
                elm.select2('val', mdata[idProp])
              } else if (opts.useDataObject || opts.multiple) { // if its multi, always use 'data'
                elm.select2(opts.dataVar, mdata)
              } else {
                elm.select2('val', mdata)
              }
            }

            if (ngModelCtrl) {
              // Watch the model for programmatic changes
              scope.$watch(tAttrs.ngModel, function(current, old) {
                if (_.isEqual(current, old)) return
                updateSelectFromModel()
                // elm.select2(dataVar, current)
                // renFunc()
              }, true)


              const handleSelectAll = function(e) {
                if (!opts.showSelectAll) return // exit fast if we showSelectAll menu is not enabled
                if (_.includes(e.val, 'selectAll')) {
                  // dataResults is set on first query to show.
                  Promise.resolve(opts.dataResults).then(res => {
                    var selected = []
                    res.data.forEach(item => {
                      if (item.id !== 'selectAll') {
                        selected[selected.length] = item
                      }
                    })
                    elm.select2(opts.dataVar, selected)
                    elm.select2('close')
                    ngModelCtrl.$setViewValue(elm.select2(opts.dataVar))
                  })
                }
              }
              // Set the view and model value and update the angular template manually for the ajax/multiple select2.
              elm.bind('change', function(e) {
                e.stopImmediatePropagation()
                handleSelectAll(e)
                if (scope.$$phase || scope.$root.$$phase) {
                  return
                }
                scope.$apply(function() {
                  ngModelCtrl.$setViewValue(elm.select2(opts.dataVar))
                })
              })
            }

            elm.bind('$destroy', function() {
              elm.select2('destroy')
            })

            attrs.$observe('disabled', function(value) {
              elm.select2('enable', !value)
            })

            attrs.$observe('readonly', function(value) {
              elm.select2('readonly', !!value)
            })

            // Initialize the plugin late so that the injected DOM does not disrupt the template compiler
            $timeout(function() {
              // initialize the select2
              var select2 = elm.select2(opts).data('select2')

              // see https://stackoverflow.com/questions/15636302/attach-click-event-to-element-in-select2-result/15637696#15637696
              select2.onSelect = (function(fn) {
                return function(data, options) {
                  var target = (options != null) ? $(options.target) : false
                  // clear all menu item if showSelectAll is true
                  if (target && target.hasClass('clear-all')) {
                    elm.select2(opts.dataVar, [])
                    ngModelCtrl.$setViewValue([])
                    elm.select2('close')
                  } else {
                    return fn.apply(this, arguments)
                  }
                }
              })(select2.onSelect)

              if (ngModelCtrl.$modelValue) {
                updateSelectFromModel()
              }
            })
          },

          post: function(scope, elm, attrs, ngModelCtrl) {
            // Update valid and dirty statuses
            ngModelCtrl.$parsers.push(function(value) {
              var div = elm.prev()
              div
                .toggleClass('ng-invalid', !ngModelCtrl.$valid)
                .toggleClass('ng-valid', ngModelCtrl.$valid)
                .toggleClass('ng-invalid-required', !ngModelCtrl.$valid)
                .toggleClass('ng-valid-required', ngModelCtrl.$valid)
                .toggleClass('ng-dirty', ngModelCtrl.$dirty)
                .toggleClass('ng-pristine', ngModelCtrl.$pristine)
              return value
            })
          }
        }
      }
    }
  })
