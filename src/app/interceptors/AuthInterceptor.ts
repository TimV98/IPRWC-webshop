import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token')

    req = req.clone({
      withCredentials: true,
    })

    if (token) {
      req = req.clone({
        withCredentials: true,
        setHeaders: {'Authorization': `Bearer ${token}`}
      })

    }

    return next.handle(req)


  }
}
