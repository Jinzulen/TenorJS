/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities)
{
	const Methods = {};

	Methods.Suggestions = function (Term, Callback)
	{
		return require("./Methods/Suggest/Suggestions")(Credentials,
			Utilities, Term, Callback);
	};

	Methods.Autocomplete = function (Key, Callback)
	{
		return require("./Methods/Suggest/Autocomplete")(Credentials,
			Utilities, Key, Callback);
	};

	return Methods;
};