
<script>
  import Comp from './Forms.svelte'
  import svelteRaw from '!raw-loader!./Forms.svelte'
  // import FormFieldsRaw from './FormFields.svelte'
  // import FormFields from './FormFields.svelte'
  import ExampleSnippet from '../../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={svelteRaw} >
  <Comp/>
</ExampleSnippet>

<!-- <ExampleSnippet code={FormFieldsRaw} >
  <FormFields/>
</ExampleSnippet> -->