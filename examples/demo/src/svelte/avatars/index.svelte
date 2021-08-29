
<script>
  import Comp from './Avatars.svelte'
  import svelteRaw from '!raw-loader!./Avatars.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>
