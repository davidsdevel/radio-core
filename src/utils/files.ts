import fs from 'node:fs/promises';

export async function getDurationFromPlaylist(path: string) {
	const playylistString = await fs.readFile(path, { encoding: 'utf-8' });

	const lines = playylistString.split('\n');

	const filteredLinesWithDuration = lines.filter((e: string) =>
		e.startsWith('#EXTINF'),
	);
	const mappedDurations = filteredLinesWithDuration.map((e: string) => {
		return +e.replace('#EXTINF:', '').replace(',', '');
	});

	const totalDurationInSeconds = mappedDurations.reduce((a, b) => a + b);

	return Math.round(totalDurationInSeconds);
}
