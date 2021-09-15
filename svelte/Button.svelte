<script>
  import { onMount } from 'svelte'
  import { getIconClass } from '../src/utils/icon'
  import createRipple from "./utils/ripple.js";
  import { classNames } from './utils';
  import Icon from './Icon.svelte'

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

  export let disabled  = false;

  export let iconSolo = null
  export let iconLeft = null
  export let iconRight = null

  export let className = ''
	export { className as class } //work around since class is reserved
  let classes

  let icons = {}

  const ripple = createRipple((text || fab || outlined) ? color : "white")

  onMount(() => {
    if (!['button', 'a'].includes(tag)) throw new Error(`'${tag}' cannot be used as a tag for a Bulma button`)
  })

  function setupIconClass(fldName) {
    if(icons[fldName]) {
      icons[fldName] = getIconClass(icons[fldName])
    }
  }

  $: {
    classes = classNames(
      'button',
      className,
      {
        'is-icon-button': icon,
        'is-fab': (fab == true || fab === 'true'),
        [`is-${color}`]: color
      }
    )
    // if its icon then its an an icon button with no border, set is-icon-button
    if (icon) {
      iconSolo = icon
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
  class="{classes}"
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
