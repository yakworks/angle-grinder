import angular from 'angular'
import _ from 'lodash'
import { setupData } from './dataQuery'
require('Select2/select2.js')

/**
 * Copied from https://github.com/angular-ui/ui-select2 and modifed for es6 modules.
 * TODO still need to fix failing tests
 */
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
    return {
      require: 'ngModel',
      priority: 1,
      compile: function(tElm, tAttrs) {
        // if its populated from a select element and not from options.data

        var isMultiple = angular.isDefined(tAttrs.multiple)
        // console.log("api-key attr", tAttrs.apiKey)
        var isSelectElm = tElm.is('select')
        var watchSelectOptionsEl

        // Enable watching of the options dataset if its an html select
        if (isSelectElm) {
          const repeatOption = tElm.find('optgroup[ng-repeat], optgroup[data-ng-repeat], option[ng-repeat], option[data-ng-repeat]')

          if (repeatOption.length) {
            const repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat')
            watchSelectOptionsEl = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop()
          }
        }

        // var elname = tElm.attr('name') // for logging
        const log = function(msg, val) {
          // console.log(`[${elname}] - ${msg}`, val)
        }

        return {
          pre: function(scope, elm, attrs, ngModelCtrl) {
            // instance-specific options
            var defaults = {
              allowClear: true
            }
            var opts = angular.extend({}, defaults, scope.$eval(attrs.uiSelect2))
            // select2 needs placeholder if allowClear=true.
            if (opts.allowClear && !attrs.placeholder && !opts.placeholder) {
              opts.placeholder = ' '
            }
            // if ui-select2-data attribute is set then assign it
            const dataAttr = scope.$eval(attrs.uiSelect2Data)
            if (dataAttr) {
              opts.data = dataAttr
            }

            if (opts.multiple) {
              isMultiple = true
              if (_.isUndefined(opts.closeOnSelect)) opts.closeOnSelect = false
            }
            const apiKey = attrs.apiKey
            if (apiKey) opts.dataApiKey = apiKey
            setupData(opts, dataStoreApi)

            // if(attrs.uiSelect2Data) opts.data = scope.$eval(attrs.uiSelect2Data)
            // if modelType is object then will use the elm.select2('data') and will store the selected
            // object(s) in the ng-model as objects instead of as just the ids
            // let useDataObject = false
            let dataVar = 'val'
            const idProp = opts.idProp ? opts.idProp : 'id'

            // uses elm.select2('val') when its a select and we want the id in the model not the object.
            // when its on and input and its set to multiple then we will use 'data' so it creates and array of obbjecgs for
            // selection and not array of ids
            if (opts.useDataObject === undefined && !isSelectElm && isMultiple) {
              opts.useDataObject = true
            }

            // don't do initSelection with useDataObject, its screws it up and preruns the promise for rest
            if (!opts.initSelection && opts.useDataObject) opts.initSelection = function(element, callback) { }
            // if initSelection is a boolean true then remove it so the default in Select2 can take over
            // useful to set true on single selects when you only id and want to get the name display from select2
            if (opts.initSelection === true) delete opts.initSelection

            if (opts.useDataObject) {
              // useDataObject = true
              dataVar = 'data'
            }
            log(`isSelectElm: ${isSelectElm} , isMultiple: ${isMultiple}, dataVar: ${dataVar}`)

            if (isSelectElm) {
              // Use <select multiple> instead
              delete opts.multiple
              delete opts.initSelection
            } else if (isMultiple) {
              opts.multiple = true
            }

            const updateSelectFromModel = function() {
              log(`Initialize elm.select2(${dataVar}, ngModelCtrl.$modelValue)`, ngModelCtrl.$modelValue)
              const mdata = ngModelCtrl.$modelValue
              // if its useDataObject & existing data has only and "id" then let select pick it up
              if (opts.useDataObject && !opts.multiple && _.keys(mdata).length === 1) {
                elm.select2('val', mdata[idProp])
              } else if (opts.useDataObject || opts.multiple) { // if its multi, always use 'data'
                elm.select2(dataVar, mdata)
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

              // Watch the html select options for changes
              if (isSelectElm && watchSelectOptionsEl) {
                scope.$watch(watchSelectOptionsEl, function(newVal, oldVal, scope) {
                  // Delayed so that the options have time to be rendered
                  $timeout(function() {
                    // console.log("$timeout elm.select2('val', ngModelCtrl.$viewValue)", ngModelCtrl.$viewValue)
                    elm.select2(dataVar, ngModelCtrl.$viewValue)
                    // Refresh angular to remove the superfluous option
                    // renFunc()
                    if (newVal && !oldVal && ngModelCtrl.$setPristine) {
                      ngModelCtrl.$setPristine(true)
                    }
                  })
                })
              }

              if (!isSelectElm) {
                const showSelectAll = opts.showSelectAll
                if (showSelectAll) {
                  // if it has opts.showSelectAll the add menu item
                  // console.log("opts.data", opts.data)
                  // opts.data.results = [{ id: 'selectAll' }, ...opts.data.results]
                  opts.formatResult = function(object, container, query) {
                    log('formatResult', object)
                    if (object.id === 'selectAll') {
                      return `
                        <span class="select-all-menu">
                          <span class="select-all">
                          <i class="fas fa-th"></i> Select All &nbsp; | </span>
                          <span class="clear-all"> x Clear All </span>
                        </span>
                      `
                    }
                    return object.name
                  }
                }
                const handleSelectAll = function(e) {
                  if (!showSelectAll) return // exit fast if we showSelectAll menu is not enabled
                  if (_.includes(e.val, 'selectAll')) {
                    // dataResults is set on first query to show.
                    Promise.resolve(opts.dataResults).then(res => {
                      var selected = []
                      res.forEach(item => {
                        if (item.id !== 'selectAll') {
                          selected[selected.length] = item
                        }
                      })
                      elm.select2(dataVar, selected)
                      elm.select2('close')
                      ngModelCtrl.$setViewValue(elm.select2(dataVar))
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
                    ngModelCtrl.$setViewValue(elm.select2(dataVar))
                  })
                })
              }

              // if its ajax & multiple & closeOnSelect then tweak a hack so it stays open
              // from https://github.com/select2/select2/issues/2264#issuecomment-213003190
              // if (opts.multiple && opts.ajax && !opts.closeOnSelect) {
              //   elm.bind('select2-selecting', function(e) {
              //     e.preventDefault()
              //     var data = ngModelCtrl.$modelValue || []
              //     data.push(e.object)
              //     ngModelCtrl.$setViewValue(data)
              //   })
              // }
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
              log(`Initialize -- isSelectElm:${isSelectElm} isMultiple:${isMultiple}`)

              // const cdata = _.cloneDeep(opts.data)
              // delete opts.data.results;
              // if(opts.data) opts.query = dataQuery(opts.data)

              // initialize the select2
              var select2 = elm.select2(opts).data('select2')

              // see https://stackoverflow.com/questions/15636302/attach-click-event-to-element-in-select2-result/15637696#15637696
              select2.onSelect = (function(fn) {
                return function(data, options) {
                  var target = (options != null) ? $(options.target) : false
                  // clear all menu item if showSelectAll is true
                  if (target && target.hasClass('clear-all')) {
                    elm.select2(dataVar, [])
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

              // Not sure if I should just check for !isSelectElm OR if I should check for 'tags' key
              // if (!opts.initSelection && !isSelectElm) {
              //   let amodel = convertToAngularModel(elm.select2('data'))
              //   log("not !opts.initSelection && !isSelectElm convertToAngularModel(elm.select2('data'))")
              //   var isPristine = ngModelCtrl.$pristine
              //   ngModelCtrl.$pristine = false
              //   log("calling ngModelCtrl.$setViewValue with ", amodel)
              //   ngModelCtrl.$setViewValue(amodel)
              //   if (isPristine) {
              //     ngModelCtrl.$setPristine()
              //   }
              //   elm.prev().toggleClass('ng-pristine', ngModelCtrl.$pristine)
              // }
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
