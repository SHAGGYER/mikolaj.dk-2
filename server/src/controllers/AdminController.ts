import AppSettings, { IAppSettings } from "../models/AppSettings";

export class AdminController {
  public static async updateYoutubeViews(req, res) {
    const settings = await AppSettings.findOne();
    if (!settings) return res.sendStatus(500);
    settings.youtubeViews = req.body.youtubeViews;
    settings.save();

    res.sendStatus(204);
  }

  public static async updateHomepageHeaderImage(req, res) {
    const settings = await AppSettings.findOne();
    if (!settings) return res.sendStatus(500);
    settings.homepageHeaderImage = req.body.homepageHeaderImage;
    settings.save();

    res.sendStatus(204);
  }

  public static async updateHomepageAboutPlatformImage(req, res) {
    const settings = await AppSettings.findOne();
    if (!settings) return res.sendStatus(500);
    settings.homepageAboutPlatformImage = req.body.image;
    settings.save();

    res.sendStatus(204);
  }

  public static async updateHomepageHireImage(req, res) {
    const settings = await AppSettings.findOne();
    if (!settings) return res.sendStatus(500);
    settings.homepageHireImage = req.body.image;
    settings.save();

    res.sendStatus(204);
  }

  public static async updateAvailableForWork(req, res) {
    const settings = await AppSettings.findOne();
    if (!settings) return res.sendStatus(500);
    settings.availableForWork = req.body.availableForWork;
    settings.save();

    res.sendStatus(204);
  }
}
