import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import './assets/index.css';

if (localStorage.getItem('projectSelected') === null) {
  localStorage.setItem('projectSelected', 'false');
}
createApp(App).use(router).use(createPinia()).mount('#app');
