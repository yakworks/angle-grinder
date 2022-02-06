<!--
  Copied in from f7 so we can support a toggle like segment.
  When nothing is active it defuaults to highlighting the first button
  this takes a value that can be bound that if empty will hide the overlay so noithing is active
 -->
<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };

  export let activeKey = undefined
  export let raised = false;
  export let raisedIos = false;
  export let raisedMd = false;
  export let raisedAurora = false;
  export let round = false;
  export let roundIos = false;
  export let roundMd = false;
  export let roundAurora = false;
  export let strong = false;
  export let strongIos = false;
  export let strongMd = false;
  export let strongAurora = false;
  export let tag = 'div';

  $: classes = classNames(
    className,
    {
      segmented: true,
      'segmented-raised': raised,
      'segmented-raised-ios': raisedIos,
      'segmented-raised-aurora': raisedAurora,
      'segmented-raised-md': raisedMd,
      'segmented-round': round,
      'segmented-round-ios': roundIos,
      'segmented-round-aurora': roundAurora,
      'segmented-round-md': roundMd,
      'segmented-strong': strong,
      'segmented-strong-ios': strongIos,
      'segmented-strong-md': strongMd,
      'segmented-strong-aurora': strongAurora,
    },
    colorClasses($$props),
  );
</script>

{#if tag === 'div'}
  <div class={classes} {...restProps($$restProps)}>
    <slot />
    {#if strong || strongIos || strongMd || strongAurora}
      {#if activeKey}
        <span class="segmented-highlight" />
      {/if}
    {/if}
  </div>
{:else if tag === 'p'}
  <p class={classes} {...restProps($$restProps)}>
    <slot />
    {#if strong || strongIos || strongMd || strongAurora}
      {#if activeKey}
        <span class="segmented-highlight" />
      {/if}
    {/if}
  </p>
{/if}

<style>
  :global(.segmented-strong) {
    --f7-segmented-strong-button-text-color: var(--color-primary-strong);
    --f7-segmented-strong-button-active-bg-color: var(--color-primary);
    --f7-segmented-strong-button-active-text-color: var(--color-primary-contrast);
    --f7-segmented-strong-bg-color: var(--color-body-high);
  }
</style>
