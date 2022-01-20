<script>
  import { Button } from '@yakit/svelte'

  let loading = false

  function toggleLoading(event){
    loading = !loading
    setTimeout(() => { loading = false }, 2000)
  }

</script>

<div class="buttons">
  <Button color="success" iconLeft="fa-check">Save</Button>
  <Button color="success" iconLeft="mdi-check-bold">Save</Button>
  <Button color="warning" iconRight="fa-plug">Plug</Button>
  <Button color="warning" iconRight="mdi-power-plug">Plug</Button>
</div>

<div class="buttons">
  <Button icon="fa-thumbs-up"></Button>
  <Button icon="mdi-thumb-up"></Button>
  <Button iconSolo="far fa-thumbs-up"></Button>
  <Button iconSolo="mdi-thumb-up-outline"></Button>
  <Button icon="fa-search"></Button>
  <Button icon="mdi-magnify"></Button>
  <Button icon="fa-edit"></Button>
  <Button icon="mdi-square-edit-outline"></Button>
  <Button icon="fas fa-table"></Button>
  <Button icon="mdi-table"></Button>
  <Button icon="mdi-chevron-left"></Button>
  <Button icon="mdi-chevron-right"></Button>
  <Button icon="mdi-page-last"></Button>
  <Button icon="mdi-page-first"></Button>
</div>

<div class="buttons">
  <Button color="danger" icon="fa-heart"></Button>
  <Button color="danger" icon="mdi-heart"></Button>
  <Button color="danger" iconSolo="far fa-heart"></Button>
  <Button color="danger" iconSolo="mdi-heart-outline"></Button>
</div>

<p>FABS</p>
<div class="buttons">
  <Button icon="fas fa-chevron-up" fab></Button>
  <Button color="primary" icon="fas fa-chevron-up" fab></Button>
  <Button color="danger" icon="fas fa-chevron-up" fab></Button>
</div>
