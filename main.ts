/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import "$std/dotenv/load.ts";
import './queues.ts'

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { db, kv } from "./utils/kvdex.ts";

// Sends post request when data is received
db.users.listenQueue<string>((joke) => {
  console.log("Received joke from kvdex.enqueue inside main.ts:", joke);
});

kv.listenQueue((joke) => {
  console.log("Received joke from kv.enqueue inside main.ts:", joke);
});

await start(manifest, config);
