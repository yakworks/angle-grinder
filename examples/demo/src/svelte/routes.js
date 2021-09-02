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
    {
      name: 'forms',
      children: [
        { name: 'simple', component: 'svelteFormSimpleIndex' },
        { name: 'Fields', component: 'svelteFormFieldsIndex' }
      ]
    }
  ]
}

export default componentsStates
