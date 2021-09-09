<script>
	export let data;

  function refresh() {
		// data.name = data.name + " updated"
    data = data
	}

	$: greeting = `hello ${data.name}`

</script>

<style>
	h1 {
		color: purple;
	}
</style>

<div class="card">
  <div class="card-title"> Svelte Component </div>
  <hr>
  <div class="card-content card-content-padding">
    <p>In Svelte</p>
    <input bind:value={data.name}>
    <h1 class="title">{greeting}</h1>
    <button on:click={refresh}>
      refresh from angular
    </button>
  </div>
</div>

