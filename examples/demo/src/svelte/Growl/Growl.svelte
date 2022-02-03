<script>
  import { Button } from '@yakit/svelte/index'
  import growl from '@yakit/ui/growl'

  function fireSuccess(){
    growl.success('of the stars explorations of brilliant syntheses', 'Success Hearts')
  }

  function fireError(){
    growl.error('Error Hearts of the stars explorations of brilliant syntheses realm of the galaxies two ghostly white figures in coveralls ')
  }
  function fireGrowl(type){
    let msg = 'Error Hearts of the stars explorations of brilliant syntheses realm of the galaxies two ghostly white figures in coveralls '
    growl.open(type, msg)
  }

</script>

<Button color="danger" on:click={fireError}>Error</Button>
<Button color="success" on:click={fireSuccess}>Success</Button>
<Button color="warning" on:click={() => fireGrowl('warning')}>Warning</Button>
<Button color="info" on:click={() => growl.info('WTF')}>Info</Button>
