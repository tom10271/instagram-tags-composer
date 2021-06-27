import 'reflect-metadata';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import PrimeVue from 'primevue/config';
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

createApp(App)
    .use(router)
    .use(store)
    .component('Sidebar', Sidebar)
    .component('PanelMenu', PanelMenu)
    .component('TabMenu', TabMenu)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .use(PrimeVue)
    .mount('#app');
