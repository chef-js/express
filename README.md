# chef-express

<a href="https://badge.fury.io/js/chef-express"><img src="https://badge.fury.io/js/chef-express.svg" alt="npm package version" /></a>
<a href="https://img.shields.io/npm/dt/chef-express"><img src="https://img.shields.io/npm/dt/chef-express" alt="downloads total" /></a>
<a href="https://circleci.com/gh/Prozi/chef-express"><img src="https://circleci.com/gh/Prozi/chef-express?style=shield" alt="tests status" /></a>

<img src="https://raw.githubusercontent.com/Prozi/chef-express/main/chef.png" width="100%" />

**static files server** designed for **node** written in **typescript**, with **tests**

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
