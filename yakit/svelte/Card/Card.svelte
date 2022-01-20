<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { fade as fadeTransition } from 'svelte/transition';
  import su from '../shared/common';

  import CardHeader from './CardHeader.svelte';
  import CardContent from './CardContent.svelte';
  import CardFooter from './CardFooter.svelte';

  const emit = su.createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let content = undefined;
  export let footer = undefined;
  export let outlined = false;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let elevation = undefined;
  export let noBorder = false;

  export let dismissible = false;
  export let toggle = undefined;
  export let isOpen = true;
  export let fade = true;
  export let transition = { duration: fade ? 400 : 0 };

  let el;

  $: showClose = dismissible || toggle;
  // handle toggle either sets open to false or fire the passed in toggle function
  $: handleToggle = toggle || (() => (isOpen = false));

  $: classes = su.classNames(
    'card',
    className,
    {
      'is-outlined': outlined,
      [`elevation-${elevation}`]: elevation,
      'no-border': noBorder,
    },
    su.colorClasses($$props),
  );

  /* eslint-disable no-undef */
  $: hasHeaderSlots = $$slots.header;
  $: hasContentSlots = $$slots.content;
  $: hasFooterSlots = $$slots.footer;
  /* eslint-enable no-undef */

</script>

{#if isOpen}

<div
  bind:this={el}
  class={classes}
  data-backdrop={typeof backdrop === 'undefined' ? backdrop : backdrop.toString()}
  data-backdrop-el={backdropEl}
  transition:fadeTransition={transition}
  {...su.restProps($$restProps)}
>
  {#if showClose}
    <button type="button" class="delete" aria-label='Close' on:click={handleToggle}/>
  {/if}
  {#if typeof title !== 'undefined' || hasHeaderSlots}
    <CardHeader title={su.plainText(title)}>
      <slot name="header" />
    </CardHeader>
  {/if}
  {#if typeof content !== 'undefined' || hasContentSlots}
    <CardContent>
      {su.plainText(content)}
      <slot name="content" />
    </CardContent>
  {/if}
  {#if typeof footer !== 'undefined' || hasFooterSlots}
    <CardFooter>
      {su.plainText(footer)}
      <slot name="footer" />
    </CardFooter>
  {/if}
  <slot />
</div>

{/if}
