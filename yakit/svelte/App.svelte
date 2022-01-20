<!-- App.svelte -->
<!-- Main Framework7 App component where we pass Framework7 params -->
<App {...f7params}>

</App>

<script>
  import { App } from './index';
  // import routes from './routes.js';

  const f7params = {
    // App Name
    name: 'My App',
    // App id
    id: 'yak.works',
    theme: 'aurora'
    // ...
  };

</script>
