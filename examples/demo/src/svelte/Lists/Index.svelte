
<script>
  import ListSimple from './ListSimple.svelte'
  import ListSimpleRaw from '!raw-loader!./ListSimple.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={ListSimpleRaw} >
  <ListSimple/>
</ExampleSnippet>
