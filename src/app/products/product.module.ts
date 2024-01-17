import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from "./products.component";
import {ProductItemComponent} from "./product-item/product-item.component";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {
  ShoppingCartItemComponent
} from "../shopping-cart/shopping-cart-list/shopping-cart-item/shopping-cart-item.component";
import {ShoppingCartListComponent} from "../shopping-cart/shopping-cart-list/shopping-cart-list.component";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    ShoppingCartListComponent,
  ],
  imports: [
    CommonModule

  ]
})
export class ProductModule {
}
