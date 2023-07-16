import { Component, OnInit } from '@angular/core';
import { Stock } from '../_models/stock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../_models/article';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-followed-stocks',
  templateUrl: './followed-stocks.component.html',
  styleUrls: ['./followed-stocks.component.scss']
})
export class FollowedStocksComponent implements OnInit {
  http: HttpClient
  stocks: Array<Stock>
  snackBar: MatSnackBar
  
  constructor(http: HttpClient, snackBar: MatSnackBar) {
    this.http = http
    this.stocks = []
    this.snackBar = snackBar
  }

  ngOnInit(): void {

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


  public getPositives(articles:Array<Article>) : number {
    return articles.filter(x => x.sentiment == 'positive').length
  }

  public getNegatives(articles:Array<Article>) : number {
    return articles.filter(x => x.sentiment == 'negative').length
  }

  public getNeutrals(articles:Array<Article>) : number {
    return articles.filter(x => x.sentiment == 'neutral').length
  }

  public unfollow(stock: Stock) : void{
    if(stock.uid === '' || stock.uid === null)
      return

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .delete(
        'https://localhost:7218/LikedStock/' + stock.uid,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Unfollowing was successful!", "Close", { duration: 5000 })
          const idx = this.stocks.indexOf(stock)
          this.stocks.splice(idx, 1)
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )
  }

}
