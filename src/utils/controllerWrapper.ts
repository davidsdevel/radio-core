import type { NextFunction, Request, Response } from 'express';

export interface ControllerData {
	query: Record<string, any>;
	body: Record<string, any>;
	params: Record<string, any>;
	path: string;
	file: Express.Multer.File | undefined;
}

export interface ControllerWrapperOptions {
	format?: 'json' | 'raw' | 'stream';
	cors?: '*' | string;
}

type Controller = (
	data: ControllerData,
	req: Request,
	res: Response,
) => Promise<Record<string, any> | string | Buffer | undefined>;

export function controllerWrapper(
	controller: Controller,
	options?: ControllerWrapperOptions,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (typeof options?.cors === 'string') {
				res.setHeader('Access-Control-Allow-Origin', options.cors);
			}

			const requestData: ControllerData = {
				query: req.query as Record<string, any>,
				body: req.body as Record<string, any>,
				params: req.params as Record<string, any>,
				file: req.file,
				path: req.path,
			};

			const data = await controller(requestData, req, res);

			if (options?.format === 'raw') {
				res.send(data);
			} else if (options?.format === 'stream') {
				(data as NodeJS.ReadableStream).pipe(res);
			} else {
				res.json(data);
			}
		} catch (err: unknown) {
			const error = err as Error;

			if (error.name === 'NotFoundError') {
				res.status(404).json({
					message: error.message,
				});
			} else if (error.name === 'BadRequestError') {
				res.status(400).json({
					message: error.message,
				});
			} else if (error.name === 'UnauthorizedError') {
				res.status(401).json({
					message: error.message,
				});
			} else {
				next(err);
			}
		}
	};
}
