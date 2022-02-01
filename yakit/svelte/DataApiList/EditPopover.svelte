<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { Popover} from '@yakit/svelte/index'
  import { Formify } from '@yakit/svelte/Formify';
  import { _defaults } from '@yakit/core/dash'

  export let ctx
  export let dataApi = undefined
  export let opts = {}

  _defaults(opts, {
    onSubmit(vals){
      console.log("passed validation onSubmit vals", vals)
      // const savedItem = await ctx.gridCtrl.dataApi.save(this.vm)
      popoverOpened = false
    }
  })
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

  export let onSave = async (event) => {

    formContext.handleSubmit()
    console.log("onSave")
  }

</script>

<Popover id={popoverId} bind:opened={popoverOpened} {onPopoverOpen}
  closeByOutsideClick={false} closeByBackdropClick={false} closeOnEscape={false}>

  <Formify name="formify-example" {onSave} {onCancel} {opts} schema={ctx.editForm} bind:data bind:formContext />
</Popover>





