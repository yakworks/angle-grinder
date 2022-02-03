<!-- https://bulma.io/documentation/columns/sizes/ -->
<script>
  import { classNames } from './utils';

  let className = ''
  export { className as class }
  $: classes = classNames( 'column', className)

</script>

<div {...$$restProps} class={classes}>
  <slot />
</div>
