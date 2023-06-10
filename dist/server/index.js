"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = exports.createServer = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const config_1 = require("chef-core/config");
const chef_core_1 = require("chef-core");
async function createServer(config) {
  const app = (0, express_1.default)();
  const server = createExpressServer(config, app);
  app.start = function (port) {
    return new Promise((resolve) => {
      // ensure port is number
      server.listen(+port, () => resolve(app));
    });
  };
  return app;
}
exports.createServer = createServer;
function createExpressServer(config, app) {
  // spread ssl from config
  const { ssl } = config;
  // if config key and cert present
  if (ssl?.key && ssl?.cert) {
    const { key, cert } = ssl;
    // start ssl app and finish
    return https_1.default.createServer(
      { key: (0, fs_1.readFileSync)(key), cert: (0, fs_1.readFileSync)(cert) },
      app
    );
  }
  // else start normal app
  return http_1.default.createServer(app);
}
function requestHandler(fileReaderCache) {
  return (req, res) => {
    const url = (0, chef_core_1.getUrl)(req.originalUrl);
    const { status, mime, body } = fileReaderCache.get(url);
    if (config_1.debug) {
      console.info(status, mime, url);
    }
    // header sets content type
    res.header("Content-Type", mime);
    // write header sets status
    res.writeHead(status);
    res.end(body);
  };
}
exports.requestHandler = requestHandler;
