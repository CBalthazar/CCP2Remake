import { Pool } from "pg";
import "dotenv/config";

const pool = Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
});

export default pool;
