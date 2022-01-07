// Copy of export * from 'framework7-svelte/esm/shared/utils'
export function noUndefinedProps(obj) {
  var o = {};
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] !== 'undefined') o[key] = obj[key];
  });
  return o;
}
export function isStringProp(val) {
  return typeof val === 'string' && val !== '';
}
export function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}
export function now() {
  return Date.now();
}
export function extend() {
  var deep = true;
  var to;
  var from;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof args[0] === 'boolean') {
    deep = args[0];
    to = args[1];
    args.splice(0, 2);
    from = args;
  } else {
    to = args[0];
    args.splice(0, 1);
    from = args;
  }

  for (var i = 0; i < from.length; i += 1) {
    var nextSource = args[i];

    if (nextSource !== undefined && nextSource !== null) {
      var keysArray = Object.keys(Object(nextSource));

      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

        if (desc !== undefined && desc.enumerable) {
          if (!deep) {
            to[nextKey] = nextSource[nextKey];
          } else if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }

  return to;
}
export function classNames() {
  var classes = [];

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  args.forEach(function (arg) {
    if (typeof arg === 'object' && arg.constructor === Object) {
      Object.keys(arg).forEach(function (key) {
        if (arg[key]) classes.push(key);
      });
    } else if (arg) classes.push(arg);
  });
  var uniqueClasses = [];
  classes.forEach(function (c) {
    if (uniqueClasses.indexOf(c) < 0) uniqueClasses.push(c);
  });
  return uniqueClasses.join(' ');
}
export function createEmitter(createEventDispatcher, props) {
  var dispatch = createEventDispatcher();

  var emit = function emit(events, argsArray) {
    if (!events || !events.trim().length || typeof events !== 'string') return;
    events.trim().split(' ').forEach(function (event) {
      var eventName = (event || '').trim();
      if (!eventName) return;
      var propName = "on" + (eventName.charAt(0).toUpperCase() + eventName.slice(1));
      dispatch(eventName, argsArray);
      if (typeof props[propName] === 'function') props[propName].apply(props, argsArray);
    });
  };

  return emit;
}
var routerIdCounter = 0;
var routerComponentIdCounter = 0;
export function unsetRouterIds() {
  routerIdCounter = 0;
  routerComponentIdCounter = 0;
}
export function getRouterId() {
  routerIdCounter += 1;
  return now() + "_" + routerIdCounter;
}
export function getComponentId() {
  routerComponentIdCounter += 1;
  return now() + "_" + routerComponentIdCounter;
}
export function plainText(text) {
  if (typeof text === 'undefined' || text === null) return '';
  return text;
}
