import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  getIsAdmin(): string | null {
    return localStorage.getItem('isAdmin')
  }

  Mustmatch(password: any, passwordConfirmation: any) {
    return(formgroup: FormGroup) => {
      const passwordControl = formgroup.controls[password]
      const passwordConfirmationControl = formgroup.controls[passwordConfirmation]
      if (passwordConfirmationControl.errors && !passwordConfirmationControl.errors['Mustmatch']) {
        return;
      }
      if (passwordControl.value !== passwordConfirmationControl.value) {
        passwordConfirmationControl.setErrors({ Mustmatch: true })
      } else {
        passwordConfirmationControl.setErrors(null)
      }
    }
  }

}
