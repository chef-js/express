# chef-express

<img style="max-width: 100%; float: right;" src="https://raw.githubusercontent.com/chef-js/core/main/chef.svg" alt="kisscc0" width="200" height="200" />

<a href="https://badge.fury.io/js/chef-express"><img src="https://badge.fury.io/js/chef-express.svg" alt="npm package version" /></a> <a href="https://circleci.com/gh/chef-js/express"><img src="https://circleci.com/gh/chef-js/express.svg?style=shield" alt="tests status" /></a>

**static files server** designed for **node** written in **typescript**, with **tests**

- `express` for routing

## Command-Line Running

```bash
$ npx chef-express folder [--debug] [--ssl] [--port 443] [--maxCacheSize 0]
```

## Installation

```bash
$ yarn add chef-express
```

Minimal configuration is specifying folder, then it serves it from http://localhost:4200

```ts
const startServer = require("chef-express");
const config = { folder: "docs" };

startServer(config).then((server: Express.Application) => {
  // server router api is get, post, any
  server.any("/*", (req: Express.Request, res: Express.Response) => {
    res.end("200 OK");
  });
});
```

## License

MIT
