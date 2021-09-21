
<script>
  import Cards from './Cards.svelte'
  import cardsRaw from '!raw-loader!./Cards.svelte'

  import CardsSimple from './CardsSimple.svelte'
  import cardsSimpleRaw from '!raw-loader!./CardsSimple.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={cardsSimpleRaw} >
  <CardsSimple/>
</ExampleSnippet>

<ExampleSnippet code={cardsRaw} >
  <Cards/>
</ExampleSnippet>

