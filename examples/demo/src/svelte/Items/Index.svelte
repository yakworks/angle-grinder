
<script>
  import Items from './Items.svelte'
  import ItemsRaw from '!raw-loader!./Items.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={ItemsRaw} >
  <Items/>
</ExampleSnippet>
