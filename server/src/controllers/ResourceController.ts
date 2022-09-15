import { Request, Response } from "express";
import Hobby from "../models/Hobby";
import { ValidationService } from "../services/ValidationService";

export class ResourceController {
  public static async remove(req: Request, res: Response) {
    await Hobby.deleteMany({
      _id: {
        $in: req.body.ids,
      },
    });

    return res.sendStatus(204);
  }

  public static async updateHobby(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        name: [[(val) => !val, "Name is required"]],
        body: [[(val) => !val, "Body is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    await Hobby.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.sendStatus(204);
  }

  public static async browseHobbies(req: Request, res: Response) {
    const perPage = 10;
    const page = req.query.page ? parseInt(req.query.page as string) - 1 : 0;

    const rows = await Hobby.find()
      .select("-password")
      .limit(perPage)
      .skip(perPage * page);

    const totalRows = await Hobby.countDocuments();

    return res.send({ rows, totalRows });
  }

  public static async createHobby(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        name: [[(val) => !val, "Name is required"]],
        body: [[(val) => !val, "Body is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    const hobby = new Hobby(req.body);
    await hobby.save();

    return res.sendStatus(201);
  }
}
