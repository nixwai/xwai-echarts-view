import { createApp } from 'vue';
import './style/index.scss';
import 'virtual:windi.css';
import App from './App.vue';
import { store } from '@/store';
import '../mock/index.js';

const app = createApp(App);

app.use(store).mount('#app');
