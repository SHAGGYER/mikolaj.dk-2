import HttpClient from "../HttpClient";

export class Visitor {
  resetVisitorCount = async () => {
    await HttpClient().post<void>("/api/visitor/reset-visitors", {});
  };
}
