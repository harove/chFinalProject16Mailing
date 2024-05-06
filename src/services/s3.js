import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const s3Client = new S3Client({
    region: "sa-east-1"
});

export async function uploadFile() {
  try {
    const command = new PutObjectCommand({
      Bucket: "esundetalle2",
      Key: "file.txt",
      Body: "Hello from v3!",
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
const bucketName = parsedUri.hostname;
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

const getImageUrl = async (bucketName, objectKey) => {
    try {
      // Generate a pre-signed URL with appropriate expiration time
      const params = {
        Bucket: bucketName,
        Key: objectKey,
        Expires: 3600 // Expires in 1 hour (adjust as needed)
      };
      const preSignedUrl = await s3Client.getSignedUrl('getObject', params);
  
      return preSignedUrl;
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      throw error; // Re-throw for handling in the calling code
    }
  };