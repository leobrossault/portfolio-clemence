// Article Component

import Vue from 'vue';
import Const from '../../../utils/Const';

let Article = Vue.extend({
    template: require('./article.html'),
    state: {
      object: '',
      author: '',
      author_email: '',
      content: '',
      post: '',
      comment: []
    },
    route: {
      data (transition) {
        let name = transition.to.params.articleName;
        let Httpreq = new XMLHttpRequest(),
            url = Const.urlSite + 'wordpress/wp-json/posts?filter[name]=='+ name;

        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        this.object = JSON.parse(Httpreq.responseText)[0];

        this.post = this.object.ID;

        return {
          articleNumber: transition.to.params.articleNumber,
          article: this.object
        }
      },
      activate () {
        scroll(0, 0);
        let menuBlog = document.querySelector('.open-menu li:nth-child(2) a'),
            header = document.querySelector('header');
        menuBlog.classList.add('active');
        header.classList.remove('leave');
      },
      canDeactivate (transition) {
        let article = document.querySelector('.article-home'),
            menuBlog = document.querySelector('.open-menu li:nth-child(2) a'),
            header = document.querySelector('header');
        article.classList.add('leave-article');
        menuBlog.classList.remove('active');
        header.classList.add('leave');

        setTimeout(transition.next, 1500);
      }
    },
    http: {
      root: '/root',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://clemence-taillez.fr/',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'X-Custom-Header',
        'Authorization': 'Basic dHV0c3BsdXM6MTIzNDU2'
      },
      emulateHTTP: true
    },
    ready () {

    },
    methods: {
      postComment (e) {
        let url = Const.urlSite + 'wordpress/wp-json/posts/' + this.post + '/comments',
            options = [{
              headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://clemence-taillez.fr/',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'X-Custom-Header',
                'Authorization': 'Basic dHV0c3BsdXM6MTIzNDU2'
              },
            }];

        this.comment = [{
          'author': this.author,
          'author_email': this.author_email,
          'content': this.content,
          'post': this.post
        }];

        this.$http.post(url, this.comment[0], options).then(function(response) {
            console.log('posted');
        }, function(response) {
            console.log(response);
        });
      },
      quitArticle () {
        let article = document.querySelectorAll('.article-home');
        article[0].classList.add('leave-article');

        setTimeout(this.redirect , 500);
      },
      redirect () {
        this.$route.router.go('/blog');
      }
    }
});

module.exports = Article;
