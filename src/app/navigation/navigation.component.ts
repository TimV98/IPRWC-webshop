import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private userService: UserService, private auth: AuthService) {
  }

  isLoggedIn: boolean;
  isAdmin: boolean

  user: User = this.userService.user;

  userLoggedIn() {
    return this.auth.getLoginStatus().subscribe(value => this.isLoggedIn = value)
  }

  checkIsAdmin(){
    return this.auth.getAdmin().subscribe(value => this.isAdmin = value)
  }

  logout() {
    this.auth.logout();
    this.auth.userIsLoggedIn();
    this.isAdmin = false;
  }

  ngOnInit() {
    this.userLoggedIn()
    this.checkIsAdmin()
  }
}



