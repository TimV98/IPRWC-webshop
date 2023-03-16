import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingCartItem} from "../../../models/ShoppingCartItem";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() item: ShoppingCartItem = this.shoppingCartService.cartItem;
  @Output() itemEmitter = new EventEmitter<ShoppingCartItem>();

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  subtractQuantity() {
    this.item.quantity!--;
    this.item.total! -= this.item.price!
    this.itemEmitter.emit(this.item)
  }

  addQuantity() {
    this.item.quantity!++;
    this.item.total! += this.item.price!;
  }

  ngOnInit() {
    this.item.total! = this.item.price!;
  }
}
