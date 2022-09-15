import mongoose, { Document } from "mongoose";

export interface IAppSettings extends Document {
  oauthServerUrl: string;
  oauthClientId: string;
  oauthClientSecret: string;
  appName: string;
  homepageHeaderImage: string;
  homepageAboutPlatformImage?: string;
  homepageHireImage?: string;
  availableForWork: boolean;
  youtubeViews: number;
}

const AppSettingsSchema = new mongoose.Schema<IAppSettings>(
  {
    oauthServerUrl: String,
    oauthClientId: String,
    oauthClientSecret: String,
    appName: String,
    homepageHeaderImage: String,
    homepageAboutPlatformImage: String,
    homepageHireImage: String,
    availableForWork: Boolean,
    youtubeViews: Number,
  },
  { timestamps: true }
);

const AppSettings = mongoose.model<IAppSettings>(
  "AppSettings",
  AppSettingsSchema,
  "app_settings"
);
export default AppSettings;
