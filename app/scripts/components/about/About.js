// About Component

import Vue from 'vue';
import Const from '../../utils/Const';

let About = Vue.extend({
    template: require('./about.html'),
    state: {
      aboutData: ''
    },
    route: {
      data: function () {
        let Httpreq = new XMLHttpRequest(),
            url = Const.urlSite + 'portfolio-clemence/wordpress/wp-json/pages?filter[s]=about';

        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        this.aboutData = JSON.parse(Httpreq.responseText)[0];

        return {about: this.aboutData}
      },
      activate: function () {
        let menuAbout = document.querySelector('.open-menu li:nth-child(3) a');
        menuAbout.classList.add('active');
      },
      canDeactivate: function (transition) {
        let about = document.querySelector('.about'),
            menuAbout = document.querySelector('.open-menu li:nth-child(3) a');
        about.classList.add('leave-about');
        menuAbout.classList.remove('active');

        setTimeout(transition.next, 1000);
      }
    },
    methods: {

    }
});

module.exports = About;
