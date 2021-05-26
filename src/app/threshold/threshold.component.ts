import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThresholdService } from './threshold.service'
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
 
@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.scss']
})
export class ThresholdComponent implements OnInit {

  data : any ;
  tempValue : any;
  humidityValue : any;
  tiltValue : any;
  shockValue : any;
  
  constructor(
    private thresholdService : ThresholdService,
    private router : Router,
    private spinner: NgxSpinnerService,
  ) {}
  
  ngOnInit() :void {
    var user = localStorage.getItem("email");
    if (!user) {
      this.router.navigate(["/"]);
    }
    this.getThresholdData();
  }

  getThresholdData(){
    this.spinner.show();
    this.thresholdService.callApiThreshold().subscribe((response: any)=>{
      this.spinner.hide();
      this.data = response.data
      var temp = _.where(this.data, {name: 'threshold_temperature'})
      this.tempValue= temp[0].value
      
      var humidity =_.where(this.data, {name: 'threshold_humidity'})
      this.humidityValue= humidity[0].value

      var tilt =_.where(this.data, {name: 'threshold_tilt'})
      this.tiltValue= tilt[0].value

      var shock =_.where(this.data, {name: 'threshold_shock'})
      this.shockValue= shock[0].value
    })
  }

  updateThreshold(){
    this.spinner.show();
    var updateThresholdInfo = [{
      "name" : "threshold_temperature",
      "value" : this.tempValue
    }, {
      "name" : "threshold_humidity",
      "value" : this.humidityValue
    }, {
      "name" : "threshold_tilt",
      "value" : this.tiltValue
    }, {
      "name" : "threshold_shock",
      "value" : this.shockValue
    }]
    
    this.thresholdService.updateThreshold(updateThresholdInfo).subscribe(ResponseData =>{
      this.spinner.hide();
      console.log(ResponseData)
    })
  }
}
