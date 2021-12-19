<!--
  Wraps the JqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount, tick } from 'svelte'
  import JqGrid from './JqGrid.svelte'
  import makeSvelteListDataCtrl from './makeSvelteListDataCtrl'
  import { classNames } from '../shared/utils';

  export let ctx = undefined
  export let dataApi = undefined

  let isConfigured = false
  let listDataCtrl

  let className = undefined;
  export { className as class };

  onMount(async () => {
    listDataCtrl = await makeSvelteListDataCtrl({ dataApi })
    console.log("listDataCtrl", listDataCtrl)
    console.log("listDataCtrl.ctx", listDataCtrl.ctx)
    ctx = listDataCtrl.ctx
    isConfigured = true
	});

</script>

{#if isConfigured }

<p>Gridz dataApi is {dataApi.key}</p>
<JqGrid ctx={listDataCtrl.ctx} gridId={listDataCtrl.gridId()} />

{:else}
<p>...loading</p>
{/if}




