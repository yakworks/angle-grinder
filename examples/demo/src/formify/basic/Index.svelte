
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import Basic from './Basic.svelte'
  import BasicRaw from '!raw-loader!./Basic.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={BasicRaw} horizontal={false}>
      <Basic/>
    </ExampleSnippet>

  </Block>
</Page>
