/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

exports.client = function (Credentials)
{
      const Filters      = ["off", "low", "medium", "high"],
            MediaFilters = ["basic", "minimal"];

      if (!Credentials.Key || !Credentials.Locale || !Credentials.Filter)
      {
            throw new Error ("Client configuration is not complete; please ensure all configuration parameters are satisfied (Key, Locale, Filter).");
      };
      
      if (!Filters.includes(Credentials.Filter.toLowerCase()))
      {
            throw new Error ("Content filter level has to be one of these options: off, low, medium, high.");
      };

      if (Credentials.MediaFilter)
      {
            if (!MediaFilters.includes(Credentials.MediaFilter.toLowerCase()))
            {
                  throw new Error ("Media content filter has to be one of these options: basic, minimal.");
            };
      } else if (!Credentials.MediaFilter) { Credentials.MediaFilter = "minimal"; };

      return require("./src")(Credentials);
};