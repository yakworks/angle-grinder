<script>
  import { Button, Columns, Col } from '@yakit/svelte'
import { Block } from '@yakit/svelte/';
import { BlockTitle } from '@yakit/svelte/';
  let loading = false

  function toggleLoading(event){
    loading = !loading
    setTimeout(() => { loading = false }, 2000)
  }

</script>

<Columns>
  <Col class="is-half">
    <div class="buttons">
      <button type="button" class="button is-primary" ag-ripple>
        Basic
      </button>
      <Button>Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="success">Success</Button>
      <Button color="info">Info</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="link">Link</Button>
      <Button color="light">Light</Button>
      <Button color="dark">Dark</Button>
      <Button color="white">White</Button>
    </div>
  </Col>
  <Col class="is-half">
    <div class="buttons">
      <Button disabled>Disabled</Button>
      <Button color="primary" class="elevation-2">Raised</Button>
      <Button color="primary" class="is-outlined">Outline</Button>
      <Button color="danger" class="is-outlined">Outline</Button>
      <Button color="primary" class="is-rounded">Round</Button>
      <Button color="info" class="is-fullwidth">Full Width</Button>
      <Button color="primary" on:click={toggleLoading} loading="{loading}">Toggle Loading
      </Button>
    </div>
    <pre>loading: {loading}</pre>
  </Col>
</Columns>
