// import mysql from "mysql2/promise";

// let pool;

// if (!pool) {
//   pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT,
//     waitForConnections: true,
//     connectionLimit: 20, // Adjust based on your requirements
//     queueLimit: 10,
//   });
//   console.log("MySQL Connection Pool Initialized");
// }

// // Force Node.js runtime for this file
// export const config = {
//   runtime: "nodejs", // Force Node.js runtime for the database
// };

// export async function executeQuery(query, values = []) {
//   try {
//     const [results] = await pool.query(query, values);
//     return results;
//   } catch (error) {
//     console.error("Database Query Error:", error);
//     throw error;
//   } finally {
//     pool.end();
//   }
// }

// export default pool;

import mysql from "mysql2/promise";

let pool;

if (!pool) {
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 10,
  });
  console.log("MySQL Connection Pool Initialized");
}

// Gracefully close the pool
export async function closePool() {
  try {
    if (pool) {
      await pool.end();
      console.log("MySQL Connection Pool Closed");
    }
  } catch (error) {
    console.error("Error closing MySQL pool:", error);
  }
}

export async function executeQuery(query, values = []) {
  try {
    connection = await pool.getConnection();

    const [results] = await pool.query(query, values);
    return results;
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  } finally {
    // Always release the connection back to the pool
    if (connection) connection.release();
  }
}

export default pool;
