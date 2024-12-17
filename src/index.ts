import 'dotenv/config';
import { connectAmqp } from './amqp';
import { port } from './config';
import server from './server';

async function main() {
	await connectAmqp();

	server.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
}

main();
