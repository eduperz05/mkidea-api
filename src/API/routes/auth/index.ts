import { Router } from "express";

import { loginController } from "../../controllers/auth";

export const authRouter = Router();

authRouter.post("/login", loginController);