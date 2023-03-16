import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/user.service";
import {User} from "../../../../../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
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
              firstName: new FormControl(this.user.firstName),
              prefix: new FormControl(this.user.prefix),
              lastName: new FormControl(this.user.lastName),
              street: new FormControl(this.user.street),
              houseNumber: new FormControl(this.user.houseNumber),
              zipCode: new FormControl(this.user.zipCode),
              place: new FormControl(this.user.place),
              phoneNumber: new FormControl(this.user.phoneNumber)
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
