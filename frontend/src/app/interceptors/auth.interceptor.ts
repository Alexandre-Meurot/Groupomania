import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${token}`)
    const modifiedReq = req.clone({ headers });
    return next.handle(modifiedReq);
  }
}
