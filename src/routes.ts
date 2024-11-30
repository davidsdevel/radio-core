import express from 'express';
import audiosRouter from './audios/audios.routes';
import recordRouter from './records/records.routes';

const router = express.Router();

router.use('/records', recordRouter);
router.use('/audios', audiosRouter);

export default router;
