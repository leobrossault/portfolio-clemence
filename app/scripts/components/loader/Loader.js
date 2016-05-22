// Loader Component

import Vue from 'vue';
import Const from '../../utils/Const';

let Loader = Vue.extend({
    state: {
      container: ''
    },
    ready () {
      // let cta = document.querySelectorAll('.leave-page-click');
      //
      // for (let i = 0; i < cta.length; i ++) {
      //   cta[i].addEventListener('click', this.anim);
      // }
      //
      // console.log('passe ?');
      //
      // this.container = document.getElementById('loader');
    },
    methods: {
      anim () {
        // this.container.addClass('active');
      }
    }
});

module.exports = Loader;
