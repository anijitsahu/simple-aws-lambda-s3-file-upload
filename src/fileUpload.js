import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Ops } from "./libs/s3Client.js";
import { checkIfBucketExists } from "./helpers/checkBucketExists.js";
import { createBucket } from "./helpers/createBucket.js";
export async function fileUploadHandler(event) {
  const { fileName, fileContents } = JSON.parse(event.body);
  try {
    const data = await s3Ops.send(new ListBucketsCommand({}));
    let ifBucketExist = await checkIfBucketExists(
      process.env.FILE_UPLOAD_BUCKET
    );
    let bucketCreated = false;

    // if the bucket is not exists create the same
    if (!ifBucketExist) {
      bucketCreated = await createBucket(process.env.FILE_UPLOAD_BUCKET);
    }
    const params = {
      Bucket: process.env.FILE_UPLOAD_BUCKET,
      Key: fileName,
      Body: fileContents,
    };
    const result = await s3Ops.send(new PutObjectCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          buckets: data.Buckets,
          ifBucketExist,
          bucketCreated,
          uploadedFile: {
            fileName,
            bucketName: process.env.FILE_UPLOAD_BUCKET,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        { message: "Unable to access the Bucket", error },
        null,
        2
      ),
    };
  }
}
