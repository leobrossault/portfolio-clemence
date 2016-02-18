import Vue from 'vue';
import VueRouter from 'vue-router';
import Header from './utils/Header';

import Home from './components/home/Home';
import Project from './components/project/Project';
import About from './components/about/About';

// Variables

Vue.use(VueRouter);

let App = Vue.extend({}),
    router = new VueRouter({
      history: false,
      root: '/'
    });

// Routing

router.map({
    '/': {
        component: Home,
        subRoutes: {
          '/project/:projectName': {
              component: Project
          },
        }
    },
    '/about': {
        component: About
    }
});

router.start(App, '#app');
