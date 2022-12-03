import { Router } from "express";
import { getUsersController, 
  getUserController, 
  getUserByUsernameController, 
  postUserController, 
  deleteUserController, 
  changeUserController } from "../../controllers/user";

export const userRouter = Router();

userRouter.get("/", getUsersController);
userRouter.get("/:id_user", getUserController);
userRouter.get("/username/:username", getUserByUsernameController);
userRouter.post("/", postUserController);
userRouter.delete("/:id_user", deleteUserController);
userRouter.patch("/:id_user", changeUserController);


// http://localhost:3000/user
// http://app.mkidea.tech/user/:"id"