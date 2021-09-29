// libs (non angular) that need to be loaded
// load after vendor

import './gridz'

import Framework7 from 'framework7/lite';
import Framework7Svelte from '../svelte/framework7';
Framework7.use(Framework7Svelte);
