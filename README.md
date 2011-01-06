Clit
====

A _command-line interface_ for Twitter for Mac, Linux and Windows*.

Install
-------

Two ways:

1. Download the "compiled" binaries from /dist for your platform. Run `clit` to see available commands
2. Clone/download the repo. Run `./jsdb/jsdb_mac main.js` (see JSDB.org for more info)

Usage
-----

You'll have to run `clit authorize` first so you can allow access to your account. It will open a browser for the auth, get the PIN from there and type it in. Voilà.

Run `clit` without arguments for the list of available commands:

Commands
-------

    get [n]             -- get most recent tweets
    search [n] [string] -- search for the specified terms
    post [text]         -- post tweet
    data                -- display oauth tokens

* It *almost* works in Windows. Try it for yourself.

Built on [JSDB](http://jsdb.org)