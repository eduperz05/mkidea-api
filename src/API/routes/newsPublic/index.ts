import { Router } from "express";
import {
  getNewsPublicController, 
  getNewsByIdPublicController } from "../../controllers/news";

export const newsRouterPublic = Router();

newsRouterPublic.get("/", getNewsPublicController);
newsRouterPublic.get("/:id_news", getNewsByIdPublicController);