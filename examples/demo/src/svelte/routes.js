const componentsStates = {
  name: 'svelteComponents',
  abstract: true,
  // template: '<div ui-view class="fade-in-up"></div>',
  data: {
    title: 'Svelte',
    icon: 'fas fa-plug'
  },
  children: [
    {
      name: 'avatars',
      component: 'svelteAvatarsIndex'
    },
    {
      name: 'buttons',
      component: 'svelteButtonsIndex'
    }
  ]
}

export default componentsStates
