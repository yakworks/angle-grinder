<script>
  import { onMount } from 'svelte'
  import { Gridz } from '@yakit/ui/index'

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

<Gridz {dataApi} {ctx}/>
