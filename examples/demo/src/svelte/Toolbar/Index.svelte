
<script>
  import Comp from './Toolbar.svelte'
  import svelteRaw from '!raw-loader!./Toolbar.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet horizontal={false} code={svelteRaw} >
  <Comp/>
</ExampleSnippet>
