function Navigator (change) {
    this.pages = {};
    this.current = document.location.href;
    this.resolver = document.createElement('a');

    this.onChange = change || function (oldPage, newPage, cb) {
        console.log(oldPage);
        console.log(newPage);
        cb();
    };

    this.pages[this.current] = {
        title: document.title,
        href: this.current,
        first: true
    };
}

Navigator.init = function (change) {
    var nav = new Navigator(change);

    window.onpopstate = function (event) {
        nav.change(document.location.href);
    };

    return nav;
};

Navigator.prototype = {
    push: function (href) {
        this.change(href, function () {
            window.history.pushState({}, '', href);
        });
    },

    replace: function (href) {
        this.change(href, function () {
            window.history.replaceState({}, '', href);
        });
    },

    change: function (href, cb) {
        this.resolver.setAttribute('href', href);
        href = this.resolver.href;

        if (this.current === href) {
            return this;
        }

        var page = this.pages[href] || { title: null, href: href };
        var self = this;

        this.onChange.call(this, this.pages[this.current], page, function () {
            self.current = href;
            self.pages[href] = page;
            page.init = true;
            document.title = page.title;
            if (cb) {
                cb();
            }
        });

        return this;
    }
};
