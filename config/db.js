import mariadb from "mariadb";
import "dotenv/config";

const pool = mariadb.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
});

export default pool;
