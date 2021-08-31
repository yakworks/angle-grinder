<script>
  import { onMount } from 'svelte'
  import { getIconClass } from '../../utils/icon'
  import createRipple from "../Ripple/ripple.js";
  import Icon from '../Icon'

  /** HTML tag to use for button (either 'a' or 'button')
   * @svelte-prop {String} tag=button
   * @values <code>button</code>, <code>a</code>
   * */
  export let tag = 'button'

  /** Type (color of control)
   * @svelte-prop {String} [type] - Type (color of control)
   * @values $$colors$$
   * */
  export let color = ''

  /** Class to add to button or a
   * @svelte-prop {String} [size]
   * @values $$sizes$$
   * */
  export let buttonClass = ''

  /** Href to use when <code>tag</code> is 'a'
   * @svelte-prop {String} [href]
   * */
  // export let href = ''

  /** Native button type
   * @svelte-prop {String} [nativeType]=button
   * @values Any native button type (button, submit, reset)
   * */
  export let type = 'button'

  export let icon = ''
  export let fab = false
  export let text = false
  export let outlined = false
  export let loading = false

  export let disabled

  export let iconSolo = null
  export let iconLeft = null
  export let iconRight = null

  let icons = {}

  const ripple = createRipple((text || fab || outlined) ? color : "white")

  let btnCls

  onMount(() => {
    if (!['button', 'a'].includes(tag)) throw new Error(`'${tag}' cannot be used as a tag for a Bulma button`)
  })

  function setupIconClass(fldName) {
    if(icons[fldName]) {
      icons[fldName] = getIconClass(icons[fldName])
    }
  }

  $: {
    btnCls = buttonClass
    if (color) btnCls = `${btnCls} is-${color}`
    // if its icon then its an an icon button with no border, set is-icon-button
    if (icon) {
      btnCls = `${btnCls} is-icon-button`
      iconSolo = icon
    }

    if (fab == true || fab === 'true') {
      btnCls = `${btnCls} is-fab`
    }
    icons = {
      solo: iconSolo,
      left: iconLeft,
      right: iconRight
    }
    setupIconClass('solo')
    setupIconClass('left')
    setupIconClass('right')
  }

</script>

{#if tag === 'button'}
<button
  use:ripple
  {type}
  {disabled}
  class="button {btnCls}"
  class:is-loading={loading}
  on:click
  >
  {#if icons.left}
  <span class="icon is-first-child">
    <i class="{icons.left}"></i>
  </span>
  {/if}
  <slot />
  <span class="ag-ripple animate"></span>

  {#if icons.solo}
  <span class="icon is-solo">
    <i class="{icons.solo}"></i>
  </span>
  {/if}

  {#if icons.right}
  <span class="icon is-last-child">
    <i class="{icons.right}"></i>
  </span>
  {/if}
</button>
{:else if tag === 'a'}
  <!-- TODO -->
{/if}
