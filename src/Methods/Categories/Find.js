/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Tag, Limit, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/search?key=${Credentials.Key}&tag=${Tag}&limit=${Limit}&locale=${Credentials.Locale}&contentfilter=${Credentials.Filter}&media_filter=${Credentials.MediaFilter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};