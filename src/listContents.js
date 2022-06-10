import { sendResponse } from "./helpers/sendResponse.js";

export async function listContentsHandler(event) {
  const res = { message: "API endpoint reached" };
  return sendResponse(process.env.SUCCESS_CODE, res);
}
