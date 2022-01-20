<script>
  import { Button } from '@yakit/svelte/index'
  import growl from '@yakit/ui/growl'
  let counter = 0
</script>

<Button color="primary" on:click={() => counter++}>Click!: {counter}</Button>
<Button color="secondary" on:click={() => growl.success('Clicked event asdf asdf asfd asdf asfd asfd asdf asdf')}>Fire Alert</Button>
