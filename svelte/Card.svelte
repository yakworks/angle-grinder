<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from './shared/mixins';
  import { classNames, plainText, createEmitter } from './shared/utils';
  import { restProps } from './shared/rest-props';

  import CardHeader from './CardHeader.svelte';
  import CardContent from './CardContent.svelte';
  import CardFooter from './CardFooter.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let content = undefined;
  export let footer = undefined;
  export let outline = false;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let noShadow = false;
  export let noBorder = false;
  export let padding = true;

  let el;

  $: classes = classNames(
    className,
    'card',
    {
      'is-outlined': outline,
      'elevation-0': noShadow,
      'no-border': noBorder,
    },
    colorClasses($$props),
  );

  /* eslint-disable no-undef */
  $: hasHeaderSlots = $$slots.header;
  $: hasContentSlots = $$slots.content;
  $: hasFooterSlots = $$slots.footer;
  /* eslint-enable no-undef */

</script>

<div
  bind:this={el}
  class={classes}
  data-backdrop={typeof backdrop === 'undefined' ? backdrop : backdrop.toString()}
  data-backdrop-el={backdropEl}
  {...restProps($$restProps)}
>
  {#if typeof title !== 'undefined' || hasHeaderSlots}
    <CardHeader>
      {plainText(title)}
      <slot name="header" />
    </CardHeader>
  {/if}
  {#if typeof content !== 'undefined' || hasContentSlots}
    <CardContent {padding}>
      {plainText(content)}
      <slot name="content" />
    </CardContent>
  {/if}
  {#if typeof footer !== 'undefined' || hasFooterSlots}
    <CardFooter>
      {plainText(footer)}
      <slot name="footer" />
    </CardFooter>
  {/if}
  <slot />
</div>
