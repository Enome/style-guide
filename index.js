/** @jsx React.DOM */

var React = require('./components/react');
var Search = require('./components/search');
var Results = require('./components/results');
var Bookmarks = require('./components/bookmarks');

var App = React.createClass({

  // UI Logic

  search: function (event) {
    this.setState({ search: event.target.value });
  },

  toggle: function (prop) {
    var state = {};
    state[prop] = !this.state[prop];
    this.setState(state);
  },

  selectBookmark: function (bookmark) {
    this.setState({ search: bookmark.selector });
  },

  // Lifecycle events

  componentDidMount: function () {

    var title = document.querySelector('title');

    if (title) {
      this.setState({ title: title.textContent });
    }

  },

  getInitialState: function () {

    return { 
      search: '', 
      title: 'Style Guide', 
      merge: false,
      show_html: false,
      show_colors: false,
    };

  },


  // Render

  render: function () {
    return (
      <div className='sg-main'>

        <div className='sg-sidebar'>
          <div className='sg-title'>{this.state.title}</div>

          <Search onChange={this.search} search={this.state.search} />

          <div className='sg-actions'>

            <div className={ 'sg-btn ' + ( this.state.merge ? 'sg-btn-selected' : '' ) } onClick={this.toggle.bind(this, 'merge')}>
              Merge results
            </div>

            <div className={ 'sg-btn ' + ( this.state.show_html ? 'sg-btn-selected' : '' ) } onClick={this.toggle.bind(this, 'show_html')}>
              Show html
            </div>

            <div className={ 'sg-btn ' + ( this.state.show_colors ? 'sg-btn-selected' : '' ) } onClick={this.toggle.bind(this, 'show_colors')}>
              Show colors
            </div>

          </div>

          <Bookmarks onChange={this.selectBookmark} search={this.state.search} />
        </div>

        <Results search={this.state.search} merge={this.state.merge} show-html={this.state.show_html} show-colors={this.state.show_colors} />

      </div> 
    );
  }

});

React.renderComponent(<App />, document.querySelector('#sg'));
