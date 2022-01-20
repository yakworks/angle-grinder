
<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import Selects from './Selects.svelte'
  import SelectBasic from './SelectBasic.svelte'
  import SelectBasicId from './SelectBasicId.svelte'
  import SelectBasicRaw from '!raw-loader!./SelectBasic.svelte'
  import SelectBasicIdRaw from '!raw-loader!./SelectBasicId.svelte'

  import SelectRest from './SelectRest.svelte'
  import SelectRestRaw from '!raw-loader!./SelectRest.svelte'
  import SelectsRaw from '!raw-loader!./Selects.svelte'
  import SelectBasicKeepOpen from './SelectBasicKeepOpen.svelte'
  import SelectBasicKeepOpenRaw from '!raw-loader!./SelectBasicKeepOpen.svelte'

  import ExampleSnippet from '../utils/ExampleSnippet.svelte'
</script>

<Page>
  <Navbar title="Selects" backLink={true} />
  <Block>

    <ExampleSnippet code={SelectBasicRaw} >
      <SelectBasic/>
    </ExampleSnippet>

    <ExampleSnippet code={SelectBasicIdRaw} >
      <SelectBasicId/>
    </ExampleSnippet>

    <ExampleSnippet code={SelectBasicKeepOpenRaw} >
      <SelectBasicKeepOpen/>
    </ExampleSnippet>

    <ExampleSnippet code={SelectRestRaw} >
      <SelectRest/>
    </ExampleSnippet>

    <ExampleSnippet code={SelectsRaw} >
      <Selects/>
    </ExampleSnippet>
  </Block>
</Page>
