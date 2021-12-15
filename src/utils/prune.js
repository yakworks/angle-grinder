import {isNil} from './dash'
import {isSomething} from './truthy';

export default function prune(obj) {
  if(isNil(obj)) return obj
  return removeEmpty(obj)
}

function removeEmpty(obj){
  let finalObj = {};
  Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          const nestedObj = removeEmpty(obj[key]);
          if (Object.keys(nestedObj).length) {
              finalObj[key] = nestedObj;
          }
      } else if (isSomething(obj[key])) {
          finalObj[key] = obj[key];
      }
  });
  return finalObj;
}
