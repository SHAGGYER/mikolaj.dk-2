import User, { IUser, USER_ACCESS_LEVEL } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  public static async checkEmailExists(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
  }

  public static checkIsAdmin(user: IUser) {
    return user.accessLevel == USER_ACCESS_LEVEL.ADMIN;
  }

  public static async verifyPassword(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  public static createToken(user: IUser): string {
    return jwt.sign(
      {
        userId: user._id,
        userAccessLevel: user.accessLevel,
      },
      process.env.JWT_SECRET!
    );
  }
}
