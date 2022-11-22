import { Router } from "express";
import { getNews, getNew, postNew, deleteNew, changeNew } from "../../controllers/news";

export const newsRouter = Router();

newsRouter.get("/", getNews);
newsRouter.get("/:id_news", getNew);
newsRouter.post("/", postNew);
newsRouter.delete("/:id_news", deleteNew);
newsRouter.patch("/:id_news", changeNew);