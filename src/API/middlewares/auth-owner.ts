import { AuthRequest, AuthResponse, AuthNext } from "../../types/Auth";
import { RoleHelperBinary } from "../../utils/roleHelper";

export const authOwner = async(req: AuthRequest, res: AuthResponse, next: AuthNext) => {
  try {
    const roleHelper = new RoleHelperBinary();
    const userRole = req.user.role;
    if (!roleHelper.isOwner(userRole) && roleHelper.isAdmin(userRole)) {
      res.status(401).json("Unauthorized");
      return;
    }
    next();
  } catch (err) {
    res.status(401).json("Failed to read user role.");
  }
  return;
};