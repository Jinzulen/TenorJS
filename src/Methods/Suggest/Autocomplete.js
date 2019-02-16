/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Key, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/autocomplete?key=${Credentials.Key}&q=${Key}&locale=${Credentials.Locale}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};