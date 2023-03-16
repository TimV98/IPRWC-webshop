import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../models/Order";
import {OrderService} from "../../../../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = this.orderService.orders;

  constructor(private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
  }

}
