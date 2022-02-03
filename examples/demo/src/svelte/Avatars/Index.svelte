
<script>
  import Comp from './Avatars.svelte'
  import svelteRaw from '!raw-loader!./Avatars.svelte'
  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage title="Avatars" code={svelteRaw} >
  <Comp/>
</ExamplePage>
