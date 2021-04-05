import 'reflect-metadata';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import PrimeVue from 'primevue/config';
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu';
import TabMenu from 'primevue/tabmenu';

createApp(App)
    .use(router)
    .use(store)
    .component('Sidebar', Sidebar)
    .component('PanelMenu', PanelMenu)
    .component('TabMenu', TabMenu)
    .use(PrimeVue)
    .mount('#app');
