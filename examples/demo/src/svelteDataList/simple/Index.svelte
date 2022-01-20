
<script>
  import { Page, Navbar, BlockTitle, Block } from '@yakit/svelte/index'
  import SimpleJqGrid from './SimpleGrid.svelte'
  import svelteRaw from '!raw-loader!./SimpleGrid.svelte'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  export let dataApi
</script>


<Page>
  <Navbar title="Simple" backLink={true} />
  <Block>
  <SimpleJqGrid {...$$props} />
  </Block>
</Page>

<!-- <ExampleSnippet horizontal={false} code={svelteRaw} >
  <SimpleJqGrid {...$$props} />
</ExampleSnippet> -->
