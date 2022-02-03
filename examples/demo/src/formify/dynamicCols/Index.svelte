
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import DynamicCols from './DynamicCols.svelte'
  import DynamicColsRaw from '!raw-loader!./DynamicCols.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={DynamicColsRaw} horizontal={false}>
      <DynamicCols/>
    </ExampleSnippet>

  </Block>
</Page>
