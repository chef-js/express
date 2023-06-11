import http, { RequestListener } from "http";
import https from "https";
import express, { Request, Response } from "express";
import { Cache } from "latermom";
import { readFileSync } from "fs";
import { debug } from "chef-core/config";
import { Config, Server, FileReaderResponse, getUrl } from "chef-core";

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
  app: Express.Application
): http.Server | https.Server {
  // spread ssl from config
  const { ssl } = config;

  // if config key and cert present
  if (ssl?.key && ssl?.cert) {
    const { key, cert } = ssl;

    // start ssl app and finish
    return https.createServer(
      { key: readFileSync(key), cert: readFileSync(cert) },
      app as RequestListener
    );
  }

  // else start normal app
  return http.createServer(app);
}

export function requestHandler(fileReaderCache: Cache<FileReaderResponse>) {
  return (req: Request, res: Response) => {
    const url: string = getUrl(req.originalUrl);
    const { status, mime, body } = fileReaderCache.get(url);

    if (debug) {
      console.info(status, mime, url);
    }

    // header sets content type
    res.header("Content-Type", mime);
    // write header sets status
    res.writeHead(status);

    res.end(body);
  };
}
