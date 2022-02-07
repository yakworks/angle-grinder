<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import {writable} from 'svelte/store';
  import { Popover, CardHeader, CardFooter, Button, BlockTitle, Block,
    AccordionItem, AccordionToggle, AccordionContent } from '@yakit/svelte/index'
  import { classNames, createEmitter } from '../shared/utils'
  import { Formify } from '@yakit/svelte/Formify';
  import { searchDefaults } from '@yakit/core/schema/transformSchema'
  import { handleError } from '@yakit/svelte/Formify/problemHandler';
  import { _defaults } from '@yakit/core/dash'
  import { app } from '@yakit/svelte/framework7';
  import growl from "@yakit/ui/growl"

  /** the schema to use to build the form */
  export let schema
  /** the context for the grid/list */
  export let ctx
  /** dataApi to call save on */
  // export let dataApi
  /** the base list id that will be used to construct the popoverId and the form name */
  export let listId
  /** options to pass to form */
  export let formOpts = {}
  /** form name constructed from the listId */
  export let formName = `${listId}-search-form`
  /** the formify context, can bind to it and get its state*/
  export let formContext = undefined
  /** bind to this to get the searching status, its bound to formContext.isSubmitting*/
  export let isSearching = undefined

  export let data = undefined

  const dispatch = createEventDispatcher()

  $: stateStore = ctx.stateStore

  let formClass = 'mb-4'
  // $: formClass = classNames('mb-4', {
  //   hidden: !($stateStore.showSearchForm)
  // })
  let accOpened

  $: showSearchForm  = $stateStore.showSearchForm

  $: if(showSearchForm){
    app.f7.accordion.open("#searchAccordian")
  } else {
    // app.f7.accordion.close("#searchAccordian")
    try{
      app.f7.accordion.close("#searchAccordian")
    } catch(e){}
  }

  _defaults(formOpts, {
    validate: false,
    async onSubmit(values, form, errors){
      try {
        dispatch('search', values)
        $stateStore.showSearchForm = false
      } catch (er) {
        handleError(er)
      }
    }
  })

  export let onCancel = (event) => {
    // document.forms[name].reset()
    formContext.handleReset()

  }

  export let onSearch = async (event) => {
    formContext.handleSubmit()
  }

  // setup isMulti defaults for selects
  export let onTransformedSchema = (schema) => {
    console.log("schema", schema)
    searchDefaults(schema)
  }

  onMount( () => {
    // let popper = popoverEl.instance()
    // popper.open("#fooey")
    // app.f7.tab.show('#contactsTab', true)
	});

  $: isSearching = formContext ? formContext.isSubmitting : writable(false)

</script>

<div class="accordion-item" id="searchAccordian">
  <div class="accordion-item-content">
    <Formify class={formClass} name={formName} opts={formOpts} {schema} {onTransformedSchema}
      bind:data bind:formContext >
      <CardFooter class="right" slot="footer">
        <Button onClick={onCancel} class="mr-4">Reset</Button>
        <Button color="primary" loading={$isSearching} onClick={onSearch}>Search</Button>
      </CardFooter>
    </Formify>
  </div>
</div>

<style>
  :global(.xxxx) {
    width: 400px;
  }
  .accordion-item {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -0.75rem;
  }
  .accordion-item-content {
    padding-left: .75rem;
    padding-right: .75rem;
    padding-top: .75rem;
  }
</style>



