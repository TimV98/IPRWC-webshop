import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginCredentials} from "../models/LoginCredentials";
import {SingupRequest} from "../models/SingupRequest";
import * as CryptoJS from 'crypto-js';
import {Router} from "@angular/router";

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false)

  private isAdmin = new BehaviorSubject<boolean>(false)

  failedLogin: boolean;

  private _role: string;

  key: string = "secretKey";

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
    this.sendAdmin();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  userIsLoggedIn() {
    if (localStorage.getItem('authToken')) {
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


  sendAdmin() {
    if (this.decryptRole(localStorage.getItem('role')!) === "ROLE_ADMIN") {
      this.isAdmin.next(true);
    } else {
      this.isAdmin.next(false)
    }
  }

  getAdmin() {
    return this.isAdmin.asObservable()
  }

  encryptRole(text: string) {
    return CryptoJS.AES.encrypt(text, this.key).toString()
  }

  decryptRole(text: string) {
    return CryptoJS.AES.decrypt(text, this.key).toString(CryptoJS.enc.Utf8)
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
}
