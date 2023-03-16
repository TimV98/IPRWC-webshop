import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {ProductAddComponent} from "../products/product-add/product-add.component";
import {ProductsComponent} from "../products/products.component";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'addProduct', component: ProductAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
