import { db, kv } from "./utils/kvdex.ts";

// Sends post request when data is received
db.users.listenQueue<string>((joke) => {
  console.log("Received joke from kvdex.enqueue inside queues.ts:", joke);
});

kv.listenQueue((joke) => {
  console.log("Received joke from kv.enqueue inside queues.ts:", joke);
});
