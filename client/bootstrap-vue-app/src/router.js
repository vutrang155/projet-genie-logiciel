import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import App2 from './App2.vue';
import Login from './Login.vue';
import Logout from './Logout.vue';


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app2',
      component: App2
    },
    {
      path: '/app',
      name: 'app',
      component: App
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // If logged in, or going to the Login page.
  if (token || to.name === 'Login') {
    // Continue to page.
    next()
  } else {
    // Not logged in, redirect to login.
    next({name: 'Login'})
  }
});