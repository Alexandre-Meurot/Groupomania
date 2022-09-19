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
          let userId = response.userId.toString()
          localStorage.setItem('token', response.token)
          localStorage.setItem('userId', userId)
          this.router.navigate(['home'])
        }
      )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !!token;
  }

  getUserId() {
    const userId = localStorage.getItem('userId')
    if (userId) {
      return userId
    } else {
      return null
    }
  }

  getUserById(userId: number | null): Observable<User | undefined> {
    return this.http.get<User>(`http://localhost:3000/api/user/${userId}`).pipe(
      tap((user) => console.table(user)),
      catchError((error) => {
        console.log(error);
        return of(undefined)
      })
    )
  }

  // updateUser(user: User): Observable<any> {
  //   return this.http.put<User>(`http://localhost:3000/api/user/${user.userId}`).pipe()
  // }

}
