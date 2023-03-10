import Vue from 'vue';
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';

import i18n from '@/libs/i18n';
import router from './router';
import store from './store';
import axios from '@/libs/axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import '@/@core/auth'
// Global Components
import './global-components';

// 3rd party plugins
// import '@axios';
// import '@/libs/acl';
import '@/libs/portal-vue';
import '@/libs/clipboard';
import '@/libs/toastification';
import '@/libs/sweet-alerts';
import '@/libs/vue-select';
import '@/libs/tour';

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;
// app.provide('axios', app.config.globalProperties.axios)

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require('@core/scss/core.scss');

// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
