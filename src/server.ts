import express from "express";
import cors from "cors";
import { userRouter } from "./API/routes/user/index";
import { projectRouter } from "./API/routes/project/index";
import { teamRouter } from "./API/routes/team/index";
import { newsRouter } from "./API/routes/news/index";

const app = express().use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("MKIdea API!");
});


app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/team", teamRouter);
app.use("/news", newsRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});

