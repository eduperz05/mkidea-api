import { AuthRequest, AuthResponse } from "../../../types/Auth";
import { UserRepositorySequelize } from "../../repositories/UserRepository";
import { PasswordHelperBcrypt } from "../../../utils/passwordHelper";
import { RoleHelperBinary } from "../../../utils/roleHelper";
import { findUsers, findUser, findUserByUsername, createUser, deleteUser, updateUser, findUserByEmail } from "../../../service/user";

// TODO: Preguntar a raul sobre como evitar enviar informacion sensible al cliente

export const getUsersController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    const userRepository = new UserRepositorySequelize();
    const users = await findUsers(userRepository, false);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getUsersPublicController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    const userRepository = new UserRepositorySequelize();
    const users = await findUsers(userRepository, true);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getUserController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
      return;
    }
    const { id_user } = req.params;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const roleHelper = new RoleHelperBinary();
    if (parseInt(id_user) !== id_user_request && !roleHelper.isAdmin(role_user_request)) {
      res.status(401).json("This user has no privileges to access this information");
      return;
    }
    const userRepository = new UserRepositorySequelize();
    const user = await findUser(parseInt(id_user), userRepository, false);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getUserPublicController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
      return;
    }
    const { id_user } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUser(parseInt(id_user), userRepository, true);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getUserByUsernameController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.username) {
      res.status(400).json("No username parameter");
      return;
    }
    const { username } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUserByUsername(username, userRepository);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getUserByEmailController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.email) {
      res.status(400).json("No email parameter");
      return;
    }
    const { email } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUserByEmail(email, userRepository);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const postUserController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.body.username || 
      !req.body.email || 
      !req.body.password || 
      !req.body.role) {
      res.status(400).json("A obligatory parameter is missing on body.");
      return;
    }
    const userRepository = new UserRepositorySequelize();
    const passwordHelper = new PasswordHelperBcrypt();
    const user = await createUser(req.body, userRepository, passwordHelper); 
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const deleteUserController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
      return;
    }
    const { id_user } = req.params;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const roleHelper = new RoleHelperBinary();
    if (parseInt(id_user) !== id_user_request && !roleHelper.isAdmin(role_user_request)) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    const userRepository = new UserRepositorySequelize();
    const deletedUser = await findUser(parseInt(id_user), userRepository, false);
    await deleteUser(parseInt(id_user), userRepository);
    res.status(200).json(deletedUser);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const changeUserController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
      return;
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
      return;
    }
    const { id_user } = req.params;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const roleHelper = new RoleHelperBinary();
    if (parseInt(id_user) !== id_user_request && !roleHelper.isAdmin(role_user_request)) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    const userRepository = new UserRepositorySequelize();
    await updateUser(parseInt(id_user), req.body, userRepository);
    const updatedUser = await findUser(parseInt(id_user), userRepository, false);
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};
