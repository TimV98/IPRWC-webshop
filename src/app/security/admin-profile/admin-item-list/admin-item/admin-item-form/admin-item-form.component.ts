import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../models/Product.model";
import {ProductService} from "../../../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

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
            genre: new FormControl(this.product.genre, [Validators.required, Validators.nullValidator]),
            description: new FormControl(this.product.description, [Validators.required, Validators.nullValidator]),
            image: new FormControl(null, [RxwebValidators.extension({extensions: ["jpeg", "png", "jpg"]})])
          })
          this.productForm.value.product_name = data.product_name;
          this.productForm.value.price = data.price;
          this.productForm.value.genre = data.genre;
          this.productForm.value.description = data.description;
          this.productForm.value.image = data.image?.name;
        }
      })
    } else {
      this.productForm = new FormGroup({
        product_name: new FormControl('', [Validators.required, Validators.nullValidator]),
        price: new FormControl('', [Validators.required, Validators.nullValidator]),
        genre: new FormControl('', [Validators.required, Validators.nullValidator]),
        description: new FormControl(''),
        image: new FormControl('', [Validators.required,])
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

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({
        image: file
      });
    }
  }

  submitForm() {
    this.submitted = true;
    this.product.product_name = this.productForm.value.product_name;
    this.product.price = this.productForm.value.price;
    this.product.genre = this.productForm.value.genre;
    this.product.description = this.productForm.value.description;
    const productForm = new FormData();
    productForm.append('image', this.productForm.value.image)
    productForm.append('product', JSON.stringify(this.product))

    if (this.idPresent) {
      this.productService.editProduct(this.id, productForm).subscribe({
        next: () => {

        },
        error: (err) => {
          if (err.status == 500 || err.status == 400) {
            this.toastr.error("Something went wrong!", "Error")
          }
        }
      });
      this.toastr.success("Your product has been edited!", "Product added")
      this.router.navigate(['/admin/products'])
    } else {
      this.productService.addProduct(productForm).subscribe({
        next: () => {
          this.toastr.success("Your product has been added!", "Product added")
          this.router.navigate(['/admin/products'])
        },
        error: (err) => {
          if (err.status == 500 || err.status == 400) {
            this.toastr.error("Something went wrong!", "Error")
          }
        }
      });
    }
  }
}
