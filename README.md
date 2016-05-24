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

            //If the page has been loaded before
            if (page.dom) {
                document.querySelector('.container').innerHTML = page.dom.querySelector('.container').innerHTML;
                return done();
            }

            //helper function to load the page using ajax
            this.load(page, function () {
                //Get page info:
                page.href;  //The url
                page.title; //The title
                page.index; //The index position (0, 1, 2, ...)
                page.dom;   //The html document object

                page.foo = 'bar'; //Save your own data to retrieve it later

                //Insert the content of the page
                document.querySelector('.container').innerHTML = page.dom.querySelector('.container').innerHTML;

                //This is an asyncronous callback, so use done()
                done();
            });
        },

        backward: function (page, oldPage) {
            console.log('Back to previous page');
            
            document.querySelector('.container').innerHTML = page.dom.querySelector('.container').innerHTML;
        }
    });

    //Load pages
    nav.push('/path');
    nav.replace('/other-path');

    //Go back
    window.history.back();
</script>
```
