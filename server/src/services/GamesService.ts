import { ValidationService } from "./ValidationService"

export class GamesService {
  public static async validateRequest(req) {
    const errors = await ValidationService.run(
      {
        name: [[(val) => !val, "Name is required"]],
        version: [[(val) => !val, "Version is required"]],
        date: [[(val) => !val, "Date is required"]],
        updateUrl: [[(val) => !val, "Update URL is required"]],
        fileName: [[(val) => !val, "File Name is required"]],
      },
      req.body
    );

    return errors;
  }
}
