<script>
  // import classnames from './utils';
  import { colorClasses } from './utils/mixins';
  import { classNames } from './utils';
  import { restProps } from './utils/rest-props';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'card-header', colorClasses($$props));
</script>

<div class={classes} {...restProps($$restProps)}>
  <slot />
</div>
