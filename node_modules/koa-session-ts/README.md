koa-session-ts
=================

[![Build Status](https://travis-ci.org/HKUST-VISLab/koa-session-ts.svg?branch=master)](https://travis-ci.org/HKUST-VISLab/koa-session-ts)
[![npm version](https://badge.fury.io/js/koa-session-ts.svg)](https://badge.fury.io/js/koa-session-ts)
[![codecov](https://codecov.io/gh/HKUST-VISLab/koa-session-ts/branch/master/graph/badge.svg)](https://codecov.io/gh/HKUST-VISLab/koa-session-ts)
[![David](https://david-dm.org/HKUST-VISLab/koa-session-ts/status.svg)](https://github.com/HKUST-VISLab/koa-session-ts)
[![Greenkeeper badge](https://badges.greenkeeper.io/HKUST-VISLab/koa-session-ts.svg)](https://greenkeeper.io/)


Generic session middleware for koa, easy use with custom stores such as redis or mongo, supports defer session getter.

This middleware will only set a cookie when a session is manually set. Each time the session is modified (and only when the session is modified), it will reset the cookie and session.

You can use the rolling sessions that will reset the cookie and session for every request which touch the session. Save behavior can be overridden per request.

## Install

`npm install koa-session-ts --save`

## Usage

```ts

import * as Koa from "koa";
import session from "koa-session-ts";

const app = new Koa();
app.use(session());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  console.log(ctx.session);
  console.log(ctx.sessionId);
  console.log(ctx.sessionSave);
  console.log(ctx.sessionStore);
  ctx.regenerateSession();
});
```

## Options

- `key` cookie name, defaulting to `koa.sid`
- `store` session store instance, default is a MemoryStore
- `reconnectTimeout` store reconnectTimeout in `ms`, default is oneday
- `cookieOptions` session cookie settings, default is 
  ```js
  {
      httpOnly: true,
      maxAge: 86400000, // one day in ms
      overwrite: true,
      path: '/',
      secure: false,
      signed: false,
  }
  ```
- `defer` defer get session, you should `await this.session` to get the session if defer is true, default is false
- `rolling`  rolling session, always reset the cookie and sessions, default is false
- `allowEmpty` allow session empty, default is false
- `genSid` you can use your own generator for sid
- `errorHanlder` handler for session store get or set error
- `valid` valid(ctx, session), valid session value before use it
- `beforeSave` beforeSave(ctx, session), hook before save session

## Session Store
You can use any other store to replace the default MemoryStore, it just needs to inherient the `BaseStore` and implement the following APIs:

- `get(sid: string)`: get session object by sid
- `set(sid: string, sess: Session, ttl?: number)`: set session object for sid, with a ttl (in ms)
- `destroy(sid: string)`: destroy session for sid

the api needs to return a Promise, Thunk or generator.
And use these events to report the store's status.

- `DISCONNECT`
- `CONNECT`

## Licences

[MIT](LICENSE)
