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
        init: function (page) {
            console.log('Navigation started from:' + page.href);
        },

        forward: function (page, oldPage, done) {
            console.log('Go to next page');

            page.href;  //To get the url of the page
            page.title; //To change the page title
            page.index; //To get the index position (0, 1, 2, ...)
            page.foo = 'bar'; //Save your own data to retrieve it later

            //We have loaded this page before
            if (page.body) {
                document.querySelector('.container').innerHTML = page.body;
                return done();
            }

            //Load the page first time:
            loadPage(page.href, function (response) {
                page.title = response.title;
                page.body = response.body;
                document.querySelector('.container').innerHTML = page.body;
                
                //This is an asyncronous callback, so use done()
                done();
            });
        },

        backward: function (page, oldPage) {
            console.log('Back to previous page');
            
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
