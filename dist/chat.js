"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chat(_ws, { id, event, data }) {
  // broadcast to all sockets inside this topic
  this.to("chat").emit(event, id, data);
}
exports.default = chat;
