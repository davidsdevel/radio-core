import 'dotenv/config';
import { port } from './config';
import server from './server';

async function main() {
	server.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
}

main();
