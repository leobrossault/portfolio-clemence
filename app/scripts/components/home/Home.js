// Home Component

import Vue from 'vue';
import Diaporama from './Diaporama';

let Home = Vue.extend({
  data: function () {},
  components: {
    'diaporama': Diaporama,
  },
  route: {
    activate: function () {
      let menuHome = document.querySelector('.open-menu li:first-child a');
      menuHome.classList.add('active');
    },
    canDeactivate: function (transition) {
      let home = document.querySelector('.home'),
          menuHome = document.querySelector('.open-menu li:first-child a');
      home.classList.add('leave-home');
      menuHome.classList.remove('active');

      setTimeout(transition.next, 1500);
    }
  },
  ready: function () {
    let home = document.querySelector('.home');
    home.classList.add('load-home');

    setTimeout(function () {
      home.classList.remove('load-home');
    }, 2500);
  },
  template: require('./home.html')
});

module.exports = Home;
