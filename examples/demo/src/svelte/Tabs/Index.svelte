
<script>
  import { Page, Navbar, BlockTitle, Block } from '@yakit/svelte/index'
  import Tabbar from './Tabbar.svelte'
</script>

<Page>
  <Navbar title="Simple" backLink={true} />
  <Block>
    <Tabbar {...$$props} />
  </Block>
</Page>
