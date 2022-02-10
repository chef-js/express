import { Socket } from "socket.io";
import { WebSocket } from "uWebSockets.js";
import { WSEvent } from "./types.js";
export default function chat(
  _ws: WebSocket | Socket,
  { id, event, data }: WSEvent
): void;
//# sourceMappingURL=chat.d.ts.map
