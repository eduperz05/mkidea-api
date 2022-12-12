import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = async(userId: number): Promise<string> => {
  return new Promise((resolve: any, reject: any) => {
    const payload = { userId };
    if (!SECRET_KEY) {
      throw new Error("Password is undefined");
    }
    jwt.sign(payload, SECRET_KEY, {
      expiresIn: "4h"
    }, (err: any, token: any) => {
      if (err) {
        console.log(err);
        reject("Could not generate token");
      }
      resolve(token);
    });
  });
};


