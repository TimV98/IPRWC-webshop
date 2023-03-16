import {Component} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/Order";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent {


  constructor() {
  }
}
