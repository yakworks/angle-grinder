export default class SelectedRows {
  ids = []
  getSelectedId() {
    if (this.ids.length === 1) {
      return this.ids[0]
    }
    return null
  }

  setSelectedIds(ids) {
    this.ids = [...ids]
  }

  getSelectedIds() {
    return [...this.ids]
  }
}
