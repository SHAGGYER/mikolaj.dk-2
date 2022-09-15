import { Request, Response } from "express";
import TrainingDay from "../models/TrainingDay";
import { ValidationService } from "../services/ValidationService";

export class TrainingDayController {
  public static async update(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        date: [[(val) => !val, "Date is required"]],
        body: [[(val) => !val, "Body is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    await TrainingDay.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.sendStatus(204);
  }

  public static async browse(req: Request, res: Response) {
    const perPage = 10;
    const page = parseInt(req.query.page as string);

    const rows = await TrainingDay.find()
      .select("-password")
      .limit(perPage)
      .skip(perPage * page);

    const totalRows = await TrainingDay.countDocuments();

    return res.send({ rows, totalRows });
  }

  public static async create(req: Request, res: Response) {
    const errors = await ValidationService.run(
      {
        date: [[(val) => !val, "Date is required"]],
        body: [[(val) => !val, "Body is required"]],
      },
      req.body
    );

    if (Object.keys(errors).length) {
      return res.status(450).send({ errors });
    }

    const hobby = new TrainingDay(req.body);
    await hobby.save();

    return res.sendStatus(201);
  }
}
