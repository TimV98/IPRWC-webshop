import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Order} from "../../../../../models/Order";
import {OrderService} from "../../../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent {

  @Input() order: Order = this.orderService.order;
  orderObservable: Observable<Order>


  constructor(private orderService: OrderService,) {
  }

  ngOnInit() {
    this.orderService.order = this.order;
  }


}
