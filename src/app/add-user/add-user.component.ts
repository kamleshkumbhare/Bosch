import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddUserService } from './add-user.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public fname : any ;
  public lname : any ;
  public email : any ;
  public mobile : any ;
  public role : any ;
  public status : any ;

  ngOnInit(): void {
    var user = localStorage.getItem("email");
    console.log(user)
    if (!user) {
      this.router.navigate(["/"]);
      return
    }} 
  
  constructor(
    private router : Router,
    private AddUserService :AddUserService,
    private spinner: NgxSpinnerService,)
    { 
     
    }
    
  addUser(): void {
    var addUser = {
      "email" : this.email,
      "name" : this.fname,
      "mobile" : this.mobile,
      "isActive" : this.status,
      "password" : "abc123",
      "roleId" : this.role
    }
    console.log(addUser)
    this.spinner.show();
    this.AddUserService.callAddUser(addUser).subscribe(responseData=>{
      if(responseData.status.message === "User Created successfully!!!"){
        this.spinner.hide();
        this.router.navigate(['/user']);
        localStorage.setItem("email", addUser.email);
        localStorage.setItem('password',addUser.password);
      } else if(responseData.status.message === "Invalid Credentials"){
        alert(responseData.status.message);
        this.router.navigate(['/addUser']);
      }
    })
  }
  
}
