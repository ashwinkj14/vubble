import AWS from 'aws-sdk';

const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIATVI4NKXF5XJWGFHD';
const SECRET_ACCESS_KEY = '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';

export const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});