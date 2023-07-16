import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterModel } from '../_models/registermodel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  router: Router
  http: HttpClient
  email: FormControl
  username: FormControl
  lastname: FormControl
  firstname: FormControl
  password: FormControl
  snackBar: MatSnackBar
  registerModel: RegisterModel
  acceptTermsAndConditions: boolean

  constructor(http:HttpClient, snackBar:MatSnackBar, router:Router) {
    this.snackBar = snackBar
    this.http = http
    this.router = router
    this.acceptTermsAndConditions = false
    this.registerModel = new RegisterModel()
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.username = new FormControl('', [Validators.required])
    this.lastname = new FormControl('', [Validators.required])
    this.firstname = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
  }

  public getEmailErrorMessage() : string {
    if (this.email.hasError('required')) {
      return 'You must enter a value!';
    }

    return this.email.hasError('email') ? 'Not a valid email!' : '';
  }
  public getUsernameErrorMessage() : string {
    if (this.username.hasError('required')) {
      return 'You must enter a value!';
    }
    return this.email.hasError('required') ? 'Not a valid username!' : '';
  }
  public getFirstnameErrorMessage() : string {
    if (this.firstname.hasError('required')) {
      return 'You must enter a value!';
    }
    return this.firstname.hasError('required') ? 'Not a valid firstname!' : '';
  }
  public getLastnameErrorMessage() : string {
    if (this.lastname.hasError('required')) {
      return 'You must enter a value!';
    }
    return this.lastname.hasError('required') ? 'Not a valid lastname!' : '';
  }
  public getPasswordErrorMessage() : string {
    if (this.password.hasError('required')) {
      return 'You must enter a value!';
    }
    return this.password.hasError('required') ? 'Not a valid password!' : '';
  }

  public sendRegisterCredentials() : void {
    this.http.put("https://localhost:7218/Auth/InsertUser", this.registerModel)
    .subscribe(
      (success) => {
        this.snackBar
        .open("Registration was successful!", "Close", { duration: 5000 })
        .afterDismissed()
        .subscribe(() => {
          this.router.navigate(['/login'])
        })
      },
      (error) => {
        this.snackBar.open("An error happened, please ty again.", "Close", { duration: 5000 })
      })
  }

}
