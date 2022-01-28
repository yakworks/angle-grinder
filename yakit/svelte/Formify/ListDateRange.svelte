<script>
  import Input from './Input.svelte';
  import { fieldDefaults } from '@yakit/core/transformer'
  import { isNil, _defaults } from '@yakit/core/dash'
  import ListInput  from 'framework7-svelte/esm/svelte/list-input.svelte'

  let className = undefined;
  export { className as class }

  /**
   * name is the required key or object field path
   */
  export let name
  export let type = 'date'

  export let opts = {
    type,
    fromName: undefined,
    toName: undefined,
    label: undefined,
    placeholder: undefined,
    clearButton :true
  }

  fieldDefaults(name, opts)

  _defaults(opts, {
    fromName: `${name}.$gt`,
    toName: `${name}.$lt`,
  })
</script>

<ListInput label={opts.label} clearButton={false} input={false} class={className}>
  <div class="flex-item" slot="input">
    <div class="flex-cell" >
      <Input name={opts.fromName} {type} placeholder="from" clearButton={false}/>
    </div><!--endleft-->
    <!-- <div class="flex-cell middle-label" >
      <span>to</span>
    </div> -->
    <div class="flex-cell" >
      <Input name={opts.toName} {type} placeholder="to" clearButton={false} />
    </div>
  </div>
</ListInput>

<style>

  .flex-item {
    display: flex;
  }

  .flex-cell.middle-label {
    max-width: 30px;
  }

  .flex-cell {
    flex: 1 1 0px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .flex-cell:first-child {
    border-right: 1px solid var(--f7-list-item-border-color);
    padding-right: 10px;
  }

  .flex-cell:last-child {
    padding-left: 10px;
  }

</style>
