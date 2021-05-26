import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDetailsService } from './trip-details.service'

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  
  endpoints : string = "tripDetails";
  userData: any;
  deviceList: any = [];
  
  constructor(
    private service : TripDetailsService,
    private router : Router,
  ) { 
    if (history && history.state && history.state.user) {
      this.userData = history.state.user;
      console.log(this.userData)
    }
  }
  
  ngOnInit(): void {
    
    var user = localStorage.getItem("email");
    if (!user) {
      this.router.navigate(["/"]);
    }

    if (this.userData && this.userData.tripId) {
      this.getTripDetails();  
    }
  }

  getTripDetails() {
    this.service.getTripDetails(this.userData.tripId).subscribe(response => {
      console.log(response);
      this.deviceList = response.data;
    })
  }

  getDeviceLogs(user: any) {
    console.log(user)
    this.service.getDataLogs(user.deviceId).subscribe(response => {
      console.log(response);
      this.service.downloadCSVFile(response.data, user.deviceId);
    })
  }
}
