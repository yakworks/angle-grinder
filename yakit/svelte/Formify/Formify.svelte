<!--
  Dynamic search from schema for basic single column ListForm
 -->
<script>
  import { Card, CardContent, CardFooter, Button7} from '@yakit/svelte/index'
  import { ListForm, FormifyField } from '@yakit/svelte/Formify';
  import { transformFields } from '@yakit/core/schema/transformSchema'
  import { _defaults } from '@yakit/core/dash'

  /** The form name */
  export let name
  /** The untranslated schema */
  export let schema = {}
  /** Options to pass to the ListForm */
  export let opts = {}
  /** The data that can be bound for readonly view */
  export let data = undefined
  /** The formContext thats setup */
  export let formContext = undefined
  /** The transformed schema */
  export let transformedSchema = transformFields(schema)

  export let onCancel = (event) => {
    // document.forms[name].reset()
    formContext.handleReset()
  }

  export let onSave = (event) => {
    formContext.handleSubmit()
  }

  let state
  $: if(formContext) {
    //state store
    state = formContext.state
  }
</script>

<ListForm {name} {opts} schema={transformedSchema} bind:data bind:formContext >
  {#each transformedSchema as field (field.key)}
    <FormifyField opts={field} />
  {/each}
  <CardFooter>
    <Button7 onClick={onCancel}>Cancel</Button7>
    <Button7 onClick={onSave}>Save</Button7>
  </CardFooter>
</ListForm>
