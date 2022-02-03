
<script>
  import Comp from './Growl.svelte'
  import svelteRaw from '!raw-loader!./Growl.svelte'
  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage title="Growl" code={svelteRaw} >
  <Comp/>
</ExamplePage>
