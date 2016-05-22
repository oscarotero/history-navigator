(function (root, factory) {
    //amd
    if (typeof define === "function" && define.amd) {
        define(function (postal) {
            return factory();
        });

    //commonjs
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();

    //global
    } else {
        root.HistoryNavigator = factory();
    }
}(this, function () {
    function Navigator (config) {
        this.pages = {};
        this.current = document.location.href;
        this.resolver = document.createElement('a');
        this.events = {
            forward: config.forward || function (page, prevPage, done) { done(); },
            backward: config.backward || function (page, prevPage, done) { done(); }
        };

        this.pages[this.current] = {
            title: document.title,
            href: this.current
        };

        if (config.init) {
            config.init.call(this, this.pages[this.current])
        }
    }

    Navigator.prototype = {
        push: function (href) {
            return this.change(href, 'forward', function () {
                window.history.pushState({}, '', href);
            });
        },

        replace: function (href) {
            return this.change(href, 'forward', function () {
                window.history.replaceState({}, '', href);
            });
        },

        change: function (href, event, done) {
            this.resolver.setAttribute('href', href);
            href = this.resolver.href;

            var prevPage = this.pages[this.current];
            var page = this.pages[href] || { title: null, href: href };

            if (prevPage === page) {
                return this;
            }

            var callback = function () {
                this.current = href;
                this.pages[href] = page;
                document.title = page.title;

                if (done) {
                    done();
                }
            };

            this.events[event].call(this, page, prevPage, callback.bind(this));

            return this;
        }
    };

    return function (config) {
        var nav = new Navigator(config || {});

        window.onpopstate = function (event) {
            nav.change(document.location.href, 'backward');
        };

        return nav;
    };
}));
