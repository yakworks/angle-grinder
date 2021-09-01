
<script>
  import Comp from './Forms.svelte'
  import svelteRaw from '!raw-loader!./Forms.svelte'
  import ExampleSnippet from '../../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>
