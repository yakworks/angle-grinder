<!--
  Copied in from F7 so we can change the name and styling so it doesnt conflict with our button
  Game plan would be to unify them into 1
 -->
<script>
  import { createEventDispatcher } from 'svelte';
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
  import { useRouteProps } from '../shared/use-route-props';
  import { useIcon } from '../shared/use-icon';

  import {UseIcon} from '../index';
  import {Preloader} from '../index';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let tabLink = undefined;
  export let tabLinkActive = false;
  export let type = undefined;
  export let href = '#';
  export let target = undefined;
  export let round = false;
  export let roundMd = false;
  export let roundIos = false;
  export let roundAurora = false;
  export let fill = false;
  export let fillMd = false;
  export let fillIos = false;
  export let fillAurora = false;
  export let large = false;
  export let largeMd = false;
  export let largeIos = false;
  export let largeAurora = false;
  export let small = false;
  export let smallMd = false;
  export let smallIos = false;
  export let smallAurora = false;
  export let raised = false;
  export let raisedMd = false;
  export let raisedIos = false;
  export let raisedAurora = false;
  export let outline = false;
  export let outlineMd = false;
  export let outlineIos = false;
  export let outlineAurora = false;
  export let active = false;
  export let disabled = false;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;
  export let routeProps = undefined;
  export let preloader = false;
  export let preloaderSize = undefined;
  export let preloaderColor = undefined;
  export let loading = false;

  let el;

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

  $: classes = classNames(
    className,
    'button7',
    {
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,

      'button-round': round,
      'button-round-ios': roundIos,
      'button-round-aurora': roundAurora,
      'button-round-md': roundMd,
      'button-fill': fill,
      'button-fill-ios': fillIos,
      'button-fill-aurora': fillAurora,
      'button-fill-md': fillMd,
      'button-large': large,
      'button-large-ios': largeIos,
      'button-large-aurora': largeAurora,
      'button-large-md': largeMd,
      'button-small': small,
      'button-small-ios': smallIos,
      'button-small-aurora': smallAurora,
      'button-small-md': smallMd,
      'button-raised': raised,
      'button-raised-ios': raisedIos,
      'button-raised-aurora': raisedAurora,
      'button-raised-md': raisedMd,
      'button-active': active,
      'button-outline': outline,
      'button-outline-ios': outlineIos,
      'button-outline-aurora': outlineAurora,
      'button-outline-md': outlineMd,
      'button-preloader': preloader,
      'button-loading': loading,

      disabled,
    },
    colorClasses($$props),
    routerClasses($$props),
    actionsClasses($$props),
  );

  $: tagName = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';

  $: icon = useIcon($$props);

  function onClick() {
    emit('click');
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if tagName === 'button'}
  <button
    bind:this={el}
    use:useRouteProps={routeProps}
    class={classes}
    on:click={onClick}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    {...attrs}
  >
    {#if preloader}
      <Preloader size={preloaderSize} color={preloaderColor} />
      <span>
        {#if icon}
          <UseIcon {icon} />
        {/if}
        {#if typeof text !== 'undefined'}
          <span>{plainText(text)}</span>
        {/if}
        <slot />
      </span>
    {:else}
      {#if icon}
        <UseIcon {icon} />
      {/if}
      {#if typeof text !== 'undefined'}
        <span>{plainText(text)}</span>
      {/if}
      <slot />
    {/if}

  </button>
{:else}
  <a
    bind:this={el}
    use:useRouteProps={routeProps}
    class={classes}
    on:click={onClick}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    {...attrs}
  >
    {#if preloader}
      <Preloader size={preloaderSize} color={preloaderColor} />
      <span>
        {#if icon}
          <UseIcon {icon} />
        {/if}
        {#if typeof text !== 'undefined'}
          <span>{plainText(text)}</span>
        {/if}
        <slot />
      </span>
    {:else}
      {#if icon}
        <UseIcon {icon} />
      {/if}
      {#if typeof text !== 'undefined'}
        <span>{plainText(text)}</span>
      {/if}
      <slot />
    {/if}
  </a>
{/if}
