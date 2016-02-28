// Article Component

import Vue from 'vue';
import Const from '../../../utils/Const';

let Article = Vue.extend({
    template: require('./article.html'),
    state: {
      object: '',
      author: '',
      author_email: '',
      content: ''
    },
    route: {
      data: function (transition) {
        let name = transition.to.params.articleName;
        let Httpreq = new XMLHttpRequest(),
            url = Const.urlSite + 'portfolio-clemence/wordpress/wp-json/posts?filter[name]=='+ name;

        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        this.object = JSON.parse(Httpreq.responseText)[0];

        return {
          articleNumber: transition.to.params.articleNumber,
          article: this.object
        }
      },
      activate: function () {
        let menuBlog = document.querySelector('.open-menu li:nth-child(2) a');
        menuBlog.classList.add('active');
      },
      canDeactivate: function (transition) {
        let article = document.querySelector('.article-home'),
            menuBlog = document.querySelector('.open-menu li:nth-child(2) a');
        article.classList.add('leave-article');
        menuBlog.classList.remove('active');

        setTimeout(transition.next, 1500);
      }
    },
    ready: function () {

    },
    methods: {
      postComment: function (e) {

      }
    }
});

module.exports = Article;
