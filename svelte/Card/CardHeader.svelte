<script>
  import CardTitle from './CardTitle.svelte';
  import CardSubtitle from './CardSubtitle.svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };
  export let title = undefined;
  export let subtitle = undefined;

  $: classes = classNames(className, 'card-header', colorClasses($$props));
</script>

<header class={classes} {...restProps($$restProps)}>
  {#if typeof title !== 'undefined'}
    <CardTitle class="p-0">{title}</CardTitle>
  {/if}
  {#if typeof subtitle !== 'undefined'}
    <CardSubtitle >{subtitle}</CardSubtitle>
  {/if}
  <slot />
</header>
