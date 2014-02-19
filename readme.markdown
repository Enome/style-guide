# Style Guide

This is a client-side app that you can use to create a style guide from html and css files. 

[Demo](http://style-guide.friendly-stranger.com/demo.html) | [Demo Code](http://github.com/enome/style-guide-demo)

## Installation

- Create a html file or use [this file](https://raw.github.com/Enome/style-guide/master/build/index.html).
- Download the style guide [css](https://raw.github.com/Enome/style-guide/master/build/index.css) and [javascript](https://raw.github.com/Enome/style-guide/master/build/index.js)
- Reference the style guide css and javascript file in your html file.
- Create a `<div id='sg'></div>` tag.
- Include your own css.
- Include your own html.
- Add bookmarks (optional).
- Enable live reloading (optional)
- Serve your html file with a http server.

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

### Enable live reloading

If you use style guides for development you can turn on live reloading.

```html
window.live_reloading = true;
```

It's recommended that you disable it when you publish your style guide online since every visitor will request all your css and html every 1500ms.

### Serving html

Because the app does XMLHttpRequests you need to serve your html file with a http server otherwise you'll get cross origin errors because of `file://`. 

If you need a simple web server I can recommend `npm install http-server -g`. 
Once installed you can `http-server -p 3000 .` and it will serve the current directory at port 3000.

## Todo

- Show fonts stats.
- Use hash in url to link to selectors.

## Build

```sh
npm i
grunt
```

## License

MIT
