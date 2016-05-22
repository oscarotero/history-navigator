# history-navigator

Minimalist js library to navigate across the browser history with no dependencies.

```html
<script type="text/javascript" src="src/navigator.js"></script>
<script type="text/javascript">
    //Define the onChange method
    var nav = HistoryNavigator(function (oldPage, newPage, callback) {
        console.log('from: ' + oldPage.href + ' / to: ' + newPage.href);
        callback();
    });

    //Add more pages
    nav.push('/path');
    nav.replace('/other-path');

    //Go back
    window.history.back();
</script>
```
