
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import SelectListDemo from './SelectListDemo.svelte'
  import SelectListDemoRaw from '!raw-loader!./SelectListDemo.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={SelectListDemoRaw} >
      <SelectListDemo/>
    </ExampleSnippet>

  </Block>
</Page>
