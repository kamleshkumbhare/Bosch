import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  endpoints : string = "user";
  role : string ="role"
  
  constructor(
    private http: HttpClient
    ) { }

  callUserList(data: any): Observable<any>{
    return this.http.get(environment.basePath + this.endpoints ,data)
  }

  deleteUserApiCall(id: any): Observable<any>{
    return this.http.delete(environment.basePath + this.endpoints +id);
  }

  getUserRole() : Observable<any> {
    return this.http.get(environment.basePath + this.role);
  }
}
