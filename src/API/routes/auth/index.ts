import { Router } from "express";

import { loginController, registerController, logoutController } from "../../controllers/auth";

export const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/logout", logoutController);