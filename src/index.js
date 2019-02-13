/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials)
{
      const Methods = {}, Utilities = require("./utilities");

      Utilities.checkVersion();

      Methods.Search = require("./search")(Credentials, Utilities);

      return Methods;
};