uid-ts
=================

[![Build Status](https://travis-ci.org/HKUST-VISLab/uid-ts.svg?branch=master)](https://travis-ci.org/HKUST-VISLab/uid-ts)
[![npm version](https://badge.fury.io/js/uid-ts.svg)](https://badge.fury.io/js/uid-ts)
[![codecov](https://codecov.io/gh/HKUST-VISLab/uid-ts/branch/master/graph/badge.svg)](https://codecov.io/gh/HKUST-VISLab/uid-ts)
[![David](https://david-dm.org/HKUST-VISLab/uid-ts/status.svg)](https://github.com/HKUST-VISLab/uid-ts)
[![Greenkeeper badge](https://badges.greenkeeper.io/HKUST-VISLab/uid-ts.svg)](https://greenkeeper.io/)

URL and cookie safe UIDs written in Typescript

Create cryptographically secure UIDs safe for both cookie and URL usage.
This is in contrast to modules such as [rand-token](https://www.npmjs.com/package/rand-token)
and [uid2](https://www.npmjs.com/package/uid2) whose UIDs are actually skewed
due to the use of `%` and unnecessarily truncate the UID.
Use this if you could still use UIDs with `-` and `_` in them.

## Installation

```sh
$ npm install uid-ts
```

## API

```js
import { uid, uidSync } from 'uid-ts';
```
### uid(byteLength)

Asynchronously create a UID with a specific byte length and return a
`Promise`. You can also `await` the function.

```js
const id = await uid(18);
  // do something with the string
```

### uidSync(byteLength)

A synchronous version of above.

```js
var string = uid.sync(18)
```

## License

[MIT](LICENSE)