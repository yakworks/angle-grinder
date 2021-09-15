
<script>
  import Selects from './Selects.svelte'
  import SelectBasic from './SelectBasic.svelte'
  import SelectRest from './SelectRest.svelte'
  import SelectsRaw from '!raw-loader!./Selects.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={SelectsRaw} >
  <SelectBasic/>
</ExampleSnippet>

<ExampleSnippet code={SelectsRaw} >
  <SelectRest/>
</ExampleSnippet>

<ExampleSnippet code={SelectsRaw} >
  <Selects/>
</ExampleSnippet>
