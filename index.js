/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */
const Utilities = require("./src/Tools/Utilities");

exports.client = function (Credentials)
{
      const Filters      = ["off", "low", "medium", "high"],
            MediaFilters = ["gif", "mp4", "nanomp4", "nanogif", "tinymp4", "tinygif"];

      /**
       * Credentials checks.
       */
      if (!Credentials.Key || !Credentials.Locale || !Credentials.Filter)
      {
            throw new Error ("Client configuration is not complete; please ensure all configuration parameters are satisfied (Key, Locale, Filter).");
      }
      
      /**
       * Set default date format if user has set none.
       */
      if (!Credentials.DateFormat) Credentials.DateFormat = "D/MM/YYYY - H:mm:ss A";

      /**
       * Check if the set content filter level abides by the available options.
       */
      if (!Filters.includes(Credentials.Filter.toLowerCase())) throw new Error ("Content filter level has to be one of these options: off, low, medium, high.");

      /**
       * Set API gateway and set content filter to lowercase.
       */
      Credentials.Gate   = "https://tenor.googleapis.com/v2";
      Credentials.Filter = Credentials.Filter.toLowerCase();

      /**
       * Check status of TenorJS config.
       */
      Utilities.checkConfig(JSON.stringify(Credentials));

      return require("./src")(Credentials);
};