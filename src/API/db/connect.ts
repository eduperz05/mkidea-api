import connection from "./config";
import { createConnection } from "mariadb";

const isDev = process.env.NODE_ENV === "development";
const modeDB = process.env.MODE_DB === "alter" 
  ? { alter: isDev } : process.env.MODE_DB === "force" 
    ? { force: isDev } : {};

export const dbConnect = async() => {
  await dbCheck();
  await connection.sync(modeDB).then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log("Err", err);
  });
};

const dbCheck = async() => {
  await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }).then(async(conn) => {
    await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
      .then(() => {
        console.log("Database checked");
      }).catch((err) => {
        console.log("Err", err);
      });
  }).catch((err) => { console.log("Err", err); });
};
