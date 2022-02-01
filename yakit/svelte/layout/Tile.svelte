<script>
  import { classNames } from '../utils';

  let className = ''
  export { className as class }
  $: classes = classNames('tile', className)

</script>

<section {...$$restProps} class={classes}>
  <slot />
</section>
