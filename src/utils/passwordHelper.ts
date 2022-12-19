import bcrypt from "bcryptjs";

export interface PasswordHelper {
  encrypt(password: string): string | boolean;
  compare(password: string, userPassword: string): boolean;
  validator(password: string): boolean;
}

export class PasswordHelperBcrypt implements PasswordHelper {

  private salt: string;
  private SALT_SEED: number;
  private regex: RegExp;


  constructor() {
    this.SALT_SEED = parseInt(process.env.SALT_SEED || "15");
    this.salt = bcrypt.genSaltSync(this.SALT_SEED);
    this.regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
  }

  public encrypt(password: string): string | boolean {
    return this.validator(password) ? bcrypt.hashSync(password, this.salt) : false;
  }

  public compare(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public validator(password: string): boolean {
    return this.regex.test(password);
  }
}