import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";


const USER_API = 'http://localhost:8080/api/user/';


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
    return this.http.put(USER_API + 'edit', user)

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
