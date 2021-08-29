
<script>
  import Comp from './buttons.svelte'
  import svelteRaw from '!raw-loader!./buttons.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>
