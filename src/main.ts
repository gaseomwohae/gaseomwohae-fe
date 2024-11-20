import '@/assets/styles/base.css';
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VCalendar, { masks: { title: 'YYYY년 MM월' } });
app.mount('#app');
