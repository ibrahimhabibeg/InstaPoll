import {createClient} from 'redis';
import {RedisClientType} from 'redis';
import {POLL_VALID_DURATION_MS} from './config';
import { Poll } from './types';

/**
 * Singleton class to handle Redis connection.
 */
class RedisClient {
  private static instance: RedisClient;

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }

    return RedisClient.instance;
  }

  private client: RedisClientType | undefined;

  RedisClient() {
    const client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    client.on('error', error => {
      console.error(error);
    });
    client.connect();
    this.client = client as RedisClientType;
  }

  /**
   * Set a key-value pair in Redis.
   * @param key
   * @param value
   * @param expiresIn The duration of the key-value pair in seconds.
   */
  public async set<T>(
    key: string,
    value: T,
    expiresIn?: number,
  ): Promise<void> {
    await this.client?.set(key, JSON.stringify(value), {EX: expiresIn});
  }

  /**
   * Get a value from Redis.
   * @param key
   */
  public async get<T>(key: string): Promise<T | null> {
    const value = await this.client?.get(key);
    return value ? JSON.parse(value) : null;
  }
}

/**
 * Check if a poll exists with the given code.
 * @param code The code to check.
 * @returns True if the code is used, false otherwise.
 */
export const isCodeUsed = async (code: string): Promise<boolean> => {
  const redis = RedisClient.getInstance();
  const value = await redis.get(code);
  return Boolean(value);
};

/**
 * Save a poll in Redis.
 * @param poll The poll to save.
 */
export const savePoll = async (poll: Poll): Promise<void> => {
  const redis = RedisClient.getInstance();
  await redis.set(poll.code, poll, POLL_VALID_DURATION_MS / 1000);
};
