import {IAppSettings} from "models/IAppSettings";
import {IUser} from "models/IUser";
import HttpClient from "../HttpClient";
import {IAuthSettings} from "models/IAuthSettings";


export class Auth {
  init = async (githubToken) => {
    try {
      const {data} = await HttpClient().get<{
        user: IUser;
        settings: IAppSettings;
        installed: boolean;
        authSettings: IAuthSettings;
      }>("/api/auth/init" + (githubToken ? "?githubToken=" + githubToken : ""));
      return data;
    } catch (e) {
      throw e;
    }
  };
}