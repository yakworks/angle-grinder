/**
 * [jQuery-appear]{@link https://github.com/emn178/jquery-appear}
 *
 * @version 0.2.6
 * @author Yi-Cyuan Chen [emn178@gmail.com]
 * @copyright Yi-Cyuan Chen 2014-2016
 * @license MIT
 */
(function ($, window, document) {
  var KEY = 'jquery-appear';
  var APPEAR_EVENT = 'appear';
  var APPEARING_EVENT = 'appearing';
  var DISAPPEAR_EVENT = 'disappear';
  var EVENTS = [APPEAR_EVENT, APPEARING_EVENT, DISAPPEAR_EVENT];
  var SELECTOR = ':' + KEY;
  var SCROLLER_KEY = KEY + '-scroller';
  var DISPLAY_KEY = KEY + '-display';
  var WATCH_KEY = KEY + '-watch';
  var WATCH_SELECTOR = ':' + WATCH_KEY;
  var MUTATION = window.MutationObserver !== undefined;
  var animationend = 'animationend webkitAnimationEnd oAnimationEnd';
  var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd';
  var screenHeight, screenWidth, init = false, observations = $(), watchObservations = $();

  $.expr[':'][KEY] = function (element) {
    return $(element).data(KEY) !== undefined;
  };

  $.expr[':'][WATCH_KEY] = function (element) {
    return $(element).data(WATCH_KEY) !== undefined;
  };

  function throttle(func) {
    var delay = 10;
    var lastTime = 0;
    var timer;
    return function () {
      var self = this, args = arguments;
      var exec = function () {
        lastTime = new Date();
        func.apply(self, args);
      };
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      var diff = new Date() - lastTime;
      if (diff > delay) {
        exec();
      } else {
        timer = setTimeout(exec, delay - diff);
      }
    };
  }

  function test() {
    var element = $(this);
    var v = element.is(':visible') && visible(this);
    if (v) {
      element.trigger(APPEARING_EVENT);
      if (v != element.data(KEY)) {
        element.trigger(APPEAR_EVENT);
      }
    } else if (v != element.data(KEY)) {
      element.trigger(DISAPPEAR_EVENT);
    }
    
    element.data(KEY, v);
  }

  function visible(element) {
    var rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.top <= screenHeight || rect.bottom >= 0 && rect.bottom <= screenHeight) &&
      (rect.left >= 0 && rect.left <= screenWidth || rect.right >= 0 && rect.right <= screenWidth);
  }

  function resize() {
    screenHeight = window.innerHeight || document.documentElement.clientHeight;
    screenWidth = window.innerWidth || document.documentElement.clientWidth;
    detect();
  }

  var detect = throttle(function () {
    observations = observations.filter(SELECTOR);
    observations.each(test);
  });

  function elementDetect() {
    $(this).find(SELECTOR).each(test);
  }

  function watch() {
    var element = $(this);
    if (!(watchScroller(element) | watchDisplay(element))) {
      return;
    }
    if (element.data(WATCH_KEY)) {
      return;
    }
    element.data(WATCH_KEY, 1);
    watchObservations = watchObservations.add(element);
  }

  function unwatch() {
    var element = $(this);
    if (!element.data(WATCH_KEY)) {
      return;
    }
    if (element.find(SELECTOR).length === 0) {
      element.removeData(SCROLLER_KEY).removeData(DISPLAY_KEY).removeData(WATCH_KEY);
      element.unbind('scroll', elementDetect)._unbindShow(elementDetect);
    }
  }

  function watchScroller(element) {
    if (element.data(SCROLLER_KEY)) {
      return false;
    }
    var overflow = element.css('overflow');
    if (overflow != 'scroll' && overflow != 'auto') {
      return false;
    }
    element.data(SCROLLER_KEY, 1);
    element.bind('scroll', elementDetect);
    return true;
  }

  function watchDisplay(element) {
    if (MUTATION || element.data(DISPLAY_KEY)) {
      return;
    }
    var display = element.css('display');
    if (display != 'none') {
      return;
    }
    element.data(DISPLAY_KEY, 1);
    element._bindShow(elementDetect);
    return true;
  }

  function bind(handleObj) {
    var element = $(this);
    if (element.is(SELECTOR)) {
      return;
    }

    if (!init) {
      init = true;
      resize();
      $(document).ready(function () {
        $(window).on('resize', resize).on('scroll', detect);
        $(document.body).on(animationend + ' ' + transitionend, detect);
      });

      if (MUTATION) {
        var observer = new MutationObserver(detect);
        observer.observe(document, { 
          attributes: true, 
          childList: true, 
          characterData: true,
          subtree: true
        });
      }
    }

    element.data(KEY, false);
    element.parents().each(watch);
    // wait for handler ready
    setTimeout(function () {
      test.call(element[0]);
    }, 1);
    observations = observations.add(this);
  }

  function unbind(handleObj) {
    var element = $(this);
    setTimeout(function () {
      var events = $._data(element[0], 'events') || {};
      var result = false;
      for (var i = 0;i < EVENTS.length;++i) {
        if (events[EVENTS[i]]) {
          result = true;
          break;
        }
      }
      if (result) {
        element.removeData(KEY);
        watchObservations = watchObservations.filter(WATCH_SELECTOR);
        watchObservations.each(unwatch);
      }
    }, 1);
  }

  function refresh(selector) {
    var elements = selector === undefined ? observations : $(selector);
    elements.each(function () {
      var element = $(this);
      if (!element.is(SELECTOR)) {
        return;
      }
      element.parents().each(watch);
    });
  }

  function createEvents() {
    for (var i = 0;i < EVENTS.length;++i) {
      $.event.special[EVENTS[i]] = {
        add: bind,
        remove: unbind
      };
    }
  }

  function setEventPrefix(prefix) {
    for (var i = 0;i < EVENTS.length;++i) {
      delete $.event.special[EVENTS[i]];
    }
    APPEAR_EVENT = prefix + 'appear';
    APPEARING_EVENT = prefix + 'appearing';
    DISAPPEAR_EVENT = prefix + 'disappear';
    EVENTS = [APPEAR_EVENT, APPEARING_EVENT, DISAPPEAR_EVENT];
    createEvents();
  }

  $.appear = {
    check: detect,
    refresh: refresh,
    setEventPrefix: setEventPrefix
  };

  createEvents();

  // SHOW EVENT
  (function () {
    var EVENT = 'jquery-appear-show';
    var SELECTOR_KEY = KEY + '-' + EVENT;
    var SELECTOR = ':' + SELECTOR_KEY;
    var interval = 50, timer, observations = $();

    $.expr[':'][SELECTOR_KEY] = function (element) {
      return $(element).data(SELECTOR_KEY) !== undefined;
    };

    function test() {
      var element = $(this);
      var status = element.css('display') != 'none';
      if (element.data(SELECTOR_KEY) != status) {
        element.data(SELECTOR_KEY, status);
        if (status) {
          element.trigger(EVENT);
        }
      }
    }

    function detect() {
      observations = observations.filter(SELECTOR);
      observations.each(test);
      if (observations.length === 0) {
        timer = clearInterval(timer);
      }
    }

    $.fn._bindShow = function (handler) {
      this.bind(EVENT, handler);
      this.data(SELECTOR_KEY, this.css('display') != 'none');
      observations = observations.add(this);
      if (interval && !timer) {
        timer = setInterval(detect, interval);
      }
    };

    $.fn._unbindShow = function (handler) {
      this.unbind(EVENT, handler);
      this.removeData(SELECTOR_KEY);
    };

    $.appear.setInterval = function (v) {
      if (v == interval || !$.isNumeric(v) || v < 0) {
        return;
      }
      interval = v;
      timer = clearInterval(timer);
      if (interval > 0) {
        timer = setInterval(detect, interval);
      }
    };
  })();
})(jQuery, window, document);
