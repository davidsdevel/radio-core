import express from 'express';
import fileUploadMiddleware from '../middlewares/fileUpload';
import { controllerWrapper } from '../utils/controllerWrapper';
import {
	createRecord,
	deleteRecord,
	getAllRecords,
	getSingleRecord,
	stopRecord,
	updateRecord,
} from './records.controller';

const router = express.Router();

/**
 * Get all records
 * @route GET /records
 */
router.get('/', controllerWrapper(getAllRecords));

/**
 * Start a new record
 * @route POST /records
 */
router.post(
	'/',
	fileUploadMiddleware.single('audio'),
	controllerWrapper(createRecord),
);

/**
 * Get a single record
 * @route GET /records/:id
 */
router.get('/:id', controllerWrapper(getSingleRecord));

/**
 * Finish record
 * @route POST /records/:id/end-record
 */
router.post('/:id/end-record', controllerWrapper(stopRecord));

/**
 * Update a record
 * @route PATCH /records/:id
 */
router.patch('/:id', controllerWrapper(updateRecord));

/**
 * Delete a record
 * @route DELETE /records/:id
 */
router.delete('/:id', controllerWrapper(deleteRecord));

export default router;
