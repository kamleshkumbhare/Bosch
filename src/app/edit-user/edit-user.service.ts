import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  
  userData: any;
  
  endpoints : string = "user/";
  
  constructor(
    private http: HttpClient
    ) {
      if (history && history.state && history.state.user) {
        this.userData = JSON.parse(history.state.user);
        console.log(this.userData.id)
      }
    
    }
    
    updateUser(updateUserInfo:any){
      return this.http.put(environment.basePath + this.endpoints + this.userData.id ,updateUserInfo);
    }

}
