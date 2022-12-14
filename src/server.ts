import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "body-parser";
import { userRouter } from "./API/routes/user/index";
import { projectRouter } from "./API/routes/project/index";
import { teamRouter } from "./API/routes/team/index";
import { newsRouter } from "./API/routes/news/index";
import { authRouter } from "./API/routes/auth/index";
import { userRouterPublic } from "./API/routes/userPublic";
import { projectRouterPublic } from "./API/routes/projectPublic";
import { teamRouterPublic } from "./API/routes/teamPublic";
import { newsRouterPublic } from "./API/routes/newsPublic";
import { authSession } from "./API/middlewares/auth-session";
import { authAdmin } from "./API/middlewares/auth-admin";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("MKIdea API!");
});

// app.use(middlewareAuth);
app.use("/auth", authRouter);
app.use("/public/use", userRouterPublic);
app.use("/public/project", projectRouterPublic);
app.use("/public/team", teamRouterPublic);
app.use("/public/news", newsRouterPublic);
app.use(authSession);
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/team", teamRouter);
app.use(authAdmin);
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