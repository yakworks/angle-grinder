/* eslint-disable no-unused-vars, eqeqeq, no-redeclare, no-unmodified-loop-condition */
import angular from 'angular'
// import Log from '@yakit/core/Log'
import _ from 'lodash'
import { getIconClass } from '@yakit/ui/icon'

/**
 * taken from https://github.com/Templarian/ui.bootstrap.contextMenu
 * makes a clickable or right clickable context menu
 */
const MOD_NAME = 'ag.contextMenu'
export default MOD_NAME

const $ = angular.element

// eslint-disable-next-line angular/file-name, angular/no-service-method
angular.module(MOD_NAME, [])
  .constant('ContextMenuEvents', {
    // Triggers when all the context menus have been closed
    ContextMenuAllClosed: 'context-menu-all-closed',
    // Triggers when any single conext menu is called.
    // Closing all context menus triggers this for each level open
    ContextMenuClosed: 'context-menu-closed',
    // Triggers right before the very first context menu is opened
    ContextMenuOpening: 'context-menu-opening',
    // Triggers right after any context menu is opened
    ContextMenuOpened: 'context-menu-opened'
  })
  .directive('contextMenu', function($rootScope, ContextMenuEvents, $q, $document, $window, $compile) {
    'ngInject';
    var _contextMenus = []
    // Contains the element that was clicked to show the context menu
    var _clickedElement = null
    var DEFAULT_ITEM_TEXT = '"New Item'
    var _emptyText = 'empty'

    function createAndAddOptionText(params) {
      // Destructuring:
      var $scope = params.$scope
      var item = params.item
      var event = params.event
      var modelValue = params.modelValue
      var $promises = params.$promises
      var nestedMenu = params.nestedMenu
      var $li = params.$li
      var leftOriented = String(params.orientation).toLowerCase() === 'left'

      var optionText = null

      if (item.html) {
        if (angular.isFunction(item.html)) {
          // runs the function that expects a jQuery/jqLite element
          optionText = item.html($scope)
        } else {
          // Incase we want to compile html string to initialize their custom directive in html string
          if (item.compile) {
            optionText = $compile(item.html)($scope)
          } else {
            // Assumes that the developer already placed a valid jQuery/jqLite element
            optionText = item.html
          }
        }
      } else {
        var $a = $('<a>')
        var $anchorStyle = {}

        if (leftOriented) {
          $anchorStyle.textAlign = 'right'
          $anchorStyle.paddingLeft = '8px'
        } else {
          $anchorStyle.textAlign = 'left'
          $anchorStyle.paddingRight = '8px'
        }

        $a.css($anchorStyle)
        $a.addClass('dropdown-item')
        $a.attr({ tabindex: '-1', href: '#' })

        var textParam = item.text || item.display || item[0]
        var text = DEFAULT_ITEM_TEXT

        if (typeof textParam === 'string') {
          text = textParam
        } else if (typeof textParam === 'function') {
          text = textParam.call($scope, $scope, event, modelValue)
        }

        var $promise = $q.when(text)
        $promises.push($promise)
        $promise.then(function(pText) {
          if (item.icon) {
            $a.append(`<span class="icon is-small mr-1"><i class="${getIconClass(item.icon)}"></i></span>`)
          }
          if (nestedMenu) {
            var $arrow
            var $boldStyle = {
              fontFamily: 'monospace',
              fontWeight: 'bold'
            }

            if (leftOriented) {
              $arrow = '&lt;'
              $boldStyle.float = 'left'
            } else {
              $arrow = '&gt;'
              $boldStyle.float = 'right'
            }

            var $bold = $('<strong style="font-family:monospace;font-weight:bold;float:right;">' + $arrow + '</strong>')
            $bold.css($boldStyle)
            $a.css('cursor', 'default')
            $a.append($bold)
          }
          $a.append(`<span>${pText}</span>`)
        })

        optionText = $a
      }

      $li.append(optionText)

      return optionText
    };

    /**
     * Process each individual item
     *
     * Properties of params:
     * - $scope
     * - event
     * - modelValue
     * - level
     * - item
     * - $ul
     * - $li
     * - $promises
     */
    function processItem(params) {
      var nestedMenu = extractNestedMenu(params)

      // if html property is not defined, fallback to text, otherwise use default text
      // if first item in the item array is a function then invoke .call()
      // if first item is a string, then text should be the string.

      // var text = DEFAULT_ITEM_TEXT
      var currItemParam = angular.extend({}, params)
      var item = params.item
      var enabled = item.enabled === undefined ? item[2] : item.enabled

      currItemParam.nestedMenu = nestedMenu
      currItemParam.enabled = resolveBoolOrFunc(enabled, params)
      currItemParam.text = createAndAddOptionText(currItemParam)

      registerCurrentItemEvents(currItemParam)
    };

    /*
      * Registers the appropriate mouse events for options if the item is enabled.
      * Otherwise, it ensures that clicks to the item do not propagate.
      */
    function registerCurrentItemEvents(params) {
      // Destructuring:
      var item = params.item
      var $ul = params.$ul
      var $li = params.$li
      var $scope = params.$scope
      var modelValue = params.modelValue
      var level = params.level
      var event = params.event
      var text = params.text
      var nestedMenu = params.nestedMenu
      var enabled = params.enabled
      var orientation = String(params.orientation).toLowerCase()
      var customClass = params.customClass
      var contextMenuClick = params.contextMenuClick

      if (enabled) {
        var openNestedMenu = function($event) {
          removeContextMenus(level + 1)
          /*
            * The object here needs to be constructed and filled with data
            * on an "as needed" basis. Copying the data from event directly
            * or cloning the event results in unpredictable behavior.
            */
          /// adding the original event in the object to use the attributes of the mouse over event in the promises
          var ev = {
            pageX: orientation === 'left' ? event.pageX - $ul[0].offsetWidth + 1 : event.pageX + $ul[0].offsetWidth - 1,
            pageY: $ul[0].offsetTop + $li[0].offsetTop - 3,
            // eslint-disable-next-line angular/window-service
            view: event.view || window,
            target: event.target,
            event: $event
          }

          /*
            * At this point, nestedMenu can only either be an Array or a promise.
            * Regardless, passing them to `when` makes the implementation singular.
            */
          $q.when(nestedMenu).then(function(promisedNestedMenu) {
            if (angular.isFunction(promisedNestedMenu)) {
              //  support for dynamic subitems
              promisedNestedMenu = promisedNestedMenu.call($scope, $scope, event, modelValue, text, $li)
            }
            var nestedParam = {
              $scope: $scope,
              event: ev,
              options: promisedNestedMenu,
              modelValue: modelValue,
              level: level + 1,
              orientation: orientation,
              customClass: customClass
            }
            renderContextMenu(nestedParam)
          })
        }

        $li.on('click', function($event) {
          if ($event.which == 1) {
            $event.preventDefault()
            $scope.$apply(function() {
              var cleanupFunction = function() {
                $(event.currentTarget).removeClass('context')
                removeAllContextMenus()
              }
              if (item.action && !item.click) item.click = item.action
              var clickFunction = angular.isFunction(item.click)
                ? item.click
                : (angular.isFunction(item[1])
                  ? item[1]
                  : null)

              clickFunction = clickFunction || contextMenuClick
              const model = modelValue || $scope
              if (clickFunction) {
                var res = clickFunction(model, item, event, $scope)
                if (res === undefined || res) {
                  cleanupFunction()
                }
              } else {
                cleanupFunction()
              }
            })
          }
        })

        $li.on('mouseover', function($event) {
          $scope.$apply(function() {
            if (nestedMenu) {
              openNestedMenu($event)
            } else {
              removeContextMenus(level + 1)
            }
          })
        })
      } else {
        setElementDisabled($li)
      }
    };

    /**
     * @param params - an object containing the `item` parameter
     * @returns an Array or a Promise containing the children,
     *          or null if the option has no submenu
     */
    function extractNestedMenu(params) {
      // Destructuring:
      var item = params.item

      // New implementation:
      if (item.children) {
        if (angular.isFunction(item.children)) {
          // Expects a function that returns a Promise or an Array
          return item.children()
        } else if (angular.isFunction(item.children.then) || angular.isArray(item.children)) {
          // Returns the promise
          // OR, returns the actual array
          return item.children
        }

        return null
      } else {
        // nestedMenu is either an Array or a Promise that will return that array.
        // NOTE: This might be changed soon as it's a hangover from an old implementation

        return angular.isArray(item[1]) ||
            (item[1] && angular.isFunction(item[1].then)) ? item[1] : angular.isArray(item[2]) ||
            (item[2] && angular.isFunction(item[2].then)) ? item[2] : angular.isArray(item[3]) ||
            (item[3] && angular.isFunction(item[3].then)) ? item[3] : null
      }
    }

    /**
     * Responsible for the actual rendering of the context menu.
     *
     * The parameters in params are:
     * - $scope = the scope of this context menu
     * - event = the event that triggered this context menu
     * - options = the options for this context menu
     * - modelValue = the value of the model attached to this context menu
     * - level = the current context menu level (defauts to 0)
     * - customClass = the custom class to be used for the context menu
     */
    function renderContextMenu(params) {
      /// <summary>Render context menu recursively.</summary>
      var options = params.options

      // Initialize the container. This will be passed around
      var $ul = initContextMenuContainer(params)
      params.$ul = $ul

      // Register this level of the context menu
      _contextMenus.push($ul)

      /*
        * This object will contain any promises that we have
        * to wait for before trying to adjust the context menu.
        */
      var $promises = []
      params.$promises = $promises

      let optsArray = options
      if (_.isPlainObject(options)) {
        optsArray = _.map(options, (val, key) => {
          val.key = key
          return val
        })
      }
      // Log.debug("optsArray", optsArray)

      optsArray.forEach(function(item) {
        // Log.debug("item", item)
        if (item === null || item.divider) {
          appendDivider($ul)
        } else {
          // If displayed is anything other than a function or a boolean
          var displayed = resolveBoolOrFunc(item.displayed, params)
          if (item.class === 'hidden') displayed = false

          // Only add the <li> if the item is displayed
          if (displayed) {
            var $li = $('<li>')
            var itemParams = angular.extend({}, params)
            itemParams.item = item
            itemParams.$li = $li

            processItem(itemParams)

            if (resolveBoolOrFunc(item.hasTopDivider, itemParams, false)) {
              appendDivider($ul)
            }
            $ul.append($li)
            if (resolveBoolOrFunc(item.hasBottomDivider, itemParams, false)) {
              appendDivider($ul)
            }
          }
        }
      })

      if ($ul.children().length === 0) {
        var $emptyLi = angular.element('<li>')
        setElementDisabled($emptyLi)
        $emptyLi.html('<a>' + _emptyText + '</a>')
        $ul.append($emptyLi)
      }

      $document.find('body').append($ul)

      doAfterAllPromises(params)

      $rootScope.$broadcast(ContextMenuEvents.ContextMenuOpened, {
        context: _clickedElement,
        contextMenu: $ul,
        params: params
      })
    };

    /**
     * calculate if drop down menu would go out of screen at left or bottom
     * calculation need to be done after element has been added (and all texts are set; thus the promises)
     * to the DOM the get the actual height
     */
    function doAfterAllPromises(params) {
      // Desctructuring:
      var $ul = params.$ul
      var $promises = params.$promises
      var level = params.level
      var event = params.event
      var leftOriented = String(params.orientation).toLowerCase() === 'left'

      $q.all($promises).then(function() {
        var topCoordinate = event.pageY
        var menuHeight = angular.element($ul[0]).prop('offsetHeight')
        var winHeight = $window.pageYOffset + event.view.innerHeight

        /// the 20 pixels in second condition are considering the browser status bar that sometimes overrides the element
        if (topCoordinate > menuHeight && winHeight - topCoordinate < menuHeight + 20) {
          topCoordinate = event.pageY - menuHeight
          /// If the element is a nested menu, adds the height of the parent li to the topCoordinate to align with the parent
          if (level && level > 0) {
            topCoordinate += event.event.currentTarget.offsetHeight
          }
        } else if (winHeight <= menuHeight) {
          // If it really can't fit, reset the height of the menu to one that will fit
          angular.element($ul[0]).css({ height: winHeight - 5, 'overflow-y': 'scroll' })
          // ...then set the topCoordinate height to 0 so the menu starts from the top
          topCoordinate = 0
        } else if (winHeight - topCoordinate < menuHeight) {
          var reduceThresholdY = 5
          if (topCoordinate < reduceThresholdY) {
            reduceThresholdY = topCoordinate
          }
          topCoordinate = winHeight - menuHeight - reduceThresholdY
        }

        var leftCoordinate = event.pageX
        var menuWidth = angular.element($ul[0]).prop('offsetWidth')
        var winWidth = event.view.innerWidth + window.pageXOffset
        var padding = 5

        if (leftOriented) {
          if (winWidth - leftCoordinate > menuWidth && leftCoordinate < menuWidth + padding) {
            leftCoordinate = padding
          } else if (leftCoordinate < menuWidth) {
            var reduceThresholdX = 5
            if (winWidth - leftCoordinate < reduceThresholdX + padding) {
              reduceThresholdX = winWidth - leftCoordinate + padding
            }
            leftCoordinate = menuWidth + reduceThresholdX + padding
          } else {
            leftCoordinate = leftCoordinate - menuWidth
          }
        } else {
          if (leftCoordinate > menuWidth && winWidth - leftCoordinate - padding < menuWidth) {
            leftCoordinate = winWidth - menuWidth - padding
          } else if (winWidth - leftCoordinate < menuWidth) {
            var reduceThresholdX = 5
            if (leftCoordinate < reduceThresholdX + padding) {
              reduceThresholdX = leftCoordinate + padding
            }
            leftCoordinate = winWidth - menuWidth - reduceThresholdX - padding
          }
        }

        $ul.css({
          display: 'block',
          position: 'absolute',
          left: leftCoordinate + 'px',
          top: topCoordinate + 'px'
        })
      })
    };

    /**
     * Creates the container of the context menu (a <ul> element),
     * applies the appropriate styles and then returns that container
     *
     * @return a <ul> jqLite/jQuery element
     */
    function initContextMenuContainer(params) {
      // Destructuring
      var customClass = params.customClass

      var $ul = $('<ul>')
      $ul.addClass('dropdown-menu-list dropdown-content')
      $ul.attr({ role: 'menu' })
      $ul.css({
        display: 'block',
        position: 'absolute',
        left: params.event.pageX + 'px',
        top: params.event.pageY + 'px',
        'z-index': 10000
      })
      if (customClass) { $ul.addClass(customClass) }

      return $ul
    }

    function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints // works on most browsers | works on IE10/11 and Surface
    }

    /**
     * Removes the context menus with level greater than or equal
     * to the value passed. If undefined, null or 0, all context menus
     * are removed.
     */
    function removeContextMenus(level) {
      while (_contextMenus.length && (!level || _contextMenus.length > level)) {
        var cm = _contextMenus.pop()
        $rootScope.$broadcast(ContextMenuEvents.ContextMenuClosed, { context: _clickedElement, contextMenu: cm })
        cm.remove()
      }
      if (!level) {
        $rootScope.$broadcast(ContextMenuEvents.ContextMenuAllClosed, { context: _clickedElement })
      }
    }

    function removeOnScrollEvent(e) {
      removeAllContextMenus(e)
    }

    function removeOnOutsideClickEvent(e) {
      var $curr = $(e.target)
      var shouldRemove = true

      while ($curr.length) {
        if ($curr.hasClass('dropdown-menu-list')) {
          shouldRemove = false
          break
        } else {
          $curr = $curr.parent()
        }
      }
      if (shouldRemove) {
        removeAllContextMenus(e)
      }
    }

    function removeAllContextMenus(e) {
      $document.find('body').off('mousedown touchstart', removeOnOutsideClickEvent)
      $document.off('scroll', removeOnScrollEvent)
      $(_clickedElement).removeClass('context')
      removeContextMenus()
      $rootScope.$broadcast('')
    }

    function isBoolean(a) {
      return a === false || a === true
    }

    /** Resolves a boolean or a function that returns a boolean
     * Returns true by default if the param is null or undefined
     * @param a - the parameter to be checked
     * @param params - the object for the item's parameters
     * @param defaultValue - the default boolean value to use if the parameter is
     *  neither a boolean nor function. True by default.
     */
    function resolveBoolOrFunc(a, params, defaultValue) {
      var item = params.item
      var $scope = params.$scope
      var event = params.event
      var modelValue = params.modelValue

      defaultValue = isBoolean(defaultValue) ? defaultValue : true

      if (isBoolean(a)) {
        return a
      } else if (angular.isFunction(a)) {
        return a.call($scope, $scope, event, modelValue)
      } else {
        return defaultValue
      }
    }

    function appendDivider($ul) {
      var $li = angular.element('<li>')
      $li.addClass('divider')
      $ul.append($li)
    }

    function setElementDisabled($li) {
      $li.on('click', function($event) {
        $event.preventDefault()
      })
      $li.addClass('disabled')
    }

    function contextEvent(event, $scope, element, attrs) {
      // Cleanup any leftover contextmenus(there are cases with longpress on touch where we
      // still see multiple contextmenus)
      removeAllContextMenus()

      if (!attrs.allowEventPropagation) {
        event.stopPropagation()
        event.preventDefault()
      }

      // Don't show context menu if on touch device and element is draggable
      if (isTouchDevice() && element.attr('draggable') === 'true') {
        return false
      }

      // Remove if the user clicks outside
      $document.find('body').on('mousedown touchstart', removeOnOutsideClickEvent)
      // Remove the menu when the scroll moves
      $document.on('scroll', removeOnScrollEvent)

      _clickedElement = event.currentTarget
      $(_clickedElement).addClass('context')

      $scope.$apply(function() {
        var options = $scope.$eval(attrs.contextMenu)
        var customClass = attrs.contextMenuClass
        var ctxModelValue = $scope.$eval(attrs.contextMenuModel)
        var model = $scope.$eval(attrs.model)
        var modelValue = model || ctxModelValue
        var contextMenuClick = $scope.$eval(attrs.contextMenuClick)
        var orientation = attrs.contextMenuOrientation

        $q.when(options).then(function(promisedMenu) {
          if (angular.isFunction(promisedMenu)) {
            //  support for dynamic items
            promisedMenu = promisedMenu.call($scope, $scope, event, modelValue)
          }
          var params = {
            $scope: $scope,
            event: event,
            options: promisedMenu,
            contextMenuClick: contextMenuClick,
            modelValue: modelValue,
            level: 0,
            customClass: customClass,
            orientation: orientation
          }
          $rootScope.$broadcast(ContextMenuEvents.ContextMenuOpening, { context: _clickedElement })
          renderContextMenu(params)
        })
      })

      // Remove all context menus if the scope is destroyed
      $scope.$on('$destroy', function() {
        removeAllContextMenus()
      })
    }

    return function($scope, element, attrs) {
      var openMenuEvents = ['contextmenu']
      _emptyText = $scope.$eval(attrs.contextMenuEmptyText) || 'empty'

      if (attrs.contextMenuOn && typeof (attrs.contextMenuOn) === 'string') {
        openMenuEvents = attrs.contextMenuOn.split(',')
      }
      // tweaks for gridz, if its a grid then add add click to element
      // and contextmenu to the parent.parent which is the tr row
      if (attrs.contextMenuOn === 'gridz') {
        element.parent().parent().on('contextmenu', (e) => contextEvent(e, $scope, element, attrs))
        element.on('click', (e) => contextEvent(e, $scope, element, attrs))
      } else {
        openMenuEvents.forEach(function(openMenuEvent) {
          element.on(openMenuEvent.trim(), (e) => contextEvent(e, $scope, element, attrs))
        })
      }

      if (attrs.closeMenuOn) {
        $scope.$on(attrs.closeMenuOn, function() {
          removeAllContextMenus()
        })
      }
    }
  })
