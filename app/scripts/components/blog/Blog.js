// Blog Component

import Vue from 'vue';
import Const from '../../utils/Const';

let Blog = Vue.extend({
    template: require('./blog.html'),
    state: {
      object: '',
      objectShowed: '',
      nbObjectShowed: 0,
      page: '',
      articlesLentgh: 0,
      url: ''
    },
    route: {
      data (transition) {
        let name = transition.to.params.projectName;
        let HttpreqArticle = new XMLHttpRequest(),
            HttpreqBlog = new XMLHttpRequest(),
            urlBlog = Const.urlSite + 'wordpress/wp-json/pages?filter[s]=blog',
            urlArticle = Const.urlSite + 'wordpress/wp-json/posts?filter[category_name]=articles&filter[orderby]=date&filter[order]=DESC';

        HttpreqBlog.open('GET', urlBlog, false);
        HttpreqBlog.send(null);
        this.page = JSON.parse(HttpreqBlog.responseText)[0];

        HttpreqArticle.open('GET', urlArticle, false);
        HttpreqArticle.send(null);
        this.object = JSON.parse(HttpreqArticle.responseText);

        this.articlesLentgh = this.object.length;
        this.nbObjectShowed = 5;
        this.objectShowed = [];

        for (let i = 0; i < this.nbObjectShowed; i ++) {
          if (this.object[i] != null) {
            this.objectShowed.push(this.object[i]);
          }
        }

        if (this.articlesLentgh < 10) {
          this.articlesLentgh = '0' + this.articlesLentgh;
        }

        if (this.nbObjectShowed > this.object.length) {
          let btnMore = document.querySelectorAll('.more-article');
          btnMore[0].classList.add('hide');
        }

        return {
          articles: this.objectShowed,
          numberArticle: this.articlesLentgh,
          blog: this.page
        }
      },
      activate () {
        let menuBlog = document.querySelector('.open-menu li:nth-child(2) a'),
            header = document.querySelector('header');
        menuBlog.classList.add('active');
        header.classList.remove('leave');
      },
      canDeactivate (transition) {
        let blog = document.querySelector('.blog-home'),
            menuBlog = document.querySelector('.open-menu li:nth-child(2) a'),
            header = document.querySelector('header');
        blog.classList.add('leave-blog');
        menuBlog.classList.remove('active');
        header.classList.add('leave');

        setTimeout(transition.next, 800);
      }
    },
    ready () {
      window.addEventListener('scroll', this.isInViewPort);
    },
    methods: {
      seeArticles () {
        let articleContainer = document.querySelectorAll('.blog'),
            elScroll = document.getElementById('scroll-to-article').getBoundingClientRect(),
            posY = elScroll.top;

        let timerID = setInterval(function() {
            window.scrollBy(0, 5);

            if(window.pageYOffset >= posY) {
              clearInterval(timerID);
            }
        }, 5);

        articleContainer[0].classList.add('show-article');
      },
      readMoreArticle () {
        this.nbObjectShowed += 5;

        for (let i = this.nbObjectShowed - 5; i < this.nbObjectShowed; i ++) {
          if (this.object[i] != null) {
            this.objectShowed.push(this.object[i]);
          }
        }

        if (this.nbObjectShowed > this.object.length) {
          let btnMore = document.querySelectorAll('.more-article');
          btnMore[0].classList.add('hide');
        }
      },
      readArticle (name, number, e) {
        if (e.target.parentNode.parentNode.parentNode.classList.contains('article-container')) {
          e.target.parentNode.parentNode.parentNode.classList.add('read-this');
        }

        if (e.target.parentNode.parentNode.classList.contains('article-container')) {
          e.target.parentNode.parentNode.classList.add('read-this');
        }

        if (e.target.parentNode.classList.contains('article-container')) {
          e.target.parentNode.classList.add('read-this');
        }

        if (number < 10) {
          this.url = '0' + number + '/' + name;
        } else {
          this.url = number + '/' + name;
        }

        setTimeout(function () {
          let blogArticle = document.querySelectorAll('.blog'),
              blogHome = document.querySelectorAll('.blog-home');

          blogArticle[0].classList.add('leave-blog-article');
          blogHome[0].classList.add('leave-blog-read');
        }, 500);

        setTimeout(this.redirectArticle, 800);
      },
      redirectArticle () {
        let fullUrl = '/article/' + this.url;
        this.$route.router.go(fullUrl);

        // let timerID = setInterval(function() {
        //     window.scrollBy(0, -15);
        //
        //     if(window.pageYOffset <= 0) {
        //       clearInterval(timerID);
        //     }
        // }, 1);
      },
      isInViewPort () {
        let scrollTop = document.body.scrollTop,
            viewportHeight = window.innerHeight,
            isNot = document.querySelectorAll('.isNot');

        [].forEach.call(isNot, function(item, i) {
          let top = document.body.scrollTop + item.getBoundingClientRect().top,
              sum = scrollTop + viewportHeight;

          if (sum > top) {
            item.classList.add('isIt');
          }
        });
      }
    }
});

module.exports = Blog;
