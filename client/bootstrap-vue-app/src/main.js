import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import { router } from './router';
//import App from './App.vue'
//import Login from './Login.vue'
import App2 from './App2.vue'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App2),
}).$mount('#app2')
