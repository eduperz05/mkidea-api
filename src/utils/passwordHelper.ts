import bcrypt from "bcryptjs";

export interface PasswordHelper {
  encrypt(password: string): string;
  compare(password: string, userPassword: string): boolean;
}

export class PasswordHelperBcrypt implements PasswordHelper {

  private salt: string;
  private SALT_SEED: number;

  constructor() {
    this.SALT_SEED = parseInt(process.env.SALT_SEED || "15");
    this.salt = bcrypt.genSaltSync(this.SALT_SEED);
  }

  public encrypt(password: string): string {
    return bcrypt.hashSync(password, this.salt);
  }

  public compare(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }
}