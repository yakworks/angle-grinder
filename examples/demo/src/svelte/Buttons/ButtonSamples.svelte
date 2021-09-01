<script>
  import { Button } from 'angle-grinder/svelte'
  let loading = false

  function toggleLoading(event){
    // console.log("toggleLoading this", this)
    loading = !loading
    setTimeout(() => { loading = false }, 2000)
  }

</script>

<div class="columns">
  <div class="column is-half">
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
  </div>
  <div class="column is-half">
    <div class="buttons">
      <Button disabled>Disabled</Button>
      <Button color="primary" buttonClass="elevation-2">Raised</Button>
      <Button color="primary" buttonClass="is-outlined">Outline</Button>
      <Button color="danger" buttonClass="is-outlined">Outline</Button>
      <Button color="primary" buttonClass="is-rounded">Round</Button>
      <Button color="info" buttonClass="is-fullwidth">Full Width</Button>
      <Button color="primary" on:click={toggleLoading} loading="{loading}">Toggle Loading
      </Button>
    </div>
    <pre>loading: {loading}</pre>
  </div>
</div>

