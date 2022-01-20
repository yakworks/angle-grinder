
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../../svelte/utils/ExampleSnippet.svelte'

  import SearchForm from './SearchForm.svelte'
  import SearchFormRaw from '!raw-loader!./SearchForm.svelte'

</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={SearchFormRaw} horizontal={false} >
      <SearchForm/>
    </ExampleSnippet>

  </Block>
</Page>
