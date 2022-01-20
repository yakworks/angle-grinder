
<script>
  import { Page, Navbar, Block } from '@yakit/ui/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import SelectBasicID from './SelectBasicID.svelte'
  import SelectBasicRaw from '!raw-loader!./SelectBasicID.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={SelectBasicRaw} >
      <SelectBasicID/>
    </ExampleSnippet>

  </Block>
</Page>
