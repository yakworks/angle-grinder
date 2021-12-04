import _ from 'lodash'
import {isSomething} from './something';

export default function prune(obj) {
  if(_.isNil(obj)) return obj

  // let pass1 = removeEmpty(obj)
  //pass1 might leave empty keys, probably better way to remove but this works
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
