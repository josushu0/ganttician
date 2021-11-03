import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faEnvelope, faLock, faLayerGroup, faPlusSquare, faUser, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import router from './router';
import App from './App.vue';
import './assets/style.css';

library.add(faEnvelope, faLock, faLayerGroup, faPlusSquare, faUser, faSignOutAlt);

createApp(App).use(router).component('fa', FontAwesomeIcon).mount('#app');
