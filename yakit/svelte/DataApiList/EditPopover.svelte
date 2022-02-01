<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { Popover} from '@yakit/svelte/index'
  import { Formify } from '@yakit/svelte/Formify';

  export let ctx
  export let dataApi = undefined
  export let opts = undefined

  export let popoverOpened = undefined
  export let popoverOpenEvent = undefined

  export let formContext = undefined
  export let data = undefined

  export let popoverId = `${ctx.gridOptions.gridId}-popover-edit`

  export let editingId = undefined

  export let onPopoverOpen = async (instance) => {
    editingId = instance.targetEl.dataset.id
    console.log("default onPopoverOpen", instance)
    console.log("onPopoverOpen for ident", instance.targetEl.dataset.id)
    console.log("ctx", ctx)
    // await ctx.gridCtrl.dataApi.delay(1000)
    console.log("delay finished")
    ctx.gridCtrl.toggleLoading(true)
    try {
      const vm = await ctx.gridCtrl.dataApi.get(editingId)
      console.log("vm", vm)
      formContext.updateInitialValues(vm)
      // ctrl.showEdit('Edit', vm)
    } catch (er) {
      console.log("handleError", er)
      // ctrl.handleError(er)
    } finally {
      ctx.gridCtrl.toggleLoading(false)
    }
  }

  export let onCancel = (event) => {
    // document.forms[name].reset()
    formContext.handleReset()
    popoverOpened = false
  }

  export let onSave = (event) => {
    formContext.handleSubmit()
    popoverOpened = false
  }

</script>

<Popover id={popoverId} bind:opened={popoverOpened} {onPopoverOpen}
  closeByOutsideClick={false} closeByBackdropClick={false} closeOnEscape={false}>

  <Formify name="formify-example" {onSave} {onCancel} {opts} schema={ctx.editForm} bind:data bind:formContext />
</Popover>





