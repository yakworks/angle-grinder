
<script>
  import Comp from './Toolbar.svelte'
  import svelteRaw from '!raw-loader!./Toolbar.svelte'
  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage horizontal={false} code={svelteRaw} >
  <Comp/>
</ExamplePage>
