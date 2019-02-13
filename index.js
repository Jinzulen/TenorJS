/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

exports.client = function (Credentials)
{
      if (!Credentials.Key)
      {
            throw new Error ("Developer API key is missing.");
      };

      return require("./src")(Credentials.Key);
};