import fs from 'node:fs';
import {
	DeleteObjectCommand,
	GetObjectCommand,
	type GetObjectCommandInput,
	HeadObjectCommand,
	ListObjectsV2Command,
	type PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import mime from 'mime-types';
import { s3Bucket } from '../config';
import s3Client from '../s3';

const Bucket = s3Bucket;

/*
async function existsFile(Key) {
  try {
    const input = {
      Bucket,
      Key
    };

    const objectMeta = await client.send(new HeadObjectCommand(input));

    return !!objectMeta;
  } catch(err) {
    if (err.name === 'NotFound')
      return Promise.resolve(false);
  }
}

function getFile(Key) {
  const input = {
    Bucket,
    Key
  };

  return client.send(new GetObjectCommand(input));
}
*/

export async function getFile(Key: string, options?: GetObjectCommandInput) {
	const input: GetObjectCommandInput = {
		...options,
		Bucket,
		Key,
	};

	return s3Client.send(new GetObjectCommand(input));
}

export async function uploadFile(
	Key: string,
	Body: string | Buffer,
	options = {},
) {
	const params: PutObjectCommandInput = {
		...options,
		Key,
		Bucket,
	};

	if (typeof Body === 'string') {
		if (!params.ContentType) {
			params.ContentType = mime.lookup(Body) as string;
		}

		params.Body = fs.createReadStream(Body);
	} else {
		params.Body = Body;
	}

	const upload = new Upload({
		client: s3Client,
		params,
	});

	// upload.on("httpUploadProgress", (progress: ProgressEvent) => {
	//  console.log(progress);
	// });

	return upload.done();
}

export async function deleteFile(path: string) {
	const input = {
		Bucket,
		Key: path,
	};

	const objectMeta = await s3Client.send(new HeadObjectCommand(input));

	if (!objectMeta) {
		return null;
	}

	return s3Client.send(new DeleteObjectCommand(input));
}

export async function deleteDirectory(dir: string) {
	const listParams = {
		Bucket,
		Prefix: `${dir}/`,
	};

	const objects = await s3Client.send(new ListObjectsV2Command(listParams));

	if (objects.Contents?.length === 0) return;

	const promises = objects.Contents?.map((e) => {
		return s3Client.send(
			new DeleteObjectCommand({
				Key: e.Key,
				Bucket,
			}),
		);
	});

	if (!promises) return;

	return Promise.all(promises);
}
