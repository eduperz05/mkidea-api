import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import * as dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize({
  dialect: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  logging: false,
  models: [User],
});

export default connection;