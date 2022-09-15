import User, { IUser } from "../models/User";

export class UserService {
  public static async changePassword(newPassword: string, user: IUser) {
    user.password = newPassword;
    await user.save();
  }
}
