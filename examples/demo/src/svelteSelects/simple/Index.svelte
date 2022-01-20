
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import SelectBasic from './SelectBasic.svelte'
  import SelectBasicRaw from '!raw-loader!./SelectBasic.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={SelectBasicRaw} >
      <SelectBasic/>
    </ExampleSnippet>

  </Block>
</Page>
