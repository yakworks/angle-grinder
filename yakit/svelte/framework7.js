// import Framework7Svelte from 'framework7-svelte/esm/shared/plugin';
// import Framework7 from 'framework7/lite-bundle';
import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';

import { f7, f7ready, theme, app, f7init } from 'framework7-svelte/esm/shared/f7';
import { useStore } from 'framework7-svelte/esm/shared/use-store';

Framework7.use(Framework7Svelte);

//setup f7, WIP, had around the App component so it can coexist with NG
const f7params = {
  el: '#f7app',
  // App Name
  name: 'RCM',
  // App id
  id: 'yak.works',
  theme: 'aurora',
  router: false,
  routes:false,
  init: true,
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  clicks: {
    // bypass the f7 click interceptor
    externalLinks: '.nav'
  }
  // ...
};

if (!app.f7 || typeof window === 'undefined') {
  console.log("f7init first pass")
  f7init(f7params.el, f7params, false);
}

if (app.f7) {
  console.log("f7init second pass")
  app.f7.init(f7params.el);
} else {
  //not sure this will ever get hit, hacked in from App component
  f7init(f7params.el, f7params, true);
}

export { f7, f7ready, theme, useStore, app, f7init };
export default app;
