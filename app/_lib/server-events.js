import { closePool } from "./db";

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing MySQL pool...");
  await closePool();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing MySQL pool...");
  await closePool();
  process.exit(0);
});
