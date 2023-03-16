import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-admin-user-item',
  templateUrl: './admin-user-item.component.html',
  styleUrls: ['./admin-user-item.component.scss']
})
export class AdminUserItemComponent {

  @Input() user: User = this.userService.user;
  @Output() userDeletedEmitter = new EventEmitter<any>()


  constructor(private userService: UserService) {
  }


  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.userDeletedEmitter.emit(this.user)
    });
  }
}
