import { Config, FileReaderResponse, Server, getUrl } from "chef-core";
import express, { Request, Response } from "express";
import http, { RequestListener } from "http";

import { Cache } from "@pietal.dev/cache";
import { debug } from "chef-core/config";
import https from "https";
import { readFileSync } from "fs";

export async function createServer(config: Config): Promise<Server> {
  const app: Express.Application = express();
  const server: http.Server | https.Server = createExpressServer(config, app);

  (app as Server).start = function (port: number) {
    return new Promise((resolve) => {
      // ensure port is number
      server.listen(+port, () => resolve(app as Server));
    });
  };

  return app as Server;
}

function createExpressServer(
  config: Config,
  app: Express.Application,
): http.Server | https.Server {
  // spread ssl from config
  const { ssl } = config;

  // if config key and cert present
  if (ssl?.key && ssl?.cert) {
    const { key, cert } = ssl;

    // start ssl app and finish
    return https.createServer(
      { key: readFileSync(key), cert: readFileSync(cert) },
      app as RequestListener,
    );
  }

  // else start normal app
  return http.createServer(app);
}

export function requestHandler(cache: Cache<FileReaderResponse>) {
  return (req: Request, res: Response) => {
    const url = getUrl(req.originalUrl);
    const { status, mime, body } = cache.get(url) || {
      status: 404,
      mime: "text/plain",
      body: "",
    };

    if (debug) {
      console.info(status, mime, url);
    }

    // header sets content type
    res.header("Content-Type", mime);
    // write header sets status
    res.writeHead(status);

    res.end(body);
    return true;
  };
}
