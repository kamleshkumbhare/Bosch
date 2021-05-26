import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { identity } from 'underscore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users : any;
  endpoints : string = "user";
  route: any;
  name: any;
  role : any;

  constructor(
    private router: Router,
    private UserService : UserService,
    private http:HttpClient,
    private spinner: NgxSpinnerService,
  ) {}
    
  ngOnInit() :void {
    var user = localStorage.getItem("email");
    if (!user) {
      this.router.navigate(["/"]);
    }
    this.getUserData();
    this.getUserRole();

  }
  
  getUserData() {
    this.spinner.show();
    this.UserService.callUserList([]).subscribe(response => {
      this.spinner.hide();
      if ( response.status.statusCode == 200){
        this.users = response.data
      }
    })
  }
  addUser() { 
    this.router.navigate(['/addUser']);
   }
        
  deleteUser(id: any){
    var user = {
      "userid" : id
    }
    if (window.confirm("Delete User")) {
      this.spinner.show();
      var url = environment.basePath + this.endpoints + "/" + user.userid;
      this.http.delete(url).subscribe( response => {
        this.spinner.hide();
        this.getUserData();
      });
    } else {
      
    }

  }

  editUser(id:any){
    var user = {
      "userid" : id.id
    }
    this.name = id;
    console.log(user.userid)
    this.router.navigate(['/editUser']);
    this.router.navigate(['/editUser'],{
      state: {
        user: JSON.stringify(this.name)
      }
    })
  }

  getUserRole(){
    this.UserService.getUserRole().subscribe(responseData =>{
      if(responseData.status.statusCode == 200){
        this.role = responseData.data
      }
    })


  }
}


