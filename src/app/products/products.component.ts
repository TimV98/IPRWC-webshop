import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../models/Product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  public products: Product[] = this.productService.products;

  constructor(private productService: ProductService) {
  }


  ngOnInit() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = this.productService.products = products;
    });

  }
}
