import type { Channel, Connection } from 'amqplib';
import amqp from 'amqplib';

const isTest = process.env.__TEST__;

const amqpUrl = process.env.RABBITMQ_URL as string;
const queue = 'audio_queue';

let channel: Channel | null = null;

export const connectAmqp = async () => {
	const connection = await amqp.connect(amqpUrl);

	channel = await connection.createChannel();
};

export const sendToProcessingQueue = async (path: string) => {
	if (isTest) {
		return null;
	}

	if (!channel) {
		throw new Error('Channel not initialized');
	}

	await channel.assertQueue(queue, {
		durable: true,
	});

	await channel.sendToQueue(queue, Buffer.from(path), {
		persistent: true,
	});
};
