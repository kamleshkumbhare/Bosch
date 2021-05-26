import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  endpoints : string = "user/login";
  
  constructor(private http:HttpClient) { }
  
  login(auth:any) : Observable <any> {
    console.log(environment.basePath + this.endpoints,auth );
    return this.http.post(environment.basePath + this.endpoints,auth )
    
  }
  

}

