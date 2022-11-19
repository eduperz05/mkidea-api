import express from "express";
import cors from "cors";
import { urlencoded } from "body-parser";
import { userRouter } from "./API/routes/user/index";
import { projectRouter } from "./API/routes/project/index";
import { teamRouter } from "./API/routes/team/index";
import { newsRouter } from "./API/routes/news/index";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("MKIdea API!");
});


app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/team", teamRouter);
app.use("/news", newsRouter);

app.use((
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});

export default app;