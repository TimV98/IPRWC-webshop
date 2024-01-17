import {Injectable} from '@angular/core';
import {Product} from "../models/Product.model";
import {Order} from "../models/Order";
import {HttpClient} from "@angular/common/http";
import {ShoppingCartItem} from "../models/ShoppingCartItem";
import {UserService} from "./user.service";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment.prod";


const ORDER_API: string = environment.API_URL + environment.ORDERS;

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private _shoppingCart: ShoppingCartItem[] = []

  private _cartItem: ShoppingCartItem;

  order: Order;

  isCartEmpty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private userService: UserService) {
  }

  sendCartStatus(value: boolean) {
    this.isCartEmpty.next(value);
  }

  getCartStatus() {
    return this.isCartEmpty.asObservable()
  }

  convertProductToCartItem(product: Product) {
    this._cartItem = new ShoppingCartItem();
    this._cartItem.product_name = product.product_name;
    this._cartItem.quantity = 1;
    this._cartItem.price = product.price;
    this._shoppingCart.push(this._cartItem);
    if (this.isCartEmpty)
      this.sendCartStatus(false);
  }

  createOrder() {
    this.order = new Order();
    this.order.order.products = this._shoppingCart;
  }

  postOrder() {
    this.createOrder()
    return this.http.post(ORDER_API + 'add', this.order)
  }

  deleteOrder(id: number) {
    return this.http.delete(ORDER_API + 'delete/' + id)
  }

  get shoppingCart(): ShoppingCartItem[] {
    return this._shoppingCart;
  }

  set shoppingCart(value: ShoppingCartItem[]) {
    this._shoppingCart = value;
  }

  get cartItem(): ShoppingCartItem {
    return this._cartItem;
  }

  set cartItem(value: ShoppingCartItem) {
    this._cartItem = value;
  }
}
