import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

const s3 = new S3Client({ region: "us-east-1" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { fileName, content } = req.body;
  const bucketName = process.env.NEXT_PUBLIC_UPLOAD_BUCKET!;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: content,
        ContentType: "text/plain"
      })
    );
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}
