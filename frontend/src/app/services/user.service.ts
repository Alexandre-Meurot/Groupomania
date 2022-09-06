import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router) {}

  createUser(newUser: User): Observable<object> {
    return this.http.post('http://localhost:3000/api/user/signup', newUser)
  }

  loginUser(email: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/api/user/login', { email, password })
  }

}
