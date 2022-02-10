"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
async function createWrappedServer() {
  const app = createServer();
  const server = http_1.default.createServer(app);
  // WSGet compatible, this = method: string
  function createReader(path, wsGet) {
    const action = app[this.toLowerCase()];
    if (action) {
      action.call(app, path, (req, res, next) => wsGet(res, req, next));
    }
  }
  return {
    async listen(port) {
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
exports.default = createWrappedServer;
function createServer() {
  return (0, express_1.default)();
}
