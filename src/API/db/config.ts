import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "mkidea-test",
  logging: false,
  models: [User],
});

export default connection;