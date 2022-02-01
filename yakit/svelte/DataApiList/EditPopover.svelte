<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount } from 'svelte'
  import { Popover, CardHeader} from '@yakit/svelte/index'
  import { Formify } from '@yakit/svelte/Formify';
  import { _defaults } from '@yakit/core/dash'
  import growl from "@yakit/ui/growl"

  export let ctx = {}
  export let dataApi = undefined
  export let opts = {}

  _defaults(opts, {
    async onSubmit(values, form, errors){
      try {
        // await dataApi.delay(2000)
        const savedItem = await dataApi.save(values)
        ctx.gridCtrl.saveRow(editingId, savedItem)
        popoverOpened = false
        growl.success("saved successfully")
      } catch (er) {
        handleError(er)
      }

    }
  })
  export let popoverOpened = undefined
  export let popoverOpenEvent = undefined

  export let formContext = undefined
  export let data = undefined

  export let popoverId = `${ctx.gridOptions.gridId}-popover-edit`

  export let editingId = undefined

  export let popoverEl = undefined

  export let onPopoverOpen = async (instance) => {
    editingId = instance.targetEl.dataset.id
    //if no editingId then assume its a create
    // ctx.gridCtrl.toggleLoading(true)
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

  export let onSave = async (event) => {
    formContext.handleSubmit()
  }

  async function handleError(er) {
    let problem = await er.response.json()
    let messages = []
    if(problem.errors){
      messages = problem.errors.map(er => er.message)
    } else if(problem.detail) {
      messages.push(problem.detail)
    }
    growl.error(messages.join('/n'), problem.title)
  }

  let title
  $: title = editingId ? "Edit" : "Create"

  onMount( () => {
    // let popper = popoverEl.instance()
    // popper.open("#fooey")
    // app.f7.tab.show('#contactsTab', true)
	});

</script>

<Popover bind:this={popoverEl} id={popoverId} bind:opened={popoverOpened} {onPopoverOpen}
  closeByOutsideClick={false} closeByBackdropClick={false} closeOnEscape={false}>
  <CardHeader {title}/>
  <Formify name="formify-example" {onSave} {onCancel} {opts} schema={ctx.editForm} bind:data bind:formContext />
</Popover>




