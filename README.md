# TenorJS
![https://api.travis-ci.org/Jinzulen/TenorJS.svg?branch=master](https://api.travis-ci.org/Jinzulen/TenorJS.svg?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Jinzulen/TenorJS/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Jinzulen/TenorJS?targetFile=package.json) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Jinzulen/TenorJS/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Jinzulen/TenorJS/?branch=master)

[//]: # (Must not forget to change the branch when v1.0.6 goes live on master)
[![CodeFactor](https://www.codefactor.io/repository/github/jinzulen/tenorjs/badge/development)](https://www.codefactor.io/repository/github/jinzulen/tenorjs/overview/development) ![NPM Weekly Downloads](https://img.shields.io/npm/dw/tenorjs.svg) ![Status of dependencies](https://img.shields.io/david/jinzulen/tenorjs.svg)

[![https://nodei.co/npm/tenorjs.png](https://nodei.co/npm/tenorjs.png)](https://www.npmjs.com/package/tenorjs)

TenorJS is a basic NodeJS wrapper around the [Tenor](https://tenor.com/) API.

This is an unofficial third-party product that isn't in any way affiliated or sponsored by Tenor.

**UPDATE:** v1.0.6 is now out! See what's new via [this changelog](https://github.com/Jinzulen/TenorJS/tree/master/changelogs/1.0.6.md)!

### 1. Installation
TenorJS can be easily installed via NPM: `npm i tenorjs` **--** Alternatively, you can download the ZIP from [here](https://github.com/Jinzulen/TenorJS/archive/master.zip) and require it in your project.

### 2. Usage & Guides
First thing's first, I want to get something out of the way, attribution. To comply with Tenor's own policies, any content pulled from Tenor and published via this library has to be labeled in any one of these ways:
1. **Powered By Tenor** - to be used in the GIF browsing experience
2. **Search Tenor** - to be used as the placeholder text in the search bar
3. **Via Tenor** - to be used in the footer of a shared GIF

Attribution logos are provided by Tenor can be found in this [Dropbox folder](https://www.dropbox.com/sh/q6hokjtmfcswrk3/AACHPiVKPUjym2zC3ldyipM9a?dl=0). - Tenor's API terms can also be found [here](https://tenor.com/gifapi/documentation#apiterms).

Alright, now that that's out of the way, let's take a look at some code.

- **Call TenorJS**
1. First thing we need to do is call TenorJS and initialize it by passing it the necessary configuration parameters, which in this case is, the Tenor developer API key and the necessary filters and locale configuration. You can get the developer API key by signing up for a **free** developer account [here](https://tenor.com/developer/keyregistration).

2. Tenor offers a content filter in its API as well, the content filter takes one of these four values: **off**, **low**, **medium**, **high**. - You can manually configure its level when initializing the library, as demonstrated below.

3. Tenor offers developers the option to set a custom locale for localization purposes, the locale can be configured when initializing the library (as demonstrated below). -- The full list of supported languages by Tenor's API can be found [here](https://tenor.com/gifapi/documentation#localization).

4. Tenor also offers developers a way to minimize the number of media types/formats returned with each API response via their media content filter. You can configure the library to use either the `basic` (nanomp4, tinygif, tinymp4, gif, mp4, and nanogif) or `minimal` (tinygif, gif, and mp4) media content filters when initializing the client. Keep in mind that if you don't configure it, the library is set to use the minimal filter by default.
```js
const Tenor = require("tenorjs").client({
    "Key": "YOUR DEVELOPER KEY HERE",
    "Filter": "off", // not case sensitive
    "Locale": "en_US", // case-sensitivity depends on input,
    "MediaFilter": "minimal" // not case sensitive
});
```

#### 2.1 Trending:
- **Fetching trending GIFs:**
```js
// Tenor.Search.trending("LIMIT HERE")
Tenor.Search.trending("1").then(GIF => {
      (GIF.results).forEach(Post => {
            // @moment.js
            // Will perhaps have it handle this
            // natively in the future.
            let Date = Moment.unix(Post.created).format("D/MM/YYYY - h:mm:ss A");

            console.log(`Item #${Post.id} (Created: ${Date}) @ ${Post.url}.`);
      });
}).catch(console.error);
// Item #11672604 (Created: 19/04/2018 - 7:28:09 PM) @ https://tenor.com/W8JY.gif.
```

- **Fetching a list of trending search terms:**
```js
Tenor.Search.trending_terms().then(Terms => {
      // Will return an array but for the sake
      // of the example, I joined the results
      // with a comma.
      console.log(Terms.results.join(", "));
}).catch(console.error);
// snowmageddon, sweet dreams, happy valentines day, bedtime, love my wife, yes, happy birthday mr president, cant sleep, valentines day, love you, valentine, insomnia, apex, excited, be my valentine, bed time, zion, love, utah jazz, go to sleep
```

#### 2.2.a Search:
- **Fetching GIF(s) using specific ID(s):**
> Notice #1: This function takes up to 50 IDs max.

> Notice #2: The IDs object always has to be an array. So `GIFs(["ID"])` not `GIFs("ID")`.
```js
Tenor.Search.GIFs(["9411482", "5152678", "12175525"]).then(GIF => {
	GIF.forEach(Post => {
            console.log(`Item #${Post.id} @ ${Post.url}`);
      });
}).catch(console.error);
// Item #9411482 @ https://tenor.com/NEwg.gif
// Item #5152678 @ https://tenor.com/vMBS.gif
// Item #12175525 @ https://tenor.com/ZfzB.gif
```

- **Fetching a GIF using a specific keyword:**
> The JSON output won't always contain a title for the provided media, so in this example I included a quick little check to determine whether `title` is null and when it is, pushed "Untitled" in its stead. In the future, I'll perhaps include native checks for this.
```js
// Tenor.search.query("SEARCH TERM HERE", "LIMIT HERE")
Tenor.Search.query("dog", "3", "low").then(GIF => {
      (GIF.results).forEach(Post => {
            // Check for whether media title is null or not
            let Title = Post.title ? Post.title : "Untitled";
            
            // @moment.js
            let Date = Moment.unix(Post.created).format("D/MM/YYYY - h:mm:ss A");

            console.log(`Item [${Title}] #${Post.id} (Created: ${Date}) @ ${Post.url}.`);
      });
}).catch(console.error);
//Item [Untitled] #10222299 (Created: 10/11/2017 - 2:18:36 PM) @ https://tenor.com/Q3rX.gif.
//Item [Dog Cleaning] #3990366 (Created: 31/03/2015 - 9:50:00 PM) @ https://tenor.com/qUeU.gif.
//Item [Untitled] #9118700 (Created: 4/07/2017 - 1:21:04 AM) @ https://tenor.com/MqlY.gif.
```

- **Fetching a list of the available categories or "tags":**
```js
Tenor.Search.categories().then(Categories => {
      (Categories.tags).forEach(Category => {
            console.log(`- Category Name: ${Category.name}\n- Category Image: ${Category.image}\n- Category Data Path: ${Category.path}\n--------`);
      });
}).catch(console.error);
//- Category Name: #aww
//- Category Image: https://media.tenor.com/images/b1b054cad63fafca251ebf1352384310/tenor.gif
//- Category Data Path: https://api.tenor.com/v1/search?tag=aww&locale=en_US&safesearch=moderate&key=[KEY]
//--------
//- Category Name: #scared
//- Category Image: https://media.tenor.com/images/523e4f441ceee01e772ddff13d835875/tenor.gif
//- Category Data Path: https://api.tenor.com/v1/search?tag=scared&locale=en_US&safesearch=moderate&key=[KEY]
//[...]
```

- **Fetching GIFs from a specific category or "tag":**
> Please note that for some reason the media filter does not apply here.

> For a list of available categories/tags, refer yourself to the previous method: `Tenor.Search.categories()`.
```js
// Tenor.search.query("CATEGORY OR TAG HERE", "LIMIT HERE")
Tenor.Search.category("scared", "3").then(GIF => {
      (GIF.results).forEach(Post => {
            let Title = Post.title ? Post.title : "Untitled";
            let Date = Moment.unix(Post.created).format("D/MM/YYYY - h:mm:ss A");

            console.log(`Item [${Title}] #${Post.id} (Created: ${Date}) @ ${Post.url}.`);
      });
}).catch(console.error);
// Item [Untitled] #10946409 (Created: 31/01/2018 - 1:22:47 PM) @ https://tenor.com/T5O9.gif.
// Item [Untitled] #4735349 (Created: 25/11/2015 - 2:55:33 PM) @ https://tenor.com/t12L.gif.
// Item [Scared Spongebob] #7675159 (Created: 31/01/2017 - 3:21:18 PM) @ https://tenor.com/GmO3.gif.
```

#### 2.2.b Autocomplete & Search Suggestions
- **Autocompleting the user's input:**
```js
// Tenor.Suggest.autocomplete("SEARCH TERM")
Tenor.Suggest.autocomplete("anim").then(Result => {
      console.log(Result);
}).catch(console.error);
// { results: [ 'animals', 'anime' ] }
```

- **Search suggestions:**
```js
// Tenor.Suggest.suggestions("SEARCH TERM", "LIMIT HERE")
Tenor.Suggest.suggestions("anime", "3").then(Result => {
      console.log(Result);
}).catch(console.error);
// { results: [ 'anime kiss', 'anime love', 'anime hug' ] }
```

#### 2.3 Random GIF:
- **Fetching random GIFs:**
```js
Tenor.Search.random("anime", "3").then(GIF => {
      (GIF.results).forEach(Post => {
            let Title = Post.title ? Post.title : "Untitled";
            let Date = Moment.unix(Post.created).format("D/MM/YYYY - h:mm:ss A");

            console.log(`Item [${Title}] #${Post.id} (Created: ${Date}) @ ${Post.url}.`);
      });
}).catch(console.error);
// Item [Untitled] #12825250 (Created: 5/11/2018 - 7:09:32 AM) @ https://tenor.com/1YA2.gif.
// Item [Untitled] #12825210 (Created: 5/11/2018 - 7:01:52 AM) @ https://tenor.com/1YAo.gif.
// Item [アニメ] #4355500 (Created: 7/07/2015 - 9:59:53 PM) @ https://tenor.com/srea.gif.
```

### 3. Useful Links
- [Tenor](https://tenor.com/)
- [Tenor API Documentation](https://tenor.com/gifapi/documentation)
- [TenorJS NPM](https://www.npmjs.com/package/tenorjs)

### 4. Contributors
- Jin (Holler at me on Discord @ Jin#8303). [@NPM](https://www.npmjs.com/~jinzulen)

### 5. Dependencies
- [roi](https://www.npmjs.com/package/roi)
- [moment](https://www.npmjs.com/package/moment) - Recommended for formatting unix timestamps.
- [colors](https://www.npmjs.com/package/colors)

### 6. Developer's Notes
- This library is the product of sheer boredom and curiosity, it is released as-is without any guarantees of any kind on my part. I am not responsible for what anyone does with it.

### 7. TO-DO List
1. Caching.
2. Proper error handling.
3. Native date formatting.