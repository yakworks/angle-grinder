<!-- Wrapper around the JqGrid nd gridz -->
<script>
  import { onMount, onDestroy, tick } from 'svelte'
  import { classNames } from '../shared/utils';
  import GridDataApiCtrl from '@ag/gridz/GridDataApiCtrl'
  const jq = window.$

  let className = undefined
  export { className as class }

  export let ctx = undefined
  export let dataApi = undefined
  export let dense = undefined
  export let gridId = undefined

  //set in onMount from options
  let el
  let gridCtrl = new GridDataApiCtrl()

  $: state = {isConfigured: false}

  $: classes = classNames(
    className,
    'gridz',
    {
      'is-dense': dense || dense === '',
    }
  )

  function init(node) {
    gridCtrl.ctx = ctx
    el = node
    let gridWrapper = jq(node)
    const gridEl = gridWrapper.find('table.gridz')

    gridCtrl.setupGrid(gridWrapper, gridEl)
    gridCtrl.initGridz()
    state.isConfigured = true
  }

  // onMount(async () => {
	// 	opts = options
  //   gridCtrl.setupGrid($el, $el)
	// });

  onDestroy(() => {
    gridCtrl.destroy()
  });

</script>

<!-- {#if state.isConfigured} -->

<div use:init class="gridz-wrapper">
  <table bind:this={el} class="gridz" class:is-dense={dense}></table>
  <div class="gridz-pager"></div>
</div>

<!-- {:else}
<p>...loading</p>
{/if} -->



