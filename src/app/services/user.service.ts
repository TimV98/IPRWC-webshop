import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {environment} from "../../environments/environment.prod";


const USER_API = environment.API_URL + environment.USER;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User = new User();

  private _users: User[];

  constructor(private http: HttpClient) {
  }

  getUserProfile() {
    return this.http.get(USER_API + 'info')
  }

  getAllUsers() {
    return this.http.get(USER_API + 'all')
  }

  getUser(id: number) {
    return this.http.get(USER_API + 'get/' + id)
  }


  editUser(user: User) {
    return this.http.put(USER_API + 'edit/me', user)

  }

  adminEditUser(user: User) {
    return this.http.put(USER_API + 'edit/' + user.id, user)

  }

  deleteUser(id: number) {
    return this.http.delete(USER_API + 'delete/' + id)
  }

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

}
