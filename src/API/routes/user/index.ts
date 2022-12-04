import { Router } from "express";
import { getUsersController, getUsersPublicController, getUserController, getUserPublicController, getUserByUsernameController, getUserByEmailController, postUserController, deleteUserController, changeUserController } from "../../controllers/user";

export const userRouter = Router();

userRouter.get("/", getUsersController);
userRouter.get("/public", getUsersPublicController);
userRouter.get("/:id_user", getUserController);
userRouter.get("/public/:id_user", getUserPublicController);
userRouter.get("/username/:username", getUserByUsernameController);
userRouter.get("/email/:email", getUserByEmailController);
userRouter.post("/", postUserController);
userRouter.delete("/:id_user", deleteUserController);
userRouter.patch("/:id_user", changeUserController);


// http://localhost:3000/user
// http://app.mkidea.tech/user/:"id"