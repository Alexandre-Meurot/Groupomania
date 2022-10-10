import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {catchError, Observable, of, tap} from "rxjs";

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

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<User>('http://localhost:3000/api/user/login', { email, password })
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

  getUserById(userId: number): Observable<User|any> {
    return this.http.get<User>(`http://localhost:3000/api/user/${userId}`).pipe(
      tap((user) => console.table(user)),
      catchError((error) => {
        console.log(error);
        return of(undefined)
      })
    )
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['authentification'])
    window.location.reload()
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`http://localhost:3000/api/user/${userId}`)
  }

  updateUser(user: FormData): Observable<User | any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`http://localhost:3000/api/user/${this.getUserId()}`, user, httpOptions).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return of(undefined)
      })
    )
  }

}
