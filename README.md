# history-navigator

Minimalist js library to navigate across the browser history with no dependencies.

```html
<script type="text/javascript" src="src/navigator.js"></script>
<script type="text/javascript">
    var nav = Navigator.init(function (oldPage, newPage, cb) {
        console.log('from: ' + oldPage.href + ' / to: ' + newPage.href);
        cb();
    });

    //Add more pages
    nav.push('/path');
    nav.replace('/other-path');

    //Go back
    window.history.back();
</script>
``