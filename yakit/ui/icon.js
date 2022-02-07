
/**
 * checks for fa- or mdi- and return full class to use for <i> element icon
 * if it does not start with mdi or fa then its
 * assumed to be google icon font text and will return the material-icons
 * @param {string} name
 */
export function getIconClass(name) {
  if (!name) return
  if (name.startsWith('fa-')) return `fas ${name}`
  if (name.startsWith('mdi-')) return `mdi ${name}`
  if (!name.startsWith('mdi-') && !name.startsWith('fa-') ) return 'material-icons-two-tone'
  return name
}
