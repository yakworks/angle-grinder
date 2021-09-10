
<script>
  import themeColors from 'angle-grinder/src/themeColors'

  let colors = [
    'primary',
    'secondary',
    'accent',
    'link',
    'info',
    'success',
    'danger',
    'warning',
    'black',
    'white'
  ]
  let shades = [
    'tint',
    'shade',
    'contrast'
  ]
</script>
{#each colors as color}
  <div class="columns is-gapless">
    <div class="column">
      <div class="notification is-{color} is-light">
        {color}-highlight
      </div>
    </div>
    <div class="column">
      <div class="notification text-{color}-invert bg-{color}-light">
        {color}-light
      </div>
    </div>
    <div class="column">
      <div class="notification is-{color}">
        {color}
      </div>
    </div>
    <div class="column">
      <div class="notification text-{color}-invert bg-{color}-dark">
        {color}-dark
      </div>
    </div>
  </div>
{/each}

{#each shades as shade}
  <div class="columns is-gapless">
    <div class="column">
      <div class="notification text-{shade}-invert bg-{shade}-lighter">
        {shade}-lighter
      </div>
    </div>
    <div class="column">
      <div class="notification text-{shade}-invert bg-{shade}-light">
        {shade}-light
      </div>
    </div>
    <div class="column">
      <div class="notification text-{shade}-invert bg-{shade}">
        {shade}
      </div>
    </div>
    <div class="column">
      <div class="notification text-{shade}-invert bg-{shade}-dark">
        {shade}-dark
      </div>
    </div>
    <div class="column">
      <div class="notification text-{shade}-invert bg-{shade}-darker">
        {shade}-darker
      </div>
    </div>
  </div>
{/each}

