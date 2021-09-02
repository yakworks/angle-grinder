<script>
  import { Button } from 'angle-grinder/svelte'
  import growl from 'angle-grinder/src/tools/growl'
  let counter = 0
</script>

<Button color="primary" on:click={() => counter++}>Click!: {counter}</Button>
<Button color="secondary" on:click={() => growl.success('Clicked event asdf asdf asfd asdf asfd asfd asdf asdf')}>Fire Alert</Button>
