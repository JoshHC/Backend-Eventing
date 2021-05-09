import redis from 'redis';

const client = redis.createClient({
    port: 6379,
    host: 'redis'
});

client.on("connect", function(error) {
    console.log("connected to Redis server");
  });

client.on("ready", function(error) {
    console.log("Redis server ready to use");
});

client.on("error", function(error) {
  console.error(error);
});

client.on("end", function(error) {
    console.log("Client disconnected from Redis server");
});

process.on("SIGINT", function(error) {
    client.quit;
});

export default client;