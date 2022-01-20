<script>
  import CardTitle from './CardTitle.svelte';
  import CardSubtitle from './CardSubtitle.svelte';
  import * as su from '../shared/common';
  //class pattern
  let className = undefined; export { className as class };
  $: classes = su.classNames(className, 'card-header py-0', su.colorClasses($$props));

  export let title = undefined;
  export let subtitle = undefined;

</script>

<header class={classes} {...su.restProps($$restProps)}>
  {#if typeof title !== 'undefined'}
    <CardTitle class="p-0">{title}</CardTitle>
  {/if}
  {#if typeof subtitle !== 'undefined'}
    <CardSubtitle >{subtitle}</CardSubtitle>
  {/if}
  <slot />
</header>
