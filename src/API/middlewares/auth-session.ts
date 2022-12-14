import { AuthRequest, AuthResponse, AuthNext } from "../../types";
import { TokenHelperJWT } from "../../utils/tokenHelper";

export const authSession = async(req: AuthRequest, res: AuthResponse, next: AuthNext) => {
  try {
    const tokenHelper = new TokenHelperJWT();
    const token = req.cookies.token;
    const payload = await tokenHelper.decode(token);
    if (!payload) {
      res.status(401).json("Unauthorized");
      return;
    }
    req.user = {
      userId: payload.userId,
      role: payload.role
    };
    next();
  } catch (err) {
    res.status(401).json("Failed to authenticate token.");
  }
  return;
};