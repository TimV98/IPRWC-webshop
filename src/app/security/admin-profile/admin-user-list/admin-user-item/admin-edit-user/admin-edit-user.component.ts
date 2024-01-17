import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/user.service";
import {User} from "../../../../../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  user: User = this.userService.user;

  userForm: FormGroup;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.userService.getUser(data['id'])
        .subscribe({
          next: data => {
            this.user = this.userService.user = data
            this.userForm = new FormGroup({
              firstName: new FormControl(this.user.firstName, Validators.required),
              prefix: new FormControl(this.user.prefix),
              lastName: new FormControl(this.user.lastName, Validators.required),
              street: new FormControl(this.user.street, Validators.required),
              houseNumber: new FormControl(this.user.houseNumber, Validators.required),
              zipCode: new FormControl(this.user.zipCode,
                [Validators.required, Validators.pattern(/^\d{4}\s?\w{2}$/)]),
              place: new FormControl(this.user.place, Validators.required),
              phoneNumber: new FormControl(this.user.phoneNumber,
                [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/)])
            })
          }
        })
    })
  }


  editUser() {
    this.user.firstName = this.userForm.value.firstName;
    this.user.prefix = this.userForm.value.prefix;
    this.user.lastName = this.userForm.value.lastName;
    this.user.street = this.userForm.value.street;
    this.user.houseNumber = this.userForm.value.houseNumber;
    this.user.place = this.userForm.value.place;
    this.user.zipCode = this.userForm.value.zipCode;
    this.user.phoneNumber = this.userForm.value.phoneNumber;
    this.userService.editUser(this.user).subscribe({
      next: () => {
        this.toastr.success("User has been edited!", "User Edited!")
        this.router.navigate(['./'])
      }, error: (err) => {
        if (err.status == 500) {
          this.toastr.error("Something went wrong!", "Error")
        }
      }
    });
  }
}
