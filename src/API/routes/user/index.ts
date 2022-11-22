import { Router } from "express";
import { getUsers, getUser, postUser, deleteUser, changeUser } from "../../controllers/user";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id_user", getUser);
userRouter.post("/", postUser);
userRouter.delete("/:id_user", deleteUser);
userRouter.patch("/:id_user", changeUser);


// http://localhost:3000/user
// http://app.mkidea.tech/user/:"id"