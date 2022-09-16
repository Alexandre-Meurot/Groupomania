import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {catchError, Observable, of, Subscription, tap} from "rxjs";

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

  loginUser(email: string, password: string): Subscription {
    return this.http.post<User>('http://localhost:3000/api/user/login', { email, password })
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token)
          this.router.navigate(['home'])
        }
      )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !!token;
  }

  getUserById(userId: number): Observable<User | undefined> {
    return this.http.get<User>(`http://localhost:3000/api/user/${userId}`).pipe(
      tap((user) => console.log(user)),
      catchError((error) => {
        console.log(error);
        return of(undefined)
      })
    )
  }

}
