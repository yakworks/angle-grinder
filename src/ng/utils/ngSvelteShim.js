/**
 * Turn a Svelte component into an AngularJS component
 *
 * Usage:
 *  Create the component
    import svelteShim from './svelte-shim.ts';
    import MyComponent from './MyComponent.svelte';
    export default ng.module('modulename').component('myComponent', {
      controller: svelteShim( MyComponent, { events: { change: 'onChange' } } ),
      bindings: {
        class: '@',
        data: '<',
        onChange: '&',
      }
    })
 *  Use the component
        <my-component class="is-foo" data="bar"></my-component>
 *
 * @param Component
 * @param events
 * @returns the controller class
 */
export default function(Component, events) {
  const ctrl = class {
    constructor($scope, $element) {
      this.$element = $element
      this.initialProps = {}
      this.component = null
    }

    $postLink() {

      this.component = new Component({
        target: this.$element[0],
        props: this.initialProps
      })

      if (events) {
        Object.keys(events).forEach(svelteEvent => {
          const angularBinding = events[svelteEvent]

          this.component.$on(svelteEvent, ({ detail }) => {
            this[angularBinding](detail)
          })
        }, this)
      }
    }

    $onChanges(changes) {
      const changed = {}
      Object.keys(changes).forEach(key => {
        changed[key] = changes[key].currentValue
      })
      if (this.component) {
        this.component.$set(changed)
      } else {
        this.initialProps = {
          ...this.initialProps,
          ...changed
        }
      }
    }

    $onDestroy() {
      if (this.component) {
        this.component.$destroy()
      }
    }
  }

  ctrl.$inject = ['$scope', '$element']

  return ctrl
}
