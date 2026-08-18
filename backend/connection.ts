import "dotenv/config";
import { Pool } from "pg";
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    // Required for web-hosted production databases
    rejectUnauthorized: false,
  },
});

export default pool;
