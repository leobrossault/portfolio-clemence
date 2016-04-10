// Project Component

import Vue from 'vue';
import Const from '../../utils/Const';

let Project = Vue.extend({
    template: require('./project.html'),
    state: {
      project: ''
    },
    route: {
      data (transition) {
        let name = transition.to.params.projectName;
        let Httpreq = new XMLHttpRequest(),
            url = Const.urlSite + 'wordpress/wp-json/posts?filter[s]='+ name;

        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        this.project = JSON.parse(Httpreq.responseText)[0];

        return {inProject: this.project}
      }
    },
    ready () {
      let container = document.querySelectorAll('.diapo-overflow');
      container[0].classList.add('project-page');

      window.addEventListener('scroll', this.isInViewPort);
    },
    methods: {
      isInViewPort () {
        let scrollTop = document.body.scrollTop,
            viewportHeight = window.innerHeight,
            isNot = document.querySelectorAll('.isNot');

        [].forEach.call(isNot, function(item, i) {
          let top = document.body.scrollTop + item.getBoundingClientRect().top,
              sum = scrollTop + viewportHeight;

          if (scrollTop + viewportHeight > top + 100) {
            item.classList.add('isIt');
          }
        });
      }
    }
});

module.exports = Project;
