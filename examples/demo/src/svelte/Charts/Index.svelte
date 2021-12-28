
<script>
  import Charts from './Charts.svelte'
  import ChartsRaw from '!raw-loader!./Charts.svelte'

  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage horizontal={false} code={ChartsRaw} >
  <Charts/>
</ExamplePage>

