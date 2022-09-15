import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import User from "../models/User";
import { ValidationService } from "../services/ValidationService";
import validator from "validator";
import Auth from "../routes/auth";
import { UserService } from "../services/UserService";
import { CommonService } from "../services/CommonService";

export class UserController {
  public static async deleteUsers(req: Request, res: Response) {
    await User.deleteMany({
      _id: {
        $in: req.body.ids,
      },
    });

    return res.sendStatus(204);
  }

  public static async browseUsers(req: Request, res: Response) {
    const perPage = 10;
    const page = parseInt(req.query.page as string);

    const users = await User.find()
      .select("-password")
      .limit(perPage)
      .skip(perPage * page);

    const totalRows = await User.countDocuments();

    return res.send({ rows: users, totalRows });
  }

  public static async updateUser(req: Request, res: Response) {
    const user = await User.findById(req.params.id);

    const errors = await ValidationService.run(
      {
        name: [[(val) => !val, "Name is required"]],
        email: [
          [(val) => !val, "Email is required"],
          [(val) => !validator.isEmail(val), "Email must be in correct format"],
          [
            async (val) =>
              user!.email !== val &&
              !!(await AuthService.checkEmailExists(val)),
            "This email is taken",
          ],
        ],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    await User.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.sendStatus(204);
  }

  public static async createUser(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        name: [[(val) => !val, "Name is required"]],
        email: [
          [(val) => !val, "Email is required"],
          [(val) => !validator.isEmail(val), "Email must be in correct format"],
          [
            async (val) => !!(await AuthService.checkEmailExists(val)),
            "This email is taken",
          ],
        ],
        password: [
          [(val) => !val, "Password is required"],
          [
            (val) => val.length < 6,
            "Password must be at least 6 characters long",
          ],
        ],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    const user = new User({
      ...req.body,
    });
    await user.save();

    return res.send(user);
  }

  public static async deleteUser(req: Request, res: Response) {
    if (!CommonService.isValidObjectId(req.params.id)) {
      return CommonService.sendResourceNotObjectId(res);
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return CommonService.sendResourceNotFoundResponse(res);
    }

    await user!.remove();
    return res.sendStatus(204);
  }

  public static async changePassword(req: Request, res: Response) {
    const user = await User.findById(res.locals.userId);
    if (!user) {
      return CommonService.sendResourceNotFoundResponse(res);
    }

    const errors = await ValidationService.run(
      {
        currentPassword: [
          [(val) => !val, "Current Password is required"],
          [
            async (val) => {
              return !(await AuthService.verifyPassword(val, user!.password));
            },
            "Current Password is incorrect",
          ],
        ],
        password: [[(val) => !val, "Password is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    await UserService.changePassword(req.body.password, user!);

    return res.sendStatus(200);
  }
}
