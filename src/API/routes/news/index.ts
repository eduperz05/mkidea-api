import { Router } from "express";
import { getNewsController, 
  getNewsByIdController, 
  getNewsPublicController, 
  getNewsByIdPublicController, 
  getNewsByTitleController, 
  postNewsController, 
  deleteNewsController,
  changeNewsController } from "../../controllers/news";

export const newsRouter = Router();

newsRouter.get("/", getNewsController);
newsRouter.get("/public", getNewsPublicController);
newsRouter.get("/:id_news", getNewsByIdController);
newsRouter.get("/public/:id_news", getNewsByIdPublicController);
newsRouter.get("/title/:title", getNewsByTitleController);
newsRouter.post("/", postNewsController);
newsRouter.delete("/:id_news", deleteNewsController);
newsRouter.patch("/:id_news", changeNewsController);