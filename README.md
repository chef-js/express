# chef-express

<img style="max-width: 100%;" src="https://raw.githubusercontent.com/chef-js/express/main/chef.png" width="150" />

<a href="https://badge.fury.io/js/chef-express"><img src="https://badge.fury.io/js/chef-express.svg" alt="npm package version" /></a> <a href="https://circleci.com/gh/chef-js/express"><img src="https://circleci.com/gh/chef-js/express.svg?style=shield" alt="tests status" /></a>

**static files server** designed for **node** written in **typescript**, with **tests**

- `express` for serving files

## Running

```bash
$ [PORT=4200] [yarn|npx] chef-express folder [--debug] [--ssl] [--key example.key] [--cert example.crt]
```

```ts
const startServer = require("chef-express");

startServer({
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // port on which the server listens
  port: Number(process.env.PORT || 4200),
  // folder to static serve files
  folder: process.argv[2],
  // ssl = undefined | { key, cert }
  ssl: process.argv.includes("--ssl") ? ssl : undefined,
}).then((server: Express.Application) => {
  // server router api is get, post, any
  server.any("/*", (req, res) => {
    res.end("200 OK");
  });
});
```

- `PORT=4200` - choose server port
- `folder` - folder you want to serve static files from
- `--debug` - show logs
- `--ssl` - start as https server, with self signed certificate
- `--key example.key` - path to real certificate key, use with `--ssl`
- `--cert example.crt` - path to real certificate, use with `--ssl`

## Install

```bash
$ yarn add chef-express
```

## License

MIT
