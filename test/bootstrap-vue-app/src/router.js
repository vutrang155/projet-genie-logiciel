import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import App2 from './App2.vue';
import Login from './Login.vue';


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
      component: App
    },
    {
      path: '/login',
      component: Login
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });