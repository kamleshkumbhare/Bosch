import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import * as _ from "underscore";
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// declare var jsPDF: any;
// declare const require: any;
// const jsPDF = require('jspdf');
// require('jspdf-autotable');

@Injectable({
  providedIn: 'root'
})
export class TripDetailsService {
  
  endpoints : string = "deviceList";

  constructor(
    private http: HttpClient
  ) { }

  getTripDetails(tripId: any) : Observable <any> {
    var param = {
      "tripId": tripId
    }
    return this.http.post(environment.basePath + this.endpoints, param)
  }

  getDataLogs(deviceId: any) : Observable <any> {
    var param = {
      "deviceId": deviceId
    }
    return this.http.post(environment.basePath + "dataLog", param)
  }

  downloadCSV(){

  }

  downloadCSVFile(data: any, filename = 'data') {
    let csvData = this.convertToCSV(data);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1;
    navigator.userAgent.indexOf('Chrome') == -1;
    // if Safari open in new window to save file with random filename.
    if (isSafariBrowser) {
        dwldLink.setAttribute("target", "_blank");
    }

    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}


  convertToCSV(objArray: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var headerList = _.keys(array[0]);
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1) + '';
        for (let index in headerList) {
          let head = headerList[index];

            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
  }

  downloadPDFFile(data: any, filename = 'data'){
    // var doc = new jsPDF();
    var col = _.keys(data[0])
    var rows = _.map(data, function(i){ 
      return _.values(i);; 
    });
    console.log(rows);
    // doc.autoTable(col, data);
    // doc.save(filename + '.pdf');
  }
}
