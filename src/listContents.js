// AWS SDK dependencies
import { ListObjectsCommand } from "@aws-sdk/client-s3";

// local dependencies
import { sendResponse } from "./helpers/sendResponse.js";
import { s3Ops } from "./libs/s3Client.js";

export async function listContentsHandler(event) {
  try {
    const params = { Bucket: process.env.FILE_UPLOAD_BUCKET };
    const { Contents, IsTruncated, Name, Marker } = await s3Ops.send(
      new ListObjectsCommand(params)
    );
    const res = { Contents, IsTruncated, Name, Marker };
    return sendResponse(process.env.SUCCESS_CODE, res);
  } catch (error) {
    const res = { message: "Unable to find Bucket Contents", error };
    return sendResponse(process.env.ERROR_CODE, res);
  }
}
