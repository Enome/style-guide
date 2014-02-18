/** @jsx React.DOM */

var React = require('../react');
var _ = require('lodash');

var mediator = require('../mediator');
var css = require('../css');
var html = require('../html');
var Result = require('../result');

var Results = React.createClass({
  

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
    return { html: [], colors: [] };
  },


  // Render

  render: function () {

    var self = this;

    var html_list = this.state.html;

    if (this.props.merge) {
      html_list = _.compact([html_list.join('\n')]);
    }

    var html = _.map(html_list, function (html) {
      return <Result html={html} show-html={self.props['show-html']} show-colors={self.props['show-colors']}/>;
    });

    return (
      <div className='sg-results'>{html}</div>
    );
    
  },

});

module.exports = Results;
