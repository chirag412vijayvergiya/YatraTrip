import mysql from "mysql2/promise";

let pool;

if (!pool) {
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  });
  console.log("MySQL Connection Pool Initialized");
}

// Force Node.js runtime for this file
export const config = {
  runtime: "nodejs", // Force Node.js runtime for the database
};

export async function executeQuery(query, values = []) {
  try {
    const [results] = await pool.query(query, values);
    return results;
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  }
}

export default pool;
