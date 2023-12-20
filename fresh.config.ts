import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import './queues.ts'


export default defineConfig({
  plugins: [tailwind()],
});
