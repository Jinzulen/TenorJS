/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Limit, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/trending?key=${Credentials.Key}&limit=${Limit}&contentfilter=${Credentials.Filter}&locale=${Credentials.Locale}&media_filter=${Credentials.MediaFilter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};