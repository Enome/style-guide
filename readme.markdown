# Style Guide

This is a client-side app that you can use to create a style guide from html and css files. 

[Demo](http://style-guide.friendly-stranger.com/demo.html) | [Demo Code](http://github.com/enome/style-guide-demo)

## Installation

- Create an html file.
- Reference the style guide css and javascript file.
- Create a `<div id='sg'></div>` tag.
- Include your own css.
- Include your own html.
- Add bookmarks (optional).
- Serve your html file with an http server.

### Include your own css

This is just like referencing css normally with a link tag.

```html
<link href='your.css' rel='stylesheet' type='text/css' />
```

### Include your own html

You include html like you do css with a link tag of type `text/html`. (Not sure if this is very web-standardy but it works)

```html
<link href='your.html' type='text/html' />
```

### Add bookmarks

This allows you to load css selectors inside the search field from the sidebar. The application expects these on the `window.bookmarks` object. (This is optional)

```html
<script>
  window.bookmarks = {
    'Buttons': [ 
      { name: 'All',  selector: '.btn' },
      { name: 'Default',  selector: '.btn-default' },
      ...
    ],

    'Tables': [ 
      { name: 'All',  selector: 'table' },
      { name: 'Default',  selector: 'table:not(.table-striped):not(.table-bordered)' },
      ...
    ],
  };
</script>
```

### Serving html

Because the app does XMLHttpRequests you need to serve your html file with an http server otherwise you'll get cross origin errors because of file://. If you need a simple server I can recommend `npm install http-server -g`. Once installed you can `http-server -p 3000 .` and it will serve the current directory at port 3000.

## Usage

You can show components by searching for them with a css selector. The application does live reloading of the html and css files and you should only refresh the page if you made changes to the settings.

## Todo

- Show html pane.
- Show colors pane.
- Show fonts used.
- Remember the last search between refreshes.

## Development

If you want to contribute or adjust the application to your needs you can use `server.js` for local development. It will browserify the application on request so you don't have to run grunt all the time.

## Build

```sh
npm i
grunt
```

## License

MIT
