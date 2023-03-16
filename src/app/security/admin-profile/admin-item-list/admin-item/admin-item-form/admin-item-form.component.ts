import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../models/Product.model";
import {ProductService} from "../../../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpSentEvent} from "@angular/common/http";

@Component({
  selector: 'app-admin-item-form',
  templateUrl: './admin-item-form.component.html',
  styleUrls: ['./admin-item-form.scss']
})
export class AdminItemFormComponent implements OnInit {

  product: Product = this.productService.product;
  idPresent: boolean = false;
  id: number;
  productForm: FormGroup
  submitted: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.hasId();
    if (this.idPresent) {
      this.productService.getProduct(this.id).subscribe(data => {
        this.product = this.productService.product = data;

        if (this.idPresent) {
          this.productForm = new FormGroup({
            product_name: new FormControl(this.product.product_name, [Validators.required, Validators.nullValidator]),
            price: new FormControl(this.product.price, [Validators.required, Validators.nullValidator]),
            product_rating: new FormControl(this.product.product_rating, [Validators.required, Validators.nullValidator]),
            description: new FormControl(this.product.description, [Validators.required, Validators.nullValidator]),
          })
          this.productForm.value.product_name = data.product_name;
          this.productForm.value.price = data.price;
          this.productForm.value.product_rating = data.product_rating;
          this.productForm.value.description = data.description;
        }
      })
    } else {
      this.productForm = new FormGroup({
        product_name: new FormControl(),
        price: new FormControl(),
        product_rating: new FormControl(),
        description: new FormControl(),
        image: new FormControl()
      })
    }
  }

  hasId() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      if (this.id) {
        return this.idPresent = true;
      }
      return this.idPresent = false;
    })
  }

  submitForm() {
    this.submitted = true;
    this.product.product_name = this.productForm.value.product_name;
    this.product.price = this.productForm.value.price;
    this.product.product_rating = this.productForm.value.product_rating;
    this.product.description = this.productForm.value.description;
    if (this.idPresent) {
      this.productService.editProduct(this.id, this.product).subscribe({next: (product) => {
        this.toastr.success("Your product has been added!", "Product added")
        this.router.navigate(['/admin/products'])
      },
        error: (e) => {
        if(e.status == 500){
          this.toastr.error("Something went wrong!", "Error")
        }
        }});
    } else {
      this.productService.addProduct(this.product).subscribe({next:() => {
        this.toastr.success("Your product has been added!", "Product added")
        this.router.navigate(['/admin/products'])
      },
      error: (err) => {
      if (err.status == 500){
        this.toastr.error("Something went wrong!", "Error")
      }}
      });
    }
  }
}
