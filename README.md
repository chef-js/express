# chef-express

<img style="max-width: 100%; float: right;" src="https://raw.githubusercontent.com/chef-js/core/main/chef.svg" alt="kisscc0" width="200" height="200" />

[<img src="https://img.shields.io/npm/v/chef-express?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/chef-express?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/chef-js/express/main?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/chef-js/express)

**static files server** designed for **node** written in **typescript**, with **tests**

- `express` for routing

## Using CLI

```bash
$ npx chef-express folder
```

## Using as a library

```ts
const { cook } = require("chef-express");
const { folder: "folder" }

cook(config).then((server: Express.Application) => {
  // server api is get, post, any
  server.any("/*", (req: Express.Request, res: Express.Response) => {
    res.end("200 OK");
  });
});
```

- minimal configuration is zero configuration, all values have defaults
- if `folder` param is omitted default `index.html` is read from `folder = '.'`
- serves from http://localhost:3000 unless `port` specified

## License

MIT
