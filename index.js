/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */
const FS     = require("fs"),
      Colors = require("colors");

exports.client = function (Credentials)
{
      const Filters      = ["off", "low", "medium", "high"],
            MediaFilters = ["basic", "minimal"];

      /**
       * Credentials checks.
       */
      if (!Credentials.Key || !Credentials.Locale || !Credentials.Filter)
      {
            throw new Error ("Client configuration is not complete; please ensure all configuration parameters are satisfied (Key, Locale, Filter).");
      }
      
      if (!Filters.includes(Credentials.Filter.toLowerCase()))
      {
            throw new Error ("Content filter level has to be one of these options: off, low, medium, high.");
      }

      if (Credentials.MediaFilter)
      {
            if (!MediaFilters.includes(Credentials.MediaFilter.toLowerCase()))
            {
                  throw new Error ("Media content filter has to be one of these options: basic, minimal.");
            }
      } else if (!Credentials.MediaFilter) {
            Credentials.MediaFilter = "minimal"; 
      }

      if (!Credentials.DateFormat) Credentials.DateFormat = "D/MM/YYYY - H:mm:ss A";

      Credentials.Gate   = "https://api.tenor.com/v1";
      Credentials.Filter = Credentials.Filter.toLowerCase();

      /**
       * Should probably move this elsewhere in the future, not a good
       * idea having this much code and heavy-lifting in one place.
       */
      let Creds = JSON.stringify(Credentials);
      
      function writeConfig()
      {
            FS.writeFileSync("tenor_config.json", Creds, function (Error) {
                  if (Error) throw Error;
                  console.log(Colors.bold.green(`# [TenorJS] Changes have been made to the configuration file. Process should be restarted.`));
                  process.exit(1);
            });
      }
      
      try
      {
            if (!FS.existsSync("tenor_config.json"))
            {
                  writeConfig();
            } else {
                  FS.readFile("tenor_config.json", "utf8", function (Error, Data) {
                        if (Error) throw Error;
                        if (Data !== Creds) writeConfig();
                  });
            }
      } catch (E) {
            throw E;
      }

      return require("./src")(Credentials);
};