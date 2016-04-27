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
      console.log(this.$parent);
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
      },
      nextProject () {
        let scrollTop = document.body.scrollTop,
            viewportHeight = window.innerHeight,
            footer = document.querySelectorAll('.next-project')[0],
            home = document.querySelectorAll('.home')[0],
            top = document.body.scrollTop + footer.getBoundingClientRect().top,
            sum = top - scrollTop + viewportHeight,
            project = document.querySelectorAll('.project')[0],
            link = document.querySelectorAll('.next-project a')[0].getAttribute('data-link'),
            _this = this,
            diff;

        diff = 200 - (scrollTop + viewportHeight - top);

        home.parentNode.insertBefore(footer, home.nextSibling);
        footer.classList.add('go-to-next');
        project.classList.add('go-to-next');
        footer.style.height = window.innerHeight + 'px';
        footer.style.bottom = -diff + 'px';

        setTimeout(function () {
          footer.style.maxHeight = window.innerHeight + 'px';
          footer.style.transform = 'translateY(-'+ diff +'px)';
        }, 600);

        setTimeout(function () {
          scrollTo(0, 0);
          _this.$parent.nextProject();
          _this.initNextProject(link);
        }, 1200);
      },
      initNextProject (link) {
        let prepareFooter = document.querySelectorAll('.next-project-prepare')[0],
            home = document.querySelectorAll('.home')[0],
            project = document.querySelectorAll('.project')[0],
            footer = document.querySelectorAll('.next-project')[0];

        home.parentNode.insertBefore(prepareFooter, home.nextSibling);
        project.parentNode.insertBefore(footer, project.nextSibling);
        this.$route.router.go(link);

        prepareFooter.style.height = window.innerHeight + 'px';
        prepareFooter.classList.add('prepare');
        footer.classList.remove('go-to-next');
        project.classList.remove('go-to-next');

        setTimeout (this.resetFooter, 1900);
      },
      resetFooter () {
        let prepareFooter = document.querySelectorAll('.next-project-prepare')[0],
            project = document.querySelectorAll('.project')[0],
            footer = document.querySelectorAll('.next-project')[0];

        prepareFooter.classList.remove('prepare');
        footer.style.height = '200px';
        footer.style.maxHeight = '200px';
      }
    }
});

module.exports = Project;
