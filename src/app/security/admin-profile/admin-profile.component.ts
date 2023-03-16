import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {


  constructor(private userService: UserService, private productService: ProductService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.userService.users = data;
    })
    this.productService.getAllProducts().subscribe((data: any) => {
      this.productService.products = data;
    })
  }

}
