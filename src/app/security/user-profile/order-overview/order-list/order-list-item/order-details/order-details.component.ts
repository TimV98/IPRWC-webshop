import {Component, OnInit} from '@angular/core';
import {ShoppingCartItem} from "../../../../../../models/ShoppingCartItem";
import {Order} from "../../../../../../models/Order";
import {OrderService} from "../../../../../../services/order.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = this.orderService.order;
  orderItems: ShoppingCartItem[] = [];

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderService.getOrderFromUser(Number(params.get('id'))).subscribe((data: Order) => {
        this.order = this.orderService.order = data;
      })
    })
  }
}

