
<script>
  import { Page, Navbar, Block } from 'angle-grinder/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import ListSelect from './ListSelect.svelte'
  import ListSelectRaw from '!raw-loader!./ListSelect.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={ListSelectRaw} >
      <ListSelect/>
    </ExampleSnippet>

  </Block>
</Page>
