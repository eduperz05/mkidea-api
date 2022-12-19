import { rolesToString } from "../config/rolesToString";

export interface RoleHelper {
  isAdmin(role: number): boolean;
  toBinary(role: number): string;
}

export class RoleHelperBinary implements RoleHelper{
  public isAdmin(role: number): boolean {
    const binary = this.toBinary(role);
    return binary.charAt(binary.length - 1) === "1";
  }

  public isOwner(role: number): boolean {
    const binary = this.toBinary(role);
    return binary.charAt(binary.length - 2) === "1";
  }

  public toBinary(role: number): string {
    return role.toString(2);
  }

  public toString(role: number): string[] {
    if (rolesToString.length !== this.toBinary(role).length) {
      throw new Error("rolesToString and role are not the same length");
    }
    const binary = this.toBinary(role); // 101
    const roles = binary.split(""); // [1, 0, 1]
    const rolesOfUser = rolesToString.filter((_, index) => roles[index] === "1"); // ["admin", "owner"]
    return rolesOfUser;
  }
}