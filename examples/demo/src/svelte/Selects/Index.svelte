
<script>
  import Selects from './Selects.svelte'
  import SelectsRaw from '!raw-loader!./Selects.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={SelectsRaw} >
  <Selects/>
</ExampleSnippet>
