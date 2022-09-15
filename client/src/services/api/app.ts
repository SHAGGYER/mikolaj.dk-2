import HttpClient from "../HttpClient";
import { IApp } from "models/IApp";

export class App {
  browseApps = async () => {
    const { data } = await HttpClient().get<IApp[]>("/api/apps/available");
    return data;
  };

  getAppById = async (id: string) => {
    const { data } = await HttpClient().get<IApp>("/api/apps/available/" + id);
    return data;
  };

  getApps = async () => {
    const { data } = await HttpClient().get<IApp[]>("/api/apps");
    return data;
  };

  createApp = async (app: IApp) => {
    await HttpClient().get<void>("/api/apps", app);
  };

  updateApp = async (app: IApp) => {
    await HttpClient().put<void>("/api/apps/" + app._id, app);
  };
}
