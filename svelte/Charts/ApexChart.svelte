<script>
  import { onMount, tick } from 'svelte'
  import { classNames } from '../shared/utils';
  import { chart } from "./apexChartRender";

  export let options;
  let opts;

  let className = undefined;
  export { className as class };

  $: classes = classNames('apex-chart', className);

  onMount(async () => {
		opts = options
    // await tick(); //trying to get the rendering in sync
	});
</script>

{#if opts}
<div class={classes} use:chart={opts} ></div>
{:else}
<p>...loading</p>
{/if}



