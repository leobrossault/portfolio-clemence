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
    translation: 0,
    xDown: null,
    yDown: null
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
  },
  methods: {
    buildDiaporama: function () {
      // Build diaporama
      let projects = document.querySelectorAll('.project-home'),
          projectsContainer = document.querySelector('.diapo-overflow'),
          projectWidth = window.innerWidth * (75 / 100),
          projectMargin = window.innerWidth * (20 / 100);

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

      // Nav
      let navContainer = document.querySelector('.nav > div'),
          indexNav = this.index + 1,
          currentNav = document.querySelector('.dot-nav:nth-child('+ indexNav +')'),
          navContainerWidth = (8 + 30) * projects.length - 30;

      // Nav mobile
      if (window.innerWidth <= 600) {
        document.addEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);
      }

      navContainer.style.width = navContainerWidth + 'px';
      currentNav.classList.add('current');
    },
    basicNav: function (e) {
      if (e.target.parentNode.parentNode.parentNode.classList.contains('prev-current')) {
        this.prevProject();
      } else if (e.target.parentNode.parentNode.parentNode.classList.contains('next-current')) {
        this.nextProject();
      }
    },
    handleTouchStart(e) {
      this.xDown = e.touches[0].clientX;
      this.yDown = e.touches[0].clientY;
    },
    handleTouchMove: function (e) {
      if ( !this.xDown || !this.yDown ) {
        return;
      }

      var xUp = e.touches[0].clientX;
      var yUp = e.touches[0].clientY;

      var xDiff = this.xDown - xUp;
      var yDiff = this.yDown - yUp;

      if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
          if ( xDiff > 0 ) {
              this.nextProject();
          } else {
              this.prevProject();
          }
      }

      this.xDown = null;
      this.yDown = null;
    },
    prevProject: function () {
      if (this.index > 0) {
        this.index --;
        this.moveDiapo ('left', 1);
      }
    },
    nextProject: function () {
      if (this.index < this.object.length) {
        this.index ++;
        this.moveDiapo ('right', 1);
      }
    },
    clickNav: function (e) {
      let dotNav = document.querySelectorAll('.dot-nav'),
          oldCurrent,
          newCurrent,
          projectsContainer = document.querySelector('.diapo-overflow'),
          projects = document.querySelectorAll('.project-home'),
          translation = projectsContainer.style.transform.substring(projectsContainer.style.transform.lastIndexOf("(")+1,projectsContainer.style.transform.lastIndexOf("px"));

      for (let m = 0; dotNav.length > m; m ++) {
        if (dotNav[m].classList.contains('current')) {
          oldCurrent = m;
        }

        if (dotNav[m] == e.target) {
          newCurrent = m;
          this.index = m;
        }
      }

      for (let j = 0; projects.length > j; j ++) {
        projects[j].classList.remove('current');
        projects[j].classList.remove('prev-current');
        projects[j].classList.remove('next-current');
        dotNav[j].classList.remove('current');

        if (j == this.index) {
          projects[j].classList.add('current');
          dotNav[j].classList.add('current');
        } else if (j == this.index - 1) {
          projects[j].classList.add('prev-current');
        } else if (j == this.index + 1) {
          projects[j].classList.add('next-current');
        }
      }

      if (newCurrent > oldCurrent) {
        if (newCurrent - oldCurrent == 1) {
          translation = parseInt(translation) -  parseInt(this.translation) - parseInt(this.translation) / 2.7;
        } else {
          translation = parseInt(translation) - (newCurrent - oldCurrent) * (parseInt(this.translation) + parseInt(this.translation) / 2.7);
        }
      } else {
        if (oldCurrent - newCurrent == 1) {
          translation = parseInt(translation) +  parseInt(this.translation) + parseInt(this.translation) / 2.7;
        } else {
          translation = parseInt(translation) + (oldCurrent - newCurrent) * (parseInt(this.translation) + parseInt(this.translation) / 2.7);
        }
      }

      console.log(translation);
      projectsContainer.style.transform = 'translateX(' + translation + 'px)';
    },
    moveDiapo: function (direction, nb) {
      let projectsContainer = document.querySelector('.diapo-overflow'),
          translation = projectsContainer.style.transform.substring(projectsContainer.style.transform.lastIndexOf("(")+1,projectsContainer.style.transform.lastIndexOf("px")),
          projects = document.querySelectorAll('.project-home'),
          transformValue,
          dotNav = document.querySelectorAll('.dot-nav');

      for (let j = 0; projects.length > j; j ++) {
        projects[j].classList.remove('current');
        projects[j].classList.remove('prev-current');
        projects[j].classList.remove('next-current');
        dotNav[j].classList.remove('current');

        if (j == this.index) {
          projects[j].classList.add('current');
          dotNav[j].classList.add('current');
        } else if (j == this.index - 1) {
          projects[j].classList.add('prev-current');
        } else if (j == this.index + 1) {
          projects[j].classList.add('next-current');
        }
      }

      if (direction == 'left') {
        transformValue = parseInt(translation) + parseInt(this.translation) + parseInt(this.translation) / 2.7;
      } else if (direction == 'right') {
        transformValue = parseInt(translation) - parseInt(this.translation) - parseInt(this.translation) / 2.7;
      }

      projectsContainer.style.transform = 'translateX(' + transformValue + 'px)';
    },
    onResize: function(event) {
      if (this.index == undefined) {
        this.index = 1;
      }

      this.buildDiaporama();
    },
    quitProject: function () {
      let projectsContainer = document.querySelector('.diapo-overflow'),
          project = document.querySelector('.project');
      projectsContainer.classList.remove('project-page');
      project.classList.add('leave-project');

      setTimeout(this.redirect , 500);
    },
    redirect: function () {
      this.$route.router.go('/');
    }
  }
});

module.exports = Diaporama;
