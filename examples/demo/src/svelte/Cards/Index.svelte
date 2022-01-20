
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import Cards from './Cards.svelte'
  import cardsRaw from '!raw-loader!./Cards.svelte'

  import CardsSimple from './CardsSimple.svelte'
  import cardsSimpleRaw from '!raw-loader!./CardsSimple.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<Page>
  <Navbar title="Cards" backLink={true} />
  <Block>

<ExampleSnippet code={cardsSimpleRaw} >
  <CardsSimple/>
</ExampleSnippet>

<ExampleSnippet code={cardsRaw} >
  <Cards/>
</ExampleSnippet>

  </Block>
</Page>
