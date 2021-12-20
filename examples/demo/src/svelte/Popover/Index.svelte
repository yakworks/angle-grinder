
<script>
  import Comp from './Popover.svelte'
  import svelteRaw from '!raw-loader!./Popover.svelte'
  import ExamplePage from '../utils/ExamplePage.svelte'
</script>


<ExamplePage code={svelteRaw} >
  <Comp/>
</ExamplePage>

