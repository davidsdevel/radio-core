import { type ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import { join } from 'node:path';
import { icecastStreamUrl, tempPath } from '../config';

const activeRecording: Record<string, ChildProcessWithoutNullStreams> = {};

export async function startRecord(id: string) {
	const filePath = join(tempPath, id);

	activeRecording[id] = spawn('ffmpeg', [
		'-y',
		'-i',
		icecastStreamUrl,
		'-c:a',
		'aac',
		'-b:a',
		'128k',
		'-f',
		'segment',
		'-segment_time',
		'5',
		'-segment_list',
		join(filePath, 'playlist.m3u8'),
		'-segment_format',
		'mpegts',
		join(filePath, 'file%d.m4a'),
	]);
}

export async function stopRecord(id: string) {
	return new Promise((resolve) => {
		activeRecording[id].on('exit', (res) => {
			resolve(res);
			delete activeRecording[id];
		});

		activeRecording[id].kill(1);
	});
}
