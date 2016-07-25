import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import VueResource from 'vue-resource';
import Header from './utils/Header';

import Home from './components/home/Home';
import Project from './components/project/Project';
import About from './components/about/About';
import Blog from './components/blog/Blog';
import Article from './components/blog/article/Article';

// Variables

Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VueResource);
Vue.config.debug = false;
Vue.config.silent = true;

let App = Vue.extend({}),
    router = new VueRouter({
      history: false,
      root: '/'
    });

Vue.http.options.xhr = {withCredentials: true};

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
