import { Config, FileReaderResponse, Server } from "chef-core";
import { Request, Response } from "express";
import { Cache } from "@pietal.dev/cache";
export declare function createServer(config: Config): Promise<Server>;
export declare function requestHandler(
  cache: Cache<FileReaderResponse>,
): (req: Request, res: Response) => boolean;
//# sourceMappingURL=index.d.ts.map
