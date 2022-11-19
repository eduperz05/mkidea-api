import app from "./server";
import { dbConnect } from "./API/db/connect";
import * as dotenv from "dotenv";

dotenv.config();

dbConnect().then(() => {
  app.listen(process.env.PORT_APP, () => {
    console.log("Server started on PORT_APP " + process.env.PORT_APP);
  });
}).catch((err) => {
  console.log("Err", err);
});