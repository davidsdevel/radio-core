import { BadRequestError } from '../errors';
import type { ControllerData } from '../utils/controllerWrapper';
import type { CreateRecordDTO, UpdateRecordDTO } from './records.dto';
import {
	createRecordService,
	deleteRecordService,
	getAllRecordsService,
	getSingleRecordService,
	stopRecordService,
	updateRecordService,
} from './records.service';

export async function getAllRecords(data: ControllerData) {
	return await getAllRecordsService();
}

export async function getSingleRecord(data: ControllerData) {
	if (!data.params?.id) {
		throw new BadRequestError('Missing record id');
	}

	return await getSingleRecordService(data.params.id);
}

export async function createRecord(data: ControllerData) {
	return await createRecordService(
		data.file as Express.Multer.File,
		data.body as CreateRecordDTO,
	);
}

export async function stopRecord(data: ControllerData) {
	if (!data.params?.id) {
		throw new BadRequestError('Missing record id');
	}

	return await stopRecordService(data.params.id);
}

export async function deleteRecord(data: ControllerData) {
	if (!data.params?.id) {
		throw new BadRequestError('Missing record id');
	}

	return await deleteRecordService(data.params.id);
}

export async function updateRecord(data: ControllerData) {
	if (!data.params?.id) {
		throw new BadRequestError('Missing record id');
	}

	return await updateRecordService(
		data.params.id,
		data.body as UpdateRecordDTO,
	);
}
