import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import Header from './utils/Header';

import Home from './components/home/Home';
import Project from './components/project/Project';
import About from './components/about/About';
import Blog from './components/blog/Blog';
import Article from './components/blog/article/Article';

// Variables

Vue.use(VueRouter);
Vue.use(VueMoment);

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
    },
    '/blog': {
        component: Blog
    },
    '/article/:articleNumber/:articleName': {
        component: Article
    }
});

router.start(App, '#app');
