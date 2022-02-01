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
  export let state = undefined
  export let isSubmitting = undefined
  /** The transformed schema */
  export let transformedSchema = transformFields(schema)

  let isColLayout
  $: if(transformedSchema.columns){
    isColLayout = true
    opts.formOnly = true
  }
  export let onCancel = (event) => {
    // document.forms[name].reset()
    formContext.handleReset()
  }

  export let onSave = (event) => {
    formContext.handleSubmit()
  }

  $: if(formContext) {
    //state store
    state = formContext.state
    isSubmitting = formContext.isSubmitting
  }
</script>

<ListForm {name} {opts} schema={transformedSchema} bind:data bind:formContext >
  {#if !isColLayout}

    {#each transformedSchema as field (field.key)}
      <FormifyField opts={field} />
    {/each}

    <CardFooter>
      <Button7 onClick={onCancel}>Cancel</Button7>
      <Button7 disabled={$isSubmitting} preloader loading={$isSubmitting} onClick={onSave}>Save</Button7>
    </CardFooter>

  {:else}
    <!-- Column Layout-->
    <Card class="m-0 bg-body-low" >
      <CardContent class="p0">
        <div class="tile is-ancestor">
          {#each transformedSchema.columns as colCfg}
          <div class="tile is-parent">
            <Card class="tile is-child m-0" noShadow>
              <CardContent class="p0">
                <div class="list inline-labels">
                <ul>
                  {#each colCfg as field (field.key)}
                    <FormifyField opts={field}/>
                  {/each}
                </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          {/each}
        </div>
      </CardContent>
      <CardFooter>
        <Button7 onClick={onCancel}>Cancel</Button7>
        <Button7 disabled={$isSubmitting} preloader loading={$isSubmitting} onClick={onSave}>Save</Button7>
      </CardFooter>
    </Card>

  {/if}

</ListForm>
