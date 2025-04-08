// lib/redis.ts
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://192.168.12.132:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        console.log('Redis: Too many retries, stopping...');
        return new Error('Retry attempts exhausted');
      }
      console.log(`Redis reconnect attempt #${retries}`);
      return Math.min(retries * 100, 3000); // retry after ms
    },
  },
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

if (!client.isOpen) {
  client.connect().catch(console.error);
}

export default client;
