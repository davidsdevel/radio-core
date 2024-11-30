import { NotFoundError } from '../errors';
import { getFile } from '../files/files.repository';
import redis from '../redis';

const cacheTime = 60 * 60 * 24;

export async function getAudioService(path: string) {
	try {
		let body = await redis.getBuffer(path);
		let contentType = await redis.get(`${path}:contentType`);

		if (!body || !contentType) {
			const file = await getFile(path.replace('/', ''));

			const byteArray = await file.Body?.transformToByteArray();
			body = Buffer.from(byteArray as Uint8Array);
			contentType = file.ContentType as string;

			await redis.set(path, body, 'EX', cacheTime);
			await redis.set(`${path}:contentType`, contentType, 'EX', cacheTime);
		}

		return {
			contentType,
			body,
		};
	} catch (err) {
		const error = err as Error;

		if (error.name === 'NoSuchKey') {
			throw new NotFoundError('File not found');
		}

		throw error;
	}
}
