// About Component

import Vue from 'vue';
import Const from '../../utils/Const';

let About = Vue.extend({
    template: require('./about.html'),
    state: {
      aboutData: '',
      scrollDif: 0
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

        setTimeout(transition.next, 1500);
      }
    },
    ready: function () {
      window.addEventListener('scroll', this.parallax);
    },
    methods: {
      parallax: function () {
        let elementA = document.getElementById('parallax-el-first'),
            elementB = document.getElementById('parallax-el-second'),
            elementC = document.getElementById('parallax-el-third'),
            elementD = document.getElementById('parallax-el-fourth'),
            header = document.getElementById('header');

        let offsetHeader = header.getBoundingClientRect();

        let translationA = elementA.getAttribute('data-translation'),
            translationB = elementB.getAttribute('data-translation'),
            translationC = elementC.getAttribute('data-translation'),
            translationD = elementD.getAttribute('data-translation');

        if (- offsetHeader.top > this.scrollDif) {
          translationA = parseInt(translationA) - 2;
          translationB = parseInt(translationB) - 3;
          translationC = parseInt(translationC) - 1.5;
          translationD = parseInt(translationD) - 5;
        } else if (- offsetHeader.top < this.scrollDif) {
          translationA = parseInt(translationA) + 2;
          translationB = parseInt(translationB) + 3;
          translationC = parseInt(translationC) + 1.5;
          translationD = parseInt(translationD) + 5;
        }

        elementA.setAttribute('data-translation', translationA);
        elementA.style.transform = 'translateY('+ translationA +'px)';

        elementB.setAttribute('data-translation', translationB);
        elementB.style.transform = 'translateY('+ translationB +'px)';

        elementC.setAttribute('data-translation', translationC);
        elementC.style.transform = 'translateY('+ translationC +'px)';

        elementD.setAttribute('data-translation', translationD);
        elementD.style.transform = 'translateY('+ translationD +'px)';

        this.scrollDif = - offsetHeader.top;
      }
    }
});

module.exports = About;
