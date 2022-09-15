import { Response } from "express";
import mongoose from "mongoose";

export class CommonService {
  public static async sendResourceNotFoundResponse(
    res: Response
  ): Promise<Response> {
    return res.status(404).send({
      errors: {
        server: "RESOURCE_NOT_FOUND",
      },
    });
  }

  public static async sendResourceNotObjectId(
    res: Response
  ): Promise<Response> {
    return res.status(451).send({
      errors: {
        server: "RESOURCE_NOT_OBJECT_ID",
      },
    });
  }

  public static isValidObjectId(id: string) {
    return mongoose.isValidObjectId(id);
  }
}
