import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { News } from "../models/news"
import * as dotenv from "dotenv";
import { Project } from "../models/project";

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);

const connection = new Sequelize({
  dialect: "mariadb",
  host: DB_HOST,
  port: DB_PORT	,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  models: [User, Project, News],
});

export default connection;