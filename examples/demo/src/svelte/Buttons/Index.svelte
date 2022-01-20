
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import Buttons from './Buttons.svelte'
  import buttonsRaw from '!raw-loader!./Buttons.svelte'

  import ButtonSamples from './ButtonSamples.svelte'
  import buttonSamplesRaw from '!raw-loader!./ButtonSamples.svelte'

  import ButtonIcons from './ButtonIcons.svelte'
  import buttonIconsRaw from '!raw-loader!./ButtonIcons.svelte'

  import ButtonsF7 from './ButtonsF7.svelte'
  import buttonsF7Raw from '!raw-loader!./ButtonsF7.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<Page>
  <Navbar title="Buttons" backLink={true} />
  <Block>
    <ExampleSnippet code={buttonsRaw} >
      <Buttons/>
    </ExampleSnippet>

    <ExampleSnippet code={buttonSamplesRaw} >
      <ButtonSamples/>
    </ExampleSnippet>

    <ExampleSnippet code={buttonIconsRaw} >
      <ButtonIcons/>
    </ExampleSnippet>

    <ExampleSnippet code={buttonsF7Raw} >
      <ButtonsF7/>
    </ExampleSnippet>
  </Block>
</Page>

