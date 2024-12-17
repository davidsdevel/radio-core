import fs from 'node:fs/promises';
import path from 'node:path';
import { audioPublicDomain, tempPath } from '../config';
import { NotFoundError } from '../errors';
import { deleteDirectory, uploadFile } from '../files/files.repository';
import { getDurationFromPlaylist } from '../utils/files';
import type { CreateRecordDTO, UpdateRecordDTO } from './records.dto';
import { stopRecord } from './records.recorder';
import {
	createRecord,
	deleteRecord,
	getAllRecords,
	getSingleRecord,
	updateRecord,
} from './records.repository';

export async function getAllRecordsService() {
	return await getAllRecords();
}

export async function getSingleRecordService(id: string) {
	const record = await getSingleRecord({ id });

	if (!record) {
		throw new NotFoundError('Record not found');
	}

	return record;
}

export async function createRecordService(
	file: Express.Multer.File,
	data: CreateRecordDTO,
) {
	const createdModel = await createRecord({
		duration: data.duration,
	});

	const tempRecordingPath = `temp/${createdModel.id}.wav`;

	console.log(tempRecordingPath, file);

	await uploadFile(tempRecordingPath, file.path, {
		ContentType: file.mimetype,
	});

	await fs.unlink(file.path);

	//TODO: Send processing message to Queue
	//sendToProcessingQueue(createdModel.id);

	return createdModel;
}

export async function stopRecordService(id: string) {
	await stopRecord(id);

	const tempRecordingPath = path.join(tempPath, id);

	const files = await fs.readdir(tempRecordingPath);

	const totalDurations = await getDurationFromPlaylist(
		path.join(tempRecordingPath, 'playlist.m3u8'),
	);

	await Promise.all(
		files.map((e) => {
			return uploadFile(`${id}/${e}`, path.join(tempRecordingPath, e));
		}),
	);

	await fs.rm(tempRecordingPath, { recursive: true });

	const updated = await updateRecord(
		{ id },
		{
			path: `${audioPublicDomain}/${id}/playlist.m3u8`,
			status: 'DRAFT',
			duration: totalDurations,
		},
	);

	return updated;
}

export async function deleteRecordService(id: string) {
	const removed = await deleteRecord({ id });

	if (!removed) {
		throw new NotFoundError('Record not found');
	}
	await deleteDirectory(id);

	return removed;
}

export async function updateRecordService(id: string, body: UpdateRecordDTO) {
	return await updateRecord({ id }, body);
}
