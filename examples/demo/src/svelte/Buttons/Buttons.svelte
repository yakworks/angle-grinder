<script>
  import { Button } from 'angle-grinder/svelte'
  import notyf from 'angle-grinder/src/tools/notyf'
  let counter = 0
</script>

<Button color="primary" on:click={() => counter++}>Click!: {counter}</Button>
<Button color="secondary" on:click={() => notyf.success('Clicked event asdf asdf asfd asdf asfd asfd asdf asdf')}>Fire Alert</Button>
