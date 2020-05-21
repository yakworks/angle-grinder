// defaults and helpers to make a directive more like a component

const compDirDefaults = {
  restrict: 'E',
  replace: true,
  controllerAs: '$ctrl',
  bindToController: true
}

export default compDirDefaults
