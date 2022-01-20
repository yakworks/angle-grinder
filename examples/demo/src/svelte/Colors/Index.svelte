
<script>
  import themeColors from 'angle-grinder/src/themeColors'
  import { Page, Navbar, Block } from '@yakit/ui/index'
  let contrasts = [
    'body',
    'contrast',
  ]
  let shades = [
    '', '-high', '-low', '-lower'
  ]

  let colors = [
    'primary',
    'secondary',
    'accent',
    'link',
    'info',
    'success',
    'danger',
    'warning',
    'gray'
  ]


  let tints = [
    //'-lighter',
    '-light',
    '',
    '-strong',
    //'-stronger'
  ]

</script>
<Page>
  <Navbar title="colors" />
  <Block>

{#each contrasts as contrast}
<div class="columns is-gapless">
  {#each shades as shade}
  <div class="column">
    <div class="notification text-{contrast}-contrast bg-{contrast}{shade}">
      {contrast}{shade}
    </div>
  </div>
  {/each}
</div>
{/each}

{#each colors as color}
<div class="columns is-gapless">
  {#each tints as tint}
  <div class="column">
    <div class="notification text-{color}-contrast bg-{color}{tint}">
      {color}{tint}
    </div>
  </div>
  {/each}
</div>
{/each}

<div class="columns is-gapless">
{#each colors as color}
<div class="column">
  <div class="notification is-{color} is-light">
    {color}-highlight
  </div>
</div>
{/each}
</div>


<div class="columns is-gapless">
{#each Array(10) as _, i}
<div class="column">
  <div class="notification text-shade-{(i+1)*5}-contrast bg-shade-{(i+1)*5}">
    shade-{(i+1)*5}
  </div>
</div>
{/each}
</div>
<div class="columns is-gapless">
{#each Array(10) as _, i}
<div class="column">
  <div class="notification text-shade-{(i+10)*5}-contrast bg-shade-{(i+10)*5}">
    shade-{(i+10)*5}
  </div>
</div>
{/each}
</div>

<div class="columns is-gapless">
{#each colors as color}
<div class="column">
  {#each tints as tint}
  <p class="text-{color}{tint}">{color}{tint}</p>
  {/each}
</div>
{/each}
</div>

<div class="columns is-gapless">
{#each colors as color}
<div class="column bg-contrast">
  {#each tints as tint}
  <p class="text-{color}{tint}">{color}{tint}</p>
  {/each}
</div>
{/each}
</div>



  </Block>
</Page>
