import app from "./server";
import dbConnect from "./API/db/connect";
import * as dotenv from "dotenv";

dotenv.config();

dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
  });
}).catch((err) => {
  console.log("Err", err);
});