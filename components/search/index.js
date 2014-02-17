/** @jsx React.DOM */

var React = require('../react');

var Search = React.createClass({
  

  // UI Logic

  search: function (event) {
    var value = event.target.value;
    this.setState({ search: value });
    this.props.onChange(event);
  },

  // Lifecycle events

  componentWillReceiveProps: function (next) {
    this.setState({ search: next.search });
  },

  getInitialState: function () {
    return { search: '' };
  },


  // Render

  render: function () {
    return (
      <div>
        <input className='sg-form-control' type='text' placeholder='Css selector' value={this.state.search} onChange={this.search}  />
      </div>
    );
    
  },

});

module.exports = Search;
