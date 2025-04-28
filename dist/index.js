"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.cook = cook;
const chef_core_1 = require("chef-core");
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return chef_core_1.config;
  },
});
const server_1 = require("./server");
async function cook(config = {}) {
  return await (0, chef_core_1.cook)(
    { ...config, type: "express" },
    {
      createServer: server_1.createServer,
      requestHandler: server_1.requestHandler,
    },
  );
}
