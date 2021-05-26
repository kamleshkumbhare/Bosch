import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  endpoints : string = "user/create";

  constructor(private http : HttpClient,
    private router : Router ) { }

  callAddUser(callAddUser:any) : Observable <any> {
    return this.http.post(environment.basePath + this.endpoints,callAddUser )
  }
}
