import bcrypt from "bcryptjs";

export const comparePassword = (password: string, userPassword: string): boolean => {
  return bcrypt.compareSync(password, userPassword);
};