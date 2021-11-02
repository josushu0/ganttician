import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faEnvelope, faLock, faThLarge, faPlusSquare, faUser,
} from '@fortawesome/free-solid-svg-icons';
import router from './router';
import App from './App.vue';
import './assets/style.css';

library.add(faEnvelope, faLock, faThLarge, faPlusSquare, faUser);

createApp(App).use(router).component('fa', FontAwesomeIcon).mount('#app');
