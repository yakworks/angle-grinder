//returns just the functions on an object that match the passed in funcs array
//we do this so we can take advantage of the spread operator and proxy functions from Vue
export const mapFunctions = (funcs) => {
  return funcs.reduce((mergeObj, fn) => {
    mergeObj[fn] = function mappedMethod(...args) {
      return this.$store[fn].apply(this.$store, args)
    }
    return mergeObj
  }, {})
}
