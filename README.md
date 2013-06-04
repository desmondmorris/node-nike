Nike+ API client library for node.js
====================================

An unofficial api wrapper for the Nike+ API written in node.js.

Install
-------

    npm install node-nike

Usage
-----

This module takes a configuration parameter containing the Nike+ access token.

    var Nike = require('./lib/nike');
    var access_token = 'XXXXX';
    var nike = new Nike(access_token);

    nike.get(function(err, data) {
      console.log(data);
    });

Notes
-----

Nike has not officially released access to its authentication services.  Once they do, this module should be updated to get the access token via OAuth.

Todo
----

* Tests
