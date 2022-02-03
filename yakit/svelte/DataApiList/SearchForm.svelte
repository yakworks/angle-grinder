<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { Popover, CardHeader, CardFooter, Button} from '@yakit/svelte/index'
  import { classNames, createEmitter } from '../shared/utils'
  import { Formify } from '@yakit/svelte/Formify';
  import { handleError } from '@yakit/svelte/Formify/problemHandler';
  import { _defaults } from '@yakit/core/dash'
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

  export let data = undefined

  const dispatch = createEventDispatcher()

  $: stateStore = ctx.stateStore

  $: formClass = classNames('mb-4', {
    hidden: !($stateStore.showSearchForm)
  })

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
  export let searchFormOpened = undefined
  // export let popoverOpenEvent = undefined

  export let onCancel = (event) => {
    // document.forms[name].reset()
    formContext.handleReset()
    searchFormOpened = false
  }

  let isSearching = false

  export let onSearch = async (event) => {
    formContext.handleSubmit()
  }

  onMount( () => {
    // let popper = popoverEl.instance()
    // popper.open("#fooey")
    // app.f7.tab.show('#contactsTab', true)
	});

</script>

<Formify class={formClass} name={formName} opts={formOpts} {schema} bind:data bind:formContext >
  <CardFooter class="right" slot="footer">
    <Button onClick={onCancel} class="mr-4">Reset</Button>
    <Button color="primary" loading={isSearching} onClick={onSearch}>Search</Button>
  </CardFooter>
</Formify>

<style>
  :global(.xxxx) {
    width: 400px;
  }
</style>



