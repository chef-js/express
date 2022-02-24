import http, { RequestListener } from "http";
import https from "https";
import express from "express";
import Cache from "chef-core/dist/cache";
import { WSConfig, WSServer } from "chef-core/dist/types";
import getUrl from "chef-core/dist/server/get-url";
import config from "chef-core/dist/config";
import { readFileSync } from "fs";

export async function createServer(config: WSConfig): Promise<WSServer> {
  const app: Express.Application = express();
  const server: http.Server | https.Server = createExpressServer(config, app);

  (app as WSServer).start = function (port: number) {
    return new Promise((resolve) => {
      // ensure port is number
      server.listen(+port, () => resolve(app as WSServer));
    });
  };

  return app as WSServer;
}

function createExpressServer(
  config: WSConfig,
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

export function requestHandler(fileReaderCache: Cache) {
  return (res: any, req: any) => {
    const url: string = getUrl(req.originalUrl);
    const { status, mime, body } = fileReaderCache.get(url);

    if (config.debug) {
      console.info(status, mime, url);
    }

    // header sets content type
    res.header("Content-Type", mime);
    // write header sets status
    res.writeHeader(status);

    res.end(body);
  };
}
