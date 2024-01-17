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
      const parsedToken: {
        sub: string,
        iat: number,
        exp: number,
        roles: string[]
      } = this.auth.parseToken(token)
      const adminRole: string | undefined = parsedToken.roles.find((role: string) => role === "ROLE_ADMIN")
      if (adminRole) {
        return true
      }
    }
    this.auth.sendLoginStatus(false)
    // this.auth.sendAdmin()
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')

    if (token)
      // if (this.auth.decryptRoles(localStorage.getItem('role')!) === "ROLE_ADMIN" && token)
      return true


    return false;
  }

}
