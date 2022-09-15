import HttpClient from "../HttpClient";

export class Autocomplete {
  search = async (searchTerm: string, url: string) => {
    const { data } = await HttpClient().get<object[]>(
      url + "?searchTerm=" + searchTerm
    );

    return data;
  };
}
