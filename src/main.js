import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope, faLock, faThLarge, faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';
import App from './App.vue';
import './assets/style.css';

library.add(faEnvelope, faLock, faThLarge, faPlusSquare);

createApp(App).use(router).component('fa', FontAwesomeIcon).mount('#app');
