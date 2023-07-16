import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/user';
import { UserIdModel } from '../_models/useridmodel';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit{

  http: HttpClient
  snackBar: MatSnackBar
  users: Array<User>
  
  constructor(http: HttpClient, snackBar: MatSnackBar) {
    this.http = http
    this.users = []
    this.snackBar = snackBar
  }


  ngOnInit(): void {
    this.http
    .get<Array<User>>('https://localhost:7218/Auth/GetUsers')
    .subscribe(resp => {
      resp.map(x => {
        let s = new User()
        s.id = x.id
        s.userName = x.userName
        s.firstName = x.firstName
        s.lastName = x.lastName
        s.email = x.email
        s.roles= x.roles
        this.users.push(s)
      })
      console.log(this.users)
    })
  }

  public isAdmin(user: User) : boolean {
    return user.roles.includes('Admin')
  }

  public isAnnotator(user: User) : boolean {
    return user.roles.includes('Labeler')
  }

  public giveAdmin(user: User) : void{
    let uidm = new UserIdModel()
    uidm.id = user.id
    if(uidm.id === '' || uidm.id === null)
      return
    console.log(uidm)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .post(
        'https://localhost:7218/Auth/GrantAdmin' , uidm ,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Admin right was successfully granted!", "Close", { duration: 5000 })
          window.location.reload()
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )

  }

  public giveAnnotator(user: User) : void{
    let uidm = new UserIdModel()
    uidm.id = user.id
    if(uidm.id === '' || uidm.id === null)
      return
    console.log(uidm)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .post(
        'https://localhost:7218/Auth/GrantAnnotator' , uidm ,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Annotator right was successfully granted!", "Close", { duration: 5000 })
          window.location.reload()
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )

  }

  public removeAdmin(user: User) : void{
    let uidm = new UserIdModel()
    uidm.id = user.id
    if(uidm.id === '' || uidm.id === null)
      return
    console.log(uidm)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .post(
        'https://localhost:7218/Auth/RemoveAdmin' , uidm ,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Admin right was successfully removed!", "Close", { duration: 5000 })
          window.location.reload()
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )

  }

  public removeAnnotator(user: User) : void{
    let uidm = new UserIdModel()
    uidm.id = user.id
    if(uidm.id === '' || uidm.id === null)
      return
    console.log(uidm)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .post(
        'https://localhost:7218/Auth/RemoveAnnotator' , uidm ,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Annotator right was successfully removed!", "Close", { duration: 5000 })
          window.location.reload()
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )

  }

}
