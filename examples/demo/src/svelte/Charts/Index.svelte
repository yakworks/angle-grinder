
<script>
  import Charts from './Charts.svelte'
  import ChartsRaw from '!raw-loader!./Charts.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet horizontal={false} code={ChartsRaw} >
  <Charts/>
</ExampleSnippet>

