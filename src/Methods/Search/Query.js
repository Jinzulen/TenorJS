/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Key, Limit, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/search?key=${Credentials.Key}&q=${Key}&limit=${Limit}&locale=${Credentials.Locale}&media_filter=${Credentials.MediaFilter}&contentfilter=${Credentials.Filter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};