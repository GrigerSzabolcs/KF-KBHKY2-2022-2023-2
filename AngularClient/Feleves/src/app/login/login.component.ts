import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from '../_models/loginmodel';
import { TokenModel } from '../_models/tokenmodel';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  router: Router
  http: HttpClient
  email: FormControl
  snackBar: MatSnackBar
  loginModel: LoginModel
  
  constructor(http:HttpClient, snackBar:MatSnackBar, router:Router) {
    this.snackBar = snackBar
    this.http = http
    this.router = router
    this.loginModel = new LoginModel()
    this.email = new FormControl('', [Validators.required, Validators.email])
  }

  public sendLoginCredentials() : void {
    this.http
    .post<TokenModel>("https://localhost:7218/Auth/Login", this.loginModel)
    .subscribe(
      (success) => {
        localStorage.setItem('web-token', success.token)
        localStorage.setItem('web-token-expiration', success.expiration.toString())
        console.log(success)
        this.router.navigate(['/home'])
        this.saveRoles()
      },
      (error) => {
        this.snackBar.open(error.message, "Close", { duration: 5000 })
      })
  }

  public asd() : void{
    let array = new Array<string>
    let string = JSON.stringify(array)
    localStorage.setItem("key", string)
    let retString = localStorage.getItem("key")
    if(retString != null)
      {let retArray = JSON.parse(retString)}
  }

  public saveRoles() : void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
    .get<User>('https://localhost:7218/Auth/GetUserInfos', { headers: headers })
    .subscribe(u => {
        localStorage.setItem('userRoles', JSON.stringify(u.roles))
        let retString = localStorage.getItem("userRoles")
    })
  }

  public checkInputs() : boolean {
    return this.loginModel.username !== '' && this.loginModel.password !== ''
  }

}
