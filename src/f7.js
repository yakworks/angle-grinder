// import Framework7 from 'framework7/lite';
import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from '../svelte/framework7';

Framework7.use(Framework7Svelte);


// Import Main App component
// import App from '../svelte/App.svelte';

// // Mount Svelte App
// const app = new App({
//   target: document.getElementById('f7app'),
// });

const f7params = {
  el: '#f7app',
  // App Name
  name: 'RCM',
  // App id
  id: 'yak.works',
  theme: 'aurora',
  init: true
  // ...
};

const app = new Framework7(f7params);

// let el = document.getElementById('f7app')

// onMount(() => {

//   if (app.f7) {
//     app.f7.init(el);
//     return;
//   }
//   f7init(el, noUndefinedProps(f7params), true);
// });
