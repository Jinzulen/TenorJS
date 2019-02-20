/**
 * @author Jinzulen
 * @license Apache 2.0
 * TenorJS - Lightweight NodeJS wrapper around the Tenor.com API.
 */

module.exports = function (Credentials, Utilities, IDs, Callback)
{
	return new Promise((Resolve, Reject) => {
		if (!Array.isArray(IDs)) throw new Error("IDs set has to be an array.");

		iSet = IDs;
		if (IDs.length > 1) iSet = IDs.join(",");
		if (IDs.length > 50) throw new Error("The set of IDs can not include more than 50 individual ID.");

		let Gateway = `${Credentials.Gate}/gifs?key=${Credentials.Key}&ids=${iSet}&limit=${IDs.length}&media_filter=${Credentials.MediaFilter}`;

		Utilities.manageAPI(Gateway, Callback, Resolve, Reject);
	});
};