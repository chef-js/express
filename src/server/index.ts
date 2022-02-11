import http from "http";
import express from "express";
import Cache from "chef-core/dist/cache";
import { WSConfig, WSGet, WSServer } from "chef-core/dist/types";
import getUrl from "chef-core/dist/server/get-url";
import config from "chef-core/dist/config";

export async function createServer(_config: WSConfig): Promise<WSServer> {
  const app: any = express();
  const server = http.createServer(app);

  // WSGet compatible, this = method: string
  function expressReader(path: string, wsGet: WSGet): void {
    const action = app[this.toLowerCase()];

    if (action) {
      action.call(
        app,
        path,
        (req: Express.Request, res: Express.Response, next: any) =>
          wsGet(res, req, next)
      );
    }
  }

  return {
    async listen(port: number): Promise<any> {
      return new Promise((resolve) => {
        // ensure port is number
        server.listen(+port, () => resolve(server));
      });
    },
    get: expressReader.bind("GET"),
    post: expressReader.bind("POST"),
    any: expressReader.bind("ANY"),
  };
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
