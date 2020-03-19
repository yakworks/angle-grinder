// import _ from 'lodash'
import angular from 'angular'

export default angular
  .module('ag.agRipple', [])
  .directive('agRipple', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var x; var y; var size; var offsets
        var func = function(e) {
          var ripple = this.querySelector('.ag-ripple')
          var eventType = e.type
          // Ripple
          if (ripple === null) {
            // Create ripple
            ripple = document.createElement('span')
            ripple.className += ' ag-ripple'

            // Prepend ripple to element
            this.appendChild(ripple, this.firstChild)
          }
          // Set ripple size
          if (!ripple.offsetHeight && !ripple.offsetWidth) {
            size = Math.max(element[0].offsetWidth, element[0].offsetHeight)
            ripple.style.width = size + 'px'
            ripple.style.height = size + 'px'
          }
          // ripple.style.display = 'block'

          // Remove animation effect
          ripple.className = ripple.className.replace(/ ?(animate)/g, '')

          // get click coordinates by event type
          if (eventType === 'mousedown') {
            x = e.pageX
            y = e.pageY
          } else if (eventType === 'touchstart') {
            try {
              var origEvent

              if (typeof e.changedTouches !== 'undefined') {
                origEvent = e.changedTouches[0]
              } else {
                origEvent = e.originalEvent
              }

              x = origEvent.pageX
              y = origEvent.pageY
            } catch (e) {
              // fall back to center of el
              x = ripple.offsetWidth / 2
              y = ripple.offsetHeight / 2
            }
          }

          // set new ripple position by click or touch position
          function getPos(element) {
            var de = document.documentElement
            var box = element.getBoundingClientRect()
            var top = box.top + window.pageYOffset - de.clientTop
            var left = box.left + window.pageXOffset - de.clientLeft
            return { top: top, left: left }
          }

          offsets = getPos(element[0])
          ripple.style.left = (x - offsets.left - size / 2) + 'px'
          ripple.style.top = (y - offsets.top - size / 2) + 'px'

          // Add animation effect
          ripple.className += ' animate'
          // ripple.style.display = 'none'
        }
        // ripple.style.display = 'none'

        var eventType = ('ontouchstart' in document) ? 'touchstart' : 'mousedown'
        element.on(eventType, func)

        // remove the event listener on scope destroy
        scope.$on('$destroy', function() {
          element.off(eventType, func)
        })
      }
    }
  })
  .name
