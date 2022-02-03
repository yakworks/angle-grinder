<script>
  // import classnames from './utils';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../utils';

  let className = undefined;
  export { className as class };

  $: classes = classNames(className, 'card-title', colorClasses($$props));
</script>

<p class={classes}>
<slot />
</p>
