
<script>
  import { onMount } from 'svelte'
  import Button from 'angle-grinder/src/svelte/Button.svelte'
  import toast from 'angle-grinder/src/tools/toast'

  let counter = 0
</script>

<Button type="is-primary" on:click={() => counter++}>Click!: {counter}</Button>
<Button type="is-secondary" on:click={() => toast.success('Clicked event')}>Fire Alert</Button>
