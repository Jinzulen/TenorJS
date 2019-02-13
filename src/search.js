/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
      const Key = Credentials;

      const Methods = {};

      Methods.trending = function (Limit, Callback)
      {
            return new Promise((Resolve, Reject) => {
                  const Endpoint = `https://api.tenor.com/v1/trending?key=${Key}&limit=${Limit}`;

                  Utilities.callAPI(Endpoint, (Error, Result) => {
                        if(Error)
                        {
                              if (typeof Callback === 'function')
                              {
                                    Callback(Error);
                              };
      
                              Reject(Error);
                              return;
                        };
      
                        if (typeof Callback === 'function')
                        {
                              Callback(null, Result[0]);
                        };
      
                        Resolve(JSON.parse(Result));
                  });
            });
      };

      return Methods;
};