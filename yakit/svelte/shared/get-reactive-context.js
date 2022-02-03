// eslint-disable-next-line
import { getContext, onDestroy } from 'svelte';
export var getReactiveContext = function getReactiveContext(name, setValue) {
  var ctx = getContext(name);
  if (!ctx) return undefined;
  var value = ctx.value,
      subscribe = ctx.subscribe,
      unsubscribe = ctx.unsubscribe;
  subscribe(setValue);
  onDestroy(function () {
    unsubscribe(setValue);
  });
  return value;
};