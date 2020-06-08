import angular from 'angular'
import _ from 'lodash'
import { convertSelect2Data } from './helpers'
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
  .directive('uiSelect2', function($timeout) {
    return {
      require: 'ngModel',
      priority: 1,
      compile: function(tElm, tAttrs) {
        // if its populated from a select element and not from options.data

        var isMultiple = angular.isDefined(tAttrs.multiple)

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
            // setup defaults for data
            if (opts.data) {
              // if data is an array then tranform it down to be a property of results
              if (Array.isArray(opts.data)) {
                // convertSelect2Data makes ['red','green'] into [{id:'red',name'red}, etc...]
                const results = convertSelect2Data(opts.data)
                // console.log('results', results)
                opts.data = { results: results }
              }
              // if data.text is not set then deefault it to name (select2 defaults it to 'text')
              if (opts.data.text === undefined) {
                opts.data.text = 'name'
              }
            }
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
              // const renFunc = function() {
              //   log('elm.select2(dataVar, ngModelCtrl.$modelValue) ', ngModelCtrl.$modelValue)
              //   //elm.select2(dataVar, ngModelCtrl.$modelValue)
              //   updateSelectFromModel()
              // }

              // ngModelCtrl.$render = renFunc

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
                // Set the view and model value and update the angular template manually for the ajax/multiple select2.
                elm.bind('change', function(e) {
                  e.stopImmediatePropagation()
                  console.log("change", e)
                  if(_.includes(e.val, 'all')){
                    console.log("includes opts.data", opts.data)
                    var selected = [];
                    opts.data.results.forEach(item => {
                      if(item.id !== 'all') {
                        selected[selected.length] = item
                      }
                    })
                    elm.select2(dataVar, selected)
                    elm.select2('close')
                  }
                  if (scope.$$phase || scope.$root.$$phase) {
                    return
                  }
                  scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.select2(dataVar))
                  })
                })
                // $('.select2').on("change", function(e) {
                //   if($.inArray('all', e.val)===0){
                //       var selected = [];
                //       $(this).find("option").each(function(i,e){
                //           if($(e).attr("value")=='all' || $(e).attr("value")=='clear')
                //               return true;

                //           selected[selected.length]=$(e).attr("value");
                //       });
                //       $(this).select2('val',selected);
                //   }else if($.inArray('clear', e.val)===0){
                //       $(this).select2('val','');
                //   }
                // });
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
            // console.log("opts for select2",opts)

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
              // console.log("opts for select2",opts)
              // elm.select2(opts)
              var select2 = elm.select2(opts).data("select2")
              // important!
              // ngModelCtrl.$render()
              // see https://stackoverflow.com/questions/15636302/attach-click-event-to-element-in-select2-result/15637696#15637696
              select2.onSelect = (function(fn) {
                return function(data, options) {
                    var target;
                    if (options != null) {
                        target = $(options.target);
                    }
                    console.log("onSelect data", data)
                    console.log("onSelect target", target)
                    if (target && target.hasClass('info')) {
                        alert('click!');
                    } else {
                        return fn.apply(this, arguments);
                    }
                }
              })(select2.onSelect);

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
