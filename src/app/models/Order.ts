import {ShoppingCartItem} from "./ShoppingCartItem";
import {User} from "./User";

export class Order {
  id?: number;
  products?: ShoppingCartItem[];
  user?: User;
}
