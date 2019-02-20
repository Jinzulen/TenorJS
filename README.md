# TenorJS
![https://api.travis-ci.org/Jinzulen/TenorJS.svg?branch=master](https://api.travis-ci.org/Jinzulen/TenorJS.svg?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Jinzulen/TenorJS/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Jinzulen/TenorJS?targetFile=package.json) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Jinzulen/TenorJS/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Jinzulen/TenorJS/?branch=master)

[![CodeFactor](https://www.codefactor.io/repository/github/jinzulen/tenorjs/badge/master)](https://www.codefactor.io/repository/github/jinzulen/tenorjs/overview/development) [![Maintainability](https://api.codeclimate.com/v1/badges/012d72293468a31c127e/maintainability)](https://codeclimate.com/github/Jinzulen/TenorJS/maintainability) ![NPM Weekly Downloads](https://img.shields.io/npm/dw/tenorjs.svg)

[![https://nodei.co/npm/tenorjs.png](https://nodei.co/npm/tenorjs.png)](https://www.npmjs.com/package/tenorjs)

TenorJS is a basic NodeJS wrapper around the [Tenor](https://tenor.com/) API.

This is an unofficial third-party product that isn't in any way affiliated or sponsored by Tenor.

**IMPORTANT UPDATE:** v1.0.7 is now out! See what's new via [this changelog](https://github.com/Jinzulen/TenorJS/tree/master/changelogs/1.0.7.md)!

### 1. Installation
TenorJS can be easily installed via NPM: `npm i tenorjs`.

Alternatively, you can download the ZIP from [here](https://github.com/Jinzulen/TenorJS/archive/master.zip) and require it in your project.

### 2. Usage & Guides
- **Attribution:** First thing's first, I want to get something out of the way, attribution. To comply with Tenor's own policies, any content pulled from Tenor and published via this library has to be labeled in any one of these ways:
1. **Powered By Tenor** - to be used in the GIF browsing experience
2. **Search Tenor** - to be used as the placeholder text in the search bar
3. **Via Tenor** - to be used in the footer of a shared GIF

Attribution logos are provided by Tenor and can be found in this [Dropbox folder](https://www.dropbox.com/sh/q6hokjtmfcswrk3/AACHPiVKPUjym2zC3ldyipM9a?dl=0). - Tenor's API terms can also be found [here](https://tenor.com/gifapi/documentation#apiterms).

Alright, now that that's out of the way, let's take a look at some code.

- **Call TenorJS**

![GIF of an Anime character doing 1337 h4x0r stuff.](https://media1.tenor.com/images/dc934b5ef0b376eb48490fcbb0092099/tenor.gif)

1. First thing we need to do is call TenorJS and initialize it by passing it the necessary configuration parameters, which in this case is, the Tenor developer API key and the necessary filters and locale configuration. You can get the developer API key by signing up for a **free** developer account [here](https://tenor.com/developer/keyregistration).

2. Tenor offers a content filter in its API as well, the content filter takes one of these four values: **off**, **low**, **medium**, **high**. - You can manually configure its level when initializing the library, as demonstrated below.

3. Tenor offers developers the option to set a custom locale for localization purposes, the locale can be configured when initializing the library (as demonstrated below). -- The full list of supported languages by Tenor's API can be found [here](https://tenor.com/gifapi/documentation#localization).

4. Tenor also offers developers a way to minimize the number of media types/formats returned with each API response via their media content filter. You can configure the library to use either the `basic` (nanomp4, tinygif, tinymp4, gif, mp4, and nanogif) or `minimal` (tinygif, gif, and mp4) media content filters when initializing the client. Keep in mind that if you don't configure it, the library is set to use the minimal filter by default.

5. In order to alleviate some pressure off of developers and ensure not to inconvenience them by adding one more task to their schedule, native [date formatting has been implemented into TenorJS as of v1.0.6](https://github.com/Jinzulen/TenorJS/blob/master/changelogs/1.0.6.md)! To aid developers further with matters concerning localization, TenorJS allows them to set custom date formats, however, if they don't; TenorJS will by default use the date format shown in the example below.
```js
const Tenor = require("tenorjs").client({
    "Key": "YOUR DEVELOPER KEY HERE", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
```

#### 2.1 Trending:
- **Fetching trending GIFs:**
```js
// Tenor.Trending.GIFs("LIMIT HERE")
Tenor.Trending.GIFs("2").then(Results => {
      Results.forEach(Post => {
            console.log(`Item #${Post.id} (${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item #11672604 (Created: 19/04/2018 - 7:28:09 PM) @ https://tenor.com/W8JY.gif.
```

- **Fetching a list of trending search terms:**
```js
Tenor.Trending.Terms().then(Results => {
      // Will return an array but for the sake
      // of the example, I joined the results
      // with a comma.
      console.log(Results.join(", "));
}).catch(console.error);
// happy birthday boyfriend, tuesday, karl lagerfeld, lunch, happy birthday girlfriend, yes, waiting for an answer, good afternoon, love ya too, love you, bernie sanders, crushed it, feel the bern, love, bernie, dentist, jonas brothers, excited, full moon, goodday
```

#### 2.2.a Search:
- **Fetching GIF(s) using specific ID(s):**
> Notice #1: This function takes up to 50 IDs max.

> Notice #2: The IDs object always has to be an array. So `Find(["ID"])` not `Find("ID")`.
```js
Tenor.Search.Find(["9411482", "5152678", "12175525"]).then(Results => {
      Results.forEach(Post => {
            console.log(`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item #9411482 (Created: 6/08/2017 - 12:12:42 PM) @ https://tenor.com/NEwg.gif
// Item #5152678 (Created: 4/03/2016 - 4:41:07 AM) @ https://tenor.com/vMBS.gif
// Item #12175525 (Created: 16/07/2018 - 14:47:34 PM) @ https://tenor.com/ZfzB.gif
```

- **Fetching a GIF using a specific keyword:**
> As of v1.0.6, TenorJS automatically checks the JSON response and replaces an empty title object with "Untitled" when necessary.
```js
// Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
Tenor.Search.Query("hug", "3").then(Results => {
      Results.forEach(Post => {
            console.log(`Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item #12535134 (Created: 18/09/2018 - 10:04:49 AM) @ https://tenor.com/0K7K.gif
// Item #10383031 (Created: 28/11/2017 - 22:43:48 PM) @ https://tenor.com/RJgp.gif
// Item #12254044 (Created: 31/07/2018 - 8:24:33 AM) @ https://tenor.com/ZzZ2.gif
```

- **Fetching a list of the available categories or "tags":**
> As of v1.0.6, you can now choose to specify the type of categories you want to list. The three type options are: trending, featured and emoji.
```js
Tenor.Categories.List("trending").then(Results => {
      Results.forEach(Category => {
            console.log(`- Category Name: ${Category.name}\n- Category Image: ${Category.image}\n- Category Data Path: ${Category.path}\n--------`);
      });
}).catch(console.error);
//- Category Name: #happybirthdayboyfriend
//- Category Image: https://media.tenor.com/images/00b123588ce51ba097861bf2fe936064/tenor.gif
//- Category Data Path: https://api.tenor.com/v1/search?tag=happy%20birthday%20boyfriend&locale=en_US&safesearch=moderate&key=[DEVELOPER KEY]
//--------
//- Category Name: #tuesday
//- Category Image: https://media.tenor.com/images/470d285f0497561fa8d28daee557f0fc/tenor.gif
//- Category Data Path: https://api.tenor.com/v1/search?tag=tuesday&locale=en_US&safesearch=moderate&key=[DEVELOPER KEY]
// [...]
```

- **Fetching GIFs from a specific category or "tag":**
> For a list of the available categories/tags, refer yourself to the previous method: `Tenor.Categories.List()`.
```js
// Tenor.Categories.Find("CATEGORY OR TAG HERE", "LIMIT HERE")
Tenor.Categories.Find("excited", "3").then(Results => {
      Results.forEach(Post => {
            console.log(`Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item #7212866 (Created: 11/11/2016 - 7:53:02 AM) @ https://tenor.com/EqyI.gif
// Item #5878976 (Created: 20/08/2016 - 12:00:54 PM) @ https://tenor.com/yPym.gif
// Item #11207973 (Created: 27/02/2018 - 17:56:51 PM) @ https://tenor.com/VbRV.gif
```

#### 2.2.b Autocomplete & Search Suggestions
- **Autocompleting the user's input:**
```js
// Tenor.Suggest.Autocomplete("SEARCH INPUT")
Tenor.Suggest.Autocomplete("hu").then(Results => {
      console.log(Results);
}).catch(console.error);
// [ 'hug', 'hungry', 'hugs', 'hungover', 'huh', 'hungergames' ]
```

- **Search suggestions:**
```js
// Tenor.Suggest.Suggestions("SEARCH INPUT")
Tenor.Suggest.Suggestions("anime").then(Results => {
      console.log(Results.join(", "));
}).catch(console.error);
// anime kiss, anime love, anime hug, anime sad, anime cry, anime blush, naruto, pokemon
```

#### 2.3 Random GIF:
- **Fetching random GIFs:**
```js
Tenor.Search.Random("food", "3").then(Results => {
      Results.forEach(Post => {
            console.log(`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
// Item 7677199 (Created: 31/01/2017 - 20:43:51 PM) @ https://tenor.com/GnlX.gif
// Item 9176226 (Created: 9/07/2017 - 18:59:40 PM) @ https://tenor.com/MFjO.gif
// Item 8448338 (Created: 30/04/2017 - 20:55:24 PM) @ https://tenor.com/JBXG.gif
```

### 3. Useful Links
- [Tenor](https://tenor.com/)
- [Tenor API Documentation](https://tenor.com/gifapi/documentation)
- [TenorJS NPM](https://www.npmjs.com/package/tenorjs)

### 4. Contributors
- Jin (Find me on Discord @ Jin#8303). [@NPM](https://www.npmjs.com/~jinzulen)

### 5. Dependencies
- [roi](https://www.npmjs.com/package/roi)
- [moment](https://www.npmjs.com/package/moment) - Recommended for formatting unix timestamps.
- [colors](https://www.npmjs.com/package/colors)

### 6. Developer's Notes
- This library is the product of sheer boredom and curiosity, it is released as-is without any guarantees of any kind on my part. I am not responsible for what anyone does with it.
- If you've made something cool using TenorJS, then feel free to get in touch and I'll include a type of "Integrations" section in this README to give it a spotlight and highlight it to everyone.

### 7. TO-DO List
1. Caching.