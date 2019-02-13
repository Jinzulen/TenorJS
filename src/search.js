/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
      const Methods     = {},
            Key         = Credentials.Key,
            Locale      = Credentials.Locale,
            Filter      = Credentials.Filter.toLowerCase(),
            MediaFilter = Credentials.MediaFilter;

      Methods.random = Methods.query = function (Term, Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/random?q=${Term}&key=${Key}&limit=${Limit}&contentfilter=${Filter}&locale=${Locale}&media_filter=${MediaFilter}`;

                  Utilities.manageAPI(Endpoint, Callback, Resolve, Reject);
            });
      };

      Methods.trending = function (Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/trending?key=${Key}&limit=${Limit}&contentfilter=${Filter}&locale=${Locale}&media_filter=${MediaFilter}`;

                  Utilities.manageAPI(Endpoint, Callback, Resolve, Reject);
            });
      };

      Methods.trending_terms = function (Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/trending_terms?key=${Key}`;

                  Utilities.manageAPI(Endpoint, Callback, Resolve, Reject);
            });
      };

      Methods.categories = function (Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/categories?key=${Key}&contentfilter=${Filter}&locale=${Locale}`;

                  Utilities.manageAPI(Endpoint, Callback, Resolve, Reject);
            });
      };

      Methods.category = function (Category, Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/search?tag=${Category}&limit=${Limit}&key=${Key}&contentfilter=${Filter}&locale=${Locale}`;

                  Utilities.manageAPI(Endpoint, Callback, Resolve, Reject);
            });
      };

      return Methods;
};