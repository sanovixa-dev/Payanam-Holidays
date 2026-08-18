import "dotenv/config"; // Must stay at the absolute top of the page!
import pg from "pg";

const fallbackString =
  "postgresql://postgres:Postgres123@base.railway.internal:5432/railway";

const connectionString =
  "postgresql://postgres:Postgres123@base.railway.internal:5432/railway";

// Add this quick console debug line to prove what your server sees at launch
console.log(
  "Checking DATABASE_URL present status:",
  connectionString ? "YES (Valid String)" : "NO (It is UNDEFINED!)",
);

const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
