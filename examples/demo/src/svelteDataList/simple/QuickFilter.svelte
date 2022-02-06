<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import {ButtonToggleGroup} from '@yakit/svelte/index'

  let activeKey
  let activeState

  let schema = [
    { key: 'PA', label: 'Payments'},
    { key: 'IN', label: 'Invoices'},
    { key: 'MEM', label: 'Memos'}
  ]

  let states = [
    { key: '0', label: 'Open'},
    { key: '1', label: 'Closed'}
  ]

  function onToggle(event){
    let item = event.detail
    console.log("onToggle", item)
    console.log("activeKey/activeState", activeKey, activeState)
  }

</script>

<div class='quick-filter'>
  <ButtonToggleGroup bind:activeKey {schema} on:click={onToggle}/>
</div>
<div class='quick-filter'>
  <ButtonToggleGroup bind:activeKey={activeState} schema={states} on:click={onToggle}/>
</div>

<style>
  .quick-filter :global(.button7) {
    height: 30px;
    text-transform:initial;
  }
</style>
