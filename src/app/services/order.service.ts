import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/Order";

const ORDER_API: string = "http://localhost:8080/api/orders/";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orders: Order[] = []
  private _order: Order = new Order();


  constructor(private http: HttpClient) {
  }

  getOrdersFromUser() {
    return this.http.get<Order[]>(ORDER_API + 'getAll')
  }

  getOrderFromUser(id: number) {
    return this.http.get<Order>(ORDER_API + 'get/' + id)
  }

  get orders(): Order[] {
    return this._orders;
  }

  set orders(value: Order[]) {
    this._orders = value;
  }

  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }
}
