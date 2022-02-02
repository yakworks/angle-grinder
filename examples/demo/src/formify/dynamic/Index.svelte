
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import Dynamic from './Dynamic.svelte'
  import DynamicRaw from '!raw-loader!./Dynamic.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={DynamicRaw} horizontal={false}>
      <Dynamic/>
    </ExampleSnippet>

    <ExampleSnippet code={DynamicRaw} horizontal={false}>
      <Dynamic/>
    </ExampleSnippet>

  </Block>
</Page>
