/**
 * converts an array of strings to and object map
 * makes ['red','green'] into [{id:'red',name'red}, etc...]
 *
 * @param {Array} strArray - the array to convert
 * @param {String} textFieldKey - the key for the object
 */
export function convertSelect2Data(strArray, textFieldKey = 'name') {
  let dataArr
  // if the data array first element is not an object then assume it needs to be converted into {id, text} format
  if (strArray[0] != null && typeof strArray[0] !== 'object') {
    dataArr = []
    strArray.forEach((item) => {
      if (item !== undefined) {
        dataArr.push({ id: item, [textFieldKey]: item })
      }
    })
  }
  return dataArr || strArray
}
