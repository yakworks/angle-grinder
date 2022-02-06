<!--
  Dynamic search from schema for basic single column ListForm
 -->
<script>
  import { Card, CardContent, CardFooter, Button7} from '@yakit/svelte/index'
  import ListForm from './ListForm.svelte'
  import FormifyField from './FormifyField.svelte'
  import { transformFields } from '@yakit/core/schema/transformSchema'
  import { _defaults } from '@yakit/core/dash'
  import growl from "@yakit/ui/growl"
  import stringify from '@yakit/core/stringify';
  import { classNames } from '../shared/utils';

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
  export let isModified = undefined
  export let isModifying = undefined
  export let isDisableSave = undefined

  /** The transformed schema */
  export let transformedSchema = undefined
  /** Function to call after transformFields to do any post processing */
  export let onTransformedSchema = (_) => {}

  export let denseLayout = false
  export let cardLayout = true

  /* Do the Schema tranformation */
  transformedSchema = transformFields(schema)
  //this gets run but for some reason select is not seeing it?
  onTransformedSchema(transformedSchema)

  let className = undefined;
  export { className as class }
  $: formClasses = classNames(className, {
    'formify': true,
    'denseLayout': denseLayout,
    'cardLayout': cardLayout
  })

  $: tileWrapperClasses = classNames(
    'card-content',
    'formify-tile-wrapper',
    {
      'pt-1': ($$slots.header),
    }
  );

  className
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
    if($isModified){
      formContext.handleSubmit(event)
    } else {
      growl.info("No changes detected")
    }
  }

  // $: disableSave = !($isModified) || $isSubmitting
  // TODO Need a way to disable submit but if isModified is used then wont allow until onBlur when its updated
  // $: {
  //   disableSave = !($isModifying || $isModified)
  //   if($isSubmitting) disableSave = true
  // }
  $: if(formContext) {
    //state store
    state = formContext.state
    isSubmitting = formContext.isSubmitting
    isModified = formContext.isModified
    isModifying = formContext.isModifying
    isDisableSave = formContext.isDisableSave
  }
</script>

<ListForm class={formClasses} {name} {opts} schema={transformedSchema} bind:data bind:formContext >
  {#if !isColLayout}

    {#each transformedSchema as field (field.key)}
      <FormifyField opts={field} />
    {/each}

    {#if !($$slots.footer)}
      <CardFooter>
        <Button7 onClick={onCancel}>Cancel</Button7>
        <Button7 type=button disabled={$isDisableSave} preloader loading={$isSubmitting} onClick={onSave}>Save</Button7>
      </CardFooter>
    {/if}
    <slot name="footer" />
  {:else}
    <!-- Column Layout-->
    <Card class="m-0 bg-body-low search-card" >
      <slot name="header" />
      <div class={tileWrapperClasses}>
        <div class="tile is-ancestor">
          {#each transformedSchema.columns as colCfg}
          <div class="tile is-parent fields-card">
            <Card class="tile is-child card m-0" noShadow>
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
      </div>
      {#if !($$slots.footer)}
        <CardFooter>
          <Button7 onClick={onCancel}>Cancel</Button7>
          <Button7 type=button disabled={$isDisableSave} preloader loading={$isSubmitting} onClick={onSave}>Save</Button7>
        </CardFooter>
      {/if}
      <slot name="footer" />

    </Card>

  {/if}

</ListForm>

<style>

  :global(.formify.cardLayout) .fields-card {
    padding: .5rem;
  }

  .denseHorizontal .fields-card :global(.tile.is-child.card)  {
    border-right: 1px solid rgb(0 0 0 / 6%);
    border-radius: 0px;
  }

  .denseHorizontal .fields-card {
    padding-left: 0px;
    padding-right: 0px;
  }

  .denseHorizontal .fields-card:first-child {
    /* border-right: 1px solid var(--f7-list-item-border-color); */
    padding-left: .75rem;
  }

  .denseHorizontal .fields-card:first-child :global(.tile.is-child.card)  {
    border-radius: var(--f7-card-border-radius) 0 0 var(--f7-card-border-radius);
  }

  .denseHorizontal .fields-card:last-child :global(.tile.is-child.card)  {
    border-radius: 0 var(--f7-card-border-radius) var(--f7-card-border-radius) 0;
    border-right: 0px
  }

  .denseHorizontal .fields-card:last-child {
    padding-right: .75rem;
  }

  :global(.formify) {
    /* set the hieight so it matches the selects, intead of shrinking those down */

  }

  :global(.search-card) {
    background-color: var(--color-body-low);
    /* z-index so drop downs dont fall behind the tolbars */
    z-index: 35;
  }
  :global(.search-card .card-footer:before ) {
    /* z-index so hariline doesnt come above the drop down*/
    z-index: 0;
  }
</style>


