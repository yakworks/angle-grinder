'use strict'
/**
* A simple directive to toggle a class to an element.
*/
import commonModule from '../commonModule'
import { isAttrTruthy } from '../../utils/ngHelpers'
// import _ from 'lodash'

angular.module(commonModule)
  .factory('ToggleHelper', function($rootScope) {
    return {

      events: {
        toggle: 'ag.toggle',
        toggleByClass: 'ag.toggleByClass',
        togglerLinked: 'ag.linked',
        toggleableToggled: 'ag.toggled'
      },

      commands: {
        alternate: 'toggle',
        activate: 'on',
        deactivate: 'off'
      },

      toggle: function(target, command) {
        if (command == null) {
          command = 'toggle'
        }
        $rootScope.$emit(this.events.toggle, target, command)
      },

      toggleByClass: function(targetClass, command) {
        if (command == null) {
          command = 'toggle'
        }
        $rootScope.$emit(this.events.toggleByClass, targetClass, command)
      },

      notifyToggleState: function(elem, attrs, toggleState) {
        $rootScope.$emit(this.events.toggleableToggled, attrs.id, toggleState, attrs.exclusionGroup)
      },

      toggleStateChanged: function(elem, attrs, toggleState) {
        this.updateElemClasses(elem, attrs, toggleState)
        this.notifyToggleState(elem, attrs, toggleState)
      },

      applyCommand: function(command, oldState) {
        switch (command) {
          case this.commands.activate:
            return true
          case this.commands.deactivate:
            return false
          case this.commands.alternate:
            return !oldState
        }
      },

      updateElemClasses: function(elem, attrs, active) {
        var parent = elem.parent()

        if (active) {
          if (attrs.activeClass) {
            elem.addClass(attrs.activeClass)
          }
          if (attrs.inactiveClass) {
            elem.removeClass(attrs.inactiveClass)
          }

          if (attrs.parentActiveClass) {
            parent.addClass(attrs.parentActiveClass)
          }
          if (attrs.parentInactiveClass) {
            parent.removeClass(attrs.parentInactiveClass)
          }
        } else { // inactive
          if (attrs.inactiveClass) {
            elem.addClass(attrs.inactiveClass)
          }
          if (attrs.activeClass) {
            elem.removeClass(attrs.activeClass)
          }
          if (attrs.parentInactiveClass) {
            parent.addClass(attrs.parentInactiveClass)
          }
          if (attrs.parentActiveClass) {
            parent.removeClass(attrs.parentActiveClass)
          }
        }
      }
    }
  })
  .run(function($rootScope, ToggleHelper) {
    $rootScope.toggle = function(target, command) {
      if (command == null) {
        command = 'toggle'
      }
      ToggleHelper.toggle(target, command)
    }

    $rootScope.toggleByClass = function(targetClass, command) {
      if (command == null) {
        command = 'toggle'
      }
      ToggleHelper.toggleByClass(targetClass, command)
    }
  })
  .directive('toggler', function($rootScope, ToggleHelper) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        const options = scope.$eval(attrs.toggler) || { id: attrs.toggler }
        var action = options.action || 'toggle'
        var tagetId = options.id
        var targetClass = options.class
        var bubble = isAttrTruthy(scope, options.bubble)

        elem.on('click tap', function(e) {
          var angularElem = angular.element(e.target)
          if (!angularElem.hasClass('disabled')) {
            if (tagetId != null) {
              ToggleHelper.toggle(tagetId, action)
            }
            if (targetClass != null) {
              ToggleHelper.toggleByClass(targetClass, action)
            }
            if (!bubble) {
              e.preventDefault()
              return false
            } else {
              return true
            }
          }
        })
        var unbindUpdateElemClasses = $rootScope.$on(ToggleHelper.events.toggleableToggled, function(e, id, newState) {
          if (id === tagetId) {
            ToggleHelper.updateElemClasses(elem, attrs, newState)
          }
        })

        if (tagetId != null) {
          $rootScope.$emit(ToggleHelper.events.togglerLinked, tagetId)
        }

        scope.$on('$destroy', unbindUpdateElemClasses)
      }
    }
  })
  .directive('toggleable', function($rootScope, ToggleHelper) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var toggleState = false

        if (attrs.default) {
          switch (attrs.default) {
            case 'active':
              toggleState = true
              break
            case 'inactive':
              toggleState = false
          }
          ToggleHelper.toggleStateChanged(elem, attrs, toggleState)
        }

        // each event returns a function that when called will unbind and clean up
        var unbindToggle = $rootScope.$on(ToggleHelper.events.toggle, function(e, target, command) {
          var oldState
          if (target === attrs.id) {
            oldState = toggleState
            toggleState = ToggleHelper.applyCommand(command, oldState)
            if (oldState !== toggleState) {
              ToggleHelper.toggleStateChanged(elem, attrs, toggleState)
            }
          }
        })

        var unbindToggleByClass = $rootScope.$on(ToggleHelper.events.toggleByClass, function(e, targetClass, command) {
          var oldState
          if (elem.hasClass(targetClass)) {
            oldState = toggleState
            toggleState = ToggleHelper.applyCommand(command, oldState)
            if (oldState !== toggleState) {
              ToggleHelper.toggleStateChanged(elem, attrs, toggleState)
            }
          }
        })

        var unbindToggleableToggled = $rootScope.$on(ToggleHelper.events.toggleableToggled, function(e, target, newState, sameGroup) {
          if (newState && (attrs.id !== target) && (attrs.exclusionGroup === sameGroup) && (attrs.exclusionGroup != null)) {
            toggleState = false
            ToggleHelper.toggleStateChanged(elem, attrs, toggleState)
          }
        })

        var unbindTogglerLinked = $rootScope.$on(ToggleHelper.events.togglerLinked, function(e, target) {
          if (attrs.id === target) {
            ToggleHelper.notifyToggleState(elem, attrs, toggleState)
          }
        })

        scope.$on('$destroy', function() {
        // call each of the event functions to unbind and cleanup on destroy
          unbindToggle()
          unbindToggleByClass()
          unbindToggleableToggled()
          unbindTogglerLinked()
        })
      }
    }
  })
