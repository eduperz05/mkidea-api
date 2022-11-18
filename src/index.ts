import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});