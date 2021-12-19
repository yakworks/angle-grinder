
<script>
  import SimpleJqGrid from './SimpleJqGrid.svelte'
  import RestGrid from './RestGrid.svelte'
  import svelteRaw from '!raw-loader!./SimpleJqGrid.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'

  export let dataApi
</script>


<ExampleSnippet horizontal={false} code={svelteRaw} >

  <!-- ...$$props pass all the props passedin into this one down -->
  <SimpleJqGrid {...$$props} />
  <RestGrid {...$$props} />
</ExampleSnippet>
