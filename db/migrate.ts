import { drizzle as pgDrizzle } from "drizzle-orm/postgres-js";
import { drizzle as pgliteDrizzle } from "drizzle-orm/pglite";
import { migrate as pgMigrate } from "drizzle-orm/postgres-js/migrator";
import { migrate as pgliteMigrate } from "drizzle-orm/pglite/migrator";
import postgres from "postgres";
import { PGlite } from "@electric-sql/pglite";
import * as schema from "./schema";

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (connectionString.startsWith("pglite://")) {
    const dataDir = connectionString.replace("pglite://", "") || ":memory:";
    const client = new PGlite(dataDir === ":memory:" ? undefined : dataDir);
    const db = pgliteDrizzle(client, { schema });
    await pgliteMigrate(db, { migrationsFolder: "./drizzle" });
  } else {
    const client = postgres(connectionString, { prepare: false });
    const db = pgDrizzle(client, { schema });
    await pgMigrate(db, { migrationsFolder: "./drizzle" });
    await client.end();
  }

  console.log("Migrations completed.");
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
