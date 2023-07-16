import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LabeledData } from '../_models/labeleddata';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss']
})
export class AnnotateComponent implements OnInit{
  http: HttpClient
  labeleddatas: Array<LabeledData>
  snackBar:MatSnackBar
  
  constructor(http: HttpClient, snackBar:MatSnackBar) {
    this.http = http
    this.labeleddatas = []
    this.snackBar = snackBar
  }

  ngOnInit(): void {
    this.http
    .get<Array<any>>('https://localhost:7218/Annotation')
    .subscribe(resp => {
      resp.map(x => {
        let s = new LabeledData()
        s.text = x.text
        s.timeline = 'undefined'
        this.labeleddatas.push(s)
      })
      console.log(this.labeleddatas)
    })
  }

  createAnnotation(labeleddata: LabeledData) : void {

    console.log(labeleddata)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('web-token')
    })
    this.http
      .post(
        'https://localhost:7218/Annotation',
        labeleddata,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Annotation was successful!", "Close", { duration: 2000 })
          const idx = this.labeleddatas.indexOf(labeleddata)
          this.labeleddatas.splice(idx, 1)
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 2000 })
        }
      )
    
  }
    

}
