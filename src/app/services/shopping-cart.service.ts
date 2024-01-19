import {Injectable} from '@angular/core';
import {Product} from "../models/Product.model";
import {Order} from "../models/Order";
import {HttpClient} from "@angular/common/http";
import {ShoppingCartItem} from "../models/ShoppingCartItem";
import {UserService} from "./user.service";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {CartOrder} from "../models/CartOrder";
import {ToastrService} from "ngx-toastr";


const ORDER_API: string = environment.API_URL + environment.ORDERS;

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private _shoppingCart: ShoppingCartItem[] = []

  private _cartItem: ShoppingCartItem;

  order: CartOrder;

  isCartEmpty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private toastr: ToastrService) {
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
    if (this._shoppingCart.find(item => item.product_name === this._cartItem.product_name)){
      this.toastr.error("Product already added to shopping cart!", "Product not added", {timeOut: 1000})
    }
    else {
      this._shoppingCart.push(this._cartItem);
      this.toastr.success("Product added to shopping cart!", "Product added", {timeOut: 1000})
    }

    if (this._shoppingCart.length >= 1)
      this.sendCartStatus(false);
  }

  createOrder() {
    this.order = new CartOrder()
    this.order.products = this._shoppingCart;
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
