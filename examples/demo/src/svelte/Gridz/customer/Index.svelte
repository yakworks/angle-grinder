
<script>
  import RestGrid from './RestGrid.svelte'
  import svelteRaw from '!raw-loader!./RestGrid.svelte'
  import ExampleSnippet from '../../utils/ExampleSnippet.svelte'

  export let dataApi
</script>


<ExampleSnippet horizontal={false} code={svelteRaw} >
  <!-- ...$$props pass all the props passedin into this one down -->
  <RestGrid {...$$props} />
</ExampleSnippet>
