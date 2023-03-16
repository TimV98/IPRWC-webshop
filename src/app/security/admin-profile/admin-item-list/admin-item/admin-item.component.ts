import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/Product.model";
import {ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.scss']
})
export class AdminItemComponent {

  @Input() product: Product = this.productService.product;
  @Output() deleteProductEmitter = new EventEmitter<any>();

  constructor(private productService: ProductService) {
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.deleteProductEmitter.emit(this.product);
      }
    )


  }
}
