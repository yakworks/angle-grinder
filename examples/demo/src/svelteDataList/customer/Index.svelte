
<script>
  import { Page, Navbar } from 'angle-grinder/svelte/index'
  import RestGrid from './RestGrid.svelte'
  import svelteRaw from '!raw-loader!./RestGrid.svelte'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  export let dataApi
</script>

<ExampleSnippet horizontal={false} code={svelteRaw} >
  <RestGrid {...$$props} />
</ExampleSnippet>
<!--
<Page>
  <Navbar title="List View"></Navbar>
<ExampleSnippet horizontal={false} code={svelteRaw} >

  <RestGrid {...$$props} />
</ExampleSnippet>
</Page> -->
