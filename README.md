twitter-cli
====

A Twitter command-line interface for Mac, Linux and Windows.

Install
-------

Two ways:

1. Download the "compiled" binaries from /dist for your platform. Run `twitter` to see available commands
2. Clone/download the repo. Run `./jsdb/jsdb_mac main.js` (see JSDB.org for more info)

Usage
-----

You'll have to run `twitter authorize` first so you can allow access to your account. It will open a browser for the auth, get the PIN from there and type it in. Voilà.

Run `twitter` without arguments for the list of available commands:

Commands
-------

    get [n]             -- get most recent tweets
    search [n] [string] -- search for the specified terms
    post [text]         -- post tweet
    data                -- display oauth tokens

* It *almost* works on Windows. Try it for yourself.

Built with [JSDB](http://jsdb.org)
