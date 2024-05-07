import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecret,
  },
});



// const command = new GetObjectCommand(getObjectParams);
// const url = await getSignedUrl(client, command, { expiresIn: 3600 });






/**
 * Uploads a file to an Amazon S3 bucket.
 * 
 * @param {string} fileName The name of the file to be uploaded to S3.
 * @param {string|Buffer|ReadableStream} body The contents of the file to be uploaded. 
 * This can be a string, Buffer, or ReadableStream.
 * @param {string} contentType The content type of the file being uploaded.
 * This is important for S3 to correctly identify the file type.
 * 
 * @returns {Promise<void>} This function is asynchronous and does not return a value,
 * but resolves a promise upon successful upload.
 */
export async function uploadFile(fileName,body, contentType ) {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: body,
      ContentType: contentType
    });
    await s3Client.send(command);
    console.log("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}







// Define the S3 URI of the image
const imageUri = "s3://esundetalle2/pixabay1.jpg";

// Extract the bucket name and object key from the URI
const parsedUri = new URL(imageUri);
// const bucketName = parsedUri.hostname;
const objectKey = parsedUri.pathname.slice(1); // Remove leading slash

// Get the object from S3
// s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: objectKey }))
//   .then(data => {
//     console.log("Successfully retrieved object:", data);
//     // You can access the object data here (e.g., buffer, stream)
//   })
//   .catch(error => {
//     console.error("Error retrieving object:", error);
//   });

const getImageUrl = async (bucketName, fileName) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 3600,
    };
    const preSignedUrl = await s3Client.getSignedUrl("getObject", params);
    return preSignedUrl;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error; // Re-throw for handling in the calling code
  }
};
