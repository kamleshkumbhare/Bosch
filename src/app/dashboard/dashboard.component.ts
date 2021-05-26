import { Component, OnInit } from '@angular/core';
import * as QuickSightEmbedding from 'amazon-quicksight-embedding-sdk';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: any;
  constructor(
    private router: Router,
    private appServiceService:AppServiceService,
    private spinner: NgxSpinnerService
  ) {}
  
  ngOnInit() { 
    var user = localStorage.getItem("email");
    if (!user) {
      this.router.navigate(["/"]);
      return
    }
    
    var dashboardId = "31d3f93d-8571-47d6-8d29-b9caca1c7750";
    if (dashboardId) {
      this.spinner.show();
      this.appServiceService.callDashboard(dashboardId).subscribe(response => {
        this.spinner.hide();
        if (response.status && response.status.statusCode && response.status.statusCode == 200 && response.data && response.data.EmbedUrl) {
          this.createDashboard(response.data.EmbedUrl);
        }
      })
    }
  }

  createDashboard(embedUrl: string) {
    var containerDiv: HTMLElement | null = document.getElementById("dashboardContainer");
    if (containerDiv) {
      var options = {
      url: embedUrl,
      container: containerDiv, 
      scrolling: "yes",
      height: "600px",
      width: "100%"
      };
      this.dashboard = QuickSightEmbedding.embedDashboard(options);
    }
  }
}