import './assets/main.css';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
import router from './router';
import { store, key } from './store/store.ts';
import { DARK_THEME_CLASS } from './constants.ts';

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: `.${DARK_THEME_CLASS}`,
      cssLayer: false,
    },
  },
});

app.mount('#app');
