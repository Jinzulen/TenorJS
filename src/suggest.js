/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
      const Methods     = {},
            Key         = Credentials.Key,
            Gateway     = "https://api.tenor.com/v1";

      Methods.suggestions = function (Term, Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  Utilities.manageAPI(`${Gateway}/search_suggestions?key=${Key}&q=${Term}&limit=${Limit}`, Callback, Resolve, Reject);
            });
      };

      Methods.autocomplete = function (Term, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  Utilities.manageAPI(`${Gateway}/autocomplete?key=${Key}&q=${Term}`, Callback, Resolve, Reject);
            });
      };

      return Methods;
};