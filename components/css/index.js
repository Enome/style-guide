var _ = require('lodash');
var uuid = require('uuid');
var async = require('async');

var css = {
  
  files: {}, // cache

  getCssFiles: function (callback) {

    var stylesheet_links = Array.prototype.slice.call(document.querySelectorAll('link[rel=stylesheet]'));

    var stylesheet_urls = _.map(stylesheet_links, function (link) {
      return link.getAttribute('href');
    });

    async.reduce(stylesheet_urls, {}, function (memo, url, next) {

      url = url.match(/^[^?]+|$/)[0];

      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        memo[url] = this.response;
        next(null, memo); 
      };

      xhr.open('get', url);
      xhr.send();
      
    }, function (error, result) {
      callback(result);
    });
      
  },

  watcher: function () {

    var intervaller = setInterval(function () {

      css.getCssFiles(function (files) {

        _.each(files, function (value, key) {

          if (typeof css.files[key] !== 'undefined' && value !== css.files[key]) {

            var link = document.querySelector('link[href^="' + key + '"]');
            link.setAttribute('href', key + '?' + uuid.v4());

          }
          
        });

        css.files = files;

      });
      
      if (!window.live_reloading) {
        clearInterval(intervaller);
      }

    }, 1000);
    
  }

};

module.exports = css;
