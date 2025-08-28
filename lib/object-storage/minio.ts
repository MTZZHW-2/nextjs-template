import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: process.env.OBJECT_STORAGE_ENDPOINT!,
  port: parseInt(process.env.OBJECT_STORAGE_PORT!),
  useSSL: process.env.OBJECT_STORAGE_USE_SSL === 'true',
  accessKey: process.env.MINIO_ROOT_USER!,
  secretKey: process.env.MINIO_ROOT_PASSWORD!,
});

export const BUCKET_NAME = process.env.OBJECT_STORAGE_BUCKET_NAME!;

export async function ensureBucketExists() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);

  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME);
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        },
      ],
    };
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
  }
}
