import { TokenHelperJWT } from "../../utils/tokenHelper";

export const authSession = async(req: any, res: any, next: any) => {
  try {
    const tokenHelper = new TokenHelperJWT();
    const token = req.cookies.token;
    const payload = await tokenHelper.decode(token);
    if (!payload) {
      res.status(401).json("Unauthorized");
      return;
    }
    req.id_user = payload.userId;
    next();
  } catch (err) {
    res.status(401).json("Failed to authenticate token.");
  }
  return;
};