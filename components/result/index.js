/** @jsx React.DOM */

var React = require('../react');
var _ = require('lodash');

//var functions = require('./functions');
var mediator = require('../mediator');
var css = require('../css');
var html = require('../html');

var Result = React.createClass({
  

  // Lifecycle events

  componentWillReceiveProps: function (next) {

    var self = this;

    html.querySelector(next.search, function (html) {
      self.setState({ html: html });
    });

    mediator.on('html:change', function () {
      html.querySelector(next.search, function (html) {
        self.setState({ html: html });
      });
    });
    
  },

  componentDidMount: function () {
    html.watcher();
    css.watcher();
  },

  getInitialState: function () {
    return { html: [] };
  },


  // Render

  render: function () {

    var html_list = this.state.html;

    if (this.props.merge) {
      html_list = _.compact([html_list.join('\n')]);
    }

    var html = _.map(html_list, function (html) {
      return (

        <div className='sg-result'>
          <div className='sg-panel'>
            <div className='sg-panel-title'>Component</div>
            <div className='sg-panel-markup' dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>

      );
    });

    return (
      <div className='sg-results'>{html}</div>
    );
    
  },

});

module.exports = Result;
