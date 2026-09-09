import { drizzle as pgDrizzle } from "drizzle-orm/postgres-js";
import { drizzle as pgliteDrizzle } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import postgres from "postgres";
import * as schema from "./schema";

let _db: ReturnType<typeof pgDrizzle<typeof schema>> | ReturnType<typeof pgliteDrizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (connectionString.startsWith("pglite://")) {
    const dataDir = connectionString.replace("pglite://", "") || ":memory:";
    const client = new PGlite(dataDir === ":memory:" ? undefined : dataDir);
    _db = pgliteDrizzle(client, { schema });
    return _db;
  }

  const client = postgres(connectionString, { prepare: false });
  _db = pgDrizzle(client, { schema });
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof pgDrizzle<typeof schema>>, {
  get(_target, prop) {
    const d = getDb();
    // @ts-expect-error dynamic access
    return d[prop];
  },
});
