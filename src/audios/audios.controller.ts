import type { Request, Response } from 'express';
import type { ControllerData } from '../utils/controllerWrapper';
import { getAudioService } from './audios.service';

export async function getAudio(
	data: ControllerData,
	req: Request,
	res: Response,
) {
	const { body, contentType } = await getAudioService(data.path);

	if (contentType) res.setHeader('Content-Type', contentType);

	return body;
}
