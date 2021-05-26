import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ThresholdService {
  
  endpoints : string = "threshold";
  updateThresholdPath : string = "config/threshold";

  constructor(
    private http: HttpClient
  ) { }

  callApiThreshold(): Observable<any>{
    return this.http.get(environment.basePath + this.endpoints)
    }

  updateThreshold(updateThresholdInfo:any){
    return this.http.post(environment.basePath + this.updateThresholdPath,updateThresholdInfo)
  }

}
