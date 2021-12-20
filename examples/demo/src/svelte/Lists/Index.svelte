
<script>
  import ListSimple from './ListSimple.svelte'
  import ListSimpleRaw from '!raw-loader!./ListSimple.svelte'

  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage title="lists" code={ListSimpleRaw} >
  <ListSimple/>
</ExamplePage>
