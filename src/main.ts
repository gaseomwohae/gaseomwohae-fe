import '@/assets/styles/base.css';
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { createApp } from 'vue';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VCalendar, { masks: { title: 'YYYY년 MM월' } });
app.mount('#app');
