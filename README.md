# history-navigator

Minimalist library to navigate across the browser history with no dependencies.

Supports:

* AMD
* CommonJS
* Global js

## Usage example:

```html
<!-- Load the library -->
<script type="text/javascript" src="src/history-navigator.js"></script>

<!-- Execute it -->
<script type="text/javascript">

    var nav = HistoryNavigator({
        init: function (page, done) {
            console.log('started from:' + page.href);
        },

        forward: function (page, oldPage, done) {
            console.log('load new page');

            loadPage(page.href, function (response) {
                page.title = response.title;
                page.body = response.body;
                document.querySelector('.container').innerHTML = page.body;
                done();
            });
        },

        backward: function (page, oldPage, done) {
            console.log('back to previous page');
            
            document.querySelector('.container').innerHTML = page.body;
        }
    });

    //Load pages
    nav.push('/path');
    nav.replace('/other-path');

    //Go back
    window.history.back();
</script>
```
