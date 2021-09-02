
<script>
  import Comp from './Growl.svelte'
  import svelteRaw from '!raw-loader!./Growl.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>
