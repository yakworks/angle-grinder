// Centralizes all the lodash we use so we can easily replace with native where appropriate
// https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
export { default as isString } from 'lodash/isString';
export { default as isObject } from 'lodash/isObject';
export { default as isPlainObject } from 'lodash/isPlainObject';
export { default as isNaN } from 'lodash/isNaN';
export { default as isNil } from 'lodash/isNil';
export { default as isEmpty } from 'lodash/isEmpty';
export { default as isFunction } from 'lodash/isFunction';
export { default as isDate } from 'lodash/isDate';
export { default as isEqual } from 'lodash/isEqual';
export { default as isUndefined } from 'lodash/isUndefined';


export { default as set } from 'lodash/set';
export { default as get } from 'lodash/get';

export { default as difference } from 'lodash/difference';
export { default as merge } from 'lodash/merge';
export { default as _defaults } from 'lodash/defaults';
export { default as defaultsDeep } from 'lodash/defaultsDeep';
export { default as extend } from 'lodash/extend';

export { default as max } from 'lodash/max';
export { default as forEach } from 'lodash/forEach';
export { default as find } from 'lodash/find';
export { default as upperFirst } from 'lodash/upperFirst';
export { default as toString } from 'lodash/toString';
export { default as split } from 'lodash/split';
export { default as orderBy } from 'lodash/orderBy';
export { default as pick } from 'lodash/pick';
export { default as omit } from 'lodash/omit';
export { default as remove } from 'lodash/remove';
export { default as cloneDeep } from 'lodash/cloneDeep';

export { default as isMatchWith } from 'lodash/isMatchWith';
export { default as isMatch } from 'lodash/isMatch';

//helpers
export { default as uniqueId } from 'lodash/uniqueId';

//these should not really be needed
export { default as map } from 'lodash/map';
export { default as each } from 'lodash/each';
