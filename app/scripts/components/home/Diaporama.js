// Diaporama Component

import Vue from 'vue';
import Const from '../../utils/Const';
import resizeMixin from 'vue-resize-mixin';

let Diaporama = Vue.extend({
  mixins: [resizeMixin],
  template: require('./diaporama.html'),
  state: {
    object: '',
    index: '',
    translation: 0
  },
  data: function () {
    let Httpreq = new XMLHttpRequest(),
        url = Const.urlSite + 'portfolio-clemence/wordpress/wp-json/posts?filter[orderby]=menu_order&filter[order]=ASC';

    Httpreq.open('GET', url, false);
    Httpreq.send(null);
    this.object = JSON.parse(Httpreq.responseText);
    return {projects: this.object}
  },
  events: {
    'resize': 'onResize'
  },
  ready: function () {
    this.index = 1;
    this.buildDiaporama ();

    let colorProject = document.querySelectorAll('.project-home-content');

    for (let i = 0; colorProject.length > i; i ++) {
      colorProject[i].style.background = colorProject[i].getAttribute('data-color');
    }
  },
  methods: {
    buildDiaporama: function () {
      // Build diaporama
      let projects = document.querySelectorAll('.project-home'),
          projectsContainer = document.querySelector('.diapo-overflow'),
          projectWidth = window.innerWidth * (90 / 100),
          projectMargin = window.innerWidth * (5 / 100);

      for (let i = 0; projects.length > i; i ++) {
        projects[i].style.width = projectWidth + 'px';

        if (i == this.index) {
          projects[i].classList.add('current');
        }
      }

      this.translation = this.index * parseInt(projectWidth) - parseInt(projectMargin);

      projectsContainer.style.width = projectWidth * 3 + 'px';
      projectsContainer.style.transform = 'translateX(-' + this.translation + 'px)';

      // Events
      let prevIndex = this.index,
          nextIndex = this.index + 2,
          prevProject = document.querySelectorAll('.project-home:nth-child('+ prevIndex +')'),
          nextProject = document.querySelectorAll('.project-home:nth-child('+ nextIndex +')');


      prevProject[0].classList.add('prev-current');
      nextProject[0].classList.add('next-current');

      prevProject[0].addEventListener('click', this.prevProject(), false);
      nextProject[0].addEventListener('click', this.nextProject(), false);

      // Nav
      let navContainer = document.querySelector('.nav > div'),
          indexNav = this.index + 1,
          currentNav = document.querySelector('.dot-nav:nth-child('+ indexNav +')'),
          navContainerWidth = (8 + 30) * projects.length - 30;

      navContainer.style.width = navContainerWidth + 'px';
      currentNav.classList.add('current');
    },
    prevProject: function () {
      console.log('prev');
      if (this.index > 0) {
        this.index --;
        this.moveDiapo ('left', 1);
      }
    },
    nextProject: function () {
      console.log('next');
      if (this.index < this.object.length) {
        this.index ++;
        this.moveDiapo ('right', 1);
      }
    },
    clickNav: function () {

    },
    moveDiapo: function (direction, nb) {
      let projectsContainer = document.querySelector('.diapo-overflow'),
          translation = projectsContainer.style.transform;

      console.log(translation);

      // for (let j = 0; projects.length > j; j ++) {
      //   projects[j].classList.remove('current');
      // }
      //
      // if (j == this.index) {
      //   projects[j].classList.add('current');
      // }
      //
      // if (direction == 'left') {
      //   projectsContainer.style.transform = 'translateX(-' + this.translation + 'px)';
      // } else if (direction == 'right') {
      //   projectsContainer.style.transform = 'translateX(-' + this.translation + 'px)';
      // }
    },
    onResize: function(event) {
      if (this.index == undefined) {
        this.index = 1;
      }

      this.buildDiaporama();
    }
  }
});

module.exports = Diaporama;
