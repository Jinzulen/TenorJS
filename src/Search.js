/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
	const Methods = {};

	Methods.Find = function (IDs, Callback)
	{
		return require("./Methods/Search/Find")(Credentials,
			Utilities, IDs, Callback);
	};

	Methods.Query = function (Term, Limit, Callback)
	{
		return require("./Methods/Search/Query")(Credentials,
			Utilities, Term, Limit, Callback);
	};

	Methods.Random = function (Key, Limit, Callback)
	{
		return require("./Methods/Search/Random")(Credentials,
			Utilities, Key, Limit, Callback);
	};

	return Methods;
};