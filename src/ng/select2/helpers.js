/**
 * converts an array of strings to and object map
 *
 * @param {Array} strArray - the array to convert
 */
export function convertSelect2Data(strArray, textField = 'name') {
  let dataArr
  // if the data array first element is not an object then assume it needs to be converted into {id, text} format
  if (strArray[0] != null && typeof strArray[0] !== 'object') {
    dataArr = []
    strArray.forEach((item) => {
      if (item !== undefined) {
        dataArr.push({ id: item, [textField]: item })
      }
    })
  }
  return dataArr || strArray
}
