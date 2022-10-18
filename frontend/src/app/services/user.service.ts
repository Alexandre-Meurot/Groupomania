import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {catchError, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiBaseUrl = environment.apiBaseUrl

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  createUser(newUser: User): Observable<object> {
    return this.http.post(`${ this.apiBaseUrl }/api/user/signup`, newUser)
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${ this.apiBaseUrl }/api/user/login`, { email, password })
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
    return this.http.get<User>(`${ this.apiBaseUrl }/api/user/${userId}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined)
      })
    )
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ this.apiBaseUrl }/api/user/userlist`)
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['authentification'])
    window.location.reload()
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${ this.apiBaseUrl }/api/user/${userId}`)
  }

  updateUser(user: FormData): Observable<User | any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${ this.apiBaseUrl }/api/user/${this.getUserId()}`, user, httpOptions).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined)
      })
    )
  }

}
