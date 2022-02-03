<script>
  import { Toolbar, Link, BlockTitle, Block, Tabs, Tab } from '@yakit/svelte/index'
  import SimpleGrid from '~/svelteDataList/simple/SimpleGrid.svelte'
  import { app } from '@yakit/svelte/framework7';
  import { onMount } from 'svelte'

  let isBottom = false;

  let activeTab
  let tabShown = {}

  const onTabShow = (tabId) => (e) => {
    console.log("onTabShow " + tabId, e)
    activeTab = tabId
    tabShown[tabId] = true
  }

  onMount( () => {
    app.f7.tab.show('#contactsTab', true)
	});

</script>
<BlockTitle>These are Tabs, they can work on desktop and mobile</BlockTitle>
<Block>
  <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
</Block>
<div class='top-0'>
  <Toolbar tabbar scrollable position={isBottom ? 'bottom' : 'top'}>
    <Link tabLink="#dashTab" >Dashboard</Link>
    <Link tabLink="#trxTab">Transactions</Link>
    <Link tabLink="#contactsTab">Contacts</Link>
    <Link tabLink="#setupTab">Setup</Link>
  </Toolbar>
</div>


  <Tabs>
    <Tab id="dashTab" class="page-content pt-0" onTabShow={onTabShow('dashTab')}>
      <BlockTitle>Dashboard</BlockTitle>
      <Block>
        <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
      </Block>
    </Tab>
    <Tab id="trxTab" class="page-content pt-0" onTabShow={onTabShow('trxTab')}>
      {#if tabShown['trxTab']}
      <div class="mt-4" >
        <SimpleGrid/>
      </div>
      {/if}
    </Tab>
    <Tab id="contactsTab" class="page-content pt-0" onTabShow={onTabShow('contactsTab')}>
      <BlockTitle>contactsTab</BlockTitle>
      <Block>
        <p>onMount is used to select this one as the default</p>
      </Block>
    </Tab>
    <Tab id="setupTab" class="page-content pt-0"onTabShow={onTabShow('setupTab')} >
      <BlockTitle>setupTab</BlockTitle>
      <Block>
        <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
      </Block>
    </Tab>
  </Tabs>


<style>
  .top-0 :global(.toolbar) {
    top: 0 !important;
  }
</style>
