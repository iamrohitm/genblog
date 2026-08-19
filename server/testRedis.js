import 'dotenv/config';
import { createClient } from 'redis';

console.log("USERNAME:", process.env.REDIS_USERNAME);
console.log("HOST:", process.env.REDIS_HOST);
console.log("PORT:", process.env.REDIS_PORT);
console.log("PASSWORD EXISTS:", !!process.env.REDIS_PASSWORD);
console.log("PASSWORD LENGTH:", process.env.REDIS_PASSWORD?.length);

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

client.on('error', (err) => {
    console.log('Redis Error:', err.message);
});

await client.connect();

console.log("CONNECTED!");

await client.set('test:key', 'Hello Redis');

const value = await client.get('test:key');

console.log("Redis value:", value);

await client.quit();