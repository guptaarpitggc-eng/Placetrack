require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};
const dbName = process.env.DB_NAME || "placetrack";

async function initDatabase() {
  const first = await mysql.createConnection(config);
  await first.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await first.end();

  const second = await mysql.createConnection({ ...config, database: dbName, multipleStatements: true });
  await second.query(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));
  await second.end();
}

const pool = mysql.createPool({ ...config, database: dbName, connectionLimit: 5 });

module.exports = { pool, initDatabase };
