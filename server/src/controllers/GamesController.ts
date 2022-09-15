import { Request, Response } from "express";
import Game from "../models/Game";
import { GamesService } from "../services/GamesService";

export class GamesController {
  public static async browse(req: Request, res: Response) {
    const perPage = 10;
    const page = parseInt(req.query.page as string);

    const rows = await Game.find()
      .limit(perPage)
      .skip(perPage * page);

    const totalRows = await Game.countDocuments();

    return res.send({ rows, totalRows });
  }

  public static async update(req: Request, res: Response) {
    const errors = await GamesService.validateRequest(req);

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    await Game.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.sendStatus(204);
  }

  public static async create(req: Request, res: Response) {
    const errors = await GamesService.validateRequest(req);

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    const game = new Game({
      ...req.body,
    });
    await game.save();

    return res.send(game);
  }

  public static async remove(req: Request, res: Response) {
    await Game.deleteMany({
      _id: {
        $in: req.body.ids,
      },
    });

    return res.sendStatus(204);
  }
}
