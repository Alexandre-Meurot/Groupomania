import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  private token = localStorage.getItem('token')
  private isAdmin = localStorage.getItem('isAdmin')

  getToken(): string | null {
    return this.token
  }

  getIsAdmin(): string | null {
    return this.isAdmin
  }

}
