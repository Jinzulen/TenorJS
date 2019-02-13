/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */
const roi = require("roi");
const HTTPS = require("https");
const Colors = require("colors");

exports.callAPI = function (Path, Callback)
{
      HTTPS.get(Path, (Result) => {
            let Error;
            let rawData = "";

            const Code = Result.statusCode;
            const Type = Result.headers["content-type"];

            if (Code !== 200)
            {
                  Error      = `# [TenorJS] Could not send request @ ${Path} - Status Code: ${Code}`;
                  Error.code = "ERR_REQ_SEND";
            };
            
            if (Type.indexOf("application/json") === -1)
            {
                  Error      = `# [TenorJS] Content received isn't JSON. Type: ${Type}`;
                  Error.code = "ERR_RES_NOT";
            };

            if (Error) { Result.resume(); Callback(Error); };

            Result.setEncoding("utf8");

            Result.on("data", function (Buffer)
            {
                  rawData += Buffer;
            });

            Result.on("end", () => {
                  let Data = null, Error = null;

                  try
                  {
                        Data = JSON.parse(JSON.stringify(rawData)); 
                  } catch (unusedError) {
                        Error = "# [TenorJS] Failed to parse retrieved JSON.";
                        Error.code = "ERR_JSON_PARSE";
                  }; Callback(Error, Data);
            });
      });
};

exports.manageAPI = function (Endpoint, Callback, pResolve, pReject)
{
      this.callAPI(Endpoint, (Error, Result) => {
            if (Error)
            {
                  if (typeof Callback === "function")
                  {
                        Callback(Error);
                  };

                  pReject(Error);
            };

            if (typeof Callback === "function")
            {
                  Callback(null, Result[0]);
            };

            pResolve(JSON.parse(Result));
      });
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

/**
 * Rudimentary version checking.
 */
exports.checkVersion = function ()
{
      const Package = {
            "Git": "https://raw.githubusercontent.com/Jinzulen/TenorJS/master/package.json",
            "Home": require("../package.json")["version"]
      };

      return roi.get(Package["Git"]).then(Response => {
            let Version = JSON.parse(Response.body).version;
            
            if (Package["Home"] < Version)
            {
                  console.error(Colors.bold.red(`You are running an oudated version (v${Package["Home"]}) of TenorJS, v${Version} is available.\n
# NPM: https://www.npmjs.com/package/tenorjs
# GitHub: https://github.com/Jinzulen/TenorJS/`));
            };
      }).catch(console.error);
};