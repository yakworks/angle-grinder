<!--
  Edit and create popup for a list or a grid
 -->
<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { Popover, CardHeader} from '@yakit/svelte/index'
  import { Formify } from '../Formify'
  import { handleError } from '../Formify/problemHandler'
  import { _defaults } from '@yakit/core/dash'

  /** the schema to use to build the form */
  export let schema
  /** dataApi to call save on */
  export let dataApi
  /** the base list id that will be used to construct the popoverId and the form name */
  export let listId
  /** options to pass to form */
  export let formOpts = {}
  /** form name constructed from the listId */
  export let formName = `${listId}-edit-form`
  /** the formify context, can bind to it and get its state*/
  export let formContext = undefined
  /** whether the popover is open or not, can be bound and set to make it open*/
  export let popoverOpened = undefined

  export let data = undefined

  export let popoverId = `${listId}-popover-edit`

  export let editingId = undefined

  export let popoverEl = undefined

  const dispatch = createEventDispatcher()

  _defaults(formOpts, {
    async onSubmit(values, form, errors){
      try {
        dispatch('beforeEditSubmit', values);
        // await dataApi.delay(2000)
        const savedItem = await dataApi.save(values)
        popoverOpened = false
        dispatch('afterEditSubmit', savedItem);
      } catch (er) {
        console.error(er)
        handleError(er)
      }
    }
  })

  export let onPopoverOpen = async (instance) => {
    //get the "data-id" attibute
    editingId = instance.targetEl.dataset.id
    //if no editingId then assume its a create
    try {
      let initValues = {}
      if(editingId) initValues = await dataApi.get(editingId)
      formContext.updateInitialValues(initValues)
    } catch (er) {
      console.error("onPopoverOpen error on get", er)
      handleError(er)
    }
    // finally {
    //   ctx.gridCtrl.toggleLoading(false)
    // }
  }

  export let onCancel = (event) => {
    // document.forms[name].reset()
    formContext.handleReset()
    popoverOpened = false
  }

  let title
  $: title = editingId ? "Edit" : "Create"

  onMount( () => {
    // let popper = popoverEl.instance()
    // popper.open("#fooey")
    // app.f7.tab.show('#contactsTab', true)
	});

</script>

<div class="popover-wrap">
  <Popover class="popover-wide" bind:this={popoverEl} id={popoverId} bind:opened={popoverOpened} {onPopoverOpen}
    closeByOutsideClick={false} closeByBackdropClick={false} closeOnEscape={false}>
    <CardHeader {title}/>
    <Formify name={formName} {onCancel} opts={formOpts} {schema} bind:data bind:formContext />
  </Popover>
</div>

<style>
  .popover-wrap {
    --f7-popover-width: 300px;
  }
  :global(.popover-wide) {
    width: 400px;
  }
</style>



