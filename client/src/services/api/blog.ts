import HttpClient from "../HttpClient";

export class Blog {
  createBlogEntry = async (blogEntry: FormData) => {
    await HttpClient().post<void>("/api/blog/create-entry", blogEntry);
  };

  updateBlogEntry = async (id: string, blogEntry: FormData) => {
    await HttpClient().put<void>("/api/blog/update-entry/" + id, blogEntry);
  };
}
