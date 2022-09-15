import { USER_ACCESS_LEVEL } from "../models/User";

export const IsAdmin = (_req, res, next) => {
  if (!res.locals.userId) {
    return res.status(403).send({ error: "NOT_AUTHENTICATED" });
  }

  if (res.locals.userAccessLevel != USER_ACCESS_LEVEL.ADMIN) {
    return res.status(400).send({ error: "NOT_ADMIN" });
  }

  return next();
};
