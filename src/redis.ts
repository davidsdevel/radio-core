import { Redis } from 'ioredis';
import { redisUrl } from './config';

export const redis = new Redis(redisUrl);

export default redis;
