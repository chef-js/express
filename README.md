# chef-express

<img style="max-width: 100%;" src="https://raw.githubusercontent.com/chef-js/express/main/chef.png" width="150" />

<a href="https://badge.fury.io/js/chef-express"><img src="https://badge.fury.io/js/chef-express.svg" alt="npm package version" /></a> <a href="https://circleci.com/gh/chef-js/express"><img src="https://circleci.com/gh/chef-js/express.svg?style=shield" alt="tests status" /></a>

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
