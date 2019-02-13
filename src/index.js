/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials)
{
      const Methods = {};
      const Utilities = require("./utilities");

      Methods.Search = require("./search")(Credentials, Utilities);

      return Methods;
};