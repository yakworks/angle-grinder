
<script>
  import { App } from 'angle-grinder/svelte/index';
  import Comp from './ListForm.svelte'
  import svelteRaw from '!raw-loader!./ListForm.svelte'
  import ExampleSnippet from '../../utils/ExampleSnippet.svelte'

  const f7params = {
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    theme: 'aurora'
    // ...
  };
</script>

<App {...f7params}>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>

</App>
