import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from "./products.component";
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductItemComponent} from "./product-item/product-item.component";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductAddComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule

  ]
})
export class ProductModule {
}
