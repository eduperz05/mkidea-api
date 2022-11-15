import { Router } from "express";
const controller = require("../../controllers/user/index");

export const userRouter = Router();

userRouter.get("/", controller.getUsers);