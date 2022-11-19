import { Router } from "express";
import { getNews, getNew, postNew, deleteNew, changeNew } from "../../controllers/news";

export const newsRouter = Router();

newsRouter.get("/", getNews);
newsRouter.get("/:id", getNew);
newsRouter.post("/:id", postNew);
newsRouter.delete("/:id", deleteNew);
newsRouter.patch("/:id", changeNew);