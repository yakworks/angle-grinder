<script>
  import { onMount } from 'svelte'
  import { Gridz } from '@yakit/svelte/index'

  export let foo = 42
  export let dataApi = {}

  let ctx = {
    toolbarOptions:{
      leftButtons:{
        move: {
          "icon": "track_changes",
          "tooltip": "Move Customer"
        }
      }
    }
  }

</script>

<p>dataApi is {dataApi.key}</p>
<p>foo is {foo}</p>
<a href="/foo" class="link nav">WTF</a>
<a href="https://www.google.com/" class="link nav">google</a>

<Gridz {dataApi} {ctx}/>
