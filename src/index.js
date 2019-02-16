/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials)
{
      const Methods = {}, Utilities = require("./Tools/Utilities");

      /**
       * Check if the user is running an outdated version of TenorJS.
       */
      Utilities.checkVersion();

      /**
       * Methods related to search querying.
       */
      Methods.Search = require("./Search")(Credentials, Utilities);

      /**
       * Functions related to search autocompleting and suggestions.
       */
      Methods.Suggest = require("./Suggest")(Credentials, Utilities);

      /**
       * Methods related to trending content.
       */
      Methods.Trending = require("./Trending")(Credentials, Utilities);

      /**
       * Methods related to categories and tags.
       */
      Methods.Categories = require("./Categories")(Credentials, Utilities);

      return Methods;
};