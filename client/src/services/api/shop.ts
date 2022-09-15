import { IShopProduct } from "models/IShopProduct";
import HttpClient from "services/HttpClient";

export class Shop {
  public getLatestProducts = async () => {
    const { data } = await HttpClient().get<IShopProduct[]>(
      "/api/shop/products/latest"
    );
    return data;
  };
}
