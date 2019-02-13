/**
 * @author Jinzulen
 * @license Apache 2.0
 * 
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

const HTTPS = require("https");

exports.callAPI = function (Path, Callback)
{
      try
      {
            HTTPS.get(Path, (Result) => {
                  let Error;
                  let rawData = "";

                  const Code = Result.statusCode;
                  const Type = Result.headers["content-type"];

                  if (Code !== 200)
                  {
                        Error = `# [TenorJS] Could not send request @ ${Path} - Status Code: ${Code}`;
                        Error.code = "ERR_REQ_SEND";
                  } else if (Type.indexOf("application/json") === -1) {
                        Error = `# [TenorJS] Content received isn't JSON. Type: ${Type}`;
                        Error.code = "ERR_RES_NOT";
                  }

                  if (Error)
                  {
                        Result.resume();
                        Callback(Error);
                        return;
                  };

                  Result.setEncoding("utf8");

                  Result.on("data", function (Buffer) {
                        rawData += Buffer;
                  });

                  Result.on("end", () => {
                        let Data = null,
                            Error = null;

                        try
                        {
                              Data = JSON.parse(JSON.stringify(rawData));


                        } catch (unusedError) {
                              Error = "# [TenorJS] Failed to parse retrieved JSON.";
                              Error.code = "ERR_JSON_PARSE";
                        };

                        Callback(Error, Data);
                  });
            });
      } catch (E) { throw E; };
};

/**
 * Since there is no way to account for how this library will be
 * used, and as such, there is no way to account for the future 
 * users of this library, dealing with the Anon ID falls to any
 * developer making use of TenorJS.
 * 
 * If you wish for Tenor's algorithms to automatically adjust to your
 * users' taste, you have to issue each of them their respective
 * anon ID and append it to each request made of Tenor's API.
 * 
 * I leave this method here for that purpose.
 */
exports.generateAnon = function (Endpoint)
{
      return this.callAPI(Endpoint, (Error, Result) => {
            if(Error) console.error(Error);

            JSON.parse(Result).anon_id;
      });
};