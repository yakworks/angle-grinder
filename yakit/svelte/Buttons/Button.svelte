<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { getIconClass } from '@yakit/ui/icon'
  import { isTruthy } from '@yakit/core/truthy'
  import createRipple from "../utils/ripple.js";
  // import { classNames } from './utils';
  import Icon from '../Icon.svelte'

  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins';
  import { classNames, extend, isStringProp, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { useTooltip } from '../shared/use-tooltip';
  // import { useRouteProps } from '../shared/use-route-props';
  import { useIcon } from '../shared/use-icon';

  import { UseIcon, Preloader } from '../index';

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

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  // let className = undefined;
  // export { className as class };
  export let className = ''
	export { className as class } //work around since class is reserved
  let classes

  let icons = {}

  const ripple = createRipple((text || fab || outlined) ? color : "white")

  const emit = createEmitter(createEventDispatcher, $$props);

  onMount(() => {
    if (!['button', 'a'].includes(tag)) throw new Error(`'${tag}' cannot be used as a tag for a Bulma button`)
  })

  function setupIconClass(fldName) {
    if(icons[fldName]) {
      let origIcoName = icons[fldName]
      let icoClass = getIconClass(origIcoName)
      icons[fldName] = icoClass
      //if it starts with material then it needs the text per google font
      icons.text = icoClass.startsWith('material') ? origIcoName : ''
    }
  }

  $: {
    classes = classNames(
      'button',
      className,
      {
        'is-icon-button': icon,
        'is-fab': isTruthy(fab),
        [`is-${color}`]: color
      },
      actionsClasses($$props)
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
  export let href = '#';
  export let target = undefined;
  export let tabLink = undefined;
  // export let tabLinkActive = false;

  $: hrefComputed = href === true ? '#' : href || undefined;

  $: attrs = extend(
    {
      href: hrefComputed,
      target,
      type,
      'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
      ...restProps($$restProps),
    },
    routerAttrs($$props),
    actionsAttrs($$props),
  );

  function onClick() {
    emit('click');
  }

</script>

{#if tag === 'button'}
<button
  use:ripple
  use:useTooltip={{ tooltip, tooltipTrigger }}
  {type}
  {disabled}
  class="{classes}"
  class:is-loading={loading}
  {...attrs}
  on:click={onClick}
  >
  {#if icons.left}
  <span class="icon is-first-child">
    <i class="{icons.left}">{icons.text}</i>
  </span>
  {/if}
  <slot />
  <span class="ag-ripple animate"></span>

  {#if icons.solo}
  <span class="icon is-solo">
    <i class="{icons.solo}">{icons.text}</i>
  </span>
  {/if}

  {#if icons.right}
  <span class="icon is-last-child">
    <i class="{icons.right}">{icons.text}</i>
  </span>
  {/if}
</button>
{:else if tag === 'a'}
  <!-- TODO -->
{/if}
