/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Callback)
{
      return new Promise((Resolve, Reject) => {
            Utilities.manageAPI(`${Credentials.Gate}/trending_terms?key=${Credentials.Key}`,
                  Callback, Resolve, Reject);
      });
};