<script>
  import { onMount } from 'svelte'
  import { classNames } from '../shared/utils';
  import { chart } from "./apexChartRender";

  export let options;

  let className = undefined;
  export { className as class };

  $: classes = classNames('apex-chart', className);

  // onMount(async () => {
	// 	opts = options
	// });
</script>

{#if options}
<div class={classes} use:chart={options}></div>
{:else}
<p>...loading</p>
{/if}



