import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginCredentials} from "../models/LoginCredentials";
import {SingupRequest} from "../models/SingupRequest";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment.prod";

const AUTH_API =  environment.API_URL + environment.AUTH;

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private isLoggedInSubject = new BehaviorSubject<boolean>(false)

  private _isAdmin = new BehaviorSubject<boolean>(false)

  failedLogin: boolean;

  private _roles: string[];


  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(loginCredentials: LoginCredentials) {
    return this.http.post<any>(
      AUTH_API + 'login',
      loginCredentials,
    )
  }

  registerUser(signUpReq: SingupRequest) {
    return this.http.post(
      AUTH_API + 'register',
      signUpReq,
    );
  }

  logout() {
    this.sendLoginStatus(false)
    this.isAdmin;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  userIsLoggedIn() {
    if (localStorage.getItem('token')) {
      this.sendLoginStatus(true)
    } else {
      this.sendLoginStatus(false)
    }
  }


  sendLoginStatus(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  getLoginStatus() {
    return this.isLoggedInSubject.asObservable();
  }


  getAdmin() {
    return this._isAdmin.asObservable()
  }

 parseToken(token:string){
   return JSON.parse(window.atob((token.split('.')[1])))
 }


  get roles(): string[] {
    return this._roles;
  }

  set roles(value: string[]) {
    this._roles = value;
  }

  get isAdmin(): BehaviorSubject<boolean> {
    return this._isAdmin;
  }

  set isAdmin(value: BehaviorSubject<boolean>) {
    this._isAdmin = value;
  }
}
