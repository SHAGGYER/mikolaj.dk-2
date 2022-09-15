import HttpClient from "./HttpClient";

export default class VisitorService {
  static async registerPageVisit(url) {
    try {
      const { data } = await HttpClient().post(
        "/api/visitor/register-page-visit",
        { url }
      );
      return data;
    } catch (e) {}
  }

  static async updateVisitedPage({
    id,
    url,
    scrolledToBottom = undefined,
    timeOnPage = undefined,
  }: any) {
    await HttpClient().post("/api/visitor/update-visited-page", {
      id,
      url,
      timeOnPage,
      scrolledToBottom,
    });
  }
}
