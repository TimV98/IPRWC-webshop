import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SingupRequest} from "../../models/SingupRequest";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  signupReq: SingupRequest = new SingupRequest();


  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl(null, Validators.required),
      prefix: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      zipCode: new FormControl(null,
        [Validators.pattern(/^\d{4}\s?\w{2}$/), Validators.required]),
      place: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null,
        [Validators.pattern(/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/),
          Validators.required])
    })

  }

  register() {
    this.signupReq.email = this.registerForm.value.email;
    this.signupReq.password = this.registerForm.value.password;
    this.signupReq.firstName = this.registerForm.value.firstName;
    this.signupReq.prefix = this.registerForm.value.prefix;
    this.signupReq.lastName = this.registerForm.value.lastName;
    this.signupReq.street = this.registerForm.value.street;
    this.signupReq.houseNumber = this.registerForm.value.houseNumber;
    this.signupReq.zipCode = this.registerForm.value.zipCode;
    this.signupReq.place = this.registerForm.value.place
    this.signupReq.phoneNumber = this.registerForm.value.phoneNumber;
    this.auth.registerUser(this.signupReq).subscribe({
      next: () => {
        this.toastr.success("Registrated!", "User Registered!")
        this.router.navigate(['/login'])
      }, error: (err) => {
        if (err.status == 500) {
          this.toastr.error("Something went wrong!", "Error")
        }
      }
    });

  }
}
