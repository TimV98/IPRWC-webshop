import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {


  users: User[] = this.userService.users;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  deleteUserFromList(user: User) {
    let index = this.users.indexOf(user)
    this.users.splice(index, 1);
  }
}
