import { Router } from "express";
import { getUsers, getUser, postUser, deleteUser, changeUser } from "../../controllers/user";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/:id", postUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", changeUser);


// http://localhost:3000/user
// http://app.mkidea.tech/user/:"id"