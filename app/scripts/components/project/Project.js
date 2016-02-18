// Project Component

import Vue from 'vue';
import Const from '../../utils/Const';

let Project = Vue.extend({
    template: require('./project.html'),
    state: {
      project: ''
    },
    route: {
      data: function (transition) {
        let name = transition.to.params.projectName;
        let Httpreq = new XMLHttpRequest(),
            url = Const.urlSite + 'portfolio-clemence/wordpress/wp-json/posts?filter[s]='+ name;

        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        this.project = JSON.parse(Httpreq.responseText)[0];

        return {inProject: this.project}
      }
    },
    ready: function () {
      let container = document.querySelectorAll('.diapo-overflow');
      container[0].classList.add('project-page');
    }
});

module.exports = Project;
