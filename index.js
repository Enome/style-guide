/** @jsx React.DOM */

var React = require('./components/react');
var Search = require('./components/search');
var Result = require('./components/result');
var Bookmarks = require('./components/bookmarks');

var App = React.createClass({

  // UI Logic

  search: function (event) {
    this.setState({ search: event.target.value });
  },

  toggleMerge: function () {
    this.setState({ merge: !this.state.merge });
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
    return { search: '', title: 'Style Guide', merge: false };
  },


  // Render

  render: function () {
    return (
      <div className='sg-main'>

        <div className='sg-sidebar'>
          <div className='sg-title'>{this.state.title}</div>

          <Search onChange={this.search} search={this.state.search} />

          <div className='sg-actions'>
            <div className={ 'sg-btn ' + ( this.state.merge ? 'sg-btn-selected' : '' ) } onClick={this.toggleMerge}>Merge results</div>
          </div>

          <Bookmarks onChange={this.selectBookmark} search={this.state.search} />
        </div>

        <Result search={this.state.search} merge={this.state.merge} />

      </div> 
    );
  }

});

React.renderComponent(<App />, document.querySelector('#sg'));
