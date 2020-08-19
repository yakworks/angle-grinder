
/**
 * checks for fa- or mdi- and return full class to use for <i> element icon
 * @param {string} name
 */
export function getIconClass(name) {
  if (!name) return
  if (name.startsWith('fa-')) return `fas ${name}`
  if (name.startsWith('mdi-')) return `mdi ${name}`
  return name
}
