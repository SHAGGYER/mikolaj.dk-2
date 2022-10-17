import express, { Application } from "express";
import { Db } from "./Db";
import routes from "../routes/index";
import { ParseToken } from "../middleware/ParseToken";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import router from "../routes/index";

export class Server {
  private app: Application;

  public run() {
    this.app = express();

    const db = new Db();
    db.Connect();

    this.loadMiddleware();
    this.loadRoutes();

    this.app.listen(process.env.NODE_PORT, () =>
      console.log(`Server started on port ${process.env.NODE_PORT}`)
    );
  }

  private loadMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private loadRoutes() {
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../..", "uploads"))
    );
    this.app.use("/api", ParseToken, routes);
  }
}
