var _ = require('lodash');
var async = require('async');
var mediator = require('../mediator');

var functions = {

  html: {}, // cache

  stringToDOM: function (str) {
    var parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
  },

  DOMtoString: function (dom) {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(dom);
  },

  requestHtml: function (urls, callback) {

    async.reduce(urls, {}, function (memo, url, next) {

      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        memo[url] = functions.stringToDOM(this.response);
        next(null, memo);
      };

      xhr.open('get', url);
      xhr.send();
      
    }, function (error, result) {
      callback(result);
    });
    
  },

  watcher: function (done) {

    var urls = _.map(Array.prototype.slice.call(document.querySelectorAll('link[type="text/html"]')), function (link) {
      return link.getAttribute('href');
    });

    functions.requestHtml(urls, function (html) {
      functions.html = html;
      done && done();
    });

    var changed = false;

    setInterval(function () {

      functions.requestHtml(urls, function (html) {

        _.each(html, function (value, key) {

          if (functions.DOMtoString(value) !== functions.DOMtoString(functions.html[key])) {
            changed = true;
          }
          
        });

        if (changed) {
          functions.html = html;
          changed = false;
          mediator.emit('html:change');
        }

      });
      
    }, 1500);

  },

  querySelector: function (search, callback) {

    if (!search) {
      return callback([]);
    }

    var result = _.map(functions.html, function (value, key) {

      var match;

      try {
        match = _.map(Array.prototype.slice.call(value.querySelectorAll(search)), function (el) {
          return functions.DOMtoString(el); 
        });

      } catch (e) {
        /* handle error */
      }

      return match;
      
    });

    callback(_.compact(_.flatten(result)));
    
  },

};

module.exports = functions;
