import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  user: User = this.userService.user;

  profileForm: FormGroup

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data: User) => {
        this.user = this.userService.user = data;
        this.profileForm = new FormGroup({
          firstName: new FormControl(this.user.firstName, Validators.required),
          prefix: new FormControl(this.user.prefix),
          lastName: new FormControl(this.user.lastName, Validators.required),
          street: new FormControl(this.user.street, Validators.required),
          houseNumber: new FormControl(this.user.houseNumber, Validators.required),
          zipCode: new FormControl(this.user.zipCode,
            [Validators.pattern(/^\d{4}\s?\w{2}$/), Validators.required]),
          place: new FormControl(this.user.place, Validators.required),
          phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required,
            Validators.pattern(/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/)])
        })

        this.profileForm.value.firstName = data.firstName;
        this.profileForm.value.prefix = data.prefix;
        this.profileForm.value.lastName = data.lastName;
        this.profileForm.value.street = data.street;
        this.profileForm.value.place = data.place;
        this.profileForm.value.zipCode = data.zipCode;
        this.profileForm.value.phoneNumber = data.phoneNumber;
      }
    )
  }

  editProfile() {
    this.user.firstName = this.profileForm.value.firstName;
    this.user.prefix = this.profileForm.value.prefix;
    this.user.lastName = this.profileForm.value.lastName;
    this.user.street = this.profileForm.value.street;
    this.user.houseNumber = this.profileForm.value.houseNumber;
    this.user.place = this.profileForm.value.place;
    this.user.zipCode = this.profileForm.value.zipCode;
    this.user.phoneNumber = this.profileForm.value.phoneNumber;
    this.userService.editUser(this.user).subscribe(()=>{
      this.toastr.success("Your profile has been edited", "Profile edited")
      this.router.navigate(['/profile'])
    },(error)=>{
      if (error.status == 400 || error.status == 500 ){
        this.toastr.error("Something went wrong!","Error")
      }
    });

  }
}
