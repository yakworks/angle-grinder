
<script>
  import Comp from './Comps.svelte'
  import svelteRaw from '!raw-loader!./Comps.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>


<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>

