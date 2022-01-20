<script>
  import { onMount } from 'svelte'
  import { Button, Button7 } from '@yakit/svelte/index'

</script>

<header class="toolbar elevation-1 is-dense">
  <div class="toolbar-container">
    <Button icon="fa-bars"/>
    <div class="toolbar-title">Title</div>
    <div class="spacer"/>
    <Button icon="mdi-dots-vertical"/>
    <Button7 iconMaterial="more_vert"/>
    <Button7 popoverOpen=".popover-menu2" iconMaterial="more_vert"/>
  </div>
</header>
