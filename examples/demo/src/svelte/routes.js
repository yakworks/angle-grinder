import dataApiFactory from '~/store/dataApiFactory'

const componentsStates = {
  name: 'svelteComponents',
  abstract: true,
  // template: '<div ui-view class="fade-in-up"></div>',
  data: {
    title: 'Svelte',
    icon: 'fas fa-plug'
  },
  children: [
    { name: 'angularSvelte', component: 'ngSvelteDemoIndex' },
    { name: 'avatars', component: 'svelteAvatarsIndex' },
    { name: 'buttons', component: 'svelteButtonsIndex' },
    { name: 'cards', component: 'svelteCardsIndex' },
    { name: 'charts', component: 'svelteChartsIndex' },
    { name: 'colors', component: 'svelteColorsIndex' },
    {
      name: 'forms',
      children: [
        { name: 'basic', component: 'svelteFormBasicIndex' },
        { name: 'simple FormsLib', component: 'svelteFormsLibIndex' },
        { name: 'list', component: 'svelteFormListIndex' }
      ]
    },
    { name: 'growlToast', component: 'svelteGrowlIndex' },
    { name: 'itemBlocks', component: 'svelteItemsIndex' },
    { name: 'lists', component: 'svelteListsIndex' },
    { name: 'selects', component: 'svelteSelectsIndex' },
    { name: 'toolbar', component: 'svelteToolbarIndex' },
    { name: 'popover', component: 'sveltePopoverIndex' },
    { name: 'tabs', component: 'svelteTabsIndex' },
    { name: 'Dynamic Form', component: 'svelteSearchFormIndex' },
  ]
}

export default componentsStates
