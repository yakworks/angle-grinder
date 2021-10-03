
<script>
  import Comp from './Gridz.svelte'
  import svelteRaw from '!raw-loader!./Gridz.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet horizontal={false} code={svelteRaw} >
  <Comp/>
</ExampleSnippet>
