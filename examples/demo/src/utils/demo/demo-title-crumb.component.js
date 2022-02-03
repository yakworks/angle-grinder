import appState from '@yakit/ui/AppState'

class controller {
  get title() {
    return appState.title
  }
}
const template = `
<div class="breadcrumb-wrapper">
  <h4 class="mainTitle no-margin">{{$ctrl.title}}</h4>
  <div ncy-breadcrumb class="pull-right"></div>
</div>
`
// Define and export component
export default {
  transclude: true,
  controller,
  template
}
