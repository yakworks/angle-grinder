
<script>
  import Buttons from './Buttons.svelte'
  import buttonsRaw from '!raw-loader!./Buttons.svelte'

  import ButtonSamples from './ButtonSamples.svelte'
  import buttonSamplesRaw from '!raw-loader!./ButtonSamples.svelte'

  import ButtonIcons from './ButtonIcons.svelte'
  import buttonIconsRaw from '!raw-loader!./ButtonIcons.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<ExampleSnippet code={buttonsRaw} >
  <Buttons/>
</ExampleSnippet>

<ExampleSnippet code={buttonSamplesRaw} >
  <ButtonSamples/>
</ExampleSnippet>

<ExampleSnippet code={buttonIconsRaw} >
  <ButtonIcons/>
</ExampleSnippet>
