// Project Component

import Vue from 'vue';
import Const from '../../utils/Const';

let Project = Vue.extend({
    template: require('./project.html'),
    state: {
      project: '',
      projectCount: ''
    },
    route: {
      data (transition) {
        let name = transition.to.params.projectName;
        let Httpreq = new XMLHttpRequest(),
            url = Const.urlSite + 'wordpress/wp-json/posts?filter[s]='+ name,
            link;

        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        this.project = JSON.parse(Httpreq.responseText)[0];

        link = false;

        if (this.project.meta.next_project_url != '' && this.project.meta.next_project_url != undefined) {
          let count = this.project.meta.next_project_url.split('/').length - 2;
          link = this.project.meta.next_project_url.split('/')[count];
        }

        return {
          inProject: this.project,
          link: link
        }
      }
    },
    ready () {
      let container = document.querySelectorAll('.diapo-overflow'),
          diapos = document.querySelectorAll('.diapo-container .project-home'),
          currentDiapo = document.querySelectorAll('.project-home.current')[0];

      container[0].classList.add('project-page');
      this.projectCount = diapos.length;

      // Move diapo for direct link
      for (let j = 0; j < diapos.length; j ++) {
        for (let m = 0; m < diapos[j].classList.length; m ++) {
          if (diapos[j].classList[m].indexOf(this.project.slug) > -1) {
            if (this.indexInParent(currentDiapo) != j) {
              let indexNav = j + 1,
                  fixNav = document.querySelectorAll('.dot-nav:nth-child(' + indexNav + ')')[0];

              if (fixNav.onclick) {
                 fixNav.onclick();
              } else if (fixNav.click) {
                 fixNav.click();
              }
            }
          }
        }
      }

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
            current = document.querySelectorAll('.project-home.current')[0],
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
          // nasty
          if (_this.indexInParent(current) + 1 == _this.projectCount) {
            let nav = document.querySelectorAll('.dot-nav:nth-child(1)')[0];

            if (nav.onclick) {
               nav.onclick();
            } else if (nav.click) {
               nav.click();
            }
          } else {
            _this.$parent.$parent.$children[0].$children[0].nextProject();
          }

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

        setTimeout (this.resetFooter, 3000);
      },
      resetFooter () {
        let prepareFooter = document.querySelectorAll('.next-project-prepare')[0],
            project = document.querySelectorAll('.project')[0],
            sectionCredits = document.querySelectorAll('.section-credits')[0],
            footer = document.querySelectorAll('.next-project')[0],
            tmpFooter= document.querySelectorAll('.home > .next-project')[0];

        sectionCredits.parentNode.insertBefore(footer, sectionCredits.nextSibling);
        footer.parentNode.insertBefore(prepareFooter, footer.nextSibling);
        prepareFooter.classList.remove('prepare');
        footer.style.height = '200px';
        footer.style.maxHeight = '200px';
      },
      indexInParent(node) {
        let children = node.parentNode.childNodes,
            num = 0;

        for (let i=0; i<children.length; i++) {
          if (children[i] == node) return num;
          if (children[i].nodeType == 1) num++;
        }

        return -1;
      }
    }
});

module.exports = Project;
