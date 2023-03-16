import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartSubscription: Subscription;
  isCartEmpty: boolean

  constructor(private shoppingCartService: ShoppingCartService, private router: Router,
              private toastr: ToastrService, private auth: AuthService) {
  }

  placeOrder() {
    this.auth.getLoginStatus().subscribe((val) => {
        if (val) {
          this.shoppingCartService.postOrder().subscribe({
            next: () => {
              this.toastr.success("Order placed!")
            }, error: (e) => {
              if (e.status == 500) {
                this.toastr.error("Order could not be placed.")
              } else {
                this.toastr.error("Something went wrong! Order has not be placed.")
              }
            }
          });
        } else {
          this.toastr.info("You have to register first to be able to place an order")
          this.router.navigate(['/register'])
        }
      }
    )

  }

  ngOnInit() {
    this.cartSubscription = this.shoppingCartService.getCartStatus().subscribe((e) => {
      this.isCartEmpty = e;
    })

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }
}
