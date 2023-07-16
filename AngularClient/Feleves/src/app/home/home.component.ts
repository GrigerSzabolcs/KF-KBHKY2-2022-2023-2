import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from '../_models/article';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FollowModel } from '../_models/followmodel';
import { Stock } from '../_models/stock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  http: HttpClient
  articles: Array<Article>
  snackBar: MatSnackBar
  stocks: Array<Stock>
  
  constructor(http: HttpClient, snackBar: MatSnackBar) {
    this.http = http
    this.articles = []
    this.stocks = []
    this.snackBar = snackBar
  }

  ngOnInit(): void {
    this.http
    .get<Array<Article>>('https://localhost:7218/Article')
    .subscribe(resp => {
      resp.map(x => {
        let s = new Article()
        s.uid = x.uid
        s.ticker = x.ticker
        s.title = x.title
        s.link = x.link
        s.date = x.date
        s.source = x.source
        s.sentiment = x.sentiment
        s.stockId = x.stockId
        this.articles.push(s)
      })
      console.log(this.articles)
    })


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })

    this.http
    .get<Array<Stock>>('https://localhost:7218/LikedStock', { headers: headers })
    .subscribe(resp => {
      resp.map(x => {
        let s = new Stock()
        s.uid = x.uid
        s.symbol = x.symbol
        s.companyName = x.companyName
        s.photoUrl = x.photoUrl
        s.articles = x.articles
        this.stocks.push(s)
      })
      console.log(this.stocks)
    })
  }

  public follow(id: string) : void {

    let followmodel = new FollowModel();
    followmodel.stockId = id

    if(followmodel.stockId === '' || followmodel.stockId === null)
      return
    console.log(followmodel)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .post(
        'https://localhost:7218/LikedStock' , followmodel ,
        { headers: headers }
        
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Following was successful!", "Close", { duration: 5000 })
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )
  }

  public isFollowed(stockId: string) : boolean {
    return this.stocks.some(x => x.uid == stockId)
  }

}
