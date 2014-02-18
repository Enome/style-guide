/** @jsx React.DOM */

var React = require('../react');

var highlight = require('highlight.js');
var _ = require('lodash');
var colors = require('../colors');
var mediator = require('../mediator');

var Result = React.createClass({

  // Custom methods

  setColors: function () {

    var html = this.getDOMNode().querySelector('.sg-panel-markup');

    var children = Array.prototype.slice.call(html.getElementsByTagName('*'));

    var clrs = _.unique(_.flatten(children.map(function (child) {
      return colors.fromElement(child);
    })));

    clrs = clrs.map(function (color) {
      return colors.rgbToHex(color); 
    });

    clrs = colors.sort(clrs);

    if (!_.isEqual(this.state.colors, clrs)) {
      this.setState({ colors: clrs });
    }

  },

  cssChangeHandler: function () {

    var self = this;

    // Give the html some time to update
    
    setTimeout(function () {
      self.setColors();  
    }, 100);

  },
  
  //Lifecycle Events

  componentDidMount: function () {
    mediator.on('css:change', this.cssChangeHandler);
    this.setColors();
  },

  componentWillUnmount: function () {
    mediator.remove('css:change', this.cssChangeHandler);
  },

  componentDidUpdate: function () {
    this.setColors();
  },

  getInitialState: function () {
    return { colors: [] };
  },

  //Render

  render: function () {

    var colors = this.state.colors.map(function (color) {

      var value = color.hexString();

      if (typeof color.rgb().a !== 'undefined') {
        value = color.rgbString(); 
      }

      return (
        <div className='sg-color' title={value}>
          <div className='sg-color-color' style={{ background: value }} />
          <div className='sg-color-text'>{value}</div>
        </div>
      );
    });

    return (
      <div className='sg-result'>
        <div className='sg-panel'>
          <div className='sg-panel-title'>Component</div>
          <div className='sg-panel-markup' dangerouslySetInnerHTML={{__html: this.props.html}} />
        </div>

        <div className='sg-panel' style={{ display: this.props['show-html'] ? 'block' : 'none' }}>
          <div className='sg-panel-title'>Html</div>
          <pre className='sg-code' dangerouslySetInnerHTML={{ __html: highlight.highlight('html', this.props.html).value }} />
        </div>

        <div className='sg-panel' style={{ display: this.props['show-colors'] ? 'block' : 'none' }}>
          <div className='sg-panel-title'>Colors</div>
          <div className='sg-colors'>
            {colors}
          </div>
        </div>
      </div>
    );

  },

});

module.exports = Result;
