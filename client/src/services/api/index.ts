import { App } from "./app";
import { Auth } from "./auth";
import { Autocomplete } from "./autocomplete";
import { Blog } from "./blog";
import { Course } from "./course";
import { Media } from "./media";
import { Shop } from "./shop";
import { Visitor } from "./visitor";

interface IAgent {
  Auth: Auth;
  Course: Course;
  Autocomplete: Autocomplete;
  Blog: Blog;
  App: App;
  Visitor: Visitor;
  Media: Media;
  Shop: Shop;
}

export const Agent: IAgent = {
  Auth: new Auth(),
  Course: new Course(),
  Autocomplete: new Autocomplete(),
  Blog: new Blog(),
  App: new App(),
  Visitor: new Visitor(),
  Media: new Media(),
  Shop: new Shop(),
};
