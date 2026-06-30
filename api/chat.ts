import type { IncomingMessage, ServerResponse } from "node:http";
import { handleNodeChatRequest } from "../server/chatHandler.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleNodeChatRequest(req, res);
}
