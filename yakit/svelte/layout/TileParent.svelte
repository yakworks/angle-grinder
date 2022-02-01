<script>
  import { classNames } from '../utils';

  let className = ''
  export { className as class }
  $: classes = classNames('tile is-parent', className)

</script>

<section {...$$restProps} class={classes}>
  <slot />
</section>
