/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
      const Methods     = {}, Gateway = "https://api.tenor.com/v1",
            Key         = Credentials.Key, Locale = Credentials.Locale,
            Filter      = Credentials.Filter.toLowerCase(), MediaFilter = Credentials.MediaFilter;

      Methods.random = Methods.query = function (Term, Limit, Callback) {
            return new Promise((Resolve, Reject) => {
                  Utilities.manageAPI(`${Gateway}/random?q=${Term}&key=${Key}&limit=${Limit}&contentfilter=${Filter}&locale=${Locale}&media_filter=${MediaFilter}`, Callback, Resolve, Reject);
            });
      };

      Methods.trending = function (Limit, Callback) {
            return new Promise((Resolve, Reject) => {
                  Utilities.manageAPI(`${Gateway}/trending?key=${Key}&limit=${Limit}&contentfilter=${Filter}&locale=${Locale}&media_filter=${MediaFilter}`, Callback, Resolve, Reject);
            });
      };

      Methods.trending_terms = function (Callback) {
            return new Promise ((Resolve, Reject) => {
                  Utilities.manageAPI(`${Gateway}/trending_terms?key=${Key}`, Callback, Resolve, Reject);
            });
      };

      Methods.categories = function (Callback) {
            return new Promise( (Resolve, Reject) => {
                  Utilities.manageAPI(
                        `${Gateway}/categories?key=${Key}&contentfilter=${Filter}&locale=${Locale}`,
                        Callback, Resolve, Reject
                  );
            });
      };

      Methods.category = function (Category, Limit, Callback) {
            return new Promise ( (Resolve, Reject) => {
                  Utilities.manageAPI(
                        `${Gateway}/search?tag=${Category}&limit=${Limit}&key=${Key}&contentfilter=${Filter}&locale=${Locale}`,
                        Callback, Resolve, Reject
                  );
            });
      };

      return Methods;
};