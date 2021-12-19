<script>
  import { onMount } from 'svelte'
  import { Gridz } from 'angle-grinder/svelte/index'

  export let foo = 42
  export let dataApi = {}

</script>

<p>dataApi is {dataApi.key}</p>
<p>foo is {foo}</p>

<Gridz {dataApi} />
