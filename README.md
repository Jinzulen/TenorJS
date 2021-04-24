<a href="https://tenor.com/" title="Tenor Attribution Logo"><img align="right" src="https://i.imgur.com/NkfdQ0t.png"></a>

# TenorJS
[![CodeFactor](https://www.codefactor.io/repository/github/jinzulen/tenorjs/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/jinzulen/tenorjs) [![Maintainability](https://img.shields.io/codeclimate/maintainability/Jinzulen/TenorJS?style=for-the-badge)](https://codeclimate.com/github/Jinzulen/TenorJS/maintainability) ![NPM Weekly Downloads](https://img.shields.io/npm/dm/tenorjs.svg?style=for-the-badge)

### Attribution
Please visit the [wiki page](https://github.com/Jinzulen/TenorJS/wiki/Attribution) for more information concerning this.
You must ensure that you're in full compliance with Tenor's terms and policies.

### Installation
```
npm i tenorjs@latest
```

You can download the source code directly [here](https://github.com/Jinzulen/TenorJS/archive/refs/heads/master.zip).

### Example
> Further client configuration options are available [here](https://github.com/Jinzulen/TenorJS/wiki/Configuration).
Please check them out if you plan on enforcing a content filter or setting a GIF ratio range, etc.

> Further usage and implementation examples are available [here](https://github.com/Jinzulen/TenorJS/wiki/Examples).

```js
// Load and configure TenorJS.
const { Tenor } = require("tenorjs");
const Client = new Tenor({
    "key": "https://tenor.com/developer/keyregistration"
});

// Grab 3 random GIFs featuring food.
Client.Search.Random("food", "3").then(Results =>
{
    Results.forEach(GIF =>
    {
        console.log(`GIF #${GIF.id} (Created: ${GIF.created}) @ ${GIF.url}`);

        // GIF #7677199 (Created: 31/01/2017 - 20:43:51 PM) @ https://tenor.com/GnlX.gif
        // GIF #9176226 (Created: 9/07/2017 - 18:59:40 PM) @ https://tenor.com/MFjO.gif
        // GIF #8448338 (Created: 30/04/2017 - 20:55:24 PM) @ https://tenor.com/JBXG.gif
    });
}).catch(Error => {
    /**
     * ERROR HANDLING LOGIC HERE
     */
});
```

### Support
If you've encountered an error, it is recommended that you go [here](https://github.com/Jinzulen/TenorJS/issues/new/choose) and follow the instructions on the page to open a new issue and properly report document the problem you're facing.

For all other inquiries, you can reach me via e-mail at either of these addresses:
- me@khalilg.com
- Jinzu@protonmail.ch

### License
This software is released as-is, for free and open-source under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) license.

```
Copyright 2021 Khalil G.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```