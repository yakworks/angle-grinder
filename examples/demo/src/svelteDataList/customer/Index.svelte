
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import RestGrid from './RestGrid.svelte'
  import svelteRaw from '!raw-loader!./RestGrid.svelte'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  export let dataApi
</script>

<!-- <ExampleSnippet horizontal={false} code={svelteRaw} >
  <RestGrid {...$$props} />
</ExampleSnippet> -->

<Page>
  <Navbar title="Rest Grid" backLink="Back" />
  <Block>
    <RestGrid {...$$props} />
  </Block>

  <!-- <ExampleSnippet horizontal={false} code={svelteRaw} >
    <RestGrid {...$$props} />
  </ExampleSnippet> -->
</Page>
