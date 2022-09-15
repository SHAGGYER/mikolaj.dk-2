import HttpClient from "../HttpClient";
import { IMedia } from "models/IMedia";

export class Media {
  getMedia = async () => {
    const { data } = await HttpClient().get<IMedia[]>("/api/media");
    return data;
  };
}
