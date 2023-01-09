import { Router } from "express";
import { getUsersController, getUserController, getUserByUsernameController, getUserByEmailController, postUserController, deleteUserController, changeUserController, changePasswordController } from "../../controllers/user";
import { authAdmin } from "../../middlewares/auth-admin";

export const userRouter = Router();

userRouter.get("/", [authAdmin], getUsersController);
userRouter.get("/:id_user", getUserController);
userRouter.get("/username/:username", [authAdmin], getUserByUsernameController);
userRouter.get("/email/:email", [authAdmin], getUserByEmailController);
userRouter.post("/", [authAdmin], postUserController);
userRouter.delete("/:id_user", deleteUserController);
userRouter.patch("/:id_user", changeUserController);
userRouter.patch("/changePassword/:id_user", changePasswordController);