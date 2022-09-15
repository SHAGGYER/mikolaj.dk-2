import auth from "./auth";
import user from "./user";
import mail from "./mail";
import visitor from "./visitor";
import admin from "./admin";
import media from "./media";
import resource from "./resource";
import training_day from "./training_day";
import games from "./games";
import courses from "./courses";
import billing from "./billing";

export const routes = {
  auth,
  user,
  mail,
  visitor,
  admin,
  media,
  resource,
  trainingDay: training_day,
  games,
  courses,
  billing,
};
