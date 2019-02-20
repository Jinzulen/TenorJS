/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
      const Methods = {};
	
	Methods.GIFs = function (Limit, Callback)
	{
		return require("./Methods/Trending/GIFs")(Credentials,
			Utilities, Limit, Callback);
	};

	Methods.Terms = function (Callback)
	{
		return require("./Methods/Trending/Terms")(Credentials,
			Utilities, Callback);
	};

	return Methods;
};