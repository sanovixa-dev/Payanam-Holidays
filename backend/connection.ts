import pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export const pool = new pg.Pool({
  connectionString,
  ssl: connectionString.includes("railway.internal")
    ? false
    : { rejectUnauthorized: false },
});

export default pool;
