import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TripListService {

  endpoints : string = "tripList";

  constructor(
    private http: HttpClient,
    private router : Router
  ) { }

  getTripList(searchedText: any) : Observable <any> {
    var param = {
      "code": searchedText
    }
    return this.http.post(environment.basePath + this.endpoints, param)
  }

  getTripListDesc(data:any) : Observable<any> {
    var param = {
      "code": "qqq"
    }
    return this.http.post(environment.basePath + this.endpoints,param)
  }


}
