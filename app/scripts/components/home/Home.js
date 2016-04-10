// Home Component

import Vue from 'vue';
import Diaporama from './Diaporama';

let Home = Vue.extend({
  data () {},
  components: {
    'diaporama': Diaporama,
  },
  route: {
    activate () {
      let menuHome = document.querySelector('.open-menu li:first-child a');
      menuHome.classList.add('active');
    },
    canDeactivate (transition) {
      let home = document.querySelector('.home'),
          menuHome = document.querySelector('.open-menu li:first-child a');
      home.classList.add('leave-home');
      menuHome.classList.remove('active');

      setTimeout(transition.next, 1200);
    }
  },
  ready () {
    let home = document.querySelector('.home');
    home.classList.add('load-home');

    setTimeout(function () {
      home.classList.remove('load-home');
    }, 2500);
  },
  template: require('./home.html')
});

module.exports = Home;
