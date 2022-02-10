import http from "http";
import express from "express";
import { WSGet, WSServer } from "../types.js";

export default async function createWrappedServer(): Promise<WSServer> {
  const app: any = createServer();
  const server = http.createServer(app);

  // WSGet compatible, this = method: string
  function createReader(path: string, wsGet: WSGet): void {
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
    get: createReader.bind("GET"),
    post: createReader.bind("POST"),
    any: createReader.bind("ANY"),
  };
}

function createServer(): any {
  return express();
}
