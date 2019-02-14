/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials)
{
      const Methods = {}, Utilities = require("./utilities");

      /**
       * Check if the user is running an outdated version of TenorJS.
       */
      Utilities.checkVersion();

      /**
       * Methods related to search querying.
       */
      Methods.Search = require("./search")(Credentials, Utilities);

      /**
       * Functions related to search term autocompleting and suggestions.
       */
      Methods.Suggest = require("./suggest")(Credentials, Utilities);

      return Methods;
};