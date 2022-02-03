/**
 * function to 'ensure', or make sure of something and try to correct it
 */

/**
 * make sure the text starts with the prefix
 * @param {*} text will get converted to string if its something else
 * @param {string} prefix that chars to prepend
 * @returns the text if its already prefixed or the new prefixed string
 */
export function ensurePrefix(text, prefix){
  if(text && !(`${text}`.startsWith(prefix)) ) text = `${prefix}${text}`
  return text
}

/**
 * make sure the text ends with the postfix
 * @param {*} text will get converted to string if its something else
 * @param {string} postfix that chars to prepend
 * @returns the text if its already postfixed or the new postfix string
 */
 export function ensurePostfix(text, postfix){
  if(text && !(`${text}`.endsWith(postfix)) ) text = `${text}${postfix}`
  return text
}
