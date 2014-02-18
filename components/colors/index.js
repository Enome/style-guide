var _ = require('lodash');
var Color = require('color');

var colors = {

  rgbToHex: function (rgb) {
    return Color(rgb);
  },

  fromElement: function (element) {

    var style = getComputedStyle(element);

    var colors = [
      style.getPropertyValue('color'),
      style.getPropertyValue('background-color'),
      style.getPropertyValue('border-top-color'),
      style.getPropertyValue('border-right-color'),
      style.getPropertyValue('border-bottom-color'),
      style.getPropertyValue('border-left-color'),
    ];

    return _.unique(colors);
    
  },

  sort: function (colors) {

    return colors.sort(function (a, b) {
      return a.hue() - b.hue(); 
    });
    
  },

};

module.exports = colors;
