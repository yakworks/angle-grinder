
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import Comp from './ListForm.svelte'
  import svelteRaw from '!raw-loader!./ListForm.svelte'
  import ExampleSnippet from '../../utils/ExampleSnippet.svelte'

</script>

<Page>
  <Navbar title="Forms" backLink={true} />
  <Block>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>

</Block>
</Page>
