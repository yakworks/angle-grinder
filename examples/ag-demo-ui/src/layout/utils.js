// filter items that shuldn be shown in menu
export const filterChildren = (obj) => {
  const item = {...obj}
  if (item.children && item.children.length > 0) {
    item.children = item.children.filter((it) => {
      return it.sidenavItem === undefined || it.sidenavItem
    }).map((i) => filterChildren(i))
  } else {
    item.children = undefined
  }
  return item
}
