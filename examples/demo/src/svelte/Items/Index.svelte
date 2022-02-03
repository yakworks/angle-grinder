
<script>
  import Items from './Items.svelte'
  import ItemsRaw from '!raw-loader!./Items.svelte'

  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage title="Items" code={ItemsRaw} >
  <Items/>
</ExamplePage>
