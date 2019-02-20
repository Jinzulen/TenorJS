/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */
const FS     = require("fs"),
      roi    = require("roi"),
      Path   = require("path"),
      HTTPS  = require("https"),
      Colors = require("colors"),
      Moment = require("moment");

const configFile = Path.join(__dirname, "../../tenor_config.json");

exports.callAPI = function (Path, Callback)
{
      HTTPS.get(Path, (Result) => {
            let Error, rawData = "";

            const Code = Result.statusCode,
                  Type = Result.headers["content-type"];

            if (Code !== 200)
            {
                  Error      = `# [TenorJS] Could not send request @ ${Path} - Status Code: ${Code}`;
                  Error.code = "ERR_REQ_SEND";
            }
            
            if (Type.indexOf("application/json") === -1)
            {
                  Error      = `# [TenorJS] Content received isn't JSON. Type: ${Type}`;
                  Error.code = "ERR_RES_NOT";
            }

            if (Error)
            {
                  Result.resume();
                  Callback(Error);
            }

            Result.setEncoding("utf8");

            Result.on("data", function (Buffer)
            {
                  /**
                   * Path checks.
                   */
                  if (Path.includes("categories"))
                  {
                        dForm = JSON.parse(Buffer).tags;
                  } else {
                        dForm = JSON.parse(Buffer).results;
                  }
                  
                  let Data = dForm;
      
                  for (var i in Data)
                  {
                        if (!Data[i].title) Data[i].title = "Untitled";
      
                        if (!Path.includes("categories"))
                        {
                              Data[i].created_stamp = Data[i].created;
                              Data[i].created = Moment.unix(Data[i].created).format(require(configFile)["DateFormat"]);
                        }
                  }

                  rawData += JSON.stringify(Data);
            });

            Result.on("end", () => {
                  let Data = null, Error = null;

                  try
                  {
                        Data = JSON.parse(JSON.stringify(rawData)); 
                  } catch (unusedError) {
                        Error = "# [TenorJS] Failed to parse retrieved JSON.";
                        Error.code = "ERR_JSON_PARSE";
                  }
                  
                  Callback(Error, Data);
            });
      });
};

exports.manageAPI = function (Endpoint, Callback, pResolve, pReject)
{
      this.callAPI(Endpoint, (Error, Result) => {
            if (Error)
            {
                  if (typeof Callback === "function") Callback(Error);

                  pReject(Error);
            }

            if (typeof Callback === "function") Callback(null, Result[0]);

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

exports.checkConfig = function (Creds)
{
      function writeConfig()
      {
            FS.writeFileSync(configFile, Creds, function (Error) {
                  if (Error) throw Error;
                  console.log(Colors.bold.green(`# [TenorJS] Changes have been made to the configuration file. Please restart.`));
                  process.exit(1);
            });
      }

      try
      {
            if (FS.existsSync(configFile))
            {
                  FS.readFile(configFile, "utf8", function (Error, Data) {
                        if (Error) throw Error;
                        if (Data !== Creds) writeConfig();
                  });
            } else { writeConfig(); }
      } catch (E) {
            throw E;
      }
};

/**
 * Rudimentary version checking.
 */
exports.checkVersion = function ()
{
      const Package = {
            "Git": "https://raw.githubusercontent.com/Jinzulen/TenorJS/master/package.json",
            "Home": require(Path.join(__dirname, "../../package.json"))["version"]
      };

      return roi.get(Package["Git"]).then(Response => {
            let Version = JSON.parse(Response.body).version;
            
            if (Package["Home"] < Version)
            {
                  console.error(Colors.bold.red(`You are running an oudated version (v${Package["Home"]}) of TenorJS, v${Version} is available.\n
# NPM: https://www.npmjs.com/package/tenorjs
# GitHub: https://github.com/Jinzulen/TenorJS/
# Why you should upgrade: https://github.com/Jinzulen/TenorJS/blob/master/changelogs/${Version}.md`));

                  process.exit(1);
            }
      }).catch(console.error);
};