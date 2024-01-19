import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShoppingCartItem} from "../../models/ShoppingCartItem";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent {

  shoppingCart: ShoppingCartItem[] = this.shoppingCartService.shoppingCart;
  indexItem: number;


  constructor(private shoppingCartService: ShoppingCartService) {
  }

  checkQuantity(index: number) {
    if (this.shoppingCart.at(index)!.quantity === 0) {
      this.shoppingCart.splice(index, 1)
      if (this.shoppingCart.length <= 0) {
        this.shoppingCartService.sendCartStatus(true);
      }
    }
  }
}
