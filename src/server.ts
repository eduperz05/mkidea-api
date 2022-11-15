import express from "express";
import cors from "cors";

const app = express().use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("MKIdea API!");
});

import { userRouter } from "./API/routes/user/index";

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});

