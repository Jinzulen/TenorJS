/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

exports.client = function (Credentials)
{
      const Filters = ["off", "low", "medium", "high"];

      if (!Credentials.Key)
      {
            throw new Error ("Developer API key is missing.");
      };

      if (!Credentials.Locale)
      {
            throw new Error ("Content locale is not configured.");
      };

      if (!Credentials.Filter)
      {
            throw new Error ("Content filter level is not configured.");    
      };
      
      if (!Filters.includes(Credentials.Filter.toLowerCase()))
      {
            throw new Error ("Content filter level has to be one of these options: off, low, medium, high.");
      };

      return require("./src")(Credentials);
};