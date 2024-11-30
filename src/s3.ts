import { S3Client, type S3ClientConfig } from '@aws-sdk/client-s3';
import { s3AccessKeyId, s3Endpoint, s3SecretAccessKey } from './config';

const S3Config: S3ClientConfig = {
	endpoint: s3Endpoint,
	credentials: {
		accessKeyId: s3AccessKeyId,
		secretAccessKey: s3SecretAccessKey,
	},
};

export const s3Client = new S3Client(S3Config);

export default s3Client;
