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

<header class="toolbar elevation-1 is-dense">
  <div class="toolbar-container">
    <Button icon="fa-bars"/>
    <div class="toolbar-title">Title</div>
    <div class="spacer"/>
    <Button icon="mdi-dots-vertical"/>
  </div>
</header>

