/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Type, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/categories?key=${Credentials.Key}&locale=${Credentials.Locale}&type=${Type}&contentfilter=${Credentials.Filter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};