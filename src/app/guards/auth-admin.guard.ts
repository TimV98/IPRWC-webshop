import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')

    if (token) {
      console.log(this.auth.decryptRole(localStorage.getItem('role')!) === "ROLE_ADMIN")

      if (this.auth.decryptRole(localStorage.getItem('role')!) === "ROLE_ADMIN" && token) {
        return true
      }
    }

    this.auth.sendLoginStatus(false)
    this.auth.sendAdmin()
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')

    if (token) {

      if (this.auth.decryptRole(localStorage.getItem('role')!) === "ROLE_ADMIN" && token) {
        return true
      }
    }
    this.auth.sendAdmin()
    return false;
  }

}
