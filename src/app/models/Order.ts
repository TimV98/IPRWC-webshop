import {ShoppingCartItem} from "./ShoppingCartItem";

export class Order {
  order: {
    id?: number;
    products?: ShoppingCartItem[];
  }

}
