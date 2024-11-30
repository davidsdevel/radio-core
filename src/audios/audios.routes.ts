import express from 'express';
import { controllerWrapper } from '../utils/controllerWrapper';
import { getAudio } from './audios.controller';

const router = express.Router();

/**
 * Get files
 * @route GET *
 */
router.get('*', controllerWrapper(getAudio, { format: 'raw', cors: '*' }));

export default router;
