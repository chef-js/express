# chef-express `(ノಠ益ಠ)ノ`

<a href="https://badge.fury.io/js/%40jacekpietal%2Fbouncer.js"><img src="https://badge.fury.io/js/%40jacekpietal%2Fbouncer.js.svg" alt="npm package version" /></a>
<a href="https://img.shields.io/npm/dt/@jacekpietal/bouncer.js"><img src="https://img.shields.io/npm/dt/@jacekpietal/bouncer.js" alt="downloads total" /></a>
<a href="https://circleci.com/gh/Prozi/bouncer.js"><img src="https://circleci.com/gh/Prozi/bouncer.js.svg?style=shield" alt="tests status" /></a>

**web-sockets** micro-service manager and **static files server** at the same port,

designed for **node** written in **typescript**, with **tests**

- `express` for serving files

## Running

```bash
$ [PORT=4200] yarn chef-express folder [--debug]
```

```ts
const startServer = require("chef-express");

startServer({
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // port on which the server listens
  port: Number(process.env.PORT || 4200),
  // folder to static server files
  folder: process.argv[2],
}).then((server) => {
  // server api is get, post, any
  server.any("/*", (res, req) => {
    res.end("200 OK");
  });
});
```

- `PORT=4200` - choose server port
- `folder` - folder you want to server static files from
- `--debug` - show logs

## Install

```bash
$ yarn add chef-express
```

## License

MIT
