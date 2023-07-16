import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    router: Router
    http: HttpClient

    constructor(router: Router, http: HttpClient) {
        this.router = router
        this.http = http
    }

    public isLoggedIn() : boolean {
        let token = localStorage.getItem('web-token')
        // TODO check expiration date etc.
        return token !== null
    }

    public canActivate() : boolean {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }

    
    public isAdmin() : boolean{
        if(this.isLoggedIn()){
            let retString = localStorage.getItem('userRoles')
            if(retString!=null){
                let retArray = JSON.parse(retString)
                return retArray.includes('Admin')
            }
        }
        return false
    }

    public isAnnotator() : boolean{
        if(this.isLoggedIn()){
            let retString = localStorage.getItem('userRoles')
            if(retString!=null){
                let retArray = JSON.parse(retString)
                return retArray.includes('Labeler')
            }
        }
        return false
    }
    

}
