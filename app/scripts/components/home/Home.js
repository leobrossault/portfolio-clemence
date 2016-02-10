// Home Component

import Vue from 'vue';
import Diaporama from './Diaporama';

let Home = Vue.extend({
  data: function () {},
  components: {
    'diaporama': Diaporama
  },
  template: require('./home.html')
});

module.exports = Home;
