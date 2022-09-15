import { IShopCategory } from "./IShopCategory";

export interface IShopProduct {
  _id?: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  quantity: number;
  condition: string;
  category: IShopCategory;
  createdAt?: Date;
  updatedAt?: Date;
}
