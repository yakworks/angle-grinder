function ripple(color, centered) {
  var x; var y; var size; var offsets
  return function(event) {
    const target = event.currentTarget

    // --------
    var ripple = this.querySelector('.ag-ripple')
    var eventType = event.type
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
      size = Math.max(target.offsetWidth, target.offsetHeight)
      ripple.style.width = size + 'px'
      ripple.style.height = size + 'px'
    }
    // ripple.style.display = 'block'

    // Remove animation effect
    ripple.className = ripple.className.replace(/ ?(animate)/g, '')

    // get click coordinates by event type
    if (eventType === 'mousedown') {
      x = event.pageX
      y = event.pageY
    } else if (eventType === 'touchstart') {
      try {
        var origEvent

        if (typeof event.changedTouches !== 'undefined') {
          origEvent = event.changedTouches[0]
        } else {
          origEvent = event.originalEvent
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

    offsets = getPos(target)
    ripple.style.left = (x - offsets.left - size / 2) + 'px'
    ripple.style.top = (y - offsets.top - size / 2) + 'px'

    // Add animation effect
    ripple.className += ' animate'
  }
}

export default function r(color = "primary", centered = false) {
  return function(node) {
    const onMouseDown = ripple(color, centered)
    const eventName = ('ontouchstart' in document) ? 'touchstart' : 'mousedown'

    node.addEventListener(eventName, onMouseDown)

    return {
      onDestroy: () => node.removeEventListener(eventName, onMouseDown),
    }
  }
}
