
<script>
  import Buttons from './buttons.svelte'
  import svelteRaw from '!raw-loader!./buttons.svelte'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={svelteRaw} >
  <Buttons/>
</ExampleSnippet>
