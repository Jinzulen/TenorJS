/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, Term, Callback)
{
	return new Promise((Resolve, Reject) => {
		let Gateway = `${Credentials.Gate}/search_suggestions?key=${Credentials.Key}&q=${Term}&locale=${Credentials.Locale}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};