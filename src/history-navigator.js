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
            href: this.current,
            index: 0
        };

        if (config.init) {
            config.init.call(this, this.pages[this.current])
        }
    }

    Navigator.prototype = {
        push: function (href) {
            return this.change(href, function () {
                window.history.pushState({}, '', href);
            });
        },

        replace: function (href) {
            return this.change(href, function () {
                window.history.replaceState({}, '', href);
            });
        },

        change: function (href, done) {
            this.resolver.setAttribute('href', href);
            href = this.resolver.href;

            var prevPage = this.pages[this.current];
            var page = this.pages[href] || {
                title: null,
                href: href,
                index: Object.keys(this.pages).length
            };

            if (prevPage === page) {
                return this;
            }

            var event = prevPage.index < page.index ? 'forward' : 'backward';
            var callback = (function () {
                this.current = href;
                this.pages[href] = page;
                document.title = page.title;

                if (done) {
                    done();
                }
            }).bind(this);

            if (this.events[event].length < 3) {
                this.events[event].call(this, page, prevPage);
                callback();
            } else {
                this.events[event].call(this, page, prevPage, callback);
            }

            return this;
        },

        load: function (page, done) {
            var request = new XMLHttpRequest();
            request.open('GET', page.href, true);

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    page.dom = document.implementation.createHTMLDocument();
                    page.dom.documentElement.innerHTML = request.responseText;
                    page.title = page.dom.title;

                    done(request);
                }
            };

            request.send();
        }
    };

    return function (config) {
        var nav = new Navigator(config || {});

        window.onpopstate = function (event) {
            nav.change(document.location.href);
        };

        return nav;
    };
}));
