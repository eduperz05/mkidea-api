import jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
// dotenv.config();

export interface TokenHelper {
  generate(userId: number, role: number): Promise<string>;
  decode(token: string): any | boolean;
}

export class TokenHelperJWT implements TokenHelper {

  private SECRET_KEY: string | undefined;

  constructor() {
    this.SECRET_KEY = process.env.SECRET_KEY;
  }

  public async generate(userId: number, role: number): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const payload = { userId, role };
      if (!this.SECRET_KEY) {
        throw new Error("Password is undefined");
      }
      jwt.sign(payload, this.SECRET_KEY, {
        expiresIn: "4h"
      }, (err: any, token: any) => {
        if (err) {
          console.log(err);
          reject("Could not generate token");
        }
        resolve(token);
      });
    });
  }

  public decode(token: string): any | boolean {
    if (!this.SECRET_KEY) {
      throw new Error("Password is undefined");
    }
    try {
      return jwt.verify(token, this.SECRET_KEY);
    } catch (error) {
      return false;
    }
  }
}
