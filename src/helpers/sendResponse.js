export function sendResponse(statusCode, responseBody) {
  return {
    statusCode,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(responseBody),
  };
}
