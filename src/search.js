/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
      const Key = Credentials.Key;

      const Locale = Credentials.Locale;

      const Filter = Credentials.Filter.toLowerCase();

      const MediaFilter = Credentials.MediaFilter;

      const Methods = {};

      Methods.query = function (Term, Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/search?q=${Term}&key=${Key}&limit=${Limit}&contentfilter=${Filter}&locale=${Locale}&media_filter=${MediaFilter}`;

                  Utilities.callAPI(Endpoint, (Error, Result) => {
                        if(Error)
                        {
                              if (typeof Callback === "function")
                              {
                                    Callback(Error);
                              };
      
                              Reject(Error);
                              return;
                        };
      
                        if (typeof Callback === "function")
                        {
                              Callback(null, Result[0]);
                        };

                        Resolve(JSON.parse(Result));
                  });
            });
      };

      Methods.trending = function (Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/trending?key=${Key}&limit=${Limit}&contentfilter=${Filter}&locale=${Locale}&media_filter=${MediaFilter}`;

                  Utilities.callAPI(Endpoint, (Error, Result) => {
                        if(Error)
                        {
                              if (typeof Callback === "function")
                              {
                                    Callback(Error);
                              };
      
                              Reject(Error);
                              return;
                        };
      
                        if (typeof Callback === "function")
                        {
                              Callback(null, Result[0]);
                        };
      
                        Resolve(JSON.parse(Result));
                  });
            });
      };

      return Methods;
};