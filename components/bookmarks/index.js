/** @jsx React.DOM */

var React = require('../react');

var Bookmarks = React.createClass({

  // UI logic

  selectBookmark: function (selector) {
    this.props.onChange(selector);
  },

  // Lifecycle 

  getInitialState: function () {

    return {
      bookmarks: window.bookmarks || {} 
    }; 

  },

  // Render

  render: function () {

    var self = this;

    var bookmarks = Object.keys(this.state.bookmarks).map(function (category) {

      var selectors = self.state.bookmarks[category].map(function (bookmark) {

        return (
          <div className={ 'sg-bookmarks-bookmark ' + (self.props.search === bookmark.selector ? 'sg-bookmarks-bookmark-selected': '') } onClick={self.selectBookmark.bind(self, bookmark)}>
            {bookmark.name}
          </div>
        );

      });

      return (
        <div className='sg-bookmarks-category'>
          <div className='sg-bookmarks-category-title'>
            {category}
          </div>

          {selectors}
        </div>
      );
    });

    return (
      <div className='sg-bookmarks'>
        {bookmarks}
      </div>
    );

  },

});

module.exports = Bookmarks;
