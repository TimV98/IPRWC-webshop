import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/Product.model";

@Component({
  selector: 'app-admin-item-list',
  templateUrl: './admin-item-list.component.html',
  styleUrls: ['./admin-item-list.component.scss']
})
export class AdminItemListComponent implements OnInit {

  products: Product[] = this.productService.products

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = this.productService.products = data;
    });
  }

  constructor(private productService: ProductService) {
  }


  deleteProduct(product: Product) {
    let index = this.products.indexOf(product)
    this.products.splice(index, 1);

  }
}
