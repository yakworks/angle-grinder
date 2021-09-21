/**
 * From https://github.com/bestguy/sveltestrap
 * The MIT License (MIT)
 * Copyright (c) 2017-2021 bestguy (https://github.com/bestguy)
 */

function toClassName(value) {
  let result = '';

  if (typeof value === 'string' || typeof value === 'number') {
    result += value;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(' ');
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += ' ');
          result += key;
        }
      }
    }
  }

  return result;
}

export default function classNames(...args) {
  return args.map(toClassName).filter(Boolean).join(' ');
}
