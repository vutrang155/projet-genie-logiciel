import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import { createApp } from 'vue'
import App from './App.vue'

//import Vue from 'vue';

//Vue.prototype.$eventHub = new Vue(); // Global event bus


createApp(App).mount('#app')

