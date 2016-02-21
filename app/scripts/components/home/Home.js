// Home Component

import Vue from 'vue';
import Diaporama from './Diaporama';

let Home = Vue.extend({
  data: function () {},
  components: {
    'diaporama': Diaporama,
  },
  route: {
    activate: function (transition) {
      // if (window.location.pathname == '/') {
      //   let projectsContainer = document.querySelector('.diapo-overflow');
      //
      //   projectsContainer.classList.remove('project-page');
      // }

      setTimeout(transition.next, 1000);
    }
  },
  template: require('./home.html')
});

module.exports = Home;
