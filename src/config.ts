import os from 'node:os';

export const isDev = process.env.NODE_ENV !== 'production';

export const tempPath = isDev ? `${process.cwd()}/temp` : os.tmpdir();
export const icecastStreamUrl = process.env.ICECAST_URL as string;
export const audioPublicDomain = process.env.AUDIO_PUBLIC_DOMAIN as string;

export const port = Number.parseInt(process.env.PORT || '3001');

export const s3Bucket = process.env.AWS_BUCKET as string;
export const s3Endpoint = `https://s3.${process.env.AWS_REGION}.backblazeb2.com`;
export const s3AccessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
export const s3SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

export const redisUrl = process.env.REDIS_URL as string;
