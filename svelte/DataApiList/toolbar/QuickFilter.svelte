<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import {Button, Button7, Segmented} from '@yakit/svelte/index'

  let activeBtn //= 'bt3'

  let segBtnClick = (id) => () => {
    activeBtn = id
    console.log('activeBtn', activeBtn)
  }

</script>

<div class='quick-filter'>
  <Segmented strong tag="p" class='mr-2'>
    <Button7 active={activeBtn === 'bt1'} on:click={segBtnClick('bt1')}>Open</Button7>
    <Button7 active={activeBtn === 'bt2'} on:click={segBtnClick('bt2')}>Closed</Button7>
    <Button7 active={activeBtn === 'bt3'} on:click={segBtnClick('bt3')}>All</Button7>
  </Segmented>
</div>


<style>
  .quick-filter :global(.segmented .button7) {
    height: 30px;
    text-transform: inherit;
  }
  /* .quick-filter :global(.segmented .button-active) {
    background-color: var(--color-primary);
    border-color: transparent;
    color: var(--color-white);
  } */
</style>
