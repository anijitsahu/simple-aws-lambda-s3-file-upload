export function sendResponse(statusCode, responseBody) {
  return {
    statusCode,
    body: JSON.stringify(responseBody),
  };
}
