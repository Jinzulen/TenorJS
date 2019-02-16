/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
	const Methods = {};

	Methods.Find = function (Tag, Limit, Callback)
	{
		return require("./Methods/Categories/Find")(Credentials,
			Utilities, Tag, Limit, Callback);
	};

	Methods.List = function (Type, Callback)
	{
		return require("./Methods/Categories/Tags")(Credentials,
			Utilities, Type, Callback);
	};

	return Methods;
};