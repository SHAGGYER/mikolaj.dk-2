import { Request, Response } from "express";
import User, { IUser, USER_ACCESS_LEVEL } from "../models/User";
import { AuthService } from "../services/AuthService";
import { ValidationService } from "../services/ValidationService";
import validator from "validator";
import Auth from "../routes/auth";
import AppSettings from "../models/AppSettings";
import { checkToken } from "encryptly-auth-sdk";
import jwt from "jsonwebtoken";

export class AuthController {
  public static async oauthLogin(req, res) {
    if (!req.query.token) {
      return res.status(400).send({ error: "No token provided" });
    }

    const settings = await AppSettings.findOne();

    const response = await checkToken({
      token: req.query.token,
      serverUrl: process.env.ENCRYPTLY_SERVER_URL!,
      clientId: process.env.ENCRYPTLY_CLIENT_ID!,
      clientSecret: process.env.ENCRYPTLY_CLIENT_SECRET!,
    });

    if (response.error) {
      return res.sendStatus(401);
    }

    const { _id, displayName, email } = response.user;

    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        displayName,
        email,
        oauthId: _id,
        accessLevel: "User",
      });
      await user.save();
    }

    const jwtUserData = {
      userId: user._id,
      userAccessLevel: user.accessLevel,
    };
    const jwtToken = jwt.sign(jwtUserData, process.env.JWT_SECRET!);

    if (req.query.serverRedirect) {
      let redirectUrl =
        process.env.CLIENT_URL +
        (req.query.redirectUrl ? req.query.redirectUrl : "/");
      redirectUrl = redirectUrl + "?token=" + jwtToken;

      return res.redirect(redirectUrl);
    }

    return res.send({ token: jwtToken });
  }

  public static async init(req: Request, res: Response) {
    const user = await User.findById(res.locals.userId);
    const settings = await AppSettings.findOne();

    const authSettings = {
      clientId: process.env.ENCRYPTLY_CLIENT_ID,
      authServerUrl: process.env.ENCRYPTLY_SERVER_URL,
    };

    return res.json({
      user,
      settings,
      authSettings,
    });
  }

  public static async login(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        email: [
          [(val) => !val, "Email is required"],
          [(val) => !validator.isEmail(val), "Email must be in correct format"],
        ],
        password: [[(val) => !val, "Password is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    if (!(await AuthService.checkEmailExists(req.body.email))) {
      return res
        .status(450)
        .send({ errors: { general: "Could not log you in" } });
    }

    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (
      !(await AuthService.verifyPassword(req.body.password, user!.password))
    ) {
      return res
        .status(450)
        .send({ errors: { general: "Could not log you in (password)" } });
    }

    const token = AuthService.createToken(user!);

    return res.status(200).send({ token, user });
  }
  public static async adminLogin(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        email: [
          [(val) => !val, "Email is required"],
          [(val) => !validator.isEmail(val), "Email must be in correct format"],
        ],
        password: [[(val) => !val, "Password is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    const user = await AuthService.checkEmailExists(
      req.body.email.toLowerCase()
    );

    if (!user) {
      return res
        .status(450)
        .send({ errors: { general: "Could not log you in" } });
    }

    if (!(await AuthService.verifyPassword(req.body.password, user.password))) {
      return res
        .status(450)
        .send({ errors: { general: "Could not log you in" } });
    }

    if (!AuthService.checkIsAdmin(user)) {
      return res
        .status(450)
        .send({ errors: { general: "Could not log you in" } });
    }

    const token = AuthService.createToken(user!);

    return res.status(200).send({ token, user });
  }

  public static async register(req: Request, res: Response) {
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
        passwordAgain: [
          [(val) => !val, "Password Confirmation is required"],
          [(val) => val !== req.body.password, "Passwords must match"],
        ],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    const user = new User({
      ...req.body,
      accessLevel: USER_ACCESS_LEVEL.USER,
    });
    await user.save();

    return res.sendStatus(201);
  }
}
