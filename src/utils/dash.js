// Centralizes all the lodash we use so we can easily replace with native where appropriate
// https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
export { default as isString } from 'lodash/isString';
export { default as isObject } from 'lodash/isObject';
export { default as isPlainObject } from 'lodash/isPlainObject';
export { default as isNaN } from 'lodash/isNaN';
export { default as isNil } from 'lodash/isNil';
export { default as isEmpty } from 'lodash/isEmpty';
export { default as isDate } from 'lodash/isDate';
export { default as isEqual } from 'lodash/isEqual';
export { default as isMatchWith } from 'lodash/isMatchWith';

export { default as set } from 'lodash/set';
export { default as get } from 'lodash/get';

export { default as merge } from 'lodash/merge';
export { default as max } from 'lodash/max';
export { default as forEach } from 'lodash/forEach';
export { default as upperFirst } from 'lodash/upperFirst';
export { default as split } from 'lodash/split';
export { default as orderBy } from 'lodash/orderBy';
export { default as pick } from 'lodash/pick';
export { default as remove } from 'lodash/remove';

export default {
  isString,
  isObject,
  isPlainObject,
  isNaN,
  isNil,
  isEmpty,
  isDate,
  isEqual,
  isMatchWith,
  set,
  get,
  merge,
  max,
  forEach,
  upperFirst,
  split,
  orderBy,
  pick,
  remove
}
