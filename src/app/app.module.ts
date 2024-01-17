import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {
  ShoppingCartItemComponent
} from './shopping-cart/shopping-cart-list/shopping-cart-item/shopping-cart-item.component';
import {ShoppingCartListComponent} from './shopping-cart/shopping-cart-list/shopping-cart-list.component';
import {ProductModule} from "./products/product.module";
import {AuthenticationModule} from "./security/authentication.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    AuthenticationModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
