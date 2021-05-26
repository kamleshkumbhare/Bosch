import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TripListService } from './trip-list.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  
  endpoints : string = "tripDetails";
  searchText: string = "";
  data: any = [];
  users : any;
  
  constructor(
    private router : Router,
    private service: TripListService,
    private http : HttpClient,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    var user = localStorage.getItem("email");
    this.getUserData();
    if (!user) {
      this.router.navigate(["/"]);
      return
    }}

  search() {
    this.spinner.show();
    console.log("Searching for : ", this.searchText);
    this.service.getTripList(this.searchText).subscribe(response => {
      this.spinner.hide();
      this.data = response.data;
    })
  }

  tripDetails(user: any) {
    this.spinner.show();
    this.router.navigate(['/tripDetails'], { state: { user: user } })
    this.spinner.hide();
  }

  getUserData() {
    this.spinner.show();
    this.service.getTripListDesc([]).subscribe(response => {
      this.spinner.hide();
      if(response.status.statusCode == 200){
        this.data = response.data

      }
     
        
    })
  }

}
